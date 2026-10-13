import { Truck, Package } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
export function TopBanner() {
  const { lang } = useLanguage();
  return <div className="bg-primary-dark text-primary-foreground text-xs md:text-sm"><div className="container flex flex-wrap justify-center md:justify-between gap-x-6 gap-y-1 px-4 py-2">
    <span className="flex items-center gap-2"><Truck className="w-4 h-4" strokeWidth={1.5} />{lang === 'lt' ? 'Išsiunčiame per 1–2 darbo dienas' : lang === 'en' ? 'Dispatch in 1–2 business days' : 'Nosūtām 1–2 darba dienās'}</span>
    <span className="flex items-center gap-2"><Package className="w-4 h-4" strokeWidth={1.5} />{lang === 'lt' ? 'Į paštomatą 3,70 €, virš 60 € nemokamai' : lang === 'en' ? 'Parcel locker 3,70 €, free over 60 €' : 'Pakomāts 3,70 €, virs 60 € bez maksas'}</span>
  </div></div>;
}
