import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Category } from '@/data/categories';

interface CategoryTileProps {
  category: Category;
}

export function CategoryTile({ category }: CategoryTileProps) {
  const { lang } = useLanguage();

  return (
    <Link
      to={`/${lang}/products/${category.slug}`}
      className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-secondary hover:shadow-lg hover:border-primary/40 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-4"
    >
      <category.icon className="w-10 h-10 md:w-12 md:h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
      <span className="font-handwritten text-base md:text-lg text-foreground text-center leading-tight">
        {category.name[lang]}
      </span>
    </Link>
  );
}