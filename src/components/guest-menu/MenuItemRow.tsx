import Image from "next/image";
import { formatPriceTRY } from "@/lib/format";
import { getItemText } from "@/lib/i18n";
import type { MenuItem, MenuLanguage } from "@/types/menu";

interface MenuItemRowProps {
  item: MenuItem;
  onSelect: (item: MenuItem, triggerEl: HTMLButtonElement) => void;
  language: MenuLanguage;
}

export function MenuItemRow({ item, onSelect, language }: MenuItemRowProps) {
  const { fullName, description, imageAlt } = getItemText(item, language);
  const formattedPrice = formatPriceTRY(item.priceKurus);

  return (
    <article className="border-b border-[var(--menu-border)] last:border-b-0">
      <button
        type="button"
        onClick={(event) => onSelect(item, event.currentTarget)}
        className="group flex w-full items-start justify-between gap-3.5 py-3.5 text-left transition-colors duration-150 hover:bg-[var(--menu-surface-hover)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--menu-focus)] md:gap-5 md:py-4"
      >
        <div className="min-w-0 flex-1">
          <h3 className="text-[15.5px] leading-[1.32] font-semibold text-[var(--menu-text)] transition-colors duration-150 group-hover:text-[var(--menu-accent)] md:text-[16.5px]">
            {fullName}
          </h3>

          {description && (
            <p className="mt-1 line-clamp-2 text-[13.5px] leading-[1.48] text-[var(--menu-text-secondary)] md:text-[14px]">
              {description}
            </p>
          )}

          <p className="mt-2 text-[15px] leading-[1.3] font-semibold tabular-nums text-[var(--menu-text)] md:text-[15.5px]">
            {formattedPrice}
          </p>
        </div>

        {item.image && (
          <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[2px] border border-[var(--menu-border)] bg-[var(--menu-surface-muted)] md:h-[104px] md:w-[104px]">
            <Image
              src={item.image.thumbUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 88px, 104px"
              unoptimized
              className="object-cover"
            />
          </div>
        )}
      </button>
    </article>
  );
}
