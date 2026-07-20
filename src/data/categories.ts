import {
  Droplets, Coffee, Sparkles, FlaskConical, Leaf, Droplet,
  Sun, Wheat, UtensilsCrossed, Apple, Cookie, Cake,
  Beaker, Archive, Cherry, Carrot, Sprout, Bean,
  Hand, Smile, Scissors,
  WashingMachine, SprayCan, GlassWater, Brush, BedDouble,
  Baby, Rabbit, TreePine, ToyBrick, Baby as PacifierIcon, Music,
  Pill, HeartPulse, Brain, Shield, Bug, Flame, Waves, Gem,
  Hand as HandIcon, Palette, Flower2, Candy, Nut, Grape,
  Bath, ShowerHead, Package, Recycle, ScrollText, Shirt,
  Cloud, Feather, Snowflake, User, Users, Egg, Fish,
  type LucideIcon,
} from 'lucide-react';

export interface Category {
  id: string;
  slug: string;
  name: { lt: string; en: string; lv: string };
  icon: LucideIcon;
  /** Normalized Shopify tags this subcategory covers (lowercased) */
  tags?: string[];
}

/** Normalize a tag for matching: lowercase + trim */
const norm = (s: string) => s.trim().toLowerCase();

// -------------------- MAISTAS --------------------
export const foodCategories: Category[] = [
  { id: 'kava', slug: 'kava', name: { lt: 'Kava', en: 'Coffee', lv: 'Kafija' }, icon: Coffee,
    tags: ['kava', 'kava ir kiti gėrimai'] },
  { id: 'kakava', slug: 'kakava', name: { lt: 'Kakava', en: 'Cocoa', lv: 'Kakao' }, icon: Sparkles,
    tags: ['kakava'] },
  { id: 'aliejai', slug: 'aliejai', name: { lt: 'Aliejai ir sviestas', en: 'Oils & butter', lv: 'Eļļas' }, icon: Droplet,
    tags: ['aliejai', 'aliejai ir ghi sviestas'] },
  { id: 'padazai-prieskoniai', slug: 'padazai-prieskoniai', name: { lt: 'Padažai ir prieskoniai', en: 'Sauces & spices', lv: 'Mērces un garšvielas' }, icon: FlaskConical,
    tags: ['padažai ir pagardai', 'prieskoniai ir padažai', 'prieskoniai'] },
  { id: 'druska-soda', slug: 'druska-soda', name: { lt: 'Druska ir soda', en: 'Salt & soda', lv: 'Sāls' }, icon: Beaker,
    tags: ['druska', 'soda'] },
  { id: 'saldikliai', slug: 'saldikliai', name: { lt: 'Saldikliai', en: 'Sweeteners', lv: 'Saldinātāji' }, icon: Sun,
    tags: ['saldikliai'] },
  { id: 'miltai', slug: 'miltai', name: { lt: 'Miltai ir kepiniams', en: 'Flour & baking', lv: 'Milti' }, icon: Wheat,
    tags: ['miltai ir jų mišiniai', 'ruošiniai kepiniams'] },
  { id: 'kruopos-grudai', slug: 'kruopos-grudai', name: { lt: 'Kruopos ir grūdai', en: 'Grains & cereals', lv: 'Putraimi' }, icon: Wheat,
    tags: ['grūdai ir  kruopos', 'grūdai ir kruopos', 'grūdų produktai', 'grūdų produktai ir ne tik', 'bolivinė balanda ir jų mišiniai', 'ryžiai', 'dribsniai', 'dribsniai ir sėlenos'] },
  { id: 'makaronai', slug: 'makaronai', name: { lt: 'Makaronai', en: 'Pasta', lv: 'Makaroni' }, icon: UtensilsCrossed,
    tags: ['makaronai'] },
  { id: 'duona-pusryciai', slug: 'duona-pusryciai', name: { lt: 'Duona ir pusryčiai', en: 'Bread & breakfast', lv: 'Maize' }, icon: Cookie,
    tags: ['duona ir trapučiai', 'paplotėliai', 'sausi pusryčiai'] },
  { id: 'vaisiai-uogos', slug: 'vaisiai-uogos', name: { lt: 'Vaisiai ir uogos', en: 'Fruits & berries', lv: 'Augļi un ogas' }, icon: Apple,
    tags: ['vaisiai', 'uogos', 'uogos ir vaisiai'] },
  { id: 'darzoves', slug: 'darzoves', name: { lt: 'Daržovės', en: 'Vegetables', lv: 'Dārzeņi' }, icon: Carrot,
    tags: ['daržovės'] },
  { id: 'ankstiniai', slug: 'ankstiniai', name: { lt: 'Ankštiniai', en: 'Legumes', lv: 'Pākšaugi' }, icon: Bean,
    tags: ['ankštiniai'] },
  { id: 'sekklos-riesutai', slug: 'sekklos-riesutai', name: { lt: 'Sėklos ir riešutai', en: 'Seeds & nuts', lv: 'Sēklas un rieksti' }, icon: Nut,
    tags: ['sėklos ir riešutai'] },
  { id: 'dumbliai', slug: 'dumbliai', name: { lt: 'Dumbliai', en: 'Algae', lv: 'Aļģes' }, icon: Fish,
    tags: ['dumbliai'] },
  { id: 'uzkandziai', slug: 'uzkandziai', name: { lt: 'Užkandžiai', en: 'Snacks', lv: 'Uzkodas' }, icon: Cookie,
    tags: ['užkandžiai', 'užkandžiai ir saldumynai'] },
  { id: 'saldumynai', slug: 'saldumynai', name: { lt: 'Saldumynai ir šokoladas', en: 'Sweets & chocolate', lv: 'Saldumi' }, icon: Cake,
    tags: ['saldumynai', 'šokoladas', 'saldainiai', 'guminukai'] },
  { id: 'sultiniai', slug: 'sultiniai', name: { lt: 'Sultiniai', en: 'Broths', lv: 'Buljoni' }, icon: Egg,
    tags: ['sultiniai'] },
  { id: 'super-maistas', slug: 'super-maistas', name: { lt: 'Super maistas', en: 'Super food', lv: 'Super pārtika' }, icon: Sparkles,
    tags: ['super maistas'] },
  { id: 'be-glitimo', slug: 'be-glitimo', name: { lt: 'Be glitimo', en: 'Gluten-free', lv: 'Bez glutēna' }, icon: Wheat,
    tags: ['produktai be glitimo'] },
  { id: 'be-laktozes', slug: 'be-laktozes', name: { lt: 'Be laktozės', en: 'Lactose-free', lv: 'Bez laktozes' }, icon: Droplets,
    tags: ['produktai be laktozės'] },
  { id: 'standikliai', slug: 'standikliai', name: { lt: 'Standikliai ir pakaitalai', en: 'Thickeners & substitutes', lv: 'Biezinātāji' }, icon: Archive,
    tags: ['standikliai ir pakaitalai'] },
];

// -------------------- SVEIKATA --------------------
export const healthCategories: Category[] = [
  { id: 'vitaminai-mineralai', slug: 'vitaminai-mineralai', name: { lt: 'Vitaminai ir mineralai', en: 'Vitamins & minerals', lv: 'Vitamīni' }, icon: Pill,
    tags: ['vitaminai-mineralai'] },
  { id: 'aminorugstys', slug: 'aminorugstys', name: { lt: 'Aminorūgštys', en: 'Amino acids', lv: 'Aminoskābes' }, icon: Pill,
    tags: ['aminorūgštys'] },
  { id: 'antioksidantai', slug: 'antioksidantai', name: { lt: 'Antioksidantai', en: 'Antioxidants', lv: 'Antioksidanti' }, icon: Shield,
    tags: ['antioksidantai'] },
  { id: 'imunitetui', slug: 'imunitetui', name: { lt: 'Imunitetui', en: 'Immunity', lv: 'Imunitātei' }, icon: Shield,
    tags: ['pagalba imunitetui'] },
  { id: 'virskinimui', slug: 'virskinimui', name: { lt: 'Virškinimui', en: 'Digestion', lv: 'Gremošanai' }, icon: HeartPulse,
    tags: ['sveikas virškinimas', 'žarnynui'] },
  { id: 'sirdziai', slug: 'sirdziai', name: { lt: 'Širdžiai', en: 'Heart', lv: 'Sirdij' }, icon: HeartPulse,
    tags: ['sveika širdis'] },
  { id: 'sanariams', slug: 'sanariams', name: { lt: 'Sąnariams ir kaulams', en: 'Joints & bones', lv: 'Locītavām' }, icon: HeartPulse,
    tags: ['sveiki sąnariai ir kaulai'] },
  { id: 'kepenims', slug: 'kepenims', name: { lt: 'Kepenims', en: 'Liver', lv: 'Aknām' }, icon: HeartPulse,
    tags: ['pagalba kepenims'] },
  { id: 'atminciai', slug: 'atminciai', name: { lt: 'Atminčiai', en: 'Memory', lv: 'Atmiņai' }, icon: Brain,
    tags: ['atminčiai'] },
  { id: 'moterims', slug: 'moterims', name: { lt: 'Moterims', en: 'For women', lv: 'Sievietēm' }, icon: User,
    tags: ['moterims', 'moterų sveikata'] },
  { id: 'vyrams', slug: 'vyrams', name: { lt: 'Vyrams', en: 'For men', lv: 'Vīriešiem' }, icon: User,
    tags: ['vyrams', 'vyrų sveikata'] },
  { id: 'eteriniai-aliejai', slug: 'eteriniai-aliejai', name: { lt: 'Eteriniai aliejai', en: 'Essential oils', lv: 'Ēteriskās eļļas' }, icon: Droplet,
    tags: ['eteriniai aliejai'] },
  { id: 'smilkalai', slug: 'smilkalai', name: { lt: 'Smilkalai', en: 'Incense', lv: 'Vīraki' }, icon: Flame,
    tags: ['smilkalai'] },
  { id: 'nuo-vabzdziu', slug: 'nuo-vabzdziu', name: { lt: 'Nuo vabzdžių', en: 'Insect repellents', lv: 'Pret insektiem' }, icon: Bug,
    tags: ['priemonės nuo vabzdžių'] },
  { id: 'sildykles', slug: 'sildykles', name: { lt: 'Šildyklės', en: 'Warmers', lv: 'Sildītāji' }, icon: Flame,
    tags: ['šildyklės'] },
  { id: 'masaziniai-aparatai', slug: 'masaziniai-aparatai', name: { lt: 'Masažiniai aparatai', en: 'Massagers', lv: 'Masāžas' }, icon: HandIcon,
    tags: ['masažiniai aparatai'] },
  { id: 'gintaras', slug: 'gintaras', name: { lt: 'Gintaro karoliai', en: 'Amber necklaces', lv: 'Dzintara' }, icon: Gem,
    tags: ['gintaro karoliai'] },
];

// -------------------- KOSMETIKA --------------------
export const cosmeticsCategories: Category[] = [
  { id: 'veidui', slug: 'kosmetika-veidui', name: { lt: 'Veidui', en: 'Face', lv: 'Sejai' }, icon: Smile,
    tags: ['ekologiškos veido priežiūros priemonės', 'veidui ir kūnui'] },
  { id: 'kunui', slug: 'kosmetika-kunui', name: { lt: 'Kūnui', en: 'Body', lv: 'Ķermenim' }, icon: HandIcon,
    tags: ['ekologiški prausikliai kūnui', 'sviestai (vietoj kremo)'] },
  { id: 'plaukams', slug: 'kosmetika-plaukams', name: { lt: 'Plaukams', en: 'Hair', lv: 'Matiem' }, icon: Scissors,
    tags: ['ekologiškos priemonės plaukams', 'plaukų dažai'] },
  { id: 'rankoms', slug: 'kosmetika-rankoms', name: { lt: 'Rankoms', en: 'Hands', lv: 'Rokām' }, icon: Hand,
    tags: ['rankų kremai'] },
  { id: 'kaukes', slug: 'kosmetika-kaukes', name: { lt: 'Kaukės', en: 'Masks', lv: 'Maskas' }, icon: Smile,
    tags: ['ekologiškos kaukės'] },
  { id: 'dezodorantai', slug: 'dezodorantai', name: { lt: 'Dezodorantai', en: 'Deodorants', lv: 'Dezodoranti' }, icon: SprayCan,
    tags: ['dezodorantai'] },
  { id: 'burnos-higiena', slug: 'burnos-higiena', name: { lt: 'Burnos higienai', en: 'Oral care', lv: 'Mutes higiēnai' }, icon: Smile,
    tags: ['ekologiškos priemonės burnos higienai'] },
  { id: 'nuo-saules', slug: 'nuo-saules', name: { lt: 'Nuo saulės', en: 'Sun care', lv: 'Pret sauli' }, icon: Sun,
    tags: ['ekologiški kremai nuo saulės'] },
  { id: 'maudynems', slug: 'maudynems', name: { lt: 'Maudynėms ir muilai', en: 'Bath & soap', lv: 'Vannām un ziepēm' }, icon: Bath,
    tags: ['maudynėms', 'muilai'] },
  { id: 'moliai', slug: 'moliai', name: { lt: 'Moliai', en: 'Clays', lv: 'Māli' }, icon: Palette,
    tags: ['natūralūs moliai'] },
  { id: 'zvakes', slug: 'zvakes', name: { lt: 'Žvakės', en: 'Candles', lv: 'Sveces' }, icon: Flame,
    tags: ['natūralios žvakės'] },
  { id: 'pilingo-pirstines', slug: 'pilingo-pirstines', name: { lt: 'Pilingo pirštinės', en: 'Peeling gloves', lv: 'Pīlinga cimdi' }, icon: HandIcon,
    tags: ['pilingo pirštinės'] },
  { id: 'kosmetikos-aliejai', slug: 'kosmetikos-aliejai', name: { lt: 'Kosmetiniai aliejai', en: 'Cosmetic oils', lv: 'Kosmētiskās eļļas' }, icon: Droplet,
    tags: ['kosmetiniai aliejai', 'kosmetikos aliejai'] },
];

// -------------------- BUIČIAI --------------------
export const lifestyleCategories: Category[] = [
  { id: 'skalbimui', slug: 'skalbimui', name: { lt: 'Skalbimui', en: 'Laundry', lv: 'Mazgāšanai' }, icon: WashingMachine,
    tags: ['ekologiškos priemonės skalbimui'] },
  { id: 'valikliai', slug: 'valikliai', name: { lt: 'Valikliai', en: 'Cleaners', lv: 'Tīrīšanas' }, icon: SprayCan,
    tags: ['ekologiški valikliai'] },
  { id: 'indu-plovimas', slug: 'indu-plovimas', name: { lt: 'Indų plovimui', en: 'Dishwashing', lv: 'Trauku mazgāšanai' }, icon: GlassWater,
    tags: ['ekologiški indų plovikliai'] },
  { id: 'indaplovei', slug: 'indaplovei', name: { lt: 'Indaplovei', en: 'Dishwasher', lv: 'Trauku mazgājamai mašīnai' }, icon: GlassWater,
    tags: ['ekologiškos priemonės indaplovei'] },
  { id: 'tualetinis-popierius', slug: 'tualetinis-popierius', name: { lt: 'Tualetinis popierius', en: 'Toilet paper', lv: 'Tualetes papīrs' }, icon: ScrollText,
    tags: ['tualetinis popierius'] },
  { id: 'sauskelnes', slug: 'sauskelnes', name: { lt: 'Sauskelnės', en: 'Diapers', lv: 'Autiņi' }, icon: Baby,
    tags: ['sauskelnės'] },
  { id: 'daugkartines', slug: 'daugkartines', name: { lt: 'Daugkartinės', en: 'Reusables', lv: 'Atkārtoti lietojamas' }, icon: Recycle,
    tags: ['daugkartinės'] },
];

// -------------------- SĖJAI --------------------
export const sowingCategories: Category[] = [
  { id: 'seklos-sejai', slug: 'seklos-sejai', name: { lt: 'Sėklos', en: 'Seeds', lv: 'Sēklas' }, icon: Sprout,
    tags: ['sėklos', 'sėklos sėjai'] },
  { id: 'augalai', slug: 'augalai', name: { lt: 'Augalai', en: 'Plants', lv: 'Augi' }, icon: TreePine,
    tags: ['augalai'] },
];

// -------------------- ATŽALOMS --------------------
export const sproutCategories: Category[] = [
  { id: 'kauciukiniai-zaislai', slug: 'kauciukiniai-zaislai', name: { lt: 'Kaučiuko žaisliukai', en: 'Rubber toys', lv: 'Gumijas rotaļlietas' }, icon: Rabbit,
    tags: ['kaučiukiniai žaislai'] },
  { id: 'mediniai-zaislai', slug: 'mediniai-zaislai', name: { lt: 'Mediniai žaisliukai', en: 'Wooden toys', lv: 'Koka rotaļlietas' }, icon: ToyBrick,
    tags: ['mediniai žaislai'] },
  { id: 'kramtukai', slug: 'kramtukai', name: { lt: 'Kramtukai', en: 'Teethers', lv: 'Kožamie' }, icon: Baby,
    tags: ['kramtukai'] },
  { id: 'barskuciai', slug: 'barskuciai', name: { lt: 'Barškučiai', en: 'Rattles', lv: 'Grabuļi' }, icon: Music,
    tags: ['barškučiai', 'skleidžiantys garsą'] },
  { id: 'virveles', slug: 'virveles', name: { lt: 'Virvelės', en: 'Cords', lv: 'Auklas' }, icon: Baby,
    tags: ['virvelės čiulptukui', 'virvelės vežimėliui'] },
  { id: 'lelytes', slug: 'lelytes', name: { lt: 'Lėlyčiukai', en: 'Small dolls', lv: 'Mazās lelles' }, icon: Baby,
    tags: ['maži   lėlyčiukai', 'maži lėlyčiukai'] },
  { id: 'vaikams', slug: 'vaikams-visa', name: { lt: 'Vaikams', en: 'Kids', lv: 'Bērniem' }, icon: Baby,
    tags: ['vaikams', 'kūdikiams ir  vaikams', 'kūdikiams ir vaikams', 'komplektas vaikams'] },
];

// -------------------- NAMAMS --------------------
export const homeCategories: Category[] = [
  { id: 'vandens-gryninimas', slug: 'vandens-gryninimas', name: { lt: 'Vandens gryninimui', en: 'Water purification', lv: 'Ūdens attīrīšanai' }, icon: Droplets,
    tags: ['vandens gryninimui'] },
  { id: 'silko-patalai', slug: 'silko-patalai', name: { lt: 'Šilko patalai', en: 'Silk bedding', lv: 'Zīda gultas veļa' }, icon: BedDouble,
    tags: ['natūralūs šilko patalai', 'šilko pataliukai'] },
  { id: 'pagalves', slug: 'pagalves', name: { lt: 'Pagalvės', en: 'Pillows', lv: 'Spilveni' }, icon: BedDouble,
    tags: ['pagalvės'] },
  { id: 'antklodes', slug: 'antklodes', name: { lt: 'Antklodės', en: 'Blankets', lv: 'Segas' }, icon: BedDouble,
    tags: ['antklodės'] },
  { id: 'vilna', slug: 'vilna', name: { lt: 'Vilna', en: 'Wool', lv: 'Vilna' }, icon: Cloud,
    tags: ['vilna', 'vilna/šilkas'] },
  { id: 'medvilne', slug: 'medvilne', name: { lt: 'Medvilnė', en: 'Cotton', lv: 'Kokvilna' }, icon: Feather,
    tags: ['medvilnė'] },
];

// -------------------- APRANGA --------------------
export const apparelCategories: Category[] = [
  { id: 'aksesuarai', slug: 'aksesuarai', name: { lt: 'Aksesuarai', en: 'Accessories', lv: 'Aksesuāri' }, icon: Shirt,
    tags: ['aksesuarai'] },
  { id: 'apranga-unisex', slug: 'apranga-unisex', name: { lt: 'Unisex', en: 'Unisex', lv: 'Unisex' }, icon: Shirt,
    tags: ['unisex'] },
];

// -------------------- MAIN NAV --------------------
export const mainNavCategories = [
  { id: 'maistas', slug: 'maistas', name: { lt: 'Maistas', en: 'Food', lv: 'Ēdiens' } },
  { id: 'sveikatai', slug: 'sveikatai', name: { lt: 'Sveikatai', en: 'Health', lv: 'Veselībai' } },
  { id: 'kosmetika', slug: 'kosmetika', name: { lt: 'Kosmetika', en: 'Cosmetics', lv: 'Kosmētika' } },
  { id: 'buiciai', slug: 'buiciai', name: { lt: 'Buičiai', en: 'Household', lv: 'Mājsaimniecība' } },
  { id: 'sejai', slug: 'sejai', name: { lt: 'Sėjai', en: 'Sowing', lv: 'Sēšana' } },
  { id: 'atzaloms', slug: 'atzaloms', name: { lt: 'Atžaloms', en: 'For kids', lv: 'Bērniem' } },
  { id: 'namams', slug: 'namams', name: { lt: 'Namams', en: 'Home', lv: 'Mājām' } },
  { id: 'apranga', slug: 'apranga', name: { lt: 'Apranga', en: 'Apparel', lv: 'Apģērbs' } },
  { id: 'akcijos', slug: 'akcijos', name: { lt: 'Akcijos', en: 'Deals', lv: 'Akcijas' } },
];

/** Mapping from main-nav slug → subcategory list */
export const mainCategoryMap: Record<string, Category[]> = {
  maistas: foodCategories,
  sveikatai: healthCategories,
  kosmetika: cosmeticsCategories,
  buiciai: lifestyleCategories,
  sejai: sowingCategories,
  atzaloms: sproutCategories,
  namams: homeCategories,
  apranga: apparelCategories,
};

// -------------------- TAG → CATEGORY MAPPING --------------------

/** Build lookup: normalized shopify tag → { mainSlug, subSlug } */
const tagLookup: Map<string, { mainSlug: string; subSlug: string }> = (() => {
  const m = new Map<string, { mainSlug: string; subSlug: string }>();
  for (const [mainSlug, subs] of Object.entries(mainCategoryMap)) {
    for (const sub of subs) {
      const aliases = new Set<string>([
        ...(sub.tags ?? []),
        sub.slug,
        sub.name.lt,
        sub.name.en,
        sub.name.lv,
      ]);
      for (const a of aliases) {
        if (a) m.set(norm(a), { mainSlug, subSlug: sub.slug });
      }
    }
  }
  // Aliases for uppercase main-nav tags used in Shopify
  return m;
})();

/**
 * Main-nav tag aliases: some Shopify tags map directly to a main nav category
 * without a specific subcategory (e.g. "MAISTAS", "SVEIKATA").
 */
export const mainNavTagAliases: Record<string, string> = {
  maistas: 'maistas',
  sveikata: 'sveikatai',
  'ekologiška kosmetika': 'kosmetika',
  'ekologiškos priemonės buičiai': 'buiciai',
  namams: 'namams',
  sėjai: 'sejai',
  atžaloms: 'atzaloms',
  apranga: 'apranga',
  išpardavimas: 'akcijos',
};

export interface CategoryMatch {
  mainSlugs: string[];
  subSlugs: string[];
}

/**
 * Map a product's Shopify tags to matching main nav & subcategory slugs.
 * A product can belong to multiple sections (e.g. "MAISTAS" + "Kava").
 */
export function getCategoryFromTags(tags: string[]): CategoryMatch {
  const mainSlugs = new Set<string>();
  const subSlugs = new Set<string>();
  for (const raw of tags) {
    const key = norm(raw);
    const sub = tagLookup.get(key);
    if (sub) {
      mainSlugs.add(sub.mainSlug);
      subSlugs.add(sub.subSlug);
      continue;
    }
    const mainAlias = mainNavTagAliases[key];
    if (mainAlias) mainSlugs.add(mainAlias);
  }
  return { mainSlugs: Array.from(mainSlugs), subSlugs: Array.from(subSlugs) };
}

/** Convenience: does the product belong to a given subcategory slug? */
export function productMatchesSubcategory(tags: string[], subSlug: string): boolean {
  return getCategoryFromTags(tags).subSlugs.includes(subSlug);
}

/** Convenience: does the product belong to a given main-nav slug? */
export function productMatchesMain(tags: string[], mainSlug: string): boolean {
  return getCategoryFromTags(tags).mainSlugs.includes(mainSlug);
}
