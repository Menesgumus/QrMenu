export type MenuThemeId =
  | "ozel"
  | "gece"
  | "canli"
  | "ferah"
  | "klasik"
  | "vitrin";

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
}

export interface MenuItemImage {
  thumbUrl: string;
  gridUrl: string;
  fullUrl: string;
  alt: string;
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
}

export interface GuestMenuData {
  business: BusinessProfile;
  categories: MenuCategory[];
  items: MenuItem[];
}
