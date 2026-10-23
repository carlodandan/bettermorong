import React, { useState, useMemo } from 'react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import TransparencyHeroBanner from '../components/ui/TransparencyHeroBanner';
import SEO from '../components/SEO';
import { getHolidaysForYear } from '../data/holidaysData';
import {
  Calendar,
  Search,
  Clock,
  Info,
  Scale,
  CheckCircle2,
  CalendarDays,
} from 'lucide-react';

const Holidays: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [upcomingOnly, setUpcomingOnly] = useState<boolean>(false);

  const holidays = useMemo(() => {
    return getHolidaysForYear(selectedYear);
  }, [selectedYear]);

  const filteredHolidays = useMemo(() => {
    return holidays.filter(holiday => {
      // Filter by type
      if (filterType !== 'all') {
        if (filterType === 'regular' && holiday.type !== 'regular')
          return false;
        if (filterType === 'special' && holiday.type !== 'special-non-working')
          return false;
        if (filterType === 'local' && holiday.type !== 'local-rizal')
          return false;
      }

      // Filter upcoming only
      if (upcomingOnly && !holiday.isUpcoming) {
        return false;
      }

      // Filter search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = holiday.name.toLowerCase().includes(query);
        const matchDesc = holiday.description.toLowerCase().includes(query);
        const matchDate = holiday.date.toLowerCase().includes(query);
        const matchBasis = holiday.legalBasis.toLowerCase().includes(query);
        const matchDay = holiday.dayOfWeek.toLowerCase().includes(query);
        return matchName || matchDesc || matchDate || matchBasis || matchDay;
      }

      return true;
    });
  }, [holidays, filterType, upcomingOnly, searchQuery]);

  // Next upcoming holiday
  const nextHoliday = useMemo(() => {
    return holidays.find(h => h.isUpcoming);
  }, [holidays]);

  // Counts
  const regularCount = holidays.filter(h => h.type === 'regular').length;
  const specialCount = holidays.filter(
    h => h.type === 'special-non-working'
  ).length;
  const localCount = holidays.filter(h => h.type === 'local-rizal').length;

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title={`Philippines & Morong Official Holidays ${selectedYear}`}
        description={`Complete official calendar of Philippine Regular Holidays, Special Non-Working Days, and Morong/Rizal local holidays for ${selectedYear}. Includes DOLE holiday pay rules and labor standards.`}
        keywords="Philippines holidays, regular holidays, special non-working days, Morong Rizal holidays, DOLE holiday pay rules, long weekends Philippines"
        url="/philippines-holidays"
      />

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl space-y-8">
        <Breadcrumbs className="mb-6" />

        <TransparencyHeroBanner
          badge="Official Philippine & Local Civic Calendar"
          badgeIcon={<Calendar className="w-3.5 h-3.5 text-blue-300" />}
          title={`Philippines & Morong Holidays ${selectedYear}`}
          description="Nationwide regular holidays, special non-working days, local Rizal observances, and official DOLE compensation guidelines for workers and employers."
          tags={[
            { label: 'Municipality of Morong, Rizal' },
            { label: `Calendar Year ${selectedYear}`, highlight: true },
            { label: 'DOLE Pay Rules & Labor Standards' },
          ]}
        />

        {/* Next upcoming holiday card */}
        {nextHoliday && (
          <div className="bg-gradient-to-r from-primary-500/10 via-primary-50 to-white border border-primary-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 shrink-0 rounded-full bg-primary-600 animate-pulse" />
              <div>
                <div className="text-xs uppercase tracking-wider text-primary-900 font-bold flex items-center gap-2">
                  <span>Next Observed Holiday:</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary-700 text-white">
                    {nextHoliday.daysUntil === 0
                      ? 'Today!'
                      : nextHoliday.daysUntil === 1
                        ? 'Tomorrow'
                        : `In ${nextHoliday.daysUntil} days`}
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-gray-950 mt-0.5">
                  {nextHoliday.name}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-600 shrink-0">
              <div className="flex items-center gap-1.5 font-medium text-gray-800 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-2xs">
                <CalendarDays className="h-3.5 w-3.5 text-primary-600" />
                <span>
                  {nextHoliday.date}, {selectedYear} ({nextHoliday.dayOfWeek})
                </span>
              </div>
              <span className="font-semibold text-primary-900 bg-primary-100/70 border border-primary-200 px-3 py-1.5 rounded-lg">
                {nextHoliday.typeLabel}
              </span>
            </div>
          </div>
        )}

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Total Observed
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {holidays.length}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Calendar year {selectedYear}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
            <div className="text-xs font-semibold text-primary-700 uppercase tracking-wider mb-1">
              Regular Holidays
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-primary-700">
              {regularCount}
            </div>
            <div className="text-xs text-primary-800 font-medium mt-1">
              200% worked pay
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
            <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
              Special Non-Working
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-700">
              {specialCount}
            </div>
            <div className="text-xs text-amber-800 font-medium mt-1">
              130% worked pay
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-2xs">
            <div className="text-xs font-semibold text-purple-700 uppercase tracking-wider mb-1">
              Rizal / Morong Local
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-700">
              {localCount}
            </div>
            <div className="text-xs text-purple-800 font-medium mt-1">
              Provincial & municipal
            </div>
          </div>
        </div>

        {/* Controls: Search, Year, Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search input */}
            <div className="relative flex-1">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search holiday by name, date, month, or proclamation..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 px-1 py-0.5 rounded"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Year Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                Year:
              </span>
              <select
                value={selectedYear}
                onChange={e => setSelectedYear(Number(e.target.value))}
                className="text-sm font-semibold border border-gray-300 rounded-xl px-3 py-2.5 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value={2025}>2025</option>
                <option value={2026}>2026</option>
                <option value={2027}>2027</option>
              </select>
            </div>
          </div>

          {/* Category tabs and toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All Holidays' },
                { id: 'regular', label: 'Regular Holidays' },
                { id: 'special', label: 'Special Non-Working' },
                { id: 'local', label: 'Local Rizal & Morong' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterType(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    filterType === tab.id
                      ? 'bg-primary-700 text-white shadow-2xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={upcomingOnly}
                onChange={e => setUpcomingOnly(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 h-4 w-4"
              />
              <span>Show Upcoming Only</span>
            </label>
          </div>
        </div>

        {/* Results List / Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                {selectedYear} Official Holiday Calendar
              </h2>
              <p className="text-xs text-gray-500">
                Showing {filteredHolidays.length} of {holidays.length} holidays
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-primary-600 inline-block" />{' '}
                Regular
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />{' '}
                Special
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" />{' '}
                Local Rizal
              </span>
            </div>
          </div>

          {filteredHolidays.length === 0 ? (
            <div className="py-16 text-center px-4">
              <CalendarDays
                className="h-10 w-10 text-gray-300 mx-auto mb-3"
                aria-hidden="true"
              />
              <h3 className="text-base font-bold text-gray-800">
                No holidays match your filter
              </h3>
              <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                Try clearing your search term or switching to the &quot;All
                Holidays&quot; tab.
              </p>
              <button
                onClick={() => {
                  setFilterType('all');
                  setSearchQuery('');
                  setUpcomingOnly(false);
                }}
                className="mt-4 inline-flex items-center px-4 py-2 text-xs font-semibold rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredHolidays.map(item => {
                const isRegular = item.type === 'regular';
                const isSpecial = item.type === 'special-non-working';

                return (
                  <div
                    key={item.id}
                    className={`p-4 sm:p-5 hover:bg-gray-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      item.isUpcoming ? '' : 'opacity-85'
                    }`}
                  >
                    {/* Left: Date badge + Info */}
                    <div className="flex items-start gap-4">
                      {/* Date badge */}
                      <div
                        className={`w-14 sm:w-16 h-14 sm:h-16 rounded-xl flex flex-col items-center justify-center shrink-0 border text-center ${
                          isRegular
                            ? 'bg-primary-50 border-primary-200 text-primary-900'
                            : isSpecial
                              ? 'bg-amber-50 border-amber-200 text-amber-900'
                              : 'bg-purple-50 border-purple-200 text-purple-900'
                        }`}
                      >
                        <span className="text-xs uppercase font-bold tracking-wider">
                          {item.date.split(' ')[0].substring(0, 3)}
                        </span>
                        <span className="text-xl sm:text-2xl font-black leading-none">
                          {item.dayOfMonth}
                        </span>
                      </div>

                      {/* Title and details */}
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900">
                            {item.name}
                          </h3>
                          {/* Type badge */}
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                              isRegular
                                ? 'bg-primary-50 text-primary-800 border-primary-200'
                                : isSpecial
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-purple-50 text-purple-800 border-purple-200'
                            }`}
                          >
                            {item.typeLabel}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 pt-1">
                          <span className="font-semibold text-gray-700">
                            {item.dayOfWeek}
                          </span>
                          <span>•</span>
                          <span className="text-gray-600 font-mono text-xs">
                            {item.legalBasis}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Countdown badge */}
                    <div className="sm:text-right shrink-0 pl-18 sm:pl-0 flex sm:flex-col items-center sm:items-end justify-between gap-1">
                      {item.daysUntil === 0 ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          Observed Today!
                        </span>
                      ) : item.daysUntil > 0 ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-primary-800 font-medium text-xs border border-blue-100">
                          <Clock className="h-3.5 w-3.5 text-primary-600" />
                          In {item.daysUntil} day
                          {item.daysUntil > 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-600 font-medium">
                          Passed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* DOLE Holiday Pay Compensation Guide */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
            <div className="p-2.5 rounded-xl bg-primary-100 text-primary-800">
              <Scale className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                DOLE Holiday Pay Rules & Worker Entitlements
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Standard wage computation under Department of Labor and
                Employment (DOLE) regulations
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Regular Holiday Computation */}
            <div className="bg-primary-50/50 rounded-xl border border-primary-200/80 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-primary-950 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary-600" />
                  Regular Holidays
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-800 border border-primary-300">
                  Up to 200% Pay
                </span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                Applies to all private sector employees, except those exempted
                by law:
              </p>
              <ul className="text-xs text-gray-800 space-y-2 list-disc pl-4">
                <li>
                  <strong className="text-gray-900">If not worked:</strong>{' '}
                  Employee receives <strong>100%</strong> of basic wage for that
                  day, provided present or on authorized leave on preceding
                  workday.
                </li>
                <li>
                  <strong className="text-gray-900">If worked:</strong> Employee
                  receives <strong>200%</strong> of basic wage for the first 8
                  hours (Basic wage × 200%).
                </li>
                <li>
                  <strong className="text-gray-900">
                    Work beyond 8 hours (Overtime):
                  </strong>{' '}
                  Additional 30% of hourly rate on said day (Hourly rate × 200%
                  × 130%).
                </li>
                <li>
                  <strong className="text-gray-900">
                    If worked on scheduled rest day:
                  </strong>{' '}
                  Additional 30% of basic wage of 200% = <strong>260%</strong>{' '}
                  total pay.
                </li>
              </ul>
            </div>

            {/* Special Non-Working Day Computation */}
            <div className="bg-amber-50/40 rounded-xl border border-amber-200/80 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-amber-950 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  Special Non-Working Days
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  Up to 130% Pay
                </span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                Operates under the principle of{' '}
                <em>&quot;No work, no pay&quot;</em> unless favorable company
                agreement applies:
              </p>
              <ul className="text-xs text-gray-800 space-y-2 list-disc pl-4">
                <li>
                  <strong className="text-gray-900">If not worked:</strong>{' '}
                  &quot;No work, no pay&quot; principle applies, unless there is
                  a favorable company policy or Collective Bargaining Agreement
                  (CBA).
                </li>
                <li>
                  <strong className="text-gray-900">If worked:</strong> Employee
                  receives an additional 30% of basic wage for first 8 hours ={' '}
                  <strong>130%</strong> total pay.
                </li>
                <li>
                  <strong className="text-gray-900">
                    Work beyond 8 hours (Overtime):
                  </strong>{' '}
                  Additional 30% of hourly rate on said day (Hourly rate × 130%
                  × 130%).
                </li>
                <li>
                  <strong className="text-gray-900">
                    If worked on scheduled rest day:
                  </strong>{' '}
                  Employee receives an additional 50% of basic wage ={' '}
                  <strong>150%</strong> total pay.
                </li>
              </ul>
            </div>
          </div>

          {/* Advisory Note */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3 text-xs text-gray-600">
            <Info
              className="h-4 w-4 text-primary-600 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <strong className="text-gray-900">
                Legal Note on Islamic & Moving Holidays:
              </strong>{' '}
              Proclamations declaring national holidays for the observance of
              Eid&apos;l Fitr and Eid&apos;l Adha are issued after the
              approximate dates of the Islamic holidays have been determined in
              accordance with the Islamic calendar (Hijra) or the lunar
              calendar, or upon solemn recommendation by the National Commission
              on Muslim Filipinos (NCMF). Local holidays for Morong and Rizal
              Province are enacted via Republic Acts and municipal ordinances.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holidays;
