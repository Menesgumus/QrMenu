import type { BusinessProfile } from "@/types/menu";
import { BrandMark } from "./BrandMark";

interface MenuHeaderProps {
  business: BusinessProfile;
}

export function MenuHeader({ business }: MenuHeaderProps) {
  const uppercaseName = business.name.toLocaleUpperCase("tr-TR");

  return (
    <header className="mx-auto w-full max-w-[820px] px-4 pt-3 pb-2.5 md:px-8 md:pt-8 md:pb-5">
      <div className="border-t-2 border-[#171714] pt-2.5 md:pt-4">
        <div className="md:grid md:grid-cols-[1.25fr_0.95fr] md:items-end md:gap-8">
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-display text-[36px] leading-[0.94] font-extrabold tracking-[-0.01em] text-[#171714] md:text-[56px] md:leading-[0.9]">
              {uppercaseName}
            </h1>
            <BrandMark className="mt-0.5 h-8 w-8 shrink-0 md:hidden" />
          </div>

          <div className="mt-1.5 md:mt-0 md:border-l md:border-[#DCD8CC] md:pl-6">
            <div className="hidden md:mb-3 md:flex md:items-center md:justify-between">
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#595950]">
                GÜNLÜK MENÜ
              </span>
              <BrandMark className="h-8 w-8" />
            </div>

            <p className="text-[13px] leading-[1.38] text-[#595950] md:text-[14px] md:leading-[1.45]">
              {business.description}
            </p>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] font-medium text-[#595950] md:mt-2.5 md:text-[12.5px]">
              <span>{business.address}</span>
              <span aria-hidden="true" className="text-[#DCD8CC]">
                /
              </span>
              <span className="tabular-nums">{business.hours}</span>
              <span aria-hidden="true" className="text-[#DCD8CC]">
                /
              </span>
              <a
                href={business.phoneHref}
                className="tabular-nums text-[#171714] underline decoration-[#DCD8CC] underline-offset-2 transition-colors duration-150 hover:text-[#2448D8] hover:decoration-[#2448D8]"
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
