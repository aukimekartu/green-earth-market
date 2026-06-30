import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { products, type Product } from '@/data/products';
import { useCartStore } from '@/stores/cartStore';
import { loadShopifyVariants, getCachedVariant } from '@/lib/shopifyVariants';

interface LocalCartItem {
  productId: string;
  quantity: number;
}

interface CartContextType {
  items: LocalCartItem[];
  addItem: (productId: string, qty?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, qty: number) => Promise<void>;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
  getProduct: (productId: string) => Product | undefined;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  getCheckoutUrl: () => string | null;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

const productsById = new Map(products.map((p) => [p.id, p]));
const productsBySku = new Map(products.map((p) => [p.code, p]));

function findLocalByVariantSku(sku: string | null): Product | undefined {
  if (!sku) return undefined;
  return productsBySku.get(sku);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const storeItems = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const setOpen = useCartStore((s) => s.setOpen);
  const isLoading = useCartStore((s) => s.isLoading);

  // Preload Shopify variant map once
  useEffect(() => { loadShopifyVariants(); }, []);

  const items: LocalCartItem[] = useMemo(() => {
    return storeItems
      .map((i) => {
        const local = findLocalByVariantSku(i.sku);
        return local ? { productId: local.id, quantity: i.quantity } : null;
      })
      .filter((x): x is LocalCartItem => x !== null);
  }, [storeItems]);

  const findVariantForProduct = async (productId: string) => {
    const local = productsById.get(productId);
    if (!local) return null;
    let variant = getCachedVariant(local.code);
    if (!variant) {
      const map = await loadShopifyVariants();
      variant = map.get(local.code);
    }
    return variant ? { local, variant } : null;
  };

  const addItem = async (productId: string, qty = 1) => {
    const found = await findVariantForProduct(productId);
    if (!found) {
      toast.error('Produktas nepasiekiamas Shopify parduotuvėje');
      return;
    }
    await useCartStore.getState().addItem({
      product: found.variant.product,
      variantId: found.variant.variantId,
      variantTitle: found.variant.variantTitle,
      sku: found.variant.sku,
      price: found.variant.price,
      quantity: qty,
      selectedOptions: found.variant.selectedOptions,
    });
  };

  const removeItem = async (productId: string) => {
    const local = productsById.get(productId);
    if (!local) return;
    const variant = getCachedVariant(local.code);
    if (!variant) return;
    await useCartStore.getState().removeItem(variant.variantId);
  };

  const updateQuantity = async (productId: string, qty: number) => {
    const local = productsById.get(productId);
    if (!local) return;
    const variant = getCachedVariant(local.code);
    if (!variant) return;
    await useCartStore.getState().updateQuantity(variant.variantId, qty);
  };

  const clearCart = () => useCartStore.getState().clearCart();
  const getItemCount = () => items.reduce((s, i) => s + i.quantity, 0);
  const getTotal = () => items.reduce((s, i) => {
    const p = productsById.get(i.productId);
    return s + (p ? p.price * i.quantity : 0);
  }, 0);
  const getProduct = (productId: string) => productsById.get(productId);
  const getCheckoutUrl = () => useCartStore.getState().getCheckoutUrl();

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      getItemCount, getTotal, getProduct,
      isCartOpen: isOpen, setCartOpen: setOpen,
      getCheckoutUrl, isLoading,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
