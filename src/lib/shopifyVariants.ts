import { PRODUCTS_QUERY, storefrontApiRequest, type ShopifyProduct } from './shopify';

export interface ShopifyVariantInfo {
  variantId: string;
  variantTitle: string;
  sku: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
  product: ShopifyProduct;
}

let cache: Map<string, ShopifyVariantInfo> | null = null;
let inflight: Promise<Map<string, ShopifyVariantInfo>> | null = null;
const listeners = new Set<() => void>();

async function fetchAll(): Promise<Map<string, ShopifyVariantInfo>> {
  const map = new Map<string, ShopifyVariantInfo>();
  try {
    const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 100, query: null });
    const edges = data?.data?.products?.edges ?? [];
    for (const edge of edges) {
      const p = edge as ShopifyProduct;
      for (const ve of p.node.variants.edges) {
        const v = ve.node as ShopifyVariantInfo['product']['node']['variants']['edges'][number]['node'] & {
          sku?: string | null;
        };
        if (v.sku) {
          map.set(v.sku, {
            variantId: v.id,
            variantTitle: v.title,
            sku: v.sku,
            price: v.price,
            availableForSale: v.availableForSale,
            selectedOptions: v.selectedOptions ?? [],
            product: p,
          });
        }
      }
    }
  } catch (err) {
    console.error('Failed to load Shopify variants', err);
  }
  cache = map;
  listeners.forEach((l) => l());
  return map;
}

export function loadShopifyVariants(): Promise<Map<string, ShopifyVariantInfo>> {
  if (cache) return Promise.resolve(cache);
  if (!inflight) inflight = fetchAll().finally(() => { inflight = null; });
  return inflight;
}

export function getCachedVariant(sku: string): ShopifyVariantInfo | undefined {
  return cache?.get(sku);
}

export function getCachedVariantsMap(): Map<string, ShopifyVariantInfo> | null {
  return cache;
}

export function subscribeToVariants(listener: () => void): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}