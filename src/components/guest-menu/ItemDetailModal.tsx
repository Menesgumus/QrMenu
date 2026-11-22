"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { formatPriceTRY } from "@/lib/format";
import type { MenuItem, MenuThemeId } from "@/types/menu";

interface ItemDetailModalProps {
  item: MenuItem | null;
  categoryName: string;
  onClose: () => void;
  theme?: MenuThemeId;
}

export function ItemDetailModal({
  item,
  categoryName,
  onClose,
  theme = "ozel",
}: ItemDetailModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!item) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog cleanly without changing background scroll position
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

  if (!item) return null;

  const isNight = theme === "gece";
  const isCanli = theme === "canli";
  const isFerah = theme === "ferah";
  const isKlasik = theme === "klasik";
  const isVitrin = theme === "vitrin";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="item-detail-title"
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
      className={`fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4 ${
        isNight
          ? "bg-black/70 font-night-sans"
          : isCanli
            ? "bg-[#24201B]/60 font-visual"
            : isFerah
              ? "bg-[#182747]/45 font-ferah"
              : isKlasik
                ? "bg-[#1A1D21]/50 font-klasik"
                : isVitrin
                  ? "bg-[#191817]/55 font-vitrin"
                  : "bg-[#171714]/50 font-sans"
      }`}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className={`flex w-full max-h-[88dvh] flex-col overflow-hidden sm:max-w-[560px] ${
          isNight
            ? "rounded-t-[14px] border-t border-[#343835] bg-[#1F2220] text-[#F5F1E8] sm:rounded-[12px] sm:border"
            : isCanli
              ? "rounded-t-[18px] border-t-2 border-[#24201B] bg-[#FFF9ED] text-[#24201B] sm:rounded-[18px] sm:border-2 sm:shadow-[5px_5px_0_#24201B]"
              : isFerah
                ? "rounded-t-[16px] border-t border-[#DBEAFE] bg-[#FFFFFF] text-[#182747] shadow-xl sm:rounded-[16px] sm:border"
                : isKlasik
                  ? "rounded-t-[14px] border-t border-[#EAECEF] bg-[#FFFFFF] text-[#1A1D21] shadow-lg sm:rounded-[14px] sm:border"
                  : isVitrin
                    ? "rounded-t-[18px] border-t border-[#EBE9E4] bg-[#FFFFFF] text-[#191817] shadow-xl sm:rounded-[18px] sm:border"
                    : "border-t-2 border-[#171714] bg-[#F6F4EE] text-[#171714] sm:border"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={`flex shrink-0 items-center justify-between gap-4 border-b px-5 py-3.5 ${
            isNight
              ? "border-[#2F3330] bg-[#242725]"
              : isCanli
                ? "border-b-[1.5px] border-[#24201B] bg-[#F4CE45]"
                : isFerah
                  ? "border-[#DBEAFE] bg-[#EFF6FF]"
                  : isKlasik
                    ? "border-[#EAECEF] bg-[#F7F7F8]"
                    : isVitrin
                      ? "border-[#EBE9E4] bg-[#FAF9F7]"
                      : "border-[#DCD8CC] bg-[#F6F4EE]"
          }`}
        >
          <span
            className={`min-w-0 truncate text-[11.5px] font-semibold tracking-[0.06em] uppercase ${
              isNight
                ? "text-[#F28B50]"
                : isCanli
                  ? "font-bold text-[#24201B]"
                  : isFerah
                    ? "text-[#2454D6]"
                    : isKlasik
                      ? "text-[#636A73]"
                      : isVitrin
                        ? "text-[#6B6863]"
                        : "text-[#2448D8]"
            }`}
          >
            {categoryName}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className={`shrink-0 px-3 py-1.5 text-[13px] transition-colors duration-150 ${
              isNight
                ? "rounded-[6px] bg-[#F28B50] font-semibold text-[#171918] hover:bg-[#f59c69] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F1E8]"
                : isCanli
                  ? "rounded-[9px] border-[1.5px] border-[#24201B] bg-[#AD3028] font-bold text-[#FFF9ED] hover:bg-[#8E251E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24201B]"
                  : isFerah
                    ? "rounded-[8px] bg-[#2454D6] font-semibold text-[#FFFFFF] hover:bg-[#1E44B8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2454D6]"
                    : isKlasik
                      ? "rounded-[8px] bg-[#1A1D21] font-semibold text-[#FFFFFF] hover:bg-[#32363E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A1D21]"
                      : isVitrin
                        ? "rounded-full bg-[#191817] px-3.5 font-medium text-[#FFFFFF] hover:bg-[#33312F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191817]"
                        : "border border-[#171714] font-medium text-[#171714] hover:border-[#2448D8] hover:text-[#2448D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2448D8]"
            }`}
          >
            Kapat
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          {item.image && (
            <div
              className={`mb-4 overflow-hidden border p-1.5 ${
                isNight
                  ? "rounded-[8px] border-[#323633] bg-[#171918]"
                  : isCanli
                    ? "rounded-[12px] border-[1.5px] border-[#24201B] bg-white"
                    : isFerah
                      ? "rounded-[12px] border-[#E2E8F0] bg-[#EFF6FF]/60"
                      : isKlasik
                        ? "rounded-[10px] border-[#EAECEF] bg-[#F7F7F8]"
                        : isVitrin
                          ? "rounded-[12px] border-[#EBE9E4] bg-[#FAF9F7]"
                          : "rounded-[2px] border-[#DCD8CC] bg-[#EFECE3]"
              }`}
            >
              <Image
                src={item.image.fullUrl}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                unoptimized
                className={`mx-auto block h-auto w-auto max-w-full object-contain ${
                  isNight || isCanli
                    ? "max-h-[38dvh] sm:max-h-[48dvh]"
                    : isFerah || isKlasik
                      ? "max-h-[38dvh] sm:max-h-[46dvh]"
                      : isVitrin
                        ? "max-h-[40dvh] sm:max-h-[48dvh]"
                        : "max-h-[54dvh]"
                }`}
              />
            </div>
          )}

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
            className={`text-[20px] leading-[1.26] md:text-[22px] ${
              isNight
                ? "font-night-display font-semibold tracking-[-0.01em] text-[#F5F1E8]"
                : isCanli
                  ? "font-lively-display font-extrabold tracking-[-0.015em] text-[#24201B]"
                  : isFerah
                    ? "font-bold tracking-[-0.015em] text-[#182747]"
                    : isKlasik
                      ? "font-bold tracking-[-0.015em] text-[#1A1D21]"
                      : isVitrin
                        ? "font-semibold tracking-[-0.015em] text-[#191817]"
                        : "font-semibold text-[#171714]"
            }`}
          >
            {item.name}
          </h2>

          <p
            className={`mt-2 text-[18px] tabular-nums md:text-[20px] ${
              isNight
                ? "font-bold text-[#F28B50]"
                : isCanli
                  ? "inline-flex rounded-[8px] bg-[#AD3028] px-3 py-0.5 font-extrabold text-[#FFF9ED]"
                  : isFerah
                    ? "font-bold text-[#2454D6]"
                    : isKlasik
                      ? "font-bold text-[#1A1D21]"
                      : isVitrin
                        ? "font-bold text-[#191817]"
                        : "font-semibold text-[#171714]"
            }`}
          >
            {formatPriceTRY(item.priceKurus)}
          </p>

          {item.description && (
            <p
              className={`mt-3 text-[15px] leading-[1.6] ${
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
                          : "text-[#595950]"
              }`}
            >
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
