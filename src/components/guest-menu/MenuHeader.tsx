import { getUiDictionary } from "@/lib/i18n";
import type { BusinessProfile, MenuLanguage } from "@/types/menu";
import { BrandMark } from "./BrandMark";
import { getThemeContainerClass } from "./layout-tokens";

interface MenuHeaderProps {
  business: BusinessProfile;
  description: string;
  language: MenuLanguage;
}

export function MenuHeader({
  business,
  description,
  language,
}: MenuHeaderProps) {
  const dict = getUiDictionary(language);
  const uppercaseName = business.name.toLocaleUpperCase("tr-TR");

  return (
    <header
      className={`mx-auto w-full px-4 pt-3 pb-2.5 md:pt-8 md:pb-5 ${getThemeContainerClass("ozel")}`}
    >
      <div className="border-t-2 border-[var(--menu-border-strong)] pt-2.5 md:pt-4">
        <div className="md:grid md:grid-cols-[1.25fr_0.95fr] md:items-end md:gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,460px)] xl:gap-12">
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-display text-[36px] leading-[0.94] font-extrabold tracking-[-0.01em] text-[var(--menu-text)] md:text-[56px] md:leading-[0.9]">
              {uppercaseName}
            </h1>
            <BrandMark className="mt-0.5 h-8 w-8 shrink-0 text-[var(--menu-text)] md:hidden" />
          </div>

          <div className="mt-1.5 md:mt-0 md:border-l md:border-[var(--menu-border)] md:pl-6">
            <div className="hidden md:mb-3 md:flex md:items-center md:justify-between">
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--menu-text-secondary)]">
                {dict.meta.dailyMenuEyebrow}
              </span>
              <BrandMark className="h-8 w-8 text-[var(--menu-text)]" />
            </div>

            <p className="text-[13px] leading-[1.38] text-[var(--menu-text-secondary)] md:text-[14px] md:leading-[1.45]">
              {description}
            </p>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] font-medium text-[var(--menu-text-secondary)] md:mt-2.5 md:text-[12.5px]">
              <span>{business.address}</span>
              <span aria-hidden="true" className="text-[var(--menu-text-secondary)]">
                /
              </span>
              <span className="tabular-nums">{business.hours}</span>
              <span aria-hidden="true" className="text-[var(--menu-text-secondary)]">
                /
              </span>
              <a
                href={business.phoneHref}
                className="tabular-nums text-[var(--menu-text)] underline decoration-[var(--menu-border)] underline-offset-2 transition-colors duration-150 hover:text-[var(--menu-accent)] hover:decoration-[var(--menu-accent)]"
              >
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
