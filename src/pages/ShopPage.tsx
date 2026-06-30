import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCartStore } from '@/stores/cartStore';
import { PRODUCTS_QUERY, storefrontApiRequest, type ShopifyProduct } from '@/lib/shopify';

const ShopPage = () => {
  const { lang } = useLanguage();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 50, query: null });
        if (cancelled) return;
        setProducts(data?.data?.products?.edges ?? []);
      } catch (err) {
        console.error('Failed to load Shopify products', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const heading =
    lang === 'lt' ? 'Parduotuvė' : lang === 'lv' ? 'Veikals' : 'Shop';

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-4xl text-foreground mb-3">{heading}</h1>
        <p className="text-muted-foreground font-sans max-w-md mx-auto">
          {lang === 'lt'
            ? 'Šiuo metu Shopify parduotuvėje produktų nėra. Pridėk pirmąjį produktą pokalbyje.'
            : lang === 'lv'
              ? 'Pagaidām Shopify veikalā nav produktu. Pievienojiet pirmo produktu sarunā.'
              : 'No products found. Add your first product through the chat.'}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl text-foreground mb-8">{heading}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((p) => {
          const variant = p.node.variants.edges[0]?.node;
          const image = p.node.images.edges[0]?.node;
          return (
            <div key={p.node.id} className="bg-card rounded-xl border border-border overflow-hidden flex flex-col">
              <Link to={`/${lang}/shop/${p.node.handle}`} className="relative aspect-square bg-secondary/30">
                {image && (
                  <img src={image.url} alt={image.altText ?? p.node.title} className="w-full h-full object-contain p-4" loading="lazy" />
                )}
              </Link>
              <div className="flex flex-col flex-1 p-4 gap-2">
                <Link to={`/${lang}/shop/${p.node.handle}`} className="hover:text-primary transition-colors">
                  <h3 className="font-semibold text-sm leading-tight line-clamp-2">{p.node.title}</h3>
                </Link>
                <div className="mt-auto pt-2 flex items-end justify-between gap-2">
                  <div className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded inline-block">
                    {variant?.price.currencyCode} {parseFloat(variant?.price.amount ?? p.node.priceRange.minVariantPrice.amount).toFixed(2)}
                  </div>
                  <Button
                    variant="cta"
                    size="sm"
                    disabled={!variant || !variant.availableForSale || isLoading}
                    onClick={() =>
                      variant &&
                      addItem({
                        product: p,
                        variantId: variant.id,
                        variantTitle: variant.title,
                        price: variant.price,
                        quantity: 1,
                        selectedOptions: variant.selectedOptions ?? [],
                      })
                    }
                  >
                    {lang === 'lt' ? 'Į krepšelį' : lang === 'lv' ? 'Pirkumu grozs' : 'Add to cart'}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopPage;
