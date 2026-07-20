import { useQuery } from '@tanstack/react-query';
import { fetchAllCatalog, fetchProductByHandle, type CatalogProduct } from '@/lib/shopifyCatalog';

export function useCatalog() {
  return useQuery<CatalogProduct[]>({
    queryKey: ['shopify-catalog'],
    queryFn: fetchAllCatalog,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useProductByHandle(handle: string | undefined) {
  return useQuery<CatalogProduct | null>({
    queryKey: ['shopify-product', handle],
    queryFn: () => (handle ? fetchProductByHandle(handle) : Promise.resolve(null)),
    enabled: !!handle,
    staleTime: 5 * 60 * 1000,
  });
}