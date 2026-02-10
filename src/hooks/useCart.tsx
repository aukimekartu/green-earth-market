import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { products, type Product } from '@/data/products';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (productId: string, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
  getProduct: (productId: string) => Product | undefined;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bio-cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('bio-cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((productId: string, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === productId);
      if (existing) {
        return prev.map(i => i.productId === productId ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { productId, quantity: qty }];
    });
    setCartOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.productId !== productId));
    } else {
      setItems(prev => prev.map(i => i.productId === productId ? { ...i, quantity: qty } : i));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getItemCount = useCallback(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const getTotal = useCallback(() => {
    return items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [items]);

  const getProduct = useCallback((productId: string) => products.find(p => p.id === productId), []);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, getItemCount, getTotal, getProduct, isCartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
};
