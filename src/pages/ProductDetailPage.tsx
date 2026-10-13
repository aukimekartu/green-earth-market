import { getPackagePrice, stockKey } from '@/lib/productPresentation';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, Heart, Check, Loader2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useProductByHandle } from '@/hooks/useCatalog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ProductDescription } from '@/components/ProductDescription';
import { ProductBadges } from '@/components/ProductBadges';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const { addProduct } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { data: product, isLoading } = useProductByHandle(slug);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-xl text-muted-foreground">Product not found</p>
        <Link to={`/${lang}/products`} className="text-primary underline mt-4 inline-block">← Back</Link>
      </div>
    );
  }

  const fav = isFavorite(product.handle);

  return (
    <div className="container mx-auto px-4 py-8 pb-24 lg:pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div>
          <div className="aspect-square bg-background overflow-hidden">
            <img
              src={product.images[activeImage] ?? product.image}
              alt={product.title}
              className="w-full h-full object-contain p-8"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <Button variant="ghost" size="icon"
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    'w-16 h-16 rounded-lg border-2 bg-card overflow-hidden',
                    i === activeImage ? 'border-primary' : 'border-border'
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-1" />
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="py-2 relative">
            <h1 className="text-[32px] leading-10 text-foreground mb-4">{product.title}</h1>

            <ProductBadges product={product} size="md" className="mb-4" />

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-semibold tabular">
                {formatPrice(product.price)}
              </span>
            </div>

            {getPackagePrice(product.title, product.price) && <p className="mb-4 text-sm text-muted-foreground tabular">{getPackagePrice(product.title, product.price)}</p>}
            <div className="space-y-2 mb-6 text-sm font-sans text-muted-foreground">
              {product.vendor && (
                <p>{t('product.manufacturer')}: <span className="text-foreground">{product.vendor}</span></p>
              )}
              {product.productType && (
                <p>{lang === 'lt' ? 'Tipas' : lang === 'en' ? 'Type' : 'Tips'}: <span className="text-foreground">{product.productType}</span></p>
              )}
            </div>

            {/* Certificates */}
            {product.certificates.length > 0 && (
              <div className="space-y-1.5 mb-6">
                {product.certificates.map(cert => (
                  <div key={cert} className="flex items-center gap-2 text-sm font-sans">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center border border-input rounded-sm bg-card">
                <Button variant="ghost" size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors rounded-l-lg"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-semibold font-sans">{quantity}</span>
                <Button variant="ghost" size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors rounded-r-lg"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="cta"
                size="lg"
                className="flex-1 min-w-[140px]"
                onClick={() => addProduct(product, quantity)}
                disabled={!product.availableForSale}
              >
                {t('cart.addToCart')}
              </Button>
            </div>

            <Button variant="ghost" size="icon"
              onClick={() => toggleFavorite(product.handle)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-sans"
            >
              <Heart className={cn('w-5 h-5', fav ? 'fill-primary text-primary' : '')} />
              {t('favorites.title')}
            </Button>

            <p className="mt-4 text-sm text-muted-foreground font-sans">
              {t(stockKey(product.availableForSale, product.totalInventory))}
            </p>
            <p className="text-sm text-muted-foreground mt-3">{lang === 'lt' ? 'Išsiunčiame per 1–2 darbo dienas. Į paštomatą 3,70 €, virš 60 € nemokamai.' : lang === 'en' ? 'Dispatch in 1–2 business days. Parcel locker 3,70 €, free over 60 €.' : 'Nosūtām 1–2 darba dienās. Pakomāts 3,70 €, virs 60 € bez maksas.'}</p>
          </div>

          {/* Mobile sticky add to cart */}
          <div className="fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border p-3 flex items-center gap-3 lg:hidden">
            <span className="font-bold text-lg font-sans">{formatPrice(product.price)}</span>
            <Button variant="cta" className="flex-1 min-w-[140px]" onClick={() => addProduct(product, quantity)} disabled={!product.availableForSale}>
              {t('cart.addToCart')}
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 lg:mt-16">
        <Tabs defaultValue="description">
          <TabsList className="bg-secondary w-full justify-start h-auto flex-wrap">
            <TabsTrigger value="description" className="text-base font-semibold">{t('product.description')}</TabsTrigger>
            <TabsTrigger value="info" className="text-base font-semibold">{t('product.productInfo')}</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <ProductDescription description={product.description} mode="intro" className="max-w-3xl" />
          </TabsContent>
          <TabsContent value="info" className="mt-6">
            <div className="max-w-3xl space-y-6">
              <ProductDescription description={product.description} mode="details" />
              {product.certificates.length > 0 && (
                <div>
                  <h3 className="text-xl text-foreground mb-2">{t('product.qualityMarks')}</h3>
                  <div className="flex gap-2 flex-wrap items-center">
                    {product.certificates.map(cert => (
                      <span key={cert} className="px-3 py-1 bg-secondary rounded-full text-sm font-sans font-medium">{cert}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-sm">
                {product.vendor && (
                  <div>
                    <span className="text-muted-foreground">{t('product.manufacturer')}:</span>
                    <span className="ml-2 text-foreground">{product.vendor}</span>
                  </div>
                )}
                {product.productType && (
                  <div>
                    <span className="text-muted-foreground">{lang === 'lt' ? 'Tipas' : lang === 'en' ? 'Type' : 'Tips'}:</span>
                    <span className="ml-2 text-foreground">{product.productType}</span>
                  </div>
                )}

              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetailPage;
