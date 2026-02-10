import { Minus, Plus, X, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';

export function CartSidebar() {
  const { lang, t } = useLanguage();
  const { items, isCartOpen, setCartOpen, getProduct, updateQuantity, removeItem, getTotal } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-md bg-card flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-handwritten text-2xl flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            {t('cart.cart')}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground text-center">{t('cart.empty')}</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map(item => {
                const product = getProduct(item.productId);
                if (!product) return null;
                return (
                  <div key={item.productId} className="flex gap-3 p-3 bg-secondary/50 rounded-lg">
                    <img src={product.image} alt={product.name[lang]} className="w-16 h-16 object-contain rounded bg-card" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{product.name[lang]}</h4>
                      <p className="text-sm font-bold text-primary mt-1">€{product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.productId)} className="text-muted-foreground hover:text-destructive transition-colors self-start">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-lg font-bold">
                <span>{t('cart.total')}:</span>
                <span>€{getTotal().toFixed(2)}</span>
              </div>
              <Button variant="cta" className="w-full" size="lg">
                {t('cart.checkout')}
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setCartOpen(false)} asChild>
                <Link to={`/${lang}/products`}>{t('cart.continueShopping')}</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
