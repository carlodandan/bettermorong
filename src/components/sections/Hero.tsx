import React, {
  useState,
  useDeferredValue,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import { useNavigate, Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import {
  searchBetterMorong,
  popularSearchTags,
  type SearchItem,
} from '../../lib/searchIndex';

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const deferredQuery = useDeferredValue(query);

  const suggestions: SearchItem[] = useMemo(() => {
    if (!deferredQuery.trim()) return [];
    return searchBetterMorong(deferredQuery).slice(0, 5);
  }, [deferredQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="relative z-20 bg-primary-950 text-white py-12 md:py-20 lg:py-24">
      {/* Background illustration: Historic Morong Saint Jerome Parish Church */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <img
          src="/morong-simbahan.svg"
          alt=""
          className="absolute right-0 bottom-0 h-full w-full object-cover object-right md:object-right-bottom opacity-75"
        />

        {/* Left-to-right fade overlay: Solid on the left for maximum text contrast, fading out to reveal church silhouette on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-950 via-primary-950/90 via-45% to-primary-950/25" />

        {/* Subtle top/bottom edge blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-transparent to-primary-950/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main content column */}
          <div className="lg:col-span-8 animate-fade-in max-w-2xl">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase bg-primary-900/90 text-primary-200 rounded-full border border-primary-700/60 shadow-2xs">
              Municipality of Morong, Rizal
            </span>
            <Heading className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
              BetterMorong
            </Heading>
            <Text className="text-primary-100 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-6">
              {t('hero.subtitle')}
            </Text>

            {/* Quick Search Box */}
            <div ref={containerRef} className="relative z-30 max-w-xl">
              <form
                onSubmit={handleSubmit}
                className="relative flex items-center"
              >
                <SearchIcon
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={e => {
                    setQuery(e.target.value);
                    setIsOpen(true);
                  }}
                  onFocus={() => setIsOpen(true)}
                  onKeyDown={e => {
                    if (e.key === 'Escape') setIsOpen(false);
                  }}
                  placeholder={
                    t('hero.searchPlaceholder') ||
                    'Search permits, health centers, civil registry, ordinances...'
                  }
                  className="w-full pl-11 pr-24 py-3.5 bg-white text-gray-900 rounded-lg shadow-sm border border-transparent focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-normal placeholder-gray-500"
                  aria-label="Search Morong municipal services and information"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-xs"
                >
                  {t('hero.searchButton') || 'Search'}
                </button>
              </form>

              {/* Instant Suggestions Dropdown */}
              {isOpen && query.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden divide-y divide-gray-100 max-h-[360px] overflow-y-auto">
                  {suggestions.length > 0 ? (
                    suggestions.map(item => (
                      <Link
                        key={item.id}
                        to={item.url}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between px-4 py-3 hover:bg-primary-50 transition-colors text-left group"
                      >
                        <div className="space-y-0.5 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-2xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-gray-900 group-hover:text-primary-700">
                            {item.title}
                          </p>
                        </div>
                        <ArrowRight
                          className="h-4 w-4 text-gray-400 group-hover:text-primary-600 shrink-0"
                          aria-hidden="true"
                        />
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-sm text-gray-700 font-medium">
                        No instant match for &ldquo;{query}&rdquo;
                      </p>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="mt-2 text-xs text-primary-600 hover:text-primary-700 font-medium underline cursor-pointer"
                      >
                        Search across all records &rarr;
                      </button>
                    </div>
                  )}

                  <div className="bg-slate-50 px-4 py-2.5 flex items-center justify-between text-xs text-gray-500">
                    <span>Press Enter to view all results</span>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="text-primary-700 hover:text-primary-800 font-medium cursor-pointer"
                    >
                      Full Search &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Popular Tasks / Quick Service Tags */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-primary-200 font-medium">
                {t('hero.quickLinks') || 'Quick links:'}
              </span>
              {popularSearchTags.slice(0, 5).map(tag => (
                <Link
                  key={tag.label}
                  to={tag.url}
                  className="bg-primary-900/80 hover:bg-primary-800 text-primary-100 hover:text-white px-2.5 py-1 rounded-md border border-primary-800/80 transition-colors cursor-pointer"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
