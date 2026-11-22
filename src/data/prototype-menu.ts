import type { GuestMenuData } from "@/types/menu";

const BUSINESS_ID = "biz-lokal-firin";

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
  categories: [
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
      id: "cat-sicak-kahve",
      businessId: BUSINESS_ID,
      name: "Nitelikli Sıcak Kahveler",
      shortLabel: "Kahveler",
      coverImageUrl: "/images/menu/grid/flat-white.webp",
      coverImageAlt: "Flat White",
      coverObjectPosition: {
        ferah: "center 55%",
        klasik: "center 58%",
        vitrin: "center 55%",
      },
      sortOrder: 3,
      translations: {
        en: {
          name: "Specialty Hot Coffees",
          shortLabel: "Coffees",
          coverImageAlt: "Flat White",
        },
      },
    },
    {
      id: "cat-soguk",
      businessId: BUSINESS_ID,
      name: "Soğuk İçecekler & Demlemeler",
      shortLabel: "Soğuklar",
      coverImageUrl: "/images/menu/grid/reyhanli-gazoz.webp",
      coverImageAlt: "Ev Yapımı Reyhanlı Limonlu Gazoz",
      coverObjectPosition: {
        ferah: "center 46%",
        klasik: "center 48%",
        vitrin: "center 45%",
      },
      sortOrder: 4,
      translations: {
        en: {
          name: "Cold Drinks & Brews",
          shortLabel: "Cold Drinks",
          coverImageAlt: "House-Made Purple Basil Lemonade Fizz",
        },
      },
    },
    {
      id: "cat-tatli",
      businessId: BUSINESS_ID,
      name: "Günlük Tatlılar",
      shortLabel: "Tatlılar",
      coverImageUrl: "/images/menu/grid/bask-cheesecake.webp",
      coverImageAlt: "San Sebastián Yanık Bask Cheesecake",
      coverObjectPosition: {
        ferah: "center 50%",
        klasik: "center 52%",
        vitrin: "center 50%",
      },
      sortOrder: 5,
      translations: {
        en: {
          name: "Daily Desserts",
          shortLabel: "Desserts",
          coverImageAlt: "San Sebastián Burnt Basque Cheesecake",
        },
      },
    },
  ],
  items: [
    // Kategori 1: Sabah Fırınından Ekşi Mayalı Sıcak Tabaklar
    {
      id: "item-hellim-eksi-maya",
      businessId: BUSINESS_ID,
      categoryId: "cat-sabah",
      name: "Fırınlanmış Ekşi Mayalı Köy Ekmeği Üzerinde Izgara Hellim, Çeri Domates ve Taze Kekikli Zeytinyağı",
      displayName: "Izgara Hellimli Ekşi Maya",
      description:
        "Taş tabanlı fırında kızarmış kalın ekşi maya dilimi, marine edilmiş Kıbrıs hellimi, fırınlanmış çeri domates ve soğuk sıkım Ege zeytinyağı.",
      priceKurus: 29500,
      image: {
        thumbUrl: "/images/menu/thumbs/izgara-hellim-eksi-maya.webp",
        gridUrl: "/images/menu/grid/izgara-hellim-eksi-maya.webp",
        fullUrl: "/images/menu/full/izgara-hellim-eksi-maya.webp",
        alt: "Kızarmış ekşi maya ekmek dilimi üzerinde ızgara hellim peyniri ve taze yeşillikler",
        altEn:
          "Grilled halloumi cheese and fresh greens on toasted sourdough bread",
        width: 900,
        height: 1200,
      },
      isPublished: true,
      sortOrder: 1,
      translations: {
        en: {
          name: "Grilled Halloumi, Cherry Tomatoes & Fresh Thyme Olive Oil on Toasted Sourdough",
          displayName: "Grilled Halloumi Sourdough",
          description:
            "Thick stone-oven toasted sourdough slice, marinated Cypriot halloumi, roasted cherry tomatoes, and cold-pressed Aegean olive oil.",
        },
      },
    },
    {
      id: "item-tahinli-corek",
      businessId: BUSINESS_ID,
      categoryId: "cat-sabah",
      name: "Tahinli & Pekmezli Çıtır Çörek",
      description:
        "El açması kat kat hamur, kavrulmuş susam tahini, üzüm pekmezi ve fırında hafifçe kızartılmış susam taneleri.",
      priceKurus: 14500,
      image: {
        thumbUrl: "/images/menu/thumbs/tahinli-corek.webp",
        gridUrl: "/images/menu/grid/tahinli-corek.webp",
        fullUrl: "/images/menu/full/tahinli-corek.webp",
        alt: "Seramik tabakta üzeri beyaz susam serpilmiş kat kat tahinli çıtır çörek",
        altEn:
          "Flaky layered tahini pastry topped with white sesame seeds on a ceramic plate",
        width: 1200,
        height: 896,
      },
      isPublished: true,
      sortOrder: 2,
      translations: {
        en: {
          name: "Crispy Tahini & Grape Molasses Roll",
          description:
            "Hand-rolled flaky pastry, roasted sesame tahini, grape molasses, and lightly toasted sesame seeds.",
        },
      },
    },
    {
      id: "item-truflu-yumurta",
      businessId: BUSINESS_ID,
      categoryId: "cat-sabah",
      name: "Trüflü Çırpılmış Yumurta & Kızarmış Ekşi Maya",
      description:
        "Kısık ateşte tereyağı ile pişirilmiş yumuşak çırpılmış köy yumurtası, siyah trüf yağı, taze frenk soğanı ve kızarmış ekşi maya.",
      priceKurus: 34500,
      image: {
        thumbUrl: "/images/menu/thumbs/truflu-yumurta.webp",
        gridUrl: "/images/menu/grid/truflu-yumurta.webp",
        fullUrl: "/images/menu/full/truflu-yumurta.webp",
        alt: "Kızarmış ekşi maya ekmeği üzerinde siyah trüf ve frenk soğanlı çırpılmış yumurta",
        altEn:
          "Scrambled eggs with black truffle and chives on toasted sourdough bread",
        width: 1200,
        height: 805,
      },
      isPublished: true,
      sortOrder: 3,
      translations: {
        en: {
          name: "Truffle Scrambled Eggs & Toasted Sourdough",
          description:
            "Slow-cooked soft scrambled farm eggs with butter, black truffle oil, fresh chives, and toasted sourdough.",
        },
      },
    },
    {
      id: "item-focaccia",
      businessId: BUSINESS_ID,
      categoryId: "cat-sabah",
      name: "Zeytinli & Biberiyeli Taş Fırın Focaccia",
      description:
        "24 saat soğuk mayalanmış hamur, Gemlik siyah zeytini, taze biberiye yaprakları ve deniz tuzu.",
      priceKurus: 16500,
      image: {
        thumbUrl: "/images/menu/thumbs/zeytinli-focaccia.webp",
        gridUrl: "/images/menu/grid/zeytinli-focaccia.webp",
        fullUrl: "/images/menu/full/zeytinli-focaccia.webp",
        alt: "Ahşap tahta üzerinde siyah zeytinli, taze biberiyeli ve deniz tuzlu dilimlenmiş focaccia ekmeği",
        altEn:
          "Sliced focaccia bread with black olives, fresh rosemary, and sea salt on a wooden board",
        width: 1200,
        height: 794,
      },
      isPublished: true,
      sortOrder: 4,
      translations: {
        en: {
          name: "Olive & Rosemary Stone-Oven Focaccia",
          description:
            "24-hour cold-fermented dough, Gemlik black olives, fresh rosemary leaves, and sea salt.",
        },
      },
    },

    // Kategori 2: Fırından Günlük Ekmek & Hamur İşleri
    {
      id: "item-kruvasan",
      businessId: BUSINESS_ID,
      categoryId: "cat-firin",
      name: "Tuzlu Tereyağlı Sade Kruvasan",
      description:
        "Katmanlı tereyağlı hamur, çıtır dış kabuk ve yumuşak iç doku ile her sabah taze pişer.",
      priceKurus: 12500,
      image: {
        thumbUrl: "/images/menu/thumbs/sade-kruvasan.webp",
        gridUrl: "/images/menu/grid/sade-kruvasan.webp",
        fullUrl: "/images/menu/full/sade-kruvasan.webp",
        alt: "Metal servis tepsisinde altın sarısı kızarmış kat kat tereyağlı sade kruvasanlar",
        altEn:
          "Golden flaky salted butter plain croissants arranged on a metal tray",
        width: 1200,
        height: 800,
      },
      isPublished: true,
      sortOrder: 1,
      translations: {
        en: {
          name: "Salted Butter Plain Croissant",
          description:
            "Laminated butter pastry, crisp golden crust, and tender crumb baked fresh every morning.",
        },
      },
    },
    {
      id: "item-eksi-maya-tost",
      businessId: BUSINESS_ID,
      categoryId: "cat-firin",
      name: "Karamelize Soğanlı & Eski Kaşarlı Ekşi Maya Tost",
      displayName: "Karamelize Soğanlı Tost",
      description:
        "Ağır ateşte karamelize edilmiş kırmızı soğan, Kars eski kaşarı ve ekşi mayalı köy ekmeği.",
      priceKurus: 23500,
      image: {
        thumbUrl: "/images/menu/thumbs/eksi-maya-tost.webp",
        gridUrl: "/images/menu/grid/eksi-maya-tost.webp",
        fullUrl: "/images/menu/full/eksi-maya-tost.webp",
        alt: "Ahşap kesme tahtası üzerinde kızarmış kabuklu ve erimiş peynirli sıcak tost",
        altEn:
          "Toasted crust hot sourdough melt with melted cheese on a wooden cutting board",
        width: 960,
        height: 640,
      },
      isPublished: true,
      sortOrder: 2,
      translations: {
        en: {
          name: "Caramelized Onion & Aged Kars Kashar Sourdough Melt",
          displayName: "Caramelized Onion Melt",
          description:
            "Slow-caramelized red onions, aged Kars kashar cheese, and sourdough village bread.",
        },
      },
    },
    {
      id: "item-cavdar-somun",
      businessId: BUSINESS_ID,
      categoryId: "cat-firin",
      name: "Çavdarlı & Keten Tohumlu Tam Buğday Somun",
      displayName: "Çavdarlı Tam Buğday Somun",
      description:
        "Taş değirmen unu ile yoğrulmuş iki dilim ekmek, yanında çırpılmış köy tereyağı ve deniz tuzu ile.",
      priceKurus: 11000,
      image: {
        thumbUrl: "/images/menu/thumbs/cavdarli-somun.webp",
        gridUrl: "/images/menu/grid/cavdarli-somun.webp",
        fullUrl: "/images/menu/full/cavdarli-somun.webp",
        alt: "Keten örtü üzerinde dilimlenmiş tohumlu koyu çavdar somunu ve tereyağı",
        altEn:
          "Sliced dark seed-crusted rye loaf with butter on a linen cloth",
        width: 1200,
        height: 900,
      },
      isPublished: true,
      sortOrder: 3,
      translations: {
        en: {
          name: "Rye & Flaxseed Whole Wheat Loaf",
          displayName: "Rye Whole Wheat Loaf",
          description:
            "Two slices baked with stone-milled flour, served with whipped village butter and sea salt.",
        },
      },
    },

    // Kategori 3: Nitelikli Sıcak Kahveler
    {
      id: "item-cortado",
      businessId: BUSINESS_ID,
      categoryId: "cat-sicak-kahve",
      name: "Cortado",
      description:
        "Çift shot espresso üzerine eşit ölçüde kadifemsi ısıtılmış süt.",
      priceKurus: 14500,
      image: {
        thumbUrl: "/images/menu/thumbs/cortado.webp",
        gridUrl: "/images/menu/grid/cortado.webp",
        fullUrl: "/images/menu/full/cortado.webp",
        alt: "Küçük cam bardakta espresso ve eşit ölçüde sütle hazırlanmış cortado",
        altEn:
          "Cortado prepared with espresso and equal steamed milk in a small glass",
        width: 1062,
        height: 1200,
      },
      isPublished: true,
      sortOrder: 1,
      translations: {
        en: {
          name: "Cortado",
          description:
            "Double shot of espresso balanced with an equal part of velvety steamed milk.",
        },
      },
    },
    {
      id: "item-v60",
      businessId: BUSINESS_ID,
      categoryId: "cat-sicak-kahve",
      name: "Filtre Kahve (V60 — Etiyopya Yirgacheffe)",
      displayName: "Filtre Kahve (V60)",
      description:
        "Bergamot, yasemin ve şeftali notaları taşıyan el demlemesi tek kökenli kahve.",
      priceKurus: 16000,
      image: {
        thumbUrl: "/images/menu/thumbs/v60-filtre-kahve.webp",
        gridUrl: "/images/menu/grid/v60-filtre-kahve.webp",
        fullUrl: "/images/menu/full/v60-filtre-kahve.webp",
        alt: "Kuğu boyunlu demlikten V60 seramik filtreye sıcak su dökülerek hazırlanan el demlemesi kahve",
        altEn:
          "Hand-brewed coffee poured from a gooseneck kettle into a ceramic V60 dripper",
        width: 959,
        height: 1200,
      },
      isPublished: true,
      sortOrder: 2,
      translations: {
        en: {
          name: "Pour-Over Filter Coffee (V60 — Ethiopia Yirgacheffe)",
          displayName: "Filter Coffee (V60)",
          description:
            "Hand-brewed single-origin coffee with notes of bergamot, jasmine, and peach.",
        },
      },
    },
    {
      id: "item-turk-kahvesi",
      businessId: BUSINESS_ID,
      categoryId: "cat-sicak-kahve",
      name: "Çifte Kavrulmuş Türk Kahvesi",
      description:
        "Bakır cezvede ağır ateşte pişirilmiş, yanında bitter çikolata ve su ile.",
      priceKurus: 11500,
      image: {
        thumbUrl: "/images/menu/thumbs/turk-kahvesi.webp",
        gridUrl: "/images/menu/grid/turk-kahvesi.webp",
        fullUrl: "/images/menu/full/turk-kahvesi.webp",
        alt: "Desenli porselen fincanda bol köpüklü geleneksel Türk kahvesi",
        altEn:
          "Traditional foamy Turkish coffee served in a patterned porcelain cup",
        width: 800,
        height: 1200,
      },
      isPublished: true,
      sortOrder: 3,
      translations: {
        en: {
          name: "Double-Roasted Turkish Coffee",
          description:
            "Slow-brewed in a copper cezve, served with dark chocolate and a glass of water.",
        },
      },
    },
    {
      id: "item-flat-white",
      businessId: BUSINESS_ID,
      categoryId: "cat-sicak-kahve",
      name: "Flat White",
      description:
        "Yoğun gövdeli çift shot espresso ve ince mikro köpüklü günlük süt.",
      priceKurus: 15500,
      image: {
        thumbUrl: "/images/menu/thumbs/flat-white.webp",
        gridUrl: "/images/menu/grid/flat-white.webp",
        fullUrl: "/images/menu/full/flat-white.webp",
        alt: "Siyah seramik fincanda ince mikro köpük desenli flat white kahve",
        altEn:
          "Flat white coffee with fine micro-foam latte art in a black ceramic cup",
        width: 801,
        height: 1200,
      },
      isPublished: true,
      sortOrder: 4,
      translations: {
        en: {
          name: "Flat White",
          description:
            "Rich double shot of espresso topped with fine micro-foamed fresh milk.",
        },
      },
    },

    // Kategori 4: Soğuk İçecekler & Demlemeler
    {
      id: "item-cold-brew",
      businessId: BUSINESS_ID,
      categoryId: "cat-soguk",
      name: "Soğuk Demleme (Cold Brew)",
      description:
        "16 saat soğuk suda demlenmiş, dengeli asiditeli ve bitter çikolata bitişli kahve.",
      priceKurus: 17000,
      image: {
        thumbUrl: "/images/menu/thumbs/cold-brew.webp",
        gridUrl: "/images/menu/grid/cold-brew.webp",
        fullUrl: "/images/menu/full/cold-brew.webp",
        alt: "Buz küpleriyle dolu cam bardakta berrak soğuk demleme siyah kahve",
        altEn: "Clear cold brew black coffee over ice cubes in a glass",
        width: 960,
        height: 640,
      },
      isPublished: true,
      sortOrder: 1,
      translations: {
        en: {
          name: "Cold Brew",
          description:
            "Steeped in cold water for 16 hours with balanced acidity and a dark chocolate finish.",
        },
      },
    },
    {
      id: "item-portakal-zencefil",
      businessId: BUSINESS_ID,
      categoryId: "cat-soguk",
      name: "Taze Sıkılmış Portakal & Zencefil",
      description:
        "Günlük sıkım Finike portakalı, taze zencefil kökü ve ince limon kabuğu.",
      priceKurus: 15000,
      image: {
        thumbUrl: "/images/menu/thumbs/portakal-zencefil.webp",
        gridUrl: "/images/menu/grid/portakal-zencefil.webp",
        fullUrl: "/images/menu/full/portakal-zencefil.webp",
        alt: "Taze portakal dilimleri ve yaprakları eşliğinde cam bardakta taze sıkılmış portakal suyu",
        altEn:
          "Freshly squeezed orange juice in a glass with fresh orange slices and leaves",
        width: 801,
        height: 1200,
      },
      isPublished: true,
      sortOrder: 2,
      translations: {
        en: {
          name: "Freshly Squeezed Orange & Ginger",
          description:
            "Daily pressed Finike oranges, fresh ginger root, and fine lemon zest.",
        },
      },
    },
    {
      id: "item-reyhan-gazoz",
      businessId: BUSINESS_ID,
      categoryId: "cat-soguk",
      name: "Ev Yapımı Reyhanlı & Limonlu Gazoz",
      description:
        "Taze mor reyhan şurubu, sıkma limon suyu ve doğal maden suyu.",
      priceKurus: 13000,
      image: {
        thumbUrl: "/images/menu/thumbs/reyhanli-gazoz.webp",
        gridUrl: "/images/menu/grid/reyhanli-gazoz.webp",
        fullUrl: "/images/menu/full/reyhanli-gazoz.webp",
        alt: "Buzlu cam bardakta taze limon dilimi ve mor reyhan yapraklarıyla servis edilmiş yakut rengi reyhanlı gazoz",
        altEn:
          "Ruby-colored purple basil fizz over ice in a glass with fresh lemon slice and purple basil leaves",
        width: 896,
        height: 1200,
      },
      isPublished: true,
      sortOrder: 3,
      translations: {
        en: {
          name: "House-Made Purple Basil & Lemon Fizz",
          description:
            "Fresh purple basil syrup, freshly squeezed lemon juice, and natural sparkling mineral water.",
        },
      },
    },

    // Kategori 5: Günlük Tatlılar
    {
      id: "item-bask-cheesecake",
      businessId: BUSINESS_ID,
      categoryId: "cat-tatli",
      name: "Böğürtlenli Yanık Bask Cheesecake",
      description:
        "Karamelize üst yüzey, akışkan kremsi iç doku ve ev yapımı yabani böğürtlen sosu.",
      priceKurus: 26000,
      image: {
        thumbUrl: "/images/menu/thumbs/bask-cheesecake.webp",
        gridUrl: "/images/menu/grid/bask-cheesecake.webp",
        fullUrl: "/images/menu/full/bask-cheesecake.webp",
        alt: "Seramik tabakta taze böğürtlen ve böğürtlen sosu ile servis edilmiş yanık Bask cheesecake dilimi",
        altEn:
          "Slice of burnt Basque cheesecake served with fresh blackberries and berry sauce on a ceramic plate",
        width: 1200,
        height: 896,
      },
      isPublished: true,
      sortOrder: 1,
      translations: {
        en: {
          name: "Blackberry Burnt Basque Cheesecake",
          description:
            "Caramelized top, creamy custardy center, and house-made wild blackberry compote.",
        },
      },
    },
    {
      id: "item-incirli-tart",
      businessId: BUSINESS_ID,
      categoryId: "cat-tatli",
      name: "Fındık Pralinli & Kavrulmuş İncirli Tart",
      displayName: "Fındık Pralinli İncirli Tart",
      description:
        "Giresun fındığı pralininin üzerine fırınlanmış siyah incir ve hafif vanilya kreması.",
      priceKurus: 24000,
      image: {
        thumbUrl: "/images/menu/thumbs/incirli-tart.webp",
        gridUrl: "/images/menu/grid/incirli-tart.webp",
        fullUrl: "/images/menu/full/incirli-tart.webp",
        alt: "Seramik tabakta file badem ve fırınlanmış siyah incir dilimleriyle tart",
        altEn:
          "Tart topped with sliced almonds and roasted black fig halves on a ceramic plate",
        width: 1200,
        height: 795,
      },
      isPublished: true,
      sortOrder: 2,
      translations: {
        en: {
          name: "Hazelnut Praline & Roasted Fig Tart",
          displayName: "Hazelnut Praline Fig Tart",
          description:
            "Giresun hazelnut praline base topped with oven-roasted black figs and light vanilla cream.",
        },
      },
    },
    // Yayından kaldırılmış ürün: misafir menüsünde filtrelenir ve gösterilmez
    {
      id: "item-visneli-tart-gizli",
      businessId: BUSINESS_ID,
      categoryId: "cat-tatli",
      name: "Mevsimlik Vişneli Galette (Yayında Değil)",
      description: "Bu ürün yayından kaldırıldığı için misafirlere gösterilmez.",
      priceKurus: 22000,
      image: null,
      isPublished: false,
      sortOrder: 3,
    },
  ],
};
