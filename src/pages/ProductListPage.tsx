import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { products } from '@/data/products';
import { foodCategories } from '@/data/categories';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const ITEMS_PER_PAGE = 8;

const ProductListPage = () => {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const { lang, t } = useLanguage();
  const searchQuery = searchParams.get('q') || '';

  const [sortBy, setSortBy] = useState('newest');
  const [allergenFree, setAllergenFree] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const category = foodCategories.find(c => c.slug === categorySlug);
  const title = category ? category.name[lang] : searchQuery
    ? `"${searchQuery}"`
    : lang === 'lt' ? 'Visi produktai' : lang === 'en' ? 'All products' : 'Visi produkti';

  const filtered = useMemo(() => {
    let result = [...products];
    if (categorySlug) result = result.filter(p => p.categorySlug === categorySlug);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name[lang].toLowerCase().includes(q) ||
        p.description[lang].toLowerCase().includes(q)
      );
    }
    if (allergenFree) result = result.filter(p => p.allergenFree);

    switch (sortBy) {
      case 'nameAZ': result.sort((a, b) => a.name[lang].localeCompare(b.name[lang])); break;
      case 'priceAsc': result.sort((a, b) => a.price - b.price); break;
      case 'priceDesc': result.sort((a, b) => b.price - a.price); break;
      default: break;
    }
    return result;
  }, [categorySlug, searchQuery, allergenFree, sortBy, lang]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const FiltersContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-sm mb-3 font-sans">{t('filters.certificates')}</h3>
        <div className="flex items-center gap-2">
          <Checkbox id="allergen" checked={allergenFree} onCheckedChange={(v) => { setAllergenFree(!!v); setCurrentPage(1); }} />
          <label htmlFor="allergen" className="text-sm font-sans cursor-pointer">{t('filters.allergenFree')}</label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl text-foreground mb-6">{title}</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop filters */}
        <aside className="hidden lg:block w-60 shrink-0">
          <h2 className="text-xl text-foreground mb-4">{t('filters.title')}</h2>
          <FiltersContent />
        </aside>

        {/* Products */}
        <div className="flex-1">
          {/* Sort + mobile filter */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="w-4 h-4 mr-1" />
                  {t('filters.showFilters')}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-card w-72">
                <SheetHeader><SheetTitle className="font-handwritten text-2xl">{t('filters.title')}</SheetTitle></SheetHeader>
                <div className="mt-6"><FiltersContent /></div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-muted-foreground font-sans hidden sm:inline">{t('filters.sort')}:</span>
              <Select value={sortBy} onValueChange={v => { setSortBy(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-44 bg-card"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-card z-50">
                  <SelectItem value="newest">{t('filters.newest')}</SelectItem>
                  <SelectItem value="nameAZ">{t('filters.nameAZ')}</SelectItem>
                  <SelectItem value="priceAsc">{t('filters.priceAsc')}</SelectItem>
                  <SelectItem value="priceDesc">{t('filters.priceDesc')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {paged.length === 0 ? (
            <p className="text-center py-16 text-muted-foreground text-lg font-sans">
              {lang === 'lt' ? 'Produktų nerasta.' : lang === 'en' ? 'No products found.' : 'Produkti nav atrasti.'}
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {paged.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
                    page === currentPage
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-foreground hover:bg-secondary'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
