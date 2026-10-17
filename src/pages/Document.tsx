import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Banner } from '@bettergov/kapwa/banner';
import { useParams, Link } from 'react-router';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  loadMarkdownContent,
  type MarkdownContent,
} from '../lib/markdownLoader';
import { createMarkdownComponents } from '../lib/markdownComponents';
import { getTypographyTheme } from '../lib/typographyThemes';
import {
  serviceCategories,
  governmentCategories,
  getCategorySubcategories,
  isNestedCategory,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import SEO from '../components/SEO';

interface DocumentProps {
  theme?: string;
  categoryType?: 'service' | 'government';
}

export default function Document({
  theme: initialTheme = 'default',
  categoryType,
}: DocumentProps) {
  const { documentSlug, category } = useParams();
  const [markdownContent, setMarkdownContent] =
    useState<MarkdownContent | null>(null);
  const [nestedIndex, setNestedIndex] = useState<CategoryIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const markdownComponents = createMarkdownComponents(
    getTypographyTheme(initialTheme)
  );

  const [breadcrumbs, setBreadcrumbs] = useState([
    { label: 'Home', href: '/' },
  ]);

  useEffect(() => {
    if (!documentSlug || !category || !categoryType) {
      setError('No document specified');
      setLoading(false);
      return;
    }

    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const isGovernment = categoryType === 'government';
        const categories = isGovernment
          ? governmentCategories.categories
          : serviceCategories.categories;
        const sectionLabel = isGovernment ? 'Government' : 'Services';
        const sectionHref = isGovernment ? '/government' : '/services';
        const categoryData = categories.find(c => c.slug === category);

        // If the slug maps to its own index, render it as a nested listing
        if (isNestedCategory(documentSlug)) {
          const index = await getCategorySubcategories(documentSlug);
          setNestedIndex(index);
          setBreadcrumbs([
            { label: 'Home', href: '/' },
            { label: sectionLabel, href: sectionHref },
            {
              label: categoryData?.category ?? category,
              href: `${sectionHref}/${category}`,
            },
            {
              label: documentSlug,
              href: `${sectionHref}/${category}/${documentSlug}`,
            },
          ]);
          return;
        }

        const content = await loadMarkdownContent(
          documentSlug,
          category,
          categoryType
        );
        setMarkdownContent(content);

        setBreadcrumbs([
          { label: 'Home', href: '/' },
          { label: sectionLabel, href: sectionHref },
          {
            label: categoryData?.category ?? category,
            href: `${sectionHref}/${category}`,
          },
          {
            label: content.title ?? documentSlug,
            href: `${sectionHref}/${category}/${documentSlug}`,
          },
        ]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load document'
        );
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [documentSlug, category, categoryType]);

  if (loading) {
    return (
      <Section className="p-3 mb-12">
        <Banner type="info" description="Loading document..." />
      </Section>
    );
  }

  if (error) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" items={breadcrumbs} />
        <Banner
          type="error"
          title="Document Not Found"
          description={error}
          icon
        />
      </Section>
    );
  }

  if (nestedIndex) {
    const nestedPages: Subcategory[] = nestedIndex.pages;
    const isGovernment = categoryType === 'government';
    const sectionHref = isGovernment ? '/government' : '/services';
    const targetCategory = category || documentSlug;
    return (
      <>
        <SEO
          title={documentSlug}
          keywords={`${documentSlug}, government services, local government`}
        />
        <Section className="py-8 md:py-12">
          <Breadcrumbs className="mb-6" items={breadcrumbs} />
          {nestedIndex.title && (
            <Heading
              level={1}
              className="text-2xl md:text-3xl font-bold text-gray-950"
            >
              {nestedIndex.title}
            </Heading>
          )}
          {nestedIndex.description && (
            <Text className="text-gray-600 text-sm md:text-base mt-1 mb-8 max-w-3xl">
              {nestedIndex.description}
            </Text>
          )}
          {nestedIndex.layout === 'grid' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {nestedPages.map((page, i) => (
                <Link
                  key={page.slug ?? i}
                  to={`${sectionHref}/${targetCategory}/${page.slug}`}
                  className="group flex flex-col justify-between bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-500 hover:shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600"
                >
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                      {page.name}
                    </h3>
                    {page.description && (
                      <p className="mt-2 text-xs md:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {page.description}
                      </p>
                    )}
                  </div>
                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-primary-700 font-medium">
                    <span>View guide</span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Read <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {nestedPages.map((page, i) => (
                <Link
                  key={page.slug ?? i}
                  to={`${sectionHref}/${targetCategory}/${page.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-500 hover:shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600 gap-3"
                >
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                      {page.name}
                    </h3>
                    {page.description && (
                      <p className="mt-1 text-xs md:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {page.description}
                      </p>
                    )}
                  </div>
                  <div className="text-xs text-primary-700 font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                    <span>View guide</span>
                    <span aria-hidden="true">&rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Section>
      </>
    );
  }

  if (!markdownContent) {
    return null;
  }

  return (
    <>
      <SEO
        title={markdownContent.title || documentSlug}
        description={
          markdownContent.description ||
          `Government service information for ${documentSlug}`
        }
        keywords={`${documentSlug}, government services, public services, local government`}
      />
      <Section className="py-8 md:py-12">
        <Breadcrumbs className="mb-6" items={breadcrumbs} />
        <article className="bg-white border border-gray-200 rounded-xl p-6 md:p-10 shadow-xs">
          {markdownContent.description && (
            <div className="mb-8 p-4 rounded-lg bg-blue-50/70 border-l-4 border-primary-600 text-gray-700 text-sm leading-relaxed">
              {markdownContent.description}
            </div>
          )}
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {markdownContent.content}
            </ReactMarkdown>
          </div>
        </article>
      </Section>
    </>
  );
}
