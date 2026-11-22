/**
 * Formats integer kurus into Turkish Lira display text.
 * Uses whole numbers when kurus is 00 (e.g., "295 ₺"), otherwise two decimals (e.g., "295,50 ₺").
 * Currency stays TRY across all languages.
 */
export function formatPriceTRY(priceKurus: number): string {
  const lira = priceKurus / 100;
  const hasFractionalKurus = priceKurus % 100 !== 0;

  const formatted = lira.toLocaleString("tr-TR", {
    minimumFractionDigits: hasFractionalKurus ? 2 : 0,
    maximumFractionDigits: hasFractionalKurus ? 2 : 0,
  });

  return `${formatted} ₺`;
}

/**
 * Normalizes text for Turkish-aware case-insensitive search ("İ/i", "I/ı", "Ş/ş", "Ğ/ğ", "Ü/ü", "Ö/ö", "Ç/ç").
 */
export function normalizeTurkish(value: string): string {
  return value.normalize("NFC").toLocaleLowerCase("tr-TR").trim();
}

/**
 * Folds Turkish and Latin diacritics to ASCII equivalents so both accented
 * ("çörek", "trüf") and unaccented ("corek", "truf") queries match cleanly.
 */
export function normalizeSearchFolded(value: string): string {
  return normalizeTurkish(value)
    .replaceAll("ı", "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .normalize("NFC");
}

/**
 * Checks whether a bilingual search query matches any of the candidate strings,
 * preserving both strict Turkish normalization and folded ASCII matching.
 */
export function matchesBilingualSearch(
  candidates: Array<string | undefined | null>,
  rawQuery: string
): boolean {
  const trQuery = normalizeTurkish(rawQuery);
  if (!trQuery) return true;
  const foldedQuery = normalizeSearchFolded(rawQuery);

  return candidates.some((candidate) => {
    if (!candidate) return false;
    const trTarget = normalizeTurkish(candidate);
    if (trTarget.includes(trQuery)) return true;
    return normalizeSearchFolded(candidate).includes(foldedQuery);
  });
}
