import type { MenuThemeId } from "@/types/menu";

export const VALID_MENU_THEMES: readonly MenuThemeId[] = [
  "ozel",
  "gece",
  "canli",
  "ferah",
  "klasik",
  "vitrin",
];

/**
 * Validates the `tasarim` query parameter and returns a known theme id,
 * or `undefined` when missing/invalid so callers fall back to default.
 */
export function resolveMenuThemeParam(
  value: string | string[] | undefined
): MenuThemeId | undefined {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (!candidate) return undefined;
  return VALID_MENU_THEMES.includes(candidate as MenuThemeId)
    ? (candidate as MenuThemeId)
    : undefined;
}

/**
 * Removes trailing slashes while preserving origin and any deployment subpath.
 */
export function normalizeBaseUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return "";
  return trimmed.replace(/\/+$/, "");
}

/**
 * Resolves the single authoritative base URL used for share links and QR codes.
 * Uses `NEXT_PUBLIC_PRESENTATION_BASE_URL` when configured; otherwise derives
 * origin + deployment subpath from the current URL cleanly.
 */
export function resolvePresentationBaseUrl(
  currentHref?: string,
  businessSlug?: string
): string {
  const envBase = process.env.NEXT_PUBLIC_PRESENTATION_BASE_URL;
  if (envBase && envBase.trim().length > 0) {
    return normalizeBaseUrl(envBase);
  }

  if (!currentHref) return "";

  try {
    const parsed = new URL(currentHref);
    let cleanPath = parsed.pathname.replace(/\/+$/, "");

    if (businessSlug) {
      const customerSuffix = `/m/${businessSlug}`;
      if (cleanPath === customerSuffix) {
        cleanPath = "";
      } else if (cleanPath.endsWith(customerSuffix)) {
        cleanPath = cleanPath.slice(0, -customerSuffix.length);
      }
    }

    return `${parsed.origin}${cleanPath}`;
  } catch {
    return normalizeBaseUrl(currentHref);
  }
}

/**
 * Detects loopback, localhost, or `.local` preview hosts so localhost QR codes
 * are never presented as print-ready final outputs.
 */
export function isLocalOrLoopbackUrl(rawUrl: string): boolean {
  const trimmed = rawUrl.trim();
  if (!trimmed) return true;

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();
    return (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "::1" ||
      host === "[::1]" ||
      host === "0.0.0.0" ||
      host.endsWith(".local")
    );
  } catch {
    return true;
  }
}

/**
 * Builds the subpath-safe presentation link (with theme switcher enabled).
 */
export function buildPresentationUrl(
  baseUrl: string,
  themeId: MenuThemeId
): string {
  const normalized = normalizeBaseUrl(baseUrl);
  return `${normalized}/?tasarim=${themeId}`;
}

/**
 * Builds the subpath-safe customer link (with theme switcher hidden).
 */
export function buildCustomerUrl(
  baseUrl: string,
  slug: string,
  themeId: MenuThemeId
): string {
  const normalized = normalizeBaseUrl(baseUrl);
  return `${normalized}/m/${slug}?tasarim=${themeId}`;
}
