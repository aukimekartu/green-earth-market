import { BrandIcon } from '@/components/BrandIcon';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import type { CatalogProduct } from '@/lib/shopifyCatalog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ecoIconAsset from '@/assets/badges/eu-bio.png.asset.json';
import demeterIconAsset from '@/assets/badges/demeter-logo.png.asset.json';
import glutenFreeIcon from '@/assets/badges/gluten-free.png';
import lactoseFreeIcon from '@/assets/badges/lactose-free.png';
import noSugarIcon from '@/assets/badges/no-added-sugar.png';

const ecoIcon = ecoIconAsset.url;
const demeterIcon = demeterIconAsset.url;

export type BadgeKey = 'eco' | 'demeter' | 'gluten-free' | 'lactose-free' | 'no-added-sugar';

interface DetectedBadge {
  key: BadgeKey;
  label: string;
  icon: string;
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function detectBadges(product: Pick<CatalogProduct, 'title' | 'tags' | 'description' | 'certificates' | 'mainSlugs'>): DetectedBadge[] {
  const text = normalize(`${product.title ?? ''} ${product.description ?? ''} ${(product.tags ?? []).join(' ')}`);
  const certs = (product.certificates ?? []).map(c => c.toLowerCase());

  // Explicit tags from the Shopify "Tags" column, e.g. badge:gluten-free
  const tagSet = new Set(
    (product.tags ?? []).map(t => normalize(t).trim().replace(/^badge[:\-_\s]*/, '').replace(/[\s_]+/g, '-'))
  );
  const hasTag = (...keys: string[]) => keys.some(k => tagSet.has(k));

  const badges: DetectedBadge[] = [];

  const isDemeter =
    hasTag('demeter', 'biodinaminis') ||
    certs.includes('demeter') ||
    /\bdemeter\b|biodinami/.test(text);

  const isEco =
    hasTag('eko', 'ekologiskas', 'organic', 'eu-bio', 'bio') ||
    certs.includes('eu bio') ||
    certs.includes('demeter') ||
    certs.includes('usda organic') ||
    /\b(ekologis|organic|bio-|biologis)/.test(text) ||
    /\beko\b/.test(text) ||
    isDemeter;

  if (isEco) {
    badges.push({
      key: 'eco',
      label: 'Ekologiškas',
      icon: ecoIcon,
    });
  }

  if (isDemeter) {
    badges.push({
      key: 'demeter',
      label: 'Demeter',
      icon: demeterIcon,
    });
  }

  if (hasTag('be-glitimo', 'gluten-free', 'begliteno') || /be glitimo|gluten[- ]free|be glitim/.test(text)) {
    badges.push({
      key: 'gluten-free',
      label: 'Be glitimo',
      icon: glutenFreeIcon,
    });
  }

  if (hasTag('be-laktozes', 'lactose-free') || /be laktozes|lactose[- ]free|be pieno/.test(text)) {
    badges.push({
      key: 'lactose-free',
      label: 'Be laktozės',
      icon: lactoseFreeIcon,
    });
  }

  if (
    hasTag('be-cukraus', 'be-pridetinio-cukraus', 'no-added-sugar', 'sugar-free') ||
    /be pridetinio cukraus|no added sugar|be cukraus/.test(text)
  ) {
    badges.push({
      key: 'no-added-sugar',
      label: 'Be pridėtinio cukraus',
      icon: noSugarIcon,
    });
  }


  return badges;
}

interface Props {
  product: Pick<CatalogProduct, 'title' | 'tags' | 'description' | 'certificates' | 'mainSlugs'>;
  size?: 'sm' | 'md';
  className?: string;
  variant?: 'card' | 'detail';
}

export function ProductBadges({ product, size = 'sm', className, variant = 'detail' }: Props) {
  const { lang } = useLanguage();
  let badges = detectBadges(product);
  if (variant === 'card') {
    badges = badges.slice(0, 3);
  }
  if (badges.length === 0) return null;

  const symbols = { eco: 'a-eko', demeter: 'a-bio', 'gluten-free': 'a-gluten', 'lactose-free': 'a-lactose', 'no-added-sugar': 'i-sparkle' };
  const labels = { eco: ['Ekologiška', 'Organic', 'Bioloģisks'], demeter: ['Biodinaminė', 'Biodynamic', 'Biodinamisks'], 'gluten-free': ['Be glitimo', 'Gluten-free', 'Bez glutēna'], 'lactose-free': ['Be laktozės', 'Lactose-free', 'Bez laktozes'], 'no-added-sugar': ['Be pridėtinio cukraus', 'No added sugar', 'Bez pievienota cukura'] };
  const label = (key: BadgeKey) => labels[key][lang === 'lt' ? 0 : lang === 'en' ? 1 : 2];

  return (
    <TooltipProvider delayDuration={100}>
      <div className={cn('flex flex-wrap gap-1.5', className)}>
        {badges.map(b => (
          <Tooltip key={b.key}>
            <TooltipTrigger asChild>
              <span
                className={cn('inline-flex items-center gap-2 text-primary', variant === 'card' ? 'w-7 h-7 justify-center bg-background rounded-sm' : 'px-2 py-1')}
                aria-label={label(b.key)}
                title={label(b.key)}
              >
                <BrandIcon name={symbols[b.key]} className="w-5 h-5 shrink-0" />
                {variant === 'detail' && <><span className="text-sm text-foreground">{label(b.key)}</span>{(b.key === 'eco' || b.key === 'demeter') && <img src={b.icon} alt={b.label} className="h-7 w-auto object-contain" />}</>}
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="font-sans text-xs">
              {label(b.key)}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}