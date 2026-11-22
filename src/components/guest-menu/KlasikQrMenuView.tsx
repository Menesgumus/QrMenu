"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatPriceTRY } from "@/lib/format";
import type {
  BusinessProfile,
  MenuCategory,
  MenuItem,
} from "@/types/menu";
import { BrandMark } from "./BrandMark";

export interface KlasikVisibleSection {
  category: MenuCategory;
  orderLabel: string;
  items: MenuItem[];
}

interface KlasikQrMenuViewProps {
  business: BusinessProfile;
  categories: MenuCategory[];
  visibleSections: KlasikVisibleSection[];
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
  navRef?: React.RefObject<HTMLDivElement | null>;
  stickyTopOffset?: number;
}

function KlasikItemRow({
  item,
  onSelect,
}: {
  item: MenuItem;
  onSelect: (item: MenuItem, triggerEl: HTMLButtonElement) => void;
}) {
  const title = item.displayName ?? item.name;
  const formattedPrice = formatPriceTRY(item.priceKurus);

  return (
    <button
      type="button"
      onClick={(event) => onSelect(item, event.currentTarget)}
      className="group flex w-full items-center gap-3 px-3.5 py-3 text-left transition-colors duration-150 hover:bg-[#FAFAFB] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#1A1D21] md:gap-4 md:px-4 md:py-3.5"
    >
      {item.image && (
        <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-[9px] border border-[#EAECEF] bg-[#F1F3F5] md:h-[92px] md:w-[92px]">
          <Image
            src={item.image.thumbUrl}
            alt={item.image.alt}
            width={92}
            height={92}
            sizes="(min-width: 768px) 92px, 84px"
            unoptimized
            style={{
              objectPosition:
                item.image.focalPointByTheme?.klasik ?? "center center",
            }}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] leading-[1.3] font-semibold tracking-[-0.01em] text-[#1A1D21] md:text-[16px]">
          {title}
        </h3>
        {item.description && (
          <p className="mt-1 line-clamp-2 text-[12.5px] leading-[1.42] text-[#636A73] md:text-[13.5px]">
            {item.description}
          </p>
        )}
      </div>

      <div className="flex min-w-[66px] shrink-0 flex-col items-end justify-center pl-1.5 text-right">
        <span className="whitespace-nowrap text-[15px] font-bold tabular-nums text-[#1A1D21] md:text-[16px]">
          {formattedPrice}
        </span>
      </div>
    </button>
  );
}

export function KlasikQrMenuView({
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
}: KlasikQrMenuViewProps) {
  const scrollStripRef = useRef<HTMLElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const showSearchInput = searchOpen || isSearching;

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

  return (
    <div
      style={klasikFontStyle}
      className="min-h-screen bg-[#F7F7F8] text-[#1A1D21] font-klasik selection:bg-[#1A1D21]/10"
    >
      {/* Kompakt İşletme Başlığı */}
      <header className="border-b border-[#EAECEF] bg-[#FFFFFF]">
        <div className="mx-auto w-full max-w-[860px] px-4 py-2.5 md:px-8 md:py-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5 md:gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-[#E2E5E9] bg-[#FFFFFF] p-1 md:h-10 md:w-10">
                <BrandMark className="h-[24px] w-[24px] shrink-0 md:h-[26px] md:w-[26px]" />
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-[18px] leading-[1.15] font-bold tracking-[-0.02em] text-[#1A1D21] md:text-[21px]">
                  {business.name}
                </h1>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[11.5px] leading-[1.35] text-[#636A73] md:text-[12.5px]">
                  <span>{business.address}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{business.hours}</span>
                  <span aria-hidden="true" className="hidden sm:inline">
                    ·
                  </span>
                  <a
                    href={business.phoneHref}
                    className="hidden font-medium tabular-nums text-[#1A1D21] hover:underline sm:inline"
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
              className={`flex shrink-0 items-center gap-1.5 rounded-[8px] border px-3 py-1.5 text-[12.5px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1D21] ${
                showSearchInput
                  ? "border-[#1A1D21] bg-[#1A1D21] text-[#FFFFFF]"
                  : "border-[#E2E5E9] bg-[#F7F7F8] text-[#1A1D21] hover:border-[#C5CBD3]"
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
              <span>Ara</span>
            </button>
          </div>

          {showSearchInput && (
            <div id="klasik-search-panel" className="mt-2.5">
              <label htmlFor="klasik-menu-search" className="sr-only">
                Menüde ürün ara
              </label>
              <div className="relative flex items-center">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 h-4 w-4 text-[#636A73]"
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
                  placeholder="Menüde ara (ör. kruvasan, latte…)"
                  className={`h-10 w-full rounded-[9px] border border-[#D4D8DD] bg-[#F7F7F8] pl-9 text-[13.5px] font-medium text-[#1A1D21] placeholder:text-[#636A73] focus:border-[#1A1D21] focus:bg-[#FFFFFF] focus:outline-none ${
                    searchQuery.length > 0 ? "pr-20" : "pr-3.5"
                  }`}
                />
                {searchQuery.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearSearch}
                    className="absolute right-1.5 rounded-[7px] bg-[#1A1D21] px-2.5 py-1 text-[11.5px] font-semibold text-[#FFFFFF] hover:bg-[#32363E]"
                  >
                    Temizle
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Sabit Yatay Fotoğraflı Kategori Şeridi */}
      <div
        ref={navRef}
        style={{ top: `${stickyTopOffset}px` }}
        className="sticky z-30 border-b border-[#EAECEF] bg-[#FFFFFF]/95 backdrop-blur-sm"
      >
        <div className="mx-auto w-full max-w-[860px] px-4 py-2.5 md:px-8 md:py-3">
          <div className="relative">
            <nav
              ref={scrollStripRef}
              aria-label="Menü kategorileri"
              className={`no-scrollbar flex items-stretch gap-2.5 overflow-x-auto pb-0.5 ${
                canScrollRight ? "pr-6" : ""
              }`}
            >
              {categories.map((category) => {
                const isActive =
                  category.id === activeCategoryId && !isSearching;
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
                    className="group flex w-[112px] shrink-0 flex-col items-stretch text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1D21] md:w-[138px]"
                  >
                    <div
                      className={`relative h-[68px] w-full overflow-hidden rounded-[9px] bg-[#EAECEF] transition-all duration-150 md:h-[78px] ${
                        isActive
                          ? "ring-2 ring-[#1A1D21] ring-offset-1 ring-offset-white"
                          : "border border-[#E2E5E9] opacity-85 group-hover:opacity-100"
                      }`}
                    >
                      {category.coverImageUrl && (
                        <Image
                          src={category.coverImageUrl}
                          alt={category.coverImageAlt ?? label}
                          fill
                          sizes="138px"
                          unoptimized
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
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/80 via-black/35 to-transparent"
                      />
                      <span
                        className={`absolute inset-x-2 bottom-1.5 truncate text-[12.5px] leading-[1.15] text-white md:text-[13.5px] ${
                          isActive ? "font-bold" : "font-medium"
                        }`}
                      >
                        {label}
                      </span>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`mt-1.5 h-[3px] w-full rounded-full transition-colors ${
                        isActive ? "bg-[#1A1D21]" : "bg-transparent"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            {canScrollLeft && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 flex w-6 items-center bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF]/80 to-transparent"
              >
                <span className="text-[14px] font-bold text-[#1A1D21]">‹</span>
              </div>
            )}

            {canScrollRight && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 flex w-7 items-center justify-end bg-gradient-to-l from-[#FFFFFF] via-[#FFFFFF]/85 to-transparent pr-0.5"
              >
                <span className="text-[14px] font-bold text-[#1A1D21]">›</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* İçerik: Seçili Kategori Ürün Listesi veya Arama Sonuçları */}
      <main className="mx-auto w-full max-w-[860px] px-4 pt-3.5 pb-16 md:px-8 md:pt-5">
        {isSearching ? (
          <div>
            <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2 rounded-[10px] border border-[#E2E5E9] bg-[#FFFFFF] px-3.5 py-2.5 text-[13px] text-[#1A1D21]">
              <span>
                <strong className="font-semibold">
                  “{searchQuery.trim()}”
                </strong>{" "}
                için {totalMatches} sonuç
              </span>
              <button
                type="button"
                onClick={onClearSearch}
                className="rounded-[7px] bg-[#1A1D21] px-2.5 py-1 text-[12px] font-semibold text-[#FFFFFF] hover:bg-[#32363E]"
              >
                Aramayı temizle
              </button>
            </div>

            {visibleSections.length === 0 ? (
              <section
                aria-live="polite"
                className="rounded-[12px] border border-[#EAECEF] bg-[#FFFFFF] px-5 py-8 text-left"
              >
                <p className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[#636A73]">
                  Arama Sonucu
                </p>
                <h2 className="mt-1.5 text-[20px] leading-[1.25] font-bold text-[#1A1D21]">
                  Aramanıza uygun ürün bulunamadı
                </h2>
                <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.55] text-[#636A73]">
                  “{searchQuery.trim()}” için menüde eşleşen bir ürün yer
                  almıyor. Aramayı temizleyerek kategorilere dönebilirsiniz.
                </p>
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="mt-5 inline-flex items-center rounded-[8px] bg-[#1A1D21] px-4 py-2 text-[13px] font-semibold text-[#FFFFFF] hover:bg-[#32363E]"
                >
                  Aramayı temizle
                </button>
              </section>
            ) : (
              <div className="space-y-6">
                {visibleSections.map((section) => (
                  <section
                    key={section.category.id}
                    aria-labelledby={`klasik-search-heading-${section.category.id}`}
                  >
                    <div className="mb-2 flex items-baseline justify-between gap-2 px-0.5">
                      <h2
                        id={`klasik-search-heading-${section.category.id}`}
                        className="text-[16px] font-bold text-[#1A1D21] md:text-[18px]"
                      >
                        {section.category.shortLabel ?? section.category.name}
                      </h2>
                      <span className="shrink-0 text-[12px] font-medium text-[#636A73]">
                        {section.items.length} ürün
                      </span>
                    </div>

                    <div className="divide-y divide-[#EAECEF] overflow-hidden rounded-[12px] border border-[#EAECEF] bg-[#FFFFFF]">
                      {section.items.map((item) => (
                        <KlasikItemRow
                          key={item.id}
                          item={item}
                          onSelect={onSelectItem}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        ) : (
          activeSection && (
            <section
              aria-labelledby={`klasik-heading-${activeSection.category.id}`}
            >
              <div className="mb-2.5 flex items-baseline justify-between gap-3 px-0.5">
                <div className="min-w-0">
                  <h2
                    id={`klasik-heading-${activeSection.category.id}`}
                    className="text-[17px] leading-[1.2] font-bold tracking-[-0.015em] text-[#1A1D21] md:text-[20px]"
                  >
                    <span className="md:hidden">
                      {activeSection.category.shortLabel ??
                        activeSection.category.name}
                    </span>
                    <span className="hidden md:inline">
                      {activeSection.category.name}
                    </span>
                  </h2>
                </div>
                <span className="shrink-0 text-[12.5px] font-medium text-[#636A73]">
                  {activeSection.items.length} ürün
                </span>
              </div>

              <div className="divide-y divide-[#EAECEF] overflow-hidden rounded-[12px] border border-[#EAECEF] bg-[#FFFFFF]">
                {activeSection.items.map((item) => (
                  <KlasikItemRow
                    key={item.id}
                    item={item}
                    onSelect={onSelectItem}
                  />
                ))}
              </div>
            </section>
          )
        )}
      </main>

      <footer className="mx-auto w-full max-w-[860px] px-4 pb-10 md:px-8">
        <div className="border-t border-[#EAECEF] pt-4 text-[12px] text-[#636A73]">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <strong className="font-semibold text-[#1A1D21]">
                {business.name}
              </strong>{" "}
              · {business.address} ·{" "}
              <a
                href={business.phoneHref}
                className="font-medium text-[#1A1D21] hover:underline"
              >
                {business.phone}
              </a>
            </span>
            <span>Fiyatlara KDV dahildir.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
