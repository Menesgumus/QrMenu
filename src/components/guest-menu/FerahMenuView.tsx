"use client";

import { formatPriceTRY } from "@/lib/format";
import { getCategoryText, getItemText, getUiDictionary } from "@/lib/i18n";
import type {
  BusinessProfile,
  MenuCategory,
  MenuItem,
  MenuLanguage,
} from "@/types/menu";
import { BrandMark } from "./BrandMark";
import { MenuImage } from "./MenuImage";

export interface FerahVisibleSection {
  category: MenuCategory;
  orderLabel: string;
  items: MenuItem[];
}

interface FerahMenuViewProps {
  business: BusinessProfile;
  allItemsCount: number;
  visibleSections: FerahVisibleSection[];
  openCategoryIds: string[];
  onToggleCategory: (categoryId: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  isSearching: boolean;
  totalMatches: number;
  onSelectItem: (item: MenuItem, triggerEl: HTMLButtonElement) => void;
  language: MenuLanguage;
}

function FerahItemRow({
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
      className="group flex w-full items-start gap-3.5 px-4 py-3.5 text-left transition-colors duration-150 hover:bg-[var(--menu-surface-hover)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--menu-focus)] md:items-center md:gap-4 md:px-5 md:py-4"
    >
      {item.image && (
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[10px] border border-[var(--menu-border)] bg-[var(--menu-surface-muted)] md:h-24 md:w-24">
          <MenuImage
            src={item.image.thumbUrl}
            alt={imageAlt}
            preset="item-row"
            fill
            sizes="(max-width: 767px) 80px, 96px"
            loading={eager ? "eager" : "lazy"}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h3 className="text-[15.5px] leading-[1.32] font-semibold tracking-[-0.01em] text-[var(--menu-text)] transition-colors group-hover:text-[var(--menu-accent)] md:text-[16.5px]">
          {cardName}
        </h3>

        {description && (
          <p className="mt-1 line-clamp-2 text-[13px] leading-[1.48] text-[var(--menu-text-secondary)] md:text-[13.5px]">
            {description}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between gap-2 md:hidden">
          <span className="text-[15px] font-bold tabular-nums text-[var(--menu-accent)]">
            {formattedPrice}
          </span>
          <span className="text-[12px] font-medium text-[var(--menu-text-secondary)] group-hover:text-[var(--menu-accent)]">
            {dict.nav.viewAction}
          </span>
        </div>
      </div>

      <div className="hidden shrink-0 flex-col items-end justify-center pl-4 md:flex">
        <span className="text-[16.5px] font-bold tabular-nums text-[var(--menu-accent)]">
          {formattedPrice}
        </span>
        <span className="mt-1 text-[11.5px] font-medium text-[var(--menu-text-secondary)] group-hover:text-[var(--menu-accent)]">
          {dict.nav.detailsAction}
        </span>
      </div>
    </button>
  );
}

export function FerahMenuView({
  business,
  allItemsCount,
  visibleSections,
  openCategoryIds,
  onToggleCategory,
  onExpandAll,
  onCollapseAll,
  searchQuery,
  onSearchChange,
  onClearSearch,
  isSearching,
  totalMatches,
  onSelectItem,
  language,
}: FerahMenuViewProps) {
  const dict = getUiDictionary(language);
  const allExpanded =
    visibleSections.length > 0 &&
    visibleSections.every((sec) => openCategoryIds.includes(sec.category.id));

  const ferahFontStyle = {
    fontFamily: "var(--font-ferah-sans), system-ui, sans-serif",
  } as const;

  const trimmedQuery = searchQuery.trim();

  return (
    <div
      style={ferahFontStyle}
      className="min-h-screen bg-[var(--menu-bg)] text-[var(--menu-text)] font-ferah selection:bg-[var(--menu-selection-bg)] selection:text-[var(--menu-selection-text)]"
    >
      {/* Kompakt Ferah İşletme Başlığı */}
      <header className="border-b border-[var(--menu-border)] bg-[var(--menu-surface-muted)]">
        <div className="mx-auto w-full max-w-[860px] px-4 py-3 md:px-8 md:py-4">
          <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between md:gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div
                style={{
                  backgroundColor: "var(--menu-logo-bg)",
                  borderColor: "var(--menu-logo-border)",
                  color: "var(--menu-logo-ink)",
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border p-1 md:h-11 md:w-11 md:p-1.5"
              >
                <BrandMark className="h-[26px] w-[26px] shrink-0 md:h-7 md:w-7" />
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="text-[20px] leading-[1.14] font-bold tracking-[-0.02em] text-[var(--menu-text)] md:text-[24px]">
                  {business.name}
                </h1>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] leading-[1.4] text-[var(--menu-text-secondary)] md:mt-1 md:text-[12.5px]">
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
                    className="font-semibold tabular-nums text-[var(--menu-text)] underline decoration-[var(--menu-border-strong)] underline-offset-2 hover:text-[var(--menu-accent)]"
                  >
                    {business.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Kolay Erişilen Arama */}
            <div className="w-full shrink-0 md:w-[296px]">
              <label htmlFor="ferah-menu-search" className="sr-only">
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
                  id="ferah-menu-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => onSearchChange(event.target.value)}
                  placeholder={dict.nav.searchPlaceholderShort}
                  className={`h-10 w-full rounded-[10px] border border-[var(--menu-border-strong)] bg-[var(--menu-surface)] pl-9 text-[13.5px] font-medium text-[var(--menu-text)] placeholder:text-[var(--menu-text-secondary)] focus:border-[var(--menu-accent)] focus:ring-2 focus:ring-[var(--menu-accent)]/20 focus:outline-none ${
                    searchQuery.length > 0 ? "pr-20" : "pr-3.5"
                  }`}
                />
                {searchQuery.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearSearch}
                    className="absolute right-1.5 rounded-[7px] bg-[var(--menu-accent)] px-2.5 py-1 text-[11.5px] font-semibold text-[var(--menu-accent-contrast)] transition-colors hover:bg-[var(--menu-accent-hover)]"
                  >
                    {dict.nav.clear}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[860px] px-4 pt-4 pb-16 md:px-8 md:pt-6">
        {/* Üst Kontrol Çubuğu / Arama Özeti */}
        {isSearching ? (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-[10px] border border-[var(--menu-border)] bg-[var(--menu-surface-muted)] px-3.5 py-2.5 text-[13px] text-[var(--menu-text)]">
            <span>{dict.search.resultsForQuery(trimmedQuery, totalMatches)}</span>
            <button
              type="button"
              onClick={onClearSearch}
              className="rounded-[7px] bg-[var(--menu-accent)] px-2.5 py-1 text-[12px] font-semibold text-[var(--menu-accent-contrast)] transition-colors hover:bg-[var(--menu-accent-hover)]"
            >
              {dict.nav.clearSearch}
            </button>
          </div>
        ) : (
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[12.5px] font-medium text-[var(--menu-text-secondary)]">
              {dict.counts.sectionsAndItems(
                visibleSections.length,
                allItemsCount
              )}
            </p>
            <button
              type="button"
              onClick={allExpanded ? onCollapseAll : onExpandAll}
              className="inline-flex items-center gap-1.5 rounded-[8px] border border-[var(--menu-border-strong)] bg-[var(--menu-surface-muted)] px-3 py-1.5 text-[12.5px] font-semibold text-[var(--menu-accent)] transition-colors hover:bg-[var(--menu-surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)]"
            >
              {allExpanded ? dict.nav.collapseAll : dict.nav.expandAll}
            </button>
          </div>
        )}

        {/* Arama Boş Durumu */}
        {isSearching && visibleSections.length === 0 ? (
          <section
            aria-live="polite"
            className="rounded-[12px] border border-[var(--menu-border)] bg-[var(--menu-surface)] px-5 py-8 text-left"
          >
            <p className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[var(--menu-accent)]">
              {dict.search.eyebrow}
            </p>
            <h2 className="mt-1.5 text-[20px] leading-[1.25] font-bold text-[var(--menu-text)]">
              {dict.search.emptyTitle}
            </h2>
            <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.55] text-[var(--menu-text-secondary)]">
              {dict.search.emptySubtitleFerah}
            </p>
            <button
              type="button"
              onClick={onClearSearch}
              className="mt-5 inline-flex items-center rounded-[9px] bg-[var(--menu-accent)] px-4 py-2 text-[13.5px] font-semibold text-[var(--menu-accent-contrast)] transition-colors hover:bg-[var(--menu-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)]"
            >
              {dict.nav.clearSearch}
            </button>
          </section>
        ) : (
          /* Dikey Açılır-Kapanır Kategoriler (42-44px kare fotoğraf başlıkta) */
          <div className="space-y-3">
            {visibleSections.map((section) => {
              const isOpen =
                isSearching || openCategoryIds.includes(section.category.id);
              const catText = getCategoryText(section.category, language);
              const coverUrl = section.category.coverImageUrl?.trim() ?? "";

              return (
                <section
                  key={section.category.id}
                  id={`ferah-section-${section.category.id}`}
                  aria-labelledby={`ferah-heading-${section.category.id}`}
                  className={`overflow-hidden rounded-[12px] border bg-[var(--menu-surface)] transition-colors ${
                    isOpen
                      ? "border-[var(--menu-border-strong)]"
                      : "border-[var(--menu-border)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (!isSearching) {
                        onToggleCategory(section.category.id);
                      }
                    }}
                    aria-expanded={isOpen}
                    aria-controls={`ferah-panel-${section.category.id}`}
                    className={`flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--menu-focus)] md:px-5 md:py-3 ${
                      isOpen
                        ? "bg-[var(--menu-surface-muted)] hover:bg-[var(--menu-surface-hover)]"
                        : "bg-[var(--menu-surface)] hover:bg-[var(--menu-surface-hover)]"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      {coverUrl.length > 0 && (
                        <div className="relative h-[42px] w-[42px] shrink-0 overflow-hidden rounded-[8px] border border-[var(--menu-border)] bg-[var(--menu-surface-muted)] md:h-[44px] md:w-[44px]">
                          <MenuImage
                            src={coverUrl}
                            alt=""
                            preset="category-icon"
                            fill
                            sizes="(min-width: 768px) 44px, 42px"
                            loading="lazy"
                            style={{
                              objectPosition:
                                section.category.coverObjectPosition?.ferah ??
                                section.category.coverObjectPosition?.klasik ??
                                "center center",
                            }}
                            className="object-cover"
                          />
                        </div>
                      )}
                      <h2
                        id={`ferah-heading-${section.category.id}`}
                        className="truncate text-[16px] leading-[1.25] font-bold tracking-[-0.01em] text-[var(--menu-text)] md:text-[17.5px]"
                      >
                        {catText.shortLabel}
                      </h2>
                    </div>

                    <div className="flex shrink-0 items-center gap-2.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold tabular-nums ${
                          isOpen
                            ? "bg-[var(--menu-surface)] text-[var(--menu-accent)]"
                            : "bg-[var(--menu-surface-muted)] text-[var(--menu-text-secondary)]"
                        }`}
                      >
                        {dict.counts.items(section.items.length)}
                      </span>
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                          isOpen
                            ? "rotate-180 text-[var(--menu-accent)]"
                            : "text-[var(--menu-text-secondary)]"
                        }`}
                      >
                        <path
                          d="M5.5 7.75L10 12.25L14.5 7.75"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`ferah-panel-${section.category.id}`}
                      className="divide-y divide-[var(--menu-border)] border-t border-[var(--menu-border)] bg-[var(--menu-surface)]"
                    >
                      {section.items.map((item) => (
                        <FerahItemRow
                          key={item.id}
                          item={item}
                          onSelect={onSelectItem}
                          language={language}
                          eager={false}
                        />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </main>

      <footer className="mx-auto w-full max-w-[860px] px-4 pb-10 md:px-8">
        <div className="border-t border-[var(--menu-border)] pt-4 text-[12.5px] text-[var(--menu-text-secondary)]">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <strong className="font-semibold text-[var(--menu-text)]">
                {business.name}
              </strong>{" "}
              · {business.address} ·{" "}
              <a
                href={business.phoneHref}
                className="font-medium text-[var(--menu-text)] underline decoration-[var(--menu-border-strong)] underline-offset-2 hover:text-[var(--menu-accent)]"
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
