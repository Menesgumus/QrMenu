import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuestMenuClient } from "@/components/guest-menu/GuestMenuClient";
import { PROTOTYPE_MENU } from "@/data/prototype-menu";
import {
  resolveColorModeParam,
  resolveLanguageParam,
  resolveMenuThemeParam,
} from "@/lib/presentation-urls";

export function generateStaticParams() {
  return [{ slug: PROTOTYPE_MENU.business.slug }];
}

export async function generateMetadata({
  params,
}: PageProps<"/m/[slug]">): Promise<Metadata> {
  const { slug } = await params;

  if (slug !== PROTOTYPE_MENU.business.slug) {
    return {
      title: "Menü Bulunamadı",
    };
  }

  return {
    title: `${PROTOTYPE_MENU.business.name} — Menü`,
    description: PROTOTYPE_MENU.business.description,
  };
}

export default async function BusinessMenuPage({
  params,
  searchParams,
}: PageProps<"/m/[slug]">) {
  const { slug } = await params;

  if (slug !== PROTOTYPE_MENU.business.slug) {
    notFound();
  }

  const query = await searchParams;
  const requestedTheme = resolveMenuThemeParam(query.tasarim);
  const requestedLanguage = resolveLanguageParam(query.dil);
  const requestedColorMode = resolveColorModeParam(query.mod);

  return (
    <GuestMenuClient
      initialTheme={requestedTheme ?? PROTOTYPE_MENU.business.defaultTheme}
      explicitUrlLanguage={requestedLanguage}
      explicitUrlColorMode={requestedColorMode}
      showThemeSwitcher={false}
    />
  );
}
