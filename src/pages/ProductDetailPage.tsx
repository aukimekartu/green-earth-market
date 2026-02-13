import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, Heart, Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import euBioLogo from '@/assets/certificates/eu-bio.png';
import demeterLogo from '@/assets/certificates/demeter.png';

const certificateLogos: Record<string, { src: string; label: string }> = {
  'EU Bio': { src: euBioLogo, label: '(ES) ekologiškų maisto produktų ženklas' },
  'Demeter': { src: demeterLogo, label: 'Demeter' },
};

const ProductDetailPage = () => {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-xl text-muted-foreground">Product not found</p>
        <Link to={`/${lang}/products`} className="text-accent underline mt-4 inline-block">← Back</Link>
      </div>
    );
  }

  const fav = isFavorite(product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div>
          <div className="aspect-square bg-secondary/30 rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name[lang]}
              className="w-full h-full object-contain p-8"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <div key={i} className="w-16 h-16 rounded-lg border-2 border-primary bg-card overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-contain p-1" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="bg-secondary rounded-2xl p-6 md:p-8 torn-edge-bottom relative">
            <h1 className="text-3xl md:text-4xl text-foreground mb-4">{product.name[lang]}</h1>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="bg-primary text-primary-foreground text-2xl font-bold px-4 py-2 rounded-lg font-sans">
                €{product.price.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground font-sans">{product.unitPrice}</span>
            </div>

            <div className="space-y-2 mb-6 text-sm font-sans text-muted-foreground">
              <p>{t('product.productCode')}: <span className="text-foreground">{product.code}</span></p>
              <p>{t('product.ean')}: <span className="text-foreground">{product.ean}</span></p>
              <p>{t('product.manufacturer')}: <span className="text-foreground">{product.manufacturer}</span></p>
            </div>

            {/* Certificates */}
            <div className="space-y-1.5 mb-6">
              {product.certificates.map(cert => (
                <div key={cert} className="flex items-center gap-2 text-sm font-sans">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
              {product.allergenFree && (
                <div className="flex items-center gap-2 text-sm font-sans">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>{t('filters.allergenFree')}</span>
                </div>
              )}
            </div>

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
                onClick={() => addItem(product.id, quantity)}
              >
                {t('cart.addToCart')}
              </Button>
            </div>

            <button
              onClick={() => toggleFavorite(product.id)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors font-sans"
            >
              <Heart className={cn('w-5 h-5', fav ? 'fill-accent text-accent' : '')} />
              {t('favorites.title')}
            </button>

            <p className="mt-4 text-sm text-muted-foreground font-sans">
              {product.status === 'inStock' ? `✓ ${t('product.inStock')}` : `⚡ ${t('product.shipsFast')}`}
            </p>
          </div>

          {/* Mobile sticky add to cart */}
          <div className="fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border p-3 flex items-center gap-3 lg:hidden">
            <span className="font-bold text-lg font-sans">€{product.price.toFixed(2)}</span>
            <Button variant="cta" className="flex-1" onClick={() => addItem(product.id, quantity)}>
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
            <p className="text-foreground font-sans leading-relaxed max-w-3xl">{product.description[lang]}</p>
          </TabsContent>
          <TabsContent value="info" className="mt-6">
            <div className="max-w-3xl space-y-6">
              <div>
                <h3 className="text-xl text-foreground mb-2">{t('product.ingredients')}</h3>
                <p className="font-sans text-muted-foreground">{product.ingredients[lang]}</p>
              </div>
              <div>
                <h3 className="text-xl text-foreground mb-2">{t('product.qualityMarks')}</h3>
                <div className="flex gap-4 flex-wrap items-center">
                  {product.certificates.map(cert => {
                    const logo = certificateLogos[cert];
                    return logo ? (
                      <img key={cert} src={logo.src} alt={logo.label} className="h-12 object-contain" />
                    ) : (
                      <span key={cert} className="px-3 py-1 bg-secondary rounded-full text-sm font-sans font-medium">{cert}</span>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-sm">
                <div>
                  <span className="text-muted-foreground">{t('product.origin')}:</span>
                  <span className="ml-2 text-foreground">{product.origin[lang]}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('product.packaging')}:</span>
                  <span className="ml-2 text-foreground">{product.packaging[lang]}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{t('product.rawMaterialOrigin')}:</span>
                  <span className="ml-2 text-foreground">{product.rawMaterialOrigin[lang]}</span>
                </div>
              </div>
              {product.nutrition.length > 0 && (
                <div>
                  <h3 className="text-xl text-foreground mb-3">{t('product.nutritionTable')} ({t('product.per100')})</h3>
                  <table className="w-full text-sm font-sans border border-border rounded-lg overflow-hidden">
                    <tbody>
                      {product.nutrition.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-secondary/30' : 'bg-card'}>
                          <td className="px-4 py-2 text-muted-foreground">{row.label[lang]}</td>
                          <td className="px-4 py-2 text-right font-medium">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetailPage;
