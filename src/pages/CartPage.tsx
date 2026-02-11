import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';

const CartPage = () => {
  const { lang, t } = useLanguage();
  const { items, getProduct, updateQuantity, removeItem, getTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-3xl text-foreground mb-4">{t('cart.empty')}</h1>
        <Button variant="cta" asChild>
          <Link to={`/${lang}/products`}>{t('cart.continueShopping')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-foreground mb-8">{t('cart.cart')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => {
            const product = getProduct(item.productId);
            if (!product) return null;
            return (
              <div key={item.productId} className="flex gap-4 p-4 bg-card rounded-xl border border-border">
                <Link to={`/${lang}/product/${product.slug}`}>
                  <img src={product.image} alt={product.name[lang]} className="w-20 h-20 object-contain rounded-lg bg-secondary/30" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/${lang}/product/${product.slug}`}>
                    <h3 className="font-semibold text-sm font-sans">{product.name[lang]}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground font-sans mt-1">{product.unit}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-border rounded-lg">
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded-l-lg">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold font-sans">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded-r-lg">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.productId)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold font-sans">€{(product.price * item.quantity).toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground font-sans">€{product.price.toFixed(2)} / {product.unit}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-card rounded-xl border border-border p-6 h-fit sticky top-20">
          <h2 className="text-2xl text-foreground mb-4">{t('cart.total')}</h2>
          <div className="flex justify-between text-xl font-bold mb-6 font-sans">
            <span>{t('cart.total')}:</span>
            <span>€{getTotal().toFixed(2)}</span>
          </div>
          <Button variant="cta" className="w-full" size="lg" asChild>
            <Link to={`/${lang}/checkout`}>{t('cart.checkout')}</Link>
          </Button>
          <Button variant="ghost" className="w-full mt-2" asChild>
            <Link to={`/${lang}/products`}>{t('cart.continueShopping')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
