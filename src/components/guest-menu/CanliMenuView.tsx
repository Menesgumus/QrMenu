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
  navRef?: React.RefObject<HTMLDivElement | null>;
  stickyTopOffset?: number;
}

function CanliItemRow({
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
      className="group flex w-full items-start gap-3.5 rounded-[14px] border-[1.5px] border-[#24201B] bg-white p-3 text-left shadow-[2px_2px_0_#24201B] transition-[transform,box-shadow,border-color] duration-150 hover:-translate-y-0.5 hover:border-[#AD3028] hover:shadow-[3px_3px_0_#AD3028] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AD3028] md:items-center md:gap-4 md:p-3.5"
    >
      {item.image && (
        <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[10px] border border-[#24201B]/25 bg-[#F4CE45]/20 md:h-[104px] md:w-[104px]">
          <Image
            src={item.image.thumbUrl}
            alt={item.image.alt}
            width={104}
            height={104}
            sizes="(min-width: 768px) 104px, 88px"
            unoptimized
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h3
          style={{
            fontFamily: "var(--font-lively-display), system-ui, sans-serif",
          }}
          className="font-lively-display text-[17px] leading-[1.2] font-bold tracking-[-0.01em] text-[#24201B] transition-colors group-hover:text-[#AD3028] md:text-[18.5px]"
        >
          {title}
        </h3>

        {item.description && (
          <p className="mt-1 line-clamp-2 text-[13px] leading-[1.45] text-[#5C5347] md:text-[13.5px]">
            {item.description}
          </p>
        )}

        {/* Mobilde fiyat açıklamanın hemen altında; dar ekranda isim ve fotoğrafla sıkışmaz */}
        <div className="mt-2 flex items-center justify-between gap-2 md:hidden">
          <span className="inline-flex items-center rounded-[7px] bg-[#AD3028] px-2.5 py-0.5 text-[14px] font-extrabold tabular-nums text-[#FFF9ED]">
            {formattedPrice}
          </span>
          <span className="text-[11.5px] font-semibold text-[#5C5347] group-hover:text-[#AD3028]">
            İncele →
          </span>
        </div>
      </div>

      {/* Masaüstünde sağ fiyat sütunu */}
      <div className="hidden shrink-0 flex-col items-end justify-center pl-3 md:flex">
        <span className="inline-flex items-center rounded-[8px] bg-[#AD3028] px-3 py-1 text-[16px] font-extrabold tabular-nums text-[#FFF9ED] transition-colors group-hover:bg-[#8E251E]">
          {formattedPrice}
        </span>
        <span className="mt-1.5 text-[11.5px] font-semibold text-[#5C5347] group-hover:text-[#AD3028]">
          Detay →
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
  navRef,
  stickyTopOffset = 0,
}: CanliMenuViewProps) {
  const scrollStripRef = useRef<HTMLElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const showCategoryCards = !isSearching && viewMode === "categories";
  const showItemList = !isSearching && viewMode === "items";

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

      return {
        category,
        orderLabel: String(index + 1).padStart(2, "0"),
        count: categoryItems.length,
        coverUrl:
          category.coverImageUrl ?? categoryItems[0]?.image?.gridUrl ?? "",
        coverAlt:
          category.coverImageAlt ??
          categoryItems[0]?.image?.alt ??
          category.name,
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

  return (
    <div
      style={livelyBodyFont}
      className="min-h-screen bg-[#FFF9ED] text-[#24201B] font-visual selection:bg-[#F4CE45] selection:text-[#24201B]"
    >
      {/* Kompakt Canlı İşletme Başlığı (#F4CE45 ana renk bloğu) */}
      <header className="border-b-2 border-[#24201B] bg-[#F4CE45]">
        <div className="mx-auto w-full max-w-[980px] px-4 py-2.5 md:px-8 md:py-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-3">
            <div className="flex min-w-0 items-center gap-2.5 md:gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border-[1.5px] border-[#24201B] bg-[#FFF9ED] p-1 shadow-[2px_2px_0_#24201B] md:h-11 md:w-11 md:p-1.5">
                <BrandMark className="h-[26px] w-[26px] shrink-0 md:h-7 md:w-7" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1
                    style={livelyHeadingFont}
                    className="font-lively-display text-[20px] leading-[1.08] font-extrabold tracking-[-0.015em] text-[#24201B] md:text-[26px]"
                  >
                    {business.name}
                  </h1>
                  <span className="hidden items-center rounded-full border border-[#24201B] bg-[#FFF9ED] px-2 py-0.5 text-[10.5px] font-bold tracking-[0.04em] uppercase text-[#AD3028] md:inline-flex">
                    Taze Fırın &amp; Kahve
                  </span>
                </div>

                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] leading-[1.35] font-medium text-[#24201B]/85 md:mt-1 md:text-[12.5px]">
                  <span>{business.address}</span>
                  <span aria-hidden="true" className="opacity-45">
                    ·
                  </span>
                  <span className="tabular-nums">{business.hours}</span>
                  <span aria-hidden="true" className="opacity-45">
                    ·
                  </span>
                  <a
                    href={business.phoneHref}
                    className="font-bold tabular-nums text-[#24201B] underline decoration-[#24201B]/35 underline-offset-2 hover:text-[#AD3028]"
                  >
                    {business.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Kompakt Arama Alanı (Tüm menüde arar) */}
            <div className="w-full shrink-0 md:w-[300px]">
              <label htmlFor="canli-menu-search" className="sr-only">
                Menüde ürün ara
              </label>
              <div className="relative flex items-center">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 h-4 w-4 text-[#5C5347]"
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
                  placeholder="Menüde ara (kruvasan, latte…)"
                  className={`h-10 w-full rounded-[10px] border-[1.5px] border-[#24201B] bg-[#FFF9ED] pl-9 text-[13.5px] font-medium text-[#24201B] placeholder:text-[#6E6355] focus:border-[#AD3028] focus:outline-none ${
                    searchQuery.length > 0 ? "pr-20" : "pr-3.5"
                  }`}
                />
                {searchQuery.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearSearch}
                    className="absolute right-1.5 rounded-[7px] bg-[#AD3028] px-2.5 py-1 text-[11.5px] font-bold text-[#FFF9ED] transition-colors hover:bg-[#8E251E]"
                  >
                    Temizle
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Ürün Listesi Modunda Sabit Kategori ve Dönüş Çubuğu */}
      {showItemList && (
        <div
          ref={navRef}
          style={{ top: `${stickyTopOffset}px` }}
          className="sticky z-30 border-b-[1.5px] border-[#24201B] bg-[#FFF9ED]/95 backdrop-blur-sm"
        >
          <div className="mx-auto flex w-full max-w-[980px] flex-col gap-2 px-4 py-2 md:flex-row md:items-center md:justify-between md:gap-4 md:px-8 md:py-2.5">
            <div className="flex shrink-0 items-center">
              <button
                type="button"
                onClick={onBackToCategories}
                className="inline-flex items-center gap-1.5 rounded-[10px] border-[1.5px] border-[#24201B] bg-[#F4CE45] px-3 py-1.5 text-[12.5px] font-bold text-[#24201B] shadow-[2px_2px_0_#24201B] transition-colors hover:bg-[#AD3028] hover:text-[#FFF9ED] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AD3028]"
              >
                <span aria-hidden="true">←</span>
                <span>Kategorilere dön</span>
              </button>
            </div>

            <div className="relative min-w-0 flex-1">
              <nav
                ref={scrollStripRef}
                aria-label="Menü kategorileri"
                className={`no-scrollbar flex w-full items-center gap-1.5 overflow-x-auto ${
                  canScrollRight ? "pr-7" : ""
                }`}
              >
                {categories.map((category) => {
                  const isActive = category.id === activeCategoryId;
                  const label = category.shortLabel ?? category.name;

                  return (
                    <button
                      key={category.id}
                      ref={(el) => {
                        tabRefs.current[category.id] = el;
                      }}
                      type="button"
                      onClick={() => onSelectCategory(category.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`shrink-0 rounded-full border-[1.5px] px-3.5 py-1 text-[12.5px] font-bold whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AD3028] ${
                        isActive
                          ? "border-[#AD3028] bg-[#AD3028] text-[#FFF9ED]"
                          : "border-[#24201B] bg-white text-[#24201B] hover:bg-[#F4CE45]"
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
                  className="pointer-events-none absolute inset-y-0 left-0 flex w-6 items-center bg-gradient-to-r from-[#FFF9ED] via-[#FFF9ED]/85 to-transparent"
                >
                  <span className="text-[13px] leading-none font-bold text-[#5C5347]">
                    ‹
                  </span>
                </div>
              )}

              {canScrollRight && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 flex w-8 items-center justify-end bg-gradient-to-l from-[#FFF9ED] via-[#FFF9ED]/90 to-transparent pr-0.5"
                >
                  <span className="text-[13px] leading-none font-bold text-[#AD3028]">
                    ›
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-[980px] px-4 pt-3 pb-16 md:px-8 md:pt-7">
        {/* AÇILIŞ: GÖRSELLİ KATEGORİ KARTLARI */}
        {showCategoryCards && (
          <section aria-labelledby="canli-categories-heading">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b-[1.5px] border-[#24201B] pb-2 md:mb-4 md:items-end md:pb-3">
              <div>
                <p className="hidden items-center rounded-full bg-[#F4CE45] px-2.5 py-0.5 text-[11px] font-bold tracking-[0.06em] uppercase text-[#24201B] md:inline-flex">
                  Kategoriler
                </p>
                <h2
                  id="canli-categories-heading"
                  style={livelyHeadingFont}
                  className="font-lively-display text-[18px] leading-[1.2] font-extrabold tracking-[-0.015em] text-[#24201B] md:mt-1.5 md:text-[28px]"
                >
                  Ne yemek ya da içmek istersin?
                </h2>
              </div>
              <span className="shrink-0 text-[12px] font-bold text-[#5C5347] md:text-[12.5px]">
                {categoryCards.length} bölüm · {allItems.length} ürün
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
              {categoryCards.map((card, index) => {
                const isLastOddMobile =
                  categoryCards.length % 2 === 1 &&
                  index === categoryCards.length - 1;

                return (
                  <button
                    key={card.category.id}
                    type="button"
                    onClick={() => onSelectCategory(card.category.id)}
                    className={`group flex overflow-hidden rounded-[16px] border-[1.5px] border-[#24201B] bg-white text-left shadow-[3px_3px_0_#24201B] transition-[transform,box-shadow,border-color] duration-150 hover:-translate-y-0.5 hover:border-[#AD3028] hover:shadow-[4px_4px_0_#AD3028] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AD3028] ${
                      isLastOddMobile
                        ? "col-span-2 flex-row items-stretch md:col-span-1 md:flex-col"
                        : "flex-col"
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden bg-[#F4CE45]/20 ${
                        isLastOddMobile
                          ? "w-[132px] shrink-0 aspect-square border-r-[1.5px] border-[#24201B] md:w-full md:aspect-[4/3] md:border-r-0 md:border-b-[1.5px]"
                          : "aspect-[4/3] w-full border-b-[1.5px] border-[#24201B]"
                      }`}
                    >
                      {card.coverUrl && (
                        <Image
                          src={card.coverUrl}
                          alt={card.coverAlt}
                          fill
                          sizes="(min-width: 768px) 300px, 46vw"
                          unoptimized
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                        />
                      )}
                      <span className="absolute top-2 left-2 rounded-[6px] border border-[#24201B] bg-[#F4CE45] px-2 py-0.5 text-[11px] font-extrabold tabular-nums text-[#24201B]">
                        {card.orderLabel}
                      </span>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 bg-[#FFF9ED] p-3 md:p-3.5">
                      <div>
                        <h3
                          style={livelyHeadingFont}
                          className="font-lively-display text-[17.5px] leading-[1.15] font-extrabold tracking-[-0.01em] text-[#24201B] transition-colors group-hover:text-[#AD3028] md:text-[20px]"
                        >
                          {card.category.shortLabel ?? card.category.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-[11.5px] leading-[1.35] font-medium text-[#5C5347] md:text-[12px]">
                          {card.category.name}
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="inline-flex items-center rounded-full border border-[#24201B] bg-[#F4CE45] px-2.5 py-0.5 text-[11.5px] font-bold text-[#24201B]">
                          {card.count} ürün
                        </span>
                        <span className="text-[12px] font-extrabold text-[#AD3028] transition-transform group-hover:translate-x-0.5">
                          Aç →
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
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-[12px] border-[1.5px] border-[#24201B] bg-[#F4CE45]/45 px-4 py-2.5 text-[13px] text-[#24201B]">
              <span>
                <strong className="font-extrabold">“{searchQuery.trim()}”</strong>{" "}
                için {totalMatches} sonuç gösteriliyor
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="rounded-[7px] bg-[#AD3028] px-2.5 py-1 text-[12px] font-bold text-[#FFF9ED] hover:bg-[#8E251E]"
                >
                  Temizle
                </button>
              </div>
            </div>

            {visibleSections.length === 0 ? (
              <section
                aria-live="polite"
                className="rounded-[16px] border-[1.5px] border-[#24201B] bg-white px-5 py-8 shadow-[3px_3px_0_#24201B]"
              >
                <p className="inline-block rounded-full bg-[#F4CE45] px-2.5 py-0.5 text-[11px] font-bold tracking-[0.06em] uppercase text-[#24201B]">
                  Arama Sonucu
                </p>
                <h2
                  style={livelyHeadingFont}
                  className="mt-2 font-lively-display text-[24px] leading-[1.15] font-extrabold text-[#24201B]"
                >
                  Aramanızla eşleşen ürün bulunamadı.
                </h2>
                <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.55] text-[#5C5347]">
                  “{searchQuery.trim()}” için menüde bir ürün yer almıyor.
                  Farklı bir sözcük deneyebilir veya kategorilere dönebilirsiniz.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={onClearSearch}
                    className="inline-flex items-center rounded-[10px] border-[1.5px] border-[#24201B] bg-[#AD3028] px-4 py-2 text-[13px] font-bold text-[#FFF9ED] transition-colors hover:bg-[#8E251E]"
                  >
                    Aramayı temizle
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClearSearch();
                      onBackToCategories();
                    }}
                    className="inline-flex items-center rounded-[10px] border-[1.5px] border-[#24201B] bg-[#F4CE45] px-4 py-2 text-[13px] font-bold text-[#24201B] transition-colors hover:bg-[#e8c237]"
                  >
                    Kategorilere dön
                  </button>
                </div>
              </section>
            ) : (
              <div className="space-y-8">
                {visibleSections.map((section) => (
                  <section
                    key={section.category.id}
                    aria-labelledby={`canli-search-heading-${section.category.id}`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3 border-b-[1.5px] border-[#24201B] pb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="rounded-[6px] border border-[#24201B] bg-[#F4CE45] px-2 py-0.5 text-[11px] font-extrabold tabular-nums text-[#24201B]">
                          {section.orderLabel}
                        </span>
                        <h2
                          id={`canli-search-heading-${section.category.id}`}
                          style={livelyHeadingFont}
                          className="font-lively-display text-[20px] leading-[1.15] font-extrabold text-[#24201B] md:text-[24px]"
                        >
                          {section.category.name}
                        </h2>
                      </div>
                      <span className="shrink-0 text-[12px] font-bold text-[#AD3028]">
                        {section.items.length} ürün
                      </span>
                    </div>

                    <div className="space-y-3">
                      {section.items.map((item) => (
                        <CanliItemRow
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
        )}

        {/* SEÇİLİ KATEGORİ ÜRÜN LİSTESİ (Tek Sütun) */}
        {showItemList && activeCategorySection && (
          <section
            aria-labelledby={`canli-heading-${activeCategorySection.category.id}`}
          >
            <div className="mb-3 flex items-center justify-between gap-2.5 rounded-[12px] border-[1.5px] border-[#24201B] bg-[#F4CE45] px-3.5 py-2 shadow-[2px_2px_0_#24201B] md:mb-4 md:items-end md:rounded-[14px] md:px-4 md:py-3 md:shadow-[3px_3px_0_#24201B]">
              <div className="flex min-w-0 items-center gap-2 md:block">
                <span className="inline-flex shrink-0 items-center rounded-full border border-[#24201B] bg-[#FFF9ED] px-2 py-0.5 text-[11px] font-extrabold tabular-nums text-[#AD3028] md:hidden">
                  {activeCategorySection.orderLabel}
                </span>
                <span className="hidden rounded-full border border-[#24201B] bg-[#FFF9ED] px-2.5 py-0.5 text-[11px] font-extrabold tabular-nums text-[#AD3028] md:inline-block">
                  {activeCategorySection.orderLabel} ·{" "}
                  {activeCategorySection.category.shortLabel ??
                    activeCategorySection.category.name}
                </span>
                <h2
                  id={`canli-heading-${activeCategorySection.category.id}`}
                  style={livelyHeadingFont}
                  className="font-lively-display text-[20px] leading-[1.15] font-extrabold tracking-[-0.015em] text-[#24201B] md:mt-1.5 md:text-[30px] md:leading-[1.12]"
                >
                  <span className="md:hidden">
                    {activeCategorySection.category.shortLabel ??
                      activeCategorySection.category.name}
                  </span>
                  <span className="hidden md:inline">
                    {activeCategorySection.category.name}
                  </span>
                </h2>
              </div>
              <span className="shrink-0 rounded-[8px] border border-[#24201B] bg-[#FFF9ED] px-2.5 py-0.5 text-[12px] font-extrabold text-[#24201B] md:py-1">
                {activeCategorySection.items.length} ürün
              </span>
            </div>

            <div className="space-y-3">
              {activeCategorySection.items.map((item) => (
                <CanliItemRow
                  key={item.id}
                  item={item}
                  onSelect={onSelectItem}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="mx-auto w-full max-w-[980px] px-4 pb-10 md:px-8">
        <div className="border-t-[1.5px] border-[#24201B] pt-4 text-[12.5px] font-medium text-[#5C5347]">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <strong className="font-bold text-[#24201B]">{business.name}</strong>{" "}
              · {business.address} ·{" "}
              <a
                href={business.phoneHref}
                className="font-bold text-[#24201B] underline decoration-[#24201B]/35 underline-offset-2 hover:text-[#AD3028]"
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
