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
      className="group flex items-center gap-2 rounded-sm bg-secondary px-3 py-2 text-foreground hover:bg-accent transition-colors min-w-0"
    >
      <category.icon className="w-4 h-4 shrink-0 text-primary" />
      <span className="text-sm leading-5">
        {category.name[lang]}
      </span>
    </Link>
  );
}