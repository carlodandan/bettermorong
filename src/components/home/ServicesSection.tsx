import React from 'react';
import Section from '../ui/Section';
import * as LucideIcons from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from '../../hooks/useTranslation';
import { Link } from 'react-router';
import { serviceCategories } from '../../data/yamlLoader';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories?: Subcategory[];
  description: string;
  icon: string;
}

export default function ServicesSection({
  title,
  description,
  limit,
}: {
  title?: string;
  description?: string;
  limit?: number;
} = {}) {
  const { t } = useTranslation();

  const getIcon = (iconName: string) => {
    const IconComponent = LucideIcons[
      iconName as keyof typeof LucideIcons
    ] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  const allCategories = serviceCategories.categories as Category[];
  const displayedCategories = limit
    ? allCategories.slice(0, limit)
    : allCategories;

  return (
    <Section className="py-12 bg-slate-50/60 border-b border-gray-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-700">
            Municipal Services
          </span>
          <Heading
            level={2}
            className="text-2xl md:text-3xl font-bold text-gray-950 mt-1"
          >
            {title || t('services.title')}
          </Heading>
          <Text className="text-gray-600 text-sm md:text-base max-w-2xl mt-1 mb-0">
            {description || t('services.description')}
          </Text>
        </div>
        {limit ? (
          <Link
            to="/services"
            className="text-xs md:text-sm font-semibold text-primary-700 hover:text-primary-800 hover:underline inline-flex items-center gap-1 shrink-0 self-start md:self-end"
          >
            View all {allCategories.length} categories &rarr;
          </Link>
        ) : null}
      </div>

      <div
        className={
          limit === 4
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
        }
      >
        {displayedCategories.map(category => (
          <Link
            key={category.slug}
            to={`/services/${category.slug}`}
            className="group flex flex-col justify-between bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-500 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="bg-primary-50 text-primary-700 p-2.5 rounded-lg border border-primary-100 group-hover:bg-primary-100 group-hover:text-primary-800 transition-colors shrink-0"
                  aria-hidden="true"
                >
                  {getIcon(category.icon)}
                </div>
                <h3 className="text-base font-bold text-gray-950 group-hover:text-primary-700 transition-colors leading-snug">
                  {category.category}
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                {category.description}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-primary-700 group-hover:text-primary-800">
              <span>Access service guides</span>
              <span
                aria-hidden="true"
                className="group-hover:translate-x-1 transition-transform"
              >
                &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
