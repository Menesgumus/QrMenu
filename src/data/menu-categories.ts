import type { MenuCategory } from "@/types/menu";

export const BUSINESS_ID = "biz-lokal-firin";

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "cat-sabah",
    businessId: BUSINESS_ID,
    name: "Sabah Fırınından Ekşi Mayalı Sıcak Tabaklar",
    shortLabel: "Kahvaltı",
    coverImageUrl: "/images/menu/grid/truflu-yumurta.webp",
    coverImageAlt: "Trüflü Çırpılmış Yumurta & Brioche",
    coverObjectPosition: {
      ferah: "center 50%",
      klasik: "center 55%",
      vitrin: "center 48%",
    },
    sortOrder: 1,
    translations: {
      en: {
        name: "Warm Sourdough Plates from the Morning Oven",
        shortLabel: "Breakfast",
        coverImageAlt: "Truffle Scrambled Eggs & Brioche",
      },
    },
  },
  {
    id: "cat-firin",
    businessId: BUSINESS_ID,
    name: "Fırından Günlük Ekmek & Hamur İşleri",
    shortLabel: "Fırından",
    coverImageUrl: "/images/menu/grid/sade-kruvasan.webp",
    coverImageAlt: "Tereyağlı Sade Kruvasan",
    coverObjectPosition: {
      ferah: "center 50%",
      klasik: "center 50%",
      vitrin: "center 48%",
    },
    sortOrder: 2,
    translations: {
      en: {
        name: "Daily Bakery Breads & Pastries",
        shortLabel: "Bakery",
        coverImageAlt: "Plain Butter Croissant",
      },
    },
  },
  {
    id: "cat-sandvic",
    businessId: BUSINESS_ID,
    name: "Artizan Tostlar & Sandviçler",
    shortLabel: "Sandviçler",
    coverImageUrl: "/images/menu/grid/izgara-sebze-focaccia.webp",
    coverImageAlt: "Izgara Sebzeli & Keçi Peynirli Focaccia Sandviç",
    coverObjectPosition: {
      ferah: "center 48%",
      klasik: "center 50%",
      vitrin: "center 48%",
    },
    sortOrder: 3,
    translations: {
      en: {
        name: "Artisan Toasts & Sandwiches",
        shortLabel: "Sandwiches",
        coverImageAlt: "Grilled Vegetable & Goat Cheese Focaccia Sandwich",
      },
    },
  },
  {
    id: "cat-salata",
    businessId: BUSINESS_ID,
    name: "Mevsim Salataları & Kâseler",
    shortLabel: "Salatalar",
    coverImageUrl: "/images/menu/grid/balkabagi-kinoa-kasesi.webp",
    coverImageAlt: "Fırın Balkabağı, Renkli Kinoa & Avokado Kâsesi",
    coverObjectPosition: {
      ferah: "center 52%",
      klasik: "center 50%",
      vitrin: "center 50%",
    },
    sortOrder: 4,
    translations: {
      en: {
        name: "Seasonal Salads & Bowls",
        shortLabel: "Salads",
        coverImageAlt: "Roasted Pumpkin, Tri-Color Quinoa & Avocado Bowl",
      },
    },
  },
  {
    id: "cat-sicak",
    businessId: BUSINESS_ID,
    name: "Mutfaktan Sıcak Tabaklar",
    shortLabel: "Sıcaklar",
    coverImageUrl: "/images/menu/grid/mantarli-rigatoni.webp",
    coverImageAlt: "Kremalı İstiridye & Kültür Mantarlı Rigatoni",
    coverObjectPosition: {
      ferah: "center 52%",
      klasik: "center 52%",
      vitrin: "center 50%",
    },
    sortOrder: 5,
    translations: {
      en: {
        name: "Warm Plates from the Kitchen",
        shortLabel: "Warm Plates",
        coverImageAlt: "Creamy Roasted Mushroom & Parmesan Rigatoni",
      },
    },
  },
  {
    id: "cat-paylasim",
    businessId: BUSINESS_ID,
    name: "Paylaşımlık Tabaklar & Atıştırmalıklar",
    shortLabel: "Paylaşımlık",
    coverImageUrl: "/images/menu/grid/yerli-peynir-tabagi.webp",
    coverImageAlt: "Anadolu Peynirleri, Ceviz & Meyve Tahtası",
    coverObjectPosition: {
      ferah: "center 50%",
      klasik: "center 50%",
      vitrin: "center 48%",
    },
    sortOrder: 6,
    translations: {
      en: {
        name: "Shareables & Small Plates",
        shortLabel: "Shareables",
        coverImageAlt: "Anatolian Artisan Cheese, Fruit & Nut Board",
      },
    },
  },
  {
    id: "cat-sicak-kahve",
    businessId: BUSINESS_ID,
    name: "Nitelikli Sıcak Kahveler",
    shortLabel: "Sıcak Kahve",
    coverImageUrl: "/images/menu/grid/flat-white.webp",
    coverImageAlt: "Flat White",
    coverObjectPosition: {
      ferah: "center 55%",
      klasik: "center 58%",
      vitrin: "center 55%",
    },
    sortOrder: 7,
    translations: {
      en: {
        name: "Specialty Hot Coffees",
        shortLabel: "Hot Coffee",
        coverImageAlt: "Flat White",
      },
    },
  },
  {
    id: "cat-buzlu-kahve",
    businessId: BUSINESS_ID,
    name: "Soğuk Kahveler & Espresso İçecekleri",
    shortLabel: "Soğuk Kahve",
    coverImageUrl: "/images/menu/grid/iced-latte.webp",
    coverImageAlt: "Buzlu Latte",
    coverObjectPosition: {
      ferah: "center 55%",
      klasik: "center 55%",
      vitrin: "center 52%",
    },
    sortOrder: 8,
    translations: {
      en: {
        name: "Iced Coffees & Cold Espresso",
        shortLabel: "Iced Coffee",
        coverImageAlt: "Iced Latte",
      },
    },
  },
  {
    id: "cat-cay",
    businessId: BUSINESS_ID,
    name: "Çaylar, Bitki Demlemeleri & Sıcak Çikolata",
    shortLabel: "Çaylar",
    coverImageUrl: "/images/menu/grid/rize-siyah-cay.webp",
    coverImageAlt: "Rize İnce Belli Siyah Çay",
    coverObjectPosition: {
      ferah: "center 55%",
      klasik: "center 52%",
      vitrin: "center 50%",
    },
    sortOrder: 9,
    translations: {
      en: {
        name: "Teas, Herbal Infusions & Hot Chocolate",
        shortLabel: "Teas",
        coverImageAlt: "Brewed Rize Black Tea",
      },
    },
  },
  {
    id: "cat-soguk",
    businessId: BUSINESS_ID,
    name: "Soğuk İçecekler & Limonatalar",
    shortLabel: "Soğuklar",
    coverImageUrl: "/images/menu/grid/reyhanli-gazoz.webp",
    coverImageAlt: "Ev Yapımı Reyhanlı Limonlu Gazoz",
    coverObjectPosition: {
      ferah: "center 46%",
      klasik: "center 48%",
      vitrin: "center 45%",
    },
    sortOrder: 10,
    translations: {
      en: {
        name: "Cold Drinks & Lemonades",
        shortLabel: "Cold Drinks",
        coverImageAlt: "House-Made Purple Basil Lemonade Fizz",
      },
    },
  },
  {
    id: "cat-tatli",
    businessId: BUSINESS_ID,
    name: "Günlük Tatlılar & Pastalar",
    shortLabel: "Tatlılar",
    coverImageUrl: "/images/menu/grid/bask-cheesecake.webp",
    coverImageAlt: "San Sebastián Yanık Bask Cheesecake",
    coverObjectPosition: {
      ferah: "center 50%",
      klasik: "center 52%",
      vitrin: "center 50%",
    },
    sortOrder: 11,
    translations: {
      en: {
        name: "Daily Desserts & Cakes",
        shortLabel: "Desserts",
        coverImageAlt: "San Sebastián Burnt Basque Cheesecake",
      },
    },
  },
];
