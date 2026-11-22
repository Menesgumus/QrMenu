"use client";

import Image from "next/image";
import { formatPriceTRY } from "@/lib/format";
import type { BusinessProfile, MenuCategory, MenuItem } from "@/types/menu";
import { BrandMark } from "./BrandMark";

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
}

function FerahItemRow({
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
      className="group flex w-full items-start gap-3.5 px-4 py-3.5 text-left transition-colors duration-150 hover:bg-[#F8FAFC] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#2454D6] md:items-center md:gap-4 md:px-5 md:py-4"
    >
      {item.image && (
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-[#EFF6FF] md:h-24 md:w-24">
          <Image
            src={item.image.thumbUrl}
            alt={item.image.alt}
            width={96}
            height={96}
            sizes="(min-width: 768px) 96px, 80px"
            unoptimized
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h3 className="text-[15.5px] leading-[1.32] font-semibold tracking-[-0.01em] text-[#182747] transition-colors group-hover:text-[#2454D6] md:text-[16.5px]">
          {title}
        </h3>

        {item.description && (
          <p className="mt-1 line-clamp-2 text-[13px] leading-[1.48] text-[#596579] md:text-[13.5px]">
            {item.description}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between gap-2 md:hidden">
          <span className="text-[15px] font-bold tabular-nums text-[#2454D6]">
            {formattedPrice}
          </span>
          <span className="text-[12px] font-medium text-[#596579] group-hover:text-[#2454D6]">
            İncele →
          </span>
        </div>
      </div>

      <div className="hidden shrink-0 flex-col items-end justify-center pl-4 md:flex">
        <span className="text-[16.5px] font-bold tabular-nums text-[#2454D6]">
          {formattedPrice}
        </span>
        <span className="mt-1 text-[11.5px] font-medium text-[#596579] group-hover:text-[#2454D6]">
          Detay →
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
}: FerahMenuViewProps) {
  const allExpanded =
    visibleSections.length > 0 &&
    visibleSections.every((sec) => openCategoryIds.includes(sec.category.id));

  const ferahFontStyle = {
    fontFamily: "var(--font-ferah-sans), system-ui, sans-serif",
  } as const;

  return (
    <div
      style={ferahFontStyle}
      className="min-h-screen bg-[#FFFFFF] text-[#182747] font-ferah selection:bg-[#EFF6FF] selection:text-[#2454D6]"
    >
      {/* Kompakt Ferah İşletme Başlığı (#EFF6FF açık mavi yüzey) */}
      <header className="border-b border-[#DBEAFE] bg-[#EFF6FF]">
        <div className="mx-auto w-full max-w-[860px] px-4 py-3 md:px-8 md:py-4">
          <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between md:gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#BFDBFE] bg-[#FFFFFF] p-1 md:h-11 md:w-11 md:p-1.5">
                <BrandMark className="h-[26px] w-[26px] shrink-0 md:h-7 md:w-7" />
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="text-[20px] leading-[1.14] font-bold tracking-[-0.02em] text-[#182747] md:text-[24px]">
                  {business.name}
                </h1>
                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] leading-[1.4] text-[#596579] md:mt-1 md:text-[12.5px]">
                  <span>{business.address}</span>
                  <span aria-hidden="true" className="text-[#CBD5E1]">
                    ·
                  </span>
                  <span className="tabular-nums">{business.hours}</span>
                  <span aria-hidden="true" className="text-[#CBD5E1]">
                    ·
                  </span>
                  <a
                    href={business.phoneHref}
                    className="font-semibold tabular-nums text-[#182747] underline decoration-[#BFDBFE] underline-offset-2 hover:text-[#2454D6]"
                  >
                    {business.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Kolay Erişilen Arama */}
            <div className="w-full shrink-0 md:w-[296px]">
              <label htmlFor="ferah-menu-search" className="sr-only">
                Menüde ürün ara
              </label>
              <div className="relative flex items-center">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 h-4 w-4 text-[#596579]"
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
                  placeholder="Menüde ara (ör. kruvasan, latte…)"
                  className={`h-10 w-full rounded-[10px] border border-[#CBD5E1] bg-[#FFFFFF] pl-9 text-[13.5px] font-medium text-[#182747] placeholder:text-[#64748B] focus:border-[#2454D6] focus:ring-2 focus:ring-[#2454D6]/15 focus:outline-none ${
                    searchQuery.length > 0 ? "pr-20" : "pr-3.5"
                  }`}
                />
                {searchQuery.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearSearch}
                    className="absolute right-1.5 rounded-[7px] bg-[#2454D6] px-2.5 py-1 text-[11.5px] font-semibold text-[#FFFFFF] transition-colors hover:bg-[#1E44B8]"
                  >
                    Temizle
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
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-[10px] border border-[#DBEAFE] bg-[#EFF6FF] px-3.5 py-2.5 text-[13px] text-[#182747]">
            <span>
              <strong className="font-semibold">“{searchQuery.trim()}”</strong>{" "}
              için {totalMatches} sonuç gösteriliyor
            </span>
            <button
              type="button"
              onClick={onClearSearch}
              className="rounded-[7px] bg-[#2454D6] px-2.5 py-1 text-[12px] font-semibold text-[#FFFFFF] transition-colors hover:bg-[#1E44B8]"
            >
              Aramayı temizle
            </button>
          </div>
        ) : (
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[12.5px] font-medium text-[#596579]">
              {visibleSections.length} bölüm · {allItemsCount} ürün
            </p>
            <button
              type="button"
              onClick={allExpanded ? onCollapseAll : onExpandAll}
              className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-1.5 text-[12.5px] font-semibold text-[#2454D6] transition-colors hover:border-[#2454D6]/40 hover:bg-[#DBEAFE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2454D6]"
            >
              {allExpanded ? "Tümünü kapat" : "Tümünü aç"}
            </button>
          </div>
        )}

        {/* Arama Boş Durumu */}
        {isSearching && visibleSections.length === 0 ? (
          <section
            aria-live="polite"
            className="rounded-[12px] border border-[#DBEAFE] bg-[#FFFFFF] px-5 py-8 text-left"
          >
            <p className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[#2454D6]">
              Arama Sonucu
            </p>
            <h2 className="mt-1.5 text-[20px] leading-[1.25] font-bold text-[#182747]">
              Aramanıza uygun ürün bulunamadı
            </h2>
            <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.55] text-[#596579]">
              “{searchQuery.trim()}” için eşleşen bir ürün yer almıyor. Aramayı
              temizleyerek önceki bölümlere geri dönebilirsiniz.
            </p>
            <button
              type="button"
              onClick={onClearSearch}
              className="mt-5 inline-flex items-center rounded-[9px] bg-[#2454D6] px-4 py-2 text-[13.5px] font-semibold text-[#FFFFFF] transition-colors hover:bg-[#1E44B8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2454D6]"
            >
              Aramayı temizle
            </button>
          </section>
        ) : (
          /* Dikey Açılır-Kapanır Kategoriler */
          <div className="space-y-3">
            {visibleSections.map((section) => {
              const isOpen =
                isSearching || openCategoryIds.includes(section.category.id);
              const shortLabel =
                section.category.shortLabel ?? section.category.name;

              return (
                <section
                  key={section.category.id}
                  id={`ferah-section-${section.category.id}`}
                  aria-labelledby={`ferah-heading-${section.category.id}`}
                  className={`overflow-hidden rounded-[12px] border transition-colors ${
                    isOpen
                      ? "border-[#BFDBFE] bg-[#FFFFFF]"
                      : "border-[#E2E8F0] bg-[#FFFFFF]"
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
                    className={`flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#2454D6] md:px-5 ${
                      isOpen
                        ? "bg-[#EFF6FF] hover:bg-[#E5F0FF]"
                        : "bg-[#FFFFFF] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span
                        className={`inline-flex h-6 min-w-[26px] shrink-0 items-center justify-center rounded-[6px] px-1.5 text-[11px] font-bold tabular-nums ${
                          isOpen
                            ? "bg-[#2454D6] text-[#FFFFFF]"
                            : "bg-[#EFF6FF] text-[#2454D6]"
                        }`}
                      >
                        {section.orderLabel}
                      </span>
                      <h2
                        id={`ferah-heading-${section.category.id}`}
                        className="text-[16px] leading-[1.25] font-bold tracking-[-0.01em] text-[#182747] md:text-[17.5px]"
                      >
                        {shortLabel}
                      </h2>
                    </div>

                    <div className="flex shrink-0 items-center gap-2.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold tabular-nums ${
                          isOpen
                            ? "bg-[#FFFFFF] text-[#2454D6]"
                            : "bg-[#EFF6FF] text-[#596579]"
                        }`}
                      >
                        {section.items.length} ürün
                      </span>
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                          isOpen
                            ? "rotate-180 text-[#2454D6]"
                            : "text-[#596579]"
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
                      className="divide-y divide-[#E2E8F0] border-t border-[#DBEAFE] bg-[#FFFFFF]"
                    >
                      {section.items.map((item) => (
                        <FerahItemRow
                          key={item.id}
                          item={item}
                          onSelect={onSelectItem}
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
        <div className="border-t border-[#E2E8F0] pt-4 text-[12.5px] text-[#596579]">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <strong className="font-semibold text-[#182747]">
                {business.name}
              </strong>{" "}
              · {business.address} ·{" "}
              <a
                href={business.phoneHref}
                className="font-medium text-[#182747] underline decoration-[#CBD5E1] underline-offset-2 hover:text-[#2454D6]"
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
