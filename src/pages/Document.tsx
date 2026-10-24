import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Banner } from '@bettergov/kapwa/banner';
import { useParams, Link } from 'react-router';
import { useEffect, useState, lazy, Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
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
import BudgetDashboard from '../components/government/BudgetDashboard';
import TransparencyHeroBanner, {
  type TransparencyTag,
} from '../components/ui/TransparencyHeroBanner';
import { ChecklistProvider } from '../context/ChecklistContext';
import ServiceGuideToolbar from '../components/ui/ServiceGuideToolbar';
import DownloadableFormsCard from '../components/ui/DownloadableFormsCard';

const LguDocumentsExplorer = lazy(
  () => import('../components/government/LguDocumentsExplorer')
);
const LguFormsHub = lazy(() => import('../components/government/LguFormsHub'));
const TaxAndCedulaEstimator = lazy(
  () => import('../components/services/TaxAndCedulaEstimator')
);

function getTransparencyBannerConfig(slug?: string): {
  badge: string;
  tags: TransparencyTag[];
  action?: { label: string; href: string; external?: boolean };
} {
  switch (slug) {
    case 'dpwh-infrastructure-projects':
      return {
        badge: 'DPWH National Infrastructure Projects & Monitoring',
        tags: [
          { label: 'GAA 2025 Active Portfolio' },
          { label: 'GAA 2026 Pipeline', highlight: true },
          { label: 'Rizal 1st & 2nd DEO' },
        ],
        action: {
          label: 'DPWH Portal',
          href: 'https://transparency.dpwh.gov.ph/',
          external: true,
        },
      };
    case 'citizens-charter-2025':
      return {
        badge: 'Anti-Red Tape Authority & Ease of Doing Business',
        tags: [
          { label: 'Republic Act No. 11032', highlight: true },
          { label: 'All Municipal Frontline Offices' },
          { label: 'Guaranteed Processing Windows' },
        ],
      };
    case 'downloadable-forms':
      return {
        badge: 'Anti-Red Tape Authority & Ease of Doing Business',
        tags: [
          { label: 'Republic Act No. 11032', highlight: true },
          { label: 'Official Application Forms' },
          { label: 'Frontline Department Checklists' },
        ],
      };
    case 'procurement-monitoring-reports':
      return {
        badge: 'Bids & Awards Committee (BAC) Monitoring',
        tags: [
          { label: 'RA 9184 & GPPB Compliance', highlight: true },
          { label: 'Public Bidding Records' },
          { label: 'Consolidated PMR Reports' },
        ],
      };
    case 'assistance-to-municipalities':
      return {
        badge: 'DILG Assistance to Municipalities (AM)',
        tags: [
          { label: 'DILG Priority Assistance Program', highlight: true },
          { label: 'Flood Control & Potable Water' },
          { label: 'Disaster Resilience' },
        ],
      };
    case 'full-disclosure-policy':
      return {
        badge: 'DILG Full Disclosure Policy (FDP)',
        tags: [
          { label: 'Mandatory Financial Disclosures', highlight: true },
          { label: 'Annual Budgets & AIP' },
          { label: 'DILG FDP Portal Verified' },
        ],
        action: {
          label: 'DILG FDP Portal',
          href: 'https://fdpp.dilg.gov.ph/',
          external: true,
        },
      };
    case 'lgsf-falgu-and-drrap-projects':
      return {
        badge: 'Local Government Support Fund (DBM & DILG)',
        tags: [
          { label: 'LGSF-FALGU & DRRAP Grants', highlight: true },
          { label: 'Public Market & Emergency Response' },
          { label: 'Special Local Development' },
        ],
      };
    default:
      return {
        badge: 'Transparency & Public Accountability',
        tags: [
          { label: 'Municipality of Morong, Rizal' },
          { label: 'Full Disclosure Policy' },
          { label: 'Official Public Record', highlight: true },
        ],
      };
  }
}

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
          title={nestedIndex.title || documentSlug}
          keywords={`${documentSlug}, government services, local government`}
        />
        <Section className="py-8 md:py-12">
          <Breadcrumbs className="mb-6" items={breadcrumbs} />
          <TransparencyHeroBanner
            title={
              nestedIndex.title || documentSlug || 'Public Guide & Information'
            }
            description={nestedIndex.description}
            badge={
              targetCategory === 'transparency-documents'
                ? 'DILG Full Disclosure Policy'
                : isGovernment
                  ? 'Government Public Directory'
                  : 'Citizen Services Guide'
            }
            tags={
              targetCategory === 'transparency-documents'
                ? [
                    { label: 'Municipality of Morong, Rizal' },
                    { label: 'DILG Full Disclosure Portal', highlight: true },
                    { label: 'Official Public Records' },
                  ]
                : [
                    { label: 'Municipality of Morong, Rizal' },
                    { label: targetCategory || 'Morong', highlight: true },
                    {
                      label: isGovernment
                        ? 'Public Directory'
                        : 'Frontline Service',
                    },
                  ]
            }
          />
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
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3 leading-relaxed">
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
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2 leading-relaxed">
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

  if (documentSlug === 'blgf-statement-of-receipts-and-expenditures') {
    return (
      <>
        <SEO
          title="Statement of Receipts & Expenditures (FY 2025 Preliminary) — Morong, Rizal"
          description="Official FY 2025 financial performance, municipal revenues, expenditures, and fund balances of Morong, Rizal from the Bureau of Local Government Finance."
          keywords="Morong budget, statement of receipts and expenditures, BLGF, municipal finances, Morong Rizal transparency"
        />
        <Section className="py-8 md:py-12">
          <Breadcrumbs className="mb-6" items={breadcrumbs} />
          <BudgetDashboard />
        </Section>
      </>
    );
  }

  if (!markdownContent) {
    return null;
  }

  const isGovernment = categoryType === 'government';
  const isTransparency = category === 'transparency-documents';
  const transparencyConfig = isTransparency
    ? getTransparencyBannerConfig(documentSlug)
    : null;

  // Clean content when hero banner is rendered to avoid duplicate title and notice block
  const rawClean = markdownContent.content
    ? markdownContent.content
        .replace(/^#\s+.+$/m, '')
        .replace(/^>[^\n]*(?:\n>[^\n]*)*\n---/m, '')
        .trim()
    : '';

  // Auto-enhance requirement lists with interactive task checkboxes for service guides
  const displayContent = !isGovernment
    ? rawClean.replace(
        /(#{1,4}\s+[^\n]*(?:requirement|what to bring|checklist|documentary|kinakailangan|dalhin)[^\n]*\n+)([\s\S]*?)(?=\n#{1,4}\s+|\n---\s*\n|$)/gi,
        (_match, heading, body) => {
          const transformedBody = body.replace(
            /^(\s*(?:-|\*|\d+\.)\s+)(?!\[[ xX]\])(.+)$/gm,
            '$1[ ] $2'
          );
          return heading + transformedBody;
        }
      )
    : rawClean;

  return (
    <ChecklistProvider slug={documentSlug || ''} isServiceGuide={!isGovernment}>
      <SEO
        title={markdownContent.title || documentSlug}
        description={
          markdownContent.description ||
          `Government service information for ${documentSlug}`
        }
        keywords={`${documentSlug}, government services, public services, local government`}
      />
      <Section className="py-8 md:py-12">
        <Breadcrumbs className="mb-6 print:hidden" items={breadcrumbs} />

        {/* Printable Canonical Source Header */}
        <div className="print-source-header hidden print:block mb-6 pb-3 border-b-2 border-black text-xs text-gray-800">
          <div className="font-bold text-base text-black">
            BetterMorong — Citizen Services & Transparency Portal
          </div>
          <div>
            Municipality of Morong, Rizal • Official Citizen Service Guide
          </div>
        </div>

        <TransparencyHeroBanner
          badge={
            isTransparency && transparencyConfig
              ? transparencyConfig.badge
              : isGovernment
                ? `Government Directory • ${breadcrumbs[2]?.label || category}`
                : `Public Services • ${breadcrumbs[2]?.label || category}`
          }
          title={markdownContent.title || documentSlug || 'Official Document'}
          description={markdownContent.description}
          tags={
            isTransparency && transparencyConfig
              ? transparencyConfig.tags
              : [
                  { label: 'Municipality of Morong, Rizal' },
                  {
                    label: breadcrumbs[2]?.label || category || 'Information',
                    highlight: true,
                  },
                  {
                    label: isGovernment ? 'Public Document' : "Citizen's Guide",
                  },
                ]
          }
          action={
            isTransparency && transparencyConfig
              ? transparencyConfig.action
              : undefined
          }
        />

        {/* Action Toolbar for Service Guides */}
        {!isGovernment && <ServiceGuideToolbar />}

        {/* Downloadable Forms Frontmatter Card */}
        {markdownContent.forms && markdownContent.forms.length > 0 && (
          <DownloadableFormsCard forms={markdownContent.forms} />
        )}

        <article className="bg-white border border-gray-200 rounded-xl p-6 md:p-10 shadow-xs print:border-none print:shadow-none print:p-0">
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={markdownComponents}
            >
              {displayContent || ''}
            </ReactMarkdown>
          </div>
        </article>
        {documentSlug === 'get-cedula-and-individual-working-permit' && (
          <div className="mt-8">
            <Suspense
              fallback={
                <div className="p-8 text-center text-gray-500 bg-white border border-gray-200 rounded-xl animate-pulse">
                  Loading Cedula & tax estimator...
                </div>
              }
            >
              <TaxAndCedulaEstimator defaultTab="cedula" />
            </Suspense>
          </div>
        )}
        {documentSlug ===
          'pay-real-property-tax-amilyar-and-get-tax-clearance' && (
          <div className="mt-8">
            <Suspense
              fallback={
                <div className="p-8 text-center text-gray-500 bg-white border border-gray-200 rounded-xl animate-pulse">
                  Loading Real Property Tax estimator...
                </div>
              }
            >
              <TaxAndCedulaEstimator defaultTab="rpt" />
            </Suspense>
          </div>
        )}
        {documentSlug === 'procurement-monitoring-reports' && (
          <div className="mt-8">
            <Suspense
              fallback={
                <div className="p-8 text-center text-gray-500 bg-white border border-gray-200 rounded-xl animate-pulse">
                  Loading public documents explorer...
                </div>
              }
            >
              <LguDocumentsExplorer />
            </Suspense>
          </div>
        )}
        {documentSlug === 'downloadable-forms' && (
          <div className="mt-8">
            <Suspense
              fallback={
                <div className="p-8 text-center text-gray-500 bg-white border border-gray-200 rounded-xl animate-pulse">
                  Loading downloadable forms hub...
                </div>
              }
            >
              <LguFormsHub />
            </Suspense>
          </div>
        )}
      </Section>
    </ChecklistProvider>
  );
}
