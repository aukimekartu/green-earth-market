import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import type { Language } from '@/i18n/translations';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'lt', label: 'LT', flag: '🇱🇹' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'lv', label: 'LV', flag: '🇱🇻' },
];

export function LanguageSwitcher() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const switchLanguage = (newLang: Language) => {
    if (newLang === lang) return;
    const newPath = location.pathname.replace(/^\/(lt|en|lv)/, `/${newLang}`);
    navigate(newPath + location.search);
  };

  return (
    <div className="flex items-center gap-0.5">
      {languages.map((l, i) => (
        <span key={l.code} className="flex items-center">
          <button
            onClick={() => switchLanguage(l.code)}
            className={cn(
              'px-1.5 py-0.5 text-xs font-semibold rounded transition-colors',
              l.code === lang
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            )}
          >
            <span className="mr-0.5">{l.flag}</span>
            {l.label}
          </button>
          {i < languages.length - 1 && <span className="text-border mx-0.5">|</span>}
        </span>
      ))}
    </div>
  );
}
