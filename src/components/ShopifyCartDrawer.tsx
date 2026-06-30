import { useEffect } from 'react';
import { ExternalLink, Loader2, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCartStore } from '@/stores/cartStore';
import { useLanguage } from '@/i18n/LanguageContext';

export function ShopifyCartDrawer() {
  const { lang } = useLanguage();
  const {
    items,
    isOpen,
    setOpen,
    isLoading,
    isSyncing,
    updateQuantity,
    removeItem,
    getCheckoutUrl,
    syncCart,
  } = useCartStore();

  useEffect(() => {
    if (isOpen) syncCart();
  }, [isOpen, syncCart]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, '_blank');
      setOpen(false);
    }
  };

  const labels = {
    title: lang === 'lt' ? 'Krepšelis' : lang === 'lv' ? 'Grozs' : 'Cart',
    empty: lang === 'lt' ? 'Krepšelis tuščias' : lang === 'lv' ? 'Grozs ir tukšs' : 'Your cart is empty',
    items: lang === 'lt' ? 'prekė(s)' : lang === 'lv' ? 'preces' : 'items',
    total: lang === 'lt' ? 'Iš viso' : lang === 'lv' ? 'Kopā' : 'Total',
    checkout: lang === 'lt' ? 'Eiti į apmokėjimą' : lang === 'lv' ? 'Apmaksāt' : 'Checkout',
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="flex items-center gap-2"><ShoppingCart className="w-5 h-5" /> {labels.title}</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? labels.empty : `${totalItems} ${labels.items}`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">{labels.empty}</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0 space-y-4">
                {items.map((item) => {
                  const img = item.product.node.images?.edges?.[0]?.node;
                  return (
                    <div key={item.variantId} className="flex gap-3 p-2">
                      <div className="w-16 h-16 bg-secondary/30 rounded-md overflow-hidden flex-shrink-0">
                        {img && <img src={img.url} alt={item.product.node.title} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.product.node.title}</h4>
                        {item.selectedOptions.length > 0 && (
                          <p className="text-xs text-muted-foreground">{item.selectedOptions.map((o) => o.value).join(' • ')}</p>
                        )}
                        <p className="font-semibold text-sm">
                          {item.price.currencyCode} {parseFloat(item.price.amount).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.variantId)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center text-xs">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex-shrink-0 space-y-3 pt-4 border-t">
                <div className="flex justify-between text-lg font-bold">
                  <span>{labels.total}</span>
                  <span>{items[0]?.price.currencyCode} {totalPrice.toFixed(2)}</span>
                </div>
                <Button variant="cta" size="lg" className="w-full" onClick={handleCheckout} disabled={isLoading || isSyncing}>
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ExternalLink className="w-4 h-4 mr-2" /> {labels.checkout}</>}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
