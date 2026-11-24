import type { GuestMenuData } from "@/types/menu";
import { BUSINESS_ID, MENU_CATEGORIES } from "./menu-categories";
import { BAR_AND_PASTRY_MENU_ITEMS } from "./menu-items-bar";
import { KITCHEN_MENU_ITEMS } from "./menu-items-kitchen";

export const PROTOTYPE_MENU: GuestMenuData = {
  business: {
    id: BUSINESS_ID,
    slug: "lokal-firin-kahve",
    name: "Lokal Fırın & Kahve",
    description:
      "Ekşi mayalı günlük ekmekler, taze kavrulmuş nitelikli kahveler ve mevsimlik tabaklar.",
    translations: {
      en: {
        description:
          "Daily sourdough breads, freshly roasted specialty coffees, and seasonal plates.",
      },
    },
    address: "Moda Cd. No:42, Kadıköy",
    hours: "08:30–22:00",
    phone: "0216 555 14 28",
    phoneHref: "tel:+902165551428",
    defaultTheme: "ozel",
  },
  categories: MENU_CATEGORIES,
  items: [...KITCHEN_MENU_ITEMS, ...BAR_AND_PASTRY_MENU_ITEMS],
};
