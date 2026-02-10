import { useParams } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';
import { foodCategories, mainNavCategories } from '@/data/categories';
import { CategoryTile } from '@/components/CategoryTile';

const CategoryPage = () => {
  const { slug } = useParams();
  const { lang, t } = useLanguage();

  const mainCat = mainNavCategories.find(c => c.slug === slug);
  const title = mainCat ? mainCat.name[lang] : t('categories.title');

  // For "maistas" show food subcategories; for others show a placeholder
  const showFoodCategories = slug === 'maistas' || !slug;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl text-foreground mb-8">{title}</h1>

      {showFoodCategories ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {foodCategories.map(cat => (
            <CategoryTile key={cat.id} category={cat} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground font-sans">
            {lang === 'lt' ? 'Ši kategorija ruošiama. Greitai!' :
             lang === 'en' ? 'This category is coming soon!' :
             'Šī kategorija drīzumā!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
