"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { matchesBilingualSearch, normalizeTurkish } from "@/lib/format";
import {
  getBusinessDescription,
  getCategoryText,
  getUiDictionary,
} from "@/lib/i18n";
import {
  getStoredColorModePreference,
  getStoredLanguagePreference,
  resolveEffectiveColorMode,
  resolveEffectiveLanguage,
  saveColorModePreference,
  saveLanguagePreference,
  subscribeVisitorPreferences,
} from "@/lib/visitor-preferences";
import type {
  ColorMode,
  GuestMenuData,
  MenuItem,
  MenuLanguage,
  MenuThemeId,
} from "@/types/menu";
import { CanliMenuView, type CanliViewMode } from "./CanliMenuView";
import { CategoryNav } from "./CategoryNav";
import { FerahMenuView } from "./FerahMenuView";
import { ItemDetailModal } from "./ItemDetailModal";
import { KlasikQrMenuView, type KlasikViewMode } from "./KlasikQrMenuView";
import { MenuHeader } from "./MenuHeader";
import { MenuItemRow } from "./MenuItemRow";
import { NightMenuView } from "./NightMenuView";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { CustomerUtilityBar } from "./VisitorControls";
import { VitrinMenuView, type VitrinViewMode } from "./VitrinMenuView";

interface GuestMenuClientProps {
  data: GuestMenuData;
  initialTheme?: MenuThemeId;
  explicitUrlLanguage?: MenuLanguage;
  explicitUrlColorMode?: ColorMode;
  showThemeSwitcher?: boolean;
}

export function GuestMenuClient({
  data,
  initialTheme,
  explicitUrlLanguage,
  explicitUrlColorMode,
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
  const [urlColorModeOverride, setUrlColorModeOverride] = useState<
    ColorMode | undefined
  >(explicitUrlColorMode);
  const [urlLanguageOverride, setUrlLanguageOverride] = useState<
    MenuLanguage | undefined
  >(explicitUrlLanguage);

  const storedColorMode = useSyncExternalStore(
    subscribeVisitorPreferences,
    getStoredColorModePreference,
    () => null
  );
  const storedLanguage = useSyncExternalStore(
    subscribeVisitorPreferences,
    getStoredLanguagePreference,
    () => null
  );

  const effectiveColorMode = useMemo(
    () =>
      resolveEffectiveColorMode(
        activeTheme,
        urlColorModeOverride,
        storedColorMode
      ),
    [activeTheme, urlColorModeOverride, storedColorMode]
  );

  const effectiveLanguage = useMemo(
    () => resolveEffectiveLanguage(urlLanguageOverride, storedLanguage),
    [urlLanguageOverride, storedLanguage]
  );

  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    sortedCategories[0]?.id ?? ""
  );
  const [hasExplicitCategorySelection, setHasExplicitCategorySelection] =
    useState(false);
  const [canliViewMode, setCanliViewMode] =
    useState<CanliViewMode>("categories");
  const [klasikViewMode, setKlasikViewMode] =
    useState<KlasikViewMode>("categories");
  const [vitrinViewMode, setVitrinViewMode] =
    useState<VitrinViewMode>("categories");
  const [ferahOpenCategoryIds, setFerahOpenCategoryIds] = useState<string[]>(
    () => (sortedCategories[0] ? [sortedCategories[0].id] : [])
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [switcherHeight, setSwitcherHeight] = useState(
    showThemeSwitcher ? 49 : 0
  );
  const [stickyHeight, setStickyHeight] = useState(48);

  const switcherRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const lockScrollSpyUntilRef = useRef<number>(0);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const pendingThemeCategoryRef = useRef<string | null>(null);

  const isSearching = normalizeTurkish(searchQuery).length > 0;
  const dict = getUiDictionary(effectiveLanguage);

  // Sync HTML attributes symmetrically before paint on client updates and dev StrictMode remounts
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-menu-theme", activeTheme);
    root.setAttribute("data-color-mode", effectiveColorMode);
    root.setAttribute("lang", effectiveLanguage);
    root.style.colorScheme = effectiveColorMode;
  }, [activeTheme, effectiveColorMode, effectiveLanguage]);

  const visibleSections = useMemo(() => {
    return sortedCategories
      .map((category, index) => {
        const categoryItems = publishedItems.filter(
          (item) => item.categoryId === category.id
        );

        const filteredItems = isSearching
          ? categoryItems.filter((item) =>
              matchesBilingualSearch(
                [
                  item.name,
                  item.displayName,
                  item.description,
                  item.translations?.en?.name,
                  item.translations?.en?.displayName,
                  item.translations?.en?.description,
                  category.name,
                  category.shortLabel,
                  category.translations?.en?.name,
                  category.translations?.en?.shortLabel,
                ],
                searchQuery
              )
            )
          : categoryItems;

        return {
          category,
          orderLabel: String(index + 1).padStart(2, "0"),
          items: filteredItems,
        };
      })
      .filter((section) => section.items.length > 0);
  }, [sortedCategories, publishedItems, isSearching, searchQuery]);

  const totalMatches = useMemo(
    () => visibleSections.reduce((sum, sec) => sum + sec.items.length, 0),
    [visibleSections]
  );

  const totalStickyOffset = switcherHeight + stickyHeight;

  // Measure sticky presentation bar height if rendered
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
  }, [showThemeSwitcher, activeTheme, effectiveLanguage, effectiveColorMode]);

  // Measure sticky category bar height whenever active theme, search panel, or mode changes
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
  }, [activeTheme, searchOpen, canliViewMode, klasikViewMode, vitrinViewMode]);

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

      if (activeTheme === "klasik") {
        if (isSearching) {
          setSearchQuery("");
        }
        setKlasikViewMode("items");
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

      if (activeTheme === "gece") {
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

  const handleBackToKlasikCategories = useCallback(() => {
    setHasExplicitCategorySelection(false);
    setKlasikViewMode("categories");
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
        setFerahOpenCategoryIds((prev) =>
          prev.filter((id) => id !== categoryId)
        );
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
        setCanliViewMode(hasExplicitCategorySelection ? "items" : "categories");
      } else if (nextTheme === "klasik") {
        setKlasikViewMode(
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

  const handleToggleColorMode = useCallback(() => {
    const nextMode: ColorMode =
      effectiveColorMode === "dark" ? "light" : "dark";
    setUrlColorModeOverride(undefined);
    saveColorModePreference(nextMode);

    if (typeof window !== "undefined") {
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set("mod", nextMode);
      window.history.replaceState(
        window.history.state,
        "",
        nextUrl.toString()
      );
    }
  }, [effectiveColorMode]);

  const handleSelectLanguage = useCallback(
    (nextLanguage: MenuLanguage) => {
      if (nextLanguage === effectiveLanguage) return;
      setUrlLanguageOverride(undefined);
      saveLanguagePreference(nextLanguage);

      if (typeof window !== "undefined") {
        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.set("dil", nextLanguage);
        window.history.replaceState(
          window.history.state,
          "",
          nextUrl.toString()
        );
      }
    },
    [effectiveLanguage]
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
    const cat = sortedCategories.find((c) => c.id === selectedItem.categoryId);
    if (!cat) return "";
    return getCategoryText(cat, effectiveLanguage).name;
  }, [selectedItem, sortedCategories, effectiveLanguage]);

  const trimmedQuery = searchQuery.trim();
  const localizedBusinessDesc = getBusinessDescription(
    data.business,
    effectiveLanguage
  );

  return (
    <div lang={effectiveLanguage}>
      {showThemeSwitcher ? (
        <ThemeSwitcher
          activeTheme={activeTheme}
          onSelectTheme={handleSelectTheme}
          colorMode={effectiveColorMode}
          onToggleColorMode={handleToggleColorMode}
          language={effectiveLanguage}
          onSelectLanguage={handleSelectLanguage}
          businessSlug={data.business.slug}
          switcherRef={switcherRef}
        />
      ) : (
        <CustomerUtilityBar
          theme={activeTheme}
          colorMode={effectiveColorMode}
          language={effectiveLanguage}
          onToggleColorMode={handleToggleColorMode}
          onSelectLanguage={handleSelectLanguage}
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
          language={effectiveLanguage}
          navRef={navRef}
          stickyTopOffset={switcherHeight}
        />
      ) : activeTheme === "klasik" ? (
        <KlasikQrMenuView
          business={data.business}
          categories={sortedCategories}
          allItems={publishedItems}
          visibleSections={visibleSections}
          activeCategoryId={activeCategoryId}
          viewMode={klasikViewMode}
          onSelectCategory={handleSelectCategory}
          onBackToCategories={handleBackToKlasikCategories}
          searchOpen={searchOpen}
          onToggleSearch={handleToggleSearch}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={handleClearSearch}
          isSearching={isSearching}
          totalMatches={totalMatches}
          onSelectItem={handleSelectItem}
          language={effectiveLanguage}
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
          language={effectiveLanguage}
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
          language={effectiveLanguage}
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
          language={effectiveLanguage}
          navRef={navRef}
          stickyTopOffset={switcherHeight}
        />
      ) : (
        <div className="min-h-screen bg-[var(--menu-bg)] text-[var(--menu-text)]">
          <MenuHeader
            business={data.business}
            description={localizedBusinessDesc}
            language={effectiveLanguage}
          />

          <CategoryNav
            categories={sortedCategories}
            activeCategoryId={activeCategoryId}
            onSelectCategory={handleSelectCategory}
            searchOpen={searchOpen}
            onToggleSearch={handleToggleSearch}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearSearch={handleClearSearch}
            language={effectiveLanguage}
            navRef={navRef}
            stickyTopOffset={switcherHeight}
          />

          <main className="mx-auto w-full max-w-[820px] px-4 pt-3 pb-16 md:px-8 md:pt-6">
            {isSearching && (
              <div className="mb-4 flex items-center justify-between border-b border-[var(--menu-border)] pb-2.5 text-[13px] text-[var(--menu-text-secondary)]">
                <span>{dict.search.resultsForQuery(trimmedQuery, totalMatches)}</span>
                <button
                  type="button"
                  onClick={handleClearSearch}
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
                  onClick={handleClearSearch}
                  className="mt-5 inline-flex items-center border border-[var(--menu-border-strong)] px-4 py-2 text-[13.5px] font-medium text-[var(--menu-text)] transition-colors duration-150 hover:border-[var(--menu-accent)] hover:text-[var(--menu-accent)]"
                >
                  {dict.nav.showAllMenu}
                </button>
              </section>
            ) : (
              <div className="space-y-8 md:space-y-10">
                {visibleSections.map((section, sectionIndex) => {
                  const catText = getCategoryText(
                    section.category,
                    effectiveLanguage
                  );

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
                        {section.items.map((item, itemIndex) => (
                          <MenuItemRow
                            key={item.id}
                            item={item}
                            onSelect={handleSelectItem}
                            language={effectiveLanguage}
                            eager={sectionIndex === 0 && itemIndex < 4}
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
                  {data.business.name} · {data.business.address} ·{" "}
                  <a
                    href={data.business.phoneHref}
                    className="text-[var(--menu-text)] underline decoration-[var(--menu-border)] underline-offset-2 hover:text-[var(--menu-accent)]"
                  >
                    {data.business.phone}
                  </a>
                </span>
                <span>{dict.meta.vatIncluded}</span>
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
        language={effectiveLanguage}
      />
    </div>
  );
}
