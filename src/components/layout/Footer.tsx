import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Globe,
  Github,
  Mail,
} from 'lucide-react';
import { footerNavigation } from '../../data/navigation';
import { Link } from 'react-router';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const appVersion = import.meta.env.VITE_WEB_VERSION;
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;

  const getSocialIcon = (label: string) => {
    switch (label) {
      case 'Facebook':
        return <Facebook className="h-4 w-4" />;
      case 'Twitter':
        return <Twitter className="h-4 w-4" />;
      case 'Instagram':
        return <Instagram className="h-4 w-4" />;
      case 'YouTube':
        return <Youtube className="h-4 w-4" />;
      case 'Official Website':
      case 'Website':
        return <Globe className="h-4 w-4" />;
      case 'GitHub':
        return <Github className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-48 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
          {/* Brand & Municipal Overview Column */}
          <div className="lg:col-span-4 pr-0 lg:pr-8 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-4 text-center sm:text-left">
              <img
                src="/Morong-Logo.svg"
                alt="Bayan ng Morong Logo"
                className="h-12 w-12 object-contain shrink-0 bg-white/10 rounded-full p-1 border border-white/10 shadow-sm"
              />
              <div>
                <div className="font-bold text-lg text-white tracking-tight">
                  BetterMorong
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  Municipality of Morong, Province of Rizal
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-3 max-w-md md:max-w-none">
              An open-source, community-driven civic platform providing
              Morongueños, businesses, and visitors with accessible public
              service guides, municipal directory, and transparent fiscal
              governance.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-blue-200 mb-4 border border-white/10">
              Cost to the People of Morong:{' '}
              <span className="font-bold text-green-400">₱0.00</span>
            </div>

            {/* Social & Repository Links */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              {footerNavigation.socialLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                  aria-label={link.label}
                  className="flex items-center justify-center h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all text-xs"
                >
                  {getSocialIcon(link.label)}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns (About Morong, Services, Resources) — Evenly spaced 3-column subgrid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10">
            {footerNavigation.mainSections.map(section => (
              <div key={section.title} className="text-center md:text-left">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2.5 flex flex-col items-center md:items-start">
                  {section.links.map(link => {
                    const isExternal = link.href.startsWith('http');
                    return (
                      <li key={link.label} className="w-full">
                        {isExternal ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center md:justify-start text-slate-400 hover:text-white text-sm py-0.5 transition-colors"
                          >
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              {link.label}
                            </span>
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className="group flex items-center justify-center md:justify-start text-slate-400 hover:text-white text-sm py-0.5 transition-colors"
                          >
                            <span className="group-hover:translate-x-0.5 transition-transform">
                              {link.label}
                            </span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-footer / Legal & Utilities */}
        <div className="border-t border-slate-800/80 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 text-center md:text-left">
            <div className="space-y-1.5">
              <p className="text-slate-400 font-medium">
                © {currentYear} BetterMorong
                {appVersion && (
                  <span className="text-slate-500 font-mono text-[11px] ml-1.5">
                    v{appVersion}
                  </span>
                )}{' '}
                - All content is public domain unless otherwise specified.
              </p>
              <p className="text-slate-500 text-xs">
                Official public records and government disclosures are sourced
                from respective Republic of the Philippines open portals.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 shrink-0">
              <a
                href="https://github.com/carlodandan/bettermorong"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Contribute at GitHub</span>
              </a>
              {contactEmail && (
                <a
                  href={`mailto:${contactEmail}?subject=BetterMorong%20Partnership%20/%20Contribution`}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                  title="Contact for partnership or contribution"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Partner with Us</span>
                </a>
              )}
              <Link
                to="/sitemap"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Sitemap
              </Link>
              <Link
                to="/accessibility"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Accessibility
              </Link>
              <Link
                to="/philippines-hotlines"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Emergency Hotlines
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
