import { useState, useDeferredValue, useMemo } from 'react';
import { Link } from 'react-router';
import { useQueryState } from 'nuqs';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';
import {
  searchBetterMorong,
  popularSearchTags,
  type SearchItem,
} from '../lib/searchIndex';
import SEO from '../components/SEO';

type FilterType = 'all' | 'service' | 'government' | 'emergency';

export default function Search() {
  const [query, setQuery] = useQueryState('q', { defaultValue: '' });
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const deferredQuery = useDeferredValue(query);

  const results: SearchItem[] = useMemo(() => {
    if (!deferredQuery.trim()) return [];
    return searchBetterMorong(deferredQuery, activeFilter);
  }, [deferredQuery, activeFilter]);

  const hasQuery = Boolean(query.trim());

  return (
    <>
      <SEO
        title="Search Portal"
        description="Search public services, departments, ordinances, and hotlines in the Municipality of Morong, Rizal on BetterMorong."
        keywords="BetterMorong search, Morong services directory, Morong ordinances, Morong departments"
      />
      <main className="container mx-auto px-4 max-w-4xl min-h-[70vh] py-8 md:py-12">
        {/* Header */}
        <div className="mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-700 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
            Citizen Search
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-950 mt-2">
            Search BetterMorong
          </h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Find municipal services, department directories, enacted ordinances,
            and public assistance in Morong, Rizal.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="relative mb-4">
          <label htmlFor="search-input" className="sr-only">
            Search services, departments, and public guides
          </label>
          <SearchIcon
            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value || null)}
            placeholder="Type a service, office, or topic (e.g. business permit, birth certificate, vaccination)..."
            className="w-full pl-11 pr-10 py-3.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 transition-colors"
            autoFocus
          />
          {hasQuery && (
            <button
              type="button"
              onClick={() => setQuery(null)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Clear search input"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-gray-200 pb-3">
          <span className="text-xs font-medium text-gray-500 mr-1">
            Filter by:
          </span>
          {(
            [
              { id: 'all', label: 'All Results' },
              { id: 'service', label: 'Services' },
              { id: 'government', label: 'Government & Offices' },
              { id: 'emergency', label: 'Emergency Hotlines' },
            ] as const
          ).map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Popular searches suggestions */}
        {!hasQuery && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-3">
              Frequently Accessed Services & Topics
            </h2>
            <div className="flex flex-wrap gap-2">
              {popularSearchTags.map(tag => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => setQuery(tag.query)}
                  className="inline-flex items-center text-xs font-medium bg-white text-primary-700 border border-primary-200 px-3 py-1.5 rounded-full hover:bg-primary-50 hover:border-primary-300 transition-colors cursor-pointer shadow-2xs"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results list */}
        {hasQuery && results.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-base font-semibold text-gray-800">
              No results found for &ldquo;{query}&rdquo;
            </p>
            <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
              Please check your spelling, try fewer keywords, or browse from the
              suggested common services below:
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {popularSearchTags.slice(0, 4).map(tag => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => setQuery(tag.query)}
                  className="text-xs font-medium bg-white text-primary-700 border border-primary-200 px-3 py-1.5 rounded-full hover:bg-primary-50 transition-colors"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {hasQuery && results.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-500 mb-4">
              Showing {results.length} result{results.length !== 1 ? 's' : ''}{' '}
              for &ldquo;{query}&rdquo;
            </p>
            <div className="space-y-3">
              {results.map(item => (
                <Link
                  key={item.id}
                  to={item.url}
                  className="block group bg-white border border-gray-200 rounded-lg p-4 hover:border-primary-400 hover:shadow-xs transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            item.type === 'service'
                              ? 'bg-blue-100 text-blue-800'
                              : item.type === 'emergency'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <h2 className="text-base font-semibold text-gray-950 group-hover:text-primary-700 transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight
                      className="h-4 w-4 text-gray-400 group-hover:text-primary-600 shrink-0 mt-1 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
