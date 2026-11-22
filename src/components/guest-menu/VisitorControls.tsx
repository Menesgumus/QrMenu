"use client";

import { getUiDictionary } from "@/lib/i18n";
import type { ColorMode, MenuLanguage, MenuThemeId } from "@/types/menu";

interface VisitorControlsProps {
  theme: MenuThemeId;
  colorMode: ColorMode;
  language: MenuLanguage;
  onToggleColorMode: () => void;
  onSelectLanguage: (language: MenuLanguage) => void;
}

const CONTAINER_CLASSES: Record<MenuThemeId, string> = {
  ozel: "max-w-[820px] font-sans",
  gece: "max-w-[1220px] font-night-sans",
  canli: "max-w-[980px] font-visual",
  ferah: "max-w-[860px] font-ferah",
  klasik: "max-w-[860px] font-klasik",
  vitrin: "max-w-[960px] font-vitrin",
};

function getControlShapeClass(theme: MenuThemeId): {
  group: string;
  segment: string;
  iconBtn: string;
} {
  if (theme === "ozel") {
    return {
      group: "border border-[var(--menu-border-strong)] bg-[var(--menu-surface)]",
      segment: "px-2",
      iconBtn:
        "border border-[var(--menu-border-strong)] bg-[var(--menu-surface)] text-[var(--menu-text)] hover:border-[var(--menu-accent)] hover:text-[var(--menu-accent)]",
    };
  }
  if (theme === "canli") {
    return {
      group:
        "rounded-[8px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-surface)]",
      segment: "rounded-[5px] px-2 font-bold",
      iconBtn:
        "rounded-[8px] border-[1.5px] border-[var(--menu-border-strong)] bg-[var(--menu-surface)] text-[var(--menu-text)] hover:border-[var(--menu-accent)] hover:text-[var(--menu-accent)]",
    };
  }
  if (theme === "vitrin") {
    return {
      group:
        "overflow-hidden rounded-full border border-[var(--menu-border-strong)] bg-[var(--menu-surface)]",
      segment: "px-2.5",
      iconBtn:
        "rounded-full border border-[var(--menu-border-strong)] bg-[var(--menu-surface)] text-[var(--menu-text)] hover:border-[var(--menu-text)]",
    };
  }
  return {
    group:
      "overflow-hidden rounded-[8px] border border-[var(--menu-border-strong)] bg-[var(--menu-surface)]",
    segment: "px-2",
    iconBtn:
      "rounded-[8px] border border-[var(--menu-border-strong)] bg-[var(--menu-surface)] text-[var(--menu-text)] hover:border-[var(--menu-accent)] hover:text-[var(--menu-accent)]",
  };
}

export function VisitorControls({
  theme,
  colorMode,
  language,
  onToggleColorMode,
  onSelectLanguage,
}: VisitorControlsProps) {
  const dict = getUiDictionary(language);
  const shapes = getControlShapeClass(theme);
  const modeToggleLabel =
    colorMode === "dark"
      ? dict.controls.switchToLight
      : dict.controls.switchToDark;

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      {/* Kompakt TR | EN Dil Seçici */}
      <div
        role="group"
        aria-label={dict.controls.languageGroupLabel}
        className={`inline-flex h-9 items-center ${shapes.group}`}
      >
        {(["tr", "en"] as const).map((langOption) => {
          const isActive = language === langOption;
          const label = langOption.toUpperCase();
          return (
            <button
              key={langOption}
              type="button"
              onClick={() => onSelectLanguage(langOption)}
              aria-pressed={isActive}
              className={`inline-flex h-full min-w-[30px] items-center justify-center text-[11.5px] font-semibold tracking-[0.02em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--menu-focus)] ${
                shapes.segment
              } ${
                isActive
                  ? "bg-[var(--menu-accent)] text-[var(--menu-accent-contrast)]"
                  : "text-[var(--menu-text-secondary)] hover:text-[var(--menu-text)]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Gündüz / Gece Simge Düğmesi (küçük simge, 36x36px dokunma alanı) */}
      <button
        type="button"
        onClick={onToggleColorMode}
        aria-label={modeToggleLabel}
        title={modeToggleLabel}
        aria-pressed={colorMode === "dark"}
        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--menu-focus)] ${shapes.iconBtn}`}
      >
        {/* Güneş (koyu modda açığa geçmek için görünür) */}
        <svg
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="color-mode-icon-sun h-4 w-4 shrink-0"
        >
          <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M10 2.2V4.1M10 15.9V17.8M2.2 10H4.1M15.9 10H17.8M4.5 4.5L5.85 5.85M14.15 14.15L15.5 15.5M15.5 4.5L14.15 5.85M5.85 14.15L4.5 15.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>

        {/* Ay (açık modda koyuya geçmek için görünür) */}
        <svg
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="color-mode-icon-moon h-4 w-4 shrink-0"
        >
          <path
            d="M16.2 11.9A6.4 6.4 0 0 1 8.1 3.8a6.5 6.5 0 1 0 8.1 8.1Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

interface CustomerUtilityBarProps {
  theme: MenuThemeId;
  colorMode: ColorMode;
  language: MenuLanguage;
  onToggleColorMode: () => void;
  onSelectLanguage: (language: MenuLanguage) => void;
}

/**
 * Slim top bar for customer-facing links (`/m/[slug]`) where the theme switcher
 * and share controls stay hidden, keeping language and color mode cleanly accessible
 * on 360px+ screens without colliding with business headers.
 */
export function CustomerUtilityBar({
  theme,
  colorMode,
  language,
  onToggleColorMode,
  onSelectLanguage,
}: CustomerUtilityBarProps) {
  const dict = getUiDictionary(language);

  return (
    <div
      role="region"
      aria-label={dict.controls.openMenuLabel}
      className="border-b border-[var(--menu-border)] bg-[var(--menu-bg)]"
    >
      <div
        className={`mx-auto flex w-full items-center justify-between gap-2 px-4 py-1.5 md:px-8 ${CONTAINER_CLASSES[theme]}`}
      >
        <span className="truncate text-[11px] font-medium tracking-[0.04em] uppercase text-[var(--menu-text-secondary)]">
          {dict.meta.dailyMenuEyebrow}
        </span>
        <VisitorControls
          theme={theme}
          colorMode={colorMode}
          language={language}
          onToggleColorMode={onToggleColorMode}
          onSelectLanguage={onSelectLanguage}
        />
      </div>
    </div>
  );
}
