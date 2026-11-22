/**
 * Formats integer kurus into Turkish Lira display text.
 * Uses whole numbers when kurus is 00 (e.g., "295 ₺"), otherwise two decimals (e.g., "295,50 ₺").
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
