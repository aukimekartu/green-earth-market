import { Info, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Product } from '@/data/products';
import euBioLogo from '@/assets/certificates/eu-bio.png';
import demeterLogo from '@/assets/certificates/demeter.png';

const certLogos: Record<string, string> = {
  'EU Bio': euBioLogo,
  'Demeter': demeterLogo,
};

interface Props {
  product: Product;
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
          {/* Ingredients */}
          <div>
            <h4 className="font-semibold text-sm text-primary mb-1 font-sans">{t('product.ingredients')}</h4>
            <p className="text-sm text-foreground font-sans">{product.ingredients[lang]}</p>
          </div>

          {/* Quality marks */}
          {product.certificates.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2 font-sans">{t('product.qualityMarks')}</h4>
              <div className="flex items-center gap-3">
                {product.certificates.map(cert => (
                  <div key={cert} className="flex items-center gap-2">
                    {certLogos[cert] ? (
                      <img src={certLogos[cert]} alt={cert} className="h-8 object-contain" />
                    ) : null}
                    <span className="text-xs text-muted-foreground font-sans">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Packaging */}
          <div>
            <h4 className="font-semibold text-sm text-primary mb-1 font-sans">{t('product.packaging')}</h4>
            <p className="text-sm text-foreground font-sans">{product.packaging[lang]}</p>
          </div>

          {/* Origin */}
          <div>
            <h4 className="font-semibold text-sm text-primary mb-1 font-sans">{t('product.origin')}</h4>
            <p className="text-sm text-foreground font-sans">{product.origin[lang]}</p>
          </div>

          {/* Raw material origin */}
          <div>
            <h4 className="font-semibold text-sm text-primary mb-1 font-sans">{t('product.rawMaterialOrigin')}</h4>
            <p className="text-sm text-foreground font-sans">{product.rawMaterialOrigin[lang]}</p>
          </div>

          {/* Manufacturer */}
          <div>
            <h4 className="font-semibold text-sm text-primary mb-1 font-sans">{t('product.manufacturer')}</h4>
            <p className="text-sm text-foreground font-sans">{product.manufacturer}</p>
          </div>

          {/* Nutrition */}
          {product.nutrition.length > 0 && (
            <div>
              <h4 className="font-semibold text-sm text-primary mb-2 font-sans">
                {t('product.nutritionTable')} / {t('product.per100')}
              </h4>
              <table className="w-full text-sm font-sans">
                <tbody>
                  {product.nutrition.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-secondary/50' : ''}>
                      <td className="py-1.5 px-2 text-foreground">{row.label[lang]}</td>
                      <td className="py-1.5 px-2 text-right text-foreground font-medium">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
