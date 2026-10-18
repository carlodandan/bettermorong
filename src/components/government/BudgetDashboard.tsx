import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Scale,
  Wallet,
  Building2,
  PieChart as PieChartIcon,
  Table as TableIcon,
  Info,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Coins,
  Receipt,
  FileSpreadsheet,
} from 'lucide-react';

export default function BudgetDashboard() {
  const [activeTab, setActiveTab] = useState<
    'analytics' | 'tables' | 'insights'
  >('analytics');
  const [hoveredIncome, setHoveredIncome] = useState<string | null>(null);
  const [hoveredExp, setHoveredExp] = useState<string | null>(null);

  // Financial Data - FY 2025 (Preliminary)
  const data = {
    income: {
      total: 354.11,
      external: 264.69,
      externalPct: 74.75,
      local: 89.42,
      localPct: 25.25,
      localTax: 63.92,
      localNonTax: 25.51,
      nta: 264.55,
      otherTaxShares: 0.03,
      interLocal: 0.1,
      businessTax: 38.24,
      realPropertyTaxTotal: 24.4,
      rptGeneral: 10.85,
      rptSEF: 13.56,
      otherTaxes: 1.28,
      regulatoryFees: 14.37,
      serviceCharges: 4.39,
      economicEnterprises: 6.74,
    },
    expenditures: {
      total: 285.51,
      gps: 204.58,
      gpsPct: 71.65,
      social: 43.56,
      socialPct: 15.26,
      economic: 27.19,
      economicPct: 9.52,
      debt: 10.17,
      debtPct: 3.56,
      health: 23.63,
      healthPctOfSocial: 54.25,
      education: 12.05,
      educationPctOfSocial: 27.66,
      socialWelfare: 7.88,
      socialWelfarePctOfSocial: 18.09,
    },
    netIncome: 68.6,
    capitalOutlay: 52.59,
    cash: {
      beginning: 102.27,
      netIncrease: 16.0,
      available: 118.27,
      priorAP: 8.99,
      continuing: 20.23,
      end: 89.05,
    },
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-blue-200 mb-3 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-300" />
            <span>BLGF Financial Transparency & Public Accountability</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Statement of Receipts & Expenditures
          </h1>
          <p className="text-blue-200/90 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Official municipal revenues, operating expenditures, capital
            investments, and fund balances of Morong, Rizal for{' '}
            <strong className="text-white">FY 2025 (Preliminary)</strong>,
            sourced directly from the Bureau of Local Government Finance (BLGF).
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-5 pt-4 border-t border-white/10 text-xs text-blue-200">
            <span className="px-2.5 py-1 bg-blue-500/20 rounded-md font-semibold text-white border border-blue-400/30">
              FY 2025 (Preliminary)
            </span>
            <span className="px-2.5 py-1 bg-white/10 rounded-md">
              LGU: Morong, Rizal
            </span>
            <span className="px-2.5 py-1 bg-white/10 rounded-md">
              Region IV-A (CALABARZON)
            </span>
            <span className="px-2.5 py-1 bg-white/10 rounded-md">
              Unit: Php Million (₱M)
            </span>
            <a
              href="https://blgf.gov.ph/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-300 hover:text-white transition-colors underline ml-auto"
            >
              Verify on BLGF Portal <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Income */}
        <div className="bg-white border border-emerald-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Total Operating Income
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
            ₱{data.income.total.toFixed(2)} M
          </div>
          <div className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Local: 25.3% · External: 74.7%</span>
          </div>
        </div>

        {/* Total Expenditures */}
        <div className="bg-white border border-amber-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Total Expenditures
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
            ₱{data.expenditures.total.toFixed(2)} M
          </div>
          <div className="mt-2 text-xs text-amber-700 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>Public Services, Social & Economic Ops</span>
          </div>
        </div>

        {/* Net Operating Income */}
        <div className="bg-white border border-blue-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
              Net Operating Income
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
            +₱{data.netIncome.toFixed(2)} M
          </div>
          <div className="mt-2 text-xs text-blue-700 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>Positive Operating Surplus (+19.4%)</span>
          </div>
        </div>

        {/* Cash Balance End */}
        <div className="bg-white border border-purple-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-800 uppercase tracking-wider">
              Fund / Cash Balance (End)
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
            ₱{data.cash.end.toFixed(2)} M
          </div>
          <div className="mt-2 text-xs text-purple-700 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span>Liquid Reserves after Prior AP & Reserves</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'analytics'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <PieChartIcon className="w-4 h-4" />
          <span>Visual Analytics & Charts</span>
        </button>

        <button
          onClick={() => setActiveTab('tables')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'tables'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <TableIcon className="w-4 h-4" />
          <span>Itemized Accounting Tables</span>
        </button>

        <button
          onClick={() => setActiveTab('insights')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'insights'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Info className="w-4 h-4" />
          <span>Citizen Insights (FY 2025)</span>
        </button>
      </div>

      {/* TAB 1: VISUAL ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Income Composition */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-sky-600" />
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                      Income Composition (FY 2025)
                    </h2>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-sky-100 text-sky-800 rounded-full">
                    ₱354.11 M
                  </span>
                </div>

                {/* Donut Chart & Legend */}
                <div className="flex flex-col sm:flex-row items-center gap-6 my-6">
                  <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                    <svg
                      viewBox="0 0 200 200"
                      className="w-full h-full transform -rotate-90"
                    >
                      <circle
                        cx="100"
                        cy="100"
                        r="70"
                        fill="transparent"
                        stroke="#f1f5f9"
                        strokeWidth="26"
                      />
                      {/* External: 74.75% -> 329 / 440 */}
                      <circle
                        cx="100"
                        cy="100"
                        r="70"
                        fill="transparent"
                        stroke="#0284c7"
                        strokeWidth="26"
                        strokeDasharray="329 440"
                        strokeDashoffset="0"
                        className={`transition-all duration-300 cursor-pointer ${
                          hoveredIncome === 'external'
                            ? 'stroke-sky-700 filter drop-shadow'
                            : ''
                        }`}
                        onMouseEnter={() => setHoveredIncome('external')}
                        onMouseLeave={() => setHoveredIncome(null)}
                      />
                      {/* Local: 25.25% -> 111 / 440 */}
                      <circle
                        cx="100"
                        cy="100"
                        r="70"
                        fill="transparent"
                        stroke="#10b981"
                        strokeWidth="26"
                        strokeDasharray="111 440"
                        strokeDashoffset="-329"
                        className={`transition-all duration-300 cursor-pointer ${
                          hoveredIncome === 'local'
                            ? 'stroke-emerald-700 filter drop-shadow'
                            : ''
                        }`}
                        onMouseEnter={() => setHoveredIncome('local')}
                        onMouseLeave={() => setHoveredIncome(null)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Total
                      </span>
                      <span className="text-lg font-extrabold text-gray-900">
                        ₱354.1M
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                        100%
                      </span>
                    </div>
                  </div>

                  {/* Interactive Breakdown Items */}
                  <div className="flex-1 w-full space-y-2.5 text-xs">
                    <div
                      onMouseEnter={() => setHoveredIncome('external')}
                      onMouseLeave={() => setHoveredIncome(null)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        hoveredIncome === 'external'
                          ? 'bg-sky-100 border-sky-300 shadow-xs'
                          : 'bg-sky-50/70 border-sky-100 hover:bg-sky-50'
                      }`}
                    >
                      <div className="flex justify-between items-center text-sm font-bold text-sky-950">
                        <span className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-sky-600 inline-block"></span>
                          External Sources (NTA)
                        </span>
                        <span>₱264.69 M</span>
                      </div>
                      <div className="text-xs text-sky-700 mt-1 flex justify-between">
                        <span>National Tax Allotment & collection shares</span>
                        <span className="font-extrabold text-sky-900">
                          74.7%
                        </span>
                      </div>
                    </div>

                    <div
                      onMouseEnter={() => setHoveredIncome('local')}
                      onMouseLeave={() => setHoveredIncome(null)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        hoveredIncome === 'local'
                          ? 'bg-emerald-100 border-emerald-300 shadow-xs'
                          : 'bg-emerald-50/70 border-emerald-100 hover:bg-emerald-50'
                      }`}
                    >
                      <div className="flex justify-between items-center text-sm font-bold text-emerald-950">
                        <span className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                          Local Sources
                        </span>
                        <span>₱89.42 M</span>
                      </div>
                      <div className="text-xs text-emerald-700 mt-1 flex justify-between">
                        <span>Tax (₱63.92M) + Non-Tax (₱25.51M)</span>
                        <span className="font-extrabold text-emerald-900">
                          25.3%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Meter */}
              <div className="pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500 font-medium mb-1.5 flex justify-between">
                  <span>Revenue Ratio</span>
                  <span>74.7% National Allotment vs 25.3% Local Taxes</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-sky-600"
                    style={{ width: '74.75%' }}
                    title="External Sources: 74.75%"
                  />
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: '25.25%' }}
                    title="Local Sources: 25.25%"
                  />
                </div>
              </div>
            </div>

            {/* Chart 2: Expenditure Allocation */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                      Expenditure Allocation (FY 2025)
                    </h2>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full">
                    ₱285.51 M
                  </span>
                </div>

                {/* Donut Chart & Legend */}
                <div className="flex flex-col sm:flex-row items-center gap-6 my-6">
                  <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                    <svg
                      viewBox="0 0 200 200"
                      className="w-full h-full transform -rotate-90"
                    >
                      <circle
                        cx="100"
                        cy="100"
                        r="70"
                        fill="transparent"
                        stroke="#f1f5f9"
                        strokeWidth="26"
                      />
                      {/* GPS: 71.65% -> 315 / 440 */}
                      <circle
                        cx="100"
                        cy="100"
                        r="70"
                        fill="transparent"
                        stroke="#2563eb"
                        strokeWidth="26"
                        strokeDasharray="315 440"
                        strokeDashoffset="0"
                        className={`transition-all duration-300 cursor-pointer ${
                          hoveredExp === 'gps'
                            ? 'stroke-blue-700 filter drop-shadow'
                            : ''
                        }`}
                        onMouseEnter={() => setHoveredExp('gps')}
                        onMouseLeave={() => setHoveredExp(null)}
                      />
                      {/* Social: 15.26% -> 67 / 440 */}
                      <circle
                        cx="100"
                        cy="100"
                        r="70"
                        fill="transparent"
                        stroke="#8b5cf6"
                        strokeWidth="26"
                        strokeDasharray="67 440"
                        strokeDashoffset="-315"
                        className={`transition-all duration-300 cursor-pointer ${
                          hoveredExp === 'social'
                            ? 'stroke-purple-700 filter drop-shadow'
                            : ''
                        }`}
                        onMouseEnter={() => setHoveredExp('social')}
                        onMouseLeave={() => setHoveredExp(null)}
                      />
                      {/* Economic: 9.52% -> 42 / 440 */}
                      <circle
                        cx="100"
                        cy="100"
                        r="70"
                        fill="transparent"
                        stroke="#f59e0b"
                        strokeWidth="26"
                        strokeDasharray="42 440"
                        strokeDashoffset="-382"
                        className={`transition-all duration-300 cursor-pointer ${
                          hoveredExp === 'economic'
                            ? 'stroke-amber-700 filter drop-shadow'
                            : ''
                        }`}
                        onMouseEnter={() => setHoveredExp('economic')}
                        onMouseLeave={() => setHoveredExp(null)}
                      />
                      {/* Debt: 3.56% -> 16 / 440 */}
                      <circle
                        cx="100"
                        cy="100"
                        r="70"
                        fill="transparent"
                        stroke="#ef4444"
                        strokeWidth="26"
                        strokeDasharray="16 440"
                        strokeDashoffset="-424"
                        className={`transition-all duration-300 cursor-pointer ${
                          hoveredExp === 'debt'
                            ? 'stroke-red-700 filter drop-shadow'
                            : ''
                        }`}
                        onMouseEnter={() => setHoveredExp('debt')}
                        onMouseLeave={() => setHoveredExp(null)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Total
                      </span>
                      <span className="text-lg font-extrabold text-gray-900">
                        ₱285.5M
                      </span>
                      <span className="text-xs text-gray-400 font-medium">
                        100%
                      </span>
                    </div>
                  </div>

                  {/* Interactive Breakdown Items */}
                  <div className="flex-1 w-full space-y-2 text-xs">
                    <div
                      onMouseEnter={() => setHoveredExp('gps')}
                      onMouseLeave={() => setHoveredExp(null)}
                      className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer ${
                        hoveredExp === 'gps'
                          ? 'bg-blue-100 border-blue-300'
                          : 'bg-blue-50/70 border-blue-100 hover:bg-blue-50'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 font-bold text-blue-950">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                        General Public Services
                      </span>
                      <span className="font-extrabold text-blue-950">
                        ₱204.58M (71.7%)
                      </span>
                    </div>

                    <div
                      onMouseEnter={() => setHoveredExp('social')}
                      onMouseLeave={() => setHoveredExp(null)}
                      className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer ${
                        hoveredExp === 'social'
                          ? 'bg-purple-100 border-purple-300'
                          : 'bg-purple-50/70 border-purple-100 hover:bg-purple-50'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 font-bold text-purple-950">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block"></span>
                        Social Services
                      </span>
                      <span className="font-extrabold text-purple-950">
                        ₱43.56M (15.3%)
                      </span>
                    </div>

                    <div
                      onMouseEnter={() => setHoveredExp('economic')}
                      onMouseLeave={() => setHoveredExp(null)}
                      className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer ${
                        hoveredExp === 'economic'
                          ? 'bg-amber-100 border-amber-300'
                          : 'bg-amber-50/70 border-amber-100 hover:bg-amber-50'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 font-bold text-amber-950">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                        Economic Services
                      </span>
                      <span className="font-extrabold text-amber-950">
                        ₱27.19M (9.5%)
                      </span>
                    </div>

                    <div
                      onMouseEnter={() => setHoveredExp('debt')}
                      onMouseLeave={() => setHoveredExp(null)}
                      className={`flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer ${
                        hoveredExp === 'debt'
                          ? 'bg-red-100 border-red-300'
                          : 'bg-red-50/70 border-red-100 hover:bg-red-50'
                      }`}
                    >
                      <span className="flex items-center gap-1.5 font-bold text-red-950">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
                        Debt Service (Interest)
                      </span>
                      <span className="font-extrabold text-red-950">
                        ₱10.17M (3.6%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Meter */}
              <div className="pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500 font-medium mb-1.5 flex justify-between">
                  <span>Functional Expenditure Share</span>
                  <span>General Services (71.7%) leads</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: '71.65%' }}
                    title="General Public Services: 71.65%"
                  />
                  <div
                    className="h-full bg-purple-600"
                    style={{ width: '15.26%' }}
                    title="Social Services: 15.26%"
                  />
                  <div
                    className="h-full bg-amber-500"
                    style={{ width: '9.52%' }}
                    title="Economic Services: 9.52%"
                  />
                  <div
                    className="h-full bg-red-500"
                    style={{ width: '3.56%' }}
                    title="Debt Service: 3.56%"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cash Flow Bridge */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-5">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-purple-600" />
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Cash Flow & Fund Availability Bridge (FY 2025)
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full">
                Liquid Reserves
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  Beginning Cash
                </div>
                <div className="text-lg font-extrabold text-slate-900 mt-1">
                  ₱102.27 M
                </div>
                <div className="text-xs text-slate-500 mt-0.5 font-medium">
                  Jan 1, 2025
                </div>
              </div>

              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200">
                <div className="text-xs text-emerald-800 font-bold uppercase tracking-wider">
                  + Net Increase
                </div>
                <div className="text-lg font-extrabold text-emerald-700 mt-1">
                  +₱16.00 M
                </div>
                <div className="text-xs text-emerald-700 mt-0.5 font-medium">
                  Operating funds
                </div>
              </div>

              <div className="bg-blue-50 p-3.5 rounded-xl border border-blue-200">
                <div className="text-xs text-blue-800 font-bold uppercase tracking-wider">
                  = Total Available
                </div>
                <div className="text-lg font-extrabold text-blue-900 mt-1">
                  ₱118.27 M
                </div>
                <div className="text-xs text-blue-700 mt-0.5 font-medium">
                  Gross cash pool
                </div>
              </div>

              <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-200">
                <div className="text-xs text-rose-800 font-bold uppercase tracking-wider">
                  - Prior Year A/P
                </div>
                <div className="text-lg font-extrabold text-rose-700 mt-1">
                  -₱8.99 M
                </div>
                <div className="text-xs text-rose-700 mt-0.5 font-medium">
                  Payables settled
                </div>
              </div>

              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200">
                <div className="text-xs text-amber-800 font-bold uppercase tracking-wider">
                  - Continuing Approp
                </div>
                <div className="text-lg font-extrabold text-amber-700 mt-1">
                  -₱20.23 M
                </div>
                <div className="text-xs text-amber-700 mt-0.5 font-medium">
                  Reserved budget
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-3.5 rounded-xl shadow-xs">
                <div className="text-xs text-purple-200 font-bold uppercase tracking-wider">
                  = Ending Cash
                </div>
                <div className="text-lg font-extrabold text-white mt-1">
                  ₱89.05 M
                </div>
                <div className="text-xs text-purple-200 mt-0.5 font-medium">
                  Available liquid fund
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ITEMIZED TABLES */}
      {activeTab === 'tables' && (
        <div className="space-y-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                <span>
                  BLGF Official Financial Accounts (FY 2025 Preliminary)
                </span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Statement of Receipts and Expenditures · Municipality of Morong,
                Rizal · All figures in Millions (₱M)
              </p>
            </div>
          </div>

          {/* Table 1: Local Sources */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              1. Local Sources — Tax Revenue
            </h3>
            <div className="overflow-x-auto border border-gray-200 rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase">
                  <tr>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4 text-center w-40">Amount (₱M)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50">
                    <td className="py-2.5 px-4 text-gray-700">
                      Real Property Tax — General Fund
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono">10.85</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="py-2.5 px-4 text-gray-700">
                      Real Property Tax — Special Education Fund (SEF)
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono">13.56</td>
                  </tr>
                  <tr className="bg-gray-50/70 font-semibold text-gray-900">
                    <td className="py-2.5 px-4">Total Real Property Tax</td>
                    <td className="py-2.5 px-4 text-center font-mono font-bold">
                      24.40
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="py-2.5 px-4 text-gray-700">
                      Tax on Business
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono">38.24</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="py-2.5 px-4 text-gray-700">
                      Other Local Taxes
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono">1.28</td>
                  </tr>
                  <tr className="bg-emerald-50/60 font-bold text-emerald-950 border-t border-emerald-200">
                    <td className="py-3 px-4">TOTAL TAX REVENUE</td>
                    <td className="py-3 px-4 text-center font-mono font-bold">
                      63.92
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Non-Tax & External */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                2. Local Sources — Non-Tax Revenue
              </h3>
              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase">
                    <tr>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4 text-center w-36">
                        Amount (₱M)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-4 text-gray-700">
                        Regulatory Fees
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono">
                        14.37
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-4 text-gray-700">
                        Service / User Charges
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono">
                        4.39
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-4 text-gray-700">
                        Receipts from Economic Enterprises
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono">
                        6.74
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-4 text-gray-700">
                        Other Receipts
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono">
                        0.00
                      </td>
                    </tr>
                    <tr className="bg-teal-50/60 font-bold text-teal-950 border-t border-teal-200">
                      <td className="py-3 px-4">TOTAL NON-TAX REVENUE</td>
                      <td className="py-3 px-4 text-center font-mono font-bold">
                        25.51
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                3. External Sources
              </h3>
              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase">
                    <tr>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4 text-center w-36">
                        Amount (₱M)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-4 text-gray-700">
                        National Tax Allotment (NTA)
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono">
                        264.55
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-4 text-gray-700">
                        Other Shares from National Tax
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono">
                        0.03
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-4 text-gray-700">
                        Inter-Local Transfers
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono">
                        0.10
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-4 text-gray-700">
                        Extraordinary Receipts / Aids
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono">
                        0.00
                      </td>
                    </tr>
                    <tr className="bg-sky-50/60 font-bold text-sky-950 border-t border-sky-200">
                      <td className="py-3 px-4">TOTAL EXTERNAL SOURCES</td>
                      <td className="py-3 px-4 text-center font-mono font-bold">
                        264.69
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Table 3: Expenditures */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              4. Current Operating Expenditures
            </h3>
            <div className="overflow-x-auto border border-gray-200 rounded-xl">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase">
                  <tr>
                    <th className="py-3 px-4">Functional Sector / Service</th>
                    <th className="py-3 px-4 text-center w-40">Amount (₱M)</th>
                    <th className="py-3 px-4 text-center w-28">Share %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50 font-semibold text-gray-900">
                    <td className="py-2.5 px-4">
                      General Public Services (Administration, Treasury,
                      Assessor)
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono font-bold">
                      204.58
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono">71.7%</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="py-2.5 px-4 text-gray-700 pl-8">
                      • Health, Nutrition & Population Control
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono">23.63</td>
                    <td className="py-2.5 px-4 text-center font-mono text-gray-500">
                      8.3%
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="py-2.5 px-4 text-gray-700 pl-8">
                      • Education, Culture & Sports / Manpower
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono">12.05</td>
                    <td className="py-2.5 px-4 text-center font-mono text-gray-500">
                      4.2%
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="py-2.5 px-4 text-gray-700 pl-8">
                      • Social Services & Social Welfare Assistance
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono">7.88</td>
                    <td className="py-2.5 px-4 text-center font-mono text-gray-500">
                      2.8%
                    </td>
                  </tr>
                  <tr className="bg-purple-50/50 font-semibold text-purple-950">
                    <td className="py-2.5 px-4">Total Social Services</td>
                    <td className="py-2.5 px-4 text-center font-mono font-bold">
                      43.56
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono">15.3%</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 font-semibold text-gray-900">
                    <td className="py-2.5 px-4">
                      Economic Services (Agriculture, Public Market,
                      Infrastructure)
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono font-bold">
                      27.19
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono">9.5%</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 font-semibold text-gray-900">
                    <td className="py-2.5 px-4">
                      Debt Service (Interest Expense & Bank Charges)
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono font-bold">
                      10.17
                    </td>
                    <td className="py-2.5 px-4 text-center font-mono">3.6%</td>
                  </tr>
                  <tr className="bg-amber-50/70 font-bold text-amber-950 border-t border-amber-200">
                    <td className="py-3 px-4">
                      TOTAL CURRENT OPERATING EXPENDITURES
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-base">
                      285.51
                    </td>
                    <td className="py-3 px-4 text-center font-mono">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 4: Capital Outlays & Balances */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                5. Capital Outlay & Investments
              </h3>
              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4 text-center w-36">
                        Amount (₱M)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-4 text-gray-700">
                        Property, Plant & Equipment (Assets)
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono font-bold">
                        52.59
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-4 text-gray-700">
                        Debt Securities of Other Entities
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono">
                        0.00
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-4 text-gray-700">
                        Debt Service (Principal Cost)
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono">
                        0.00
                      </td>
                    </tr>
                    <tr className="bg-indigo-50/60 font-bold text-indigo-950 border-t border-indigo-200">
                      <td className="py-3 px-4">TOTAL CAPITAL OUTLAYS</td>
                      <td className="py-3 px-4 text-center font-mono font-bold">
                        52.59
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                6. Fund / Cash Balance Reconciliation
              </h3>
              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase">
                    <tr>
                      <th className="py-3 px-4">Cash Position Flow</th>
                      <th className="py-3 px-4 text-center w-36">
                        Amount (₱M)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-4 text-gray-700">
                        Beginning Cash Balance (Jan 1, 2025)
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono">
                        102.27
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-4 text-emerald-700 font-medium">
                        + Net Increase in Funds
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono text-emerald-700 font-bold">
                        +16.00
                      </td>
                    </tr>
                    <tr className="bg-gray-50/70 font-semibold text-gray-900">
                      <td className="py-2.5 px-4">
                        = Total Fund/Cash Available
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono font-bold">
                        118.27
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-4 text-rose-700">
                        Less: Payment of Prior Year A/P
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono text-rose-700 font-bold">
                        -8.99
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-2.5 px-4 text-amber-700">
                        Less: Continuing Appropriations
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono text-amber-700 font-bold">
                        -20.23
                      </td>
                    </tr>
                    <tr className="bg-purple-50 font-bold text-purple-950 border-t border-purple-200">
                      <td className="py-3 px-4">FUND / CASH BALANCE, END</td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-base text-purple-900">
                        89.05
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CITIZEN INSIGHTS */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-sky-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-2 text-sky-800 font-bold text-sm mb-2">
                <Building2 className="w-4 h-4 text-sky-600" />
                <span>🏛️ NTA Dependency: 74.7% of Operating Income</span>
              </div>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                National Tax Allotment (₱264.55M) continues to be the
                municipality’s foundational revenue backbone. Local sources
                contributed ₱89.42M (25.3%), showing room for increased local
                autonomy through ongoing digitalization of local business
                permits and land assessment tax administration.
              </p>
            </div>

            <div className="bg-white border border-emerald-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>🏪 Business Tax Outpaces Property Tax</span>
              </div>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                Local business tax generated <strong>₱38.24M</strong>, making it
                Morong's single largest local revenue generator. This exceeded
                combined Real Property Tax collections (₱24.40M combined across
                the General Fund and Special Education Fund).
              </p>
            </div>

            <div className="bg-white border border-purple-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-2 text-purple-800 font-bold text-sm mb-2">
                <Heart className="w-4 h-4 text-purple-600" />
                <span>🏥 Health Prioritized in Social Spending (54.2%)</span>
              </div>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                Out of ₱43.56M dedicated to social services, more than half—
                <strong>₱23.63M (54.2%)</strong>—funded municipal health
                centers, nutrition drives, and maternal programs. Education and
                sports received ₱12.05M (27.7%), while social welfare assistance
                accounted for ₱7.88M (18.1%).
              </p>
            </div>

            <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-2">
                <Coins className="w-4 h-4 text-amber-600" />
                <span>🏗️ ₱52.59M Capital Investments & Liquid Solvency</span>
              </div>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                The municipality mobilized ₱52.59M directly for Property, Plant,
                and Equipment outlays. Despite capital investments and settling
                ₱8.99M in prior-year accounts payable, Morong closed FY 2025
                with <strong>₱89.05M</strong> in liquid cash reserves.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-xs sm:text-sm text-blue-900 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">
                About the Statement of Receipts and Expenditures (SRE):
              </span>
              <p className="mt-1 leading-relaxed text-blue-800">
                The SRE is the official public finance monitoring system
                required by the Department of Finance and BLGF for all
                Philippine LGUs. Preliminary reports reflect un-audited
                quarterly submissions. Official final balances are subject to
                the annual audit report (AAR) conducted independently by the
                Commission on Audit (COA).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
