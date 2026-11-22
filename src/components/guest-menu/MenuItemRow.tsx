import Image from "next/image";
import { formatPriceTRY } from "@/lib/format";
import type { MenuItem } from "@/types/menu";

interface MenuItemRowProps {
  item: MenuItem;
  onSelect: (item: MenuItem, triggerEl: HTMLButtonElement) => void;
}

export function MenuItemRow({ item, onSelect }: MenuItemRowProps) {
  const formattedPrice = formatPriceTRY(item.priceKurus);

  return (
    <article className="border-b border-[#DCD8CC] last:border-b-0">
      <button
        type="button"
        onClick={(event) => onSelect(item, event.currentTarget)}
        className="group flex w-full items-start justify-between gap-3.5 py-3.5 text-left transition-colors duration-150 hover:bg-[#EFECE3]/65 active:bg-[#EFECE3] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#2448D8] md:gap-5 md:py-4"
      >
        <div className="min-w-0 flex-1">
          <h3 className="text-[15.5px] leading-[1.32] font-semibold text-[#171714] transition-colors duration-150 group-hover:text-[#2448D8] md:text-[16.5px]">
            {item.name}
          </h3>

          {item.description && (
            <p className="mt-1 line-clamp-2 text-[13.5px] leading-[1.48] text-[#595950] md:text-[14px]">
              {item.description}
            </p>
          )}

          <p className="mt-2 text-[15px] leading-[1.3] font-semibold tabular-nums text-[#171714] md:text-[15.5px]">
            {formattedPrice}
          </p>
        </div>

        {item.image && (
          <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[2px] border border-[#DCD8CC] bg-[#EFECE3] md:h-[104px] md:w-[104px]">
            <Image
              src={item.image.thumbUrl}
              alt={item.image.alt}
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
