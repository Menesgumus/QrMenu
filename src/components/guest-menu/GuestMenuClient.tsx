"use client";

import dynamic from "next/dynamic";
import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { PROTOTYPE_MENU } from "@/data/prototype-menu";
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
import type { CanliViewMode } from "./CanliMenuView";
import type { KlasikViewMode } from "./KlasikQrMenuView";
import { CustomerUtilityBar } from "./VisitorControls";
import type { VitrinViewMode } from "./VitrinMenuView";

const OzelMenuView = dynamic(() =>
  import("./OzelMenuView").then((m) => m.OzelMenuView)
);
const NightMenuView = dynamic(() =>
  import("./NightMenuView").then((m) => m.NightMenuView)
);
const CanliMenuView = dynamic(() =>
  import("./CanliMenuView").then((m) => m.CanliMenuView)
);
const FerahMenuView = dynamic(() =>
  import("./FerahMenuView").then((m) => m.FerahMenuView)
);
const KlasikQrMenuView = dynamic(() =>
  import("./KlasikQrMenuView").then((m) => m.KlasikQrMenuView)
);
const VitrinMenuView = dynamic(() =>
  import("./VitrinMenuView").then((m) => m.VitrinMenuView)
);
const ThemeSwitcher = dynamic(() =>
  import("./ThemeSwitcher").then((m) => m.ThemeSwitcher)
);
const ItemDetailModal = dynamic(
  () => import("./ItemDetailModal").then((m) => m.ItemDetailModal),
  { ssr: false }
);

function ModalShell({
  title,
  message,
  actionLabel,
  onAction,
  onClose,
  language,
  busy = false,
}: {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onClose: () => void;
  language: MenuLanguage;
  busy?: boolean;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dict = getUiDictionary(language);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-busy={busy}
      aria-label={title}
      lang={language}
      style={{ backgroundColor: "var(--menu-backdrop)" }}
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full rounded-t-[14px] border border-[var(--menu-border-strong)] bg-[var(--menu-surface)] p-5 text-[var(--menu-text)] shadow-xl sm:max-w-[440px] sm:rounded-[14px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="text-[14px] font-medium text-[var(--menu-text)]">
            {message}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-[8px] border border-[var(--menu-border-strong)] px-3 py-1.5 text-[13px] font-medium text-[var(--menu-text)] hover:border-[var(--menu-accent)] hover:text-[var(--menu-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)]"
          >
            {dict.nav.close}
          </button>
        </div>
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="mt-4 inline-flex items-center rounded-[8px] bg-[var(--menu-accent)] px-3.5 py-1.5 text-[13px] font-semibold text-[var(--menu-accent-contrast)] hover:bg-[var(--menu-accent-hover)]"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>,
    document.body
  );
}

interface ModalErrorBoundaryProps {
  children: ReactNode;
  language: MenuLanguage;
  onClose: () => void;
  onRetry: () => void;
}

class ItemDetailErrorBoundary extends Component<
  ModalErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: ModalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      const dict = getUiDictionary(this.props.language);
      return (
        <ModalShell
          title={dict.modal.loadError}
          message={dict.modal.loadError}
          actionLabel={dict.modal.retry}
          onAction={() => {
            this.setState({ hasError: false });
            this.props.onRetry();
          }}
          onClose={this.props.onClose}
          language={this.props.language}
        />
      );
    }
    return this.props.children;
  }
}

interface GuestMenuClientProps {
  data?: GuestMenuData;
  initialTheme?: MenuThemeId;
  explicitUrlLanguage?: MenuLanguage;
  explicitUrlColorMode?: ColorMode;
  showThemeSwitcher?: boolean;
}

export function GuestMenuClient({
  data = PROTOTYPE_MENU,
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
  const [ferahScrollRequest, setFerahScrollRequest] = useState<{
    categoryId: string;
    nonce: number;
  } | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalRetryKey, setModalRetryKey] = useState(0);
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

  // Sync HTML attributes symmetrically before paint without redundant root style invalidations
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute("data-menu-theme") !== activeTheme) {
      root.setAttribute("data-menu-theme", activeTheme);
    }
    if (root.getAttribute("data-color-mode") !== effectiveColorMode) {
      root.setAttribute("data-color-mode", effectiveColorMode);
    }
    if (root.getAttribute("lang") !== effectiveLanguage) {
      root.setAttribute("lang", effectiveLanguage);
    }
    if (root.style.colorScheme !== effectiveColorMode) {
      root.style.colorScheme = effectiveColorMode;
    }
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
    if (!node) {
      setStickyHeight(0);
      return;
    }

    const updateHeight = () => {
      const rect = node.getBoundingClientRect();
      setStickyHeight(rect.height > 0 ? Math.ceil(rect.height) : 0);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateHeight);
      observer.observe(node);
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
      observer?.disconnect();
    };
  }, [activeTheme, searchOpen, canliViewMode, klasikViewMode, vitrinViewMode]);

  // Ferah desktop sidebar: scroll AFTER newly opened accordion is committed to the DOM
  useEffect(() => {
    if (!ferahScrollRequest || activeTheme !== "ferah") return;

    let raf1 = 0;
    let raf2 = 0;

    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        const el = document.getElementById(
          `ferah-section-${ferahScrollRequest.categoryId}`
        );
        if (!el) return;

        const currentSwitcherH = switcherRef.current
          ? Math.ceil(switcherRef.current.getBoundingClientRect().height)
          : switcherHeight;

        const offsetTop =
          el.getBoundingClientRect().top +
          window.scrollY -
          (currentSwitcherH + 16);

        window.scrollTo({
          top: Math.max(0, offsetTop),
          behavior: "smooth",
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
    };
  }, [ferahScrollRequest, activeTheme, switcherHeight]);

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

  const handleJumpToFerahCategory = useCallback(
    (categoryId: string) => {
      setActiveCategoryId(categoryId);
      setHasExplicitCategorySelection(true);

      if (!isSearching) {
        setFerahOpenCategoryIds((prev) =>
          prev.includes(categoryId) ? prev : [...prev, categoryId]
        );
      }

      setFerahScrollRequest((prev) => ({
        categoryId,
        nonce: (prev?.nonce ?? 0) + 1,
      }));
    },
    [isSearching]
  );

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

  const handleRetryModal = useCallback(() => {
    setModalRetryKey((prev) => prev + 1);
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
          activeCategoryId={activeCategoryId}
          openCategoryIds={ferahOpenCategoryIds}
          onToggleCategory={handleToggleFerahCategory}
          onJumpToCategory={handleJumpToFerahCategory}
          onExpandAll={handleExpandAllFerah}
          onCollapseAll={handleCollapseAllFerah}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={handleClearSearch}
          isSearching={isSearching}
          totalMatches={totalMatches}
          onSelectItem={handleSelectItem}
          language={effectiveLanguage}
          stickyTopOffset={switcherHeight}
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
        <OzelMenuView
          business={data.business}
          description={localizedBusinessDesc}
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
          trimmedQuery={trimmedQuery}
          totalMatches={totalMatches}
          onSelectItem={handleSelectItem}
          language={effectiveLanguage}
          navRef={navRef}
          sectionRefs={sectionRefs}
          stickyTopOffset={switcherHeight}
          totalStickyOffset={totalStickyOffset}
        />
      )}

      {selectedItem && (
        <ItemDetailErrorBoundary
          key={`${selectedItem.id}-${modalRetryKey}`}
          language={effectiveLanguage}
          onClose={handleCloseModal}
          onRetry={handleRetryModal}
        >
          <Suspense
            fallback={
              <ModalShell
                title={dict.modal.loadingDetails}
                message={dict.modal.loadingDetails}
                onClose={handleCloseModal}
                language={effectiveLanguage}
                busy
              />
            }
          >
            <ItemDetailModal
              item={selectedItem}
              categoryName={selectedCategoryName}
              onClose={handleCloseModal}
              theme={activeTheme}
              language={effectiveLanguage}
            />
          </Suspense>
        </ItemDetailErrorBoundary>
      )}
    </div>
  );
}
