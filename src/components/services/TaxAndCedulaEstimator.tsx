import { useState, useId } from 'react';
import {
  Calculator,
  ShieldCheck,
  Info,
  RotateCcw,
  Receipt,
  Building,
  UserCheck,
  AlertCircle,
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export interface TaxAndCedulaEstimatorProps {
  defaultTab?: 'cedula' | 'rpt';
}

function formatPhp(amount: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function TaxAndCedulaEstimator({
  defaultTab = 'cedula',
}: TaxAndCedulaEstimatorProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'cedula' | 'rpt'>(defaultTab);

  // Unique IDs for form accessibility
  const incomeInputId = useId();
  const propertyAssessedId = useId();
  const latePaymentId = useId();
  const delinquentMonthsId = useId();
  const rptAssessedId = useId();
  const promptDiscountId = useId();

  // Tab 1: Cedula State
  const [grossIncome, setGrossIncome] = useState<number>(300000);
  const [cedulaPropertyAssessed, setCedulaPropertyAssessed] =
    useState<number>(0);
  const [isLatePayment, setIsLatePayment] = useState<boolean>(false);
  const [delinquentMonths, setDelinquentMonths] = useState<number>(1);

  // Tab 2: RPT State
  const [rptAssessedValue, setRptAssessedValue] = useState<number>(250000);
  const [applyPromptDiscount, setApplyPromptDiscount] = useState<boolean>(true);

  // --- Cedula Calculations (RA 7160 Sec 157 & 161) ---
  const BASIC_COMMUNITY_TAX = 5; // Basic PHP 5.00
  // PHP 1.00 for every PHP 1,000 of gross income (capped at PHP 5,000)
  const additionalIncomeTax = Math.min(
    5000,
    Math.floor(Math.max(0, grossIncome) / 1000)
  );
  // PHP 1.00 for every PHP 1,000 of real property assessed value (capped at PHP 5,000)
  const additionalPropertyTax = Math.min(
    5000,
    Math.floor(Math.max(0, cedulaPropertyAssessed) / 1000)
  );
  const cedulaSubtotal =
    BASIC_COMMUNITY_TAX + additionalIncomeTax + additionalPropertyTax;
  // Late payment penalty: 2% per month of delay after the last day of February
  const cedulaPenalty = isLatePayment
    ? cedulaSubtotal * (0.02 * Math.max(1, delinquentMonths))
    : 0;
  const cedulaTotal = cedulaSubtotal + cedulaPenalty;

  // --- RPT Calculations (RA 7160 Sec 233 & 235) ---
  // Provincial Basic RPT rate for municipalities = 1%
  const basicRptRate = 0.01;
  // Special Education Fund (SEF) rate = 1%
  const sefRate = 0.01;
  const safeRptAssessed = Math.max(0, rptAssessedValue);
  const basicRptAmount = safeRptAssessed * basicRptRate;
  const sefAmount = safeRptAssessed * sefRate;
  const rptGrossTotal = basicRptAmount + sefAmount; // 2% total
  // Prompt payment discount: standard 10%
  const discountRate = applyPromptDiscount ? 0.1 : 0;
  const discountAmount = rptGrossTotal * discountRate;
  const rptNetTotal = Math.max(0, rptGrossTotal - discountAmount);
  const rptQuarterly = rptNetTotal / 4;

  const handleResetCedula = () => {
    setGrossIncome(300000);
    setCedulaPropertyAssessed(0);
    setIsLatePayment(false);
    setDelinquentMonths(1);
  };

  const handleResetRpt = () => {
    setRptAssessedValue(250000);
    setApplyPromptDiscount(true);
  };

  return (
    <div className="my-8 bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden print:border-gray-300">
      {/* Header with Title and Privacy Badge */}
      <div className="bg-linear-to-r from-blue-900 via-primary-800 to-primary-700 text-white p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-lg">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {t('estimator.title', 'Morong Municipal Tax & Fee Estimator')}
              </h3>
              <p className="text-xs text-blue-100">
                {t(
                  'estimator.subtitle',
                  'Instant client-side estimates for Cedula (CTC) and Real Property Tax (Amilyar)'
                )}
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-emerald-200 shrink-0 self-start sm:self-auto">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>
              {t('estimator.privacyBadge', '100% Client-Side • Private')}
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mt-5 border-b border-white/20 pb-0">
          <button
            type="button"
            onClick={() => setActiveTab('cedula')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition border-b-2 cursor-pointer ${
              activeTab === 'cedula'
                ? 'bg-white text-gray-900 border-white shadow-xs'
                : 'text-blue-100 hover:text-white border-transparent hover:bg-white/10'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{t('estimator.tabCedula', 'Individual Cedula (CTC)')}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rpt')}
            className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-t-lg transition border-b-2 cursor-pointer ${
              activeTab === 'rpt'
                ? 'bg-white text-gray-900 border-white shadow-xs'
                : 'text-blue-100 hover:text-white border-transparent hover:bg-white/10'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>{t('estimator.tabRpt', 'Real Property Tax (Amilyar)')}</span>
          </button>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="p-5 sm:p-6">
        {/* Tab 1: Cedula Estimator */}
        {activeTab === 'cedula' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Column: Form Inputs */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={incomeInputId}
                      className="text-xs font-bold text-gray-800 uppercase tracking-wide"
                    >
                      {t(
                        'estimator.grossIncomeLabel',
                        'Annual Gross Earnings / Salary (Preceding Year)'
                      )}
                    </label>
                    <span className="text-[11px] text-gray-500">
                      ₱1.00 per ₱1,000 income
                    </span>
                  </div>
                  <div className="mt-1 relative rounded-lg shadow-2xs">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 font-semibold text-sm">
                      ₱
                    </span>
                    <input
                      id={incomeInputId}
                      type="number"
                      min={0}
                      step={5000}
                      value={grossIncome || ''}
                      onChange={e =>
                        setGrossIncome(Number(e.target.value) || 0)
                      }
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. 300000"
                    />
                  </div>
                  {/* Preset quick buttons */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[11px] text-gray-500 self-center mr-1">
                      {t('estimator.presets', 'Presets:')}
                    </span>
                    {[
                      { label: '₱180k (Minimum)', val: 180000 },
                      { label: '₱360k (Standard)', val: 360000 },
                      { label: '₱600k (Mid-level)', val: 600000 },
                      { label: '₱5.0M+ (Max Cap)', val: 5000000 },
                    ].map(preset => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => setGrossIncome(preset.val)}
                        className="text-[11px] px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Property Assessed Value */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={propertyAssessedId}
                      className="text-xs font-bold text-gray-800 uppercase tracking-wide"
                    >
                      {t(
                        'estimator.propertyAssessedLabel',
                        'Real Property Owned in PH (Assessed Value, Optional)'
                      )}
                    </label>
                    <span className="text-[11px] text-gray-500">
                      ₱1.00 per ₱1,000 value
                    </span>
                  </div>
                  <div className="mt-1 relative rounded-lg shadow-2xs">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 font-semibold text-sm">
                      ₱
                    </span>
                    <input
                      id={propertyAssessedId}
                      type="number"
                      min={0}
                      step={10000}
                      value={cedulaPropertyAssessed || ''}
                      onChange={e =>
                        setCedulaPropertyAssessed(Number(e.target.value) || 0)
                      }
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="0 if none"
                    />
                  </div>
                </div>

                {/* Late Payment Toggle */}
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={latePaymentId}
                      className="text-xs font-semibold text-gray-800 flex items-center gap-1.5 cursor-pointer"
                    >
                      <input
                        id={latePaymentId}
                        type="checkbox"
                        checked={isLatePayment}
                        onChange={e => setIsLatePayment(e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-4 h-4"
                      />
                      <span>
                        {t(
                          'estimator.latePaymentLabel',
                          'Paid after last day of February (Late Filing Penalty)'
                        )}
                      </span>
                    </label>
                  </div>

                  {isLatePayment && (
                    <div className="pl-6 pt-1 flex items-center gap-3">
                      <label
                        htmlFor={delinquentMonthsId}
                        className="text-xs text-gray-600 font-medium"
                      >
                        {t('estimator.delinquentMonths', 'Months Delayed:')}
                      </label>
                      <select
                        id={delinquentMonthsId}
                        value={delinquentMonths}
                        onChange={e =>
                          setDelinquentMonths(Number(e.target.value))
                        }
                        className="text-xs border border-gray-300 rounded-md py-1 px-2 text-gray-900 bg-white"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => (
                          <option key={m} value={m}>
                            {m} month{m > 1 ? 's' : ''} ({m * 2}% penalty)
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleResetCedula}
                  className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{t('estimator.resetValues', 'Reset to defaults')}</span>
                </button>
              </div>

              {/* Right Column: Breakdown Card */}
              <div className="flex-1 bg-blue-50/60 border border-blue-200 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                    <span className="text-xs font-bold uppercase text-blue-900 flex items-center gap-1.5">
                      <Receipt className="w-4 h-4 text-primary-700" />
                      {t('estimator.statutoryBreakdown', 'Itemized Breakdown')}
                    </span>
                    <span className="text-[11px] text-blue-800 font-medium">
                      RA 7160 Sec. 157
                    </span>
                  </div>

                  <dl className="divide-y divide-blue-100 text-xs sm:text-sm py-2">
                    <div className="py-2 flex justify-between">
                      <dt className="text-gray-700">
                        {t('estimator.basicTax', 'Basic Community Tax')}
                      </dt>
                      <dd className="font-semibold text-gray-900">
                        {formatPhp(BASIC_COMMUNITY_TAX)}
                      </dd>
                    </div>
                    <div className="py-2 flex justify-between">
                      <dt className="text-gray-700">
                        {t(
                          'estimator.incomeAdditional',
                          'Income Component (₱1/₱1,000)'
                        )}
                        {additionalIncomeTax >= 5000 && (
                          <span className="text-[10px] text-amber-700 font-bold ml-1 bg-amber-100 px-1 py-0.2 rounded">
                            {t('estimator.maxCap', 'MAX CAP')}
                          </span>
                        )}
                      </dt>
                      <dd className="font-semibold text-gray-900">
                        {formatPhp(additionalIncomeTax)}
                      </dd>
                    </div>
                    {additionalPropertyTax > 0 && (
                      <div className="py-2 flex justify-between">
                        <dt className="text-gray-700">
                          {t(
                            'estimator.propertyAdditional',
                            'Real Property Component'
                          )}
                        </dt>
                        <dd className="font-semibold text-gray-900">
                          {formatPhp(additionalPropertyTax)}
                        </dd>
                      </div>
                    )}
                    <div className="py-2 flex justify-between font-medium text-gray-800">
                      <dt>{t('estimator.subtotal', 'Tax Subtotal')}</dt>
                      <dd>{formatPhp(cedulaSubtotal)}</dd>
                    </div>
                    {isLatePayment && (
                      <div className="py-2 flex justify-between text-red-700">
                        <dt>
                          {t('estimator.penalty', 'Late Interest (2%/mo)')} (
                          {delinquentMonths * 2}%)
                        </dt>
                        <dd className="font-semibold">
                          +{formatPhp(cedulaPenalty)}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="pt-4 border-t border-blue-200 mt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-gray-700 uppercase">
                      {t('estimator.estimatedDue', 'Estimated Total Due')}
                    </span>
                    <span className="text-2xl font-black text-primary-900">
                      {formatPhp(cedulaTotal)}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    {t(
                      'estimator.cedulaNote',
                      'Statutory maximum additional tax on income is capped at ₱5,000.00 by law.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Real Property Tax (Amilyar) Estimator */}
        {activeTab === 'rpt' && (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Column: Form Inputs */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor={rptAssessedId}
                      className="text-xs font-bold text-gray-800 uppercase tracking-wide"
                    >
                      {t(
                        'estimator.rptAssessedLabel',
                        'Total Property Assessed Value (₱)'
                      )}
                    </label>
                  </div>
                  <div className="mt-1 relative rounded-lg shadow-2xs">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 font-semibold text-sm">
                      ₱
                    </span>
                    <input
                      id={rptAssessedId}
                      type="number"
                      min={0}
                      step={25000}
                      value={rptAssessedValue || ''}
                      onChange={e =>
                        setRptAssessedValue(Number(e.target.value) || 0)
                      }
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. 250000"
                    />
                  </div>

                  {/* Informational Tooltip Box explaining Assessed Value */}
                  <div className="mt-2.5 p-3 bg-blue-50/80 border border-blue-200 rounded-lg flex items-start gap-2 text-xs text-blue-900">
                    <Info className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">
                        {t(
                          'estimator.assessedHelpTitle',
                          'Where to find your Assessed Value:'
                        )}
                      </p>
                      <p className="mt-0.5 text-blue-800 text-[11px] leading-relaxed">
                        {t(
                          'estimator.assessedHelpBody',
                          'Check your official Morong Tax Declaration (TD) under "Assessed Value" (not Market Value). Assessed Value is already scaled by the municipal assessment level (e.g., 20% for residential land).'
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Quick-fill presets for RPT */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <span className="text-[11px] text-gray-500 self-center mr-1">
                      {t('estimator.presets', 'Presets:')}
                    </span>
                    {[
                      { label: '₱100k (Residential Lot)', val: 100000 },
                      { label: '₱250k (House & Lot)', val: 250000 },
                      { label: '₱500k (Improved)', val: 500000 },
                      { label: '₱1.5M (Commercial)', val: 1500000 },
                    ].map(preset => (
                      <button
                        key={preset.val}
                        type="button"
                        onClick={() => setRptAssessedValue(preset.val)}
                        className="text-[11px] px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prompt Payment Discount Toggle */}
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <label
                    htmlFor={promptDiscountId}
                    className="flex items-start gap-2 cursor-pointer"
                  >
                    <input
                      id={promptDiscountId}
                      type="checkbox"
                      checked={applyPromptDiscount}
                      onChange={e => setApplyPromptDiscount(e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-4 h-4 mt-0.5"
                    />
                    <div>
                      <span className="text-xs font-semibold text-gray-900">
                        {t(
                          'estimator.promptDiscountLabel',
                          'Apply Prompt Payment Discount (10% standard early payment)'
                        )}
                      </span>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {t(
                          'estimator.promptDiscountHelp',
                          'Granted by the LGU when full annual amilyar or quarterly dues are settled on or before statutory due dates.'
                        )}
                      </p>
                    </div>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleResetRpt}
                  className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{t('estimator.resetValues', 'Reset to defaults')}</span>
                </button>
              </div>

              {/* Right Column: Breakdown Card */}
              <div className="flex-1 bg-blue-50/60 border border-blue-200 rounded-xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                    <span className="text-xs font-bold uppercase text-blue-900 flex items-center gap-1.5">
                      <Receipt className="w-4 h-4 text-primary-700" />
                      {t('estimator.statutoryBreakdown', 'Itemized Breakdown')}
                    </span>
                    <span className="text-[11px] text-blue-800 font-medium">
                      RA 7160 Sec. 233 & 235
                    </span>
                  </div>

                  <dl className="divide-y divide-blue-100 text-xs sm:text-sm py-2">
                    <div className="py-2 flex justify-between">
                      <dt className="text-gray-700">
                        {t(
                          'estimator.basicRpt',
                          'Basic Real Property Tax (1%)'
                        )}
                      </dt>
                      <dd className="font-semibold text-gray-900">
                        {formatPhp(basicRptAmount)}
                      </dd>
                    </div>
                    <div className="py-2 flex justify-between">
                      <dt className="text-gray-700">
                        {t(
                          'estimator.sef',
                          'Special Education Fund / SEF (1%)'
                        )}
                      </dt>
                      <dd className="font-semibold text-gray-900">
                        {formatPhp(sefAmount)}
                      </dd>
                    </div>
                    <div className="py-2 flex justify-between font-medium text-gray-800">
                      <dt>
                        {t(
                          'estimator.annualGross',
                          'Annual Standard Subtotal (2%)'
                        )}
                      </dt>
                      <dd>{formatPhp(rptGrossTotal)}</dd>
                    </div>
                    {applyPromptDiscount && (
                      <div className="py-2 flex justify-between text-emerald-700">
                        <dt>
                          {t(
                            'estimator.promptDiscount',
                            'Early Payment Discount (10%)'
                          )}
                        </dt>
                        <dd className="font-semibold">
                          -{formatPhp(discountAmount)}
                        </dd>
                      </div>
                    )}
                  </dl>

                  {/* Quarterly Breakdown Schedule */}
                  <div className="mt-3 p-3 bg-white/80 border border-blue-200 rounded-lg text-xs">
                    <span className="font-bold text-gray-800 block mb-1">
                      {t(
                        'estimator.quarterlyInstallments',
                        'Quarterly Installment Schedule (4 Quarters):'
                      )}
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-gray-600">
                      <div>
                        Q1 (on/before Mar 31):{' '}
                        <strong className="text-gray-900">
                          {formatPhp(rptQuarterly)}
                        </strong>
                      </div>
                      <div>
                        Q2 (on/before Jun 30):{' '}
                        <strong className="text-gray-900">
                          {formatPhp(rptQuarterly)}
                        </strong>
                      </div>
                      <div>
                        Q3 (on/before Sep 30):{' '}
                        <strong className="text-gray-900">
                          {formatPhp(rptQuarterly)}
                        </strong>
                      </div>
                      <div>
                        Q4 (on/before Dec 31):{' '}
                        <strong className="text-gray-900">
                          {formatPhp(rptQuarterly)}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-200 mt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-gray-700 uppercase">
                      {t('estimator.netAnnualTax', 'Net Annual Amilyar Due')}
                    </span>
                    <span className="text-2xl font-black text-primary-900">
                      {formatPhp(rptNetTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Official Assessment Disclaimer */}
        <div className="mt-6 p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>
              {t('estimator.disclaimerTitle', 'Official Disclaimer:')}{' '}
            </strong>
            {t(
              'estimator.disclaimerBody',
              'This fee calculator provides indicative estimates based on Republic Act No. 7160 (Local Government Code). Official tax assessments, municipal tax ordinance relief, prior-year delinquency penalties, and official receipts are exclusively processed by the Morong Municipal Treasurer’s Office at Municipal Hall.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
