import {
  Droplets, Coffee, Sparkles, FlaskConical, Leaf, Droplet,
  Sun, Wheat, UtensilsCrossed, Apple, Cookie, Cake,
  Beaker, Archive, Cherry, Carrot, Sprout, Bean,
  Hand, Smile, Scissors,
  WashingMachine, SprayCan, GlassWater, Home as HomeIcon, Brush,
  Droplet as DropletIcon, BedDouble,
  type LucideIcon,
} from 'lucide-react';

export interface Category {
  id: string;
  slug: string;
  name: { lt: string; en: string; lv: string };
  icon: LucideIcon;
}

export const foodCategories: Category[] = [
  { id: 'actas', slug: 'actas', name: { lt: 'Actas', en: 'Vinegar', lv: 'Etiķis' }, icon: Droplets },
  { id: 'kava', slug: 'kava', name: { lt: 'Kava', en: 'Coffee', lv: 'Kafija' }, icon: Coffee },
  { id: 'kakava', slug: 'kakava', name: { lt: 'Kakava', en: 'Cocoa', lv: 'Kakao' }, icon: Sparkles },
  { id: 'padazai', slug: 'padazai', name: { lt: 'Padažai', en: 'Sauces', lv: 'Mērces' }, icon: FlaskConical },
  { id: 'prieskoniai', slug: 'prieskoniai', name: { lt: 'Prieskoniai', en: 'Spices', lv: 'Garšvielas' }, icon: Leaf },
  { id: 'aliejus', slug: 'aliejus', name: { lt: 'Aliejus', en: 'Oil', lv: 'Eļļa' }, icon: Droplet },
  { id: 'saldikliai', slug: 'saldikliai', name: { lt: 'Saldikliai', en: 'Sweeteners', lv: 'Saldinātāji' }, icon: Sun },
  { id: 'miltai', slug: 'miltai', name: { lt: 'Miltai', en: 'Flour', lv: 'Milti' }, icon: Wheat },
  { id: 'kruopos', slug: 'kruopos', name: { lt: 'Kruopos', en: 'Cereals', lv: 'Putraimi' }, icon: Wheat },
  { id: 'makaronai', slug: 'makaronai', name: { lt: 'Makaronai', en: 'Pasta', lv: 'Makaroni' }, icon: UtensilsCrossed },
  { id: 'vaisiai', slug: 'vaisiai', name: { lt: 'Vaisiai', en: 'Fruits', lv: 'Augļi' }, icon: Apple },
  { id: 'uzkandžiai', slug: 'uzkandziai', name: { lt: 'Užkandžiai', en: 'Snacks', lv: 'Uzkodas' }, icon: Cookie },
  { id: 'saldumynai', slug: 'saldumynai', name: { lt: 'Saldumynai', en: 'Sweets', lv: 'Saldumi' }, icon: Cake },
  { id: 'priedai-ruosiniai', slug: 'priedai-ruosiniai', name: { lt: 'Priedai, ruošiniai', en: 'Additives, preparations', lv: 'Piedevas, sagataves' }, icon: Beaker },
  { id: 'konservuoti', slug: 'konservuoti', name: { lt: 'Konservuoti', en: 'Preserved', lv: 'Konservēti' }, icon: Archive },
];

export const sowingCategories: Category[] = [
  { id: 'sejai-vaisiai', slug: 'sejai-vaisiai', name: { lt: 'Vaisiai', en: 'Fruits', lv: 'Augļi' }, icon: Cherry },
  { id: 'sejai-saknys', slug: 'sejai-saknys', name: { lt: 'Šaknys', en: 'Roots', lv: 'Saknes' }, icon: Carrot },
  { id: 'sejai-lapai', slug: 'sejai-lapai', name: { lt: 'Lapai', en: 'Leaves', lv: 'Lapas' }, icon: Sprout },
  { id: 'sejai-ankstys', slug: 'sejai-ankstys', name: { lt: 'Ankštys', en: 'Pods', lv: 'Pākstis' }, icon: Bean },
];

export const cosmeticsCategories: Category[] = [
  { id: 'kosmetika-kunui', slug: 'kosmetika-kunui', name: { lt: 'Kūnui', en: 'Body', lv: 'Ķermenim' }, icon: Hand },
  { id: 'kosmetika-veidui', slug: 'kosmetika-veidui', name: { lt: 'Veidui', en: 'Face', lv: 'Sejai' }, icon: Smile },
  { id: 'kosmetika-plaukams', slug: 'kosmetika-plaukams', name: { lt: 'Plaukams', en: 'Hair', lv: 'Matiem' }, icon: Scissors },
];

export const mainNavCategories = [
  { id: 'maistas', slug: 'maistas', name: { lt: 'Maistas', en: 'Food', lv: 'Ēdiens' } },
  { id: 'sveikatai', slug: 'sveikatai', name: { lt: 'Sveikatai', en: 'Health', lv: 'Veselība' } },
  { id: 'kosmetika', slug: 'kosmetika', name: { lt: 'Kosmetika', en: 'Cosmetics', lv: 'Kosmētika' } },
  { id: 'buiciai', slug: 'buiciai', name: { lt: 'Buičiai', en: 'Lifestyle', lv: 'Mājsaimniecība' } },
  { id: 'sejai', slug: 'sejai', name: { lt: 'Sėjai', en: 'Sowing', lv: 'Sēšana' } },
  { id: 'namams', slug: 'namams', name: { lt: 'Namams', en: 'Home', lv: 'Mājas' } },
  { id: 'akcijos', slug: 'akcijos', name: { lt: 'Akcijos', en: 'Deals', lv: 'Akcijas' } },
];
