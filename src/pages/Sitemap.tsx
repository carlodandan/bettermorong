import { Link } from 'react-router';
import SEO from '../components/SEO';
import {
  Compass,
  Search,
  FileCode,
  ExternalLink,
  Building2,
  PhoneCall,
  ArrowUpRight,
  Sparkles,
  Phone,
  Layers,
} from 'lucide-react';

interface SitemapLink {
  title: string;
  url: string;
  description: string;
  isExternal?: boolean;
  badge?: string;
}

interface SitemapSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  links: SitemapLink[];
}

export default function Sitemap() {
  const sections: SitemapSection[] = [
    {
      id: 'main',
      title: 'Main Pages & Portals',
      icon: <Compass className="w-5 h-5 text-primary-700" />,
      description: 'Core navigation and search entry points for BetterMorong.',
      links: [
        {
          title: 'Home',
          url: '/',
          description:
            'Main civic portal with fast search, top public services, live Morong weather, and municipal hall visiting hours.',
        },
        {
          title: 'Civic Search Directory',
          url: '/search',
          description:
            'Instant full-text search across all municipal services, regulatory guidelines, and official transparency documents.',
        },
        {
          title: 'Sitemap',
          url: '/sitemap',
          description:
            'Complete visual directory of every page, service category, and government document available on this portal.',
          badge: 'You are here',
        },
        {
          title: 'Machine-Readable XML Sitemap',
          url: '/sitemap.xml',
          description:
            'Raw XML sitemap feed complying with sitemaps.org protocols for search engines, web crawlers, and automated indexers.',
          isExternal: true,
        },
      ],
    },
    {
      id: 'services',
      title: 'Municipal Services & Information',
      icon: <Layers className="w-5 h-5 text-primary-700" />,
      description:
        'Official citizen guides, requirements, processing steps, and fees across 10 municipal service categories.',
      links: [
        {
          title: 'All Services Catalog',
          url: '/services',
          description:
            'Browse the complete, searchable index of all 10 frontline municipal service categories.',
          badge: '10 Categories',
        },
        {
          title: 'Health Services',
          url: '/services/health-services',
          description:
            'Free medical consultations, vaccinations, maternal and child healthcare, and Rural Health Units (RHU).',
        },
        {
          title: 'Education & Youth',
          url: '/services/education',
          description:
            'Municipal scholarship grants, daycare enrollment, and National Youth Commission organization registration.',
        },
        {
          title: 'Business & Licensing',
          url: '/services/business',
          description:
            "Mayor's business permits, barangay clearance processing, business tax payments, and trade fair promotions.",
        },
        {
          title: 'Social Welfare & Development',
          url: '/services/social-welfare',
          description:
            'Assistance for senior citizens, solo parents, PWDs, emergency financial aid (AICS), and livelihood training.',
        },
        {
          title: 'Agriculture & Fisheries',
          url: '/services/agriculture-fisheries',
          description:
            'Free certified seeds, fingerlings, fertilizers, livestock veterinary healthcare, and agricultural equipment loans.',
        },
        {
          title: 'Disaster Preparedness & MDRRMO',
          url: '/services/disaster-preparedness',
          description:
            'Hazard early warning bulletins, emergency evacuation routes, community disaster drills, and response procedures.',
        },
        {
          title: 'Environment & Natural Resources',
          url: '/services/environment',
          description:
            'Community tree-planting activities, river cleanup drives, and illegal logging or quarrying violation reporting.',
        },
        {
          title: 'Garbage & Waste Disposal',
          url: '/services/garbage-waste-disposal',
          description:
            'Barangay garbage collection timetables, ecological waste segregation rules, and special hazardous waste pickup.',
        },
        {
          title: 'Housing & Land Use',
          url: '/services/housing-land-use',
          description:
            'Zoning clearances, locational permits, building permit guidelines, and socialized housing relocation programs.',
        },
        {
          title: 'Infrastructure & Public Works',
          url: '/services/infrastructure-public-works',
          description:
            'Damaged road and drainage repair requests, potable water supply connections, and public facility reservations.',
        },
      ],
    },
    {
      id: 'government',
      title: 'Local Government & Public Records',
      icon: <Building2 className="w-5 h-5 text-primary-700" />,
      description:
        'Municipal leadership, codified local legislation, full disclosure reports, and municipal profile.',
      links: [
        {
          title: 'About Morong',
          url: '/government/about-morong',
          description:
            'Comprehensive overview of Morong, Rizal—our geography, municipal identity, and rich cultural legacy.',
        },
        {
          title: 'Vision and Mission',
          url: '/government/about-morong/vision-and-mission',
          description:
            'The official municipal charter, strategic long-term development plans, and core governance values.',
        },
        {
          title: 'Demographics & 8 Barangays',
          url: '/government/about-morong/demographics-and-barangays',
          description:
            'Population census data, land distribution, and complete directory of Morong’s 8 constituent barangays.',
        },
        {
          title: 'History & Cultural Heritage',
          url: '/government/about-morong/history-and-heritage',
          description:
            'Centuries of local heritage, the historic St. Jerome Parish Church (1615), and Spanish-era landmarks.',
        },
        {
          title: 'Tourist Spots & Dining',
          url: '/government/about-morong/tourist-spots-and-local-attractions',
          description:
            'Prominent eco-tourism destinations, cultural landmarks, local cuisine, and visitor dining guides.',
        },
        {
          title: 'Executive Department',
          url: '/government/departments/executive',
          description:
            'Office of the Municipal Mayor, Municipal Administrator, and executive department frontline offices.',
        },
        {
          title: 'Legislative Department',
          url: '/government/departments/legislative',
          description:
            'Office of the Vice Mayor and Sangguniang Bayan council members, session schedules, and committee mandates.',
        },
        {
          title: 'Municipal Departments Directory',
          url: '/government/departments',
          description:
            'Complete office listings, department heads, office locations, and direct contact numbers.',
        },
        {
          title: 'Ordinances & Resolutions',
          url: '/government/ordinances-and-resolutions',
          description:
            'Codified municipal ordinances, Sangguniang Bayan resolutions, and public regulatory policies.',
        },
        {
          title: 'Transparency & Citizen’s Charter',
          url: '/government/transparency-documents',
          description:
            'Full Disclosure Policy portal, Citizen’s Charter 2025, Procurement Monitoring Reports, and LGSF-FALGU data.',
        },
      ],
    },
    {
      id: 'resources',
      title: 'Civic, Emergency & National Resources',
      icon: <PhoneCall className="w-5 h-5 text-primary-700" />,
      description:
        '24/7 emergency hotlines, Philippine public holidays, and verified national government open-data portals.',
      links: [
        {
          title: 'Philippines & Local Hotlines',
          url: '/philippines/hotlines',
          description:
            'Immediate emergency numbers: National Emergency 911, Morong MDRRMO, PNP, BFP, and crisis helplines.',
          badge: 'Emergency 24/7',
        },
        {
          title: 'Philippine Public Holidays',
          url: '/philippines/holidays',
          description:
            'Official calendar of regular holidays, special non-working days, and local municipal observances.',
        },
        {
          title: 'BetterGov Philippines',
          url: 'https://bettergov.ph',
          description:
            'National open-source civic technology platform powering citizen-first municipal portals.',
          isExternal: true,
        },
        {
          title: 'Philippine Open Data (data.gov.ph)',
          url: 'https://data.gov.ph',
          description:
            'The open data portal of the Republic of the Philippines for public sector transparency.',
          isExternal: true,
        },
        {
          title: 'Freedom of Information (foi.gov.ph)',
          url: 'https://www.foi.gov.ph',
          description:
            'Executive Order No. 2 portal facilitating citizen access to official public records and requests.',
          isExternal: true,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Sitemap"
        description="Comprehensive sitemap and civic directory of the Municipality of Morong, Rizal. Discover all public services, government offices, ordinances, and civic resources."
        keywords="sitemap, morong rizal, government directory, municipal services, public records, civic portal"
        url="/sitemap"
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-xs text-gray-500 font-medium">
            <Link to="/" className="hover:text-primary-700 transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">Sitemap</span>
          </nav>
        </div>
      </div>

      {/* Hero / Header Section */}
      <div className="bg-white border-b border-gray-200 py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 border border-primary-200/60 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                <span>Civic Portal Directory</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight">
                Sitemap
              </h1>
              <p className="mt-2 text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
                A complete guide to all municipal services, local government
                departments, public transparency records, and civic resources in
                Morong, Rizal.
              </p>
            </div>

            {/* Raw XML Sitemap Link */}
            <div className="shrink-0">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-primary-50 text-slate-700 hover:text-primary-700 border border-slate-300 hover:border-primary-300 transition-all shadow-xs"
                title="View raw XML sitemap for search engines and crawlers"
              >
                <FileCode className="w-4 h-4 text-slate-500 hover:text-primary-600" />
                <span>Raw XML Sitemap</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Quick-Jump Section Pills */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-600">
            <span className="font-semibold text-gray-700 mr-1">Jump to:</span>
            {sections.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 border border-transparent transition-colors"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-12">
        {sections.map(section => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-6 bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs"
          >
            {/* Section Header */}
            <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary-50 text-primary-700 border border-primary-100">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-950">
                    {section.title}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600 mt-0.5">
                    {section.description}
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                {section.links.length} pages
              </span>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.links.map(link => {
                const CardContent = (
                  <>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-sm md:text-base text-gray-900 group-hover:text-primary-700 transition-colors">
                          {link.title}
                        </h3>
                        {link.badge && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <div className="shrink-0 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                        {link.isExternal ? (
                          <ExternalLink className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed grow">
                      {link.description}
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-gray-100/80 flex items-center justify-between text-[11px] font-mono text-gray-400 group-hover:text-primary-600 transition-colors">
                      <span className="truncate">{link.url}</span>
                    </div>
                  </>
                );

                const cardClass =
                  'group flex flex-col justify-between p-4 bg-slate-50/60 hover:bg-primary-50/40 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-xs transition-all duration-150';

                return link.isExternal ? (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {CardContent}
                  </a>
                ) : (
                  <Link key={link.url} to={link.url} className={cardClass}>
                    {CardContent}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* Bottom Civic Call-to-Action Card */}
        <div className="bg-primary-900 rounded-2xl p-8 md:p-10 text-white relative overflow-hidden shadow-lg border border-primary-800">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary-800/80 text-yellow-300 border border-yellow-300/20 mb-4">
              <Phone className="w-3.5 h-3.5" />
              <span>24/7 Frontline Citizen Support</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Looking for Immediate Emergency Assistance?
            </h3>
            <p className="mt-2 text-sm md:text-base text-primary-100 leading-relaxed">
              If you require urgent medical, police, fire, or disaster response
              in Morong, access our direct municipal dispatch directory or dial
              National Emergency 911 immediately.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/philippines/hotlines"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm bg-yellow-400 text-gray-950 hover:bg-yellow-300 transition-colors shadow-xs"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Emergency Hotlines Directory</span>
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
