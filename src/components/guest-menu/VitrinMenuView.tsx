"use client";

import Image from "next/image";
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

export type VitrinViewMode = "categories" | "items";

export interface VitrinVisibleSection {
  category: MenuCategory;
  orderLabel: string;
  items: MenuItem[];
}

interface VitrinMenuViewProps {
  business: BusinessProfile;
  categories: MenuCategory[];
  allItems: MenuItem[];
  visibleSections: VitrinVisibleSection[];
  activeCategoryId: string;
  viewMode: VitrinViewMode;
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

function VitrinItemRow({
  item,
  onSelect,
  language,
}: {
  item: MenuItem;
  onSelect: (item: MenuItem, triggerEl: HTMLButtonElement) => void;
  language: MenuLanguage;
}) {
  const dict = getUiDictionary(language);
  const { cardName, description, imageAlt } = getItemText(item, language);
  const formattedPrice = formatPriceTRY(item.priceKurus);

  return (
    <button
      type="button"
      onClick={(event) => onSelect(item, event.currentTarget)}
      className="group flex w-full items-center gap-3.5 rounded-[12px] border border-[var(--menu-border)] bg-[var(--menu-surface)] p-2.5 text-left transition-colors duration-150 hover:border-[var(--menu-border-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] md:gap-4 md:p-3.5"
    >
      {item.image && (
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[9px] bg-[var(--menu-surface-muted)] md:h-[108px] md:w-[108px]">
          <Image
            src={item.image.gridUrl}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 108px, 96px"
            unoptimized
            style={{
              objectPosition:
                item.image.focalPointByTheme?.vitrin ?? "center center",
            }}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h3 className="text-[15.5px] leading-[1.28] font-semibold tracking-[-0.01em] text-[var(--menu-text)] md:text-[17px]">
          {cardName}
        </h3>

        {description && (
          <p className="mt-1 line-clamp-2 text-[13px] leading-[1.44] text-[var(--menu-text-secondary)] md:text-[13.5px]">
            {description}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between gap-2 md:hidden">
          <span className="text-[15.5px] font-bold tabular-nums text-[var(--menu-text)]">
            {formattedPrice}
          </span>
          <span className="text-[12px] font-medium text-[var(--menu-text-secondary)]">
            {dict.nav.detailsAction}
          </span>
        </div>
      </div>

      <div className="hidden shrink-0 flex-col items-end justify-center pl-4 text-right md:flex">
        <span className="whitespace-nowrap text-[17px] font-bold tabular-nums text-[var(--menu-text)]">
          {formattedPrice}
        </span>
        <span className="mt-1 text-[12px] font-medium text-[var(--menu-text-secondary)] group-hover:text-[var(--menu-text)]">
          {dict.nav.detailsAction}
        </span>
      </div>
    </button>
  );
}

export function VitrinMenuView({
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
}: VitrinMenuViewProps) {
  const scrollStripRef = useRef<HTMLElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const dict = getUiDictionary(language);
  const showCategoryShowcase = !isSearching && viewMode === "categories";
  const showItemList = !isSearching && viewMode === "items";
  const showSearchInput = searchOpen || isSearching;
  const trimmedQuery = searchQuery.trim();

  const activeCategorySection =
    visibleSections.find(
      (section) => section.category.id === activeCategoryId
    ) ?? visibleSections[0];

  const categoryTiles = categories
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
        shortTitle: text.shortLabel,
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

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const vitrinFontStyle = {
    fontFamily: "var(--font-vitrin-sans), system-ui, sans-serif",
  } as const;

  const activeSectionText = activeCategorySection
    ? getCategoryText(activeCategorySection.category, language)
    : null;

  return (
    <div
      style={vitrinFontStyle}
      className="min-h-screen bg-[var(--menu-bg)] text-[var(--menu-text)] font-vitrin selection:bg-[var(--menu-selection-bg)] selection:text-[var(--menu-selection-text)]"
    >
      {/* Belirgin Logolu fakat Kompakt İşletme Başlığı */}
      <header className="border-b border-[var(--menu-border)] bg-[var(--menu-bg)]">
        <div className="mx-auto w-full max-w-[960px] px-4 py-2.5 md:px-8 md:py-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div
                style={{
                  backgroundColor: "var(--menu-logo-bg)",
                  borderColor: "var(--menu-logo-border)",
                  color: "var(--menu-logo-ink)",
                }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border p-1.5"
              >
                <BrandMark className="h-7 w-7 shrink-0" />
              </div>

              <div className="min-w-0">
                <h1 className="text-[20px] leading-[1.12] font-semibold tracking-[-0.02em] text-[var(--menu-text)] md:text-[23px]">
                  {business.name}
                </h1>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11.5px] leading-[1.35] text-[var(--menu-text-secondary)] md:text-[12.5px]">
                  <span>{business.address}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{business.hours}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onToggleSearch}
              aria-expanded={showSearchInput}
              aria-controls="vitrin-search-panel"
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] ${
                showSearchInput
                  ? "border-[var(--menu-accent)] bg-[var(--menu-accent)] text-[var(--menu-accent-contrast)]"
                  : "border-[var(--menu-border-strong)] bg-[var(--menu-surface)] text-[var(--menu-text)] hover:border-[var(--menu-accent)]"
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
                  strokeWidth="1.65"
                />
                <path
                  d="M13.2 13.2L16.8 16.8"
                  stroke="currentColor"
                  strokeWidth="1.65"
                  strokeLinecap="round"
                />
              </svg>
              <span>{dict.nav.searchButton}</span>
            </button>
          </div>

          {showSearchInput && (
            <div id="vitrin-search-panel" className="mt-2.5">
              <label htmlFor="vitrin-menu-search" className="sr-only">
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
                  id="vitrin-menu-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => onSearchChange(event.target.value)}
                  placeholder={dict.nav.searchPlaceholderShort}
                  className={`h-10 w-full rounded-full border border-[var(--menu-border-strong)] bg-[var(--menu-surface)] pl-9 text-[13.5px] font-medium text-[var(--menu-text)] placeholder:text-[var(--menu-text-secondary)] focus:border-[var(--menu-accent)] focus:outline-none ${
                    searchQuery.length > 0 ? "pr-20" : "pr-4"
                  }`}
                />
                {searchQuery.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearSearch}
                    className="absolute right-1.5 rounded-full bg-[var(--menu-accent)] px-3 py-1 text-[11.5px] font-medium text-[var(--menu-accent-contrast)] hover:bg-[var(--menu-accent-hover)]"
                  >
                    {dict.nav.clear}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Kategori İçindeki Ürün Görünümünde Dönüş & Diğer Kategoriler Şeridi */}
      {showItemList && (
        <div
          ref={navRef}
          style={{
            top: `${stickyTopOffset}px`,
            backgroundColor: "var(--menu-bg-glass)",
          }}
          className="sticky z-30 border-b border-[var(--menu-border)] backdrop-blur-sm"
        >
          <div className="mx-auto flex w-full max-w-[960px] flex-col gap-2 px-4 py-2 md:flex-row md:items-center md:justify-between md:gap-4 md:px-8 md:py-2.5">
            <div className="flex shrink-0 items-center">
              <button
                type="button"
                onClick={onBackToCategories}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--menu-border-strong)] bg-[var(--menu-surface)] px-3.5 py-1.5 text-[12.5px] font-semibold text-[var(--menu-text)] transition-colors hover:border-[var(--menu-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)]"
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
                  canScrollRight ? "pr-6" : ""
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
                      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] ${
                        isActive
                          ? "border-[var(--menu-accent)] bg-[var(--menu-accent)] font-semibold text-[var(--menu-accent-contrast)]"
                          : "border-[var(--menu-border)] bg-[var(--menu-surface)] text-[var(--menu-text-secondary)] hover:border-[var(--menu-border-strong)] hover:text-[var(--menu-text)]"
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
                  <span className="text-[13px] font-semibold text-[var(--menu-text-secondary)]">
                    ‹
                  </span>
                </div>
              )}

              {canScrollRight && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 flex w-7 items-center justify-end bg-gradient-to-l from-[var(--menu-bg)] via-[var(--menu-bg-glass)] to-transparent pr-0.5"
                >
                  <span className="text-[13px] font-semibold text-[var(--menu-text)]">
                    ›
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-[960px] px-4 pt-3 pb-16 md:px-8 md:pt-5">
        {/* AÇILIŞ EKRANI: FOTOĞRAF ODAKLI KATEGORİ KUTULARI */}
        {showCategoryShowcase && (
          <section aria-label={dict.nav.categoriesShowcaseLabel}>
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3.5">
              {categoryTiles.map((tile, index) => {
                const isLastOddMobile =
                  categoryTiles.length % 2 === 1 &&
                  index === categoryTiles.length - 1;

                return (
                  <button
                    key={tile.category.id}
                    type="button"
                    onClick={() => onSelectCategory(tile.category.id)}
                    className={`group relative overflow-hidden rounded-[12px] bg-[var(--menu-surface-muted)] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] ${
                      isLastOddMobile
                        ? "col-span-2 aspect-[2/1] md:col-span-1 md:aspect-[4/5]"
                        : "aspect-[4/5]"
                    }`}
                  >
                    {tile.coverUrl && (
                      <Image
                        src={tile.coverUrl}
                        alt={tile.coverAlt}
                        fill
                        sizes="(min-width: 768px) 300px, 48vw"
                        unoptimized
                        style={{
                          objectPosition:
                            tile.category.coverObjectPosition?.vitrin ??
                            "center center",
                        }}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    )}

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] bg-gradient-to-t from-black/75 via-black/30 to-transparent"
                    />

                    <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                      <h2 className="text-[18px] leading-[1.15] font-semibold tracking-[-0.015em] text-white md:text-[21px]">
                        {tile.shortTitle}
                      </h2>
                      <p className="mt-0.5 text-[12px] font-medium text-white/85 md:text-[12.5px]">
                        {dict.counts.items(tile.count)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* ARAMA SONUÇLARI */}
        {isSearching && (
          <div>
            <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2 rounded-[10px] border border-[var(--menu-border)] bg-[var(--menu-surface)] px-3.5 py-2.5 text-[13px] text-[var(--menu-text)]">
              <span>{dict.search.resultsCompact(trimmedQuery, totalMatches)}</span>
              <button
                type="button"
                onClick={onClearSearch}
                className="rounded-full bg-[var(--menu-accent)] px-3 py-1 text-[12px] font-medium text-[var(--menu-accent-contrast)] hover:bg-[var(--menu-accent-hover)]"
              >
                {dict.nav.clearSearch}
              </button>
            </div>

            {visibleSections.length === 0 ? (
              <section
                aria-live="polite"
                className="rounded-[12px] border border-[var(--menu-border)] bg-[var(--menu-surface)] px-5 py-8 text-left"
              >
                <p className="text-[11px] font-medium tracking-[0.06em] uppercase text-[var(--menu-text-secondary)]">
                  {dict.search.eyebrow}
                </p>
                <h2 className="mt-1.5 text-[20px] leading-[1.25] font-semibold text-[var(--menu-text)]">
                  {dict.search.emptyTitle}
                </h2>
                <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.55] text-[var(--menu-text-secondary)]">
                  {dict.search.emptySubtitleCategories}
                </p>
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="mt-5 inline-flex items-center rounded-full bg-[var(--menu-accent)] px-4 py-2 text-[13px] font-medium text-[var(--menu-accent-contrast)] hover:bg-[var(--menu-accent-hover)]"
                >
                  {dict.nav.clearSearch}
                </button>
              </section>
            ) : (
              <div className="space-y-6">
                {visibleSections.map((section) => {
                  const catText = getCategoryText(section.category, language);

                  return (
                    <section
                      key={section.category.id}
                      aria-labelledby={`vitrin-search-heading-${section.category.id}`}
                    >
                      <div className="mb-2.5 flex items-baseline justify-between gap-2">
                        <h2
                          id={`vitrin-search-heading-${section.category.id}`}
                          className="text-[17px] font-semibold text-[var(--menu-text)] md:text-[19px]"
                        >
                          {catText.shortLabel}
                        </h2>
                        <span className="shrink-0 text-[12px] font-medium text-[var(--menu-text-secondary)]">
                          {dict.counts.items(section.items.length)}
                        </span>
                      </div>

                      <div className="space-y-2.5 md:space-y-3">
                        {section.items.map((item) => (
                          <VitrinItemRow
                            key={item.id}
                            item={item}
                            onSelect={onSelectItem}
                            language={language}
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
        {showItemList && activeCategorySection && activeSectionText && (
          <section
            aria-labelledby={`vitrin-heading-${activeCategorySection.category.id}`}
          >
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2
                id={`vitrin-heading-${activeCategorySection.category.id}`}
                className="text-[19px] leading-[1.2] font-semibold tracking-[-0.015em] text-[var(--menu-text)] md:text-[23px]"
              >
                <span className="md:hidden">{activeSectionText.shortLabel}</span>
                <span className="hidden md:inline">{activeSectionText.name}</span>
              </h2>
              <span className="shrink-0 text-[12.5px] font-medium text-[var(--menu-text-secondary)]">
                {dict.counts.items(activeCategorySection.items.length)}
              </span>
            </div>

            <div className="space-y-2.5 md:space-y-3">
              {activeCategorySection.items.map((item) => (
                <VitrinItemRow
                  key={item.id}
                  item={item}
                  onSelect={onSelectItem}
                  language={language}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="mx-auto w-full max-w-[960px] px-4 pb-10 md:px-8">
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
