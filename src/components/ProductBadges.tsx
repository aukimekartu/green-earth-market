import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CatalogProduct } from '@/lib/shopifyCatalog';

export type BadgeKey = 'eco' | 'demeter' | 'gluten-free' | 'lactose-free' | 'no-added-sugar';

interface DetectedBadge {
  key: BadgeKey;
  label: string;
  className: string;
  icon?: React.ReactNode;
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
      className: 'bg-primary/10 text-primary border-primary/30',
      icon: <Leaf className="w-3 h-3" />,
    });
  }

  if (certs.includes('demeter') || /\bdemeter\b|biodinami/.test(text)) {
    badges.push({
      key: 'demeter',
      label: 'Demeter',
      className: 'bg-amber-100 text-amber-900 border-amber-300',
    });
  }

  if (/be glitimo|gluten[- ]free|be glitim/.test(text)) {
    badges.push({
      key: 'gluten-free',
      label: 'Be glitimo',
      className: 'bg-orange-100 text-orange-900 border-orange-300',
    });
  }

  if (/be laktozes|lactose[- ]free|be pieno/.test(text)) {
    badges.push({
      key: 'lactose-free',
      label: 'Be laktozės',
      className: 'bg-sky-100 text-sky-900 border-sky-300',
    });
  }

  if (/be pridetinio cukraus|no added sugar|be cukraus/.test(text)) {
    badges.push({
      key: 'no-added-sugar',
      label: 'Be pridėtinio cukraus',
      className: 'bg-rose-100 text-rose-900 border-rose-300',
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

  const sizeCls = size === 'md' ? 'text-xs px-2.5 py-1' : 'text-[10px] px-2 py-0.5';

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {badges.map(b => (
        <span
          key={b.key}
          className={cn(
            'inline-flex items-center gap-1 rounded-full border font-sans font-medium leading-none',
            sizeCls,
            b.className
          )}
        >
          {b.icon}
          {b.label}
        </span>
      ))}
    </div>
  );
}