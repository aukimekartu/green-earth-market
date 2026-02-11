import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Truck, Package, MapPin, Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';

const deliveryOptions = [
  {
    id: 'courier',
    icon: Truck,
    name: { lt: 'Kurjeris į namus', en: 'Home delivery', lv: 'Kurjers uz mājām' },
    desc: { lt: '1–3 darbo dienos', en: '1–3 business days', lv: '1–3 darba dienas' },
    price: 3.99,
  },
  {
    id: 'lp-express',
    icon: Package,
    name: { lt: 'LP Express paštomatas', en: 'LP Express parcel locker', lv: 'LP Express pakomāts' },
    desc: { lt: '1–2 darbo dienos', en: '1–2 business days', lv: '1–2 darba dienas' },
    price: 2.49,
  },
  {
    id: 'omniva',
    icon: Package,
    name: { lt: 'Omniva paštomatas', en: 'Omniva parcel locker', lv: 'Omniva pakomāts' },
    desc: { lt: '1–3 darbo dienos', en: '1–3 business days', lv: '1–3 darba dienas' },
    price: 2.29,
  },
  {
    id: 'store',
    icon: MapPin,
    name: { lt: 'Atsiimti parduotuvėje', en: 'Store pickup', lv: 'Saņemt veikalā' },
    desc: { lt: 'Nemokamai', en: 'Free', lv: 'Bezmaksas' },
    price: 0,
  },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

const CheckoutPage = () => {
  const { lang, t } = useLanguage();
  const { items, getProduct, getTotal, clearCart } = useCart();
  const [delivery, setDelivery] = useState('courier');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postalCode: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const deliveryPrice = deliveryOptions.find(d => d.id === delivery)?.price ?? 0;
  const subtotal = getTotal();
  const total = subtotal + deliveryPrice;

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    const req = t('checkout.required');
    if (!form.firstName.trim()) e.firstName = req;
    if (!form.lastName.trim()) e.lastName = req;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = t('checkout.invalidEmail');
    if (!form.phone.trim()) e.phone = req;
    if (delivery === 'courier') {
      if (!form.address.trim()) e.address = req;
      if (!form.city.trim()) e.city = req;
      if (!form.postalCode.trim()) e.postalCode = req;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    clearCart();
    setSubmitted(true);
  };

  const updateField = (key: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  if (items.length === 0 && !submitted) {
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

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-lg">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl text-foreground mb-4">{t('checkout.success')}</h1>
        <p className="text-muted-foreground font-sans mb-8">{t('checkout.successDesc')}</p>
        <Button variant="cta" asChild>
          <Link to={`/${lang}/products`}>{t('cart.continueShopping')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl text-foreground mb-8">{t('cart.checkout')}</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact info */}
            <section className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-2xl text-foreground mb-5">{t('checkout.contactInfo')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="font-sans text-sm">{t('checkout.firstName')} *</Label>
                  <Input id="firstName" value={form.firstName} onChange={e => updateField('firstName', e.target.value)} maxLength={100} className="mt-1" />
                  {errors.firstName && <p className="text-xs text-destructive mt-1 font-sans">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName" className="font-sans text-sm">{t('checkout.lastName')} *</Label>
                  <Input id="lastName" value={form.lastName} onChange={e => updateField('lastName', e.target.value)} maxLength={100} className="mt-1" />
                  {errors.lastName && <p className="text-xs text-destructive mt-1 font-sans">{errors.lastName}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="font-sans text-sm">{t('checkout.email')} *</Label>
                  <Input id="email" type="email" value={form.email} onChange={e => updateField('email', e.target.value)} maxLength={255} className="mt-1" />
                  {errors.email && <p className="text-xs text-destructive mt-1 font-sans">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone" className="font-sans text-sm">{t('checkout.phone')} *</Label>
                  <Input id="phone" type="tel" value={form.phone} onChange={e => updateField('phone', e.target.value)} maxLength={20} className="mt-1" />
                  {errors.phone && <p className="text-xs text-destructive mt-1 font-sans">{errors.phone}</p>}
                </div>
              </div>
            </section>

            {/* Delivery method */}
            <section className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-2xl text-foreground mb-5">{t('checkout.deliveryMethod')}</h2>
              <RadioGroup value={delivery} onValueChange={setDelivery} className="space-y-3">
                {deliveryOptions.map(opt => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      delivery === opt.id ? 'border-primary bg-secondary/50' : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <RadioGroupItem value={opt.id} />
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <opt.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm font-sans">{opt.name[lang]}</p>
                      <p className="text-xs text-muted-foreground font-sans">{opt.desc[lang]}</p>
                    </div>
                    <span className="font-bold font-sans text-sm">
                      {opt.price === 0 ? (lang === 'lt' ? 'Nemokamai' : lang === 'en' ? 'Free' : 'Bezmaksas') : `€${opt.price.toFixed(2)}`}
                    </span>
                  </label>
                ))}
              </RadioGroup>
            </section>

            {/* Address (only for courier) */}
            {delivery === 'courier' && (
              <section className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-2xl text-foreground mb-5">{t('checkout.deliveryAddress')}</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="font-sans text-sm">{t('checkout.address')} *</Label>
                    <Input id="address" value={form.address} onChange={e => updateField('address', e.target.value)} maxLength={200} className="mt-1" />
                    {errors.address && <p className="text-xs text-destructive mt-1 font-sans">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="font-sans text-sm">{t('checkout.city')} *</Label>
                      <Input id="city" value={form.city} onChange={e => updateField('city', e.target.value)} maxLength={100} className="mt-1" />
                      {errors.city && <p className="text-xs text-destructive mt-1 font-sans">{errors.city}</p>}
                    </div>
                    <div>
                      <Label htmlFor="postalCode" className="font-sans text-sm">{t('checkout.postalCode')} *</Label>
                      <Input id="postalCode" value={form.postalCode} onChange={e => updateField('postalCode', e.target.value)} maxLength={10} className="mt-1" />
                      {errors.postalCode && <p className="text-xs text-destructive mt-1 font-sans">{errors.postalCode}</p>}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Right: order summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-6 sticky top-20">
              <h2 className="text-2xl text-foreground mb-4">{t('checkout.orderSummary')}</h2>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map(item => {
                  const product = getProduct(item.productId);
                  if (!product) return null;
                  return (
                    <div key={item.productId} className="flex gap-3 items-center">
                      <img src={product.image} alt={product.name[lang]} className="w-12 h-12 object-contain rounded bg-secondary/30" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-sans truncate">{product.name[lang]}</p>
                        <p className="text-xs text-muted-foreground font-sans">× {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold font-sans shrink-0">€{(product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-border pt-4 space-y-2 text-sm font-sans">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('checkout.subtotal')}</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('checkout.delivery')}</span>
                  <span>{deliveryPrice === 0 ? (lang === 'lt' ? 'Nemokamai' : lang === 'en' ? 'Free' : 'Bezmaksas') : `€${deliveryPrice.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>{t('cart.total')}</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>

              <Button variant="cta" className="w-full mt-6" size="lg" type="submit">
                {t('checkout.placeOrder')}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
