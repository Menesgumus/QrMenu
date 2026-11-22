export type MenuThemeId =
  | "ozel"
  | "gece"
  | "canli"
  | "ferah"
  | "klasik"
  | "vitrin";

export type ColorMode = "light" | "dark";

export type MenuLanguage = "tr" | "en";

export interface BusinessProfile {
  id: string;
  slug: string;
  name: string;
  description: string;
  address: string;
  hours: string;
  phone: string;
  phoneHref: string;
  defaultTheme: MenuThemeId;
  translations?: {
    en?: {
      description?: string;
    };
  };
}

export interface MenuCategory {
  id: string;
  businessId: string;
  name: string;
  shortLabel?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  coverObjectPosition?: Partial<Record<MenuThemeId, string>>;
  sortOrder: number;
  translations?: {
    en?: {
      name?: string;
      shortLabel?: string;
      coverImageAlt?: string;
    };
  };
}

export interface MenuItemImage {
  thumbUrl: string;
  gridUrl: string;
  fullUrl: string;
  alt: string;
  altEn?: string;
  width: number;
  height: number;
  focalPointByTheme?: Partial<Record<MenuThemeId, string>>;
}

export interface MenuItem {
  id: string;
  businessId: string;
  categoryId: string;
  name: string;
  displayName?: string;
  description: string;
  priceKurus: number;
  image: MenuItemImage | null;
  isPublished: boolean;
  sortOrder: number;
  translations?: {
    en?: {
      name?: string;
      displayName?: string;
      description?: string;
    };
  };
}

export interface GuestMenuData {
  business: BusinessProfile;
  categories: MenuCategory[];
  items: MenuItem[];
}
