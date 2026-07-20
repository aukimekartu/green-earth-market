import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { toast } from 'sonner';
import { useCartStore } from '@/stores/cartStore';
import type { CatalogProduct } from '@/lib/shopifyCatalog';

export interface DisplayCartItem {
  variantId: string;
  handle: string;
  title: string;
  image: string;
  price: number;
  currency: string;
  quantity: number;
  variantTitle: string;
}

interface CartContextType {
  items: DisplayCartItem[];
  addProduct: (product: CatalogProduct, qty?: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  updateQuantity: (variantId: string, qty: number) => Promise<void>;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  getCheckoutUrl: () => string | null;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const storeItems = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const setOpen = useCartStore((s) => s.setOpen);
  const isLoading = useCartStore((s) => s.isLoading);

  const items: DisplayCartItem[] = useMemo(
    () => storeItems.map((i) => ({
      variantId: i.variantId,
      handle: i.product.node.handle,
      title: i.product.node.title,
      image: i.product.node.images.edges[0]?.node.url ?? '/placeholder.svg',
      price: parseFloat(i.price.amount || '0'),
      currency: i.price.currencyCode,
      quantity: i.quantity,
      variantTitle: i.variantTitle,
    })),
    [storeItems]
  );

  const addProduct = async (product: CatalogProduct, qty = 1) => {
    const variant = product.variants.find((v) => v.availableForSale) ?? product.variants[0];
    if (!variant) {
      toast.error('Produktas nepasiekiamas');
      return;
    }
    await useCartStore.getState().addItem({
      product: product.raw,
      variantId: variant.id,
      variantTitle: variant.title,
      sku: variant.sku,
      price: variant.price,
      quantity: qty,
      selectedOptions: variant.selectedOptions,
    });
  };

  const value: CartContextType = {
    items,
    addProduct,
    removeItem: (id) => useCartStore.getState().removeItem(id),
    updateQuantity: (id, q) => useCartStore.getState().updateQuantity(id, q),
    clearCart: () => useCartStore.getState().clearCart(),
    getItemCount: () => items.reduce((s, i) => s + i.quantity, 0),
    getTotal: () => items.reduce((s, i) => s + i.price * i.quantity, 0),
    isCartOpen: isOpen,
    setCartOpen: setOpen,
    getCheckoutUrl: () => useCartStore.getState().getCheckoutUrl(),
    isLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
