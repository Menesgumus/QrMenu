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

export type CanliViewMode = "categories" | "items";

export interface CanliVisibleSection {
  category: MenuCategory;
  orderLabel: string;
  items: MenuItem[];
}

interface CanliMenuViewProps {
  business: BusinessProfile;
  categories: MenuCategory[];
  allItems: MenuItem[];
  visibleSections: CanliVisibleSection[];
  activeCategoryId: string;
  viewMode: CanliViewMode;
  onSelectCategory: (categoryId: string) => void;
  onBackToCategories: () => void;
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

function CanliItemRow({
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
  const dict = getUiDictionary(language);
  const { cardName, description, imageAlt } = getItemText(item, language);
  const formattedPrice = formatPriceTRY(item.priceKurus);

  return (
    <button
      type="button"
      onClick={(event) => onSelect(item, event.currentTarget)}
      className="group flex h-full w-full items-start gap-3.5 rounded-[14px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-surface)] p-3 text-left shadow-[2px_2px_0_var(--menu-shadow-ink)] transition-[transform,box-shadow,border-color] duration-150 hover:-translate-y-0.5 hover:border-[var(--menu-accent)] hover:shadow-[3px_3px_0_var(--menu-shadow-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] md:items-center md:gap-4 md:p-3.5 @[1040px]:items-start"
    >
      {item.image && (
        <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[10px] border border-[var(--menu-border)] bg-[var(--menu-surface-muted)] md:h-[104px] md:w-[104px]">
          <MenuImage
            src={item.image.thumbUrl}
            alt={imageAlt}
            preset="item-row"
            fill
            sizes="(max-width: 767px) 88px, 104px"
            loading={eager ? "eager" : "lazy"}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="@[1040px]:flex @[1040px]:items-start @[1040px]:justify-between @[1040px]:gap-3">
          <h3
            style={{
              fontFamily: "var(--font-lively-display), system-ui, sans-serif",
            }}
            className="font-lively-display min-w-0 flex-1 text-[17px] leading-[1.2] font-bold tracking-[-0.01em] text-[var(--menu-text)] transition-colors group-hover:text-[var(--menu-accent)] md:text-[18.5px]"
          >
            {cardName}
          </h3>
          <span className="hidden shrink-0 items-center whitespace-nowrap rounded-[8px] bg-[var(--menu-accent)] px-2.5 py-0.5 text-[15px] font-extrabold tabular-nums text-[var(--menu-accent-contrast)] transition-colors group-hover:bg-[var(--menu-accent-hover)] @[1040px]:inline-flex">
            {formattedPrice}
          </span>
        </div>

        {description && (
          <p className="mt-1 line-clamp-2 text-[13px] leading-[1.45] text-[var(--menu-text-secondary)] md:text-[13.5px]">
            {description}
          </p>
        )}

        {/* Mobilde fiyat açıklamanın hemen altında */}
        <div className="mt-2 flex items-center justify-between gap-2 md:hidden">
          <span className="inline-flex items-center rounded-[7px] bg-[var(--menu-accent)] px-2.5 py-0.5 text-[14px] font-extrabold tabular-nums text-[var(--menu-accent-contrast)]">
            {formattedPrice}
          </span>
          <span className="text-[11.5px] font-semibold text-[var(--menu-text-secondary)] group-hover:text-[var(--menu-accent)]">
            {dict.nav.viewAction}
          </span>
        </div>

        {/* 2 sütun masaüstü görünümde açıklama altında detay ipucu */}
        <div className="mt-2 hidden @[1040px]:flex @[1040px]:justify-end">
          <span className="text-[11.5px] font-semibold text-[var(--menu-text-secondary)] group-hover:text-[var(--menu-accent)]">
            {dict.nav.detailsAction}
          </span>
        </div>
      </div>

      {/* Tablet ve 1 sütunlu masaüstünde sağ fiyat sütunu */}
      <div className="hidden shrink-0 flex-col items-end justify-center pl-3 md:flex @[1040px]:hidden">
        <span className="inline-flex items-center whitespace-nowrap rounded-[8px] bg-[var(--menu-accent)] px-3 py-1 text-[16px] font-extrabold tabular-nums text-[var(--menu-accent-contrast)] transition-colors group-hover:bg-[var(--menu-accent-hover)]">
          {formattedPrice}
        </span>
        <span className="mt-1.5 text-[11.5px] font-semibold text-[var(--menu-text-secondary)] group-hover:text-[var(--menu-accent)]">
          {dict.nav.detailsAction}
        </span>
      </div>
    </button>
  );
}

export function CanliMenuView({
  business,
  categories,
  allItems,
  visibleSections,
  activeCategoryId,
  viewMode,
  onSelectCategory,
  onBackToCategories,
  searchQuery,
  onSearchChange,
  onClearSearch,
  isSearching,
  totalMatches,
  onSelectItem,
  language,
  navRef,
  stickyTopOffset = 0,
}: CanliMenuViewProps) {
  const scrollStripRef = useRef<HTMLElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const dict = getUiDictionary(language);
  const showCategoryCards = !isSearching && viewMode === "categories";
  const showItemList = !isSearching && viewMode === "items";
  const trimmedQuery = searchQuery.trim();

  const activeCategorySection =
    visibleSections.find(
      (section) => section.category.id === activeCategoryId
    ) ?? visibleSections[0];

  const categoryCards = categories
    .map((category, index) => {
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
        text,
        orderLabel: String(index + 1).padStart(2, "0"),
        count: categoryItems.length,
        coverUrl:
          category.coverImageUrl ?? fallbackItem?.image?.gridUrl ?? "",
        coverAlt: category.coverImageUrl ? text.coverImageAlt : fallbackAlt,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  useEffect(() => {
    if (!showItemList) return;
    const strip = scrollStripRef.current;
    const activeTab = tabRefs.current[activeCategoryId];
    if (!strip || !activeTab) return;

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

  const livelyHeadingFont = {
    fontFamily: "var(--font-lively-display), system-ui, sans-serif",
  } as const;

  const livelyBodyFont = {
    fontFamily: "var(--font-visual-sans), system-ui, sans-serif",
  } as const;

  const activeCategoryText = activeCategorySection
    ? getCategoryText(activeCategorySection.category, language)
    : null;

  return (
    <div
      style={livelyBodyFont}
      className="min-h-screen bg-[var(--menu-bg)] text-[var(--menu-text)] font-visual selection:bg-[var(--menu-selection-bg)] selection:text-[var(--menu-selection-text)]"
    >
      {/* Kompakt Canlı İşletme Başlığı (sarı/hardal ana renk bloğu) */}
      <header className="border-b-2 border-[var(--menu-border-strong)] bg-[var(--menu-band-bg)] text-[var(--menu-band-text)]">
        <div
          className={`mx-auto w-full px-4 py-2.5 md:py-4 ${getThemeContainerClass("canli")}`}
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-3">
            <div className="flex min-w-0 items-center gap-2.5 md:gap-3">
              <div
                style={{
                  backgroundColor: "var(--menu-logo-bg)",
                  borderColor: "var(--menu-logo-border)",
                  color: "var(--menu-logo-ink)",
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border-[1.5px] p-1 shadow-[2px_2px_0_var(--menu-band-text)] md:h-11 md:w-11 md:p-1.5"
              >
                <BrandMark className="h-[26px] w-[26px] shrink-0 md:h-7 md:w-7" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1
                    style={livelyHeadingFont}
                    className="font-lively-display text-[20px] leading-[1.08] font-extrabold tracking-[-0.015em] text-[var(--menu-band-text)] md:text-[26px]"
                  >
                    {business.name}
                  </h1>
                </div>

                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] leading-[1.35] font-medium text-[var(--menu-band-muted)] md:mt-1 md:text-[12.5px]">
                  <span>{business.address}</span>
                  <span aria-hidden="true" className="opacity-55">
                    ·
                  </span>
                  <span className="tabular-nums">{business.hours}</span>
                  <span aria-hidden="true" className="opacity-55">
                    ·
                  </span>
                  <a
                    href={business.phoneHref}
                    className="font-bold tabular-nums text-[var(--menu-band-text)] underline decoration-[var(--menu-band-text)]/40 underline-offset-2 hover:opacity-80"
                  >
                    {business.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Kompakt Arama Alanı */}
            <div className="w-full shrink-0 md:w-[300px] lg:w-[340px]">
              <label htmlFor="canli-menu-search" className="sr-only">
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
                    strokeWidth="1.75"
                  />
                  <path
                    d="M13.2 13.2L16.8 16.8"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  id="canli-menu-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => onSearchChange(event.target.value)}
                  placeholder={dict.nav.searchPlaceholderShort}
                  className={`h-10 w-full rounded-[10px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-bg)] pl-9 text-[13.5px] font-medium text-[var(--menu-text)] placeholder:text-[var(--menu-text-secondary)] focus:border-[var(--menu-accent)] focus:outline-none ${
                    searchQuery.length > 0 ? "pr-20" : "pr-3.5"
                  }`}
                />
                {searchQuery.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearSearch}
                    className="absolute right-1.5 rounded-[7px] bg-[var(--menu-accent)] px-2.5 py-1 text-[11.5px] font-bold text-[var(--menu-accent-contrast)] transition-colors hover:bg-[var(--menu-accent-hover)]"
                  >
                    {dict.nav.clear}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Ürün Listesi Modunda Mobil & Tablet Dikey Sabit Kategori ve Dönüş Çubuğu */}
      {showItemList && (
        <div
          ref={navRef}
          style={{
            top: `${stickyTopOffset}px`,
            backgroundColor: "var(--menu-bg-glass)",
          }}
          className="sticky z-30 border-b-[1.5px] border-[var(--menu-border-strong)] backdrop-blur-sm lg:hidden"
        >
          <div
            className={`mx-auto flex w-full flex-col gap-2 px-4 py-2 md:flex-row md:items-center md:justify-between md:gap-4 md:py-2.5 ${getThemeContainerClass("canli")}`}
          >
            <div className="flex shrink-0 items-center">
              <button
                type="button"
                onClick={onBackToCategories}
                className="inline-flex items-center gap-1.5 rounded-[10px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-band-bg)] px-3 py-1.5 text-[12.5px] font-bold text-[var(--menu-band-text)] shadow-[2px_2px_0_var(--menu-shadow-ink)] transition-colors hover:bg-[var(--menu-accent)] hover:text-[var(--menu-accent-contrast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)]"
              >
                <span aria-hidden="true">←</span>
                <span>{dict.nav.backToCategories}</span>
              </button>
            </div>

            <div className="relative min-w-0 flex-1">
              <nav
                ref={scrollStripRef}
                aria-label={dict.nav.categoriesLabel}
                className={`no-scrollbar flex w-full items-center gap-1.5 overflow-x-auto ${
                  canScrollRight ? "pr-7" : ""
                }`}
              >
                {categories.map((category) => {
                  const isActive = category.id === activeCategoryId;
                  const { shortLabel } = getCategoryText(category, language);

                  return (
                    <button
                      key={category.id}
                      ref={(el) => {
                        tabRefs.current[category.id] = el;
                      }}
                      type="button"
                      onClick={() => onSelectCategory(category.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`shrink-0 rounded-full border-[1.5px] px-3.5 py-1 text-[12.5px] font-bold whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] ${
                        isActive
                          ? "border-[var(--menu-accent)] bg-[var(--menu-accent)] text-[var(--menu-accent-contrast)]"
                          : "border-[var(--menu-border-strong)] bg-[var(--menu-surface)] text-[var(--menu-text)] hover:bg-[var(--menu-band-bg)] hover:text-[var(--menu-band-text)]"
                      }`}
                    >
                      {shortLabel}
                    </button>
                  );
                })}
              </nav>

              {canScrollLeft && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 flex w-6 items-center bg-gradient-to-r from-[var(--menu-bg)] via-[var(--menu-bg-glass)] to-transparent"
                >
                  <span className="text-[13px] leading-none font-bold text-[var(--menu-text-secondary)]">
                    ‹
                  </span>
                </div>
              )}

              {canScrollRight && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 flex w-8 items-center justify-end bg-gradient-to-l from-[var(--menu-bg)] via-[var(--menu-bg-glass)] to-transparent pr-0.5"
                >
                  <span className="text-[13px] leading-none font-bold text-[var(--menu-accent)]">
                    ›
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <main
        className={`mx-auto w-full px-4 pt-3 pb-16 md:pt-7 ${getThemeContainerClass("canli")}`}
      >
        {/* AÇILIŞ: GÖRSELLİ KATEGORİ KARTLARI */}
        {showCategoryCards && (
          <section aria-labelledby="canli-categories-heading">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b-[1.5px] border-[var(--menu-border-strong)] pb-2 md:mb-4 md:items-end md:pb-3">
              <div>
                <p className="hidden items-center rounded-full bg-[var(--menu-band-bg)] px-2.5 py-0.5 text-[11px] font-bold tracking-[0.06em] uppercase text-[var(--menu-band-text)] md:inline-flex">
                  {dict.nav.categoriesPill}
                </p>
                <h2
                  id="canli-categories-heading"
                  style={livelyHeadingFont}
                  className="font-lively-display text-[18px] leading-[1.2] font-extrabold tracking-[-0.015em] text-[var(--menu-text)] md:mt-1.5 md:text-[28px]"
                >
                  {dict.nav.categoriesPrompt}
                </h2>
              </div>
              <span className="shrink-0 text-[12px] font-bold text-[var(--menu-text-secondary)] md:text-[12.5px]">
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
                    className={`group flex overflow-hidden rounded-[16px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-surface)] text-left shadow-[3px_3px_0_var(--menu-shadow-ink)] transition-[transform,box-shadow,border-color] duration-150 hover:-translate-y-0.5 hover:border-[var(--menu-accent)] hover:shadow-[4px_4px_0_var(--menu-shadow-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] ${
                      isLastOddMobile
                        ? "col-span-2 flex-row items-stretch md:col-span-1 md:flex-col"
                        : "flex-col"
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden bg-[var(--menu-surface-muted)] ${
                        isLastOddMobile
                          ? "aspect-square w-[132px] shrink-0 border-r-[1.5px] border-[var(--menu-border-strong)] md:aspect-[4/3] md:w-full md:border-r-0 md:border-b-[1.5px]"
                          : "aspect-[4/3] w-full border-b-[1.5px] border-[var(--menu-border-strong)]"
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
                              ? "(max-width: 767px) 132px, (max-width: 1023px) calc((100vw - 96px) / 3), (max-width: 1279px) calc((100vw - 104px) / 3), (max-width: 1519px) calc((100vw - 140px) / 4), 345px"
                              : "(max-width: 767px) calc((100vw - 44px) / 2), (max-width: 1023px) calc((100vw - 96px) / 3), (max-width: 1279px) calc((100vw - 104px) / 3), (max-width: 1519px) calc((100vw - 140px) / 4), 345px"
                          }
                          loading={index < 6 ? "eager" : "lazy"}
                          fetchPriority={
                            index === 0 || index === 2 ? "high" : undefined
                          }
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                      )}
                      <span className="absolute top-2 left-2 rounded-[6px] border border-[#24201B] bg-[var(--menu-band-bg)] px-2 py-0.5 text-[11px] font-extrabold tabular-nums text-[var(--menu-band-text)]">
                        {card.orderLabel}
                      </span>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 bg-[var(--menu-bg)] p-3 md:p-3.5">
                      <div>
                        <h3
                          style={livelyHeadingFont}
                          className="font-lively-display text-[17.5px] leading-[1.15] font-extrabold tracking-[-0.01em] text-[var(--menu-text)] transition-colors group-hover:text-[var(--menu-accent)] md:text-[20px]"
                        >
                          {card.text.shortLabel}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-[11.5px] leading-[1.35] font-medium text-[var(--menu-text-secondary)] md:text-[12px]">
                          {card.text.name}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="inline-flex items-center rounded-full border border-[var(--menu-border-strong)] bg-[var(--menu-band-bg)] px-2.5 py-0.5 text-[11.5px] font-bold text-[var(--menu-band-text)]">
                          {dict.counts.items(card.count)}
                        </span>
                        <span className="text-[12px] font-extrabold text-[var(--menu-accent)] transition-transform group-hover:translate-x-0.5">
                          {dict.nav.openAction}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* ARAMA SONUÇLARI (TÜM MENÜ) */}
        {isSearching && (
          <div className="@container">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-[12px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-band-bg)] px-4 py-2.5 text-[13px] font-semibold text-[var(--menu-band-text)]">
              <span>{dict.search.resultsForQuery(trimmedQuery, totalMatches)}</span>
              <button
                type="button"
                onClick={onClearSearch}
                className="rounded-[7px] bg-[var(--menu-accent)] px-2.5 py-1 text-[12px] font-bold text-[var(--menu-accent-contrast)] hover:bg-[var(--menu-accent-hover)]"
              >
                {dict.nav.clear}
              </button>
            </div>

            {visibleSections.length === 0 ? (
              <section
                aria-live="polite"
                className="rounded-[16px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-surface)] px-5 py-8 shadow-[3px_3px_0_var(--menu-shadow-ink)]"
              >
                <p className="inline-block rounded-full bg-[var(--menu-band-bg)] px-2.5 py-0.5 text-[11px] font-bold tracking-[0.06em] uppercase text-[var(--menu-band-text)]">
                  {dict.search.eyebrow}
                </p>
                <h2
                  style={livelyHeadingFont}
                  className="mt-2 font-lively-display text-[24px] leading-[1.15] font-extrabold text-[var(--menu-text)]"
                >
                  {dict.search.emptyTitle}
                </h2>
                <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.55] text-[var(--menu-text-secondary)]">
                  {dict.search.emptySubtitleCategories}
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={onClearSearch}
                    className="inline-flex items-center rounded-[10px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-accent)] px-4 py-2 text-[13px] font-bold text-[var(--menu-accent-contrast)] transition-colors hover:bg-[var(--menu-accent-hover)]"
                  >
                    {dict.nav.clearSearch}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClearSearch();
                      onBackToCategories();
                    }}
                    className="inline-flex items-center rounded-[10px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-band-bg)] px-4 py-2 text-[13px] font-bold text-[var(--menu-band-text)] transition-opacity hover:opacity-90"
                  >
                    {dict.nav.backToCategories}
                  </button>
                </div>
              </section>
            ) : (
              <div className="space-y-8">
                {visibleSections.map((section, sectionIdx) => {
                  const catText = getCategoryText(section.category, language);

                  return (
                    <section
                      key={section.category.id}
                      aria-labelledby={`canli-search-heading-${section.category.id}`}
                    >
                      <div className="mb-3 flex items-center justify-between gap-3 border-b-[1.5px] border-[var(--menu-border-strong)] pb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="rounded-[6px] border border-[var(--menu-border-strong)] bg-[var(--menu-band-bg)] px-2 py-0.5 text-[11px] font-extrabold tabular-nums text-[var(--menu-band-text)]">
                            {section.orderLabel}
                          </span>
                          <h2
                            id={`canli-search-heading-${section.category.id}`}
                            style={livelyHeadingFont}
                            className="font-lively-display text-[20px] leading-[1.15] font-extrabold text-[var(--menu-text)] md:text-[24px]"
                          >
                            {catText.name}
                          </h2>
                        </div>
                        <span className="shrink-0 text-[12px] font-bold text-[var(--menu-accent)]">
                          {dict.counts.items(section.items.length)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-3 @[1040px]:grid-cols-2 @[1040px]:gap-4">
                        {section.items.map((item, itemIdx) => (
                          <CanliItemRow
                            key={item.id}
                            item={item}
                            onSelect={onSelectItem}
                            language={language}
                            eager={sectionIdx === 0 && itemIdx < 4}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SEÇİLİ KATEGORİ ÜRÜN LİSTESİ */}
        {showItemList && activeCategorySection && activeCategoryText && (
          <div className="lg:grid lg:grid-cols-[236px_minmax(0,1fr)] lg:items-start lg:gap-7 xl:grid-cols-[256px_minmax(0,1fr)] xl:gap-8">
            <aside
              aria-label={dict.nav.categoriesLabel}
              style={{
                top: `${stickyTopOffset + 20}px`,
                maxHeight: `calc(100dvh - ${stickyTopOffset + 40}px)`,
              }}
              className="hidden lg:sticky lg:block lg:overflow-y-auto lg:pr-1 lg:pb-2"
            >
              <div className="rounded-[16px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-surface)] p-3.5 shadow-[3px_3px_0_var(--menu-shadow-ink)]">
                <button
                  type="button"
                  onClick={onBackToCategories}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-band-bg)] px-3 py-2 text-[12.5px] font-bold text-[var(--menu-band-text)] shadow-[2px_2px_0_var(--menu-shadow-ink)] transition-colors hover:bg-[var(--menu-accent)] hover:text-[var(--menu-accent-contrast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)]"
                >
                  <span aria-hidden="true">←</span>
                  <span>{dict.nav.backToCategories}</span>
                </button>

                <nav aria-label={dict.nav.categoriesLabel} className="mt-3.5">
                  <p className="px-1.5 pb-1.5 text-[11px] font-extrabold tracking-[0.08em] uppercase text-[var(--menu-text-secondary)]">
                    {dict.nav.categoriesPill}
                  </p>
                  <ul className="space-y-1">
                    {categories.map((category, idx) => {
                      const isActive = category.id === activeCategoryId;
                      const orderLabel = String(idx + 1).padStart(2, "0");
                      const { name } = getCategoryText(category, language);

                      return (
                        <li key={category.id}>
                          <button
                            type="button"
                            onClick={() => onSelectCategory(category.id)}
                            aria-current={isActive ? "true" : undefined}
                            className={`flex w-full items-start gap-2 rounded-[10px] border-[1.5px] px-2.5 py-2 text-left text-[13px] leading-[1.3] font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] ${
                              isActive
                                ? "border-[var(--menu-accent)] bg-[var(--menu-accent)] text-[var(--menu-accent-contrast)]"
                                : "border-transparent text-[var(--menu-text)] hover:border-[var(--menu-border-strong)] hover:bg-[var(--menu-band-bg)] hover:text-[var(--menu-band-text)]"
                            }`}
                          >
                            <span
                              className={`mt-[1px] shrink-0 text-[11px] font-extrabold tabular-nums ${
                                isActive
                                  ? "text-[var(--menu-accent-contrast)] opacity-85"
                                  : "text-[var(--menu-accent)]"
                              }`}
                            >
                              {orderLabel}
                            </span>
                            <span className="min-w-0 flex-1">{name}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </aside>

            <section
              aria-labelledby={`canli-heading-${activeCategorySection.category.id}`}
              className="min-w-0 @container"
            >
              <div className="mb-3 flex items-center justify-between gap-2.5 rounded-[12px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-band-bg)] px-3.5 py-2 shadow-[2px_2px_0_var(--menu-shadow-ink)] md:mb-4 md:items-end md:rounded-[14px] md:px-4 md:py-3 md:shadow-[3px_3px_0_var(--menu-shadow-ink)]">
                <div className="flex min-w-0 items-center gap-2 md:block">
                  <span className="inline-flex shrink-0 items-center rounded-full border border-[var(--menu-border-strong)] bg-[var(--menu-bg)] px-2 py-0.5 text-[11px] font-extrabold tabular-nums text-[var(--menu-accent)] md:hidden">
                    {activeCategorySection.orderLabel}
                  </span>
                  <span className="hidden rounded-full border border-[var(--menu-border-strong)] bg-[var(--menu-bg)] px-2.5 py-0.5 text-[11px] font-extrabold tabular-nums text-[var(--menu-accent)] md:inline-block">
                    {activeCategorySection.orderLabel} ·{" "}
                    {activeCategoryText.shortLabel}
                  </span>
                  <h2
                    id={`canli-heading-${activeCategorySection.category.id}`}
                    style={livelyHeadingFont}
                    className="font-lively-display text-[20px] leading-[1.15] font-extrabold tracking-[-0.015em] text-[var(--menu-band-text)] md:mt-1.5 md:text-[30px] md:leading-[1.12]"
                  >
                    <span className="md:hidden">
                      {activeCategoryText.shortLabel}
                    </span>
                    <span className="hidden md:inline">
                      {activeCategoryText.name}
                    </span>
                  </h2>
                </div>
                <span className="shrink-0 rounded-[8px] border border-[var(--menu-border-strong)] bg-[var(--menu-bg)] px-2.5 py-0.5 text-[12px] font-extrabold text-[var(--menu-text)] md:py-1">
                  {dict.counts.items(activeCategorySection.items.length)}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 @[1040px]:grid-cols-2 @[1040px]:gap-4">
                {activeCategorySection.items.map((item, idx) => (
                  <CanliItemRow
                    key={item.id}
                    item={item}
                    onSelect={onSelectItem}
                    language={language}
                    eager={idx < 4}
                  />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      <footer
        className={`mx-auto w-full px-4 pb-10 ${getThemeContainerClass("canli")}`}
      >
        <div className="border-t-[1.5px] border-[var(--menu-border-strong)] pt-4 text-[12.5px] font-medium text-[var(--menu-text-secondary)]">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <strong className="font-bold text-[var(--menu-text)]">
                {business.name}
              </strong>{" "}
              · {business.address} ·{" "}
              <a
                href={business.phoneHref}
                className="font-bold text-[var(--menu-text)] underline decoration-[var(--menu-border-strong)] underline-offset-2 hover:text-[var(--menu-accent)]"
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
