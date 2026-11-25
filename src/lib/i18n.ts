import type {
  BusinessProfile,
  ColorMode,
  MenuCategory,
  MenuItem,
  MenuLanguage,
  MenuThemeId,
} from "@/types/menu";

export interface ThemeMetaText {
  title: string;
  subtitle: string;
}

export interface MenuUiDictionary {
  meta: {
    loading: string;
    vatIncluded: string;
    dailyMenuEyebrow: string;
  };
  themes: Record<MenuThemeId, ThemeMetaText>;
  controls: {
    themeSelectorLabel: string;
    themePrefix: string;
    chooseMenuDesign: string;
    selectedBadge: string;
    presentationPreview: string;
    languageGroupLabel: string;
    switchToLight: string;
    switchToDark: string;
    lightModeShort: string;
    darkModeShort: string;
    openMenuLabel: string;
  };
  nav: {
    categoriesLabel: string;
    searchButton: string;
    searchPlaceholder: string;
    searchPlaceholderShort: string;
    searchInputLabel: string;
    clear: string;
    clearSearch: string;
    close: string;
    backToCategories: string;
    expandAll: string;
    collapseAll: string;
    categoriesPrompt: string;
    categoriesPill: string;
    categoriesShowcaseLabel: string;
    openAction: string;
    viewAction: string;
    detailsAction: string;
    showAllMenu: string;
  };
  search: {
    eyebrow: string;
    emptyTitle: string;
    emptySubtitleAll: string;
    emptySubtitleCategories: string;
    emptySubtitleFerah: string;
    resultsForQuery: (query: string, count: number) => string;
    resultsCompact: (query: string, count: number) => string;
    resultsInMenu: (query: string, count: number) => string;
  };
  counts: {
    items: (count: number) => string;
    varieties: (count: number) => string;
    sectionsAndItems: (sections: number, items: number) => string;
  };
  share: {
    triggerLabel: string;
    triggerButton: string;
    dialogEyebrow: string;
    selectedDesign: string;
    selectedSettings: (langLabel: string, modeLabel: string) => string;
    closeAria: string;
    linkTypeAria: string;
    presentationTab: string;
    customerTab: string;
    presentationHint: string;
    customerHint: (themeTitle: string) => string;
    copyLink: string;
    copied: string;
    openNewTab: string;
    qrPreparing: string;
    qrError: string;
    qrRetry: string;
    qrAlt: (themeTitle: string, mode: "sunum" | "musteri") => string;
    localWarning: string;
    readyQrHint: string;
    downloadSvg: string;
    downloadSvgTest: string;
    downloadPng: string;
    downloadPngTest: string;
  };
  modal: {
    loadingDetails: string;
    loadError: string;
    retry: string;
  };
  notFound: {
    eyebrow: string;
    heading: string;
    description: string;
    backHome: string;
  };
}

const DICTIONARIES: Record<MenuLanguage, MenuUiDictionary> = {
  tr: {
    meta: {
      loading: "Menü yükleniyor…",
      vatIncluded: "Fiyatlara KDV dahildir.",
      dailyMenuEyebrow: "GÜNLÜK MENÜ",
    },
    themes: {
      ozel: {
        title: "Özel Menü",
        subtitle: "Basılı düzen, tipografi odaklı",
      },
      gece: {
        title: "Gece",
        subtitle: "Sıcak bistro atmosferi, kategori odaklı",
      },
      canli: {
        title: "Canlı",
        subtitle: "Renkli kategori kartları, hızlı akış",
      },
      ferah: {
        title: "Ferah",
        subtitle: "Serin mavi, açılır-kapanır bölümler",
      },
      klasik: {
        title: "Klasik QR",
        subtitle: "Fotoğraflı kategori seçimi ve şerit",
      },
      vitrin: {
        title: "Vitrin",
        subtitle: "Büyük fotoğraf kutuları, sade akış",
      },
    },
    controls: {
      themeSelectorLabel: "Tasarım seçici",
      themePrefix: "Tasarım",
      chooseMenuDesign: "Menü Tasarımı Seçin",
      selectedBadge: "Seçili",
      presentationPreview: "Sunum Önizlemesi",
      languageGroupLabel: "Menü dili seçimi",
      switchToLight: "Açık moda geç",
      switchToDark: "Koyu moda geç",
      lightModeShort: "Gündüz",
      darkModeShort: "Gece",
      openMenuLabel: "Menü dil ve görünüm ayarları",
    },
    nav: {
      categoriesLabel: "Menü kategorileri",
      searchButton: "Ara",
      searchPlaceholder: "Menüde ara (ör. hellim, kahve, çörek)…",
      searchPlaceholderShort: "Menüde ara (kruvasan, latte…)",
      searchInputLabel: "Menüde ürün ara",
      clear: "Temizle",
      clearSearch: "Aramayı temizle",
      close: "Kapat",
      backToCategories: "Kategorilere dön",
      expandAll: "Tümünü aç",
      collapseAll: "Tümünü kapat",
      categoriesPrompt: "Ne yemek ya da içmek istersin?",
      categoriesPill: "Kategoriler",
      categoriesShowcaseLabel: "Menü kategorileri vitrini",
      openAction: "Aç →",
      viewAction: "İncele →",
      detailsAction: "Detay →",
      showAllMenu: "Tüm menüyü göster",
    },
    search: {
      eyebrow: "Arama Sonucu",
      emptyTitle: "Aramanıza uygun ürün bulunamadı",
      emptySubtitleAll:
        "Bu arama için menüde bir ürün yer almıyor. Farklı bir sözcük deneyebilir veya tüm menüye geri dönebilirsiniz.",
      emptySubtitleCategories:
        "Bu arama için eşleşen bir ürün yer almıyor. Aramayı temizleyerek kategorilere dönebilirsiniz.",
      emptySubtitleFerah:
        "Bu arama için eşleşen bir ürün yer almıyor. Aramayı temizleyerek önceki bölümlere geri dönebilirsiniz.",
      resultsForQuery: (query, count) =>
        `“${query}” için ${count} sonuç gösteriliyor`,
      resultsCompact: (query, count) => `“${query}” için ${count} sonuç`,
      resultsInMenu: (query, count) =>
        `“${query}” için tüm menüde ${count} sonuç bulundu`,
    },
    counts: {
      items: (count) => `${count} ürün`,
      varieties: (count) => `${count} çeşit`,
      sectionsAndItems: (sections, items) => `${sections} bölüm · ${items} ürün`,
    },
    share: {
      triggerLabel: "Paylaşım ve QR menüsü",
      triggerButton: "Paylaş",
      dialogEyebrow: "Bağlantı ve QR Paylaşımı",
      selectedDesign: "Seçili tasarım",
      selectedSettings: (langLabel, modeLabel) =>
        `Dil: ${langLabel} · Mod: ${modeLabel}`,
      closeAria: "Paylaş menüsünü kapat",
      linkTypeAria: "Paylaşım bağlantısı türü",
      presentationTab: "Sunum Bağlantısı",
      customerTab: "Müşteri Bağlantısı",
      presentationHint:
        "Tasarım seçici görünür; alıcı 6 tasarım arasında geçiş yapabilir.",
      customerHint: (themeTitle) =>
        `Tasarım seçici gizlidir; doğrudan yalnızca ${themeTitle} açılır.`,
      copyLink: "Bağlantıyı kopyala",
      copied: "Kopyalandı ✓",
      openNewTab: "Yeni sekmede aç",
      qrPreparing: "QR hazırlanıyor…",
      qrError: "QR kodu hazırlanamadı.",
      qrRetry: "Tekrar dene",
      qrAlt: (themeTitle, mode) =>
        `${themeTitle} ${mode === "sunum" ? "sunum" : "müşteri"} QR kodu`,
      localWarning:
        "Yerel test adresi algılandı (localhost): Bu QR yalnızca yerel kontrol içindir, baskıya hazır sunum çıktısı değildir.",
      readyQrHint: "Aktif alan adı üzerinden doğrudan taramaya hazır QR kod",
      downloadSvg: "SVG İndir",
      downloadSvgTest: "Test SVG İndir",
      downloadPng: "PNG İndir",
      downloadPngTest: "Test PNG İndir",
    },
    modal: {
      loadingDetails: "Ürün detayı yükleniyor…",
      loadError: "Ürün detayı şu anda yüklenemedi.",
      retry: "Tekrar dene",
    },
    notFound: {
      eyebrow: "404 · Menü Bulunamadı",
      heading: "Bu bağlantı için aktif bir menü bulunamadı.",
      description:
        "Bağlantıyı kontrol edebilir veya örnek misafir menüsüne dönebilirsiniz.",
      backHome: "Örnek menüye dön",
    },
  },
  en: {
    meta: {
      loading: "Loading menu…",
      vatIncluded: "Prices include VAT.",
      dailyMenuEyebrow: "DAILY MENU",
    },
    themes: {
      ozel: {
        title: "Editorial",
        subtitle: "Print-inspired layout, typography-first",
      },
      gece: {
        title: "Bistro",
        subtitle: "Warm atmosphere, category-focused",
      },
      canli: {
        title: "Vibrant",
        subtitle: "Bold category cards, quick browsing",
      },
      ferah: {
        title: "Breezy",
        subtitle: "Cool blue accents, collapsible sections",
      },
      klasik: {
        title: "Classic QR",
        subtitle: "Photo categories & horizontal strip",
      },
      vitrin: {
        title: "Showcase",
        subtitle: "Large photo tiles, clean flow",
      },
    },
    controls: {
      themeSelectorLabel: "Design selector",
      themePrefix: "Theme",
      chooseMenuDesign: "Choose Menu Design",
      selectedBadge: "Active",
      presentationPreview: "Presentation Preview",
      languageGroupLabel: "Menu language",
      switchToLight: "Switch to light mode",
      switchToDark: "Switch to dark mode",
      lightModeShort: "Light",
      darkModeShort: "Dark",
      openMenuLabel: "Menu language and appearance settings",
    },
    nav: {
      categoriesLabel: "Menu categories",
      searchButton: "Search",
      searchPlaceholder: "Search menu (e.g. halloumi, coffee, tart)…",
      searchPlaceholderShort: "Search menu (croissant, latte…)",
      searchInputLabel: "Search menu items",
      clear: "Clear",
      clearSearch: "Clear search",
      close: "Close",
      backToCategories: "Back to categories",
      expandAll: "Expand all",
      collapseAll: "Collapse all",
      categoriesPrompt: "What would you like to eat or drink?",
      categoriesPill: "Categories",
      categoriesShowcaseLabel: "Menu categories showcase",
      openAction: "Open →",
      viewAction: "View →",
      detailsAction: "Details →",
      showAllMenu: "Show full menu",
    },
    search: {
      eyebrow: "Search Results",
      emptyTitle: "No matching items found",
      emptySubtitleAll:
        "No items matched your search query. Try another word or return to the full menu.",
      emptySubtitleCategories:
        "No items matched your search query. Clear the search to return to the categories.",
      emptySubtitleFerah:
        "No items matched your search query. Clear the search to return to the menu sections.",
      resultsForQuery: (query, count) =>
        `Showing ${count} ${count === 1 ? "result" : "results"} for “${query}”`,
      resultsCompact: (query, count) =>
        `${count} ${count === 1 ? "result" : "results"} for “${query}”`,
      resultsInMenu: (query, count) =>
        `Found ${count} ${count === 1 ? "result" : "results"} across the menu for “${query}”`,
    },
    counts: {
      items: (count) => `${count} ${count === 1 ? "item" : "items"}`,
      varieties: (count) => `${count} ${count === 1 ? "item" : "items"}`,
      sectionsAndItems: (sections, items) =>
        `${sections} ${sections === 1 ? "section" : "sections"} · ${items} ${items === 1 ? "item" : "items"}`,
    },
    share: {
      triggerLabel: "Share and QR menu",
      triggerButton: "Share",
      dialogEyebrow: "Share Link & QR Code",
      selectedDesign: "Selected theme",
      selectedSettings: (langLabel, modeLabel) =>
        `Language: ${langLabel} · Mode: ${modeLabel}`,
      closeAria: "Close share menu",
      linkTypeAria: "Share link mode",
      presentationTab: "Presentation Link",
      customerTab: "Customer Link",
      presentationHint:
        "Theme switcher is visible; recipients can switch between all 6 designs.",
      customerHint: (themeTitle) =>
        `Theme switcher is hidden; opens ${themeTitle} directly for guests.`,
      copyLink: "Copy link",
      copied: "Copied ✓",
      openNewTab: "Open in new tab",
      qrPreparing: "Preparing QR…",
      qrError: "Could not generate QR code.",
      qrRetry: "Try again",
      qrAlt: (themeTitle, mode) =>
        `${themeTitle} ${mode === "sunum" ? "presentation" : "customer"} QR code`,
      localWarning:
        "Local preview URL detected (localhost): this QR code is for local testing only and not print-ready.",
      readyQrHint: "Print-ready QR code pointing to the active presentation domain",
      downloadSvg: "Download SVG",
      downloadSvgTest: "Test SVG",
      downloadPng: "Download PNG",
      downloadPngTest: "Test PNG",
    },
    modal: {
      loadingDetails: "Loading item details…",
      loadError: "Item details could not be loaded right now.",
      retry: "Try again",
    },
    notFound: {
      eyebrow: "404 · Menu Not Found",
      heading: "No active menu found for this link.",
      description:
        "Please check the address or return to the sample guest menu.",
      backHome: "Back to sample menu",
    },
  },
};

export function getUiDictionary(language: MenuLanguage): MenuUiDictionary {
  return DICTIONARIES[language] ?? DICTIONARIES.tr;
}

/**
 * Resolves a localized text with controlled Turkish fallback whenever the
 * English translation is missing or blank.
 */
export function resolveLocalizedText(
  trText: string,
  enText: string | undefined,
  language: MenuLanguage
): string {
  if (language === "en" && enText && enText.trim().length > 0) {
    return enText;
  }
  return trText;
}

export function getBusinessDescription(
  business: BusinessProfile,
  language: MenuLanguage
): string {
  return resolveLocalizedText(
    business.description,
    business.translations?.en?.description,
    language
  );
}

export function getCategoryText(
  category: MenuCategory,
  language: MenuLanguage
): {
  name: string;
  shortLabel: string;
  coverImageAlt: string;
} {
  const name = resolveLocalizedText(
    category.name,
    category.translations?.en?.name,
    language
  );
  const trShort = category.shortLabel ?? category.name;
  const enShort =
    category.translations?.en?.shortLabel ?? category.translations?.en?.name;
  const shortLabel = resolveLocalizedText(trShort, enShort, language);
  const coverImageAlt = resolveLocalizedText(
    category.coverImageAlt ?? trShort,
    category.translations?.en?.coverImageAlt ?? enShort,
    language
  );

  return { name, shortLabel, coverImageAlt };
}

export function getItemText(
  item: MenuItem,
  language: MenuLanguage
): {
  fullName: string;
  cardName: string;
  description: string;
  imageAlt: string;
} {
  const fullName = resolveLocalizedText(
    item.name,
    item.translations?.en?.name,
    language
  );
  const trCard = item.displayName ?? item.name;
  const enCard =
    item.translations?.en?.displayName ?? item.translations?.en?.name;
  const cardName = resolveLocalizedText(trCard, enCard, language);
  const description = resolveLocalizedText(
    item.description,
    item.translations?.en?.description,
    language
  );
  const imageAlt = item.image
    ? resolveLocalizedText(item.image.alt, item.image.altEn, language)
    : "";

  return { fullName, cardName, description, imageAlt };
}

export function formatColorModeLabel(
  mode: ColorMode,
  language: MenuLanguage
): string {
  const dict = getUiDictionary(language);
  return mode === "dark"
    ? dict.controls.darkModeShort
    : dict.controls.lightModeShort;
}
