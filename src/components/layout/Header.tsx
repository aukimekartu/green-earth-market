import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, User, ShoppingCart, Menu, X } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { mainNavCategories } from '@/data/categories';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { lang, t } = useLanguage();
  const { getItemCount, getTotal, setCartOpen } = useCart();
  const { count: favCount } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/${lang}/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
      {/* Top bar with search and actions */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link to={`/${lang}`} className="shrink-0">
            <span className="font-handwritten text-2xl md:text-3xl font-bold text-primary">
              Natura<span className="text-accent">Vida</span>
            </span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('search.placeholder')}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
              />
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label={t('favorites.title')}>
              <Heart className="w-5 h-5" />
              {favCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favCount}
                </span>
              )}
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:block" aria-label={t('account')}>
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-1.5 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={t('cart.cart')}
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </div>
              <span className="text-sm font-semibold hidden md:inline">€{getTotal().toFixed(2)}</span>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('search.placeholder')}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </form>
      </div>

      {/* Desktop nav */}
      <nav className="hidden lg:block bg-secondary/50 border-t border-border">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center gap-8 h-11">
            {mainNavCategories.map(cat => (
              <li key={cat.id}>
                <Link
                  to={cat.id === 'maistas' ? `/${lang}/category/maistas` : `/${lang}/category/${cat.slug}`}
                  className="text-sm font-semibold uppercase tracking-wider text-foreground hover:text-accent transition-colors"
                >
                  {cat.name[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-card border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <div className="sm:hidden pb-2">
              <LanguageSwitcher />
            </div>
            {mainNavCategories.map(cat => (
              <Link
                key={cat.id}
                to={cat.id === 'maistas' ? `/${lang}/category/maistas` : `/${lang}/category/${cat.slug}`}
                className="block py-2 text-sm font-semibold uppercase tracking-wider text-foreground hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name[lang]}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
