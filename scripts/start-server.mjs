import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { syncHashedRelease } from "./sync-hashed-release.mjs";

const host = process.env.HOSTNAME || "0.0.0.0";
const port = process.env.PORT || "3000";
const sourceDir = process.env.HASHED_RELEASE_SOURCE || path.resolve(".hashed-release");

if (fs.existsSync(sourceDir)) {
  const result = syncHashedRelease({
    sourceDir,
    targetDir: process.env.HASHED_PUBLIC_TARGET || path.resolve("public/images/menu/hashed"),
    stateFile: process.env.HASHED_STATE_FILE || path.resolve(".hashed-state/releases.json"),
  });
  console.log(
    `[start-server] hashed-release synced=${result.currentFileCount} (copied=${result.copiedCount}, reused=${result.skippedCount}) retained_releases=${result.retainedReleases.length} retained_files=${result.retainedFileCount} pruned=${result.prunedFiles.length}`
  );
}

const nextBin = path.resolve("node_modules/next/dist/bin/next");
const child = spawn(process.execPath, [nextBin, "start", "-H", host, "-p", port], {
  stdio: "inherit",
  env: process.env,
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    if (!child.killed) child.kill(signal);
  });
}

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
