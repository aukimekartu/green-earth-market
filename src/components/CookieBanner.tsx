import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function CookieBanner() {
  const { lang, t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('bio-cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('bio-cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('bio-cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg p-4 md:p-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-foreground">
          {t('cookie.message')}{' '}
          <Link to={`/${lang}/privacy`} className="underline text-primary hover:text-primary/80">
            {t('cookie.learnMore')}
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={decline}>
            {t('cookie.decline')}
          </Button>
          <Button variant="cta" size="sm" onClick={accept}>
            {t('cookie.accept')}
          </Button>
        </div>
      </div>
    </div>
  );
}
