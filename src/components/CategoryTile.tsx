import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Category } from '@/data/categories';

interface CategoryTileProps {
  category: Category;
}

export function CategoryTile({ category }: CategoryTileProps) {
  const { lang } = useLanguage();
  const Icon = category.icon;

  return (
    <Link
      to={`/${lang}/products/${category.slug}`}
      className="group flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
    >
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <span className="font-handwritten text-xl text-foreground group-hover:text-primary transition-colors">
        {category.name[lang]}
      </span>
    </Link>
  );
}
