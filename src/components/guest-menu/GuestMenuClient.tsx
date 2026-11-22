"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { normalizeTurkish } from "@/lib/format";
import type { GuestMenuData, MenuItem, MenuThemeId } from "@/types/menu";
import { CanliMenuView, type CanliViewMode } from "./CanliMenuView";
import { CategoryNav } from "./CategoryNav";
import { FerahMenuView } from "./FerahMenuView";
import { ItemDetailModal } from "./ItemDetailModal";
import { KlasikQrMenuView } from "./KlasikQrMenuView";
import { MenuHeader } from "./MenuHeader";
import { MenuItemRow } from "./MenuItemRow";
import { NightMenuView } from "./NightMenuView";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { VitrinMenuView, type VitrinViewMode } from "./VitrinMenuView";

interface GuestMenuClientProps {
  data: GuestMenuData;
  initialTheme?: MenuThemeId;
  showThemeSwitcher?: boolean;
}

export function GuestMenuClient({
  data,
  initialTheme,
  showThemeSwitcher = false,
}: GuestMenuClientProps) {
  const publishedItems = useMemo(
    () =>
      data.items
        .filter((item) => item.isPublished)
        .sort((a, b) => a.sortOrder - b.sortOrder),
    [data.items]
  );

  const sortedCategories = useMemo(
    () => [...data.categories].sort((a, b) => a.sortOrder - b.sortOrder),
    [data.categories]
  );

  const [activeTheme, setActiveTheme] = useState<MenuThemeId>(
    initialTheme ?? data.business.defaultTheme
  );
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    sortedCategories[0]?.id ?? ""
  );
  const [hasExplicitCategorySelection, setHasExplicitCategorySelection] =
    useState(false);
  const [canliViewMode, setCanliViewMode] =
    useState<CanliViewMode>("categories");
  const [vitrinViewMode, setVitrinViewMode] =
    useState<VitrinViewMode>("categories");
  const [ferahOpenCategoryIds, setFerahOpenCategoryIds] = useState<string[]>(
    () => (sortedCategories[0] ? [sortedCategories[0].id] : [])
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [switcherHeight, setSwitcherHeight] = useState(
    showThemeSwitcher ? 39 : 0
  );
  const [stickyHeight, setStickyHeight] = useState(48);

  const switcherRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const lockScrollSpyUntilRef = useRef<number>(0);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const pendingThemeCategoryRef = useRef<string | null>(null);

  const normalizedQuery = normalizeTurkish(searchQuery);
  const isSearching = normalizedQuery.length > 0;

  const visibleSections = useMemo(() => {
    return sortedCategories
      .map((category, index) => {
        const categoryItems = publishedItems.filter(
          (item) => item.categoryId === category.id
        );

        const filteredItems = isSearching
          ? categoryItems.filter((item) => {
              const haystack = normalizeTurkish(
                `${item.name} ${item.displayName ?? ""} ${item.description} ${category.name} ${category.shortLabel ?? ""}`
              );
              return haystack.includes(normalizedQuery);
            })
          : categoryItems;

        return {
          category,
          orderLabel: String(index + 1).padStart(2, "0"),
          items: filteredItems,
        };
      })
      .filter((section) => section.items.length > 0);
  }, [sortedCategories, publishedItems, isSearching, normalizedQuery]);

  const totalMatches = useMemo(
    () => visibleSections.reduce((sum, sec) => sum + sec.items.length, 0),
    [visibleSections]
  );

  const totalStickyOffset = switcherHeight + stickyHeight;

  // Measure sticky switcher height if rendered
  useEffect(() => {
    if (!showThemeSwitcher) return;

    const node = switcherRef.current;
    if (!node) return;

    const updateHeight = () => {
      setSwitcherHeight(Math.ceil(node.getBoundingClientRect().height));
    };

    updateHeight();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateHeight);
      observer.observe(node);
      return () => observer.disconnect();
    }
  }, [showThemeSwitcher, activeTheme]);

  // Measure sticky category bar height whenever active theme or search panel changes
  useEffect(() => {
    const node = navRef.current;
    if (!node) return;

    const updateHeight = () => {
      setStickyHeight(Math.ceil(node.getBoundingClientRect().height));
    };

    updateHeight();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateHeight);
      observer.observe(node);
      return () => observer.disconnect();
    }
  }, [activeTheme, searchOpen, canliViewMode, vitrinViewMode]);

  // Preserve the visible category on screen after switching between themes
  useEffect(() => {
    const targetCategoryId = pendingThemeCategoryRef.current;
    if (!targetCategoryId) return;
    pendingThemeCategoryRef.current = null;

    if (isSearching) return;

    const firstCategoryId = sortedCategories[0]?.id;
    const rafId = window.requestAnimationFrame(() => {
      const currentSwitcherH = switcherRef.current
        ? Math.ceil(switcherRef.current.getBoundingClientRect().height)
        : switcherHeight;
      const currentNavH = navRef.current
        ? Math.ceil(navRef.current.getBoundingClientRect().height)
        : 0;
      const combinedOffset = currentSwitcherH + currentNavH;

      setSwitcherHeight(currentSwitcherH);
      setStickyHeight(currentNavH);

      if (
        activeTheme === "gece" ||
        activeTheme === "canli" ||
        activeTheme === "klasik" ||
        activeTheme === "vitrin"
      ) {
        // Single-category or two-step themes open from the top
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }

      if (activeTheme === "ferah") {
        if (
          !hasExplicitCategorySelection ||
          targetCategoryId === firstCategoryId
        ) {
          window.scrollTo({ top: 0, behavior: "instant" });
          return;
        }

        const el = document.getElementById(`ferah-section-${targetCategoryId}`);
        if (!el) return;

        const offsetTop =
          el.getBoundingClientRect().top +
          window.scrollY -
          (currentSwitcherH + 12);

        window.scrollTo({
          top: Math.max(0, offsetTop),
          behavior: "instant",
        });
        return;
      }

      if (targetCategoryId === firstCategoryId && window.scrollY < 40) {
        return;
      }

      const el = sectionRefs.current[targetCategoryId];
      if (!el) return;

      const offsetTop =
        el.getBoundingClientRect().top + window.scrollY - (combinedOffset + 14);

      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: "instant",
      });
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [
    activeTheme,
    isSearching,
    sortedCategories,
    switcherHeight,
    stickyHeight,
    hasExplicitCategorySelection,
  ]);

  // Scroll spy applies only to Özel Menü (continuous vertical flow)
  useEffect(() => {
    if (activeTheme !== "ozel" || visibleSections.length === 0) return;

    const handleScroll = () => {
      if (Date.now() < lockScrollSpyUntilRef.current) return;

      const anchorOffset = totalStickyOffset + 28;
      let currentId = visibleSections[0].category.id;

      for (const section of visibleSections) {
        const el = sectionRefs.current[section.category.id];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= anchorOffset) {
          currentId = section.category.id;
        }
      }

      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 24;
      if (nearBottom) {
        currentId = visibleSections[visibleSections.length - 1].category.id;
      }

      setActiveCategoryId((prev) => (prev === currentId ? prev : currentId));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleSections, totalStickyOffset, activeTheme]);

  const handleSelectCategory = useCallback(
    (categoryId: string) => {
      setActiveCategoryId(categoryId);
      setHasExplicitCategorySelection(true);

      if (activeTheme === "canli") {
        if (isSearching) {
          setSearchQuery("");
        }
        setCanliViewMode("items");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (activeTheme === "vitrin") {
        if (isSearching) {
          setSearchQuery("");
        }
        setVitrinViewMode("items");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (activeTheme === "gece" || activeTheme === "klasik") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      lockScrollSpyUntilRef.current = Date.now() + 1200;

      const el = sectionRefs.current[categoryId];
      if (!el) return;

      const offsetTop =
        el.getBoundingClientRect().top +
        window.scrollY -
        (totalStickyOffset + 14);

      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: "smooth",
      });
    },
    [activeTheme, isSearching, totalStickyOffset]
  );

  const handleBackToCanliCategories = useCallback(() => {
    setHasExplicitCategorySelection(false);
    setCanliViewMode("categories");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBackToVitrinCategories = useCallback(() => {
    setHasExplicitCategorySelection(false);
    setVitrinViewMode("categories");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleToggleFerahCategory = useCallback(
    (categoryId: string) => {
      const isCurrentlyOpen = ferahOpenCategoryIds.includes(categoryId);
      if (isCurrentlyOpen) {
        setFerahOpenCategoryIds((prev) => prev.filter((id) => id !== categoryId));
        return;
      }

      setFerahOpenCategoryIds((prev) =>
        prev.includes(categoryId) ? prev : [...prev, categoryId]
      );
      setActiveCategoryId(categoryId);
      setHasExplicitCategorySelection(true);
    },
    [ferahOpenCategoryIds]
  );

  const handleExpandAllFerah = useCallback(() => {
    setFerahOpenCategoryIds(sortedCategories.map((cat) => cat.id));
  }, [sortedCategories]);

  const handleCollapseAllFerah = useCallback(() => {
    setFerahOpenCategoryIds([]);
  }, []);

  const handleSelectTheme = useCallback(
    (nextTheme: MenuThemeId) => {
      if (nextTheme === activeTheme) return;
      lockScrollSpyUntilRef.current = Date.now() + 1000;
      pendingThemeCategoryRef.current = activeCategoryId;
      sectionRefs.current = {};
      if (nextTheme === "canli") {
        setCanliViewMode(
          hasExplicitCategorySelection ? "items" : "categories"
        );
      } else if (nextTheme === "vitrin") {
        setVitrinViewMode(
          hasExplicitCategorySelection ? "items" : "categories"
        );
      } else if (nextTheme === "ferah") {
        const defaultFerahId = sortedCategories[0]?.id;
        setFerahOpenCategoryIds(
          hasExplicitCategorySelection
            ? [activeCategoryId]
            : defaultFerahId
              ? [defaultFerahId]
              : []
        );
      }
      setActiveTheme(nextTheme);

      if (showThemeSwitcher && typeof window !== "undefined") {
        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.set("tasarim", nextTheme);
        window.history.replaceState(
          window.history.state,
          "",
          nextUrl.toString()
        );
      }
    },
    [
      activeTheme,
      activeCategoryId,
      hasExplicitCategorySelection,
      sortedCategories,
      showThemeSwitcher,
    ]
  );

  const handleToggleSearch = useCallback(() => {
    setSearchOpen((prev) => {
      if (prev) {
        setSearchQuery("");
      }
      return !prev;
    });
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const handleSelectItem = useCallback(
    (item: MenuItem, triggerEl: HTMLButtonElement) => {
      lastTriggerRef.current = triggerEl;
      setSelectedItem(item);
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
    window.requestAnimationFrame(() => {
      lastTriggerRef.current?.focus({ preventScroll: true });
    });
  }, []);

  const selectedCategoryName = useMemo(() => {
    if (!selectedItem) return "";
    return (
      sortedCategories.find((cat) => cat.id === selectedItem.categoryId)
        ?.name ?? ""
    );
  }, [selectedItem, sortedCategories]);

  return (
    <>
      {showThemeSwitcher && (
        <ThemeSwitcher
          activeTheme={activeTheme}
          onSelectTheme={handleSelectTheme}
          businessSlug={data.business.slug}
          switcherRef={switcherRef}
        />
      )}

      {activeTheme === "vitrin" ? (
        <VitrinMenuView
          business={data.business}
          categories={sortedCategories}
          allItems={publishedItems}
          visibleSections={visibleSections}
          activeCategoryId={activeCategoryId}
          viewMode={vitrinViewMode}
          onSelectCategory={handleSelectCategory}
          onBackToCategories={handleBackToVitrinCategories}
          searchOpen={searchOpen}
          onToggleSearch={handleToggleSearch}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={handleClearSearch}
          isSearching={isSearching}
          totalMatches={totalMatches}
          onSelectItem={handleSelectItem}
          navRef={navRef}
          stickyTopOffset={switcherHeight}
        />
      ) : activeTheme === "klasik" ? (
        <KlasikQrMenuView
          business={data.business}
          categories={sortedCategories}
          visibleSections={visibleSections}
          activeCategoryId={activeCategoryId}
          onSelectCategory={handleSelectCategory}
          searchOpen={searchOpen}
          onToggleSearch={handleToggleSearch}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={handleClearSearch}
          isSearching={isSearching}
          totalMatches={totalMatches}
          onSelectItem={handleSelectItem}
          navRef={navRef}
          stickyTopOffset={switcherHeight}
        />
      ) : activeTheme === "ferah" ? (
        <FerahMenuView
          business={data.business}
          allItemsCount={publishedItems.length}
          visibleSections={visibleSections}
          openCategoryIds={ferahOpenCategoryIds}
          onToggleCategory={handleToggleFerahCategory}
          onExpandAll={handleExpandAllFerah}
          onCollapseAll={handleCollapseAllFerah}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={handleClearSearch}
          isSearching={isSearching}
          totalMatches={totalMatches}
          onSelectItem={handleSelectItem}
        />
      ) : activeTheme === "canli" ? (
        <CanliMenuView
          business={data.business}
          categories={sortedCategories}
          allItems={publishedItems}
          visibleSections={visibleSections}
          activeCategoryId={activeCategoryId}
          viewMode={canliViewMode}
          onSelectCategory={handleSelectCategory}
          onBackToCategories={handleBackToCanliCategories}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={handleClearSearch}
          isSearching={isSearching}
          totalMatches={totalMatches}
          onSelectItem={handleSelectItem}
          navRef={navRef}
          stickyTopOffset={switcherHeight}
        />
      ) : activeTheme === "gece" ? (
        <NightMenuView
          business={data.business}
          categories={sortedCategories}
          visibleSections={visibleSections}
          activeCategoryId={activeCategoryId}
          onSelectCategory={handleSelectCategory}
          searchOpen={searchOpen}
          onToggleSearch={handleToggleSearch}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={handleClearSearch}
          isSearching={isSearching}
          totalMatches={totalMatches}
          onSelectItem={handleSelectItem}
          navRef={navRef}
          stickyTopOffset={switcherHeight}
        />
      ) : (
        <div className="min-h-screen bg-[#F6F4EE] text-[#171714]">
          <MenuHeader business={data.business} />

          <CategoryNav
            categories={sortedCategories}
            activeCategoryId={activeCategoryId}
            onSelectCategory={handleSelectCategory}
            searchOpen={searchOpen}
            onToggleSearch={handleToggleSearch}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearSearch={handleClearSearch}
            navRef={navRef}
            stickyTopOffset={switcherHeight}
          />

          <main className="mx-auto w-full max-w-[820px] px-4 pt-3 pb-16 md:px-8 md:pt-6">
            {isSearching && (
              <div className="mb-4 flex items-center justify-between border-b border-[#DCD8CC] pb-2.5 text-[13px] text-[#595950]">
                <span>
                  <strong className="font-semibold text-[#171714]">
                    “{searchQuery.trim()}”
                  </strong>{" "}
                  için {totalMatches} sonuç gösteriliyor
                </span>
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="font-medium text-[#2448D8] hover:underline"
                >
                  Temizle
                </button>
              </div>
            )}

            {visibleSections.length === 0 ? (
              <section
                aria-live="polite"
                className="my-6 border border-[#171714] px-5 py-8 text-left"
              >
                <p className="text-[11.5px] font-semibold tracking-[0.08em] uppercase text-[#595950]">
                  Arama Sonucu
                </p>
                <h2 className="mt-1.5 font-display text-[28px] leading-[1.08] font-bold text-[#171714]">
                  Aramanızla eşleşen ürün bulunamadı.
                </h2>
                <p className="mt-2 max-w-[46ch] text-[14px] leading-[1.55] text-[#595950]">
                  “{searchQuery.trim()}” için menüde bir ürün yer almıyor.
                  Farklı bir sözcük deneyebilir veya tüm menüye geri
                  dönebilirsiniz.
                </p>
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="mt-5 inline-flex items-center border border-[#171714] px-4 py-2 text-[13.5px] font-medium text-[#171714] transition-colors duration-150 hover:border-[#2448D8] hover:text-[#2448D8]"
                >
                  Tüm menüyü göster
                </button>
              </section>
            ) : (
              <div className="space-y-8 md:space-y-10">
                {visibleSections.map((section) => (
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
                    <div className="border-b border-[#171714] pt-1 pb-2">
                      <div className="flex items-baseline gap-2.5">
                        <span className="shrink-0 text-[12px] font-semibold tabular-nums tracking-[0.08em] text-[#2448D8]">
                          {section.orderLabel}
                        </span>
                        <h2
                          id={`heading-${section.category.id}`}
                          className="font-display text-[24px] leading-[1.06] font-bold tracking-[-0.005em] text-[#171714] md:text-[30px]"
                        >
                          {section.category.name}
                        </h2>
                      </div>
                    </div>

                    <div>
                      {section.items.map((item) => (
                        <MenuItemRow
                          key={item.id}
                          item={item}
                          onSelect={handleSelectItem}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </main>

          <footer className="mx-auto w-full max-w-[820px] px-4 pb-10 md:px-8">
            <div className="border-t border-[#171714] pt-4 text-[12.5px] text-[#595950]">
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  {data.business.name} · {data.business.address} ·{" "}
                  <a
                    href={data.business.phoneHref}
                    className="text-[#171714] underline decoration-[#DCD8CC] underline-offset-2 hover:text-[#2448D8]"
                  >
                    {data.business.phone}
                  </a>
                </span>
                <span>Fiyatlara KDV dahildir.</span>
              </div>
            </div>
          </footer>
        </div>
      )}

      <ItemDetailModal
        item={selectedItem}
        categoryName={selectedCategoryName}
        onClose={handleCloseModal}
        theme={activeTheme}
      />
    </>
  );
}
