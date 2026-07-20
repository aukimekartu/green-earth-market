import { Info } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { CatalogProduct } from '@/lib/shopifyCatalog';

interface Props {
  product: CatalogProduct;
}

export function ProductInfoDialog({ product }: Props) {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
          aria-label={t('product.productInfo')}
        >
          <span className="w-4 h-4 rounded-full border-[2.5px] border-primary flex items-center justify-center shrink-0">
            <Info className="w-2.5 h-2.5" />
          </span>
          <span className="font-sans">{lang === 'lt' ? 'Plačiau' : lang === 'en' ? 'More' : 'Vairāk'}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-card max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-foreground">{t('product.description')}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {product.description && (
            <div>
              <p className="text-sm text-foreground font-sans whitespace-pre-line">{product.description}</p>
            </div>
          )}

          {product.certificates.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2 font-sans">{t('product.qualityMarks')}</h4>
              <div className="flex flex-wrap gap-2">
                {product.certificates.map(cert => (
                  <span key={cert} className="px-2 py-1 rounded-full bg-secondary text-xs font-sans">{cert}</span>
                ))}
              </div>
            </div>
          )}

          {product.vendor && (
            <div>
              <h4 className="font-semibold text-sm text-primary mb-1 font-sans">{t('product.manufacturer')}</h4>
              <p className="text-sm text-foreground font-sans">{product.vendor}</p>
            </div>
          )}

          {product.productType && (
            <div>
              <h4 className="font-semibold text-sm text-primary mb-1 font-sans">{lang === 'lt' ? 'Tipas' : lang === 'en' ? 'Type' : 'Tips'}</h4>
              <p className="text-sm text-foreground font-sans">{product.productType}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
