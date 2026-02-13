import oliveOilImg from '@/assets/products/olive-oil.jpg';
import coffeeImg from '@/assets/products/coffee.jpg';
import honeyImg from '@/assets/products/honey.jpg';
import vinegarImg from '@/assets/products/vinegar.jpg';
import spiceImg from '@/assets/products/spice.jpg';

export interface NutritionRow {
  label: { lt: string; en: string; lv: string };
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  categorySlug: string;
  name: { lt: string; en: string; lv: string };
  description: { lt: string; en: string; lv: string };
  price: number;
  oldPrice?: number;
  unitPrice: string;
  unit: string;
  image: string;
  images: string[];
  status: 'inStock' | 'shipsFast';
  code: string;
  ean: string;
  manufacturer: string;
  origin: { lt: string; en: string; lv: string };
  ingredients: { lt: string; en: string; lv: string };
  certificates: string[];
  packaging: { lt: string; en: string; lv: string };
  rawMaterialOrigin: { lt: string; en: string; lv: string };
  nutrition: NutritionRow[];
  allergenFree: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: '1', slug: 'bio-alyvuogiu-aliejus', categorySlug: 'aliejus',
    name: { lt: 'Bio alyvuogių aliejus Extra Virgin', en: 'Bio Extra Virgin Olive Oil', lv: 'Bio olīveļļa Extra Virgin' },
    description: {
      lt: 'Aukščiausios kokybės ekologiškas alyvuogių aliejus, šalto spaudimo. Puikus salotoms, kepimui ir marinuojant.',
      en: 'Highest quality organic olive oil, cold-pressed. Perfect for salads, cooking and marinating.',
      lv: 'Augstākās kvalitātes bioloģiskā olīveļļa, auksti spiesta. Ideāla salātiem, cepšanai un marinēšanai.',
    },
    price: 8.99, unitPrice: '€17,98/l', unit: '500 ml', image: oliveOilImg, images: [oliveOilImg],
    status: 'inStock', code: 'BIO-001', ean: '4770000000001', manufacturer: 'EcoFarm',
    origin: { lt: 'Italija', en: 'Italy', lv: 'Itālija' },
    ingredients: { lt: '100% ekologiškos alyvuogės', en: '100% organic olives', lv: '100% bioloģiskās olīvas' },
    certificates: ['EU Bio', 'Demeter'], packaging: { lt: 'Stiklas', en: 'Glass', lv: 'Stikls' },
    rawMaterialOrigin: { lt: 'Italija, Toskana', en: 'Italy, Tuscany', lv: 'Itālija, Toskāna' },
    nutrition: [
      { label: { lt: 'Energinė vertė', en: 'Energy', lv: 'Enerģētiskā vērtība' }, value: '3389 kJ / 824 kcal' },
      { label: { lt: 'Riebalai', en: 'Fat', lv: 'Tauki' }, value: '91,6 g' },
      { label: { lt: 'iš kurių sočiųjų riebalų rūgščių', en: 'of which saturated fatty acids', lv: 'no kuriem piesātinātās taukskābes' }, value: '14,0 g' },
      { label: { lt: 'Angliavandeniai', en: 'Carbohydrates', lv: 'Ogļhidrāti' }, value: '0 g' },
      { label: { lt: 'iš kurių cukrų', en: 'of which sugars', lv: 'no kuriem cukuri' }, value: '0 g' },
      { label: { lt: 'Baltymai', en: 'Protein', lv: 'Olbaltumvielas' }, value: '0 g' },
      { label: { lt: 'Skaidulinės medžiagos', en: 'Fibre', lv: 'Šķiedrvielas' }, value: '0 g' },
      { label: { lt: 'Druska', en: 'Salt', lv: 'Sāls' }, value: '0 g' },
    ],
    allergenFree: true,
  },
  {
    id: '2', slug: 'bio-kavos-pupeles', categorySlug: 'kava',
    name: { lt: 'Bio kavos pupelės Colombia', en: 'Bio Coffee Beans Colombia', lv: 'Bio kafijas pupiņas Colombia' },
    description: {
      lt: 'Ekologiškos Kolumbijos kavos pupelės su šokoladiniu atspalviu. Vidutinis skrudinimas.',
      en: 'Organic Colombian coffee beans with chocolate notes. Medium roast.',
      lv: 'Bioloģiskās Kolumbijas kafijas pupiņas ar šokolādes pieskaņu. Vidēji grauzdētas.',
    },
    price: 12.49, unitPrice: '€24,98/kg', unit: '500 g', image: coffeeImg, images: [coffeeImg],
    status: 'inStock', code: 'BIO-002', ean: '4770000000002', manufacturer: 'BioRoast',
    origin: { lt: 'Kolumbija', en: 'Colombia', lv: 'Kolumbija' },
    ingredients: { lt: '100% ekologiškos Arabica kavos pupelės', en: '100% organic Arabica coffee beans', lv: '100% bioloģiskās Arabica kafijas pupiņas' },
    certificates: ['EU Bio', 'Fairtrade'], packaging: { lt: 'Popierius su PLA danga', en: 'Paper with PLA coating', lv: 'Papīrs ar PLA pārklājumu' },
    rawMaterialOrigin: { lt: 'Kolumbija, Huila regionas', en: 'Colombia, Huila region', lv: 'Kolumbija, Huila reģions' },
    nutrition: [
      { label: { lt: 'Energinė vertė', en: 'Energy', lv: 'Enerģētiskā vērtība' }, value: '1 kJ / 0 kcal' },
      { label: { lt: 'Riebalai', en: 'Fat', lv: 'Tauki' }, value: '0 g' },
      { label: { lt: 'iš kurių sočiųjų riebalų rūgščių', en: 'of which saturated fatty acids', lv: 'no kuriem piesātinātās taukskābes' }, value: '0 g' },
      { label: { lt: 'Angliavandeniai', en: 'Carbohydrates', lv: 'Ogļhidrāti' }, value: '0 g' },
      { label: { lt: 'iš kurių cukrų', en: 'of which sugars', lv: 'no kuriem cukuri' }, value: '0 g' },
      { label: { lt: 'Baltymai', en: 'Protein', lv: 'Olbaltumvielas' }, value: '0 g' },
      { label: { lt: 'Skaidulinės medžiagos', en: 'Fibre', lv: 'Šķiedrvielas' }, value: '0 g' },
      { label: { lt: 'Druska', en: 'Salt', lv: 'Sāls' }, value: '0 g' },
    ],
    allergenFree: true, isNew: true,
  },
  {
    id: '3', slug: 'bio-medus', categorySlug: 'saldikliai',
    name: { lt: 'Bio žaliasis medus', en: 'Bio Raw Honey', lv: 'Bio zaļais medus' },
    description: {
      lt: 'Neapdorotas ekologiškas medus iš Lietuvos bičių ūkių. Pilnas vitaminų ir mineralų.',
      en: 'Unprocessed organic honey from Lithuanian apiaries. Full of vitamins and minerals.',
      lv: 'Neapstrādāts bioloģiskais medus no Lietuvas bišu saimniecībām. Pilns ar vitamīniem un minerālvielām.',
    },
    price: 6.99, unitPrice: '€13,98/kg', unit: '500 g', image: honeyImg, images: [honeyImg],
    status: 'shipsFast', code: 'BIO-003', ean: '4770000000003', manufacturer: 'Lietuviškas Medus',
    origin: { lt: 'Lietuva', en: 'Lithuania', lv: 'Lietuva' },
    ingredients: { lt: '100% natūralus medus', en: '100% natural honey', lv: '100% dabīgs medus' },
    certificates: ['EU Bio'], packaging: { lt: 'Stiklas', en: 'Glass', lv: 'Stikls' },
    rawMaterialOrigin: { lt: 'Lietuva, Dzūkija', en: 'Lithuania, Dzūkija', lv: 'Lietuva, Dzūkija' },
    nutrition: [
      { label: { lt: 'Energinė vertė', en: 'Energy', lv: 'Enerģētiskā vērtība' }, value: '1340 kJ / 320 kcal' },
      { label: { lt: 'Riebalai', en: 'Fat', lv: 'Tauki' }, value: '0 g' },
      { label: { lt: 'iš kurių sočiųjų riebalų rūgščių', en: 'of which saturated fatty acids', lv: 'no kuriem piesātinātās taukskābes' }, value: '0 g' },
      { label: { lt: 'Angliavandeniai', en: 'Carbohydrates', lv: 'Ogļhidrāti' }, value: '80 g' },
      { label: { lt: 'iš kurių cukrų', en: 'of which sugars', lv: 'no kuriem cukuri' }, value: '72 g' },
      { label: { lt: 'Baltymai', en: 'Protein', lv: 'Olbaltumvielas' }, value: '0,3 g' },
      { label: { lt: 'Skaidulinės medžiagos', en: 'Fibre', lv: 'Šķiedrvielas' }, value: '0,2 g' },
      { label: { lt: 'Druska', en: 'Salt', lv: 'Sāls' }, value: '0,01 g' },
    ],
    allergenFree: false,
  },
  {
    id: '4', slug: 'bio-obuoliu-actas', categorySlug: 'actas',
    name: { lt: 'Bio obuolių actas', en: 'Bio Apple Cider Vinegar', lv: 'Bio ābolu etiķis' },
    description: {
      lt: 'Ekologiškas nefiltruotas obuolių actas su „motinėle". Tinka gėrimams ir salotų padažams.',
      en: 'Organic unfiltered apple cider vinegar with "mother". Suitable for drinks and dressings.',
      lv: 'Bioloģiskais nefiltrēts ābolu etiķis ar "māti". Piemērots dzērieniem un salātu mērcēm.',
    },
    price: 4.49, unitPrice: '€8,98/l', unit: '500 ml', image: vinegarImg, images: [vinegarImg],
    status: 'inStock', code: 'BIO-004', ean: '4770000000004', manufacturer: 'NaturActas',
    origin: { lt: 'Vokietija', en: 'Germany', lv: 'Vācija' },
    ingredients: { lt: 'Ekologiški obuoliai, vanduo', en: 'Organic apples, water', lv: 'Bioloģiski āboli, ūdens' },
    certificates: ['EU Bio', 'Demeter'], packaging: { lt: 'Stiklas', en: 'Glass', lv: 'Stikls' },
    rawMaterialOrigin: { lt: 'Vokietija, Bavarija', en: 'Germany, Bavaria', lv: 'Vācija, Bavārija' },
    nutrition: [
      { label: { lt: 'Energinė vertė', en: 'Energy', lv: 'Enerģētiskā vērtība' }, value: '88 kJ / 21 kcal' },
      { label: { lt: 'Riebalai', en: 'Fat', lv: 'Tauki' }, value: '0 g' },
      { label: { lt: 'iš kurių sočiųjų riebalų rūgščių', en: 'of which saturated fatty acids', lv: 'no kuriem piesātinātās taukskābes' }, value: '0 g' },
      { label: { lt: 'Angliavandeniai', en: 'Carbohydrates', lv: 'Ogļhidrāti' }, value: '0,9 g' },
      { label: { lt: 'iš kurių cukrų', en: 'of which sugars', lv: 'no kuriem cukuri' }, value: '0,4 g' },
      { label: { lt: 'Baltymai', en: 'Protein', lv: 'Olbaltumvielas' }, value: '0 g' },
      { label: { lt: 'Skaidulinės medžiagos', en: 'Fibre', lv: 'Šķiedrvielas' }, value: '0 g' },
      { label: { lt: 'Druska', en: 'Salt', lv: 'Sāls' }, value: '0 g' },
    ],
    allergenFree: true,
  },
  {
    id: '5', slug: 'bio-ciberzole', categorySlug: 'prieskoniai',
    name: { lt: 'Bio ciberžolė (miltai)', en: 'Bio Turmeric Powder', lv: 'Bio kurkuma (pulveris)' },
    description: {
      lt: 'Ekologiška ciberžolė iš Indijos. Puikus priedas smoothie, karščiams ir patiekalams.',
      en: 'Organic turmeric from India. Great addition to smoothies, curries and dishes.',
      lv: 'Bioloģiskā kurkuma no Indijas. Lielisks papildinājums smūtijiem, karī un ēdieniem.',
    },
    price: 3.99, unitPrice: '€39,90/kg', unit: '100 g', image: spiceImg, images: [spiceImg],
    status: 'inStock', code: 'BIO-005', ean: '4770000000005', manufacturer: 'SpiceWorld',
    origin: { lt: 'Indija', en: 'India', lv: 'Indija' },
    ingredients: { lt: '100% ekologiška ciberžolė', en: '100% organic turmeric', lv: '100% bioloģiskā kurkuma' },
    certificates: ['EU Bio'], packaging: { lt: 'Popierinis maišelis', en: 'Paper bag', lv: 'Papīra maisiņš' },
    rawMaterialOrigin: { lt: 'Indija, Kerala', en: 'India, Kerala', lv: 'Indija, Kerala' },
    nutrition: [
      { label: { lt: 'Energinė vertė', en: 'Energy', lv: 'Enerģētiskā vērtība' }, value: '1481 kJ / 354 kcal' },
      { label: { lt: 'Riebalai', en: 'Fat', lv: 'Tauki' }, value: '9,9 g' },
      { label: { lt: 'iš kurių sočiųjų riebalų rūgščių', en: 'of which saturated fatty acids', lv: 'no kuriem piesātinātās taukskābes' }, value: '1,8 g' },
      { label: { lt: 'Angliavandeniai', en: 'Carbohydrates', lv: 'Ogļhidrāti' }, value: '44,4 g' },
      { label: { lt: 'iš kurių cukrų', en: 'of which sugars', lv: 'no kuriem cukuri' }, value: '3,2 g' },
      { label: { lt: 'Baltymai', en: 'Protein', lv: 'Olbaltumvielas' }, value: '7,8 g' },
      { label: { lt: 'Skaidulinės medžiagos', en: 'Fibre', lv: 'Šķiedrvielas' }, value: '21,1 g' },
      { label: { lt: 'Druska', en: 'Salt', lv: 'Sāls' }, value: '0,01 g' },
    ],
    allergenFree: true,
  },
  {
    id: '6', slug: 'bio-kokosų-aliejus', categorySlug: 'aliejus',
    name: { lt: 'Bio kokosų aliejus', en: 'Bio Coconut Oil', lv: 'Bio kokosriekstu eļļa' },
    description: {
      lt: 'Šalto spaudimo ekologiškas kokosų aliejus. Tinka viriniui, kepimui ir kūno priežiūrai.',
      en: 'Cold-pressed organic coconut oil. Suitable for cooking, baking and body care.',
      lv: 'Auksti spiesta bioloģiskā kokosriekstu eļļa. Piemērota vārīšanai, cepšanai un ķermeņa kopšanai.',
    },
    price: 5.49, unitPrice: '€10,98/l', unit: '500 ml', image: oliveOilImg, images: [oliveOilImg],
    status: 'shipsFast', code: 'BIO-006', ean: '4770000000006', manufacturer: 'CocoNatur',
    origin: { lt: 'Šri Lanka', en: 'Sri Lanka', lv: 'Šrilanka' },
    ingredients: { lt: '100% ekologiškas kokosų aliejus', en: '100% organic coconut oil', lv: '100% bioloģiskā kokosriekstu eļļa' },
    certificates: ['EU Bio', 'Fairtrade'], packaging: { lt: 'Stiklas', en: 'Glass', lv: 'Stikls' },
    rawMaterialOrigin: { lt: 'Šri Lanka', en: 'Sri Lanka', lv: 'Šrilanka' },
    nutrition: [
      { label: { lt: 'Energinė vertė', en: 'Energy', lv: 'Enerģētiskā vērtība' }, value: '3700 kJ / 900 kcal' },
      { label: { lt: 'Riebalai', en: 'Fat', lv: 'Tauki' }, value: '100 g' },
      { label: { lt: 'iš kurių sočiųjų riebalų rūgščių', en: 'of which saturated fatty acids', lv: 'no kuriem piesātinātās taukskābes' }, value: '86 g' },
      { label: { lt: 'Angliavandeniai', en: 'Carbohydrates', lv: 'Ogļhidrāti' }, value: '0 g' },
      { label: { lt: 'iš kurių cukrų', en: 'of which sugars', lv: 'no kuriem cukuri' }, value: '0 g' },
      { label: { lt: 'Baltymai', en: 'Protein', lv: 'Olbaltumvielas' }, value: '0 g' },
      { label: { lt: 'Skaidulinės medžiagos', en: 'Fibre', lv: 'Šķiedrvielas' }, value: '0 g' },
      { label: { lt: 'Druska', en: 'Salt', lv: 'Sāls' }, value: '0 g' },
    ],
    allergenFree: true, isNew: true,
  },
  {
    id: '7', slug: 'bio-grikiu-kruopos', categorySlug: 'kruopos',
    name: { lt: 'Bio grikių kruopos', en: 'Bio Buckwheat Groats', lv: 'Bio griķi' },
    description: {
      lt: 'Ekologiškos žaliosios grikių kruopos. Turtingas baltymų ir skaidulų šaltinis.',
      en: 'Organic green buckwheat groats. Rich source of protein and fiber.',
      lv: 'Bioloģiskie zaļie griķi. Bagāts olbaltumvielu un šķiedrvielu avots.',
    },
    price: 3.29, unitPrice: '€6,58/kg', unit: '500 g', image: spiceImg, images: [spiceImg],
    status: 'inStock', code: 'BIO-007', ean: '4770000000007', manufacturer: 'GrainHouse',
    origin: { lt: 'Lietuva', en: 'Lithuania', lv: 'Lietuva' },
    ingredients: { lt: '100% ekologiškos grikių kruopos', en: '100% organic buckwheat', lv: '100% bioloģiskie griķi' },
    certificates: ['EU Bio'], packaging: { lt: 'Popierinis maišelis', en: 'Paper bag', lv: 'Papīra maisiņš' },
    rawMaterialOrigin: { lt: 'Lietuva', en: 'Lithuania', lv: 'Lietuva' },
    nutrition: [
      { label: { lt: 'Energinė vertė', en: 'Energy', lv: 'Enerģētiskā vērtība' }, value: '1425 kJ / 340 kcal' },
      { label: { lt: 'Riebalai', en: 'Fat', lv: 'Tauki' }, value: '3,4 g' },
      { label: { lt: 'iš kurių sočiųjų riebalų rūgščių', en: 'of which saturated fatty acids', lv: 'no kuriem piesātinātās taukskābes' }, value: '0,7 g' },
      { label: { lt: 'Angliavandeniai', en: 'Carbohydrates', lv: 'Ogļhidrāti' }, value: '60 g' },
      { label: { lt: 'iš kurių cukrų', en: 'of which sugars', lv: 'no kuriem cukuri' }, value: '0 g' },
      { label: { lt: 'Baltymai', en: 'Protein', lv: 'Olbaltumvielas' }, value: '13 g' },
      { label: { lt: 'Skaidulinės medžiagos', en: 'Fibre', lv: 'Šķiedrvielas' }, value: '10 g' },
      { label: { lt: 'Druska', en: 'Salt', lv: 'Sāls' }, value: '0,01 g' },
    ],
    allergenFree: true,
  },
  {
    id: '8', slug: 'bio-pomidoru-padazas', categorySlug: 'padazai',
    name: { lt: 'Bio pomidorų padažas Basilico', en: 'Bio Tomato Sauce Basilico', lv: 'Bio tomātu mērce Basilico' },
    description: {
      lt: 'Ekologiškas pomidorų padažas su bazilikais. Pagamintas iš itališkų pomidorų.',
      en: 'Organic tomato sauce with basil. Made from Italian tomatoes.',
      lv: 'Bioloģiskā tomātu mērce ar baziliku. Pagatavota no itāļu tomātiem.',
    },
    price: 2.99, unitPrice: '€5,98/l', unit: '500 ml', image: vinegarImg, images: [vinegarImg],
    status: 'inStock', code: 'BIO-008', ean: '4770000000008', manufacturer: 'ItalBio',
    origin: { lt: 'Italija', en: 'Italy', lv: 'Itālija' },
    ingredients: { lt: 'Ekologiški pomidorai, bazilikas, jūros druska', en: 'Organic tomatoes, basil, sea salt', lv: 'Bioloģiskie tomāti, baziliks, jūras sāls' },
    certificates: ['EU Bio'], packaging: { lt: 'Stiklas', en: 'Glass', lv: 'Stikls' },
    rawMaterialOrigin: { lt: 'Italija', en: 'Italy', lv: 'Itālija' },
    nutrition: [
      { label: { lt: 'Energinė vertė', en: 'Energy', lv: 'Enerģētiskā vērtība' }, value: '155 kJ / 37 kcal' },
      { label: { lt: 'Riebalai', en: 'Fat', lv: 'Tauki' }, value: '0,2 g' },
      { label: { lt: 'iš kurių sočiųjų riebalų rūgščių', en: 'of which saturated fatty acids', lv: 'no kuriem piesātinātās taukskābes' }, value: '0 g' },
      { label: { lt: 'Angliavandeniai', en: 'Carbohydrates', lv: 'Ogļhidrāti' }, value: '6 g' },
      { label: { lt: 'iš kurių cukrų', en: 'of which sugars', lv: 'no kuriem cukuri' }, value: '5 g' },
      { label: { lt: 'Baltymai', en: 'Protein', lv: 'Olbaltumvielas' }, value: '1,5 g' },
      { label: { lt: 'Skaidulinės medžiagos', en: 'Fibre', lv: 'Šķiedrvielas' }, value: '1 g' },
      { label: { lt: 'Druska', en: 'Salt', lv: 'Sāls' }, value: '0,8 g' },
    ],
    allergenFree: true,
  },
  {
    id: '9', slug: 'bio-tamsusis-sokoladas', categorySlug: 'saldumynai',
    name: { lt: 'Bio tamsusis šokoladas 85%', en: 'Bio Dark Chocolate 85%', lv: 'Bio tumšā šokolāde 85%' },
    description: {
      lt: 'Ekologiškas tamsusis šokoladas su 85% kakavos. Intensyvus ir sodrus skonis.',
      en: 'Organic dark chocolate with 85% cocoa. Intense and rich flavor.',
      lv: 'Bioloģiskā tumšā šokolāde ar 85% kakao. Intensīva un bagātīga garša.',
    },
    price: 3.49, unitPrice: '€34,90/kg', unit: '100 g', image: coffeeImg, images: [coffeeImg],
    status: 'inStock', code: 'BIO-009', ean: '4770000000009', manufacturer: 'ChocoNatur',
    origin: { lt: 'Šveicarija', en: 'Switzerland', lv: 'Šveice' },
    ingredients: { lt: 'Kakavos masė, kakavos sviestas, cukranendrių cukrus', en: 'Cocoa mass, cocoa butter, cane sugar', lv: 'Kakao masa, kakao sviests, cukurniedru cukurs' },
    certificates: ['EU Bio', 'Fairtrade'], packaging: { lt: 'Kartonas, folija', en: 'Cardboard, foil', lv: 'Kartons, folija' },
    rawMaterialOrigin: { lt: 'Peru', en: 'Peru', lv: 'Peru' },
    nutrition: [
      { label: { lt: 'Energinė vertė', en: 'Energy', lv: 'Enerģētiskā vērtība' }, value: '2480 kJ / 598 kcal' },
      { label: { lt: 'Riebalai', en: 'Fat', lv: 'Tauki' }, value: '46 g' },
      { label: { lt: 'iš kurių sočiųjų riebalų rūgščių', en: 'of which saturated fatty acids', lv: 'no kuriem piesātinātās taukskābes' }, value: '28 g' },
      { label: { lt: 'Angliavandeniai', en: 'Carbohydrates', lv: 'Ogļhidrāti' }, value: '19 g' },
      { label: { lt: 'iš kurių cukrų', en: 'of which sugars', lv: 'no kuriem cukuri' }, value: '12 g' },
      { label: { lt: 'Baltymai', en: 'Protein', lv: 'Olbaltumvielas' }, value: '12 g' },
      { label: { lt: 'Skaidulinės medžiagos', en: 'Fibre', lv: 'Šķiedrvielas' }, value: '15 g' },
      { label: { lt: 'Druska', en: 'Salt', lv: 'Sāls' }, value: '0,02 g' },
    ],
    allergenFree: false,
  },
  {
    id: '10', slug: 'bio-speltu-miltai', categorySlug: 'miltai',
    name: { lt: 'Bio speltų miltai', en: 'Bio Spelt Flour', lv: 'Bio speltas milti' },
    description: {
      lt: 'Ekologiški pilno grūdo speltų miltai. Puikūs duonai ir kepiniams.',
      en: 'Organic whole grain spelt flour. Perfect for bread and pastries.',
      lv: 'Bioloģiskie pilngraudu speltas milti. Ideāli maizei un konditorejas izstrādājumiem.',
    },
    price: 2.79, unitPrice: '€2,79/kg', unit: '1 kg', image: honeyImg, images: [honeyImg],
    status: 'inStock', code: 'BIO-010', ean: '4770000000010', manufacturer: 'GrainHouse',
    origin: { lt: 'Vokietija', en: 'Germany', lv: 'Vācija' },
    ingredients: { lt: '100% ekologiški speltų miltai', en: '100% organic spelt flour', lv: '100% bioloģiskie speltas milti' },
    certificates: ['EU Bio', 'Demeter'], packaging: { lt: 'Popierinis maišelis', en: 'Paper bag', lv: 'Papīra maisiņš' },
    rawMaterialOrigin: { lt: 'Vokietija', en: 'Germany', lv: 'Vācija' },
    nutrition: [
      { label: { lt: 'Energinė vertė', en: 'Energy', lv: 'Enerģētiskā vērtība' }, value: '1420 kJ / 338 kcal' },
      { label: { lt: 'Riebalai', en: 'Fat', lv: 'Tauki' }, value: '2,7 g' },
      { label: { lt: 'iš kurių sočiųjų riebalų rūgščių', en: 'of which saturated fatty acids', lv: 'no kuriem piesātinātās taukskābes' }, value: '0,6 g' },
      { label: { lt: 'Angliavandeniai', en: 'Carbohydrates', lv: 'Ogļhidrāti' }, value: '63,4 g' },
      { label: { lt: 'iš kurių cukrų', en: 'of which sugars', lv: 'no kuriem cukuri' }, value: '1,2 g' },
      { label: { lt: 'Baltymai', en: 'Protein', lv: 'Olbaltumvielas' }, value: '14,6 g' },
      { label: { lt: 'Skaidulinės medžiagos', en: 'Fibre', lv: 'Šķiedrvielas' }, value: '10,7 g' },
      { label: { lt: 'Druska', en: 'Salt', lv: 'Sāls' }, value: '0,01 g' },
    ],
    allergenFree: false,
  },
  {
    id: '11', slug: 'bio-ryzių-krekeriai', categorySlug: 'uzkandziai',
    name: { lt: 'Bio ryžių krekeriai su jūros druska', en: 'Bio Rice Crackers with Sea Salt', lv: 'Bio rīsu krekeri ar jūras sāli' },
    description: {
      lt: 'Lengvi ekologiški ryžių krekeriai su jūros druska. Puikus užkandis bet kuriam metu.',
      en: 'Light organic rice crackers with sea salt. A great snack anytime.',
      lv: 'Viegli bioloģiskie rīsu krekeri ar jūras sāli. Lieliska uzkoda jebkurā laikā.',
    },
    price: 1.99, unitPrice: '€13,27/kg', unit: '150 g', image: spiceImg, images: [spiceImg],
    status: 'shipsFast', code: 'BIO-011', ean: '4770000000011', manufacturer: 'CrunchBio',
    origin: { lt: 'Nyderlandai', en: 'Netherlands', lv: 'Nīderlande' },
    ingredients: { lt: 'Ekologiški ryžiai, jūros druska, ekologiškas alyvuogių aliejus', en: 'Organic rice, sea salt, organic olive oil', lv: 'Bioloģiskie rīsi, jūras sāls, bioloģiskā olīveļļa' },
    certificates: ['EU Bio'], packaging: { lt: 'Kartonas', en: 'Cardboard', lv: 'Kartons' },
    rawMaterialOrigin: { lt: 'Italija', en: 'Italy', lv: 'Itālija' },
    nutrition: [
      { label: { lt: 'Energinė vertė', en: 'Energy', lv: 'Enerģētiskā vērtība' }, value: '1630 kJ / 389 kcal' },
      { label: { lt: 'Riebalai', en: 'Fat', lv: 'Tauki' }, value: '3,5 g' },
      { label: { lt: 'iš kurių sočiųjų riebalų rūgščių', en: 'of which saturated fatty acids', lv: 'no kuriem piesātinātās taukskābes' }, value: '0,5 g' },
      { label: { lt: 'Angliavandeniai', en: 'Carbohydrates', lv: 'Ogļhidrāti' }, value: '81 g' },
      { label: { lt: 'iš kurių cukrų', en: 'of which sugars', lv: 'no kuriem cukuri' }, value: '0,2 g' },
      { label: { lt: 'Baltymai', en: 'Protein', lv: 'Olbaltumvielas' }, value: '7,5 g' },
      { label: { lt: 'Skaidulinės medžiagos', en: 'Fibre', lv: 'Šķiedrvielas' }, value: '1,4 g' },
      { label: { lt: 'Druska', en: 'Salt', lv: 'Sāls' }, value: '1,2 g' },
    ],
    allergenFree: true, isNew: true,
  },
  {
    id: '12', slug: 'bio-kakavos-milteliai', categorySlug: 'kakava',
    name: { lt: 'Bio kakavos milteliai', en: 'Bio Cocoa Powder', lv: 'Bio kakao pulveris' },
    description: {
      lt: 'Ekologiški neriebalinti kakavos milteliai. Puikūs gėrimams ir kepiniams.',
      en: 'Organic defatted cocoa powder. Great for drinks and baking.',
      lv: 'Bioloģiskais kakao pulveris bez taukiem. Lielisks dzērieniem un cepšanai.',
    },
    price: 4.99, unitPrice: '€19,96/kg', unit: '250 g', image: coffeeImg, images: [coffeeImg],
    status: 'inStock', code: 'BIO-012', ean: '4770000000012', manufacturer: 'ChocoNatur',
    origin: { lt: 'Peru', en: 'Peru', lv: 'Peru' },
    ingredients: { lt: '100% ekologiški kakavos milteliai', en: '100% organic cocoa powder', lv: '100% bioloģiskais kakao pulveris' },
    certificates: ['EU Bio', 'Fairtrade'], packaging: { lt: 'Popierinis maišelis', en: 'Paper bag', lv: 'Papīra maisiņš' },
    rawMaterialOrigin: { lt: 'Peru', en: 'Peru', lv: 'Peru' },
    nutrition: [
      { label: { lt: 'Energinė vertė', en: 'Energy', lv: 'Enerģētiskā vērtība' }, value: '1540 kJ / 368 kcal' },
      { label: { lt: 'Riebalai', en: 'Fat', lv: 'Tauki' }, value: '11 g' },
      { label: { lt: 'iš kurių sočiųjų riebalų rūgščių', en: 'of which saturated fatty acids', lv: 'no kuriem piesātinātās taukskābes' }, value: '6,5 g' },
      { label: { lt: 'Angliavandeniai', en: 'Carbohydrates', lv: 'Ogļhidrāti' }, value: '12 g' },
      { label: { lt: 'iš kurių cukrų', en: 'of which sugars', lv: 'no kuriem cukuri' }, value: '0,5 g' },
      { label: { lt: 'Baltymai', en: 'Protein', lv: 'Olbaltumvielas' }, value: '20 g' },
      { label: { lt: 'Skaidulinės medžiagos', en: 'Fibre', lv: 'Šķiedrvielas' }, value: '33,2 g' },
      { label: { lt: 'Druska', en: 'Salt', lv: 'Sāls' }, value: '0,02 g' },
    ],
    allergenFree: true,
  },
];
