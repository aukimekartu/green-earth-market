import { useState, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X, Loader2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCatalog } from '@/hooks/useCatalog';
import { mainCategoryMap, mainNavCategories, resolveCategorySlug } from '@/data/categories';
import { CategoryTile } from '@/components/CategoryTile';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const ITEMS_PER_PAGE = 24;

const ProductListPage = () => {
  const { categorySlug: requestedSlug, slug } = useParams();
  const categorySlug = requestedSlug || slug ? resolveCategorySlug(requestedSlug ?? slug ?? '') : undefined;
  const [searchParams] = useSearchParams();
  const { lang, t } = useLanguage();
  const searchQuery = searchParams.get('q') || '';
  const { data: catalog, isLoading } = useCatalog();

  const [sortBy, setSortBy] = useState('newest');
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedCertificates, setSelectedCertificates] = useState<string[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [manufacturerSearch, setManufacturerSearch] = useState('');
  const [certificateSearch, setCertificateSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Resolve title: could be a subcategory slug, main-nav slug, or a search
  const { title, isMainSlug, isSubSlug } = useMemo(() => {
    if (!categorySlug) {
      return {
        title: searchQuery
          ? `"${searchQuery}"`
          : lang === 'lt' ? 'Visi produktai' : lang === 'en' ? 'All products' : 'Visi produkti',
        isMainSlug: false, isSubSlug: false,
      };
    }
    const mainCat = mainNavCategories.find(c => c.slug === categorySlug);
    if (mainCat && mainCategoryMap[categorySlug]) {
      return { title: mainCat.name[lang], isMainSlug: true, isSubSlug: false };
    }
    for (const subs of Object.values(mainCategoryMap)) {
      const sub = subs.find(s => s.slug === categorySlug);
      if (sub) return { title: sub.name[lang], isMainSlug: false, isSubSlug: true };
    }
    return { title: categorySlug, isMainSlug: false, isSubSlug: false };
  }, [categorySlug, searchQuery, lang]);

  const baseScoped = useMemo(() => {
    let result = [...(catalog ?? [])];
    if (categorySlug) {
      if (isMainSlug) result = result.filter(p => p.mainSlugs.includes(categorySlug));
      else if (isSubSlug) result = result.filter(p => p.subSlugs.includes(categorySlug));
      else result = result.filter(p => p.tags.some(t => t.toLowerCase() === categorySlug.toLowerCase()));
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.vendor.toLowerCase().includes(q)
      );
    }
    return result;
  }, [catalog, categorySlug, isMainSlug, isSubSlug, searchQuery]);

  const availableManufacturers = useMemo(() => {
    const set = new Set(baseScoped.map(p => p.vendor).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [baseScoped]);

  const availableCertificates = useMemo(() => {
    const set = new Set<string>();
    baseScoped.forEach(p => p.certificates.forEach(c => set.add(c)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [baseScoped]);

  const filtered = useMemo(() => {
    let result = [...baseScoped];
    if (productSearch.trim()) {
      const q = productSearch.trim().toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.vendor.toLowerCase().includes(q) ||
        p.handle.toLowerCase().includes(q)
      );
    }
    if (selectedManufacturers.length > 0) result = result.filter(p => selectedManufacturers.includes(p.vendor));
    if (selectedCertificates.length > 0) result = result.filter(p => p.certificates.some(c => selectedCertificates.includes(c)));

    switch (sortBy) {
      case 'nameAZ': result.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'priceAsc': result.sort((a, b) => a.price - b.price); break;
      case 'priceDesc': result.sort((a, b) => b.price - a.price); break;
      case 'manufacturer': result.sort((a, b) => a.vendor.localeCompare(b.vendor)); break;
      default: break;
    }
    return result;
  }, [baseScoped, productSearch, selectedManufacturers, selectedCertificates, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice(0, currentPage * ITEMS_PER_PAGE);

  const toggleValue = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
    setCurrentPage(1);
  };

  const activeFilterCount =
    selectedManufacturers.length +
    selectedCertificates.length +
    (productSearch.trim() ? 1 : 0);

  const clearAll = () => {
    setSelectedManufacturers([]);
    setSelectedCertificates([]);
    setProductSearch('');
    setManufacturerSearch('');
    setCertificateSearch('');
    setCurrentPage(1);
  };

  const filterList = (items: string[], q: string) =>
    q.trim() ? items.filter(i => i.toLowerCase().includes(q.trim().toLowerCase())) : items;

  const filtersContent = (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-sm mb-3 font-sans">{t('filters.searchInList')}</h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={productSearch}
            onChange={e => { setProductSearch(e.target.value); setCurrentPage(1); }}
            placeholder={t('filters.searchPlaceholder')}
            className="pl-8 h-9 bg-card"
          />
          {productSearch && (
            <button
              type="button"
              aria-label="clear"
              onClick={() => { setProductSearch(''); setCurrentPage(1); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <Button variant="outline" size="sm" onClick={clearAll} className="w-full">
          <X className="w-4 h-4 mr-1" /> {t('filters.clearAll')} ({activeFilterCount})
        </Button>
      )}

      <div>
        <h3 className="font-semibold text-sm mb-3 font-sans">{t('filters.certificates')}</h3>
        {availableCertificates.length > 0 && (
          <>
            {availableCertificates.length > 5 && (
              <Input
                value={certificateSearch}
                onChange={e => setCertificateSearch(e.target.value)}
                placeholder={t('filters.searchPlaceholder')}
                className="h-8 mb-2 bg-card"
              />
            )}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {filterList(availableCertificates, certificateSearch).map(c => (
                <div key={c} className="flex items-center gap-2">
                  <Checkbox
                    id={`cert-${c}`}
                    checked={selectedCertificates.includes(c)}
                    onCheckedChange={() => toggleValue(selectedCertificates, setSelectedCertificates, c)}
                  />
                  <label htmlFor={`cert-${c}`} className="text-sm font-sans cursor-pointer">{c}</label>
                </div>
              ))}
              {filterList(availableCertificates, certificateSearch).length === 0 && (
                <p className="text-xs text-muted-foreground">{t('filters.noMatches')}</p>
              )}
            </div>
          </>
        )}
      </div>

      {availableManufacturers.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-3 font-sans">{t('filters.manufacturer')}</h3>
          {availableManufacturers.length > 5 && (
            <Input
              value={manufacturerSearch}
              onChange={e => setManufacturerSearch(e.target.value)}
              placeholder={t('filters.searchPlaceholder')}
              className="h-8 mb-2 bg-card"
            />
          )}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {filterList(availableManufacturers, manufacturerSearch).map(m => (
              <div key={m} className="flex items-center gap-2">
                <Checkbox
                  id={`mfr-${m}`}
                  checked={selectedManufacturers.includes(m)}
                  onCheckedChange={() => toggleValue(selectedManufacturers, setSelectedManufacturers, m)}
                />
                <label htmlFor={`mfr-${m}`} className="text-sm font-sans cursor-pointer">{m}</label>
              </div>
            ))}
            {filterList(availableManufacturers, manufacturerSearch).length === 0 && (
              <p className="text-xs text-muted-foreground">{t('filters.noMatches')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-[32px] leading-10 text-foreground mb-6">{title}</h1>

      {categorySlug && <nav aria-label={t('categories.title')} className="flex flex-wrap gap-2 mb-8">
        {(mainCategoryMap[categorySlug] ?? Object.values(mainCategoryMap).find(subs => subs.some(c => c.slug === categorySlug)) ?? []).map(cat => <CategoryTile key={cat.id} category={cat} />)}
      </nav>}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop filters */}
        <aside className="hidden lg:block w-60 shrink-0">
          <h2 className="text-xl text-foreground mb-4">{t('filters.title')}</h2>
          {filtersContent}
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          {/* Sort + mobile filter */}
          <div className="flex items-center justify-between flex-wrap mb-6 gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="w-4 h-4 mr-1" />
                  {t('filters.showFilters')}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-card w-72 overflow-y-auto">
                <SheetHeader><SheetTitle className="text-xl font-semibold">{t('filters.title')}</SheetTitle></SheetHeader>
                <div className="mt-6">{filtersContent}</div>
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
                  <SelectItem value="manufacturer">{t('filters.manufacturer')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : paged.length === 0 ? (
            <p className="text-center py-16 text-muted-foreground text-lg font-sans">
              {lang === 'lt' ? 'Produktų nerasta.' : lang === 'en' ? 'No products found.' : 'Produkti nav atrasti.'}
            </p>
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
              {paged.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {currentPage * ITEMS_PER_PAGE < filtered.length && <div className="flex justify-center mt-8"><Button variant="outline" onClick={() => setCurrentPage(p => p + 1)}>{lang === 'lt' ? 'Rodyti daugiau prekių' : lang === 'en' ? 'Load more products' : 'Rādīt vairāk preču'}</Button></div>}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
