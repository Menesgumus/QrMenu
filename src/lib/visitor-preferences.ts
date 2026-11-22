import type { ColorMode, MenuLanguage, MenuThemeId } from "@/types/menu";
import {
  getDefaultColorMode,
  resolveColorModeParam,
  resolveLanguageParam,
} from "./presentation-urls";

export const STORAGE_KEY_COLOR_MODE = "qrmenu:colorMode";
export const STORAGE_KEY_LANGUAGE = "qrmenu:lang";

// In-memory fallback so toggles continue to work if localStorage is blocked or throws.
let memoryColorMode: ColorMode | null = null;
let memoryLanguage: MenuLanguage | null = null;
const preferenceListeners = new Set<() => void>();

function notifyPreferenceListeners(): void {
  for (const listener of preferenceListeners) {
    listener();
  }
}

export function subscribeVisitorPreferences(listener: () => void): () => void {
  preferenceListeners.add(listener);

  if (typeof window === "undefined") {
    return () => {
      preferenceListeners.delete(listener);
    };
  }

  const handleStorage = (event: StorageEvent) => {
    if (
      event.key === null ||
      event.key === STORAGE_KEY_COLOR_MODE ||
      event.key === STORAGE_KEY_LANGUAGE
    ) {
      listener();
    }
  };

  window.addEventListener("storage", handleStorage);
  return () => {
    preferenceListeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function getStoredColorModePreference(): ColorMode | null {
  if (typeof window === "undefined") return memoryColorMode;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_COLOR_MODE);
    return resolveColorModeParam(raw ?? undefined) ?? memoryColorMode;
  } catch {
    return memoryColorMode;
  }
}

export function getStoredLanguagePreference(): MenuLanguage | null {
  if (typeof window === "undefined") return memoryLanguage;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY_LANGUAGE);
    return resolveLanguageParam(raw ?? undefined) ?? memoryLanguage;
  } catch {
    return memoryLanguage;
  }
}

/**
 * Persists an explicit visitor color-mode selection.
 * Never call with an inferred/computed theme default.
 */
export function saveColorModePreference(mode: ColorMode): void {
  memoryColorMode = mode;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY_COLOR_MODE, mode);
    } catch {
      // Ignore storage errors (private mode / blocked storage); memory fallback keeps working.
    }
  }
  notifyPreferenceListeners();
}

/**
 * Persists an explicit visitor language selection.
 */
export function saveLanguagePreference(language: MenuLanguage): void {
  memoryLanguage = language;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY_LANGUAGE, language);
    } catch {
      // Ignore storage errors; memory fallback keeps working.
    }
  }
  notifyPreferenceListeners();
}

/**
 * Precedence: explicit URL parameter > saved explicit preference > theme default.
 */
export function resolveEffectiveColorMode(
  themeId: MenuThemeId,
  explicitUrlMode: ColorMode | undefined,
  storedPreference: ColorMode | null
): ColorMode {
  if (explicitUrlMode) return explicitUrlMode;
  if (storedPreference) return storedPreference;
  return getDefaultColorMode(themeId);
}

/**
 * Precedence: explicit URL parameter > saved explicit preference > Turkish default.
 */
export function resolveEffectiveLanguage(
  explicitUrlLanguage: MenuLanguage | undefined,
  storedPreference: MenuLanguage | null
): MenuLanguage {
  if (explicitUrlLanguage) return explicitUrlLanguage;
  if (storedPreference) return storedPreference;
  return "tr";
}

/**
 * Synchronous inline <head> script that sets initial `data-menu-theme`,
 * `data-color-mode`, `lang`, and `colorScheme` on `<html>` before first paint,
 * using `explicit URL > localStorage > default` without ever writing computed defaults.
 */
export function buildBootstrapThemeScript(): string {
  return `(function(){try{var s=new URLSearchParams(window.location.search);var t=s.get("tasarim");var vt=["ozel","gece","canli","ferah","klasik","vitrin"];var theme=vt.indexOf(t)!==-1?t:"ozel";var um=s.get("mod");var sm=null;var sl=null;try{sm=window.localStorage.getItem("${STORAGE_KEY_COLOR_MODE}");sl=window.localStorage.getItem("${STORAGE_KEY_LANGUAGE}")}catch(e){}var mode=(um==="light"||um==="dark")?um:((sm==="light"||sm==="dark")?sm:(theme==="gece"?"dark":"light"));var ud=s.get("dil");var lang=(ud==="tr"||ud==="en")?ud:((sl==="tr"||sl==="en")?sl:"tr");var r=document.documentElement;r.setAttribute("data-menu-theme",theme);r.setAttribute("data-color-mode",mode);r.setAttribute("lang",lang);r.style.colorScheme=mode}catch(e){}})();`;
}
