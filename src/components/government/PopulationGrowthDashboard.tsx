import { useState } from 'react';
import {
  Users,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Table as TableIcon,
  ExternalLink,
  Award,
  ArrowUpRight,
  MapPin,
  Building,
} from 'lucide-react';

export interface BarangayCensusRecord {
  id: string;
  name: string;
  c2020: number;
  c2024: number;
  classification: string;
  highlightTag?: string;
  shareColor: string;
  shareBorder: string;
}

const BARANGAY_DATA: BarangayCensusRecord[] = [
  {
    id: 'bombongan',
    name: 'Bombongan',
    c2020: 3888,
    c2024: 4003,
    classification: 'Rural / Agri & Suburban',
    highlightTag: 'Highest % Growth (+2.96%)',
    shareColor: 'bg-accent-500',
    shareBorder: 'border-l-accent-500',
  },
  {
    id: 'can-cal-lan',
    name: 'Can-Cal-Lan (CCL)',
    c2020: 4917,
    c2024: 4931,
    classification: 'Urban / Riverside Poblacion',
    shareColor: 'bg-secondary-500',
    shareBorder: 'border-l-secondary-500',
  },
  {
    id: 'lagundi',
    name: 'Lagundi',
    c2020: 10076,
    c2024: 10126,
    classification: 'Urban / Commercial & Lakeshore',
    shareColor: 'bg-primary-500',
    shareBorder: 'border-l-primary-500',
  },
  {
    id: 'maybancal',
    name: 'Maybancal',
    c2020: 17979,
    c2024: 18224,
    classification: 'Urban / Highway Commercial',
    highlightTag: 'Most Populous (25.22%)',
    shareColor: 'bg-primary-900',
    shareBorder: 'border-l-primary-900',
  },
  {
    id: 'san-guillermo',
    name: 'San Guillermo',
    c2020: 12758,
    c2024: 13089,
    classification: 'Upland / Agri-Tourism',
    highlightTag: 'Highest Net Gain (+331)',
    shareColor: 'bg-primary-800',
    shareBorder: 'border-l-primary-800',
  },
  {
    id: 'san-jose',
    name: 'San Jose',
    c2020: 4293,
    c2024: 4419,
    classification: 'Urban / Poblacion & Agri',
    shareColor: 'bg-accent-600',
    shareBorder: 'border-l-accent-600',
  },
  {
    id: 'san-juan',
    name: 'San Juan',
    c2020: 11184,
    c2024: 11258,
    classification: 'Urban / Commercial Center',
    highlightTag: 'Commercial Hub',
    shareColor: 'bg-primary-700',
    shareBorder: 'border-l-primary-700',
  },
  {
    id: 'san-pedro',
    name: 'San Pedro',
    c2020: 6056,
    c2024: 6212,
    classification: 'Urban / Capital Poblacion',
    highlightTag: 'Municipal Government Seat',
    shareColor: 'bg-secondary-600',
    shareBorder: 'border-l-secondary-600',
  },
];

const TOTAL_2020 = 71151;
const TOTAL_2024 = 72262;
const NET_GROWTH = TOTAL_2024 - TOTAL_2020; // 1,111
const GROWTH_RATE = ((NET_GROWTH / TOTAL_2020) * 100).toFixed(2); // +1.56%
const LAND_AREA_KM2 = 37.58;
const DENSITY_2024 = Math.round(TOTAL_2024 / LAND_AREA_KM2); // 1,923
const DENSITY_2020 = Math.round(TOTAL_2020 / LAND_AREA_KM2); // 1,893

export default function PopulationGrowthDashboard() {
  const [activeTab, setActiveTab] = useState<
    'comparison' | 'growth' | 'share' | 'table'
  >('comparison');
  const [growthSortMetric, setGrowthSortMetric] = useState<'percent' | 'net'>(
    'percent'
  );
  const [selectedBarangayId, setSelectedBarangayId] = useState<string | null>(
    null
  );

  // Highest population for relative bar height scaling (Maybancal is max at 18,224)
  const maxPopulation = Math.max(...BARANGAY_DATA.map(b => b.c2024));

  const sortedByGrowth = [...BARANGAY_DATA].sort((a, b) => {
    const netA = a.c2024 - a.c2020;
    const netB = b.c2024 - b.c2020;
    const pctA = (netA / a.c2020) * 100;
    const pctB = (netB / b.c2020) * 100;
    return growthSortMetric === 'percent' ? pctB - pctA : netB - netA;
  });

  const selectedRecord = BARANGAY_DATA.find(b => b.id === selectedBarangayId);

  return (
    <div className="space-y-6 font-sans">
      {/* KPI Highlights Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: 2024 Population */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              2024 Official Population
            </span>
            <Users className="w-4 h-4 text-primary-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {TOTAL_2024.toLocaleString()}
          </div>
          <p className="text-xs text-success-700 font-medium mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5 text-success-600" />
            <span>+{NET_GROWTH.toLocaleString()} residents since 2020</span>
          </p>
        </div>

        {/* Card 2: 2020 Baseline */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              2020 Census Baseline
            </span>
            <Building className="w-4 h-4 text-primary-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {TOTAL_2020.toLocaleString()}
          </div>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Official PSA Census of Population
          </p>
        </div>

        {/* Card 3: Growth Rate */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              4-Year Growth Rate
            </span>
            <TrendingUp className="w-4 h-4 text-success-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-success-600 tracking-tight">
            +{GROWTH_RATE}%
          </div>
          <p className="text-xs text-gray-600 font-medium mt-1">
            +0.39% annualized growth
          </p>
        </div>

        {/* Card 4: Density */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Population Density
            </span>
            <MapPin className="w-4 h-4 text-secondary-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            {DENSITY_2024.toLocaleString()}{' '}
            <span className="text-sm font-semibold text-gray-500">/ km²</span>
          </div>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Up from {DENSITY_2020.toLocaleString()} / km² (37.58 km² area)
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('comparison')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'comparison'
              ? 'bg-primary-600 text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>2020 vs 2024 Comparison Chart</span>
        </button>

        <button
          onClick={() => setActiveTab('growth')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'growth'
              ? 'bg-primary-600 text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Growth Rankings</span>
        </button>

        <button
          onClick={() => setActiveTab('share')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'share'
              ? 'bg-primary-600 text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <PieChartIcon className="w-4 h-4" />
          <span>Population Share</span>
        </button>

        <button
          onClick={() => setActiveTab('table')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'table'
              ? 'bg-primary-600 text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <TableIcon className="w-4 h-4" />
          <span>Full Census Table</span>
        </button>
      </div>

      {/* TAB 1: 2020 VS 2024 COMPARISON CHART */}
      {activeTab === 'comparison' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Official Population Comparison by Barangay
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                Side-by-side growth from 2020 PSA Census to 2024 POPCEN official
                count.
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-sm bg-primary-300" />
                <span className="text-gray-700">2020 Census</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-sm bg-primary-600" />
                <span className="text-gray-700">2024 POPCEN</span>
              </div>
            </div>
          </div>

          {/* Vertical Bar Chart (Desktop / Tablet) */}
          <div className="hidden md:block">
            <div className="h-72 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-gray-200">
              {BARANGAY_DATA.map(b => {
                const height2020Pct = Math.round(
                  (b.c2020 / maxPopulation) * 100
                );
                const height2024Pct = Math.round(
                  (b.c2024 / maxPopulation) * 100
                );
                const net = b.c2024 - b.c2020;
                const pct = ((net / b.c2020) * 100).toFixed(2);
                const isSelected = selectedBarangayId === b.id;

                return (
                  <div
                    key={b.id}
                    onClick={() =>
                      setSelectedBarangayId(isSelected ? null : b.id)
                    }
                    className={`flex-1 flex flex-col items-center h-full justify-end group cursor-pointer transition-all rounded-lg p-1.5 ${
                      isSelected
                        ? 'bg-primary-50 ring-2 ring-primary-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* Tooltip / Value on top */}
                    <div className="text-[11px] font-bold text-gray-700 mb-1.5 opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {b.c2024.toLocaleString()}
                    </div>

                    {/* Dual Bars Container */}
                    <div className="w-full max-w-[56px] flex items-end justify-center gap-1.5 h-full">
                      {/* 2020 Bar (Civic Blue 300) */}
                      <div
                        className="w-1/2 bg-primary-300 hover:bg-primary-400 rounded-t-sm transition-all duration-300 relative group/b1"
                        style={{ height: `${height2020Pct}%` }}
                        title={`${b.name} (2020): ${b.c2020.toLocaleString()}`}
                      />
                      {/* 2024 Bar (Civic Blue 600) */}
                      <div
                        className="w-1/2 bg-primary-600 hover:bg-primary-700 rounded-t-sm transition-all duration-300 relative group/b2"
                        style={{ height: `${height2024Pct}%` }}
                        title={`${b.name} (2024): ${b.c2024.toLocaleString()} (+${net}, +${pct}%)`}
                      />
                    </div>

                    {/* Growth Pill (Laguna Emerald Semantic Tokens) */}
                    <span className="mt-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-success-50 text-success-700 border border-success-200">
                      +{pct}%
                    </span>

                    {/* Barangay Label */}
                    <span
                      className="text-xs font-semibold text-gray-800 text-center mt-1 truncate max-w-[80px]"
                      title={b.name}
                    >
                      {b.name.replace(' (CCL)', '')}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[11px] text-gray-400 pt-1 px-2">
              <span>0</span>
              <span>~5,000</span>
              <span>~10,000</span>
              <span>~15,000</span>
              <span>20,000 max scale</span>
            </div>
          </div>

          {/* Horizontal Comparison Bars (Mobile Friendly) */}
          <div className="md:hidden space-y-4">
            {BARANGAY_DATA.map(b => {
              const width2020 = Math.round((b.c2020 / maxPopulation) * 100);
              const width2024 = Math.round((b.c2024 / maxPopulation) * 100);
              const net = b.c2024 - b.c2020;
              const pct = ((net / b.c2020) * 100).toFixed(2);
              const isSelected = selectedBarangayId === b.id;

              return (
                <div
                  key={b.id}
                  onClick={() =>
                    setSelectedBarangayId(isSelected ? null : b.id)
                  }
                  className={`p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-primary-600 bg-primary-50/50 ring-1 ring-primary-600'
                      : 'border-gray-200 bg-gray-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-gray-900">{b.name}</span>
                    <span className="font-bold text-success-700 bg-success-50 border border-success-200 px-2 py-0.5 rounded-full text-[11px]">
                      +{net} (+{pct}%)
                    </span>
                  </div>

                  {/* 2024 Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-primary-800 w-10">
                        2024
                      </span>
                      <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-primary-600 h-full rounded-full transition-all"
                          style={{ width: `${width2024}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-800 w-14 text-right">
                        {b.c2024.toLocaleString()}
                      </span>
                    </div>

                    {/* 2020 Bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-primary-400 w-10">
                        2020
                      </span>
                      <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-primary-300 h-full rounded-full transition-all"
                          style={{ width: `${width2020}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600 w-14 text-right">
                        {b.c2020.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Barangay Spotlight Detail */}
          {selectedRecord && (
            <div className="bg-primary-50/80 border border-primary-200 rounded-xl p-4 sm:p-5 text-xs sm:text-sm animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-primary-200">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary-700" />
                  <span className="font-bold text-primary-950 text-base">
                    {selectedRecord.name}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-primary-100 text-primary-800 text-xs font-semibold">
                    {selectedRecord.classification}
                  </span>
                </div>
                {selectedRecord.highlightTag && (
                  <span className="text-xs font-bold text-primary-800 bg-white px-2.5 py-1 rounded-full border border-primary-300 self-start sm:self-auto">
                    {selectedRecord.highlightTag}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div>
                  <span className="text-gray-500 text-xs block">
                    2020 Census
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    {selectedRecord.c2020.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-xs block">
                    2024 POPCEN
                  </span>
                  <span className="text-base font-bold text-primary-700">
                    {selectedRecord.c2024.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-xs block">
                    Net Increase
                  </span>
                  <span className="text-base font-bold text-success-700">
                    +
                    {(
                      selectedRecord.c2024 - selectedRecord.c2020
                    ).toLocaleString()}{' '}
                    residents
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-xs block">
                    Share of Morong Total
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    {((selectedRecord.c2024 / TOTAL_2024) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Morong Municipal Summary Bar */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5">
              <Building className="w-5 h-5 text-primary-600 shrink-0" />
              <div>
                <span className="font-bold text-gray-900 text-sm block">
                  Municipality of Morong (All 8 Barangays Combined)
                </span>
                <span className="text-xs text-gray-500">
                  Total Land Area: 37.58 km² • 2nd Class Municipality of Rizal
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 self-end sm:self-auto">
              <div>
                <span className="text-[11px] text-gray-500 block">
                  2020 Total
                </span>
                <span className="font-bold text-gray-800">
                  {TOTAL_2020.toLocaleString()}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-primary-700 font-semibold block">
                  2024 POPCEN
                </span>
                <span className="font-black text-primary-700 text-base">
                  {TOTAL_2024.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GROWTH RANKINGS */}
      {activeTab === 'growth' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Barangay Growth Velocity & Net Increase Ranking
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                Analyze which areas experienced the fastest growth rate and
                highest numeric additions between 2020 and 2024.
              </p>
            </div>

            {/* Toggle Sort Metric */}
            <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1 text-xs font-semibold">
              <button
                onClick={() => setGrowthSortMetric('percent')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  growthSortMetric === 'percent'
                    ? 'bg-primary-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                By % Growth Rate
              </button>
              <button
                onClick={() => setGrowthSortMetric('net')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  growthSortMetric === 'net'
                    ? 'bg-primary-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                By Net Residents Added
              </button>
            </div>
          </div>

          {/* Ranked List */}
          <div className="space-y-3">
            {sortedByGrowth.map((b, index) => {
              const net = b.c2024 - b.c2020;
              const pct = ((net / b.c2020) * 100).toFixed(2);
              const maxPct = 3.0; // scale up to 3%
              const widthPct = Math.min(
                100,
                Math.round((parseFloat(pct) / maxPct) * 100)
              );

              return (
                <div
                  key={b.id}
                  className="bg-gray-50/70 hover:bg-primary-50/40 border border-gray-200 hover:border-primary-200 rounded-xl p-3.5 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-800 text-xs font-bold flex items-center justify-center shrink-0">
                        #{index + 1}
                      </span>
                      <span className="font-bold text-gray-900 text-sm">
                        {b.name}
                      </span>
                      <span className="hidden sm:inline-block text-xs text-gray-500">
                        • {b.classification}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-right">
                      <div className="text-xs">
                        <span className="text-gray-500">Net: </span>
                        <span className="font-bold text-gray-800">
                          +{net.toLocaleString()}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-success-50 text-success-700 border border-success-200 text-xs font-black">
                        +{pct}%
                      </span>
                    </div>
                  </div>

                  {/* Growth Progress Bar (Civic Blue brand gradient) */}
                  <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary-600 to-primary-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-gray-500 mt-1.5">
                    <span>
                      2020: {b.c2020.toLocaleString()} → 2024:{' '}
                      {b.c2024.toLocaleString()}
                    </span>
                    {b.highlightTag && (
                      <span className="text-primary-700 font-semibold">
                        {b.highlightTag}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: POPULATION SHARE & DISTRIBUTION */}
      {activeTab === 'share' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
          <div className="pb-4 border-b border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Barangay Population Share (2024 POPCEN)
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Distribution of Morong&apos;s 72,262 citizens across all 8
              component barangays.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Visual Multi-Segment Distribution Bar */}
            <div className="space-y-4">
              <div className="text-xs font-semibold text-gray-600">
                Composite Distribution Bar (100% of Municipal Population)
              </div>
              <div className="h-6 w-full rounded-xl overflow-hidden flex shadow-inner border border-gray-200">
                {BARANGAY_DATA.map(b => {
                  const share = ((b.c2024 / TOTAL_2024) * 100).toFixed(1);
                  return (
                    <div
                      key={b.id}
                      className={`${b.shareColor} h-full transition-all hover:opacity-80`}
                      style={{ width: `${(b.c2024 / TOTAL_2024) * 100}%` }}
                      title={`${b.name}: ${share}% (${b.c2024.toLocaleString()} residents)`}
                    />
                  );
                })}
              </div>

              {/* Summary Insights */}
              <div className="bg-primary-50/60 border border-primary-200 rounded-xl p-4 text-xs sm:text-sm text-gray-700 space-y-2">
                <div className="font-bold text-primary-950 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-primary-700" />
                  <span>Key Demographic Takeaways:</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>
                    <strong>Maybancal</strong> holds over one-quarter (
                    <strong>25.22%</strong>) of the entire municipality, making
                    it the primary population and transit gateway center.
                  </li>
                  <li>
                    The top three barangays—<strong>Maybancal</strong>,{' '}
                    <strong>San Guillermo</strong>, and{' '}
                    <strong>San Juan</strong>
                    —together house <strong>58.91%</strong> (42,571 residents)
                    of Morong.
                  </li>
                  <li>
                    <strong>San Guillermo</strong> exhibited the largest
                    absolute expansion, adding{' '}
                    <strong>331 new residents</strong> (+2.59%).
                  </li>
                  <li>
                    <strong>Bombongan</strong> registered the fastest growth
                    rate at <strong>+2.96%</strong> (+115 residents).
                  </li>
                </ul>
              </div>
            </div>

            {/* Grid of Barangay Share Cards */}
            <div className="grid grid-cols-2 gap-2.5">
              {BARANGAY_DATA.map(b => {
                const share = ((b.c2024 / TOTAL_2024) * 100).toFixed(2);
                return (
                  <div
                    key={b.id}
                    className={`bg-gray-50 border border-gray-200 ${b.shareBorder} border-l-4 rounded-lg p-2.5 shadow-2xs`}
                  >
                    <div className="text-xs font-bold text-gray-900 truncate">
                      {b.name}
                    </div>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-base font-extrabold text-gray-800">
                        {share}%
                      </span>
                      <span className="text-[11px] text-gray-500 font-medium">
                        {b.c2024.toLocaleString()} pop.
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: OFFICIAL CENSUS DATA TABLE */}
      {activeTab === 'table' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Official Morong Census Summary Table (2020 vs. 2024)
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                Exact certified figures from the PSA 2020 Census of Population
                and Housing and the 2024 POPCEN Proclamation.
              </p>
            </div>
            <div className="text-xs text-gray-500 font-mono">
              PSGC: 045809000 (Morong, Rizal)
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-100/80 border-b border-gray-300 text-gray-700 font-bold">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Barangay Name</th>
                  <th className="py-2.5 px-3 text-right">2020 Census</th>
                  <th className="py-2.5 px-3 text-right text-primary-700">
                    2024 POPCEN
                  </th>
                  <th className="py-2.5 px-3 text-right">Net Change</th>
                  <th className="py-2.5 px-3 text-right">Growth Rate (%)</th>
                  <th className="py-2.5 px-3 text-right">% Share (2024)</th>
                  <th className="py-2.5 px-3">Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {BARANGAY_DATA.map((b, idx) => {
                  const net = b.c2024 - b.c2020;
                  const pct = ((net / b.c2020) * 100).toFixed(2);
                  const share = ((b.c2024 / TOTAL_2024) * 100).toFixed(2);

                  return (
                    <tr
                      key={b.id}
                      className="hover:bg-primary-50/40 transition-colors"
                    >
                      <td className="py-2.5 px-3 font-semibold text-gray-400">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-gray-900">
                        {b.name}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-gray-700">
                        {b.c2020.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-primary-700">
                        {b.c2024.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-success-700 font-semibold">
                        +{net.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-success-700">
                        +{pct}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-gray-700">
                        {share}%
                      </td>
                      <td className="py-2.5 px-3 text-gray-600 text-xs">
                        {b.classification}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-primary-900 text-white font-bold border-t-2 border-primary-950">
                  <td className="py-3 px-3"></td>
                  <td className="py-3 px-3 text-white uppercase tracking-wider">
                    Municipality of Morong (Total)
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    {TOTAL_2020.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-primary-200 text-base">
                    {TOTAL_2024.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-primary-200">
                    +{NET_GROWTH.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-primary-200">
                    +{GROWTH_RATE}%
                  </td>
                  <td className="py-3 px-3 text-right font-mono">100.00%</td>
                  <td className="py-3 px-3 text-xs text-primary-200">
                    37.58 km² • 1,923/km²
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="text-[11px] text-gray-500 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-gray-100">
            <span>
              Source: Philippine Statistics Authority (PSA) — 2024 Census of
              Population (POPCEN) Official Presidential Proclamation.
            </span>
            <a
              href="https://psa.gov.ph/content/2024-census-population-popcen-population-counts-declared-official-president"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 hover:text-primary-800 font-semibold inline-flex items-center gap-1"
            >
              <span>View Announcement</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
