import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { Button } from '@/components/ui/button';
import { ProductInfoDialog } from '@/components/ProductInfoDialog';
import { ProductBadges } from '@/components/ProductBadges';
import type { CatalogProduct } from '@/lib/shopifyCatalog';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: CatalogProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { lang, t } = useLanguage();
  const { addProduct } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(product.handle);

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="relative aspect-square bg-secondary/30 overflow-hidden">
        <Link to={`/${lang}/product/${product.handle}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
        <button
          onClick={() => toggleFavorite(product.handle)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur flex items-center justify-center hover:bg-card transition-colors shadow-sm"
          aria-label={t('favorites.title')}
        >
          <Heart className={cn('w-5 h-5 transition-colors', fav ? 'fill-accent text-accent' : 'text-muted-foreground')} />
        </button>
        <ProductBadges product={product} className="absolute top-3 left-3 max-w-[calc(100%-3.5rem)]" />
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2">
        <Link to={`/${lang}/product/${product.handle}`} className="hover:text-primary transition-colors">
          <h3 className="font-semibold text-sm leading-tight text-foreground line-clamp-2">
            {product.title}
          </h3>
        </Link>

        <ProductInfoDialog product={product} />

        <p className="text-xs text-muted-foreground">
          {product.availableForSale ? t('product.inStock') : t('product.shipsFast')}
        </p>
        <div className="mt-auto pt-2 flex items-end justify-between gap-2">
          <div>
            <div className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded inline-block">
              €{product.price.toFixed(2)}
            </div>
            {product.vendor && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{product.vendor}</p>}
          </div>
          <Button
            variant="cta"
            size="sm"
            onClick={() => addProduct(product)}
            className="shrink-0 text-xs"
            disabled={!product.availableForSale}
          >
            {t('cart.addToCart')}
          </Button>
        </div>
      </div>
    </div>
  );
}
