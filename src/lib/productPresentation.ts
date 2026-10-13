import { formatPrice } from '@/lib/utils';

/** Only explicit metric package amounts, never nutrition values or item counts. */
export function getPackagePrice(title: string, price: number) {
  const matches = [...title.matchAll(/(?:^|[\s,(])(\d+(?:[.,]\d+)?)\s*(kg|ml|g|l)\b/gi)];
  const match = matches.at(-1);
  if (!match || /\d+\s*[x×]\s*$/i.test(title.slice(0, match.index))) return null;
  const amount = Number(match[1].replace(',', '.'));
  const unit = match[2].toLowerCase();
  if (!amount) return null;
  const base = unit === 'g' || unit === 'ml' ? amount / 1000 : amount;
  const baseUnit = unit === 'g' || unit === 'kg' ? 'kg' : 'l';
  return `${match[1].replace('.', ',')} ${unit} (${formatPrice(price / base)}/${baseUnit})`;
}

export function stockKey(available: boolean, inventory?: number | null) {
  if (!available) return 'product.unavailable';
  if (typeof inventory === 'number' && inventory > 0 && inventory <= 5) return 'product.lowStock';
  return 'product.inStock';
}