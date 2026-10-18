import React, { useState, useMemo } from 'react';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '../components/SEO';
import {
  ALL_HOTLINES,
  HOTLINE_CATEGORIES,
  type HotlineItem,
} from '../data/hotlinesData';
import {
  PhoneCall,
  Search,
  Copy,
  Check,
  ShieldAlert,
  AlertTriangle,
  Building2,
  Clock,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

const Hotlines: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const handleCopy = (num: string) => {
    // Strip non-digit characters for clean calling or copy pure string
    const cleaned = num.replace(/\s+/g, ' ');
    navigator.clipboard.writeText(cleaned);
    setCopiedNumber(num);
    setTimeout(() => {
      setCopiedNumber(null);
    }, 2000);
  };

  const filteredHotlines = useMemo(() => {
    return ALL_HOTLINES.filter(item => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);
      const matchAgency = item.agency?.toLowerCase().includes(query) ?? false;
      const matchNumbers = item.numbers.some(num =>
        num.toLowerCase().includes(query)
      );

      return matchName || matchDesc || matchAgency || matchNumbers;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <SEO
        title="Philippines & Morong Emergency Hotlines"
        description="Comprehensive directory of official 24/7 emergency hotlines, disaster rescue, police, fire, health crisis, and public utility contacts for Morong, Rizal and the Philippines."
        keywords="Philippines hotlines, Morong emergency numbers, 911 Philippines, MDRRMO hotline, 8888 complaint, PNP hotline, Red Cross 143"
      />

      <div className="bg-white py-8 md:py-12 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <Breadcrumbs className="mb-6" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold mb-3 border border-red-200">
                <ShieldAlert
                  className="h-4 w-4 text-red-600"
                  aria-hidden="true"
                />
                Official Civic Emergency Directory
              </div>
              <Heading
                level={1}
                className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-950 mb-2"
              >
                Philippines & Morong Hotlines
              </Heading>
              <Text className="text-gray-600 text-base md:text-lg max-w-2xl mb-0">
                Direct access to nationwide 24/7 emergency dispatch, disaster
                rescue, police, medical services, utilities, and local Morong
                frontline desks.
              </Text>
            </div>

            {/* Quick 911 & MDRRMO Badge */}
            <div className="bg-red-50/60 border border-red-200 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 min-w-[280px]">
              <div className="text-xs uppercase tracking-wider text-red-800 font-bold flex items-center justify-between">
                <span>Immediate Danger?</span>
                <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="tel:911"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors"
                >
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                  Call 911
                </a>
                <a
                  href="tel:09171350541"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white text-gray-900 hover:bg-gray-50 border border-gray-300 font-bold py-2.5 px-3 rounded-xl transition-colors text-xs text-center shadow-2xs"
                >
                  <PhoneCall
                    className="h-3.5 w-3.5 text-primary-700"
                    aria-hidden="true"
                  />
                  Morong Rescue
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section className="py-8 md:py-12 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Search & Filter Controls */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 mb-8 shadow-xs">
            <div className="relative mb-5">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search hotlines by agency, service, or number (e.g. 911, MDRRMO, Police, Meralco, Water, Mental Health)..."
                className="w-full pl-11 pr-10 py-3 text-sm md:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {HOTLINE_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-primary-700 text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count Summary */}
          <div className="flex items-center justify-between mb-6 px-1">
            <p className="text-sm font-medium text-gray-600">
              Showing{' '}
              <span className="font-bold text-gray-900">
                {filteredHotlines.length}
              </span>{' '}
              {filteredHotlines.length === 1 ? 'hotline' : 'hotlines'}
              {searchQuery && (
                <span>
                  {' '}
                  matching &ldquo;
                  <span className="font-semibold text-primary-700">
                    {searchQuery}
                  </span>
                  &rdquo;
                </span>
              )}
            </p>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-xs font-semibold text-primary-700 hover:underline"
              >
                Reset Filter
              </button>
            )}
          </div>

          {/* Hotlines Grid */}
          {filteredHotlines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredHotlines.map((hotline: HotlineItem) => {
                const isLocal = hotline.category === 'local-morong';
                const isCritical = hotline.category === 'critical';

                return (
                  <div
                    key={hotline.id}
                    className={`bg-white border rounded-2xl p-5 md:p-6 flex flex-col justify-between transition-all hover:shadow-sm ${
                      isLocal
                        ? 'border-primary-200 bg-gradient-to-br from-white to-primary-50/30'
                        : isCritical
                          ? 'border-red-200'
                          : 'border-gray-200'
                    }`}
                  >
                    <div>
                      {/* Category Badge & Availability */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                            isLocal
                              ? 'bg-primary-100 text-primary-800'
                              : isCritical
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {hotline.categoryLabel}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-500">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {hotline.availability}
                        </span>
                      </div>

                      {/* Hotline Title & Agency */}
                      <h3 className="text-base md:text-lg font-bold text-gray-950 leading-snug">
                        {hotline.name}
                      </h3>
                      {hotline.agency && (
                        <p className="text-xs text-gray-500 font-medium mt-0.5 flex items-center gap-1">
                          <Building2
                            className="h-3 w-3 shrink-0"
                            aria-hidden="true"
                          />
                          {hotline.agency}
                        </p>
                      )}

                      {/* Description */}
                      <p className="text-gray-600 text-xs md:text-sm mt-3 leading-relaxed">
                        {hotline.description}
                      </p>
                    </div>

                    {/* Phone Numbers List & Action Buttons */}
                    <div className="mt-5 pt-4 border-t border-gray-100 space-y-2">
                      {hotline.numbers.map(num => {
                        const cleanTel = num.replace(/[^\d+]/g, '');
                        const isCopied = copiedNumber === num;

                        return (
                          <div
                            key={num}
                            className="flex items-center justify-between gap-2 bg-gray-50 hover:bg-gray-100/80 p-2.5 rounded-xl border border-gray-200/80 transition-colors"
                          >
                            <a
                              href={`tel:${cleanTel}`}
                              className="flex items-center gap-2 font-mono font-bold text-sm md:text-base text-primary-700 hover:text-primary-800 transition-colors"
                              title={`Call ${num}`}
                            >
                              <PhoneCall
                                className="h-4 w-4 shrink-0 text-primary-600"
                                aria-hidden="true"
                              />
                              <span>{num}</span>
                            </a>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleCopy(num)}
                                className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors cursor-pointer"
                                aria-label={`Copy ${num}`}
                              >
                                {isCopied ? (
                                  <>
                                    <Check
                                      className="h-3.5 w-3.5 text-green-600"
                                      aria-hidden="true"
                                    />
                                    <span className="text-green-700">
                                      Copied
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <Copy
                                      className="h-3.5 w-3.5 text-gray-500"
                                      aria-hidden="true"
                                    />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>

                              <a
                                href={`tel:${cleanTel}`}
                                className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md bg-primary-600 hover:bg-primary-700 text-white transition-colors"
                              >
                                Call
                              </a>
                            </div>
                          </div>
                        );
                      })}

                      {/* Extra Badges & Links */}
                      <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                        <div className="flex items-center gap-2">
                          {hotline.tollFree && (
                            <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                              Toll-Free
                            </span>
                          )}
                          {hotline.smsAvailable && (
                            <span className="text-blue-700 font-semibold flex items-center gap-0.5">
                              <MessageSquare
                                className="h-3 w-3"
                                aria-hidden="true"
                              />
                              SMS / Text Available
                            </span>
                          )}
                        </div>
                        {hotline.website && (
                          <a
                            href={hotline.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-0.5 text-primary-700 hover:underline font-medium"
                          >
                            <span>Website</span>
                            <ExternalLink
                              className="h-3 w-3"
                              aria-hidden="true"
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
              <AlertTriangle
                className="h-10 w-10 text-amber-500 mx-auto mb-3"
                aria-hidden="true"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                No Hotlines Found
              </h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto mb-5">
                No matching hotlines were found for &ldquo;{searchQuery}&rdquo;.
                Try another agency name, number, or clear your search filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* Civic Guidelines Box */}
          <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
            <h4 className="text-base font-bold text-gray-900 mb-2">
              Emergency Calling Guidelines
            </h4>
            <ul className="text-xs md:text-sm text-gray-600 space-y-2 list-disc list-inside">
              <li>
                <strong>State Your Exact Location First:</strong> Always tell
                the emergency operator your barangay, sitio, landmark, and
                street name immediately so responders can be dispatched even if
                the call drops.
              </li>
              <li>
                <strong>Keep Lines Clear:</strong> Emergency dispatch hotlines
                like 911, 117, and MDRRMO must remain available for
                life-threatening situations. For general non-emergency municipal
                inquiries, contact the respective department during standard
                operating hours (8:00 AM – 5:00 PM).
              </li>
              <li>
                <strong>Power Outages & Fallen Lines:</strong> To report
                hazardous electric lines in Morong, call Meralco directly at{' '}
                <strong>16211</strong> or notify the Morong Fire Station at{' '}
                <strong>0908-441-7754</strong>.
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Hotlines;
