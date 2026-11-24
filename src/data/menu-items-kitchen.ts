import type { MenuItem } from "@/types/menu";
import { BUSINESS_ID } from "./menu-categories";

/**
 * Categories 1-6: Breakfast, Bakery, Sandwiches, Salads, Warm Plates, and Shareables.
 */
export const KITCHEN_MENU_ITEMS: MenuItem[] = [
  // Kategori 1: Sabah Fırınından Ekşi Mayalı Sıcak Tabaklar (6 ürün)
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
  {
    id: "item-avokado-pose-yumurta",
    businessId: BUSINESS_ID,
    categoryId: "cat-sabah",
    name: "Avokado Ezme & Çift Poşe Yumurtalı Ekşi Maya",
    displayName: "Avokado & Poşe Yumurta",
    description:
      "Taş fırın ekşi maya dilimi üzerinde limonlu avokado ezme, 2 adet köy yumurtası poşe, çörek otu ve taze dereotu.",
    priceKurus: 28500,
    image: {
      thumbUrl: "/images/menu/thumbs/avokado-pose-yumurta.webp",
      gridUrl: "/images/menu/grid/avokado-pose-yumurta.webp",
      fullUrl: "/images/menu/full/avokado-pose-yumurta.webp",
      alt: "Kızarmış ekşi maya ekmeği üzerinde avokado ezmesi ve iki poşe yumurta",
      altEn: "Smashed avocado and two poached eggs on toasted sourdough bread",
      width: 800,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 5,
    translations: {
      en: {
        name: "Smashed Avocado & Double Poached Eggs on Sourdough",
        displayName: "Avocado & Poached Eggs",
        description:
          "Stone-oven sourdough slice topped with lemon smashed avocado, 2 poached farm eggs, nigella seeds, and fresh dill.",
      },
    },
  },
  {
    id: "item-sahanda-menemen",
    businessId: BUSINESS_ID,
    categoryId: "cat-sabah",
    name: "Bakır Sahanda Domatesli & Biberli Menemen",
    displayName: "Sahanda Menemen",
    description:
      "Çanakkale domatesi, çarliston biber ve 2 köy yumurtası ile ağır ateşte pişirilir; yanında 2 dilim kızarmış ekşi maya ile.",
    priceKurus: 24500,
    image: {
      thumbUrl: "/images/menu/thumbs/sahanda-menemen.webp",
      gridUrl: "/images/menu/grid/sahanda-menemen.webp",
      fullUrl: "/images/menu/full/sahanda-menemen.webp",
      alt: "Toprak sahanda taze biber ve domatesle pişirilmiş menemen",
      altEn:
        "Turkish menemen cooked with tomatoes, green peppers, and farm eggs in an earthen pan",
      width: 752,
      height: 599,
    },
    isPublished: true,
    sortOrder: 6,
    translations: {
      en: {
        name: "Skillet Turkish Menemen with Tomatoes & Peppers",
        displayName: "Skillet Menemen",
        description:
          "Slow-simmered Çanakkale tomatoes, green peppers, and 2 farm eggs served with 2 slices of toasted sourdough.",
      },
    },
  },

  // Kategori 2: Fırından Günlük Ekmek & Hamur İşleri (7 ürün)
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
  {
    id: "item-bademli-kruvasan",
    businessId: BUSINESS_ID,
    categoryId: "cat-firin",
    name: "Badem Kremalı & Pudra Şekerli Kruvasan",
    displayName: "Bademli Kruvasan",
    description:
      "Fırınlanmış badem frangipane dolgulu tereyağlı kruvasan (1 adet), kavrulmuş file badem ve hafif pudra şekeri ile.",
    priceKurus: 15500,
    image: {
      thumbUrl: "/images/menu/thumbs/bademli-kruvasan.webp",
      gridUrl: "/images/menu/grid/bademli-kruvasan.webp",
      fullUrl: "/images/menu/full/bademli-kruvasan.webp",
      alt: "Üzeri file badem ve pudra şekeri kaplı altın rengi bademli kruvasan",
      altEn:
        "Golden almond croissant topped with roasted sliced almonds and powdered sugar",
      width: 1200,
      height: 900,
    },
    isPublished: true,
    sortOrder: 4,
    translations: {
      en: {
        name: "Almond Cream & Sliced Almond Croissant",
        displayName: "Almond Croissant",
        description:
          "Butter croissant (1 pc) filled with baked almond frangipane cream, topped with roasted sliced almonds and powdered sugar.",
      },
    },
  },
  {
    id: "item-pain-au-chocolat",
    businessId: BUSINESS_ID,
    categoryId: "cat-firin",
    name: "Bitter Çikolatalı Pain au Chocolat",
    displayName: "Pain au Chocolat",
    description:
      "Katmanlı Fransız tereyağlı hamur içinde iki çubuk %70 Belçika bitter çikolata (1 adet, 95 g).",
    priceKurus: 15000,
    image: {
      thumbUrl: "/images/menu/thumbs/pain-au-chocolat.webp",
      gridUrl: "/images/menu/grid/pain-au-chocolat.webp",
      fullUrl: "/images/menu/full/pain-au-chocolat.webp",
      alt: "Kat kat kızarmış bitter çikolatalı pain au chocolat hamur işi",
      altEn: "Flaky laminated dark chocolate pain au chocolat pastry",
      width: 1200,
      height: 831,
    },
    isPublished: true,
    sortOrder: 5,
    translations: {
      en: {
        name: "Dark Chocolate Pain au Chocolat",
        displayName: "Pain au Chocolat",
        description:
          "Flaky laminated butter pastry baked around two bars of 70% dark Belgian chocolate (1 pc, 95 g).",
      },
    },
  },
  {
    id: "item-tarcinli-kakuleli-corek",
    businessId: BUSINESS_ID,
    categoryId: "cat-firin",
    name: "Tarçınlı & Taze Kakuleli İsveç Çöreği",
    displayName: "Tarçınlı Kakuleli Çörek",
    description:
      "Taze çekilmiş yeşil kakule ve Seylan tarçını dolgulu yumuşak brioche hamuru, inci şeker serpilmiş (1 adet).",
    priceKurus: 14000,
    image: {
      thumbUrl: "/images/menu/thumbs/tarcinli-kakuleli-corek.webp",
      gridUrl: "/images/menu/grid/tarcinli-kakuleli-corek.webp",
      fullUrl: "/images/menu/full/tarcinli-kakuleli-corek.webp",
      alt: "Altın rengi kızarmış sarmal tarçınlı ve kakuleli çörekler",
      altEn: "Golden swirled cinnamon and cardamom rolls on a plate",
      width: 1200,
      height: 900,
    },
    isPublished: true,
    sortOrder: 6,
    translations: {
      en: {
        name: "Cinnamon & Crushed Cardamom Swirl Bun",
        displayName: "Cardamom Cinnamon Bun",
        description:
          "Soft brioche swirl bun filled with freshly crushed green cardamom and Ceylon cinnamon, finished with pearl sugar (1 pc).",
      },
    },
  },
  {
    id: "item-cekirdekli-baget",
    businessId: BUSINESS_ID,
    categoryId: "cat-firin",
    name: "Taş Fırın Ekşi Mayalı Köy Bageti",
    displayName: "Ekşi Mayalı Baget",
    description:
      "18 saat soğuk fermante çıtır kabuklu ekşi maya baget (280 g bütün veya dilimli), çırpılmış deniz tuzlu tereyağı ile.",
    priceKurus: 13000,
    image: {
      thumbUrl: "/images/menu/thumbs/cekirdekli-baget.webp",
      gridUrl: "/images/menu/grid/cekirdekli-baget.webp",
      fullUrl: "/images/menu/full/cekirdekli-baget.webp",
      alt: "Ahşap kesme tahtası üzerinde çıtır kabuklu ekşi mayalı baget ekmeği",
      altEn: "Crusty stone-oven sourdough baguette on a wooden board",
      width: 900,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 7,
    translations: {
      en: {
        name: "Stone-Oven Sourdough Baguette",
        displayName: "Sourdough Baguette",
        description:
          "18-hour cold-fermented crusty sourdough baguette (280 g whole or sliced), served with whipped sea-salt butter.",
      },
    },
  },

  // Kategori 3: Artizan Tostlar & Sandviçler (6 ürün)
  {
    id: "item-fume-hindi-sandvic",
    businessId: BUSINESS_ID,
    categoryId: "cat-sandvic",
    name: "Füme Hindi & Avokadolu Ekşi Maya Sandviç",
    displayName: "Füme Hindi Sandviç",
    description:
      "İki yarım ekşi maya dilimi arasında 90 g tütsülenmiş hindi göğsü, taze avokado, yeşil elma hardalı ve çıtır yeşillik.",
    priceKurus: 26500,
    image: {
      thumbUrl: "/images/menu/thumbs/fume-hindi-sandvic.webp",
      gridUrl: "/images/menu/grid/fume-hindi-sandvic.webp",
      fullUrl: "/images/menu/full/fume-hindi-sandvic.webp",
      alt: "Ahşap tahtada ikiye bölünmüş füme hindi ve taze yeşillikli ekşi maya sandviç",
      altEn:
        "Halved smoked turkey and fresh greens sourdough sandwich on a cutting board",
      width: 1200,
      height: 728,
    },
    isPublished: true,
    sortOrder: 1,
    translations: {
      en: {
        name: "Smoked Turkey & Avocado Sourdough Sandwich",
        displayName: "Smoked Turkey Sandwich",
        description:
          "Between two half slices of sourdough: 90 g smoked turkey breast, sliced avocado, green apple mustard, and crisp greens.",
      },
    },
  },
  {
    id: "item-mozzarella-pesto-ciabatta",
    businessId: BUSINESS_ID,
    categoryId: "cat-sandvic",
    name: "Taze Mozzarella & Fesleğen Pestolu Ciabatta",
    displayName: "Mozzarella Pesto Ciabatta",
    description:
      "Tosta basılmış ekşi mayalı ciabatta içinde erimiş manda mozzarellası, ev yapımı fesleğen pesto ve dilim domates.",
    priceKurus: 25500,
    image: {
      thumbUrl: "/images/menu/thumbs/mozzarella-pesto-ciabatta.webp",
      gridUrl: "/images/menu/grid/mozzarella-pesto-ciabatta.webp",
      fullUrl: "/images/menu/full/mozzarella-pesto-ciabatta.webp",
      alt: "Kızarmış ciabatta içinde erimiş mozzarella peyniri, domates ve pesto sos",
      altEn:
        "Pressed ciabatta sandwich with melted mozzarella, tomato, and green basil pesto",
      width: 1200,
      height: 675,
    },
    isPublished: true,
    sortOrder: 2,
    translations: {
      en: {
        name: "Warm Mozzarella, Tomato & Basil Pesto Ciabatta",
        displayName: "Mozzarella Pesto Ciabatta",
        description:
          "Pressed warm ciabatta filled with melted buffalo mozzarella, house-made basil pesto, and sliced tomato.",
      },
    },
  },
  {
    id: "item-izgara-sebze-focaccia",
    businessId: BUSINESS_ID,
    categoryId: "cat-sandvic",
    name: "Izgara Sebzeli & Keçi Peynirli Focaccia Sandviç",
    displayName: "Izgara Sebzeli Sandviç",
    description:
      "Izgara patlıcan, kabak, köz kapya biber, taze roka ve kekikli çırpılmış keçi peyniri ile ikiye bölünmüş sıcak sandviç.",
    priceKurus: 24500,
    image: {
      thumbUrl: "/images/menu/thumbs/izgara-sebze-focaccia.webp",
      gridUrl: "/images/menu/grid/izgara-sebze-focaccia.webp",
      fullUrl: "/images/menu/full/izgara-sebze-focaccia.webp",
      alt: "İkiye bölünmüş artizan ekmekte ızgara sebze, kapya biber ve roka sandviç",
      altEn:
        "Halved artisan bread sandwich filled with char-grilled vegetables, peppers, and arugula",
      width: 963,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 3,
    translations: {
      en: {
        name: "Grilled Vegetable & Goat Cheese Focaccia Sandwich",
        displayName: "Grilled Veggie Sandwich",
        description:
          "Warm halved artisan bread layered with char-grilled eggplant, zucchini, roasted red peppers, baby arugula, and whipped herbed goat cheese.",
      },
    },
  },
  {
    id: "item-fume-somon-bagel",
    businessId: BUSINESS_ID,
    categoryId: "cat-sandvic",
    name: "Füme Somon & Dereotlu Krem Peynirli Bagel",
    displayName: "Füme Somonlu Bagel",
    description:
      "Susamlı haşlanmış bagel içinde 75 g soğuk füme Norveç somonu, dereotlu krem peynir, ince kırmızı soğan ve körpe yeşillik.",
    priceKurus: 32500,
    image: {
      thumbUrl: "/images/menu/thumbs/fume-somon-bagel.webp",
      gridUrl: "/images/menu/grid/fume-somon-bagel.webp",
      fullUrl: "/images/menu/full/fume-somon-bagel.webp",
      alt: "Susamlı bagel, füme somon dilimleri, kırmızı soğan ve krem peynir tabağı",
      altEn:
        "Sesame bagel served with cold-smoked salmon, cream cheese, red onion, and greens",
      width: 1200,
      height: 900,
    },
    isPublished: true,
    sortOrder: 4,
    translations: {
      en: {
        name: "Smoked Salmon & Herbed Cream Cheese Bagel",
        displayName: "Smoked Salmon Bagel",
        description:
          "Sesame boiled bagel filled with 75 g cold-smoked Norwegian salmon, dill cream cheese, thinly sliced red onion, and crisp greens.",
      },
    },
  },
  {
    id: "item-roast-beef-baget",
    businessId: BUSINESS_ID,
    categoryId: "cat-sandvic",
    name: "Ağır Pişmiş Dana Roast Beef Baget",
    displayName: "Roast Beef Baget",
    description:
      "Çıtır Fransız baget içinde 100 g ince dilimlenmiş fırın dana bonfile, tane hardal, turşu ve yaban turpu kreması.",
    priceKurus: 34000,
    image: {
      thumbUrl: "/images/menu/thumbs/roast-beef-baget.webp",
      gridUrl: "/images/menu/grid/roast-beef-baget.webp",
      fullUrl: "/images/menu/full/roast-beef-baget.webp",
      alt: "Ahşap tahta üzerinde dana roast beef ve taze yeşillikli baget sandviç",
      altEn:
        "Sliced roast beef baguette sandwich topped with herbs and sauce on a wooden board",
      width: 1200,
      height: 800,
    },
    isPublished: true,
    sortOrder: 5,
    translations: {
      en: {
        name: "Slow-Roasted Beef & Horseradish Baguette",
        displayName: "Roast Beef Baguette",
        description:
          "Crisp baguette layered with 100 g thinly sliced roasted beef tenderloin, whole-grain mustard, pickles, and horseradish cream.",
      },
    },
  },
  {
    id: "item-yumurtali-brioche",
    businessId: BUSINESS_ID,
    categoryId: "cat-sandvic",
    name: "Brioche Ekmekte Çırpılmış Yumurta & Cheddar",
    displayName: "Yumurtalı Brioche",
    description:
      "Tereyağlı kızarmış brioche ekmeği arasında kremsi yumurta, erimiş cheddar peyniri ve hafif acılı fesleğen sos.",
    priceKurus: 22500,
    image: {
      thumbUrl: "/images/menu/thumbs/yumurtali-brioche.webp",
      gridUrl: "/images/menu/grid/yumurtali-brioche.webp",
      fullUrl: "/images/menu/full/yumurtali-brioche.webp",
      alt: "Altın rengi kızarmış brioche ekmek arasında kahvaltılık sıcak sandviç",
      altEn: "Warm golden brioche breakfast sandwich served on a cafe plate",
      width: 1200,
      height: 904,
    },
    isPublished: true,
    sortOrder: 6,
    translations: {
      en: {
        name: "Scrambled Egg & Aged Cheddar Brioche Bun",
        displayName: "Egg & Cheddar Brioche",
        description:
          "Toasted butter brioche bun filled with soft scrambled eggs, melted aged cheddar, and mildly spiced basil sauce.",
      },
    },
  },

  // Kategori 4: Mevsim Salataları & Kâseler (6 ürün)
  {
    id: "item-balkabagi-kinoa-kasesi",
    businessId: BUSINESS_ID,
    categoryId: "cat-salata",
    name: "Fırın Balkabağı, Renkli Kinoa & Avokado Kâsesi",
    displayName: "Balkabağı Kinoa Kâsesi",
    description:
      "Biberiyeli fırınlanmış bal kabağı dilimleri, üç renk kinoa, taze avokado, çeri domates, lahana turşusu ve kabak çekirdeği.",
    priceKurus: 29500,
    image: {
      thumbUrl: "/images/menu/thumbs/balkabagi-kinoa-kasesi.webp",
      gridUrl: "/images/menu/grid/balkabagi-kinoa-kasesi.webp",
      fullUrl: "/images/menu/full/balkabagi-kinoa-kasesi.webp",
      alt: "Lacivert kâsede fırın balkabağı, kinoa, avokado ve kabak çekirdeği",
      altEn:
        "Dark blue ceramic bowl with roasted squash, quinoa, avocado, and pumpkin seeds",
      width: 960,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 1,
    translations: {
      en: {
        name: "Roasted Pumpkin, Tri-Color Quinoa & Avocado Bowl",
        displayName: "Squash & Quinoa Bowl",
        description:
          "Rosemary-roasted pumpkin wedges, tri-color quinoa, fresh avocado, cherry tomatoes, pickled red cabbage, and toasted pumpkin seeds.",
      },
    },
  },
  {
    id: "item-tavuk-sezar-salata",
    businessId: BUSINESS_ID,
    categoryId: "cat-salata",
    name: "Izgara Tavuklu & Eski Parmesanlı Sezar Salata",
    displayName: "Izgara Tavuklu Sezar",
    description:
      "140 g ızgara tavuk göğsü, çıtır Yedikule marulu, ekşi maya krutonlar, ince rendelenmiş parmesan ve klasik Sezar sos.",
    priceKurus: 31000,
    image: {
      thumbUrl: "/images/menu/thumbs/tavuk-sezar-salata.webp",
      gridUrl: "/images/menu/grid/tavuk-sezar-salata.webp",
      fullUrl: "/images/menu/full/tavuk-sezar-salata.webp",
      alt: "Beyaz kâsede ızgara tavuk dilimleri, marul ve parmesan peynirli Sezar salata",
      altEn:
        "White bowl filled with grilled chicken breast, crisp romaine, and parmesan Caesar salad",
      width: 1200,
      height: 800,
    },
    isPublished: true,
    sortOrder: 2,
    translations: {
      en: {
        name: "Char-Grilled Chicken & Aged Parmesan Caesar",
        displayName: "Grilled Chicken Caesar",
        description:
          "140 g char-grilled chicken breast, crisp romaine lettuce, sourdough croutons, shaved aged parmesan, and classic Caesar dressing.",
      },
    },
  },
  {
    id: "item-burrata-domates-salata",
    businessId: BUSINESS_ID,
    categoryId: "cat-salata",
    name: "Taze Burrata, Çeri Domates & Fesleğen Salatası",
    displayName: "Burrata & Domates",
    description:
      "125 g günlük taze burrata, renkli bahçe domatesleri, yabani roka, balzamik sirke indirgemesi ve zeytinyağı.",
    priceKurus: 33500,
    image: {
      thumbUrl: "/images/menu/thumbs/burrata-domates-salata.webp",
      gridUrl: "/images/menu/grid/burrata-domates-salata.webp",
      fullUrl: "/images/menu/full/burrata-domates-salata.webp",
      alt: "Beyaz porselen tabakta burrata peyniri, roka yaprakları ve bahçe domatesi",
      altEn:
        "Fresh burrata cheese with heirloom tomatoes and wild greens on a white plate",
      width: 1200,
      height: 900,
    },
    isPublished: true,
    sortOrder: 3,
    translations: {
      en: {
        name: "Fresh Burrata, Heirloom Tomato & Rocket Salad",
        displayName: "Burrata & Tomato Salad",
        description:
          "125 g daily fresh burrata, seasonal garden tomatoes, wild arugula, aged balsamic glaze, and extra-virgin olive oil.",
      },
    },
  },
  {
    id: "item-narli-roka-salata",
    businessId: BUSINESS_ID,
    categoryId: "cat-salata",
    name: "Nar Taneli, Cevizli & Tulum Peynirli Roka Salatası",
    displayName: "Narlı Roka Salatası",
    description:
      "Körpe roka yaprakları, taze nar taneleri, kavrulmuş Anadolu cevizi, olgun beyaz peynir ve nar ekşili vinaigrette.",
    priceKurus: 27500,
    image: {
      thumbUrl: "/images/menu/thumbs/narli-roka-salata.webp",
      gridUrl: "/images/menu/grid/narli-roka-salata.webp",
      fullUrl: "/images/menu/full/narli-roka-salata.webp",
      alt: "Siyah taş tabakta nar taneleri, ceviz ve peynirli körpe roka salatası",
      altEn:
        "Arugula salad with pomegranate arils, walnuts, and crumbled white cheese",
      width: 801,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 4,
    translations: {
      en: {
        name: "Wild Arugula, Pomegranate, Walnut & Aged Cheese",
        displayName: "Pomegranate Arugula",
        description:
          "Tender arugula leaves, fresh pomegranate arils, toasted Anatolian walnuts, aged white cheese, and pomegranate molasses dressing.",
      },
    },
  },
  {
    id: "item-avokado-nohut-kase",
    businessId: BUSINESS_ID,
    categoryId: "cat-salata",
    name: "Fırın Nohut, Avokado & Tahin Soslu Kâse",
    displayName: "Avokado & Nohut Kâse",
    description:
      "Kimyonlu fırınlanmış nohut, yarım dilimlenmiş avokado, köz yeşil biber, çeri domates ve yanında limonlu tahin sos & pide.",
    priceKurus: 28500,
    image: {
      thumbUrl: "/images/menu/thumbs/avokado-nohut-kase.webp",
      gridUrl: "/images/menu/grid/avokado-nohut-kase.webp",
      fullUrl: "/images/menu/full/avokado-nohut-kase.webp",
      alt: "Siyah seramik kâsede dilim avokado, fırınlanmış nohut ve tahin sos",
      altEn:
        "Black ceramic bowl with sliced avocado, roasted chickpeas, and lemon-tahini dip",
      width: 855,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 5,
    translations: {
      en: {
        name: "Roasted Chickpea, Sliced Avocado & Tahini Bowl",
        displayName: "Avocado Chickpea Bowl",
        description:
          "Cumin-roasted chickpeas, half sliced avocado, blistered green pepper, and cherry tomatoes served with lemon-tahini dip and warm flatbread.",
      },
    },
  },
  {
    id: "item-hellim-akdeniz-salata",
    businessId: BUSINESS_ID,
    categoryId: "cat-salata",
    name: "Izgara Hellimli Akdeniz Yeşillikleri Salatası",
    displayName: "Hellimli Akdeniz Salata",
    description:
      "100 g ızgara Kıbrıs hellimi, marul ve roka karması, rendelenmiş havuç, salatalık, siyah zeytin ve kekikli limon sos.",
    priceKurus: 29500,
    image: {
      thumbUrl: "/images/menu/thumbs/hellim-akdeniz-salata.webp",
      gridUrl: "/images/menu/grid/hellim-akdeniz-salata.webp",
      fullUrl: "/images/menu/full/hellim-akdeniz-salata.webp",
      alt: "Izgara izli Kıbrıs hellimi, marul, havuç ve siyah zeytinli Akdeniz salatası",
      altEn:
        "Char-grilled halloumi cheese served over Mediterranean greens, carrots, and olives",
      width: 1200,
      height: 900,
    },
    isPublished: true,
    sortOrder: 6,
    translations: {
      en: {
        name: "Grilled Halloumi & Crisp Mediterranean Greens",
        displayName: "Grilled Halloumi Salad",
        description:
          "100 g char-grilled Cypriot halloumi, romaine and arugula mix, julienned carrot, cucumber, black olives, and oregano lemon dressing.",
      },
    },
  },

  // Kategori 5: Mutfaktan Sıcak Tabaklar (6 ürün)
  {
    id: "item-koz-domates-corba",
    businessId: BUSINESS_ID,
    categoryId: "cat-sicak",
    name: "Fırınlanmış Köz Domates & Fesleğen Çorbası",
    displayName: "Köz Domates Çorbası",
    description:
      "Fırında közlenmiş salkım domates, sarımsak ve taze fesleğen ile kadifemsi çorba (300 ml), zeytinyağı ve krema dokunuşuyla.",
    priceKurus: 17500,
    image: {
      thumbUrl: "/images/menu/thumbs/koz-domates-corba.webp",
      gridUrl: "/images/menu/grid/koz-domates-corba.webp",
      fullUrl: "/images/menu/full/koz-domates-corba.webp",
      alt: "Siyah seramik kâsede taze ot ve krema dokunuşlu köz domates çorbası",
      altEn:
        "Velvety roasted tomato soup topped with fresh herbs in a black ceramic bowl",
      width: 960,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 1,
    translations: {
      en: {
        name: "Roasted Tomato & Fresh Basil Bisque (300 ml)",
        displayName: "Roasted Tomato Soup",
        description:
          "Velvety bisque of oven-roasted vine tomatoes, sweet garlic, and fresh basil (300 ml), finished with olive oil and a cream swirl.",
      },
    },
  },
  {
    id: "item-mantarli-rigatoni",
    businessId: BUSINESS_ID,
    categoryId: "cat-sicak",
    name: "Kremalı İstiridye & Kültür Mantarlı Rigatoni",
    displayName: "Mantarlı Rigatoni",
    description:
      "Al dente kalın rigatoni makarna (280 g porsiyon), tereyağında sotelenmiş istiridye ve kültür mantarı, krema ve 24 aylık parmesan.",
    priceKurus: 34500,
    image: {
      thumbUrl: "/images/menu/thumbs/mantarli-rigatoni.webp",
      gridUrl: "/images/menu/grid/mantarli-rigatoni.webp",
      fullUrl: "/images/menu/full/mantarli-rigatoni.webp",
      alt: "Beyaz tabakta sotelenmiş mantar ve ince rendelenmiş parmesan ile kremalı rigatoni",
      altEn:
        "Creamy rigatoni pasta topped with roasted mushrooms and grated parmesan on a white plate",
      width: 1200,
      height: 857,
    },
    isPublished: true,
    sortOrder: 2,
    translations: {
      en: {
        name: "Creamy Roasted Mushroom & Parmesan Rigatoni",
        displayName: "Mushroom Rigatoni",
        description:
          "Al dente rigatoni (280 g portion) tossed with butter-seared oyster and button mushrooms, light cream sauce, and 24-month aged parmesan.",
      },
    },
  },
  {
    id: "item-izgara-tavuk-sebze",
    businessId: BUSINESS_ID,
    categoryId: "cat-sicak",
    name: "Izgara Tavuk Göğsü & Mevsim Sebze Tabağı",
    displayName: "Izgara Tavuk & Sebze",
    description:
      "Biberiyeli 200 g ızgara tavuk göğsü, ızgara kabak, taze yeşil fasulye, renkli kapya biber ve limon dilimleri ile servis edilir.",
    priceKurus: 36500,
    image: {
      thumbUrl: "/images/menu/thumbs/izgara-tavuk-sebze.webp",
      gridUrl: "/images/menu/grid/izgara-tavuk-sebze.webp",
      fullUrl: "/images/menu/full/izgara-tavuk-sebze.webp",
      alt: "Ahşap servis tahtasında ızgara tavuk göğsü, ızgara kabak, fasulye, biber ve limon",
      altEn:
        "Char-grilled chicken breast plated with grilled zucchini, green beans, peppers, and lemon",
      width: 1200,
      height: 801,
    },
    isPublished: true,
    sortOrder: 3,
    translations: {
      en: {
        name: "Char-Grilled Chicken Breast & Roasted Vegetables",
        displayName: "Grilled Chicken Plate",
        description:
          "200 g rosemary char-grilled chicken breast plated with grilled zucchini, tender green beans, bell peppers, and fresh lemon.",
      },
    },
  },
  {
    id: "item-ispanakli-ricotta-kis",
    businessId: BUSINESS_ID,
    categoryId: "cat-sicak",
    name: "Ispanaklı & Ricotta Peynirli Tuzlu Kiş",
    displayName: "Ispanaklı Ricotta Kiş",
    description:
      "Kıtır tereyağlı tart hamuru içinde taze yaprak ıspanak, ricotta, beyaz peynir ve muskat aromalı yumurta dolgusu (1 büyük dilim).",
    priceKurus: 25500,
    image: {
      thumbUrl: "/images/menu/thumbs/ispanakli-ricotta-kis.webp",
      gridUrl: "/images/menu/grid/ispanakli-ricotta-kis.webp",
      fullUrl: "/images/menu/full/ispanakli-ricotta-kis.webp",
      alt: "Tabağa servis edilmiş altın rengi kızarmış ıspanaklı ve peynirli kiş dilimi",
      altEn: "Golden baked slice of spinach and ricotta quiche on a plate",
      width: 1200,
      height: 800,
    },
    isPublished: true,
    sortOrder: 4,
    translations: {
      en: {
        name: "Savory Spinach & Creamy Ricotta Quiche",
        displayName: "Spinach Ricotta Quiche",
        description:
          "Buttery shortcrust tart baked with baby spinach, creamy ricotta, white cheese, and nutmeg-infused egg custard (1 generous slice).",
      },
    },
  },
  {
    id: "item-firin-somon-patates",
    businessId: BUSINESS_ID,
    categoryId: "cat-sicak",
    name: "Fırın Norveç Somonu & Taze Yeşil Sebzeler",
    displayName: "Fırın Somon Tabağı",
    description:
      "Çıtır derili 180 g Norveç somon fileto, limon-tereyağlı sos, sotelenmiş yeşil sebzeler ve taze limon eşliğinde.",
    priceKurus: 44500,
    image: {
      thumbUrl: "/images/menu/thumbs/firin-somon-patates.webp",
      gridUrl: "/images/menu/grid/firin-somon-patates.webp",
      fullUrl: "/images/menu/full/firin-somon-patates.webp",
      alt: "Mat siyah tabakta çıtır derili fırın somon fileto ve sotelenmiş yeşil sebzeler",
      altEn:
        "Baked crispy-skin salmon fillet served with sautéed greens on a matte black plate",
      width: 1200,
      height: 800,
    },
    isPublished: true,
    sortOrder: 5,
    translations: {
      en: {
        name: "Oven-Seared Norwegian Salmon & Greens Plate",
        displayName: "Baked Salmon Plate",
        description:
          "Crispy-skin 180 g Norwegian salmon fillet served with lemon-butter pan jus, sautéed green vegetables, and fresh lime wedge.",
      },
    },
  },
  {
    id: "item-izgara-kofte-tabagi",
    businessId: BUSINESS_ID,
    categoryId: "cat-sicak",
    name: "Kasap Usulü Izgara Köfte & Fırın Domates Tabağı",
    displayName: "Izgara Köfte Tabağı",
    description:
      "180 g dana köfte (5 adet), ızgara domates dilimleri, taze maydanoz salatası ve yanında kızarmış ekşi maya ekmek dilimleri.",
    priceKurus: 38500,
    image: {
      thumbUrl: "/images/menu/thumbs/izgara-kofte-tabagi.webp",
      gridUrl: "/images/menu/grid/izgara-kofte-tabagi.webp",
      fullUrl: "/images/menu/full/izgara-kofte-tabagi.webp",
      alt: "Beyaz tabakta kızarmış ekmek dilimleri, domates ve yeşilliklerle servis edilen ızgara köfte",
      altEn:
        "Char-grilled meatballs served with tomatoes, parsley, and toasted bread slices",
      width: 1200,
      height: 738,
    },
    isPublished: true,
    sortOrder: 6,
    translations: {
      en: {
        name: "Char-Grilled Anatolian Meatballs & Herb Bread",
        displayName: "Grilled Meatballs Plate",
        description:
          "180 g beef meatballs (5 pcs) seared on the grill, served with fresh tomato wedges, parsley salad, and toasted sourdough slices.",
      },
    },
  },

  // Kategori 6: Paylaşımlık Tabaklar & Atıştırmalıklar (5 ürün)
  {
    id: "item-uclu-meze-sepeti",
    businessId: BUSINESS_ID,
    categoryId: "cat-paylasim",
    name: "Üçlü Meze Tabağı & Fırın Pide",
    displayName: "Üçlü Meze Tabağı",
    description:
      "Klasik nohut humus, cacık, köz patlıcan ezmesi, çıtır nohut köftesi ve sıcacık puf pide dilimleriyle 2 kişilik paylaşım.",
    priceKurus: 29500,
    image: {
      thumbUrl: "/images/menu/thumbs/uclu-meze-sepeti.webp",
      gridUrl: "/images/menu/grid/uclu-meze-sepeti.webp",
      fullUrl: "/images/menu/full/uclu-meze-sepeti.webp",
      alt: "Üç ayrı meze kâsesi, çıtır falafel ve puf pide dilimleri içeren paylaşım tabağı",
      altEn:
        "Shareable platter featuring three meze dip bowls, crisp falafel, and warm flatbread",
      width: 1200,
      height: 888,
    },
    isPublished: true,
    sortOrder: 1,
    translations: {
      en: {
        name: "Trio Meze Platter with Crisp Falafel & Flatbread",
        displayName: "Trio Meze Platter",
        description:
          "Chickpea hummus, herb tzatziki, smoky eggplant dip, crisp falafel, and warm flatbread triangles for sharing (serves 2).",
      },
    },
  },
  {
    id: "item-yerli-peynir-tabagi",
    businessId: BUSINESS_ID,
    categoryId: "cat-paylasim",
    name: "Anadolu Peynirleri, Ceviz & Meyve Tahtası",
    displayName: "Yerli Peynir Tabağı",
    description:
      "Kars eski kaşarı, Bergama tulumu ve keçi peyniri seçkisi; taze incir, yeşil zeytin, ceviz, reçel ve kızarmış ekmek dilimleriyle.",
    priceKurus: 36500,
    image: {
      thumbUrl: "/images/menu/thumbs/yerli-peynir-tabagi.webp",
      gridUrl: "/images/menu/grid/yerli-peynir-tabagi.webp",
      fullUrl: "/images/menu/full/yerli-peynir-tabagi.webp",
      alt: "Ahşap sunum tahtasında yerli peynir çeşitleri, meyve, ceviz ve kraker dilimleri",
      altEn:
        "Artisan board of aged cheeses, fresh fruit, walnuts, and sliced bread",
      width: 675,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 2,
    translations: {
      en: {
        name: "Anatolian Artisan Cheese, Fruit & Nut Board",
        displayName: "Local Cheese Board",
        description:
          "Selection of aged Kars kashar, Bergama tulum, and goat cheese with fresh figs, green olives, walnuts, preserve, and toasted bread.",
      },
    },
  },
  {
    id: "item-baharatli-firin-patates",
    businessId: BUSINESS_ID,
    categoryId: "cat-paylasim",
    name: "Taze Biberiyeli & Deniz Tuzlu Fırın Patates",
    displayName: "Baharatlı Fırın Patates",
    description:
      "Altın sarısı çıtır kabuklu taze patates küpleri (260 g), doğranmış maydanoz, sarımsak tozu ve deniz tuzuyla harmanlanır.",
    priceKurus: 19500,
    image: {
      thumbUrl: "/images/menu/thumbs/baharatli-firin-patates.webp",
      gridUrl: "/images/menu/grid/baharatli-firin-patates.webp",
      fullUrl: "/images/menu/full/baharatli-firin-patates.webp",
      alt: "Beyaz porselen tabakta taze otlar ve deniz tuzuyla fırınlanmış çıtır patates",
      altEn:
        "Crispy herb-roasted potatoes garnished with fresh parsley on a white plate",
      width: 1200,
      height: 900,
    },
    isPublished: true,
    sortOrder: 3,
    translations: {
      en: {
        name: "Herb & Garlic Roasted Crispy Baby Potatoes",
        displayName: "Herb Roasted Potatoes",
        description:
          "Golden crispy roasted potato chunks (260 g) tossed with chopped fresh parsley, roasted garlic, olive oil, and flaky sea salt.",
      },
    },
  },
  {
    id: "item-enginar-zeytin-tabagi",
    businessId: BUSINESS_ID,
    categoryId: "cat-paylasim",
    name: "Ege Zeytinyağlı Çanak Enginar & Garnitür Tabağı",
    displayName: "Zeytinyağlı Enginar",
    description:
      "Limon suyunda ağır pişmiş tam çanak enginar, havuç ve bezelye garnitürü, taze dereotu ve soğuk sıkım zeytinyağı ile.",
    priceKurus: 24500,
    image: {
      thumbUrl: "/images/menu/thumbs/enginar-zeytin-tabagi.webp",
      gridUrl: "/images/menu/grid/enginar-zeytin-tabagi.webp",
      fullUrl: "/images/menu/full/enginar-zeytin-tabagi.webp",
      alt: "Bezelye, havuç ve taze dereotu eşliğinde zeytinyağlı çanak enginar tabağı",
      altEn:
        "Olive-oil braised whole artichoke heart topped with carrots, peas, and fresh dill",
      width: 1200,
      height: 900,
    },
    isPublished: true,
    sortOrder: 4,
    translations: {
      en: {
        name: "Aegean Braised Artichoke Heart in Olive Oil",
        displayName: "Olive Oil Artichoke",
        description:
          "Tender whole braised artichoke heart simmered with lemon juice, diced carrots, sweet peas, fresh dill, and Aegean olive oil.",
      },
    },
  },
  {
    id: "item-uclu-bruschetta",
    businessId: BUSINESS_ID,
    categoryId: "cat-paylasim",
    name: "Üçlü Salkım Domates & Fesleğenli Bruschetta",
    displayName: "Üçlü Bruschetta",
    description:
      "Taş fırında kızartılmış çıtır baget dilimleri üzerine sürülmüş labne, küp doğranmış tatlı domates ve taze fesleğen şeritleri (6 dilim).",
    priceKurus: 22500,
    image: {
      thumbUrl: "/images/menu/thumbs/uclu-bruschetta.webp",
      gridUrl: "/images/menu/grid/uclu-bruschetta.webp",
      fullUrl: "/images/menu/full/uclu-bruschetta.webp",
      alt: "Kızarmış baget dilimleri üzerinde doğranmış taze domates, krem peynir ve fesleğen şeritleri",
      altEn:
        "Toasted baguette slices topped with whipped cheese, diced vine tomatoes, and basil",
      width: 900,
      height: 1200,
    },
    isPublished: true,
    sortOrder: 5,
    translations: {
      en: {
        name: "Vine Tomato, Basil & Cream Cheese Bruschetta",
        displayName: "Trio Bruschetta",
        description:
          "Crisp toasted baguette slices topped with whipped cream cheese, diced ripe tomatoes, olive oil, and fresh basil ribbons (6 pcs).",
      },
    },
  },
];
