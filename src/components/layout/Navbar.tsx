import React, { useState } from 'react';
import {
  X,
  Menu,
  ChevronDown,
  Globe,
  Search,
  Clock,
  PhoneCall,
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
} from 'lucide-react';
import { mainNavigation } from '../../data/navigation';
import type { LanguageType } from '../../types/index';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n/languages';
import { usePhilippineTime } from '../../hooks/usePhilippineTime';
import { useMorongWeather } from '../../hooks/useMorongWeather';

function getWeatherIcon(code: number, className = 'h-3.5 w-3.5') {
  switch (code) {
    case 0:
      return (
        <Sun className={`${className} text-amber-500`} aria-hidden="true" />
      );
    case 1:
    case 2:
      return (
        <CloudSun
          className={`${className} text-amber-500`}
          aria-hidden="true"
        />
      );
    case 3:
      return (
        <Cloud className={`${className} text-slate-500`} aria-hidden="true" />
      );
    case 45:
    case 48:
      return (
        <CloudFog
          className={`${className} text-slate-400`}
          aria-hidden="true"
        />
      );
    case 51:
    case 53:
    case 55:
      return (
        <CloudDrizzle
          className={`${className} text-blue-400`}
          aria-hidden="true"
        />
      );
    case 61:
    case 63:
    case 65:
    case 80:
    case 81:
    case 82:
      return (
        <CloudRain
          className={`${className} text-blue-500`}
          aria-hidden="true"
        />
      );
    case 95:
    case 96:
    case 99:
      return (
        <CloudLightning
          className={`${className} text-purple-600`}
          aria-hidden="true"
        />
      );
    default:
      return (
        <CloudSun
          className={`${className} text-amber-500`}
          aria-hidden="true"
        />
      );
  }
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { t, i18n } = useTranslation('common');
  const currentLanguage: LanguageType = i18n.language?.startsWith('fil')
    ? 'fil'
    : 'en';
  const pst = usePhilippineTime();
  const { data: weather } = useMorongWeather();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveMenu(null);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  const toggleSubmenu = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  const changeLanguage = (newLanguage: LanguageType) => {
    i18n.changeLanguage(newLanguage);
  };

  return (
    <nav className="bg-white shadow-xs sticky top-0 z-50">
      {/* Top bar with Philippine Standard Time, Live Weather, and Links */}
      <div className="bg-slate-50 border-b border-gray-200">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:justify-between items-center py-1 sm:h-9 gap-1 sm:gap-4 text-xs">
          {/* Left: Dynamic Philippine Standard Time & Morong Weather */}
          <div className="flex items-center space-x-3 text-gray-600 overflow-x-auto w-full sm:w-auto py-0.5">
            <div className="flex items-center gap-1.5 font-medium text-gray-700 whitespace-nowrap">
              <Clock
                className="h-3.5 w-3.5 text-primary-600 shrink-0"
                aria-hidden="true"
              />
              <span className="font-semibold text-primary-800">PHT:</span>
              <span className="font-mono text-gray-900">
                {pst.fullFormatted}
              </span>
            </div>
            <span className="text-gray-300 hidden md:inline">|</span>
            <div className="hidden md:flex items-center gap-1 text-gray-700 whitespace-nowrap">
              {getWeatherIcon(
                weather.current.weatherCode,
                'h-3.5 w-3.5 shrink-0'
              )}
              <span className="font-semibold text-gray-800">Morong:</span>
              <span className="font-bold text-gray-950">
                {weather.current.temperature}°C
              </span>
              <span className="text-gray-500">
                ({weather.current.condition})
              </span>
            </div>
          </div>

          {/* Right: Action links */}
          <div className="flex items-center space-x-3 text-xs w-full sm:w-auto justify-end">
            <a
              href="https://www.gov.ph"
              className="text-gray-700 hover:text-primary-600 transition-colors hidden sm:inline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Official Gov.ph
            </a>
            <a
              href="https://bettergov.ph"
              className="text-gray-700 hover:text-primary-600 transition-colors hidden sm:inline"
              target="_blank"
              rel="noopener noreferrer"
            >
              BetterGov.ph
            </a>
            <div className="hidden md:block">
              <select
                value={currentLanguage}
                onChange={e => changeLanguage(e.target.value as LanguageType)}
                className="text-xs border border-gray-300 rounded px-1.5 py-0.5 bg-white text-gray-700 hover:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
              >
                {Object.entries(LANGUAGES).map(([code, lang]) => (
                  <option key={code} value={code}>
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img
                src="/morong-logo-nobg.svg"
                alt="BetterMorong Logo"
                className="h-12 w-12 mr-3 object-contain shrink-0 group-hover:scale-105 transition-transform"
              />
              <div>
                <div className="text-gray-950 font-bold text-lg leading-tight group-hover:text-primary-600 transition-colors">
                  {import.meta.env.VITE_GOVERNMENT_NAME || 'BetterMorong'}
                </div>
                <div className="text-xs text-gray-600">
                  {t('site_description')}
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8 pr-24">
            {mainNavigation.map(item => (
              <div key={item.label} className="relative group">
                <a
                  href={item.href}
                  className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  {t(`navbar.${item.label.replace(' ', '').toLowerCase()}`)}
                  {item.children && (
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-800 group-hover:text-primary-600 transition-colors" />
                  )}
                </a>
                {item.children && (
                  <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      {item.children.map(child => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                          role="menuitem"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/philippines/hotlines"
              className="flex items-center text-red-700 hover:text-red-800 font-bold transition-colors"
            >
              <PhoneCall
                className="h-4 w-4 mr-1 text-red-600"
                aria-hidden="true"
              />
              {t('navbar.hotlines')}
            </Link>
            <Link
              to="/government/about-morong"
              className="flex items-center text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              {t('navbar.about')}
            </Link>
            <Link
              to="/search"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-700 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Search portal"
            >
              <Search
                className="h-4 w-4 mr-1.5 text-gray-500"
                aria-hidden="true"
              />
              {t('navbar.search')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-2 pt-2 pb-4 space-y-1 border-t border-gray-200 bg-white">
          {mainNavigation.map(item => (
            <div key={item.label}>
              <button
                onClick={() => toggleSubmenu(item.label)}
                className="w-full flex justify-between items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
              >
                {t(`navbar.${item.label.toLowerCase()}`)}
                {item.children && (
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      activeMenu === item.label ? 'transform rotate-180' : ''
                    }`}
                  />
                )}
              </button>
              {item.children && activeMenu === item.label && (
                <div className="pl-6 py-2 space-y-1 bg-gray-50">
                  {item.children.map(child => (
                    <Link
                      key={child.label}
                      to={child.href}
                      onClick={closeMenu}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-500"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            to="/philippines/hotlines"
            onClick={closeMenu}
            className="flex items-center gap-2 px-4 py-2 text-base font-bold text-red-700 hover:bg-red-50"
          >
            <PhoneCall className="h-4 w-4 text-red-600" aria-hidden="true" />
            Emergency Hotlines
          </Link>
          <Link
            to="/join-us"
            onClick={closeMenu}
            className="block px-4 py-2 text-base font-semibold text-primary-700 hover:bg-primary-50"
          >
            Join Us
          </Link>
          <Link
            to="/government/about-morong"
            onClick={closeMenu}
            className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
          >
            {t('navbar.about')}
          </Link>
          <Link
            to="/search"
            onClick={closeMenu}
            className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
          >
            <Search className="h-4 w-4 mr-2 text-gray-500" aria-hidden="true" />
            {t('navbar.search')}
          </Link>
          <Link
            to="/sitemap"
            onClick={closeMenu}
            className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500"
          >
            {t('navbar.sitemap')}
          </Link>
          <div className="px-4 py-3 border-t border-gray-200">
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-gray-800 mr-2" />
              <select
                value={currentLanguage}
                onChange={e => changeLanguage(e.target.value as LanguageType)}
                className="text-sm border border-gray-300 rounded px-2 py-1 bg-white text-gray-700 hover:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600"
              >
                {Object.entries(LANGUAGES).map(([code, lang]) => (
                  <option key={code} value={code}>
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
