import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { mainNavCategories, mainCategoryMap } from '@/data/categories';
import { useCatalog } from '@/hooks/useCatalog';
import { CategoryTile } from '@/components/CategoryTile';
import { ProductCard } from '@/components/ProductCard';

const Index = () => {
  const { lang, t } = useLanguage();
  const { data: catalog, isLoading } = useCatalog();
  return <div className="container px-4 py-8">
    <h1 className="mb-2 text-[32px] leading-10">eko123</h1>
    <p className="text-muted-foreground mb-8">{lang === 'lt' ? 'Ekologiški ir biodinaminiai produktai' : lang === 'en' ? 'Organic and biodynamic products' : 'Bioloģiski un biodinamiski produkti'}</p>
    <section className="mb-12">
      <h2 className="text-2xl mb-6">{t('categories.title')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {mainNavCategories.map(main => <div key={main.id}>
          <Link to={`/${lang}/category/${main.slug}`} className="inline-block font-semibold text-lg mb-3 hover:text-primary">{main.name[lang]}</Link>
          <div className="flex flex-col gap-2">{mainCategoryMap[main.slug]?.map(cat => <CategoryTile key={cat.id} category={cat} />)}</div>
        </div>)}
      </div>
    </section>
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6"><h2 className="text-2xl">{t('featured.viewAll')}</h2><Link to={`/${lang}/products`} className="text-primary text-sm">{t('featured.viewAll')}</Link></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">{isLoading ? <div className="col-span-full py-8 flex justify-center"><Loader2 className="animate-spin text-primary" /></div> : catalog?.slice(0,8).map(product => <ProductCard key={product.id} product={product} />)}</div>
    </section>
  </div>;
};
export default Index;
