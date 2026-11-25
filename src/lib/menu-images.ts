import { IMAGE_ASSET_MANIFEST } from "@/data/image-asset-manifest";

export type MenuImageVariant =
  | "icon"
  | "thumbs"
  | "card"
  | "grid"
  | "card-lg"
  | "detail-md"
  | "full";

export type MenuImagePreset =
  | "category-icon"
  | "item-row"
  | "category-strip"
  | "card-grid"
  | "detail-modal";

const PRESET_VARIANTS: Record<MenuImagePreset, readonly MenuImageVariant[]> = {
  "category-icon": ["icon", "thumbs"],
  "item-row": ["thumbs", "card", "grid"],
  "category-strip": ["thumbs", "card", "grid"],
  "card-grid": ["card", "grid", "card-lg"],
  "detail-modal": ["detail-md", "full"],
};

const KNOWN_PREFIXES = [
  "/images/menu/hashed/",
  "/images/menu/icon/",
  "/images/menu/thumbs/",
  "/images/menu/card/",
  "/images/menu/grid/",
  "/images/menu/card-lg/",
  "/images/menu/detail-md/",
  "/images/menu/full/",
];

interface VariantMeta {
  hashedUrl: string;
  width: number;
  height: number;
}

export function extractMenuImageSlug(imagePath: string): string | null {
  const clean = imagePath.split("?")[0]?.trim() ?? "";
  for (const prefix of KNOWN_PREFIXES) {
    if (clean.startsWith(prefix)) {
      const remainder = clean.slice(prefix.length);
      const lastSegment = remainder.split("/").pop() ?? "";
      const withoutExt = lastSegment.replace(/\.webp$/i, "");
      return withoutExt.replace(/\.[a-f0-9]{8}$/i, "") || null;
    }
  }
  return null;
}

export function getImageAssetEntry(
  variant: MenuImageVariant,
  slug: string
): VariantMeta | null {
  const tuple = IMAGE_ASSET_MANIFEST[slug];
  if (!tuple) return null;

  const [
    iconHash,
    thumbsHash,
    cardHash,
    gridHash,
    cardLgHash,
    cardLgSize,
    detailMdHash,
    detailMdH,
    fullHash,
    fullW,
    fullH,
  ] = tuple;

  let hash = "";
  let width = 0;
  let height = 0;

  switch (variant) {
    case "icon":
      hash = iconHash;
      width = 144;
      height = 144;
      break;
    case "thumbs":
      hash = thumbsHash;
      width = 208;
      height = 208;
      break;
    case "card":
      hash = cardHash;
      width = 360;
      height = 360;
      break;
    case "grid":
      hash = gridHash;
      width = 480;
      height = 480;
      break;
    case "card-lg":
      hash = cardLgHash;
      width = cardLgSize;
      height = cardLgSize;
      break;
    case "detail-md":
      hash = detailMdHash;
      width = 640;
      height = detailMdH;
      break;
    case "full":
      hash = fullHash;
      width = fullW;
      height = fullH;
      break;
  }

  if (!hash || !width || !height) return null;

  return {
    hashedUrl: `/images/menu/hashed/${variant}/${slug}.${hash}.webp`,
    width,
    height,
  };
}

export interface ResolvedMenuImageSource {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
}

/**
 * Resolves verified content-hashed URLs and width descriptors for a semantic slot preset.
 * Keeps square card variants strictly separate from natural-aspect modal variants so crops
 * never shift across breakpoints.
 */
export function resolveMenuImageSource(
  sourceUrl: string,
  preset: MenuImagePreset
): ResolvedMenuImageSource {
  const slug = extractMenuImageSlug(sourceUrl);
  if (!slug) {
    return {
      src: sourceUrl,
      width: 480,
      height: 480,
    };
  }

  const variants = PRESET_VARIANTS[preset];
  const entries = variants
    .map((variant) => getImageAssetEntry(variant, slug))
    .filter((entry): entry is VariantMeta => entry !== null);

  if (entries.length === 0) {
    const fallback =
      getImageAssetEntry("grid", slug) ??
      getImageAssetEntry("thumbs", slug) ??
      getImageAssetEntry("full", slug);
    if (fallback) {
      return {
        src: fallback.hashedUrl,
        width: fallback.width,
        height: fallback.height,
      };
    }
    return {
      src: sourceUrl,
      width: 480,
      height: 480,
    };
  }

  const uniqueByWidth = new Map<number, VariantMeta>();
  for (const entry of entries) {
    uniqueByWidth.set(entry.width, entry);
  }
  const sorted = [...uniqueByWidth.values()].sort((a, b) => a.width - b.width);

  const fallbackEntry =
    preset === "detail-modal"
      ? sorted[sorted.length - 1]
      : sorted.length >= 2 && preset === "card-grid"
        ? sorted[1]
        : sorted[0];

  return {
    src: fallbackEntry.hashedUrl,
    srcSet:
      sorted.length > 1
        ? sorted.map((entry) => `${entry.hashedUrl} ${entry.width}w`).join(", ")
        : undefined,
    width: fallbackEntry.width,
    height: fallbackEntry.height,
  };
}
