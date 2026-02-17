import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, Truck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { foodCategories } from '@/data/categories';
import { products } from '@/data/products';
import { CategoryTile } from '@/components/CategoryTile';
import { ProductCard } from '@/components/ProductCard';
import euBioLogo from '@/assets/certificates/eu-bio-benefit.png';
import demeterLogo from '@/assets/certificates/demeter-benefit.png';
import ecocertLogo from '@/assets/certificates/ecocert.png';
import bdihLogo from '@/assets/certificates/bdih.png';

const Index = () => {
  const { lang, t } = useLanguage();
  const featuredProducts = products.slice(0, 4);
  const featuredCategories = foodCategories.slice(0, 6);

  const benefits = [
    {
      icon: Leaf,
      title: { lt: 'Ekologiška, natūralu', en: 'Organic, natural', lv: 'Ekoloģisks, dabīgs' },
      desc: { lt: 'Sertifikuoti produktai', en: 'Certified products', lv: 'Sertificēti produkti' },
    },
    {
      icon: ShieldCheck,
      title: { lt: 'Patikima kokybė', en: 'Trusted quality', lv: 'Uzticama kvalitāte' },
      desc: { lt: 'EU Bio standartai', en: 'EU Bio standards', lv: 'EU Bio standarti' },
      logos: true,
    },
    {
      icon: Truck,
      title: { lt: 'Greitas pristatymas', en: 'Fast delivery', lv: 'Ātra piegāde' },
      desc: { lt: '1-2 darbo dienos visoje Lietuvoje', en: '1-2 business days across Lithuania', lv: '1-2 darba dienas visā Lietuvā' },
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-secondary via-background to-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/20" />
          <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-accent/20" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-primary/10" />
        </div>
        <div className="container mx-auto px-4 py-16 md:py-28 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl leading-tight text-foreground mb-6 whitespace-pre-line">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 font-sans max-w-lg">
              {t('hero.subtitle')}
            </p>
            <Button variant="cta" size="xl" asChild>
              <Link to={`/${lang}/category/maistas`}>{t('hero.cta')}</Link>
            </Button>
          </div>
        </div>
        <div className="torn-edge-bottom bg-gradient-to-br from-secondary via-background to-secondary" />
      </section>

      {/* Benefits */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-foreground">{b.title[lang]}</h3>
                  {b.logos ? (
                    <div className="flex items-center gap-2 mt-1">
                      <img src={euBioLogo} alt="EU Bio" className="h-7 object-contain" />
                      <img src={demeterLogo} alt="Demeter" className="h-7 object-contain" />
                      <img src={ecocertLogo} alt="Ecocert" className="h-7 object-contain" />
                      <img src={bdihLogo} alt="BDIH" className="h-7 object-contain" />
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground font-sans">{b.desc[lang]}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl md:text-4xl text-foreground">{t('categories.title')}</h2>
            <Link to={`/${lang}/category/maistas`} className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors font-sans">
              {t('categories.viewAll')} →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {featuredCategories.map(cat => (
              <CategoryTile key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-12 bg-secondary/50 torn-edge-top torn-edge-bottom">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl md:text-4xl text-foreground">{t('featured.title')}</h2>
            <Link to={`/${lang}/products`} className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors font-sans">
              {t('featured.viewAll')} →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
