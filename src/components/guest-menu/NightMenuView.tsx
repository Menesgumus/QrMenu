"use client";

import { useEffect, useRef, useState } from "react";
import { formatPriceTRY } from "@/lib/format";
import {
  getBusinessDescription,
  getCategoryText,
  getItemText,
  getUiDictionary,
} from "@/lib/i18n";
import type {
  BusinessProfile,
  MenuCategory,
  MenuItem,
  MenuLanguage,
} from "@/types/menu";
import { BrandMark } from "./BrandMark";
import { MenuImage } from "./MenuImage";

export interface MenuSectionGroup {
  category: MenuCategory;
  orderLabel: string;
  items: MenuItem[];
}

interface NightMenuViewProps {
  business: BusinessProfile;
  categories: MenuCategory[];
  visibleSections: MenuSectionGroup[];
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  searchOpen: boolean;
  onToggleSearch: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  isSearching: boolean;
  totalMatches: number;
  onSelectItem: (item: MenuItem, triggerEl: HTMLButtonElement) => void;
  language: MenuLanguage;
  navRef: React.RefObject<HTMLDivElement | null>;
  stickyTopOffset?: number;
}

export function NightMenuView({
  business,
  categories,
  visibleSections,
  activeCategoryId,
  onSelectCategory,
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
}: NightMenuViewProps) {
  const scrollStripRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const mobileSearchInputRef = useRef<HTMLInputElement | null>(null);

  const dict = getUiDictionary(language);
  const localizedBusinessDesc = getBusinessDescription(business, language);
  const trimmedQuery = searchQuery.trim();

  useEffect(() => {
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
  }, [activeCategoryId]);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
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
  }, [categories.length]);

  useEffect(() => {
    if (searchOpen) {
      mobileSearchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const activeSection =
    visibleSections.find(
      (section) => section.category.id === activeCategoryId
    ) ?? visibleSections[0];

  const sectionsToRender = isSearching
    ? visibleSections
    : activeSection
      ? [activeSection]
      : [];

  const nightDisplayFont = {
    fontFamily: "var(--font-night-display), Georgia, serif",
  } as const;

  return (
    <div
      style={{
        fontFamily: "var(--font-visual-sans), system-ui, sans-serif",
      }}
      className="min-h-screen bg-[var(--menu-bg)] text-[var(--menu-text)] font-night-sans"
    >
      {/* Mobil Kompakt İşletme Başlığı */}
      <header className="border-b border-[var(--menu-border)] px-4 pt-3.5 pb-3 lg:hidden">
        <div className="flex items-center gap-3">
          <div
            style={{
              backgroundColor: "var(--menu-logo-bg)",
              borderColor: "var(--menu-logo-border)",
              color: "var(--menu-logo-ink)",
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border p-1"
          >
            <BrandMark className="h-8 w-8" />
          </div>
          <div className="min-w-0 flex-1">
            <h1
              style={nightDisplayFont}
              className="font-night-display text-[23px] leading-[1.12] font-semibold tracking-[-0.01em] text-[var(--menu-text)]"
            >
              {business.name}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] text-[var(--menu-text-secondary)]">
              <span>{business.address}</span>
              <span aria-hidden="true" className="opacity-50">
                ·
              </span>
              <span className="tabular-nums">{business.hours}</span>
              <span aria-hidden="true" className="opacity-50">
                ·
              </span>
              <a
                href={business.phoneHref}
                className="font-medium tabular-nums text-[var(--menu-text)] hover:text-[var(--menu-accent)]"
              >
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobil Sabit Kısa Kategori Gezinmesi ve Arama */}
      <div
        ref={navRef}
        style={{
          top: `${stickyTopOffset}px`,
          backgroundColor: "var(--menu-bg-glass)",
        }}
        className="sticky z-30 border-b border-[var(--menu-border)] backdrop-blur-sm lg:hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="relative min-w-0 flex-1">
            <nav
              ref={scrollStripRef}
              aria-label={dict.nav.categoriesLabel}
              className={`no-scrollbar flex w-full items-center gap-1.5 overflow-x-auto ${
                canScrollRight ? "pr-7" : ""
              }`}
            >
              {categories.map((category) => {
                const isActive = category.id === activeCategoryId && !isSearching;
                const { shortLabel } = getCategoryText(category, language);

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
                    className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] ${
                      isActive
                        ? "border-[var(--menu-accent)] bg-[var(--menu-accent)] font-semibold text-[var(--menu-accent-contrast)]"
                        : "border-[var(--menu-border)] bg-[var(--menu-surface)] font-medium text-[var(--menu-text-secondary)] hover:border-[var(--menu-border-strong)] hover:text-[var(--menu-text)]"
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
                <span className="text-[13px] leading-none font-semibold text-[var(--menu-text-secondary)]">
                  ‹
                </span>
              </div>
            )}

            {canScrollRight && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 flex w-8 items-center justify-end bg-gradient-to-l from-[var(--menu-bg)] via-[var(--menu-bg-glass)] to-transparent pr-0.5"
              >
                <span className="text-[13px] leading-none font-semibold text-[var(--menu-accent)]">
                  ›
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onToggleSearch}
            aria-expanded={searchOpen}
            aria-controls="night-menu-search-panel"
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] ${
              searchOpen || isSearching
                ? "border-[var(--menu-accent)] bg-[var(--menu-accent)] font-semibold text-[var(--menu-accent-contrast)]"
                : "border-[var(--menu-border)] bg-[var(--menu-surface)] text-[var(--menu-text)] hover:border-[var(--menu-border-strong)]"
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
                strokeWidth="1.6"
              />
              <path
                d="M13.2 13.2L16.8 16.8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <span>{dict.nav.searchButton}</span>
          </button>
        </div>

        {searchOpen && (
          <div
            id="night-menu-search-panel"
            className="border-t border-[var(--menu-border)] bg-[var(--menu-surface-muted)]"
          >
            <div className="flex items-center gap-2 px-4 py-2">
              <label htmlFor="night-mobile-search-input" className="sr-only">
                {dict.nav.searchInputLabel}
              </label>
              <input
                ref={mobileSearchInputRef}
                id="night-mobile-search-input"
                type="search"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    if (searchQuery) {
                      onClearSearch();
                    } else {
                      onToggleSearch();
                    }
                  }
                }}
                placeholder={dict.nav.searchPlaceholder}
                className="min-w-0 flex-1 rounded-[6px] border border-[var(--menu-border-strong)] bg-[var(--menu-bg)] px-3 py-1.5 text-[13.5px] text-[var(--menu-text)] placeholder:text-[var(--menu-text-secondary)] focus:border-[var(--menu-accent)] focus:outline-none"
              />
              {searchQuery.length > 0 && (
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="shrink-0 px-2 py-1.5 text-[12.5px] font-medium text-[var(--menu-text-secondary)] hover:text-[var(--menu-text)]"
                >
                  {dict.nav.clear}
                </button>
              )}
              <button
                type="button"
                onClick={onToggleSearch}
                className="shrink-0 px-1.5 py-1.5 text-[12.5px] font-semibold text-[var(--menu-accent)] hover:text-[var(--menu-text)]"
              >
                {dict.nav.close}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ana Düzen: Masaüstünde Sol Sabit Gezinme + Sağda Ürün Izgarası */}
      <div className="mx-auto w-full max-w-[1220px] px-4 pt-4 pb-16 md:px-8 lg:grid lg:grid-cols-[276px_minmax(0,1fr)] lg:items-start lg:gap-10 lg:pt-8">
        <aside
          className="hidden lg:sticky lg:block lg:overflow-y-auto lg:pr-1 lg:pb-2"
          style={{
            top: `${stickyTopOffset + 24}px`,
            maxHeight: `calc(100dvh - ${stickyTopOffset + 48}px)`,
          }}
        >
          <div className="rounded-[10px] border border-[var(--menu-border)] bg-[var(--menu-surface)] p-4">
            <div className="flex items-start gap-3">
              <div
                style={{
                  backgroundColor: "var(--menu-logo-bg)",
                  borderColor: "var(--menu-logo-border)",
                  color: "var(--menu-logo-ink)",
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] border p-1"
              >
                <BrandMark className="h-8 w-8" />
              </div>
              <h1
                style={nightDisplayFont}
                className="font-night-display text-[24px] leading-[1.1] font-semibold tracking-[-0.01em] text-[var(--menu-text)]"
              >
                {business.name}
              </h1>
            </div>

            <p className="mt-2.5 text-[13px] leading-[1.48] text-[var(--menu-text-secondary)]">
              {localizedBusinessDesc}
            </p>

            <div className="mt-3 space-y-1 border-t border-[var(--menu-border)] pt-2.5 text-[12px] text-[var(--menu-text-secondary)]">
              <p>{business.address}</p>
              <p className="tabular-nums">
                {business.hours} ·{" "}
                <a
                  href={business.phoneHref}
                  className="font-medium text-[var(--menu-text)] hover:text-[var(--menu-accent)]"
                >
                  {business.phone}
                </a>
              </p>
            </div>
          </div>

          <div className="mt-3">
            <label htmlFor="night-desktop-search-input" className="sr-only">
              {dict.nav.searchInputLabel}
            </label>
            <div className="relative">
              <input
                id="night-desktop-search-input"
                type="search"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape" && searchQuery) {
                    onClearSearch();
                  }
                }}
                placeholder={dict.nav.searchPlaceholderShort}
                className="w-full rounded-[8px] border border-[var(--menu-border)] bg-[var(--menu-surface)] py-2 pr-16 pl-3.5 text-[13.5px] text-[var(--menu-text)] placeholder:text-[var(--menu-text-secondary)] focus:border-[var(--menu-accent)] focus:outline-none"
              />
              {searchQuery.length > 0 && (
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 text-[12px] font-medium text-[var(--menu-accent)] hover:text-[var(--menu-text)]"
                >
                  {dict.nav.clear}
                </button>
              )}
            </div>
          </div>

          <nav aria-label={dict.nav.categoriesLabel} className="mt-3.5">
            <p className="px-2 pb-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--menu-text-secondary)]">
              {dict.nav.categoriesPill}
            </p>
            <ul className="space-y-0.5">
              {categories.map((category, idx) => {
                const isActive = category.id === activeCategoryId && !isSearching;
                const orderLabel = String(idx + 1).padStart(2, "0");
                const { name } = getCategoryText(category, language);

                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => {
                        if (isSearching) onClearSearch();
                        onSelectCategory(category.id);
                      }}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex w-full items-start gap-2.5 rounded-[8px] px-3 py-2 text-left text-[13px] leading-[1.3] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] ${
                        isActive
                          ? "bg-[var(--menu-accent)] font-semibold text-[var(--menu-accent-contrast)]"
                          : "font-medium text-[var(--menu-text-secondary)] hover:bg-[var(--menu-surface)] hover:text-[var(--menu-text)]"
                      }`}
                    >
                      <span
                        className={`mt-[1px] shrink-0 text-[11.5px] tabular-nums ${
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
        </aside>

        {/* Ürün Alanı */}
        <main className="min-w-0">
          {isSearching && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--menu-border)] pb-3 text-[13px] text-[var(--menu-text-secondary)]">
              <span>{dict.search.resultsInMenu(trimmedQuery, totalMatches)}</span>
              <button
                type="button"
                onClick={onClearSearch}
                className="font-semibold text-[var(--menu-accent)] hover:underline"
              >
                {dict.nav.clearSearch}
              </button>
            </div>
          )}

          {sectionsToRender.length === 0 ? (
            <section
              aria-live="polite"
              className="rounded-[10px] border border-[var(--menu-border)] bg-[var(--menu-surface)] px-5 py-8 text-left"
            >
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--menu-accent)]">
                {dict.search.eyebrow}
              </p>
              <h2
                style={nightDisplayFont}
                className="mt-1.5 font-night-display text-[24px] leading-[1.2] font-semibold text-[var(--menu-text)]"
              >
                {dict.search.emptyTitle}
              </h2>
              <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.55] text-[var(--menu-text-secondary)]">
                {dict.search.emptySubtitleAll}
              </p>
              <button
                type="button"
                onClick={onClearSearch}
                className="mt-5 inline-flex items-center rounded-[6px] bg-[var(--menu-accent)] px-4 py-2 text-[13px] font-semibold text-[var(--menu-accent-contrast)] transition-colors duration-150 hover:bg-[var(--menu-accent-hover)]"
              >
                {dict.nav.showAllMenu}
              </button>
            </section>
          ) : (
            <div className="space-y-8">
              {sectionsToRender.map((section, sectionIdx) => {
                const catText = getCategoryText(section.category, language);

                return (
                  <section
                    key={section.category.id}
                    id={`night-kategori-${section.category.id}`}
                    aria-labelledby={`night-heading-${section.category.id}`}
                  >
                    <div className="flex items-end justify-between gap-4 border-b border-[var(--menu-border)] pb-3">
                      <div>
                        <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--menu-accent)]">
                          {section.orderLabel}
                          {catText.shortLabel ? (
                            <span className="hidden lg:inline">
                              {` · ${catText.shortLabel}`}
                            </span>
                          ) : null}
                        </p>
                        <h2
                          id={`night-heading-${section.category.id}`}
                          style={nightDisplayFont}
                          className="mt-1 font-night-display text-[24px] leading-[1.16] font-semibold tracking-[-0.01em] text-[var(--menu-text)] md:text-[30px]"
                        >
                          <span className="lg:hidden">{catText.shortLabel}</span>
                          <span className="hidden lg:inline">
                            {catText.name}
                          </span>
                        </h2>
                      </div>
                      <span className="shrink-0 text-[12px] font-medium tabular-nums text-[var(--menu-text-secondary)]">
                        {dict.counts.varieties(section.items.length)}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
                      {section.items.map((item, itemIdx) => {
                        const { cardName, imageAlt } = getItemText(
                          item,
                          language
                        );

                        return (
                          <article key={item.id} className="flex">
                            <button
                              type="button"
                              onClick={(event) =>
                                onSelectItem(item, event.currentTarget)
                              }
                              className="group flex h-full w-full flex-col overflow-hidden rounded-[8px] border border-[var(--menu-border)] bg-[var(--menu-surface)] text-left transition-colors duration-150 hover:border-[var(--menu-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)]"
                            >
                              {item.image && (
                                <div className="relative aspect-square w-full overflow-hidden bg-[var(--menu-surface-muted)]">
                                  <MenuImage
                                    src={item.image.gridUrl}
                                    alt={imageAlt}
                                    preset="card-grid"
                                    fill
                                    sizes="(max-width: 639px) calc((100vw - 44px) / 2), (max-width: 1023px) calc((100vw - 96px) / 3), 270px"
                                    loading={
                                      sectionIdx === 0 && itemIdx < 4
                                        ? "eager"
                                        : "lazy"
                                    }
                                    fetchPriority={
                                      sectionIdx === 0 &&
                                      (itemIdx === 0 || itemIdx === 2)
                                        ? "high"
                                        : undefined
                                    }
                                    className="object-cover"
                                  />
                                </div>
                              )}

                              <div className="flex flex-1 flex-col p-3 md:p-4">
                                <h3 className="text-[14px] leading-[1.32] font-semibold text-[var(--menu-text)] transition-colors duration-150 group-hover:text-[var(--menu-accent)] md:text-[15px]">
                                  {cardName}
                                </h3>

                                <p className="mt-auto pt-2.5 text-[15px] leading-[1.2] font-bold tabular-nums text-[var(--menu-accent)] md:text-[16px]">
                                  {formatPriceTRY(item.priceKurus)}
                                </p>
                              </div>
                            </button>
                          </article>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          )}

          <footer className="mt-12 border-t border-[var(--menu-border)] pt-5 text-[12.5px] leading-[1.55] text-[var(--menu-text-secondary)]">
            <p className="mb-2 text-[var(--menu-text-secondary)] lg:hidden">
              {localizedBusinessDesc}
            </p>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <span>
                {business.name} · {business.address} ·{" "}
                <a
                  href={business.phoneHref}
                  className="font-medium text-[var(--menu-text)] hover:text-[var(--menu-accent)]"
                >
                  {business.phone}
                </a>
              </span>
              <span>{dict.meta.vatIncluded}</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
