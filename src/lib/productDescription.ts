// Parses Shopify product descriptions into structured sections:
// - Nutrition table (Maistingumo deklaracija)
// - Titled sections (Sudėtis, Paruošimas, Vartojimas, Geriausias iki, Laikyti, Pagaminta, Prekės ženklo šalis, ...)
// - Remaining text as free paragraphs

export interface NutritionRow {
  label: string;
  value: string;
  indent?: boolean;
}

export interface NutritionBlock {
  per: string;
  rows: NutritionRow[];
}

export interface DescriptionSection {
  title: string;
  body: string;
}

export interface ParsedDescription {
  nutrition: NutritionBlock | null;
  sections: DescriptionSection[];
  intro: string;
}

// Ordered so longer titles are matched before shorter prefixes.
const SECTION_KEYWORDS = [
  'Maistingumo deklaracija',
  'Maistingumo vertė',
  'Maistinė vertė',
  'Energetinė vertė',
  'Sudėtis',
  'Sudetis',
  'Ingredientai',
  'Sudedamosios dalys',
  'Paruošimas',
  'Vartojimas',
  'Naudojimas',
  'Rekomendacijos',
  'Alergenai',
  'Geriausias iki',
  'Tinka vartoti iki',
  'Laikymo sąlygos',
  'Laikymas',
  'Laikyti',
  'Pakuotė',
  'Pakuotėje',
  'Vienetas',
  'Kilmė',
  'Pagaminta',
  'Prekės ženklo šalis',
  'Gamintojas',
];

function normalize(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
}

function buildHeaderRegex(): RegExp {
  const alts = SECTION_KEYWORDS
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  // Case-sensitive so lower-cased occurrences inside sentences (e.g. "pakuotės", "energetinė vertė")
  // never match as section headers. Require a word-boundary on the left.
  return new RegExp(`(?<=^|[\\s.])(${alts})`, 'g');
}

const NUTRITION_KEYS = new Set(
  ['Maistingumo deklaracija', 'Maistingumo vertė', 'Maistinė vertė', 'Energetinė vertė'].map((s) => s.toLowerCase())
);

interface RawSection {
  key: string;
  start: number;
  headerEnd: number;
  body: string;
}

function findSections(text: string): { intro: string; sections: RawSection[] } {
  const regex = buildHeaderRegex();
  const matches: RawSection[] = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    const key = SECTION_KEYWORDS.find((k) => k === m![1]) ?? m[1];
    const headerStart = m.index;
    let headerEnd = headerStart + m[1].length;
    while (headerEnd < text.length && /[\s:\-–—/]/.test(text[headerEnd])) headerEnd++;
    matches.push({ key, start: headerStart, headerEnd, body: '' });
  }
  // Filter overlaps and drop repeat nutrition headers so they stay inside the table body.
  const filtered: RawSection[] = [];
  let nutritionSeen = false;
  for (const s of matches) {
    if (filtered.length > 0 && s.start < filtered[filtered.length - 1].headerEnd) continue;
    const isNutrition = NUTRITION_KEYS.has(s.key.toLowerCase());
    if (isNutrition) {
      if (nutritionSeen) continue;
      nutritionSeen = true;
    }
    filtered.push(s);
  }
  for (let i = 0; i < filtered.length; i++) {
    const end = i + 1 < filtered.length ? filtered[i + 1].start : text.length;
    filtered[i].body = text.slice(filtered[i].headerEnd, end).trim().replace(/^[.\s]+|[\s]+$/g, '');
  }
  const intro = (filtered.length > 0 ? text.slice(0, filtered[0].start) : text).trim();
  return { intro, sections: filtered };
}

function parseNutrition(body: string): NutritionBlock | null {
  let per = '';
  let rest = body;

  const perMatch = rest.match(/^(\d+[.,]?\d*)\s*(g|ml)\b\s*[-–—:]?\s*/i);
  if (perMatch) {
    per = `${perMatch[1].replace('.', ',')} ${perMatch[2].toLowerCase()}`;
    rest = rest.slice(perMatch[0].length);
  }

  const rawRows = rest
    .split(/;|\n/)
    .map((r) => r.trim())
    .filter(Boolean);

  const rows: NutritionRow[] = [];
  for (const raw of rawRows) {
    const colon = raw.indexOf(':');
    if (colon === -1) continue;
    let label = raw.slice(0, colon).trim();
    let value = raw.slice(colon + 1).trim();
    if (!label || !value) continue;
    value = value.replace(/\.$/, '').trim();
    const indent = /^iš kurių/i.test(label);
    label = label.charAt(0).toUpperCase() + label.slice(1);
    rows.push({ label, value, indent });
  }

  if (rows.length === 0) return null;
  return { per: per || '100 g', rows };
}

export function parseProductDescription(raw: string | null | undefined): ParsedDescription {
  const text = normalize(raw ?? '');
  if (!text) return { nutrition: null, sections: [], intro: '' };

  const { intro, sections: rawSections } = findSections(text);

  let nutrition: NutritionBlock | null = null;
  const sections: DescriptionSection[] = [];

  for (const s of rawSections) {
    const isNutrition = /maistingumo|maistinė|energetinė/i.test(s.key);
    if (isNutrition && !nutrition) {
      nutrition = parseNutrition(s.body);
      if (nutrition) continue;
    }
    if (s.body) sections.push({ title: s.key, body: s.body });
  }

  return { nutrition, sections, intro };
}
