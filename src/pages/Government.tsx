import Section from '../components/ui/Section';
import { useParams, Link } from 'react-router';
import { Text } from '../components/ui/Text';
import {
  governmentCategories,
  getCategorySubcategories,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import * as LucideIcons from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '../components/SEO';
import { Banner } from '@bettergov/kapwa/banner';
import TransparencyHeroBanner from '../components/ui/TransparencyHeroBanner';
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
          title="Government & Public Administration"
          description="Official municipal departments, elected officials, enacted ordinances, council resolutions, and public transparency disclosures for Morong, Rizal."
          keywords="BetterMorong government, Morong Rizal offices, municipal departments, ordinances, transparency"
        />
        <Section className="py-8 md:py-12">
          <Breadcrumbs className="mb-6" />
          <TransparencyHeroBanner
            badge="Local Government & Public Administration"
            title="Civic Governance & Municipal Directory"
            description="Explore municipal frontline departments, Sangguniang Bayan council ordinances, public procurement reports, and official fiscal records for the Municipality of Morong, Rizal."
            tags={[
              { label: 'Municipality of Morong, Rizal' },
              { label: 'Executive & Legislative' },
              { label: 'Open Civic Governance', highlight: true },
            ]}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {governmentCategories.categories.map(c => {
              const CatIcon = LucideIcons[
                c.icon as keyof typeof LucideIcons
              ] as React.ComponentType<{ className?: string }>;
              return (
                <Link
                  key={c.slug}
                  to={`/government/${c.slug}`}
                  className="group flex flex-col justify-between bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-500 hover:shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="bg-primary-50 text-primary-700 p-2.5 rounded-lg border border-primary-100 group-hover:bg-primary-100 group-hover:text-primary-800 transition-colors shrink-0"
                        aria-hidden="true"
                      >
                        {CatIcon && <CatIcon className="h-5 w-5" />}
                      </div>
                      <h2 className="text-base sm:text-lg font-bold text-gray-950 group-hover:text-primary-700 transition-colors leading-snug">
                        {c.category}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {c.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-primary-700 group-hover:text-primary-800">
                    <span>Explore directory</span>
                    <span
                      aria-hidden="true"
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Section>
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
        <TransparencyHeroBanner
          badge={
            category === 'transparency-documents'
              ? 'DILG Full Disclosure Policy & Transparency'
              : category === 'departments'
                ? 'Municipal Offices & Frontline Directory'
                : category === 'ordinances-and-resolutions'
                  ? 'Sangguniang Bayan Legislative Registry'
                  : category === 'about-morong'
                    ? 'Town Profile & Cultural Heritage'
                    : 'Local Government Directory'
          }
          title={categoryIndex.title || categoryData.category || category}
          description={categoryIndex.description || categoryData.description}
          tags={
            category === 'transparency-documents'
              ? [
                  { label: 'Municipality of Morong, Rizal' },
                  { label: 'DILG Full Disclosure Portal', highlight: true },
                  { label: 'Official Public Records' },
                ]
              : category === 'departments'
                ? [
                    { label: 'Municipality of Morong, Rizal' },
                    { label: 'Frontline Public Offices', highlight: true },
                    { label: 'Direct Municipal Assistance' },
                  ]
                : category === 'ordinances-and-resolutions'
                  ? [
                      { label: 'Municipality of Morong, Rizal' },
                      {
                        label: 'Sangguniang Bayan Enactments',
                        highlight: true,
                      },
                      { label: 'Municipal Regulatory Code' },
                    ]
                  : [
                      { label: 'Municipality of Morong, Rizal' },
                      {
                        label: 'Historical & Tourism Profile',
                        highlight: true,
                      },
                      { label: 'Province of Rizal' },
                    ]
          }
        />

        {loading ? (
          <div className="flex justify-center items-center py-16 text-gray-500">
            <Text>Loading information...</Text>
          </div>
        ) : (
          <>
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
                        <p className="mt-2 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                          {subcategory.description}
                        </p>
                      )}
                    </div>
                    <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-primary-700 font-medium">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
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
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                          {subcategory.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
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
