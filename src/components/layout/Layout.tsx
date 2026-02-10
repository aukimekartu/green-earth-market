import { Outlet } from 'react-router-dom';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { CartSidebar } from '@/components/CartSidebar';

export function Layout() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <CartSidebar />
      <CookieBanner />
    </LanguageProvider>
  );
}
