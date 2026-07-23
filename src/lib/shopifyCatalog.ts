import { storefrontApiRequest, SHOPIFY_STORE_PERMANENT_DOMAIN, type ShopifyProduct } from './shopify';

function htmlToPlainText(html: string | undefined | null): string {
  if (!html) return '';
  return html
    .replace(/<\s*br\s*\/?\s*>/gi, '\n')
    .replace(/<\/\s*(p|div|li|h[1-6]|tr)\s*>/gi, '\n\n')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .split('\n')
    .map(l => l.trim())
    .join('\n')
    .trim();
}
import { getCategoryFromTags } from '@/data/categories';

/** Known certificate names (case-insensitive) detected from product tags */
export const KNOWN_CERTIFICATES = [
  'EU Bio', 'Demeter', 'Ecocert', 'Fairtrade', 'BDIH', 'Vegan',
  'ICEA', 'CosmeBio', 'Cruelty-free', 'USDA Organic', 'NaTrue', 'COSMOS',
];
const CERT_LC = new Map(KNOWN_CERTIFICATES.map(c => [c.toLowerCase(), c]));

/** Vendor placeholders that Shopify auto-fills when the CSV import omits vendor */
const PLACEHOLDER_VENDORS = new Set<string>([
  SHOPIFY_STORE_PERMANENT_DOMAIN.toLowerCase(),
  SHOPIFY_STORE_PERMANENT_DOMAIN.split('.')[0].toLowerCase(),
]);

function cleanVendor(v: string | undefined): string {
  const s = (v ?? '').trim();
  if (!s) return '';
  if (PLACEHOLDER_VENDORS.has(s.toLowerCase())) return '';
  return s;
}

export interface CatalogVariant {
  id: string;
  title: string;
  sku: string | null;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface CatalogProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  productType: string;
  tags: string[];
  images: string[];
  image: string;
  price: number;
  currency: string;
  availableForSale: boolean;
  variants: CatalogVariant[];
  options: Array<{ name: string; values: string[] }>;
  mainSlugs: string[];
  subSlugs: string[];
  certificates: string[];
  raw: ShopifyProduct;
}

const PLACEHOLDER = '/placeholder.svg';

const CATALOG_QUERY = `
  query GetCatalog($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          id
          title
          description
          descriptionHtml
          handle
          vendor
          productType
          tags
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 6) { edges { node { url altText } } }
          variants(first: 25) {
            edges {
              node {
                id
                title
                sku
                price { amount currencyCode }
                availableForSale
                selectedOptions { name value }
              }
            }
          }
          options { name values }
        }
      }
    }
  }
`;

export function mapProduct(p: ShopifyProduct): CatalogProduct {
  const node = p.node;
  const tags = ((node as unknown as { tags?: string[] }).tags ?? []) as string[];
  const { mainSlugs, subSlugs } = getCategoryFromTags(tags);
  const images = node.images.edges.map(e => e.node.url);
  const variants: CatalogVariant[] = node.variants.edges.map(e => ({
    id: e.node.id,
    title: e.node.title,
    sku: (e.node as unknown as { sku?: string | null }).sku ?? null,
    price: e.node.price,
    availableForSale: e.node.availableForSale,
    selectedOptions: e.node.selectedOptions ?? [],
  }));
  const certificates: string[] = [];
  for (const t of tags) {
    const c = CERT_LC.get(t.trim().toLowerCase());
    if (c && !certificates.includes(c)) certificates.push(c);
  }
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: htmlToPlainText((node as unknown as { descriptionHtml?: string }).descriptionHtml) || node.description,
    vendor: cleanVendor((node as unknown as { vendor?: string }).vendor),
    productType: (node as unknown as { productType?: string }).productType ?? '',
    tags,
    images: images.length ? images : [PLACEHOLDER],
    image: images[0] ?? PLACEHOLDER,
    price: parseFloat(node.priceRange.minVariantPrice.amount || '0'),
    currency: node.priceRange.minVariantPrice.currencyCode || 'EUR',
    availableForSale: variants.some(v => v.availableForSale),
    variants,
    options: node.options ?? [],
    mainSlugs,
    subSlugs,
    certificates,
    raw: p,
  };
}

export async function fetchAllCatalog(): Promise<CatalogProduct[]> {
  const all: CatalogProduct[] = [];
  let after: string | null = null;
  // Safety cap in case store is huge
  for (let page = 0; page < 20; page++) {
    const data = await storefrontApiRequest(CATALOG_QUERY, { first: 100, after });
    if (!data) break;
    const conn = data?.data?.products;
    const edges = conn?.edges ?? [];
    for (const edge of edges) all.push(mapProduct(edge as ShopifyProduct));
    if (!conn?.pageInfo?.hasNextPage) break;
    after = conn.pageInfo.endCursor;
  }
  return all;
}

const PRODUCT_BY_HANDLE_FULL = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      vendor
      productType
      tags
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 10) { edges { node { url altText } } }
      variants(first: 25) {
        edges {
          node {
            id
            title
            sku
            price { amount currencyCode }
            availableForSale
            selectedOptions { name value }
          }
        }
      }
      options { name values }
    }
  }
`;

export async function fetchProductByHandle(handle: string): Promise<CatalogProduct | null> {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_FULL, { handle });
  const node = data?.data?.product;
  if (!node) return null;
  return mapProduct({ node } as ShopifyProduct);
}