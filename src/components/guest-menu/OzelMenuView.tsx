"use client";

import { getCategoryText, getUiDictionary } from "@/lib/i18n";
import type {
  BusinessProfile,
  MenuCategory,
  MenuItem,
  MenuLanguage,
} from "@/types/menu";
import { CategoryNav } from "./CategoryNav";
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

      <main className="mx-auto w-full max-w-[820px] px-4 pt-3 pb-16 md:px-8 md:pt-6">
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

                  <div>
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

      <footer className="mx-auto w-full max-w-[820px] px-4 pb-10 md:px-8">
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
