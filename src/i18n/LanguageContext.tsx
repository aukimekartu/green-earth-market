import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { translations, type Language } from './translations';

interface LanguageContextType {
  lang: Language;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'lt',
  t: (key) => key,
});

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[part];
    return undefined;
  }, obj);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { lang: urlLang } = useParams();
  const lang: Language = (['lt', 'en', 'lv'].includes(urlLang || '') ? urlLang : 'lt') as Language;

  useEffect(() => {
    document.cookie = `lang=${lang};path=/;max-age=31536000;SameSite=Lax`;
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    const value = getNestedValue(translations as unknown as Record<string, unknown>, key);
    if (value && typeof value === 'object' && lang in (value as Record<string, string>)) {
      return (value as Record<string, string>)[lang];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function getCookieLang(): Language {
  const match = document.cookie.match(/(?:^|; )lang=(lt|en|lv)/);
  return (match ? match[1] : 'lt') as Language;
}

export const useLanguage = () => useContext(LanguageContext);
