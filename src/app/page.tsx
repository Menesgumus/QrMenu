import { Suspense } from "react";
import { GuestMenuClient } from "@/components/guest-menu/GuestMenuClient";
import { PROTOTYPE_MENU } from "@/data/prototype-menu";
import {
  resolveColorModeParam,
  resolveLanguageParam,
  resolveMenuThemeParam,
} from "@/lib/presentation-urls";

async function ResolvedPresentationMenu({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const requestedTheme = resolveMenuThemeParam(query.tasarim);
  const requestedLanguage = resolveLanguageParam(query.dil);
  const requestedColorMode = resolveColorModeParam(query.mod);

  return (
    <GuestMenuClient
      data={PROTOTYPE_MENU}
      initialTheme={requestedTheme ?? PROTOTYPE_MENU.business.defaultTheme}
      explicitUrlLanguage={requestedLanguage}
      explicitUrlColorMode={requestedColorMode}
      showThemeSwitcher={true}
    />
  );
}

export default function HomePage({ searchParams }: PageProps<"/">) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--menu-bg)] px-4 py-12 text-center text-[14px] text-[var(--menu-text-secondary)]">
          Menü yükleniyor…
        </div>
      }
    >
      <ResolvedPresentationMenu searchParams={searchParams} />
    </Suspense>
  );
}
