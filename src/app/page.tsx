import { GuestMenuClient } from "@/components/guest-menu/GuestMenuClient";
import { PROTOTYPE_MENU } from "@/data/prototype-menu";
import {
  resolveColorModeParam,
  resolveLanguageParam,
  resolveMenuThemeParam,
} from "@/lib/presentation-urls";

export default async function HomePage({ searchParams }: PageProps<"/">) {
  const query = await searchParams;
  const requestedTheme = resolveMenuThemeParam(query.tasarim);
  const requestedLanguage = resolveLanguageParam(query.dil);
  const requestedColorMode = resolveColorModeParam(query.mod);

  return (
    <GuestMenuClient
      initialTheme={requestedTheme ?? PROTOTYPE_MENU.business.defaultTheme}
      explicitUrlLanguage={requestedLanguage}
      explicitUrlColorMode={requestedColorMode}
      showThemeSwitcher={true}
    />
  );
}
