"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatPriceTRY } from "@/lib/format";
import type { BusinessProfile, MenuCategory, MenuItem } from "@/types/menu";
import { BrandMark } from "./BrandMark";

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
  navRef,
  stickyTopOffset = 0,
}: NightMenuViewProps) {
  const scrollStripRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const mobileSearchInputRef = useRef<HTMLInputElement | null>(null);

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
      className="min-h-screen bg-[#171918] text-[#F5F1E8] font-night-sans"
    >
      {/* Mobil Kompakt İşletme Başlığı */}
      <header className="border-b border-[#2C302D] px-4 pt-3.5 pb-3 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-[#F5F1E8] p-1">
            <BrandMark className="h-8 w-8" />
          </div>
          <div className="min-w-0 flex-1">
            <h1
              style={nightDisplayFont}
              className="font-night-display text-[23px] leading-[1.12] font-semibold tracking-[-0.01em] text-[#F5F1E8]"
            >
              {business.name}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] text-[#B9BDB6]">
              <span>{business.address}</span>
              <span aria-hidden="true" className="text-[#454A47]">
                ·
              </span>
              <span className="tabular-nums">{business.hours}</span>
              <span aria-hidden="true" className="text-[#454A47]">
                ·
              </span>
              <a
                href={business.phoneHref}
                className="font-medium tabular-nums text-[#F5F1E8] hover:text-[#F28B50]"
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
        style={{ top: `${stickyTopOffset}px` }}
        className="sticky z-30 border-b border-[#2C302D] bg-[#171918]/95 backdrop-blur-sm lg:hidden"
      >
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="relative min-w-0 flex-1">
            <nav
              ref={scrollStripRef}
              aria-label="Menü kategorileri"
              className={`no-scrollbar flex w-full items-center gap-1.5 overflow-x-auto ${
                canScrollRight ? "pr-7" : ""
              }`}
            >
              {categories.map((category) => {
                const isActive = category.id === activeCategoryId && !isSearching;
                const label = category.shortLabel ?? category.name;

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
                    className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28B50] ${
                      isActive
                        ? "border-[#F28B50] bg-[#F28B50] font-semibold text-[#171918]"
                        : "border-[#323633] bg-[#242725] font-medium text-[#B9BDB6] hover:border-[#F5F1E8]/35 hover:text-[#F5F1E8]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </nav>

            {canScrollLeft && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 flex w-6 items-center bg-gradient-to-r from-[#171918] via-[#171918]/85 to-transparent"
              >
                <span className="text-[13px] leading-none font-semibold text-[#B9BDB6]">
                  ‹
                </span>
              </div>
            )}

            {canScrollRight && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 flex w-8 items-center justify-end bg-gradient-to-l from-[#171918] via-[#171918]/90 to-transparent pr-0.5"
              >
                <span className="text-[13px] leading-none font-semibold text-[#F28B50]">
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
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28B50] ${
              searchOpen || isSearching
                ? "border-[#F28B50] bg-[#F28B50] font-semibold text-[#171918]"
                : "border-[#323633] bg-[#242725] text-[#F5F1E8] hover:border-[#F5F1E8]/40"
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
            <span>Ara</span>
          </button>
        </div>

        {searchOpen && (
          <div
            id="night-menu-search-panel"
            className="border-t border-[#2C302D] bg-[#1F2220]"
          >
            <div className="flex items-center gap-2 px-4 py-2">
              <label htmlFor="night-mobile-search-input" className="sr-only">
                Menüde ürün ara
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
                placeholder="Tüm menüde ara (ör. hellim, kahve, tart)..."
                className="min-w-0 flex-1 rounded-[6px] border border-[#343835] bg-[#171918] px-3 py-1.5 text-[13.5px] text-[#F5F1E8] placeholder:text-[#B9BDB6]/65 focus:border-[#F28B50] focus:outline-none"
              />
              {searchQuery.length > 0 && (
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="shrink-0 px-2 py-1.5 text-[12.5px] font-medium text-[#B9BDB6] hover:text-[#F5F1E8]"
                >
                  Temizle
                </button>
              )}
              <button
                type="button"
                onClick={onToggleSearch}
                className="shrink-0 px-1.5 py-1.5 text-[12.5px] font-semibold text-[#F28B50] hover:text-[#F5F1E8]"
              >
                Kapat
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ana Düzen: Masaüstünde Sol Sabit Gezinme + Sağda Ürün Izgarası */}
      <div className="mx-auto w-full max-w-[1220px] px-4 pt-4 pb-16 md:px-8 lg:grid lg:grid-cols-[276px_minmax(0,1fr)] lg:items-start lg:gap-10 lg:pt-8">
        {/* Masaüstü Sol Sabit Kenar Çubuğu */}
        <aside
          className="hidden lg:sticky lg:block"
          style={{ top: `${stickyTopOffset + 24}px` }}
        >
          <div className="rounded-[10px] border border-[#2F3330] bg-[#242725] p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-[#F5F1E8] p-1">
                <BrandMark className="h-8 w-8" />
              </div>
              <h1
                style={nightDisplayFont}
                className="font-night-display text-[25px] leading-[1.1] font-semibold tracking-[-0.01em] text-[#F5F1E8]"
              >
                {business.name}
              </h1>
            </div>

            <p className="mt-3 text-[13.5px] leading-[1.55] text-[#B9BDB6]">
              {business.description}
            </p>

            <div className="mt-4 space-y-1 border-t border-[#333734] pt-3 text-[12.5px] text-[#B9BDB6]">
              <p>{business.address}</p>
              <p className="tabular-nums">
                {business.hours} ·{" "}
                <a
                  href={business.phoneHref}
                  className="font-medium text-[#F5F1E8] hover:text-[#F28B50]"
                >
                  {business.phone}
                </a>
              </p>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="night-desktop-search-input" className="sr-only">
              Tüm menüde ara
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
                placeholder="Tüm menüde ara…"
                className="w-full rounded-[8px] border border-[#323633] bg-[#242725] py-2 pr-16 pl-3.5 text-[13.5px] text-[#F5F1E8] placeholder:text-[#B9BDB6]/65 focus:border-[#F28B50] focus:outline-none"
              />
              {searchQuery.length > 0 && (
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 text-[12px] font-medium text-[#F28B50] hover:text-[#F5F1E8]"
                >
                  Temizle
                </button>
              )}
            </div>
          </div>

          <nav aria-label="Menü kategorileri" className="mt-5">
            <p className="px-2 pb-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#B9BDB6]/75">
              Kategoriler
            </p>
            <ul className="space-y-1">
              {categories.map((category, idx) => {
                const isActive =
                  category.id === activeCategoryId && !isSearching;
                const orderLabel = String(idx + 1).padStart(2, "0");

                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => {
                        if (isSearching) onClearSearch();
                        onSelectCategory(category.id);
                      }}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex w-full items-start gap-2.5 rounded-[8px] px-3 py-2.5 text-left text-[13.5px] leading-[1.32] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28B50] ${
                        isActive
                          ? "bg-[#F28B50] font-semibold text-[#171918]"
                          : "font-medium text-[#B9BDB6] hover:bg-[#242725] hover:text-[#F5F1E8]"
                      }`}
                    >
                      <span
                        className={`mt-[1px] shrink-0 text-[11.5px] tabular-nums ${
                          isActive ? "text-[#171918]/80" : "text-[#F28B50]"
                        }`}
                      >
                        {orderLabel}
                      </span>
                      <span className="min-w-0 flex-1">{category.name}</span>
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
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-[#2C302D] pb-3 text-[13px] text-[#B9BDB6]">
              <span>
                <strong className="font-semibold text-[#F5F1E8]">
                  “{searchQuery.trim()}”
                </strong>{" "}
                için tüm menüde {totalMatches} sonuç bulundu
              </span>
              <button
                type="button"
                onClick={onClearSearch}
                className="font-semibold text-[#F28B50] hover:underline"
              >
                Aramayı temizle
              </button>
            </div>
          )}

          {sectionsToRender.length === 0 ? (
            <section
              aria-live="polite"
              className="rounded-[10px] border border-[#323633] bg-[#242725] px-5 py-8 text-left"
            >
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#F28B50]">
                Arama Sonucu
              </p>
              <h2
                style={nightDisplayFont}
                className="mt-1.5 font-night-display text-[24px] leading-[1.2] font-semibold text-[#F5F1E8]"
              >
                Aramanızla eşleşen ürün bulunamadı.
              </h2>
              <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.55] text-[#B9BDB6]">
                “{searchQuery.trim()}” için menüde bir ürün yer almıyor. Farklı
                bir sözcük deneyebilir veya seçili kategoriye dönebilirsiniz.
              </p>
              <button
                type="button"
                onClick={onClearSearch}
                className="mt-5 inline-flex items-center rounded-[6px] bg-[#F28B50] px-4 py-2 text-[13px] font-semibold text-[#171918] transition-colors duration-150 hover:bg-[#f59c69]"
              >
                Tüm menüyü göster
              </button>
            </section>
          ) : (
            <div className="space-y-8">
              {sectionsToRender.map((section) => (
                <section
                  key={section.category.id}
                  id={`night-kategori-${section.category.id}`}
                  aria-labelledby={`night-heading-${section.category.id}`}
                >
                  <div className="flex items-end justify-between gap-4 border-b border-[#2C302D] pb-3">
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#F28B50]">
                        {section.orderLabel}
                        {section.category.shortLabel ? (
                          <span className="hidden lg:inline">
                            {` · ${section.category.shortLabel}`}
                          </span>
                        ) : null}
                      </p>
                      <h2
                        id={`night-heading-${section.category.id}`}
                        style={nightDisplayFont}
                        className="mt-1 font-night-display text-[24px] leading-[1.16] font-semibold tracking-[-0.01em] text-[#F5F1E8] md:text-[30px]"
                      >
                        <span className="lg:hidden">
                          {section.category.shortLabel ?? section.category.name}
                        </span>
                        <span className="hidden lg:inline">
                          {section.category.name}
                        </span>
                      </h2>
                    </div>
                    <span className="shrink-0 text-[12px] font-medium tabular-nums text-[#B9BDB6]">
                      {section.items.length} çeşit
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
                    {section.items.map((item) => {
                      const cardLabel = item.displayName ?? item.name;
                      return (
                        <article key={item.id} className="flex">
                          <button
                            type="button"
                            onClick={(event) =>
                              onSelectItem(item, event.currentTarget)
                            }
                            className="group flex h-full w-full flex-col overflow-hidden rounded-[8px] border border-[#323633] bg-[#242725] text-left transition-colors duration-150 hover:border-[#F28B50]/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F28B50]"
                          >
                            {item.image && (
                              <div className="relative aspect-square w-full overflow-hidden bg-[#1D201E]">
                                <Image
                                  src={item.image.gridUrl}
                                  alt={item.image.alt}
                                  fill
                                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 290px"
                                  unoptimized
                                  className="object-cover"
                                />
                              </div>
                            )}

                            <div className="flex flex-1 flex-col p-3 md:p-4">
                              <h3 className="text-[14px] leading-[1.32] font-semibold text-[#F5F1E8] transition-colors duration-150 group-hover:text-[#F28B50] md:text-[15px]">
                                {cardLabel}
                              </h3>

                              <p className="mt-auto pt-2.5 text-[15px] leading-[1.2] font-bold tabular-nums text-[#F28B50] md:text-[16px]">
                                {formatPriceTRY(item.priceKurus)}
                              </p>
                            </div>
                          </button>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* Mobil ve genel alt bilgi: mobilde tam tanıtım metni burada kesilmeden gösterilir */}
          <footer className="mt-12 border-t border-[#2C302D] pt-5 text-[12.5px] leading-[1.55] text-[#B9BDB6]">
            <p className="mb-2 text-[#B9BDB6] lg:hidden">
              {business.description}
            </p>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <span>
                {business.name} · {business.address} ·{" "}
                <a
                  href={business.phoneHref}
                  className="font-medium text-[#F5F1E8] hover:text-[#F28B50]"
                >
                  {business.phone}
                </a>
              </span>
              <span>Fiyatlara KDV dahildir.</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
