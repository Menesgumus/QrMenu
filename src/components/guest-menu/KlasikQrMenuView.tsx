"use client";

import { useEffect, useRef, useState } from "react";
import { formatPriceTRY } from "@/lib/format";
import { getCategoryText, getItemText, getUiDictionary } from "@/lib/i18n";
import type {
  BusinessProfile,
  MenuCategory,
  MenuItem,
  MenuLanguage,
} from "@/types/menu";
import { BrandMark } from "./BrandMark";
import { getThemeContainerClass } from "./layout-tokens";
import { MenuImage } from "./MenuImage";

export type KlasikViewMode = "categories" | "items";

export interface KlasikVisibleSection {
  category: MenuCategory;
  orderLabel: string;
  items: MenuItem[];
}

interface KlasikQrMenuViewProps {
  business: BusinessProfile;
  categories: MenuCategory[];
  allItems: MenuItem[];
  visibleSections: KlasikVisibleSection[];
  activeCategoryId: string;
  viewMode: KlasikViewMode;
  onSelectCategory: (categoryId: string) => void;
  onBackToCategories: () => void;
  searchOpen: boolean;
  onToggleSearch: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  isSearching: boolean;
  totalMatches: number;
  onSelectItem: (item: MenuItem, triggerEl: HTMLButtonElement) => void;
  language: MenuLanguage;
  navRef?: React.RefObject<HTMLDivElement | null>;
  stickyTopOffset?: number;
}

function KlasikItemRow({
  item,
  onSelect,
  language,
  eager = false,
}: {
  item: MenuItem;
  onSelect: (item: MenuItem, triggerEl: HTMLButtonElement) => void;
  language: MenuLanguage;
  eager?: boolean;
}) {
  const { cardName, description, imageAlt } = getItemText(item, language);
  const formattedPrice = formatPriceTRY(item.priceKurus);

  return (
    <button
      type="button"
      onClick={(event) => onSelect(item, event.currentTarget)}
      className="group flex h-full w-full items-center gap-3 px-3.5 py-3 text-left transition-colors duration-150 hover:bg-[var(--menu-surface-hover)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--menu-focus)] md:gap-4 md:px-4 md:py-3.5"
    >
      {item.image && (
        <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-[9px] border border-[var(--menu-border)] bg-[var(--menu-surface-muted)] md:h-[92px] md:w-[92px]">
          <MenuImage
            src={item.image.thumbUrl}
            alt={imageAlt}
            preset="item-row"
            fill
            sizes="(max-width: 767px) 84px, 92px"
            loading={eager ? "eager" : "lazy"}
            style={{
              objectPosition:
                item.image.focalPointByTheme?.klasik ?? "center center",
            }}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] leading-[1.3] font-semibold tracking-[-0.01em] text-[var(--menu-text)] md:text-[16px]">
          {cardName}
        </h3>
        {description && (
          <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.42] text-[var(--menu-text-secondary)] md:text-[13.5px]">
            {description}
          </p>
        )}
      </div>

      <div className="flex min-w-[66px] shrink-0 flex-col items-end justify-center pl-1.5 text-right">
        <span className="whitespace-nowrap text-[15px] font-bold tabular-nums text-[var(--menu-text)] md:text-[16px]">
          {formattedPrice}
        </span>
      </div>
    </button>
  );
}

export function KlasikQrMenuView({
  business,
  categories,
  allItems,
  visibleSections,
  activeCategoryId,
  viewMode,
  onSelectCategory,
  onBackToCategories,
  searchOpen,
  onToggleSearch,
  searchQuery,
  onSearchChange,
  onClearSearch,
  isSearching,
  totalMatches,
  onSelectItem,
  language,
  navRef,
  stickyTopOffset = 0,
}: KlasikQrMenuViewProps) {
  const scrollStripRef = useRef<HTMLElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const dict = getUiDictionary(language);
  const showCategoryCards = !isSearching && viewMode === "categories";
  const showItemList = !isSearching && viewMode === "items";
  const showSearchInput = searchOpen || isSearching;
  const trimmedQuery = searchQuery.trim();

  const categoryCards = categories
    .map((category) => {
      const categoryItems = allItems.filter(
        (item) => item.categoryId === category.id
      );
      if (categoryItems.length === 0) return null;

      const text = getCategoryText(category, language);
      const fallbackItem = categoryItems[0];
      const fallbackAlt = fallbackItem
        ? getItemText(fallbackItem, language).imageAlt
        : text.shortLabel;

      return {
        category,
        shortLabel: text.shortLabel,
        count: categoryItems.length,
        coverUrl: category.coverImageUrl ?? fallbackItem?.image?.gridUrl ?? "",
        coverAlt: category.coverImageUrl ? text.coverImageAlt : fallbackAlt,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  useEffect(() => {
    if (!showItemList) return;
    const strip = scrollStripRef.current;
    const activeTab = tabRefs.current[activeCategoryId];
    if (!strip || !activeTab) return;
    if (strip.scrollWidth <= strip.clientWidth) return;

    const stripRect = strip.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();
    const targetLeft =
      tabRect.width >= stripRect.width
        ? strip.scrollLeft + (tabRect.left - stripRect.left)
        : strip.scrollLeft +
          (tabRect.left - stripRect.left) -
          stripRect.width / 2 +
          tabRect.width / 2;

    strip.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }, [activeCategoryId, showItemList]);

  useEffect(() => {
    if (!showItemList) return;
    const strip = scrollStripRef.current;
    if (!strip) return;

    const updateScrollCues = () => {
      const maxScrollLeft = strip.scrollWidth - strip.clientWidth;
      setCanScrollLeft(strip.scrollLeft > 4);
      setCanScrollRight(maxScrollLeft - strip.scrollLeft > 6);
    };

    updateScrollCues();
    strip.addEventListener("scroll", updateScrollCues, { passive: true });

    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateScrollCues);
      observer.observe(strip);
    }

    return () => {
      strip.removeEventListener("scroll", updateScrollCues);
      observer?.disconnect();
    };
  }, [showItemList, categories.length]);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const activeSection =
    visibleSections.find(
      (section) => section.category.id === activeCategoryId
    ) ?? visibleSections[0];

  const klasikFontStyle = {
    fontFamily: "var(--font-klasik-sans), system-ui, sans-serif",
  } as const;

  const activeSectionText = activeSection
    ? getCategoryText(activeSection.category, language)
    : null;

  return (
    <div
      style={klasikFontStyle}
      className="min-h-screen bg-[var(--menu-bg)] text-[var(--menu-text)] font-klasik selection:bg-[var(--menu-selection-bg)] selection:text-[var(--menu-selection-text)]"
    >
      {/* Kompakt İşletme Başlığı */}
      <header className="border-b border-[var(--menu-border)] bg-[var(--menu-surface)]">
        <div
          className={`mx-auto w-full px-4 py-2.5 md:py-3.5 ${getThemeContainerClass("klasik")}`}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5 md:gap-3">
              <div
                style={{
                  backgroundColor: "var(--menu-logo-bg)",
                  borderColor: "var(--menu-logo-border)",
                  color: "var(--menu-logo-ink)",
                }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border p-1 md:h-10 md:w-10"
              >
                <BrandMark className="h-[24px] w-[24px] shrink-0 md:h-[26px] md:w-[26px]" />
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-[18px] leading-[1.15] font-bold tracking-[-0.02em] text-[var(--menu-text)] md:text-[21px]">
                  {business.name}
                </h1>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[11.5px] leading-[1.35] text-[var(--menu-text-secondary)] md:text-[12.5px]">
                  <span>{business.address}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{business.hours}</span>
                  <span aria-hidden="true" className="hidden sm:inline">
                    ·
                  </span>
                  <a
                    href={business.phoneHref}
                    className="hidden font-medium tabular-nums text-[var(--menu-text)] hover:underline sm:inline"
                  >
                    {business.phone}
                  </a>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleSearch}
              aria-expanded={showSearchInput}
              aria-controls="klasik-search-panel"
              className={`flex shrink-0 items-center gap-1.5 rounded-[8px] border px-3 py-1.5 text-[12.5px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] ${
                showSearchInput
                  ? "border-[var(--menu-accent)] bg-[var(--menu-accent)] text-[var(--menu-accent-contrast)]"
                  : "border-[var(--menu-border-strong)] bg-[var(--menu-surface-muted)] text-[var(--menu-text)] hover:border-[var(--menu-accent)]"
              }`}
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="h-3.5 w-3.5"
              >
                <circle
                  cx="9"
                  cy="9"
                  r="5.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M13.2 13.2L16.8 16.8"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
              <span>{dict.nav.searchButton}</span>
            </button>
          </div>

          {showSearchInput && (
            <div id="klasik-search-panel" className="mt-2.5">
              <label htmlFor="klasik-menu-search" className="sr-only">
                {dict.nav.searchInputLabel}
              </label>
              <div className="relative flex items-center">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 h-4 w-4 text-[var(--menu-text-secondary)]"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="5.5"
                    stroke="currentColor"
                    strokeWidth="1.65"
                  />
                  <path
                    d="M13.2 13.2L16.8 16.8"
                    stroke="currentColor"
                    strokeWidth="1.65"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  ref={searchInputRef}
                  id="klasik-menu-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => onSearchChange(event.target.value)}
                  placeholder={dict.nav.searchPlaceholderShort}
                  className={`h-10 w-full rounded-[9px] border border-[var(--menu-border-strong)] bg-[var(--menu-surface-muted)] pl-9 text-[13.5px] font-medium text-[var(--menu-text)] placeholder:text-[var(--menu-text-secondary)] focus:border-[var(--menu-accent)] focus:bg-[var(--menu-surface)] focus:outline-none ${
                    searchQuery.length > 0 ? "pr-20" : "pr-3.5"
                  }`}
                />
                {searchQuery.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearSearch}
                    className="absolute right-1.5 rounded-[7px] bg-[var(--menu-accent)] px-2.5 py-1 text-[11.5px] font-semibold text-[var(--menu-accent-contrast)] hover:bg-[var(--menu-accent-hover)]"
                  >
                    {dict.nav.clear}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* İçerik: Açılış Kategori Kartları, Ürün Listesi veya Arama Sonuçları */}
      <main
        className={`mx-auto w-full px-4 pb-16 ${
          showItemList ? "pt-0 lg:pt-5" : "pt-3.5 md:pt-5"
        } ${getThemeContainerClass("klasik")}`}
      >
        {showCategoryCards && (
          <section aria-label={dict.nav.categoriesLabel}>
            <div className="mb-3 flex items-baseline justify-between gap-2 px-0.5">
              <h2 className="text-[17px] leading-[1.2] font-bold tracking-[-0.015em] text-[var(--menu-text)] md:text-[20px]">
                {dict.nav.categoriesPill}
              </h2>
              <span className="shrink-0 text-[12px] font-medium text-[var(--menu-text-secondary)]">
                {dict.counts.sectionsAndItems(
                  categoryCards.length,
                  allItems.length
                )}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:gap-5 xl:grid-cols-4 xl:gap-5">
              {categoryCards.map((card, index) => {
                const isLastOddMobile =
                  categoryCards.length % 2 === 1 &&
                  index === categoryCards.length - 1;

                return (
                  <button
                    key={card.category.id}
                    type="button"
                    onClick={() => onSelectCategory(card.category.id)}
                    className={`group flex flex-col overflow-hidden rounded-[11px] border border-[var(--menu-border)] bg-[var(--menu-surface)] text-left transition-all duration-150 hover:border-[var(--menu-border-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] ${
                      isLastOddMobile ? "col-span-2 md:col-span-1" : ""
                    }`}
                  >
                    <div
                      className={`relative w-full overflow-hidden bg-[var(--menu-surface-muted)] ${
                        isLastOddMobile
                          ? "aspect-[16/7] md:aspect-[4/3]"
                          : "aspect-[4/3]"
                      }`}
                    >
                      {card.coverUrl && (
                        <MenuImage
                          src={card.coverUrl}
                          alt={card.coverAlt}
                          preset="card-grid"
                          fill
                          sizes={
                            isLastOddMobile
                              ? "(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) calc((100vw - 96px) / 3), (max-width: 1279px) calc((100vw - 104px) / 3), (max-width: 1479px) calc((100vw - 140px) / 4), 335px"
                              : "(max-width: 767px) calc((100vw - 44px) / 2), (max-width: 1023px) calc((100vw - 96px) / 3), (max-width: 1279px) calc((100vw - 104px) / 3), (max-width: 1479px) calc((100vw - 140px) / 4), 335px"
                          }
                          loading={index < 6 ? "eager" : "lazy"}
                          fetchPriority={
                            index === 0 || index === 4 ? "high" : undefined
                          }
                          style={{
                            objectPosition:
                              card.category.coverObjectPosition?.klasik ??
                              "center center",
                          }}
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      )}
                    </div>

                    {/* Vitrin'den ayrışan nokta: ad ve ürün sayısı fotoğrafın altında ayrı kompakt blokta */}
                    <div className="flex flex-1 flex-col justify-between border-t border-[var(--menu-border)] px-3 py-2.5 md:px-3.5 md:py-3">
                      <h3 className="text-[14.5px] leading-[1.22] font-bold tracking-[-0.01em] text-[var(--menu-text)] group-hover:text-[var(--menu-accent)] md:text-[16px]">
                        {card.shortLabel}
                      </h3>
                      <p className="mt-1 text-[12px] font-medium tabular-nums text-[var(--menu-text-secondary)]">
                        {dict.counts.items(card.count)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {isSearching && (
          <div className="@container">
            <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2 rounded-[10px] border border-[var(--menu-border)] bg-[var(--menu-surface)] px-3.5 py-2.5 text-[13px] text-[var(--menu-text)]">
              <span>{dict.search.resultsCompact(trimmedQuery, totalMatches)}</span>
              <button
                type="button"
                onClick={onClearSearch}
                className="rounded-[7px] bg-[var(--menu-accent)] px-2.5 py-1 text-[12px] font-semibold text-[var(--menu-accent-contrast)] hover:bg-[var(--menu-accent-hover)]"
              >
                {dict.nav.clearSearch}
              </button>
            </div>

            {visibleSections.length === 0 ? (
              <section
                aria-live="polite"
                className="rounded-[12px] border border-[var(--menu-border)] bg-[var(--menu-surface)] px-5 py-8 text-left"
              >
                <p className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--menu-text-secondary)]">
                  {dict.search.eyebrow}
                </p>
                <h2 className="mt-1.5 text-[20px] leading-[1.25] font-bold text-[var(--menu-text)]">
                  {dict.search.emptyTitle}
                </h2>
                <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.55] text-[var(--menu-text-secondary)]">
                  {dict.search.emptySubtitleCategories}
                </p>
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="mt-5 inline-flex items-center rounded-[8px] bg-[var(--menu-accent)] px-4 py-2 text-[13px] font-semibold text-[var(--menu-accent-contrast)] hover:bg-[var(--menu-accent-hover)]"
                >
                  {dict.nav.clearSearch}
                </button>
              </section>
            ) : (
              <div className="space-y-6">
                {visibleSections.map((section, sectionIdx) => {
                  const catText = getCategoryText(section.category, language);
                  return (
                    <section
                      key={section.category.id}
                      aria-labelledby={`klasik-search-heading-${section.category.id}`}
                    >
                      <div className="mb-2 flex items-baseline justify-between gap-2 px-0.5">
                        <h2
                          id={`klasik-search-heading-${section.category.id}`}
                          className="text-[16px] font-bold text-[var(--menu-text)] md:text-[18px]"
                        >
                          {catText.shortLabel}
                        </h2>
                        <span className="shrink-0 text-[12px] font-medium text-[var(--menu-text-secondary)]">
                          {dict.counts.items(section.items.length)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 overflow-hidden rounded-[12px] border border-[var(--menu-border)] bg-[var(--menu-surface)] @[1060px]:grid-cols-2">
                        {section.items.map((item, itemIdx) => (
                          <div
                            key={item.id}
                            className="border-t border-[var(--menu-border)] first:border-t-0 @[1060px]:[&:nth-child(2)]:border-t-0 @[1060px]:odd:border-r"
                          >
                            <KlasikItemRow
                              item={item}
                              onSelect={onSelectItem}
                              language={language}
                              eager={sectionIdx === 0 && itemIdx < 4}
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tek DOM Fotoğraflı Kategori Gezinmesi (<lg üst şerit, lg+ sol yan panel) + Ürün Listesi */}
        {showItemList && activeSection && activeSectionText && (
          <div className="lg:grid lg:grid-cols-[248px_minmax(0,1fr)] lg:items-start lg:gap-7 xl:grid-cols-[252px_minmax(0,1fr)] xl:gap-8">
            <aside
              ref={navRef}
              aria-label={dict.nav.categoriesLabel}
              style={
                {
                  "--klasik-sticky-top": `${stickyTopOffset}px`,
                } as React.CSSProperties
              }
              className="sticky top-[var(--klasik-sticky-top)] z-30 -mx-4 border-b border-[var(--menu-border)] bg-[var(--menu-bg-glass)] px-4 py-2.5 backdrop-blur-sm md:-mx-8 md:px-8 md:py-3 lg:top-[calc(var(--klasik-sticky-top)+20px)] lg:mx-0 lg:max-h-[calc(100dvh-var(--klasik-sticky-top)-40px)] lg:overflow-y-auto lg:rounded-[12px] lg:border lg:border-[var(--menu-border)] lg:bg-[var(--menu-surface)] lg:p-3 lg:backdrop-blur-none"
            >
              <div className="mb-2 flex items-center justify-between gap-2 lg:mb-2.5">
                <button
                  type="button"
                  onClick={onBackToCategories}
                  className="inline-flex items-center gap-1.5 rounded-[8px] border border-[var(--menu-border-strong)] bg-[var(--menu-surface-muted)] px-3 py-1.5 text-[12.5px] font-semibold text-[var(--menu-text)] transition-colors hover:border-[var(--menu-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] lg:w-full lg:justify-center"
                >
                  <span aria-hidden="true">←</span>
                  <span>{dict.nav.backToCategories}</span>
                </button>
                <span className="text-[11.5px] font-medium text-[var(--menu-text-secondary)] lg:hidden">
                  {dict.counts.items(activeSection.items.length)}
                </span>
              </div>

              <div className="relative">
                <nav
                  ref={scrollStripRef}
                  aria-label={dict.nav.categoriesLabel}
                  className={`no-scrollbar flex items-stretch gap-2.5 overflow-x-auto pb-0.5 lg:flex-col lg:gap-1 lg:overflow-x-visible lg:pb-0 ${
                    canScrollRight ? "pr-6 lg:pr-0" : ""
                  }`}
                >
                  {categories.map((category, catIdx) => {
                    const isActive = category.id === activeCategoryId;
                    const catText = getCategoryText(category, language);
                    const count = allItems.filter(
                      (item) => item.categoryId === category.id
                    ).length;

                    return (
                      <button
                        key={category.id}
                        ref={(el) => {
                          tabRefs.current[category.id] = el;
                        }}
                        type="button"
                        onClick={() => {
                          if (isSearching) onClearSearch();
                          onSelectCategory(category.id);
                        }}
                        aria-current={isActive ? "true" : undefined}
                        className={`group flex w-[112px] shrink-0 flex-col items-stretch text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] md:w-[138px] lg:w-full lg:flex-row lg:items-center lg:gap-2.5 lg:rounded-[9px] lg:border lg:p-1 ${
                          isActive
                            ? "lg:border-[var(--menu-accent)] lg:bg-[var(--menu-surface-muted)]"
                            : "lg:border-transparent lg:hover:border-[var(--menu-border)] lg:hover:bg-[var(--menu-surface-hover)]"
                        }`}
                      >
                        <div
                          className={`relative h-[66px] w-full overflow-hidden rounded-[9px] bg-[var(--menu-surface-muted)] transition-all duration-150 md:h-[76px] lg:h-[40px] lg:w-[56px] lg:shrink-0 lg:rounded-[7px] ${
                            isActive
                              ? "ring-2 ring-[var(--menu-accent)] ring-offset-1 ring-offset-[var(--menu-surface)] lg:ring-0 lg:ring-offset-0"
                              : "border border-[var(--menu-border)] opacity-85 group-hover:opacity-100 lg:opacity-100"
                          }`}
                        >
                          {category.coverImageUrl && (
                            <MenuImage
                              src={category.coverImageUrl}
                              alt={catText.coverImageAlt}
                              preset="category-strip"
                              fill
                              sizes="(min-width: 1024px) 56px, (min-width: 768px) 138px, 112px"
                              loading={catIdx < 5 ? "eager" : "lazy"}
                              style={{
                                objectPosition:
                                  category.coverObjectPosition?.klasik ??
                                  "center center",
                              }}
                              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            />
                          )}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/80 via-black/35 to-transparent lg:hidden"
                          />
                          <span
                            className={`absolute inset-x-2 bottom-1.5 truncate text-[12.5px] leading-[1.15] text-white md:text-[13.5px] lg:hidden ${
                              isActive ? "font-bold" : "font-medium"
                            }`}
                          >
                            {catText.shortLabel}
                          </span>
                        </div>

                        <span
                          aria-hidden="true"
                          className={`mt-1.5 h-[3px] w-full rounded-full transition-colors lg:hidden ${
                            isActive ? "bg-[var(--menu-accent)]" : "bg-transparent"
                          }`}
                        />

                        <div className="hidden min-w-0 flex-1 lg:flex lg:flex-col">
                          <span
                            className={`truncate text-[13px] leading-[1.25] ${
                              isActive
                                ? "font-bold text-[var(--menu-accent)]"
                                : "font-semibold text-[var(--menu-text)]"
                            }`}
                          >
                            {catText.shortLabel}
                          </span>
                          <span className="mt-0.5 text-[11px] font-medium tabular-nums text-[var(--menu-text-secondary)]">
                            {dict.counts.items(count)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </nav>

                {canScrollLeft && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 flex w-6 items-center bg-gradient-to-r from-[var(--menu-surface)] via-[var(--menu-bg-glass)] to-transparent lg:hidden"
                  >
                    <span className="text-[14px] font-bold text-[var(--menu-text)]">
                      ‹
                    </span>
                  </div>
                )}

                {canScrollRight && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 flex w-7 items-center justify-end bg-gradient-to-l from-[var(--menu-surface)] via-[var(--menu-bg-glass)] to-transparent pr-0.5 lg:hidden"
                  >
                    <span className="text-[14px] font-bold text-[var(--menu-text)]">
                      ›
                    </span>
                  </div>
                )}
              </div>
            </aside>

            <section
              aria-labelledby={`klasik-heading-${activeSection.category.id}`}
              className="min-w-0 pt-3.5 md:pt-5 lg:pt-0 @container"
            >
              <div className="mb-2.5 flex items-baseline justify-between gap-3 px-0.5">
                <div className="min-w-0">
                  <h2
                    id={`klasik-heading-${activeSection.category.id}`}
                    className="text-[17px] leading-[1.2] font-bold tracking-[-0.015em] text-[var(--menu-text)] md:text-[20px] lg:text-[23px]"
                  >
                    <span className="md:hidden">
                      {activeSectionText.shortLabel}
                    </span>
                    <span className="hidden md:inline">
                      {activeSectionText.name}
                    </span>
                  </h2>
                </div>
                <span className="shrink-0 text-[12.5px] font-medium text-[var(--menu-text-secondary)]">
                  {dict.counts.items(activeSection.items.length)}
                </span>
              </div>

              <div className="grid grid-cols-1 overflow-hidden rounded-[12px] border border-[var(--menu-border)] bg-[var(--menu-surface)] @[1060px]:grid-cols-2">
                {activeSection.items.map((item, idx) => (
                  <div
                    key={item.id}
                    className="border-t border-[var(--menu-border)] first:border-t-0 @[1060px]:[&:nth-child(2)]:border-t-0 @[1060px]:odd:border-r"
                  >
                    <KlasikItemRow
                      item={item}
                      onSelect={onSelectItem}
                      language={language}
                      eager={idx < 4}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <footer
        className={`mx-auto w-full px-4 pb-10 ${getThemeContainerClass("klasik")}`}
      >
        <div className="border-t border-[var(--menu-border)] pt-4 text-[12px] text-[var(--menu-text-secondary)]">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <strong className="font-semibold text-[var(--menu-text)]">
                {business.name}
              </strong>{" "}
              · {business.address} ·{" "}
              <a
                href={business.phoneHref}
                className="font-medium text-[var(--menu-text)] hover:underline"
              >
                {business.phone}
              </a>
            </span>
            <span>{dict.meta.vatIncluded}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
