"use client";

import { useEffect, useRef, useState } from "react";
import { getUiDictionary, VALID_THEME_LIST } from "./theme-options";
import type { ColorMode, MenuLanguage, MenuThemeId } from "@/types/menu";
import { ShareMenu } from "./ShareMenu";
import { VisitorControls } from "./VisitorControls";

interface ThemeSwitcherProps {
  activeTheme: MenuThemeId;
  onSelectTheme: (theme: MenuThemeId) => void;
  colorMode: ColorMode;
  onToggleColorMode: () => void;
  language: MenuLanguage;
  onSelectLanguage: (language: MenuLanguage) => void;
  businessSlug: string;
  switcherRef?: React.RefObject<HTMLDivElement | null>;
}

function ThemeMiniPreview({ id }: { id: MenuThemeId }) {
  if (id === "ozel") {
    return (
      <svg
        viewBox="0 0 56 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-[42px] w-[56px] shrink-0 border border-[#DCD8CC] bg-[#F6F4EE]"
      >
        <rect x="5" y="5" width="24" height="3.5" fill="#171714" />
        <line x1="5" y1="11.5" x2="51" y2="11.5" stroke="#171714" strokeWidth="1" />
        <rect x="5" y="15" width="28" height="2.2" fill="#171714" />
        <rect x="5" y="19" width="22" height="1.6" fill="#595950" />
        <rect x="5" y="23" width="10" height="2" fill="#2448D8" />
        <rect x="40" y="14.5" width="11" height="11" fill="#DDD7C8" stroke="#C8C2B2" strokeWidth="0.7" />
        <line x1="5" y1="28.5" x2="51" y2="28.5" stroke="#DCD8CC" strokeWidth="0.8" />
        <rect x="5" y="31.5" width="24" height="2.2" fill="#171714" />
        <rect x="5" y="35.5" width="18" height="1.6" fill="#595950" />
        <rect x="40" y="31" width="11" height="8" fill="#DDD7C8" stroke="#C8C2B2" strokeWidth="0.7" />
      </svg>
    );
  }

  if (id === "canli") {
    return (
      <svg
        viewBox="0 0 56 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-[42px] w-[56px] shrink-0 rounded-[5px] border border-[#24201B] bg-[#FFF9ED]"
      >
        <rect x="0" y="0" width="56" height="10" fill="#F4CE45" />
        <line x1="0" y1="10" x2="56" y2="10" stroke="#24201B" strokeWidth="1" />
        <rect x="5" y="3.5" width="22" height="3" fill="#24201B" />
        <rect x="38" y="3" width="13" height="4" rx="2" fill="#AD3028" />
        <rect x="5" y="13.5" width="21" height="24" rx="2.5" fill="#FFFFFF" stroke="#24201B" strokeWidth="0.9" />
        <rect x="6" y="14.5" width="19" height="12" rx="1.5" fill="#F4CE45" />
        <rect x="7" y="29" width="12" height="2.2" fill="#24201B" />
        <rect x="7" y="33" width="8" height="2" rx="1" fill="#AD3028" />
        <rect x="30" y="13.5" width="21" height="24" rx="2.5" fill="#FFFFFF" stroke="#24201B" strokeWidth="0.9" />
        <rect x="31" y="14.5" width="19" height="12" rx="1.5" fill="#E8D8B0" />
        <rect x="32" y="29" width="13" height="2.2" fill="#24201B" />
        <rect x="32" y="33" width="8" height="2" rx="1" fill="#AD3028" />
      </svg>
    );
  }

  if (id === "ferah") {
    return (
      <svg
        viewBox="0 0 56 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-[42px] w-[56px] shrink-0 rounded-[5px] border border-[#BFDBFE] bg-[#FFFFFF]"
      >
        <rect x="0" y="0" width="56" height="9" fill="#EFF6FF" />
        <line x1="0" y1="9" x2="56" y2="9" stroke="#DBEAFE" strokeWidth="1" />
        <rect x="5" y="3.2" width="20" height="2.6" rx="1" fill="#182747" />
        <rect x="5" y="12" width="46" height="16" rx="2" fill="#FFFFFF" stroke="#BFDBFE" strokeWidth="0.9" />
        <rect x="5" y="12" width="46" height="5.5" rx="1.5" fill="#EFF6FF" />
        <rect x="8" y="14" width="16" height="1.8" rx="0.8" fill="#182747" />
        <rect x="44" y="13.8" width="4" height="2" rx="0.8" fill="#2454D6" />
        <rect x="8" y="20" width="6" height="6" rx="1.2" fill="#DBEAFE" />
        <rect x="16" y="20.5" width="17" height="1.8" fill="#182747" />
        <rect x="16" y="24" width="9" height="1.6" fill="#2454D6" />
        <rect x="5" y="30.5" width="46" height="4.5" rx="1.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
        <rect x="5" y="36.5" width="46" height="4" rx="1.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
      </svg>
    );
  }

  if (id === "klasik") {
    return (
      <svg
        viewBox="0 0 56 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-[42px] w-[56px] shrink-0 rounded-[5px] border border-[#DCE0E5] bg-[#F7F7F8]"
      >
        <rect x="4" y="4" width="22.5" height="16" rx="2" fill="#FFFFFF" stroke="#DCE0E5" strokeWidth="0.8" />
        <rect x="5" y="5" width="20.5" height="9.5" rx="1.2" fill="#D5B895" />
        <rect x="6.5" y="16" width="11" height="1.8" rx="0.6" fill="#1A1D21" />
        <rect x="29.5" y="4" width="22.5" height="16" rx="2" fill="#FFFFFF" stroke="#DCE0E5" strokeWidth="0.8" />
        <rect x="30.5" y="5" width="20.5" height="9.5" rx="1.2" fill="#C9A882" />
        <rect x="32" y="16" width="12" height="1.8" rx="0.6" fill="#1A1D21" />
        <rect x="4" y="22.5" width="48" height="15.5" rx="2" fill="#FFFFFF" stroke="#EAECEF" strokeWidth="0.8" />
        <rect x="6" y="24.5" width="6" height="6" rx="1.2" fill="#D5D8DD" />
        <rect x="14.5" y="25.5" width="18" height="2" fill="#1A1D21" />
        <rect x="14.5" y="28.5" width="13" height="1.4" fill="#636A73" />
        <rect x="42" y="26.5" width="7.5" height="2" fill="#1A1D21" />
      </svg>
    );
  }

  if (id === "vitrin") {
    return (
      <svg
        viewBox="0 0 56 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-[42px] w-[56px] shrink-0 rounded-[5px] border border-[#E4E1DA] bg-[#FAF9F7]"
      >
        <rect x="4" y="4" width="22.5" height="16" rx="2.5" fill="#C9A882" />
        <rect x="4" y="14" width="22.5" height="6" rx="2" fill="#191817" fillOpacity="0.6" />
        <rect x="6.5" y="16" width="12" height="2" rx="0.8" fill="#FFFFFF" />
        <rect x="29.5" y="4" width="22.5" height="16" rx="2.5" fill="#D8B98E" />
        <rect x="29.5" y="14" width="22.5" height="6" rx="2" fill="#191817" fillOpacity="0.6" />
        <rect x="32" y="16" width="11" height="2" rx="0.8" fill="#FFFFFF" />
        <rect x="4" y="22.5" width="22.5" height="15.5" rx="2.5" fill="#8C6B4F" />
        <rect x="4" y="32" width="22.5" height="6" rx="2" fill="#191817" fillOpacity="0.6" />
        <rect x="6.5" y="34" width="10" height="2" rx="0.8" fill="#FFFFFF" />
        <rect x="29.5" y="22.5" width="22.5" height="15.5" rx="2.5" fill="#B6495B" />
        <rect x="29.5" y="32" width="22.5" height="6" rx="2" fill="#191817" fillOpacity="0.6" />
        <rect x="32" y="34" width="11" height="2" rx="0.8" fill="#FFFFFF" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 56 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-[42px] w-[56px] shrink-0 rounded-[4px] border border-[#343835] bg-[#171918]"
    >
      <rect x="5" y="4.5" width="15" height="3.5" rx="1.75" fill="#F28B50" />
      <rect x="22" y="4.5" width="13" height="3.5" rx="1.75" fill="#242725" />
      <rect x="37" y="4.5" width="13" height="3.5" rx="1.75" fill="#242725" />
      <rect x="5" y="11" width="21" height="26.5" rx="2" fill="#242725" stroke="#343835" strokeWidth="0.8" />
      <rect x="6.5" y="12.5" width="18" height="14" rx="1" fill="#3B3F3C" />
      <rect x="7" y="29" width="14" height="2.2" fill="#F5F1E8" />
      <rect x="7" y="33" width="8" height="2" fill="#F28B50" />
      <rect x="30" y="11" width="21" height="26.5" rx="2" fill="#242725" stroke="#343835" strokeWidth="0.8" />
      <rect x="31.5" y="12.5" width="18" height="14" rx="1" fill="#3B3F3C" />
      <rect x="32" y="29" width="15" height="2.2" fill="#F5F1E8" />
      <rect x="32" y="33" width="8" height="2" fill="#F28B50" />
    </svg>
  );
}

function getSwitcherChromeClasses(theme: MenuThemeId) {
  if (theme === "ozel") {
    return {
      fontClass: "font-sans",
      trigger:
        "border-[var(--menu-border-strong)] bg-[var(--menu-bg)] text-[var(--menu-text)] hover:border-[var(--menu-accent)] hover:text-[var(--menu-accent)]",
      menu: "border-[var(--menu-border-strong)] bg-[var(--menu-surface)] text-[var(--menu-text)] shadow-sm",
      itemBase: "",
      itemSelected: "border-[var(--menu-accent)] bg-[var(--menu-accent-soft)]",
      itemUnselected:
        "border-[var(--menu-border)] bg-[var(--menu-surface)] hover:border-[var(--menu-border-strong)] hover:bg-[var(--menu-surface-hover)]",
    };
  }
  if (theme === "canli") {
    return {
      fontClass: "font-visual",
      trigger:
        "rounded-[8px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-bg)] font-semibold text-[var(--menu-text)] hover:border-[var(--menu-accent)] hover:text-[var(--menu-accent)]",
      menu: "rounded-[12px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-bg)] text-[var(--menu-text)] shadow-[3px_3px_0_var(--menu-shadow-ink)]",
      itemBase: "rounded-[9px]",
      itemSelected:
        "border-[var(--menu-accent)] bg-[var(--menu-accent-soft)]",
      itemUnselected:
        "border-[var(--menu-border)] bg-[var(--menu-surface)] hover:border-[var(--menu-border-strong)]",
    };
  }
  if (theme === "vitrin") {
    return {
      fontClass: "font-vitrin",
      trigger:
        "rounded-full border-[var(--menu-border-strong)] bg-[var(--menu-surface)] font-medium text-[var(--menu-text)] hover:border-[var(--menu-text)]",
      menu: "rounded-[14px] border-[var(--menu-border-strong)] bg-[var(--menu-surface)] text-[var(--menu-text)] shadow-lg",
      itemBase: "rounded-[10px]",
      itemSelected:
        "border-[var(--menu-accent)] bg-[var(--menu-accent-soft)]",
      itemUnselected:
        "border-[var(--menu-border)] bg-[var(--menu-surface)] hover:border-[var(--menu-border-strong)]",
    };
  }
  const fontMap: Record<MenuThemeId, string> = {
    ozel: "font-sans",
    gece: "font-night-sans",
    canli: "font-visual",
    ferah: "font-ferah",
    klasik: "font-klasik",
    vitrin: "font-vitrin",
  };
  return {
    fontClass: fontMap[theme],
    trigger:
      "rounded-[8px] border-[var(--menu-border-strong)] bg-[var(--menu-surface)] font-semibold text-[var(--menu-text)] hover:border-[var(--menu-accent)] hover:text-[var(--menu-accent)]",
    menu: "rounded-[12px] border-[var(--menu-border-strong)] bg-[var(--menu-surface)] text-[var(--menu-text)] shadow-md",
    itemBase: "rounded-[8px]",
    itemSelected: "border-[var(--menu-accent)] bg-[var(--menu-accent-soft)]",
    itemUnselected:
      "border-[var(--menu-border)] bg-[var(--menu-surface)] hover:border-[var(--menu-border-strong)] hover:bg-[var(--menu-surface-hover)]",
  };
}

export function ThemeSwitcher({
  activeTheme,
  onSelectTheme,
  colorMode,
  onToggleColorMode,
  language,
  onSelectLanguage,
  businessSlug,
  switcherRef,
}: ThemeSwitcherProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const dict = getUiDictionary(language);
  const currentMeta = dict.themes[activeTheme] ?? dict.themes.ozel;
  const chrome = getSwitcherChromeClasses(activeTheme);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={switcherRef}
      style={{ backgroundColor: "var(--menu-switcher-bg)" }}
      className={`sticky top-0 z-40 border-b border-[var(--menu-switcher-border)] backdrop-blur-sm ${chrome.fontClass}`}
    >
      <div className="mx-auto flex w-full max-w-[1220px] items-center justify-between gap-2 px-3 py-1.5 sm:px-4 md:px-8">
        <div ref={containerRef} className="relative min-w-0">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-haspopup="menu"
            aria-label={dict.controls.themeSelectorLabel}
            className={`inline-flex h-9 max-w-[148px] items-center gap-1.5 border px-2.5 text-[12px] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] sm:max-w-none sm:gap-2 ${chrome.trigger}`}
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0"
            >
              <rect x="1.5" y="1.5" width="5" height="5" stroke="currentColor" strokeWidth="1.25" />
              <rect x="9.5" y="1.5" width="5" height="5" stroke="currentColor" strokeWidth="1.25" />
              <rect x="1.5" y="9.5" width="5" height="5" stroke="currentColor" strokeWidth="1.25" />
              <rect x="9.5" y="9.5" width="5" height="5" stroke="currentColor" strokeWidth="1.25" />
            </svg>
            <span className="hidden sm:inline">{dict.controls.themePrefix}</span>
            <span className="hidden opacity-45 sm:inline">·</span>
            <span className="truncate font-semibold">{currentMeta.title}</span>
            <svg
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className={`h-3 w-3 shrink-0 transition-transform duration-150 ${
                open ? "rotate-180" : ""
              }`}
            >
              <path
                d="M2.5 4.5L6 8L9.5 4.5"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="square"
              />
            </svg>
          </button>

          {open && (
            <div
              role="menu"
              aria-label={dict.controls.chooseMenuDesign}
              className={`absolute top-full left-0 z-50 mt-1.5 max-h-[calc(100dvh-56px)] w-[min(304px,calc(100vw-24px))] overflow-y-auto overscroll-contain border p-2 ${chrome.menu}`}
            >
              <p className="px-2 pt-1 pb-1.5 text-[10.5px] font-semibold tracking-[0.08em] uppercase text-[var(--menu-text-secondary)]">
                {dict.controls.chooseMenuDesign}
              </p>

              <div className="space-y-1.5">
                {VALID_THEME_LIST.map((themeId) => {
                  const option = dict.themes[themeId];
                  const isSelected = themeId === activeTheme;
                  return (
                    <button
                      key={themeId}
                      type="button"
                      role="menuitemradio"
                      aria-checked={isSelected}
                      onClick={() => {
                        setOpen(false);
                        onSelectTheme(themeId);
                      }}
                      className={`flex w-full items-center gap-3 border p-2 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--menu-focus)] ${chrome.itemBase} ${
                        isSelected ? chrome.itemSelected : chrome.itemUnselected
                      }`}
                    >
                      <ThemeMiniPreview id={themeId} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[13px] font-semibold text-[var(--menu-text)]">
                            {option.title}
                          </span>
                          {isSelected && (
                            <span className="text-[10.5px] font-semibold text-[var(--menu-accent)]">
                              {dict.controls.selectedBadge}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-[11.5px] leading-[1.3] text-[var(--menu-text-secondary)]">
                          {option.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          <span className="hidden text-[11px] font-medium tracking-[0.04em] text-[var(--menu-text-secondary)] lg:inline">
            {dict.controls.presentationPreview}
          </span>
          <VisitorControls
            theme={activeTheme}
            colorMode={colorMode}
            language={language}
            onToggleColorMode={onToggleColorMode}
            onSelectLanguage={onSelectLanguage}
          />
          <ShareMenu
            activeTheme={activeTheme}
            activeThemeTitle={currentMeta.title}
            language={language}
            colorMode={colorMode}
            businessSlug={businessSlug}
          />
        </div>
      </div>
    </div>
  );
}
