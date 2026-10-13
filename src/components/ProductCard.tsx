import { formatPrice } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { getPackagePrice, stockKey } from '@/lib/productPresentation';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/button';
import { ProductBadges } from '@/components/ProductBadges';
import type { CatalogProduct } from '@/lib/shopifyCatalog';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: CatalogProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { lang, t } = useLanguage();
  const { addProduct, items, updateQuantity, isLoading } = useCart();
  const item = items.find(i => i.handle === product.handle);
  const packagePrice = getPackagePrice(product.title, product.price);
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(product.handle);

  return (
    <div className={cn('flex flex-col min-w-0', item ? 'bg-accent' : 'bg-card')}>
      <div className="relative aspect-square bg-background overflow-hidden">
        <Link to={`/${lang}/product/${product.handle}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4"
            loading="lazy"
          />
        </Link>
        <Button variant="ghost" size="icon"
          onClick={() => toggleFavorite(product.handle)}
          className="absolute top-3 right-3 w-8 h-8 rounded-sm bg-card flex items-center justify-center hover:bg-card transition-colors"
          aria-label={t('favorites.title')}
        >
          <Heart className={cn('w-5 h-5 transition-colors', fav ? 'fill-primary text-primary' : 'text-muted-foreground')} />
        </Button>
        <ProductBadges product={product} variant="card" className="absolute top-3 left-3 max-w-[calc(100%-3.5rem)]" />
      </div>

      <div className="flex flex-col flex-1 p-2 gap-2">
        <Link to={`/${lang}/product/${product.handle}`} className="hover:text-primary transition-colors">
          <h3 className="font-semibold text-[15px] leading-[21px] text-foreground line-clamp-3 min-h-[63px]">
            {product.title}
          </h3>
        </Link>

        {packagePrice && <p className="text-[13px] leading-[18px] text-muted-foreground tabular">{packagePrice}</p>}
        {product.vendor && <p className="text-[13px] text-muted-foreground">{product.vendor}</p>}
        {(!product.availableForSale || (product.totalInventory != null && product.totalInventory > 0 && product.totalInventory <= 5)) && <p className="text-xs text-warning">{t(stockKey(product.availableForSale, product.totalInventory))}</p>}
        <div className="mt-auto pt-2 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[17px] font-semibold tabular">{formatPrice(product.price)}</span>
          {item ? <div className="flex items-center rounded-sm border border-input bg-background h-10">
            <Button variant="ghost" size="icon" className="w-8 h-9" aria-label={t('cart.decrease')} disabled={isLoading} onClick={() => updateQuantity(item.variantId, item.quantity - 1)}><Minus /></Button>
            <span className="w-6 text-center text-sm tabular">{item.quantity}</span>
            <Button variant="ghost" size="icon" className="w-8 h-9" aria-label={t('cart.increase')} disabled={isLoading} onClick={() => updateQuantity(item.variantId, item.quantity + 1)}><Plus /></Button>
          </div> : <Button variant="cta" size="icon" className="rounded-full shrink-0" aria-label={t('cart.addToCart')} title={t('cart.addToCart')} onClick={() => addProduct(product)} disabled={!product.availableForSale || isLoading}><ShoppingCart /></Button>}
        </div>
      </div>
    </div>
  );
}
