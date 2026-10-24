import { Link } from 'react-router';
import {
  Code2,
  PenLine,
  Palette,
  Users,
  ShieldCheck,
  Github,
  MessageSquare,
  ExternalLink,
  Heart,
  BookOpen,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

export default function JoinUs() {
  const { t } = useTranslation();

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: t('joinUs.title', 'Join Us'), href: '/join-us' },
  ];

  const tracks = [
    {
      icon: <Code2 className="w-6 h-6 text-primary-600" />,
      title: t('joinUs.devTitle', 'Software Engineering & PWA'),
      description: t(
        'joinUs.devDesc',
        'Contribute with modern React 19, TypeScript, Vite, Tailwind CSS v4, and offline-first PWA caching for typhoon mode.'
      ),
      skills: [
        'React 19',
        'TypeScript',
        'Tailwind v4',
        'Workbox / PWA',
        'Vite',
      ],
    },
    {
      icon: <PenLine className="w-6 h-6 text-emerald-600" />,
      title: t('joinUs.contentTitle', 'Civic Writing & Translation'),
      description: t(
        'joinUs.contentDesc',
        'Turn complex bureaucratic ordinances and the Citizen’s Charter into plain-language, bilingual step-by-step guides.'
      ),
      skills: [
        'Technical Writing',
        'Filipino Translation',
        'Fact-checking',
        'Citizen’s Charter',
      ],
    },
    {
      icon: <Palette className="w-6 h-6 text-amber-600" />,
      title: t('joinUs.designTitle', 'UI/UX & Web Accessibility'),
      description: t(
        'joinUs.designDesc',
        'Help ensure BetterMorong meets WCAG 2.1 AA/AAA accessibility standards, screen readers, and low-bandwidth mobile devices.'
      ),
      skills: [
        'A11y (WCAG)',
        'Figma / UI Design',
        'Typography',
        'Mobile Usability',
      ],
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      title: t('joinUs.communityTitle', 'Barangay & Community Outreach'),
      description: t(
        'joinUs.communityDesc',
        'Share printed guides with senior citizens, test usability across Morong’s 8 barangays, and collect resident feedback.'
      ),
      skills: [
        'Community Organizing',
        'User Testing',
        'Local Advocacy',
        'Feedback',
      ],
    },
  ];

  const principles = [
    {
      title: t('joinUs.antiEpalTitle', '100% Anti-Epal Governance'),
      description: t(
        'joinUs.antiEpalDesc',
        'We strictly prohibit politician names, faces, or partisan taglines. Public services belong to the people and are delivered by municipal institutions.'
      ),
    },
    {
      title: t(
        'joinUs.privacyTitle',
        'Zero Surveillance & Client-Side Privacy'
      ),
      description: t(
        'joinUs.privacyDesc',
        'No user tracking, ad pixels, or personal data collection. Tools like our Cedula and Amilyar fee calculators run 100% locally in the browser.'
      ),
    },
    {
      title: t('joinUs.offlineTitle', 'Offline-First Resilience'),
      description: t(
        'joinUs.offlineDesc',
        'During typhoons, flooding along Laguna de Bay, or cellular network outages, emergency hotlines and evacuation guides remain accessible offline.'
      ),
    },
    {
      title: t('joinUs.freeTitle', 'Zero Cost to the Taxpayers of Morong'),
      description: t(
        'joinUs.freeDesc',
        'Built entirely with volunteer labor and deployed on free-tier, modern edge infrastructure. Cost to the municipal treasury: ₱0.00.'
      ),
    },
  ];

  return (
    <>
      <SEO
        title="Join the Civic Tech Movement | BetterMorong"
        description="Volunteer your skills in software engineering, technical writing, design, and community outreach to build open-source digital public goods for Morong, Rizal."
        keywords="BetterMorong volunteer, civic tech Philippines, open source government, Morong Rizal community, Morong civic tech"
      />

      <Section className="py-8 md:py-12">
        <Breadcrumbs className="mb-6" items={breadcrumbs} />

        {/* Hero Banner */}
        <div className="bg-linear-to-r from-blue-900 via-primary-800 to-primary-700 text-white rounded-2xl p-6 sm:p-10 shadow-sm relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-emerald-300 mb-4">
              <Cpu className="w-3.5 h-3.5" />
              <span>
                {t(
                  'joinUs.bannerHighlight',
                  'Volunteer-led. Open source. Community-driven.'
                )}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              {t(
                'joinUs.heroTitle',
                'Help Build the Future of Civic Tech in Morong'
              )}
            </h1>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed mb-6">
              {t(
                'joinUs.heroSubtitle',
                'BetterMorong is an independent, open-source civic portal providing citizens with fast, transparent, and politics-free access to municipal services, emergency hotlines, and public documents.'
              )}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/betterlocalgov/bettermorong"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 hover:bg-blue-50 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
              >
                <Github className="w-4 h-4 text-gray-900" />
                <span>{t('joinUs.viewGithub', 'View on GitHub')}</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              </a>

              <a
                href="https://discord.gg/bettergov"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white border border-white/20 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>{t('joinUs.joinDiscord', 'Join Discord Community')}</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
              </a>
            </div>
          </div>
        </div>

        {/* Contribution Tracks */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
              {t('joinUs.tracksBadge', 'Contribution Tracks')}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-950 mt-2">
              {t('joinUs.tracksHeading', 'There’s a Place for Every Skill Set')}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {t(
                'joinUs.tracksSubtitle',
                'You don’t have to be a programmer to contribute. We need researchers, writers, designers, and local community advocates.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tracks.map((track, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary-500 hover:shadow-xs transition flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl w-fit mb-4">
                    {track.icon}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {track.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    {track.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                  {track.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-medium px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Civic Principles */}
        <div className="mb-14 bg-slate-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-5 h-5 text-primary-700 shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-950">
              {t(
                'joinUs.principlesHeading',
                'Our Non-Partisan Civic Principles'
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {principles.map((principle, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">
                    {principle.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources & Getting Started */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-500 transition">
            <BookOpen className="w-5 h-5 text-primary-600 mb-2" />
            <h4 className="text-sm font-bold text-gray-900 mb-1">
              {t('joinUs.contentGuideTitle', 'Content & Markdown Guide')}
            </h4>
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              Learn how to write and format citizen guides with frontmatter
              forms and interactive checklists.
            </p>
            <a
              href="https://github.com/betterlocalgov/bettermorong/blob/main/CONTENT-GUIDE.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary-700 font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>Read CONTENT-GUIDE.md</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-500 transition">
            <Github className="w-5 h-5 text-gray-900 mb-2" />
            <h4 className="text-sm font-bold text-gray-900 mb-1">
              {t('joinUs.goodFirstIssuesTitle', 'Good First Issues')}
            </h4>
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              Looking for an easy place to start? Check our curated list of
              beginner-friendly tasks on GitHub.
            </p>
            <a
              href="https://github.com/betterlocalgov/bettermorong/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary-700 font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>Explore GitHub Issues</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary-500 transition">
            <Heart className="w-5 h-5 text-red-600 mb-2" />
            <h4 className="text-sm font-bold text-gray-900 mb-1">
              {t('joinUs.shareTitle', 'Share with Morongueños')}
            </h4>
            <p className="text-xs text-gray-600 mb-3 leading-relaxed">
              Help your neighbors save hours in line at Municipal Hall by
              sharing BetterMorong on social media.
            </p>
            <Link
              to="/services"
              className="text-xs text-primary-700 font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>Browse All Municipal Services &rarr;</span>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
