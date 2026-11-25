"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { formatPriceTRY } from "@/lib/format";
import { getItemText, getUiDictionary } from "@/lib/i18n";
import type { MenuItem, MenuLanguage, MenuThemeId } from "@/types/menu";
import { MenuImage } from "./MenuImage";

interface ItemDetailModalProps {
  item: MenuItem | null;
  categoryName: string;
  onClose: () => void;
  theme?: MenuThemeId;
  language: MenuLanguage;
}

export function ItemDetailModal({
  item,
  categoryName,
  onClose,
  theme = "ozel",
  language,
}: ItemDetailModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dict = getUiDictionary(language);

  useEffect(() => {
    if (!item) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item || typeof document === "undefined") return null;

  const isNight = theme === "gece";
  const isCanli = theme === "canli";
  const isFerah = theme === "ferah";
  const isKlasik = theme === "klasik";
  const isVitrin = theme === "vitrin";

  const { fullName, description, imageAlt } = getItemText(item, language);

  const fontStyle =
    isNight || isCanli
      ? { fontFamily: "var(--font-visual-sans), system-ui, sans-serif" }
      : isFerah
        ? { fontFamily: "var(--font-ferah-sans), system-ui, sans-serif" }
        : isKlasik
          ? { fontFamily: "var(--font-klasik-sans), system-ui, sans-serif" }
          : isVitrin
            ? { fontFamily: "var(--font-vitrin-sans), system-ui, sans-serif" }
            : undefined;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="item-detail-title"
      lang={language}
      style={{
        ...fontStyle,
        backgroundColor: "var(--menu-backdrop)",
      }}
      className={`fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4 ${
        isNight
          ? "font-night-sans"
          : isCanli
            ? "font-visual"
            : isFerah
              ? "font-ferah"
              : isKlasik
                ? "font-klasik"
                : isVitrin
                  ? "font-vitrin"
                  : "font-sans"
      }`}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className={`flex max-h-[88dvh] w-full flex-col overflow-hidden text-[var(--menu-text)] ${
          item.image
            ? "sm:max-w-[560px] md:max-w-[600px] lg:max-h-[85dvh] lg:max-w-[860px] xl:max-w-[940px]"
            : "sm:max-w-[560px] md:max-w-[600px] lg:max-h-[85dvh]"
        } ${
          isNight
            ? "rounded-t-[14px] border-t border-[var(--menu-border-strong)] bg-[var(--menu-surface)] sm:rounded-[12px] sm:border"
            : isCanli
              ? "rounded-t-[18px] border-t-2 border-[var(--menu-border-strong)] bg-[var(--menu-bg)] sm:rounded-[18px] sm:border-2 sm:shadow-[5px_5px_0_var(--menu-shadow-ink)]"
              : isFerah
                ? "rounded-t-[16px] border-t border-[var(--menu-border)] bg-[var(--menu-surface)] shadow-xl sm:rounded-[16px] sm:border"
                : isKlasik
                  ? "rounded-t-[14px] border-t border-[var(--menu-border)] bg-[var(--menu-surface)] shadow-lg sm:rounded-[14px] sm:border"
                  : isVitrin
                    ? "rounded-t-[18px] border-t border-[var(--menu-border)] bg-[var(--menu-surface)] shadow-xl sm:rounded-[18px] sm:border"
                    : "border-t-2 border-[var(--menu-border-strong)] bg-[var(--menu-bg)] sm:border"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={`flex shrink-0 items-center justify-between gap-4 border-b px-5 py-3.5 ${
            isCanli
              ? "border-b-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-band-bg)]"
              : isNight || isFerah || isKlasik || isVitrin
                ? "border-[var(--menu-border)] bg-[var(--menu-surface-muted)]"
                : "border-[var(--menu-border)] bg-[var(--menu-bg)]"
          }`}
        >
          <span
            className={`min-w-0 truncate text-[11.5px] font-semibold tracking-[0.06em] uppercase ${
              isCanli
                ? "font-bold text-[var(--menu-band-text)]"
                : isKlasik || isVitrin
                  ? "text-[var(--menu-text-secondary)]"
                  : "text-[var(--menu-accent)]"
            }`}
          >
            {categoryName}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className={`shrink-0 px-3 py-1.5 text-[13px] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] ${
              isCanli
                ? "rounded-[9px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-accent)] font-bold text-[var(--menu-accent-contrast)] hover:bg-[var(--menu-accent-hover)]"
                : isVitrin
                  ? "rounded-full bg-[var(--menu-accent)] px-3.5 font-medium text-[var(--menu-accent-contrast)] hover:bg-[var(--menu-accent-hover)]"
                  : theme === "ozel"
                    ? "border border-[var(--menu-border-strong)] font-medium text-[var(--menu-text)] hover:border-[var(--menu-accent)] hover:text-[var(--menu-accent)]"
                    : "rounded-[8px] bg-[var(--menu-accent)] font-semibold text-[var(--menu-accent-contrast)] hover:bg-[var(--menu-accent-hover)]"
            }`}
          >
            {dict.nav.close}
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 lg:p-6">
          <div
            className={
              item.image
                ? "lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-7"
                : ""
            }
          >
            {item.image && (
              <div
                className={`mb-4 overflow-hidden border p-1.5 lg:mb-0 ${
                  isCanli
                    ? "rounded-[12px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-surface)]"
                    : theme === "ozel"
                      ? "rounded-[2px] border-[var(--menu-border)] bg-[var(--menu-surface-muted)]"
                      : "rounded-[12px] border-[var(--menu-border)] bg-[var(--menu-surface-muted)]"
                }`}
              >
                <MenuImage
                  src={item.image.fullUrl}
                  alt={imageAlt}
                  preset="detail-modal"
                  sizes="(min-width: 1280px) 440px, (min-width: 1024px) 400px, (min-width: 768px) 546px, (min-width: 640px) 506px, calc(100vw - 52px)"
                  width={item.image.width}
                  height={item.image.height}
                  loading="eager"
                  decoding="async"
                  className={`mx-auto block h-auto w-auto max-w-full object-contain ${
                    isNight || isCanli || isFerah || isKlasik
                      ? "max-h-[38dvh] sm:max-h-[48dvh] lg:max-h-[62dvh]"
                      : isVitrin
                        ? "max-h-[40dvh] sm:max-h-[48dvh] lg:max-h-[62dvh]"
                        : "max-h-[54dvh] lg:max-h-[62dvh]"
                  }`}
                />
              </div>
            )}

            <div className="min-w-0">
              <h2
                id="item-detail-title"
                style={
                  isNight
                    ? { fontFamily: "var(--font-night-display), Georgia, serif" }
                    : isCanli
                      ? {
                          fontFamily:
                            "var(--font-lively-display), system-ui, sans-serif",
                        }
                      : undefined
                }
                className={`text-[20px] leading-[1.26] text-[var(--menu-text)] md:text-[22px] lg:text-[24px] ${
                  isNight
                    ? "font-night-display font-semibold tracking-[-0.01em]"
                    : isCanli
                      ? "font-lively-display font-extrabold tracking-[-0.015em]"
                      : isFerah || isKlasik
                        ? "font-bold tracking-[-0.015em]"
                        : isVitrin
                          ? "font-semibold tracking-[-0.015em]"
                          : "font-semibold"
                }`}
              >
                {fullName}
              </h2>

              <p
                className={`mt-2 text-[18px] tabular-nums md:text-[20px] ${
                  isNight || isFerah
                    ? "font-bold text-[var(--menu-accent)]"
                    : isCanli
                      ? "inline-flex rounded-[8px] bg-[var(--menu-accent)] px-3 py-0.5 font-extrabold text-[var(--menu-accent-contrast)]"
                      : isKlasik || isVitrin
                        ? "font-bold text-[var(--menu-text)]"
                        : "font-semibold text-[var(--menu-text)]"
                }`}
              >
                {formatPriceTRY(item.priceKurus)}
              </p>

              {description && (
                <p className="mt-3 text-[15px] leading-[1.6] text-[var(--menu-text-secondary)] lg:mt-4">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
