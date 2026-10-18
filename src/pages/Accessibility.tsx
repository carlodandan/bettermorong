import { Link } from 'react-router';
import SEO from '../components/SEO';
import {
  CheckCircle2,
  Keyboard,
  Eye,
  Type,
  Palette,
  Smartphone,
  Clock,
  AlertTriangle,
  Mail,
  Phone,
  Heart,
  Sparkles,
  ShieldCheck,
  MapPin,
  ExternalLink,
  Focus,
  BookOpen,
} from 'lucide-react';

export default function Accessibility() {
  const features = [
    {
      icon: <Keyboard className="w-5 h-5 text-primary-700" />,
      title: 'Full Keyboard Navigation',
      description:
        'All interactive navigation, search dialogs, dropdowns, buttons, and links are fully operable without a mouse using standard Tab, Shift+Tab, Enter, and Escape keys.',
    },
    {
      icon: <Eye className="w-5 h-5 text-primary-700" />,
      title: 'Screen Reader Support',
      description:
        'Structured with semantic HTML5 elements, descriptive ARIA landmarks, and tested for compatibility with NVDA, JAWS, VoiceOver, and TalkBack assistive software.',
    },
    {
      icon: <Type className="w-5 h-5 text-primary-700" />,
      title: 'Descriptive Text Alternatives',
      description:
        'All informative imagery, town emblems, and civic graphics feature clear alt text. Decorative icons are explicitly hidden from screen readers via aria-hidden attributes.',
    },
    {
      icon: <Palette className="w-5 h-5 text-primary-700" />,
      title: 'WCAG AAA/AA Color Contrast',
      description:
        'All body typography, interactive labels, and icons maintain strict color contrast ratios exceeding 4.5:1 against their backgrounds for readability under various lighting conditions.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-primary-700" />,
      title: 'Responsive Layout & Zoom',
      description:
        'Fluid layout adapts cleanly across smartphones, tablets, and large screens. Content supports browser magnification up to 200% without horizontal scrolling or layout breakage.',
    },
    {
      icon: <Clock className="w-5 h-5 text-primary-700" />,
      title: 'No Time Limits',
      description:
        'No arbitrary countdown timers or auto-advancing carousels are enforced. Citizens have unlimited time to read guidelines, browse requirements, and process information at their own pace.',
    },
    {
      icon: <Focus className="w-5 h-5 text-primary-700" />,
      title: 'Clear Focus Indicators',
      description:
        'Interactive elements receive prominent, high-contrast visual focus rings during keyboard navigation to clearly communicate the active point of focus at all times.',
    },
    {
      icon: <BookOpen className="w-5 h-5 text-primary-700" />,
      title: 'Plain-Language Civic Content',
      description:
        'Government service procedures, fee schedules, and municipal office mandates are summarized in straightforward language with clear headings and numbered actionable steps.',
    },
  ];

  const techSpecs = [
    'HTML5 Semantic Markup',
    'WAI-ARIA 1.2 Attributes',
    'CSS3 & Tailwind CSS',
    'WCAG 2.1 Level AA Guidelines',
    'React 19 & TypeScript',
    'Progressive Web App (PWA)',
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Accessibility Statement"
        description="Accessibility statement for BetterMorong. Learn about our commitment to WCAG 2.1 Level AA digital accessibility standards for all citizens of Morong, Rizal."
        keywords="accessibility statement, WCAG 2.1 AA, digital accessibility, inclusive design, Morong Rizal accessibility, screen reader, assistive technology"
        url="/accessibility"
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-xs text-gray-500 font-medium">
            <Link to="/" className="hover:text-primary-700 transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-semibold">Accessibility</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Inclusive Civic Portal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight">
            Accessibility Statement
          </h1>
          <p className="mt-2 text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
            Our steadfast commitment to ensuring digital accessibility,
            inclusive civic access, and barrier-free municipal services for all
            citizens of Morong, Rizal.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-10">
        {/* Conformance Status Card */}
        <div className="bg-white rounded-2xl border border-emerald-200/80 p-6 md:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-gradient-to-r from-emerald-50/50 via-white to-white">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700 shrink-0 mt-0.5 sm:mt-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-lg md:text-xl font-bold text-gray-950">
                  WCAG 2.1 Level AA
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Conformant
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed max-w-xl">
                The BetterMorong civic portal adheres to the Web Content
                Accessibility Guidelines (WCAG) 2.1 at Level AA, ensuring the
                site is perceivable, operable, understandable, and robust for
                users of all abilities.
              </p>
            </div>
          </div>
          <a
            href="https://www.w3.org/WAI/standards-guidelines/wcag/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-white text-gray-700 hover:text-primary-700 border border-gray-300 hover:border-primary-300 shadow-2xs transition-colors shrink-0"
          >
            <span>Learn About WCAG</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Our Commitment */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="p-2.5 rounded-xl bg-primary-50 text-primary-700 border border-primary-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-950">
                Our Commitment
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-0.5">
                Digital public services accessible to every resident of Morong
              </p>
            </div>
          </div>
          <div className="prose prose-slate max-w-none text-gray-700 text-sm md:text-base leading-relaxed space-y-4">
            <p>
              BetterMorong is committed to ensuring digital accessibility for
              people with disabilities, seniors, and users accessing civic
              information under diverse technological conditions. We are
              continually improving the user experience for everyone and
              applying relevant international accessibility standards to all
              municipal service documentation, local government offices, and
              transparency portals.
            </p>
            <p>
              We firmly believe that access to municipal services, emergency
              hotlines, and government transparency is a fundamental civic
              right. Every design decision—from typography and color contrast to
              keyboard navigation and screen reader tagging—is made to ensure no
              citizen is left behind.
            </p>
          </div>
        </section>

        {/* Accessibility Features Grid */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs">
          <div className="mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold text-gray-950">
              Accessibility Features
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-0.5">
              Built-in features designed to support assistive technologies and
              inclusive interaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-gray-200/90 bg-slate-50/50 hover:bg-primary-50/30 hover:border-primary-300 transition-all duration-150 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="p-2 rounded-lg bg-white border border-gray-200 text-primary-700 shadow-2xs">
                      {feature.icon}
                    </div>
                    <h3 className="text-base font-semibold text-gray-950">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Known Limitations & Ongoing Remediation */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-950">
                Known Limitations
              </h2>
              <p className="text-xs md:text-sm text-gray-600 mt-0.5">
                Areas where we are actively working with partner departments to
                improve compliance
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            While we strive to ensure that all content on BetterMorong is fully
            accessible, certain legacy files and third-party integrations may
            have limitations:
          </p>

          <ul className="space-y-3">
            <li className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs md:text-sm text-gray-800">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Legacy PDF Documents:</strong> Some historical
                resolutions, scanned municipal budget reports, or archived
                procurement disclosures provided by external agencies may not
                yet possess complete machine-readable text or full screen reader
                tagging.
              </span>
            </li>
            <li className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs md:text-sm text-gray-800">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Third-Party Embedded Content:</strong> Certain external
                services (such as live weather forecast feeds or third-party
                interactive maps) may contain interface elements whose
                accessibility is maintained by their respective third-party
                providers.
              </span>
            </li>
          </ul>
        </section>

        {/* Alternative Access & Contact Channels */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs">
          <div className="mb-4 pb-4 border-b border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold text-gray-950">
              Alternative Access & Feedback
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-0.5">
              Encountering a barrier? We are ready to provide any information in
              an accessible format
            </p>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            If you encounter any difficulty accessing information on this site,
            or if you need assistance obtaining municipal documents in an
            alternative format (such as plain text, large print, or verbal
            guidance), our civic team is here to assist you:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-gray-200 bg-slate-50/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary-700 mb-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Email Support
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  Send accessibility concerns, bug reports, or requests for
                  accessible formats.
                </p>
              </div>
              <a
                href="mailto:accessibility@bettermorong.ph"
                className="text-xs font-semibold text-primary-700 hover:text-primary-800 hover:underline break-all"
              >
                accessibility@bettermorong.ph
              </a>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-slate-50/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary-700 mb-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    Telephone Assistance
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  Contact the Morong Municipal Hall trunkline during regular
                  office hours.
                </p>
              </div>
              <a
                href="tel:0286531234"
                className="text-xs font-semibold text-primary-700 hover:text-primary-800 hover:underline"
              >
                (02) 8653-1234
              </a>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-slate-50/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    In-Person Assistance
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  Visit the Municipal Social Welfare & Development Office
                  (MSWDO), Ground Floor.
                </p>
              </div>
              <span className="text-xs font-semibold text-gray-700">
                Morong Municipal Hall, Rizal
              </span>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs">
          <div className="mb-4 pb-4 border-b border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold text-gray-950">
              Technical Specifications
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-0.5">
              Technologies and standards leveraged to ensure cross-platform
              assistive technology support
            </p>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            The accessibility of the BetterMorong portal relies on the following
            web technologies to work with user web browsers and assistive tools:
          </p>

          <div className="flex flex-wrap gap-2">
            {techSpecs.map(tech => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Our Civic Promise */}
        <div className="bg-primary-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-md border border-primary-800 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary-800 text-yellow-300 shrink-0 mt-1">
            <Heart className="w-6 h-6 fill-yellow-300 text-yellow-300" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Our Civic Promise
            </h3>
            <p className="mt-2 text-sm text-primary-100 leading-relaxed">
              BetterMorong is committed to ensuring that municipal digital
              services are accessible to all citizens of Morong, Rizal,
              regardless of ability, age, hardware, or connection speed. We view
              accessibility not merely as a technical compliance checklist, but
              as a fundamental civic right and public duty.
            </p>
          </div>
        </div>

        {/* Page Footer Metadata */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <span>Last updated: October 2026</span>
          <div className="flex items-center gap-4">
            <Link
              to="/sitemap"
              className="hover:text-primary-700 transition-colors"
            >
              View Sitemap
            </Link>
            <span>·</span>
            <Link
              to="/philippines/hotlines"
              className="hover:text-primary-700 transition-colors"
            >
              Emergency Hotlines
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
