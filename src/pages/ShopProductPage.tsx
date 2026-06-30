import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCartStore } from '@/stores/cartStore';
import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest } from '@/lib/shopify';

const ShopProductPage = () => {
  const { handle } = useParams();
  const { lang } = useLanguage();
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const [product, setProduct] = useState<any>(null);
  const [variantId, setVariantId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!handle) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        if (cancelled) return;
        const p = data?.data?.product;
        setProduct(p);
        setVariantId(p?.variants?.edges?.[0]?.node?.id ?? null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [handle]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground mb-4">{lang === 'lt' ? 'Produktas nerastas' : 'Product not found'}</p>
        <Button asChild variant="cta">
          <Link to={`/${lang}/shop`}>{lang === 'lt' ? 'Į parduotuvę' : 'Back to shop'}</Link>
        </Button>
      </div>
    );
  }

  const variant = product.variants.edges.find((e: any) => e.node.id === variantId)?.node ?? product.variants.edges[0]?.node;
  const image = product.images.edges[0]?.node;

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <div className="bg-secondary/30 rounded-xl aspect-square flex items-center justify-center">
        {image && <img src={image.url} alt={image.altText ?? product.title} className="max-w-full max-h-full object-contain p-6" />}
      </div>
      <div>
        <h1 className="text-3xl md:text-4xl text-foreground mb-3">{product.title}</h1>
        <p className="text-2xl font-bold text-primary mb-4">
          {variant?.price.currencyCode} {parseFloat(variant?.price.amount).toFixed(2)}
        </p>
        <p className="text-muted-foreground font-sans mb-6 whitespace-pre-line">{product.description}</p>

        {product.variants.edges.length > 1 && (
          <div className="mb-6 space-y-2">
            <label className="text-sm font-sans font-medium">{lang === 'lt' ? 'Variantas' : 'Variant'}</label>
            <select
              className="w-full border border-border rounded-md p-2 bg-background"
              value={variantId ?? ''}
              onChange={(e) => setVariantId(e.target.value)}
            >
              {product.variants.edges.map((e: any) => (
                <option key={e.node.id} value={e.node.id} disabled={!e.node.availableForSale}>
                  {e.node.title} — {e.node.price.currencyCode} {parseFloat(e.node.price.amount).toFixed(2)}
                </option>
              ))}
            </select>
          </div>
        )}

        <Button
          variant="cta"
          size="lg"
          disabled={!variant?.availableForSale || isLoading}
          onClick={() =>
            variant &&
            addItem({
              product: { node: product },
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
  );
};

export default ShopProductPage;
