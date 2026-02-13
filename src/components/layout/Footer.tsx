import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Gift, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';

export function Footer() {
  const { lang, t } = useLanguage();
  const [email, setEmail] = useState('');

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* Newsletter */}
      <section className="bg-secondary torn-edge-top py-16 mt-12">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <h2 className="text-3xl md:text-4xl text-foreground mb-3">{t('footer.newsletter')}</h2>
          <p className="text-muted-foreground mb-6">{t('footer.newsletterText')}</p>
          <form onSubmit={e => { e.preventDefault(); setEmail(''); }} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t('footer.emailPlaceholder')}
              className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              required
            />
            <Button variant="cta" type="submit">{t('footer.subscribe')}</Button>
          </form>
        </div>
      </section>

      {/* Main footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <Link to={`/${lang}`} className="font-handwritten text-3xl font-bold">
                Natura<span className="text-accent">Vida</span>
              </Link>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Customer service */}
            <div>
              <h3 className="text-lg mb-3">{t('footer.customerService')}</h3>
              <ul className="space-y-2 text-sm font-sans text-primary-foreground/80">
                <li><Link to={`/${lang}/privacy`} className="hover:text-primary-foreground transition-colors">{t('footer.contactUs')}</Link></li>
                <li><Link to={`/${lang}/privacy`} className="hover:text-primary-foreground transition-colors">{t('footer.delivery')}</Link></li>
                <li><Link to={`/${lang}/privacy`} className="hover:text-primary-foreground transition-colors">{t('footer.returnPolicy')}</Link></li>
                <li><Link to={`/${lang}/privacy`} className="hover:text-primary-foreground transition-colors">{t('footer.faq')}</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg mb-3">{t('footer.legalInfo')}</h3>
              <ul className="space-y-2 text-sm font-sans text-primary-foreground/80">
                <li><Link to={`/${lang}/privacy`} className="hover:text-primary-foreground transition-colors">{t('footer.privacyPolicy')}</Link></li>
                <li><Link to={`/${lang}/privacy`} className="hover:text-primary-foreground transition-colors">{t('footer.termsOfService')}</Link></li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="text-lg mb-3">{t('footer.help')}</h3>
              <ul className="space-y-2 text-sm font-sans text-primary-foreground/80">
                <li><Link to={`/${lang}/privacy`} className="hover:text-primary-foreground transition-colors">{t('footer.about')}</Link></li>
                <li><Link to={`/${lang}/privacy`} className="hover:text-primary-foreground transition-colors">{t('footer.faq')}</Link></li>
              </ul>
            </div>
          </div>

          {/* Payment icons bar */}
          <div className="border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-primary-foreground/60">
              <span className="px-2 py-1 border border-primary-foreground/20 rounded text-[10px] font-bold">VISA</span>
              <span className="px-2 py-1 border border-primary-foreground/20 rounded text-[10px] font-bold">MC</span>
              <span className="px-2 py-1 border border-primary-foreground/20 rounded text-[10px] font-bold">PAYPAL</span>
              <span className="px-2 py-1 border border-primary-foreground/20 rounded text-[10px] font-bold">DPD</span>
              <span className="px-2 py-1 border border-primary-foreground/20 rounded text-[10px] font-bold">LP</span>
            </div>
            <p className="text-xs text-primary-foreground/60 font-sans">{t('footer.allRights')}</p>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 right-4 z-40 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        aria-label={t('backToTop')}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Floating gift/deals button */}
      <Link
        to={`/${lang}/category/akcijos`}
        className="fixed bottom-36 right-4 z-40 w-12 h-12 rounded-full bg-accent text-accent-foreground shadow-lg flex items-center justify-center hover:bg-accent/90 transition-colors animate-bounce"
        style={{ animationDuration: '3s' }}
      >
        <Gift className="w-5 h-5" />
      </Link>
    </>
  );
}
