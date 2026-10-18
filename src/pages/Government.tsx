import Section from '../components/ui/Section';
import { useParams, Link } from 'react-router';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import {
  governmentCategories,
  getCategorySubcategories,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import * as LucideIcons from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import SEO from '../components/SEO';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';

const Government: React.FC = () => {
  const { category } = useParams();
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({
    layout: 'list',
    pages: [],
  });
  const [loading, setLoading] = useState(false);
  const subcategories: Subcategory[] = categoryIndex.pages;

  const getCategory = () => {
    return governmentCategories.categories.find(c => c.slug === category);
  };

  const categoryData = getCategory();
  const Icon = LucideIcons[
    categoryData?.icon as keyof typeof LucideIcons
  ] as React.ComponentType<{ className?: string }>;

  useEffect(() => {
    if (category && categoryData) {
      setLoading(true);
      getCategorySubcategories(category)
        .then(setCategoryIndex)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [category, categoryData]);

  if (!category) {
    return (
      <>
        <SEO
          title="Government"
          description={`Information, offices, ordinances, and transparency reports of BetterMorong.`}
          keywords="BetterMorong government, Morong Rizal offices, municipal departments, ordinances, transparency"
        />
        <GovernmentActivitySection
          title="Government & Public Administration"
          description={`Information, offices, ordinances, and transparency reports of BetterMorong.`}
        />
      </>
    );
  }
  if (!categoryData) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Banner
          type="error"
          title="Category not found"
          description="The category you are looking for does not exist."
          icon
        />
      </Section>
    );
  }

  return (
    <>
      <SEO
        title={categoryData.category || category}
        description={categoryData.description}
        keywords={`${categoryData.category}, government services, public services, local government`}
      />
      <Section className="py-8 md:py-12">
        <Breadcrumbs className="mb-6" />
        <div className="flex items-start gap-4 mb-8">
          {Icon && (
            <div
              className="p-3 bg-primary-50 border border-primary-100 rounded-xl text-primary-700 shrink-0"
              aria-hidden="true"
            >
              <Icon className="h-6 w-6 md:h-7 md:w-7" />
            </div>
          )}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-700">
              Government Directory
            </span>
            <Heading
              level={1}
              className="text-2xl md:text-3xl font-bold text-gray-950 mt-1"
            >
              {categoryData.category || category}
            </Heading>
            <Text className="text-gray-600 text-sm md:text-base mt-1 max-w-3xl">
              {categoryData.description}
            </Text>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16 text-gray-500">
            <Text>Loading information...</Text>
          </div>
        ) : (
          <>
            {categoryIndex.title && (
              <Heading
                level={2}
                className="text-lg font-semibold text-gray-900 mb-4"
              >
                {categoryIndex.title}
              </Heading>
            )}
            {categoryIndex.description && (
              <Text className="text-gray-600 text-sm mb-6">
                {categoryIndex.description}
              </Text>
            )}
            {categoryIndex.layout === 'grid' ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {subcategories.map(subcategory => (
                  <Link
                    key={subcategory.slug}
                    to={`/government/${category}/${subcategory.slug}`}
                    className="group flex flex-col justify-between bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-500 hover:shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                        {subcategory.name}
                      </h3>
                      {subcategory.description && (
                        <p className="mt-2 text-xs md:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                          {subcategory.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-primary-700 font-medium">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-primary-50 text-primary-700 border border-primary-100">
                        {categoryData.category || category}
                      </span>
                      <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Read guide <span aria-hidden="true">&rarr;</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {subcategories.map(subcategory => (
                  <Link
                    key={subcategory.slug}
                    to={`/government/${category}/${subcategory.slug}`}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-500 hover:shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600 gap-3"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                        {subcategory.name}
                      </h3>
                      {subcategory.description && (
                        <p className="mt-1 text-xs md:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                          {subcategory.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-primary-50 text-primary-700 border border-primary-100">
                        {categoryData.category || category}
                      </span>
                      <span className="text-xs text-primary-700 font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Read guide <span aria-hidden="true">&rarr;</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </Section>
    </>
  );
};

export default Government;
