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
        <Link to={`/${lang}/products`} className="text-accent underline mt-4 inline-block">← Back</Link>
      </div>
    );
  }

  const fav = isFavorite(product.handle);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div>
          <div className="aspect-square bg-secondary/30 rounded-2xl overflow-hidden">
            <img
              src={product.images[activeImage] ?? product.image}
              alt={product.title}
              className="w-full h-full object-contain p-8"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    'w-16 h-16 rounded-lg border-2 bg-card overflow-hidden',
                    i === activeImage ? 'border-primary' : 'border-border'
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="bg-secondary rounded-2xl p-6 md:p-8 torn-edge-bottom relative">
            <h1 className="text-3xl md:text-4xl text-foreground mb-4">{product.title}</h1>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="bg-primary text-primary-foreground text-2xl font-bold px-4 py-2 rounded-lg font-sans">
                €{product.price.toFixed(2)}
              </span>
            </div>

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
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border border-border rounded-lg bg-card">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors rounded-l-lg"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold font-sans">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors rounded-r-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button
                variant="cta"
                size="lg"
                className="flex-1"
                onClick={() => addProduct(product, quantity)}
                disabled={!product.availableForSale}
              >
                {t('cart.addToCart')}
              </Button>
            </div>

            <button
              onClick={() => toggleFavorite(product.handle)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors font-sans"
            >
              <Heart className={cn('w-5 h-5', fav ? 'fill-accent text-accent' : '')} />
              {t('favorites.title')}
            </button>

            <p className="mt-4 text-sm text-muted-foreground font-sans">
              {product.availableForSale ? `✓ ${t('product.inStock')}` : `⚡ ${t('product.shipsFast')}`}
            </p>
          </div>

          {/* Mobile sticky add to cart */}
          <div className="fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border p-3 flex items-center gap-3 lg:hidden">
            <span className="font-bold text-lg font-sans">€{product.price.toFixed(2)}</span>
            <Button variant="cta" className="flex-1" onClick={() => addProduct(product, quantity)} disabled={!product.availableForSale}>
              {t('cart.addToCart')}
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 lg:mt-16">
        <Tabs defaultValue="description">
          <TabsList className="bg-secondary/50 w-full justify-start">
            <TabsTrigger value="description" className="font-handwritten text-lg">{t('product.description')}</TabsTrigger>
            <TabsTrigger value="info" className="font-handwritten text-lg">{t('product.productInfo')}</TabsTrigger>
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
                {product.tags.length > 0 && (
                  <div className="sm:col-span-2">
                    <span className="text-muted-foreground">Tags:</span>
                    <span className="ml-2 text-foreground">{product.tags.join(', ')}</span>
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
