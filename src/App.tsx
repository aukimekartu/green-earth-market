import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/hooks/useCart";
import { FavoritesProvider } from "@/hooks/useFavorites";
import { getCookieLang } from "@/i18n/LanguageContext";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const LangRedirect = () => <Navigate to={`/${getCookieLang()}`} replace />;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <FavoritesProvider>
            <Routes>
              <Route path="/" element={<LangRedirect />} />
              <Route path="/:lang" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="category/:slug" element={<CategoryPage />} />
                <Route path="products" element={<ProductListPage />} />
                <Route path="products/:categorySlug" element={<ProductListPage />} />
                <Route path="product/:slug" element={<ProductDetailPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </FavoritesProvider>
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
