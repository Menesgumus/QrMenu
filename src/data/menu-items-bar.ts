import type { MenuItem } from "@/types/menu";
import { BUSINESS_ID } from "./menu-categories";

/**
 * Categories 7-11: Hot Coffee, Iced Coffee, Tea & Hot Chocolate, Cold Drinks, and Desserts.
 */
export const BAR_AND_PASTRY_MENU_ITEMS: MenuItem[] = [
  // Kategori 7: Nitelikli Sıcak Kahveler (8 ürün)
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
  {
    id: "item-double-espresso",
    businessId: BUSINESS_ID,
    categoryId: "cat-sicak-kahve",
    name: "Double Espresso",
    description:
      "Taze çekilmiş mevsim harmanından yoğun kremalı çift shot espresso (60 ml).",
    priceKurus: 11500,
    image: {
      thumbUrl: "/images/menu/thumbs/double-espresso.webp",
      gridUrl: "/images/menu/grid/double-espresso.webp",
      fullUrl: "/images/menu/full/double-espresso.webp",
      alt: "Espresso makinesinden cam bardağa akan yoğun kremalı çift shot espresso",
      altEn:
        "Rich crema double espresso pulling from the portafilter into a clear glass",
      width: 800,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 5,
    translations: {
      en: {
        name: "Double Espresso",
        description:
          "Freshly pulled double shot of our seasonal house espresso blend with rich golden crema (60 ml).",
      },
    },
  },
  {
    id: "item-americano",
    businessId: BUSINESS_ID,
    categoryId: "cat-sicak-kahve",
    name: "Americano",
    description:
      "Çift shot espresso üzerine dengeli sıcaklıkta arıtılmış sıcak su (240 ml).",
    priceKurus: 13500,
    image: {
      thumbUrl: "/images/menu/thumbs/americano.webp",
      gridUrl: "/images/menu/grid/americano.webp",
      fullUrl: "/images/menu/full/americano.webp",
      alt: "Beyaz porselen fincan ve altlığında ince buharlı taze Americano",
      altEn: "Steaming fresh hot Americano in a white porcelain cup and saucer",
      width: 800,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 6,
    translations: {
      en: {
        name: "Americano",
        description:
          "Double shot of espresso lengthened with hot filtered water for a clean, balanced cup (240 ml).",
      },
    },
  },
  {
    id: "item-cappuccino",
    businessId: BUSINESS_ID,
    categoryId: "cat-sicak-kahve",
    name: "Cappuccino",
    description:
      "Çift shot espresso, ısıtılmış günlük süt ve kalın kadifemsi mikro süt köpüğü (180 ml).",
    priceKurus: 15000,
    image: {
      thumbUrl: "/images/menu/thumbs/cappuccino.webp",
      gridUrl: "/images/menu/grid/cappuccino.webp",
      fullUrl: "/images/menu/full/cappuccino.webp",
      alt: "Beyaz seramik fincanda kalın mikro süt köpüklü cappuccino",
      altEn:
        "White ceramic cup of cappuccino topped with rich velvety milk foam",
      width: 1200,
      height: 800,
    },
    isPublished: true,
    sortOrder: 7,
    translations: {
      en: {
        name: "Cappuccino",
        description:
          "Double shot of espresso topped with steamed fresh milk and a thick velvety micro-foam layer (180 ml).",
      },
    },
  },
  {
    id: "item-caffe-latte",
    businessId: BUSINESS_ID,
    categoryId: "cat-sicak-kahve",
    name: "Caffè Latte",
    description:
      "Çift shot espresso üzerine ipeksi buharda pişmiş bol günlük süt ve ince süt köpüğü (240 ml).",
    priceKurus: 15500,
    image: {
      thumbUrl: "/images/menu/thumbs/caffe-latte.webp",
      gridUrl: "/images/menu/grid/caffe-latte.webp",
      fullUrl: "/images/menu/full/caffe-latte.webp",
      alt: "Fincan altlığında latte art desenli porselen caffè latte fincanı",
      altEn: "Porcelain cup of caffè latte with tulip latte art on a saucer",
      width: 1200,
      height: 900,
    },
    isPublished: true,
    sortOrder: 8,
    translations: {
      en: {
        name: "Caffè Latte",
        description:
          "Double shot of espresso blended with generous silky steamed milk and light latte art foam (240 ml).",
      },
    },
  },

  // Kategori 8: Soğuk Kahveler & Espresso İçecekleri (6 ürün)
  {
    id: "item-iced-americano",
    businessId: BUSINESS_ID,
    categoryId: "cat-buzlu-kahve",
    name: "Buzlu Americano (Iced Americano)",
    displayName: "Iced Americano",
    description:
      "Buz küpleri ve soğuk su üzerine taze çekilmiş çift shot espresso (300 ml).",
    priceKurus: 14500,
    image: {
      thumbUrl: "/images/menu/thumbs/iced-americano.webp",
      gridUrl: "/images/menu/grid/iced-americano.webp",
      fullUrl: "/images/menu/full/iced-americano.webp",
      alt: "Taş tezgâhta buz küpleriyle servis edilmiş koyu renkli iced americano bardağı",
      altEn: "Glass of iced Americano coffee over ice cubes on dark stone",
      width: 800,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 1,
    translations: {
      en: {
        name: "Iced Americano",
        description:
          "Freshly pulled double shot of espresso poured over crystal ice and chilled filtered water (300 ml).",
      },
    },
  },
  {
    id: "item-iced-latte",
    businessId: BUSINESS_ID,
    categoryId: "cat-buzlu-kahve",
    name: "Buzlu Latte (Iced Latte)",
    displayName: "Iced Latte",
    description:
      "Soğuk günlük süt ve buz küpleri üzerinde çift shot espresso akışı (300 ml).",
    priceKurus: 16500,
    image: {
      thumbUrl: "/images/menu/thumbs/iced-latte.webp",
      gridUrl: "/images/menu/grid/iced-latte.webp",
      fullUrl: "/images/menu/full/iced-latte.webp",
      alt: "Şeffaf bardakta soğuk süt ve buzla dalgalanan iced latte",
      altEn: "Chilled glass of iced latte showing rich espresso swirling into milk",
      width: 800,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 2,
    translations: {
      en: {
        name: "Iced Latte",
        description:
          "Chilled fresh milk over ice crowned with a freshly pulled double shot of espresso (300 ml).",
      },
    },
  },
  {
    id: "item-espresso-tonic",
    businessId: BUSINESS_ID,
    categoryId: "cat-buzlu-kahve",
    name: "Espresso Tonik",
    description:
      "Botanik tonik suyu ve bol buz üzerine eklenen tek kökenli çift shot espresso (280 ml).",
    priceKurus: 17500,
    image: {
      thumbUrl: "/images/menu/thumbs/espresso-tonic.webp",
      gridUrl: "/images/menu/grid/espresso-tonic.webp",
      fullUrl: "/images/menu/full/espresso-tonic.webp",
      alt: "Buzlu tonik suyuna dökülerek köpüren katmanlı espresso tonik bardağı",
      altEn:
        "Double espresso poured gently into chilled tonic water and ice in a glass",
      width: 800,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 3,
    translations: {
      en: {
        name: "Espresso Tonic",
        description:
          "Single-origin double espresso poured slowly over chilled botanical tonic water and ice (280 ml).",
      },
    },
  },
  {
    id: "item-iced-filter-coffee",
    businessId: BUSINESS_ID,
    categoryId: "cat-buzlu-kahve",
    name: "Buzlu V60 Filtre Kahve",
    displayName: "Buzlu Filtre Kahve",
    description:
      "Doğrudan buz üzerine demlenerek meyvemsi aromaları korunan Etiyopya filtre kahvesi (280 ml).",
    priceKurus: 16000,
    image: {
      thumbUrl: "/images/menu/thumbs/iced-filter-coffee.webp",
      gridUrl: "/images/menu/grid/iced-filter-coffee.webp",
      fullUrl: "/images/menu/full/iced-filter-coffee.webp",
      alt: "Cam bardakta buz küpleriyle berrak buzlu V60 siyah filtre kahve",
      altEn: "Clear Japanese-style iced filter coffee served over ice in a glass",
      width: 1200,
      height: 960,
    },
    isPublished: true,
    sortOrder: 4,
    translations: {
      en: {
        name: "Japanese-Style Iced Filter Coffee",
        displayName: "Iced Filter Coffee",
        description:
          "Ethiopian pour-over brewed directly over ice to lock in bright floral and citrus aromatics (280 ml).",
      },
    },
  },
  {
    id: "item-iced-mocha",
    businessId: BUSINESS_ID,
    categoryId: "cat-buzlu-kahve",
    name: "Buzlu Bitter Mocha",
    displayName: "Iced Mocha",
    description:
      "Bitter kakao ganajı, soğuk süt, buz ve çift shot espresso ile hazırlanır (300 ml).",
    priceKurus: 18000,
    image: {
      thumbUrl: "/images/menu/thumbs/iced-mocha.webp",
      gridUrl: "/images/menu/grid/iced-mocha.webp",
      fullUrl: "/images/menu/full/iced-mocha.webp",
      alt: "Soğuk süt dökülen buzlu bitter çikolatalı iced mocha bardakları",
      altEn: "Glasses of dark chocolate iced mocha being topped with cold milk",
      width: 865,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 5,
    translations: {
      en: {
        name: "Iced Dark Chocolate Mocha",
        displayName: "Iced Mocha",
        description:
          "Single-origin double espresso layered with dark cocoa ganache, chilled milk, and ice (300 ml).",
      },
    },
  },
  {
    id: "item-affogato",
    businessId: BUSINESS_ID,
    categoryId: "cat-buzlu-kahve",
    name: "Vanilyalı Gelato & Espresso Affogato",
    displayName: "Affogato",
    description:
      "Gerçek çubuk vanilyalı el yapımı dondurma (2 top) üzerine sıcak çift shot espresso.",
    priceKurus: 19000,
    image: {
      thumbUrl: "/images/menu/thumbs/affogato.webp",
      gridUrl: "/images/menu/grid/affogato.webp",
      fullUrl: "/images/menu/full/affogato.webp",
      alt: "Beyaz fincanda vanilyalı dondurma topunun üzerine dökülmüş sıcak espresso affogato",
      altEn:
        "Scoop of vanilla bean gelato drowned in hot espresso inside a porcelain cup",
      width: 1200,
      height: 800,
    },
    isPublished: true,
    sortOrder: 6,
    translations: {
      en: {
        name: "Vanilla Gelato & Espresso Affogato",
        displayName: "Affogato",
        description:
          "Two scoops of house-made Madagascar vanilla bean gelato drowned in hot double espresso.",
      },
    },
  },

  // Kategori 9: Çaylar, Bitki Demlemeleri & Sıcak Çikolata (6 ürün)
  {
    id: "item-rize-siyah-cay",
    businessId: BUSINESS_ID,
    categoryId: "cat-cay",
    name: "Rize İnce Belli Siyah Çay",
    displayName: "Rize Siyah Çay",
    description:
      "Bakır çaydanlıkta taze demlenmiş Rize birinci hasat siyah yaprak çay, ince belli bardakta (160 ml).",
    priceKurus: 8500,
    image: {
      thumbUrl: "/images/menu/thumbs/rize-siyah-cay.webp",
      gridUrl: "/images/menu/grid/rize-siyah-cay.webp",
      fullUrl: "/images/menu/full/rize-siyah-cay.webp",
      alt: "Ahşap masa üzerinde ince belli cam bardakta tavşan kanı Türk çayı",
      altEn: "Traditional tulip glass of deep crimson brewed Turkish black tea",
      width: 1194,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 1,
    translations: {
      en: {
        name: "Brewed Rize Black Tea (Tulip Glass)",
        displayName: "Rize Black Tea",
        description:
          "First-harvest Rize black leaf tea freshly steeped in a pot, served in a traditional tulip glass (160 ml).",
      },
    },
  },
  {
    id: "item-earl-grey-cay",
    businessId: BUSINESS_ID,
    categoryId: "cat-cay",
    name: "Bergamotlu Earl Grey Yaprak Çay",
    displayName: "Earl Grey Çay",
    description:
      "Soğuk sıkım Akdeniz bergamotu ile harmanlanmış dökme siyah çay yaprakları (280 ml cam fincan).",
    priceKurus: 11500,
    image: {
      thumbUrl: "/images/menu/thumbs/earl-grey-cay.webp",
      gridUrl: "/images/menu/grid/earl-grey-cay.webp",
      fullUrl: "/images/menu/full/earl-grey-cay.webp",
      alt: "Şeffaf cam fincanda sıcak kehribar renkli Earl Grey siyah çay",
      altEn: "Warm amber brewed Earl Grey black tea in a clear glass teacup",
      width: 800,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 2,
    translations: {
      en: {
        name: "Bergamot Loose-Leaf Earl Grey Tea",
        displayName: "Earl Grey Tea",
        description:
          "Loose-leaf black tea infused with cold-pressed Mediterranean bergamot oil, steeped fresh to order (280 ml).",
      },
    },
  },
  {
    id: "item-ihlamur-nane-cayi",
    businessId: BUSINESS_ID,
    categoryId: "cat-cay",
    name: "Taze Naneli & Ihlamurlu Bitki Demlemesi",
    displayName: "Ihlamur & Taze Nane",
    description:
      "Bütün çiçek ihlamur, taze bahçe nanesi yaprakları ve ince limon kabuğu ile sıcak demleme (280 ml).",
    priceKurus: 12500,
    image: {
      thumbUrl: "/images/menu/thumbs/ihlamur-nane-cayi.webp",
      gridUrl: "/images/menu/grid/ihlamur-nane-cayi.webp",
      fullUrl: "/images/menu/full/ihlamur-nane-cayi.webp",
      alt: "Cam kupada taze nane yapraklarıyla demlenmiş sıcak bitki çayı",
      altEn:
        "Clear glass mug of steeped whole fresh mint leaves and linden herbal tea",
      width: 798,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 3,
    translations: {
      en: {
        name: "Linden Blossom & Fresh Mint Herbal Tea",
        displayName: "Linden & Fresh Mint",
        description:
          "Whole dried linden blossoms steeped with fresh garden mint leaves and a twist of lemon peel (280 ml).",
      },
    },
  },
  {
    id: "item-chai-tea-latte",
    businessId: BUSINESS_ID,
    categoryId: "cat-cay",
    name: "Baharatlı Chai Tea Latte",
    displayName: "Chai Tea Latte",
    description:
      "Zencefil, kakule, karanfil ve yıldız anasonla demlenmiş Assam çayı, buharda süt ve tarçın tozu ile (240 ml).",
    priceKurus: 15500,
    image: {
      thumbUrl: "/images/menu/thumbs/chai-tea-latte.webp",
      gridUrl: "/images/menu/grid/chai-tea-latte.webp",
      fullUrl: "/images/menu/full/chai-tea-latte.webp",
      alt: "Koyu seramik kupada tarçın serpilmiş köpüklü sıcak chai tea latte",
      altEn:
        "Foamy spiced black tea chai latte dusted with cinnamon in a dark stoneware mug",
      width: 1200,
      height: 900,
    },
    isPublished: true,
    sortOrder: 4,
    translations: {
      en: {
        name: "Spiced Black Tea Chai Latte",
        displayName: "Chai Tea Latte",
        description:
          "Assam black tea brewed with ginger, cardamom, clove, and star anise, topped with steamed milk and cinnamon (240 ml).",
      },
    },
  },
  {
    id: "item-matcha-latte",
    businessId: BUSINESS_ID,
    categoryId: "cat-cay",
    name: "Matcha Latte",
    description:
      "Bambu çırpıcıyla hazırlanmış ince öğütülmüş Uji yeşil çay tozu ve ipeksi köpürtülmüş süt (240 ml).",
    priceKurus: 16500,
    image: {
      thumbUrl: "/images/menu/thumbs/matcha-latte.webp",
      gridUrl: "/images/menu/grid/matcha-latte.webp",
      fullUrl: "/images/menu/full/matcha-latte.webp",
      alt: "Ahşap masada seramik fincan içinde süt köpüğü desenli yeşil matcha latte",
      altEn:
        "Steamed green matcha latte with rosetta milk foam in a ceramic mug on wood",
      width: 1200,
      height: 800,
    },
    isPublished: true,
    sortOrder: 5,
    translations: {
      en: {
        name: "Matcha Latte",
        description:
          "Whisked fine-milled Uji green matcha poured over silky micro-foamed milk (240 ml).",
      },
    },
  },
  {
    id: "item-bitter-sicak-cikolata",
    businessId: BUSINESS_ID,
    categoryId: "cat-cay",
    name: "%70 Bitter Kuvertür Sıcak Çikolata",
    displayName: "Bitter Sıcak Çikolata",
    description:
      "Sütle eritilmiş gerçek %70 bitter kuvertür çikolata, kakao köpüğü ve bir tutam deniz tuzu ile (220 ml).",
    priceKurus: 16000,
    image: {
      thumbUrl: "/images/menu/thumbs/bitter-sicak-cikolata.webp",
      gridUrl: "/images/menu/grid/bitter-sicak-cikolata.webp",
      fullUrl: "/images/menu/full/bitter-sicak-cikolata.webp",
      alt: "Ahşap tahta üzerinde koyu kakao köpüklü sıcak çikolata kupası",
      altEn: "Rich foamy dark hot chocolate served in an olive stoneware mug",
      width: 1200,
      height: 798,
    },
    isPublished: true,
    sortOrder: 6,
    translations: {
      en: {
        name: "70% Single-Origin Dark Hot Chocolate",
        displayName: "Dark Hot Chocolate",
        description:
          "Rich 70% melted dark couverture chocolate whisked into steamed milk with cocoa foam and flaky sea salt (220 ml).",
      },
    },
  },

  // Kategori 10: Soğuk İçecekler & Limonatalar (6 ürün)
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
  {
    id: "item-naneli-limonata",
    businessId: BUSINESS_ID,
    categoryId: "cat-soguk",
    name: "Taze Naneli Ev Yapımı Limonata",
    displayName: "Naneli Limonata",
    description:
      "Günlük sıkım Aydın limonu, dövülmüş taze bahçe nanesi ve hafif şeker kamışı şurubu (330 ml).",
    priceKurus: 13500,
    image: {
      thumbUrl: "/images/menu/thumbs/naneli-limonata.webp",
      gridUrl: "/images/menu/grid/naneli-limonata.webp",
      fullUrl: "/images/menu/full/naneli-limonata.webp",
      alt: "Limon dilimleri yanında taze nane yapraklı ev yapımı buzlu limonata bardağı",
      altEn:
        "Glass of fresh house-made mint lemonade beside sliced yellow lemons",
      width: 1200,
      height: 800,
    },
    isPublished: true,
    sortOrder: 4,
    translations: {
      en: {
        name: "Fresh Mint House-Made Lemonade",
        displayName: "Mint Lemonade",
        description:
          "Freshly pressed Aydın lemons muddled with crisp garden mint leaves and light cane syrup over ice (330 ml).",
      },
    },
  },
  {
    id: "item-cilekli-limonata",
    businessId: BUSINESS_ID,
    categoryId: "cat-soguk",
    name: "Çilekli & Taze Kekikli Limonata",
    displayName: "Çilekli Limonata",
    description:
      "Ezilmiş taze çilek püresi, sıkma limon suyu, taze kekik dalı ve buz ile ferahlatıcı içecek (330 ml).",
    priceKurus: 14500,
    image: {
      thumbUrl: "/images/menu/thumbs/cilekli-limonata.webp",
      gridUrl: "/images/menu/grid/cilekli-limonata.webp",
      fullUrl: "/images/menu/full/cilekli-limonata.webp",
      alt: "Uzun cam bardakta çilek dilimleri, taze kekik ve buzla servis edilen limonata",
      altEn:
        "Tall glass of muddled strawberry and fresh thyme lemonade over ice",
      width: 814,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 5,
    translations: {
      en: {
        name: "Muddled Strawberry & Thyme Lemonade",
        displayName: "Strawberry Lemonade",
        description:
          "Hand-crushed ripe strawberries, freshly squeezed lemon juice, a sprig of thyme, and ice (330 ml).",
      },
    },
  },
  {
    id: "item-hibiskus-soguk-cay",
    businessId: BUSINESS_ID,
    categoryId: "cat-soguk",
    name: "Hibiskus & Kurutulmuş Turunç Soğuk Çayı",
    displayName: "Hibiskus Soğuk Çay",
    description:
      "Soğuk demlenmiş yakut kırmızısı hibiskus çiçeği, karanfil ve kurutulmuş portakal dilimi (330 ml).",
    priceKurus: 14000,
    image: {
      thumbUrl: "/images/menu/thumbs/hibiskus-soguk-cay.webp",
      gridUrl: "/images/menu/grid/hibiskus-soguk-cay.webp",
      fullUrl: "/images/menu/full/hibiskus-soguk-cay.webp",
      alt: "Yakut renginde kurutulmuş turunç ve buz küpleriyle hibiskus soğuk çay bardakları",
      altEn:
        "Ruby-colored chilled hibiscus iced tea garnished with dried citrus",
      width: 800,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 6,
    translations: {
      en: {
        name: "Chilled Hibiscus & Dried Citrus Iced Tea",
        displayName: "Hibiscus Iced Tea",
        description:
          "Cold-steeped ruby hibiscus blossoms accented with whole clove and dried orange slice over ice (330 ml).",
      },
    },
  },

  // Kategori 11: Günlük Tatlılar & Pastalar (7 yayında ürün + 1 gizli ürün)
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
  {
    id: "item-ev-yapimi-tiramisu",
    businessId: BUSINESS_ID,
    categoryId: "cat-tatli",
    name: "Espresso Islatmalı Ev Yapımı Tiramisu",
    displayName: "Ev Yapımı Tiramisu",
    description:
      "Taze demlenmiş espressoya batırılmış kedi dili bisküvi katmanları, mascarpone kreması ve bitter kakao tozu (160 g).",
    priceKurus: 23500,
    image: {
      thumbUrl: "/images/menu/thumbs/ev-yapimi-tiramisu.webp",
      gridUrl: "/images/menu/grid/ev-yapimi-tiramisu.webp",
      fullUrl: "/images/menu/full/ev-yapimi-tiramisu.webp",
      alt: "Oluklu cam servis kabında üzeri bitter kakao kaplı ev yapımı tiramisu",
      altEn: "House-made mascarpone tiramisu dusted with dark cocoa in a glass dish",
      width: 800,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 3,
    translations: {
      en: {
        name: "House-Made Mascarpone & Espresso Tiramisu",
        displayName: "House Tiramisu",
        description:
          "Savoiardi biscuits soaked in fresh espresso layered with whipped mascarpone cream and Dutch dark cocoa (160 g).",
      },
    },
  },
  {
    id: "item-limonlu-mereng-tart",
    businessId: BUSINESS_ID,
    categoryId: "cat-tatli",
    name: "Limon Kremalı & Yanık Merengli Tart",
    displayName: "Limonlu Mereng Tart",
    description:
      "Gevrek tart tabanı içinde ekşimsi taze limon dolgusu ve alevle karamelize İtalyan merengi (1 dilim).",
    priceKurus: 22500,
    image: {
      thumbUrl: "/images/menu/thumbs/limonlu-mereng-tart.webp",
      gridUrl: "/images/menu/grid/limonlu-mereng-tart.webp",
      fullUrl: "/images/menu/full/limonlu-mereng-tart.webp",
      alt: "Beyaz tabakta üzeri hafifçe yakılmış burgu merengli limonlu tart",
      altEn: "Zesty lemon curd tart topped with swirled toasted meringue",
      width: 1021,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 4,
    translations: {
      en: {
        name: "Zesty Lemon Curd & Toasted Meringue Tart",
        displayName: "Lemon Meringue Tart",
        description:
          "Crisp butter pastry shell filled with tangy fresh lemon curd and torched Italian meringue peaks (1 slice).",
      },
    },
  },
  {
    id: "item-fistikli-brownie",
    businessId: BUSINESS_ID,
    categoryId: "cat-tatli",
    name: "Antep Fıstıklı Bitter Çikolatalı Brownie",
    displayName: "Antep Fıstıklı Brownie",
    description:
      "Nemli dokulu %70 bitter çikolatalı fırın brownie dilimi, iri kırılmış kavrulmuş Antep fıstığı ile servis edilir.",
    priceKurus: 21000,
    image: {
      thumbUrl: "/images/menu/thumbs/fistikli-brownie.webp",
      gridUrl: "/images/menu/grid/fistikli-brownie.webp",
      fullUrl: "/images/menu/full/fistikli-brownie.webp",
      alt: "Beyaz tabakta üst üste dizilmiş kırık Antep fıstıklı bitter çikolatalı brownie",
      altEn:
        "Fudgy dark chocolate brownies topped with chopped roasted pistachios",
      width: 1200,
      height: 800,
    },
    isPublished: true,
    sortOrder: 5,
    translations: {
      en: {
        name: "Pistachio & 70% Dark Chocolate Fudge Brownie",
        displayName: "Pistachio Brownie",
        description:
          "Dense fudgy 70% dark chocolate brownie square crowned with coarsely chopped roasted pistachios.",
      },
    },
  },
  {
    id: "item-havuclu-cevizli-kek",
    businessId: BUSINESS_ID,
    categoryId: "cat-tatli",
    name: "Tarçınlı Havuçlu & Cevizli Krem Peynirli Kek",
    displayName: "Havuçlu Cevizli Kek",
    description:
      "Rendelenmiş taze havuç, Anadolu cevizi ve tarçınlı iki kat kek; limon kabuklu krem peynir glazürü ile (1 dilim).",
    priceKurus: 19500,
    image: {
      thumbUrl: "/images/menu/thumbs/havuclu-cevizli-kek.webp",
      gridUrl: "/images/menu/grid/havuclu-cevizli-kek.webp",
      fullUrl: "/images/menu/full/havuclu-cevizli-kek.webp",
      alt: "Krem peynir dolgulu iki kat baharatlı havuçlu ve cevizli kek dilimi",
      altEn:
        "Slice of layered spiced carrot walnut cake frosted with cream cheese icing",
      width: 800,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 6,
    translations: {
      en: {
        name: "Spiced Carrot, Walnut & Cream Cheese Cake",
        displayName: "Carrot Walnut Cake",
        description:
          "Two layers of spiced fresh carrot and Anatolian walnut sponge finished with lemon cream-cheese frosting (1 slice).",
      },
    },
  },
  {
    id: "item-yaban-mersinli-crumble",
    businessId: BUSINESS_ID,
    categoryId: "cat-tatli",
    name: "Yaban Mersinli Kıtır Badem Crumble",
    displayName: "Yaban Mersinli Crumble",
    description:
      "Fırından yeni çıkmış yaban mersini kompotosu üzerinde yulaflı ve bademli tereyağlı kıtır kırıntı katmanı (1 porsiyon).",
    priceKurus: 21500,
    image: {
      thumbUrl: "/images/menu/thumbs/yaban-mersinli-crumble.webp",
      gridUrl: "/images/menu/grid/yaban-mersinli-crumble.webp",
      fullUrl: "/images/menu/full/yaban-mersinli-crumble.webp",
      alt: "Taze yaban mersinleri ve altın kıtır kırıntı katmanıyla sıcak crumble dilimi",
      altEn:
        "Warm blueberry crumble square topped with golden baked oat and almond crumbs",
      width: 900,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 7,
    translations: {
      en: {
        name: "Warm Wild Blueberry & Almond Oat Crumble",
        displayName: "Blueberry Crumble",
        description:
          "Warm wild blueberry compote baked under a crisp golden butter-oat and almond crumble topping (1 portion).",
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
    sortOrder: 8,
  },
];
