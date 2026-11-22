"use client";

import { useEffect, useRef } from "react";
import type { MenuCategory } from "@/types/menu";

interface CategoryNavProps {
  categories: MenuCategory[];
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
  searchOpen: boolean;
  onToggleSearch: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
  navRef: React.RefObject<HTMLDivElement | null>;
  stickyTopOffset?: number;
}

export function CategoryNav({
  categories,
  activeCategoryId,
  onSelectCategory,
  searchOpen,
  onToggleSearch,
  searchQuery,
  onSearchChange,
  onClearSearch,
  navRef,
  stickyTopOffset = 0,
}: CategoryNavProps) {
  const scrollStripRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const searchInputRef = useRef<HTMLInputElement | null>(null);

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

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  return (
    <div
      ref={navRef}
      style={{ top: `${stickyTopOffset}px` }}
      className="sticky z-30 border-y border-[#171714] bg-[#F6F4EE]/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex w-full max-w-[820px] items-stretch px-4 md:px-8">
        <nav
          ref={scrollStripRef}
          aria-label="Menü kategorileri"
          className="no-scrollbar flex min-w-0 flex-1 items-stretch gap-5 overflow-x-auto pr-3"
        >
          {categories.map((category, index) => {
            const isActive = category.id === activeCategoryId;
            const orderLabel = String(index + 1).padStart(2, "0");

            return (
              <button
                key={category.id}
                ref={(el) => {
                  tabRefs.current[category.id] = el;
                }}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                aria-current={isActive ? "true" : undefined}
                className={`relative flex min-h-[44px] shrink-0 items-center gap-1.5 py-2.5 text-left text-[13px] whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#2448D8] ${
                  isActive
                    ? "font-semibold text-[#2448D8]"
                    : "font-medium text-[#595950] hover:text-[#171714]"
                }`}
              >
                <span className="tabular-nums text-[11px] opacity-70">
                  {orderLabel}
                </span>
                <span>{category.name}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute right-0 bottom-0 left-0 h-[2.5px] bg-[#2448D8]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center border-l border-[#DCD8CC] pl-3">
          <button
            type="button"
            onClick={onToggleSearch}
            aria-expanded={searchOpen}
            aria-controls="menu-search-panel"
            className={`flex min-h-[44px] items-center gap-1.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2448D8] ${
              searchOpen || searchQuery.length > 0
                ? "text-[#2448D8]"
                : "text-[#171714] hover:text-[#2448D8]"
            }`}
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <circle
                cx="9"
                cy="9"
                r="5.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M13.2 13.2L16.8 16.8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
            <span>Ara</span>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div
          id="menu-search-panel"
          className="border-t border-[#DCD8CC] bg-[#F6F4EE]"
        >
          <div className="mx-auto flex w-full max-w-[820px] items-center gap-2 px-4 py-2 md:px-8">
            <label htmlFor="menu-search-input" className="sr-only">
              Menüde ürün ara
            </label>
            <input
              ref={searchInputRef}
              id="menu-search-input"
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
              placeholder="Menüde ara (ör. hellim, kahve, çörek)..."
              className="min-w-0 flex-1 border-b border-[#171714] bg-transparent py-1.5 text-[14px] text-[#171714] placeholder:text-[#595950]/75 focus:border-[#2448D8] focus:outline-none"
            />
            {searchQuery.length > 0 && (
              <button
                type="button"
                onClick={onClearSearch}
                className="shrink-0 px-2 py-1.5 text-[12.5px] font-medium text-[#595950] transition-colors duration-150 hover:text-[#171714]"
              >
                Temizle
              </button>
            )}
            <button
              type="button"
              onClick={onToggleSearch}
              className="shrink-0 px-1.5 py-1.5 text-[12.5px] font-medium text-[#2448D8] transition-colors duration-150 hover:text-[#171714]"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
