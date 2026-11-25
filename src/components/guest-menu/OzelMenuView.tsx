"use client";

import { getCategoryText, getUiDictionary } from "@/lib/i18n";
import type {
  BusinessProfile,
  MenuCategory,
  MenuItem,
  MenuLanguage,
} from "@/types/menu";
import { CategoryNav } from "./CategoryNav";
import { getThemeContainerClass } from "./layout-tokens";
import { MenuHeader } from "./MenuHeader";
import { MenuItemRow } from "./MenuItemRow";
import type { MenuSectionGroup } from "./NightMenuView";

interface OzelMenuViewProps {
  business: BusinessProfile;
  description: string;
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
  trimmedQuery: string;
  totalMatches: number;
  onSelectItem: (item: MenuItem, triggerEl: HTMLButtonElement) => void;
  language: MenuLanguage;
  navRef: React.RefObject<HTMLDivElement | null>;
  sectionRefs: React.RefObject<Record<string, HTMLElement | null>>;
  stickyTopOffset: number;
  totalStickyOffset: number;
}

export function OzelMenuView({
  business,
  description,
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
  trimmedQuery,
  totalMatches,
  onSelectItem,
  language,
  navRef,
  sectionRefs,
  stickyTopOffset,
  totalStickyOffset,
}: OzelMenuViewProps) {
  const dict = getUiDictionary(language);

  return (
    <div className="min-h-screen bg-[var(--menu-bg)] text-[var(--menu-text)]">
      <MenuHeader
        business={business}
        description={description}
        language={language}
      />

      <CategoryNav
        categories={categories}
        activeCategoryId={activeCategoryId}
        onSelectCategory={onSelectCategory}
        searchOpen={searchOpen}
        onToggleSearch={onToggleSearch}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onClearSearch={onClearSearch}
        language={language}
        navRef={navRef}
        stickyTopOffset={stickyTopOffset}
      />

      <div
        className={`mx-auto w-full px-4 pt-3 pb-16 md:pt-6 ${getThemeContainerClass("ozel")} lg:grid lg:grid-cols-[228px_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[248px_minmax(0,1fr)] xl:gap-10`}
      >
        <aside
          aria-label={dict.nav.categoriesLabel}
          style={{
            top: `${stickyTopOffset + 20}px`,
            maxHeight: `calc(100dvh - ${stickyTopOffset + 40}px)`,
          }}
          className="hidden lg:sticky lg:block lg:overflow-y-auto lg:pr-2 lg:pb-2"
        >
          <div className="border-t-2 border-[var(--menu-border-strong)] pt-3">
            <label htmlFor="ozel-desktop-search-input" className="sr-only">
              {dict.nav.searchInputLabel}
            </label>
            <div className="relative">
              <input
                id="ozel-desktop-search-input"
                type="search"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape" && searchQuery) {
                    onClearSearch();
                  }
                }}
                placeholder={dict.nav.searchPlaceholderShort}
                className={`w-full border border-[var(--menu-border-strong)] bg-[var(--menu-surface)] py-2 pl-3 text-[12.5px] text-[var(--menu-text)] placeholder:text-[var(--menu-text-secondary)] focus:border-[var(--menu-accent)] focus:outline-none ${
                  searchQuery.length > 0 ? "pr-14" : "pr-3"
                }`}
              />
              {searchQuery.length > 0 && (
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 text-[11.5px] font-semibold text-[var(--menu-accent)] hover:underline"
                >
                  {dict.nav.clear}
                </button>
              )}
            </div>
          </div>

          <nav aria-label={dict.nav.categoriesLabel} className="mt-4">
            <p className="pb-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--menu-text-secondary)]">
              {dict.nav.categoriesPill}
            </p>
            <ul className="divide-y divide-[var(--menu-border)] border-y border-[var(--menu-border)]">
              {categories.map((category, idx) => {
                const isActive = category.id === activeCategoryId;
                const isVisibleInSearch =
                  !isSearching ||
                  visibleSections.some((sec) => sec.category.id === category.id);
                const orderLabel = String(idx + 1).padStart(2, "0");
                const { name } = getCategoryText(category, language);

                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => {
                        if (isSearching && !isVisibleInSearch) {
                          onClearSearch();
                          window.requestAnimationFrame(() =>
                            onSelectCategory(category.id)
                          );
                          return;
                        }
                        onSelectCategory(category.id);
                      }}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex w-full items-start gap-2.5 border-l-2 py-2.5 pr-2 pl-2.5 text-left text-[13px] leading-[1.35] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--menu-focus)] ${
                        isActive
                          ? "border-[var(--menu-accent)] bg-[var(--menu-surface)] font-semibold text-[var(--menu-accent)]"
                          : isVisibleInSearch
                            ? "border-transparent font-medium text-[var(--menu-text-secondary)] hover:bg-[var(--menu-surface-hover)] hover:text-[var(--menu-text)]"
                            : "border-transparent font-normal text-[var(--menu-text-secondary)] opacity-55 hover:opacity-100"
                      }`}
                    >
                      <span className="mt-[1px] shrink-0 text-[11px] font-semibold tabular-nums text-[var(--menu-accent)]">
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

        <main className="min-w-0 @container">
          {isSearching && (
            <div className="mb-4 flex items-center justify-between border-b border-[var(--menu-border)] pb-2.5 text-[13px] text-[var(--menu-text-secondary)]">
              <span>{dict.search.resultsForQuery(trimmedQuery, totalMatches)}</span>
              <button
                type="button"
                onClick={onClearSearch}
                className="font-medium text-[var(--menu-accent)] hover:underline"
              >
                {dict.nav.clear}
              </button>
            </div>
          )}

          {visibleSections.length === 0 ? (
            <section
              aria-live="polite"
              className="my-6 border border-[var(--menu-border-strong)] bg-[var(--menu-surface)] px-5 py-8 text-left"
            >
              <p className="text-[11.5px] font-semibold tracking-[0.08em] uppercase text-[var(--menu-text-secondary)]">
                {dict.search.eyebrow}
              </p>
              <h2 className="mt-1.5 font-display text-[28px] leading-[1.08] font-bold text-[var(--menu-text)]">
                {dict.search.emptyTitle}
              </h2>
              <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.55] text-[var(--menu-text-secondary)]">
                {dict.search.emptySubtitleAll}
              </p>
              <button
                type="button"
                onClick={onClearSearch}
                className="mt-5 inline-flex items-center border border-[var(--menu-border-strong)] px-4 py-2 text-[13.5px] font-medium text-[var(--menu-text)] transition-colors duration-150 hover:border-[var(--menu-accent)] hover:text-[var(--menu-accent)]"
              >
                {dict.nav.showAllMenu}
              </button>
            </section>
          ) : (
            <div className="space-y-8 md:space-y-10">
              {visibleSections.map((section) => {
                const catText = getCategoryText(section.category, language);

                return (
                  <section
                    key={section.category.id}
                    id={`kategori-${section.category.id}`}
                    ref={(el) => {
                      sectionRefs.current[section.category.id] = el;
                    }}
                    style={{
                      scrollMarginTop: `${totalStickyOffset + 14}px`,
                    }}
                    aria-labelledby={`heading-${section.category.id}`}
                  >
                    <div className="border-b border-[var(--menu-border-strong)] pt-1 pb-2">
                      <div className="flex items-baseline gap-2.5">
                        <span className="shrink-0 text-[12px] font-semibold tabular-nums tracking-[0.08em] text-[var(--menu-accent)]">
                          {section.orderLabel}
                        </span>
                        <h2
                          id={`heading-${section.category.id}`}
                          className="font-display text-[24px] leading-[1.06] font-bold tracking-[-0.005em] text-[var(--menu-text)] md:text-[30px]"
                        >
                          {catText.name}
                        </h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 @[960px]:grid-cols-2 @[960px]:gap-x-8">
                      {section.items.map((item) => (
                        <MenuItemRow
                          key={item.id}
                          item={item}
                          onSelect={onSelectItem}
                          language={language}
                          eager={false}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </main>
      </div>

      <footer
        className={`mx-auto w-full px-4 pb-10 ${getThemeContainerClass("ozel")}`}
      >
        <div className="border-t border-[var(--menu-border-strong)] pt-4 text-[12.5px] text-[var(--menu-text-secondary)]">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
            <span>
              {business.name} · {business.address} ·{" "}
              <a
                href={business.phoneHref}
                className="text-[var(--menu-text)] underline decoration-[var(--menu-border)] underline-offset-2 hover:text-[var(--menu-accent)]"
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
