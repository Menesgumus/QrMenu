import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_SOURCE_DIR = "/app/.hashed-release";
const DEFAULT_TARGET_DIR = "/app/public/images/menu/hashed";
const DEFAULT_STATE_FILE = "/app/.hashed-state/releases.json";

function collectWebpFiles(rootDir, currentDir = rootDir, out = []) {
  if (!fs.existsSync(currentDir)) return out;
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });
  entries.sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of entries) {
    const abs = path.join(currentDir, entry.name);
    if (entry.isDirectory()) {
      collectWebpFiles(rootDir, abs, out);
    } else if (entry.isFile() && entry.name.endsWith(".webp")) {
      const rel = path.relative(rootDir, abs).split(path.sep).join("/");
      out.push(rel);
    }
  }
  return out;
}

function filesAreIdentical(srcPath, destPath) {
  if (!fs.existsSync(destPath)) return false;
  const srcStat = fs.statSync(srcPath);
  const destStat = fs.statSync(destPath);
  if (srcStat.size !== destStat.size) return false;
  const srcBuf = fs.readFileSync(srcPath);
  const destBuf = fs.readFileSync(destPath);
  return srcBuf.equals(destBuf);
}

function atomicCopyFile(srcPath, destPath) {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  const tmpPath = `${destPath}.${process.pid}.${Date.now()}.tmp`;
  fs.copyFileSync(srcPath, tmpPath);
  fs.renameSync(tmpPath, destPath);
}

function atomicWriteJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmpPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  fs.renameSync(tmpPath, filePath);
}

function readExistingState(stateFile) {
  if (!fs.existsSync(stateFile)) return { releases: [] };
  try {
    const raw = JSON.parse(fs.readFileSync(stateFile, "utf8"));
    if (!Array.isArray(raw?.releases)) return { releases: [] };
    return {
      releases: raw.releases.filter(
        (r) => r && typeof r.id === "string" && Array.isArray(r.files)
      ),
    };
  } catch {
    return { releases: [] };
  }
}

function computeReleaseSignature(files) {
  return crypto
    .createHash("sha256")
    .update(files.join("\n"))
    .digest("hex")
    .slice(0, 12);
}

/**
 * Atomically promotes the active release's content-hashed WebP assets into the
 * served directory while keeping a bounded number of previous releases' assets
 * for open-tab transition compatibility, then prunes expired/stale assets.
 */
export function syncHashedRelease({
  sourceDir = process.env.HASHED_RELEASE_SOURCE || DEFAULT_SOURCE_DIR,
  targetDir = process.env.HASHED_PUBLIC_TARGET || DEFAULT_TARGET_DIR,
  stateFile = process.env.HASHED_STATE_FILE || DEFAULT_STATE_FILE,
  keepReleases = Number(process.env.HASHED_ASSET_KEEP_RELEASES || "2"),
  maxAgeHours = Number(process.env.HASHED_ASSET_MAX_AGE_HOURS || "168"),
  releaseId,
  nowMs = Date.now(),
} = {}) {
  const absSource = path.resolve(sourceDir);
  const absTarget = path.resolve(targetDir);
  const absState = path.resolve(stateFile);

  if (!fs.existsSync(absSource)) {
    throw new Error(`Missing hashed release source directory: ${absSource}`);
  }

  const normalizedKeep = Number.isFinite(keepReleases)
    ? Math.max(2, Math.floor(keepReleases))
    : 2;
  const normalizedMaxAgeMs =
    Number.isFinite(maxAgeHours) && maxAgeHours > 0
      ? maxAgeHours * 3600 * 1000
      : 0;

  const currentFiles = collectWebpFiles(absSource);
  if (currentFiles.length === 0) {
    throw new Error(`No .webp assets found in hashed release source: ${absSource}`);
  }

  fs.mkdirSync(absTarget, { recursive: true });

  let copiedCount = 0;
  let skippedCount = 0;
  for (const rel of currentFiles) {
    const srcPath = path.join(absSource, rel);
    const destPath = path.join(absTarget, rel);
    if (filesAreIdentical(srcPath, destPath)) {
      skippedCount++;
    } else {
      atomicCopyFile(srcPath, destPath);
      copiedCount++;
    }
  }

  const signature = computeReleaseSignature(currentFiles);
  const activeRelease = {
    id: releaseId || `${new Date(nowMs).toISOString()}-${signature}`,
    signature,
    timestampMs: nowMs,
    createdAt: new Date(nowMs).toISOString(),
    files: currentFiles,
  };

  const prevState = readExistingState(absState);
  const dedupedPrevious = prevState.releases.filter(
    (entry) =>
      entry.id !== activeRelease.id && entry.signature !== activeRelease.signature
  );

  const boundedPrevious = dedupedPrevious
    .filter((entry) => {
      if (normalizedMaxAgeMs === 0) return true;
      const ts = Number(entry.timestampMs || Date.parse(entry.createdAt || "") || 0);
      return Number.isFinite(ts) && nowMs - ts <= normalizedMaxAgeMs;
    })
    .slice(0, normalizedKeep - 1);

  const retainedReleases = [activeRelease, ...boundedPrevious];
  atomicWriteJson(absState, {
    keepReleases: normalizedKeep,
    maxAgeHours: Number.isFinite(maxAgeHours) ? maxAgeHours : 168,
    updatedAt: activeRelease.createdAt,
    releases: retainedReleases,
  });

  const retainedFileSet = new Set();
  for (const relEntry of retainedReleases) {
    for (const relPath of relEntry.files) {
      retainedFileSet.add(relPath);
    }
  }

  const diskFiles = collectWebpFiles(absTarget);
  const prunedFiles = [];
  for (const rel of diskFiles) {
    if (!retainedFileSet.has(rel)) {
      fs.rmSync(path.join(absTarget, rel), { force: true });
      prunedFiles.push(rel);
    }
  }

  return {
    releaseId: activeRelease.id,
    signature,
    currentFileCount: currentFiles.length,
    copiedCount,
    skippedCount,
    retainedReleases: retainedReleases.map((r) => ({
      id: r.id,
      createdAt: r.createdAt,
      fileCount: r.files.length,
    })),
    retainedFileCount: retainedFileSet.size,
    prunedFiles,
  };
}

function parseCliArgs(argv) {
  const opts = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--source" && argv[i + 1]) opts.sourceDir = argv[++i];
    else if (arg === "--target" && argv[i + 1]) opts.targetDir = argv[++i];
    else if (arg === "--state" && argv[i + 1]) opts.stateFile = argv[++i];
    else if (arg === "--keep-releases" && argv[i + 1]) opts.keepReleases = Number(argv[++i]);
    else if (arg === "--max-age-hours" && argv[i + 1]) opts.maxAgeHours = Number(argv[++i]);
    else if (arg === "--release-id" && argv[i + 1]) opts.releaseId = argv[++i];
  }
  return opts;
}

const isCliEntry =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isCliEntry) {
  const result = syncHashedRelease(parseCliArgs(process.argv.slice(2)));
  console.log(
    `[hashed-release] synced=${result.currentFileCount} (copied=${result.copiedCount}, reused=${result.skippedCount}) retained_releases=${result.retainedReleases.length} retained_files=${result.retainedFileCount} pruned=${result.prunedFiles.length}`
  );
}
