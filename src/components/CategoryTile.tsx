import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Category } from '@/data/categories';

// Category images
import vinegarImg from '@/assets/categories/vinegar.jpg';
import coffeeImg from '@/assets/categories/coffee.jpg';
import cocoaImg from '@/assets/categories/cocoa.jpg';
import oilImg from '@/assets/categories/oil.jpg';
import spicesImg from '@/assets/categories/spices.jpg';
import sweetenersImg from '@/assets/categories/sweeteners.jpg';

const categoryImages: Record<string, string> = {
  actas: vinegarImg,
  kava: coffeeImg,
  kakava: cocoaImg,
  aliejus: oilImg,
  prieskoniai: spicesImg,
  saldikliai: sweetenersImg,
};

interface CategoryTileProps {
  category: Category;
}

export function CategoryTile({ category }: CategoryTileProps) {
  const { lang } = useLanguage();
  const bgImage = categoryImages[category.slug];

  return (
    <Link
      to={`/${lang}/products/${category.slug}`}
      className="group relative aspect-square rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
    >
      {bgImage ? (
        <img
          src={bgImage}
          alt={category.name[lang]}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-secondary flex items-center justify-center">
          <category.icon className="w-12 h-12 text-primary/40" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <span className="font-handwritten text-lg md:text-xl text-primary-foreground drop-shadow-md">
          {'> '}{category.name[lang]}
        </span>
      </div>
    </Link>
  );
}
