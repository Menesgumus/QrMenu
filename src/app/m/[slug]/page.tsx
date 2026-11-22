import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { GuestMenuClient } from "@/components/guest-menu/GuestMenuClient";
import { PROTOTYPE_MENU } from "@/data/prototype-menu";
import { resolveMenuThemeParam } from "@/lib/presentation-urls";

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

async function ResolvedBusinessMenu({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;

  if (slug !== PROTOTYPE_MENU.business.slug) {
    notFound();
  }

  const query = await searchParams;
  const requestedTheme = resolveMenuThemeParam(query.tasarim);

  return (
    <GuestMenuClient
      data={PROTOTYPE_MENU}
      initialTheme={requestedTheme ?? PROTOTYPE_MENU.business.defaultTheme}
      showThemeSwitcher={false}
    />
  );
}

export default function BusinessMenuPage({
  params,
  searchParams,
}: PageProps<"/m/[slug]">) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F6F4EE] px-4 py-12 text-center text-[14px] text-[#595950]">
          Menü yükleniyor…
        </div>
      }
    >
      <ResolvedBusinessMenu params={params} searchParams={searchParams} />
    </Suspense>
  );
}
