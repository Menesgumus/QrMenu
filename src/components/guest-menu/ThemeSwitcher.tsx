"use client";

import { useEffect, useRef, useState } from "react";
import type { MenuThemeId } from "@/types/menu";
import { ShareMenu } from "./ShareMenu";

interface ThemeSwitcherProps {
  activeTheme: MenuThemeId;
  onSelectTheme: (theme: MenuThemeId) => void;
  businessSlug: string;
  switcherRef?: React.RefObject<HTMLDivElement | null>;
}

interface ThemeOption {
  id: MenuThemeId;
  title: string;
  subtitle: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "ozel",
    title: "Özel Menü",
    subtitle: "Basılı düzen, tipografi odaklı",
  },
  {
    id: "gece",
    title: "Gece",
    subtitle: "Koyu atmosfer, kategori odaklı",
  },
  {
    id: "canli",
    title: "Canlı",
    subtitle: "Renkli kategori kartları, hızlı akış",
  },
  {
    id: "ferah",
    title: "Ferah",
    subtitle: "Serin mavi, açılır-kapanır bölümler",
  },
  {
    id: "klasik",
    title: "Klasik QR",
    subtitle: "Fotoğraflı kategori şeridi, hızlı liste",
  },
  {
    id: "vitrin",
    title: "Vitrin",
    subtitle: "Büyük fotoğraf kutuları, sade akış",
  },
];

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
        <rect x="0" y="0" width="56" height="17" fill="#FFFFFF" />
        <line x1="0" y1="17" x2="56" y2="17" stroke="#EAECEF" strokeWidth="0.8" />
        <rect x="4" y="3.5" width="14" height="10" rx="2" fill="#D5B895" stroke="#1A1D21" strokeWidth="1" />
        <rect x="5" y="10" width="12" height="3.2" fill="#1A1D21" fillOpacity="0.65" />
        <rect x="4" y="14.5" width="14" height="1.4" rx="0.7" fill="#1A1D21" />
        <rect x="21" y="3.5" width="14" height="10" rx="2" fill="#C9A882" />
        <rect x="22" y="10" width="12" height="3.2" fill="#1A1D21" fillOpacity="0.65" />
        <rect x="38" y="3.5" width="14" height="10" rx="2" fill="#B5936E" />
        <rect x="39" y="10" width="12" height="3.2" fill="#1A1D21" fillOpacity="0.65" />
        <rect x="4" y="20" width="48" height="18" rx="2" fill="#FFFFFF" stroke="#EAECEF" strokeWidth="0.8" />
        <rect x="6" y="22" width="6" height="6" rx="1.2" fill="#D5D8DD" />
        <rect x="14.5" y="23" width="18" height="2" fill="#1A1D21" />
        <rect x="14.5" y="26" width="13" height="1.4" fill="#636A73" />
        <rect x="42" y="24" width="7.5" height="2" fill="#1A1D21" />
        <line x1="4" y1="29.5" x2="52" y2="29.5" stroke="#EAECEF" strokeWidth="0.7" />
        <rect x="6" y="31.5" width="6" height="5" rx="1" fill="#D5D8DD" />
        <rect x="14.5" y="32.5" width="15" height="2" fill="#1A1D21" />
        <rect x="42" y="32.8" width="7.5" height="2" fill="#1A1D21" />
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

export function ThemeSwitcher({
  activeTheme,
  onSelectTheme,
  businessSlug,
  switcherRef,
}: ThemeSwitcherProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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

  const currentOption =
    THEME_OPTIONS.find((opt) => opt.id === activeTheme) ?? THEME_OPTIONS[0];

  const isNight = activeTheme === "gece";
  const isCanli = activeTheme === "canli";
  const isFerah = activeTheme === "ferah";
  const isKlasik = activeTheme === "klasik";
  const isVitrin = activeTheme === "vitrin";

  return (
    <div
      ref={switcherRef}
      style={
        isNight || isCanli
          ? { fontFamily: "var(--font-visual-sans), system-ui, sans-serif" }
          : isFerah
            ? { fontFamily: "var(--font-ferah-sans), system-ui, sans-serif" }
            : isKlasik
              ? {
                  fontFamily: "var(--font-klasik-sans), system-ui, sans-serif",
                }
              : isVitrin
                ? {
                    fontFamily: "var(--font-vitrin-sans), system-ui, sans-serif",
                  }
                : undefined
      }
      className={`sticky top-0 z-40 border-b ${
        isNight
          ? "border-[#2A2D2B] bg-[#131514]/95 backdrop-blur-sm font-night-sans"
          : isCanli
            ? "border-[#24201B] bg-[#FFF9ED]/95 backdrop-blur-sm font-visual"
            : isFerah
              ? "border-[#DBEAFE] bg-[#FFFFFF]/95 backdrop-blur-sm font-ferah"
              : isKlasik
                ? "border-[#EAECEF] bg-[#FFFFFF]/95 backdrop-blur-sm font-klasik"
                : isVitrin
                  ? "border-[#EBE9E4] bg-[#FAF9F7]/95 backdrop-blur-sm font-vitrin"
                  : "border-[#DCD8CC] bg-[#EFECE3]/95 backdrop-blur-sm font-sans"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1220px] items-center justify-between px-4 py-1.5 md:px-8">
        <div ref={containerRef} className="relative">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-haspopup="menu"
            aria-label="Tasarım seçici"
            className={`inline-flex items-center gap-2 border px-2.5 py-1 text-[12px] font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isNight
                ? "rounded-[6px] border-[#343835] bg-[#242725] text-[#F5F1E8] hover:border-[#F28B50] focus-visible:outline-[#F28B50]"
                : isCanli
                  ? "rounded-[8px] border-[1.5px] border-[#24201B] bg-[#FFF9ED] font-semibold text-[#24201B] hover:border-[#AD3028] hover:text-[#AD3028] focus-visible:outline-[#AD3028]"
                  : isFerah
                    ? "rounded-[8px] border-[#BFDBFE] bg-[#EFF6FF] font-semibold text-[#182747] hover:border-[#2454D6] hover:text-[#2454D6] focus-visible:outline-[#2454D6]"
                    : isKlasik
                      ? "rounded-[8px] border-[#E2E5E9] bg-[#F7F7F8] font-semibold text-[#1A1D21] hover:border-[#1A1D21] focus-visible:outline-[#1A1D21]"
                      : isVitrin
                        ? "rounded-full border-[#DFDBD2] bg-[#FFFFFF] font-medium text-[#191817] hover:border-[#191817] focus-visible:outline-[#191817]"
                        : "border-[#171714] bg-[#F6F4EE] text-[#171714] hover:border-[#2448D8] hover:text-[#2448D8] focus-visible:outline-[#2448D8]"
            }`}
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
            <span>Tasarım</span>
            <span className="opacity-45">·</span>
            <span className="font-semibold">{currentOption.title}</span>
            <svg
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className={`h-3 w-3 transition-transform duration-150 ${
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
              aria-label="Menü tasarımları"
              className={`absolute top-full left-0 z-50 mt-1.5 w-[min(304px,calc(100vw-32px))] max-h-[calc(100dvh-56px)] overflow-y-auto overscroll-contain border p-2 shadow-sm ${
                isNight
                  ? "rounded-[8px] border-[#343835] bg-[#1F2220] text-[#F5F1E8]"
                  : isCanli
                    ? "rounded-[12px] border-[1.5px] border-[#24201B] bg-[#FFF9ED] text-[#24201B] shadow-[3px_3px_0_#24201B]"
                    : isFerah
                      ? "rounded-[12px] border-[#BFDBFE] bg-[#FFFFFF] text-[#182747] shadow-md"
                      : isKlasik
                        ? "rounded-[12px] border-[#E2E5E9] bg-[#FFFFFF] text-[#1A1D21] shadow-md"
                        : isVitrin
                          ? "rounded-[14px] border-[#E4E1DA] bg-[#FFFFFF] text-[#191817] shadow-lg"
                          : "border-[#171714] bg-white text-[#171714]"
              }`}
            >
              <p
                className={`px-2 pt-1 pb-1.5 text-[10.5px] font-semibold tracking-[0.08em] uppercase ${
                  isNight
                    ? "text-[#B9BDB6]"
                    : isCanli
                      ? "text-[#5C5347]"
                      : isFerah
                        ? "text-[#596579]"
                        : isKlasik
                          ? "text-[#636A73]"
                          : isVitrin
                            ? "text-[#6B6863]"
                            : "text-[#64635E]"
                }`}
              >
                Menü Tasarımı Seçin
              </p>

              <div className="space-y-1.5">
                {THEME_OPTIONS.map((option) => {
                  const isSelected = option.id === activeTheme;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="menuitemradio"
                      aria-checked={isSelected}
                      onClick={() => {
                        setOpen(false);
                        onSelectTheme(option.id);
                      }}
                      className={`flex w-full items-center gap-3 border p-2 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 ${
                        isNight
                          ? `rounded-[6px] focus-visible:outline-[#F28B50] ${
                              isSelected
                                ? "border-[#F28B50] bg-[#F28B50]/10"
                                : "border-[#323633] bg-[#242725] hover:border-[#F5F1E8]/35"
                            }`
                          : isCanli
                            ? `rounded-[9px] focus-visible:outline-[#AD3028] ${
                                isSelected
                                  ? "border-[#AD3028] bg-[#F4CE45]/35"
                                  : "border-[#24201B]/25 bg-white hover:border-[#24201B]"
                              }`
                            : isFerah
                              ? `rounded-[9px] focus-visible:outline-[#2454D6] ${
                                  isSelected
                                    ? "border-[#2454D6] bg-[#EFF6FF]"
                                    : "border-[#E2E8F0] bg-[#FFFFFF] hover:border-[#BFDBFE] hover:bg-[#F8FAFC]"
                                }`
                              : isKlasik
                                ? `rounded-[9px] focus-visible:outline-[#1A1D21] ${
                                    isSelected
                                      ? "border-[#1A1D21] bg-[#F7F7F8]"
                                      : "border-[#EAECEF] bg-[#FFFFFF] hover:border-[#CBD0D6]"
                                  }`
                                : isVitrin
                                  ? `rounded-[10px] focus-visible:outline-[#191817] ${
                                      isSelected
                                        ? "border-[#191817] bg-[#FAF9F7]"
                                        : "border-[#EBE9E4] bg-[#FFFFFF] hover:border-[#CFCAC0]"
                                    }`
                                  : `focus-visible:outline-[#2448D8] ${
                                      isSelected
                                        ? "border-[#2448D8] bg-[#2448D8]/[0.05]"
                                        : "border-[#E6E4DD] bg-white hover:border-[#141413]/40 hover:bg-[#FAFAF8]"
                                    }`
                      }`}
                    >
                      <ThemeMiniPreview id={option.id} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[13px] font-semibold ${
                              isNight
                                ? "text-[#F5F1E8]"
                                : isCanli
                                  ? "text-[#24201B]"
                                  : isFerah
                                    ? "text-[#182747]"
                                    : isKlasik
                                      ? "text-[#1A1D21]"
                                      : isVitrin
                                        ? "text-[#191817]"
                                        : "text-[#141413]"
                            }`}
                          >
                            {option.title}
                          </span>
                          {isSelected && (
                            <span
                              className={`text-[10.5px] font-semibold ${
                                isNight
                                  ? "text-[#F28B50]"
                                  : isCanli
                                    ? "font-bold text-[#AD3028]"
                                    : isFerah
                                      ? "text-[#2454D6]"
                                      : isKlasik
                                        ? "text-[#1A1D21]"
                                        : isVitrin
                                          ? "text-[#191817]"
                                          : "text-[#2448D8]"
                              }`}
                            >
                              Seçili
                            </span>
                          )}
                        </div>
                        <p
                          className={`mt-0.5 text-[11.5px] leading-[1.3] ${
                            isNight
                              ? "text-[#B9BDB6]"
                              : isCanli
                                ? "text-[#5C5347]"
                                : isFerah
                                  ? "text-[#596579]"
                                  : isKlasik
                                    ? "text-[#636A73]"
                                    : isVitrin
                                      ? "text-[#6B6863]"
                                      : "text-[#64635E]"
                          }`}
                        >
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

        <div className="flex items-center gap-3">
          <span
            className={`hidden text-[11px] font-medium tracking-[0.04em] md:inline ${
              isNight
                ? "text-[#B9BDB6]"
                : isCanli
                  ? "text-[#5C5347]"
                  : isFerah
                    ? "text-[#596579]"
                    : isKlasik
                      ? "text-[#636A73]"
                      : isVitrin
                        ? "text-[#6B6863]"
                        : "text-[#64635E]"
            }`}
          >
            Sunum Önizlemesi
          </span>
          <ShareMenu
            activeTheme={activeTheme}
            activeThemeTitle={currentOption.title}
            businessSlug={businessSlug}
          />
        </div>
      </div>
    </div>
  );
}
