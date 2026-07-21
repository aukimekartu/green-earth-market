import { cn } from '@/lib/utils';
import type { CatalogProduct } from '@/lib/shopifyCatalog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ecoIcon from '@/assets/badges/eco-leaf.png';
import demeterIcon from '@/assets/badges/demeter.png';
import glutenFreeIcon from '@/assets/badges/gluten-free.png';
import lactoseFreeIcon from '@/assets/badges/lactose-free.png';
import noSugarIcon from '@/assets/badges/no-added-sugar.png';

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

export function detectBadges(product: Pick<CatalogProduct, 'tags' | 'description' | 'certificates' | 'mainSlugs'>): DetectedBadge[] {
  const text = normalize(`${product.description ?? ''} ${(product.tags ?? []).join(' ')}`);
  const certs = (product.certificates ?? []).map(c => c.toLowerCase());
  const isFood = (product.mainSlugs ?? []).includes('maistas');

  const badges: DetectedBadge[] = [];

  const isEco =
    certs.includes('eu bio') ||
    certs.includes('demeter') ||
    certs.includes('usda organic') ||
    /\b(ekologis|organic|bio-|biologis)/.test(text) ||
    /\beko\b/.test(text);

  if (isFood && isEco) {
    badges.push({
      key: 'eco',
      label: 'Ekologiškas',
      icon: ecoIcon,
    });
  }

  if (certs.includes('demeter') || /\bdemeter\b|biodinami/.test(text)) {
    badges.push({
      key: 'demeter',
      label: 'Demeter',
      icon: demeterIcon,
    });
  }

  if (/be glitimo|gluten[- ]free|be glitim/.test(text)) {
    badges.push({
      key: 'gluten-free',
      label: 'Be glitimo',
      icon: glutenFreeIcon,
    });
  }

  if (/be laktozes|lactose[- ]free|be pieno/.test(text)) {
    badges.push({
      key: 'lactose-free',
      label: 'Be laktozės',
      icon: lactoseFreeIcon,
    });
  }

  if (/be pridetinio cukraus|no added sugar|be cukraus/.test(text)) {
    badges.push({
      key: 'no-added-sugar',
      label: 'Be pridėtinio cukraus',
      icon: noSugarIcon,
    });
  }

  return badges;
}

interface Props {
  product: Pick<CatalogProduct, 'tags' | 'description' | 'certificates' | 'mainSlugs'>;
  size?: 'sm' | 'md';
  className?: string;
}

export function ProductBadges({ product, size = 'sm', className }: Props) {
  const badges = detectBadges(product);
  if (badges.length === 0) return null;

  const dim = size === 'md' ? 'w-10 h-10' : 'w-7 h-7';

  return (
    <TooltipProvider delayDuration={100}>
      <div className={cn('flex flex-wrap gap-1.5', className)}>
        {badges.map(b => (
          <Tooltip key={b.key}>
            <TooltipTrigger asChild>
              <span
                className={cn(
                  'inline-flex items-center justify-center rounded-full bg-card/90 backdrop-blur shadow-sm ring-1 ring-border',
                  dim
                )}
                aria-label={b.label}
              >
                <img src={b.icon} alt={b.label} className="w-full h-full object-contain p-0.5" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="font-sans text-xs">
              {b.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}