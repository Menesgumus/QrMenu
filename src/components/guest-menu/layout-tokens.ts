import type { MenuThemeId } from "@/types/menu";

export const THEME_MAX_WIDTH_CLASSES: Record<MenuThemeId, string> = {
  ozel: "max-w-[1440px]",
  gece: "max-w-[1520px]",
  canli: "max-w-[1520px]",
  ferah: "max-w-[1480px]",
  klasik: "max-w-[1480px]",
  vitrin: "max-w-[1560px]",
};

/**
 * Shared tablet & desktop horizontal padding.
 * Mobile (<768px) padding stays on each component (ThemeSwitcher keeps px-3 sm:px-4;
 * views and CustomerUtilityBar keep px-4) so existing mobile alignment is preserved.
 */
export const THEME_DESKTOP_PADDING_CLASS = "md:px-8 xl:px-10";

export function getThemeContainerClass(theme: MenuThemeId): string {
  return `${THEME_MAX_WIDTH_CLASSES[theme]} ${THEME_DESKTOP_PADDING_CLASS}`;
}
