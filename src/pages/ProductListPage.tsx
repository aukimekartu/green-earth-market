import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { products } from '@/data/products';
import { foodCategories, sowingCategories, cosmeticsCategories } from '@/data/categories';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const ITEMS_PER_PAGE = 8;

const ProductListPage = () => {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const { lang, t } = useLanguage();
  const searchQuery = searchParams.get('q') || '';

  const [sortBy, setSortBy] = useState('newest');
  const [allergenFree, setAllergenFree] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedCertificates, setSelectedCertificates] = useState<string[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [manufacturerSearch, setManufacturerSearch] = useState('');
  const [certificateSearch, setCertificateSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const allCategories = [...foodCategories, ...sowingCategories, ...cosmeticsCategories];
  const category = allCategories.find(c => c.slug === categorySlug);
  const title = category ? category.name[lang] : searchQuery
    ? `"${searchQuery}"`
    : lang === 'lt' ? 'Visi produktai' : lang === 'en' ? 'All products' : 'Visi produkti';

  const baseScoped = useMemo(() => {
    let result = [...products];
    if (categorySlug) result = result.filter(p => p.categorySlug === categorySlug);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name[lang].toLowerCase().includes(q) ||
        p.description[lang].toLowerCase().includes(q)
      );
    }
    return result;
  }, [categorySlug, searchQuery, lang]);

  const availableCountries = useMemo(() => {
    const set = new Set(baseScoped.map(p => p.rawMaterialOrigin[lang]));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [baseScoped, lang]);

  const availableManufacturers = useMemo(() => {
    const set = new Set(baseScoped.map(p => p.manufacturer));
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
        p.name[lang].toLowerCase().includes(q) ||
        p.manufacturer.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q)
      );
    }
    if (allergenFree) result = result.filter(p => p.allergenFree);
    if (selectedCountries.length > 0) result = result.filter(p => selectedCountries.includes(p.rawMaterialOrigin[lang]));
    if (selectedManufacturers.length > 0) result = result.filter(p => selectedManufacturers.includes(p.manufacturer));
    if (selectedCertificates.length > 0) result = result.filter(p => p.certificates.some(c => selectedCertificates.includes(c)));

    switch (sortBy) {
      case 'nameAZ': result.sort((a, b) => a.name[lang].localeCompare(b.name[lang])); break;
      case 'priceAsc': result.sort((a, b) => a.price - b.price); break;
      case 'priceDesc': result.sort((a, b) => b.price - a.price); break;
      case 'brandCountry': result.sort((a, b) => a.rawMaterialOrigin[lang].localeCompare(b.rawMaterialOrigin[lang])); break;
      case 'manufacturer': result.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer)); break;
      default: break;
    }
    return result;
  }, [baseScoped, productSearch, allergenFree, selectedCountries, selectedManufacturers, selectedCertificates, sortBy, lang]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const toggleValue = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
    setCurrentPage(1);
  };

  const activeFilterCount =
    (allergenFree ? 1 : 0) +
    selectedCountries.length +
    selectedManufacturers.length +
    selectedCertificates.length +
    (productSearch.trim() ? 1 : 0);

  const clearAll = () => {
    setAllergenFree(false);
    setSelectedCountries([]);
    setSelectedManufacturers([]);
    setSelectedCertificates([]);
    setProductSearch('');
    setCountrySearch('');
    setManufacturerSearch('');
    setCertificateSearch('');
    setCurrentPage(1);
  };

  const filterList = (items: string[], q: string) =>
    q.trim() ? items.filter(i => i.toLowerCase().includes(q.trim().toLowerCase())) : items;

  const FiltersContent = () => (
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
        <div className="flex items-center gap-2 mb-3">
          <Checkbox id="allergen" checked={allergenFree} onCheckedChange={(v) => { setAllergenFree(!!v); setCurrentPage(1); }} />
          <label htmlFor="allergen" className="text-sm font-sans cursor-pointer">{t('filters.allergenFree')}</label>
        </div>
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

      {availableCountries.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-3 font-sans">{t('filters.brandCountry')}</h3>
          {availableCountries.length > 5 && (
            <Input
              value={countrySearch}
              onChange={e => setCountrySearch(e.target.value)}
              placeholder={t('filters.searchPlaceholder')}
              className="h-8 mb-2 bg-card"
            />
          )}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {filterList(availableCountries, countrySearch).map(country => (
              <div key={country} className="flex items-center gap-2">
                <Checkbox
                  id={`country-${country}`}
                  checked={selectedCountries.includes(country)}
                  onCheckedChange={() => toggleValue(selectedCountries, setSelectedCountries, country)}
                />
                <label htmlFor={`country-${country}`} className="text-sm font-sans cursor-pointer">{country}</label>
              </div>
            ))}
            {filterList(availableCountries, countrySearch).length === 0 && (
              <p className="text-xs text-muted-foreground">{t('filters.noMatches')}</p>
            )}
          </div>
        </div>
      )}

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
                  <SelectItem value="brandCountry">{t('filters.brandCountry')}</SelectItem>
                  <SelectItem value="manufacturer">{t('filters.manufacturer')}</SelectItem>
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
