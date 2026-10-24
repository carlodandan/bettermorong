import { Printer, RotateCcw, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useChecklist } from '../../context/ChecklistContext';
import { useTranslation } from '../../hooks/useTranslation';

export default function ServiceGuideToolbar() {
  const { totalCount, completedCount, resetChecklist } = useChecklist();
  const { t } = useTranslation();

  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isAllReady = totalCount > 0 && completedCount === totalCount;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="mb-6 bg-gray-50/80 border border-gray-200 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs md:text-sm print:hidden">
      {/* Left: Checklist Progress */}
      {totalCount > 0 ? (
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-1.5 font-semibold text-gray-800">
            <CheckCircle2
              className={`w-4 h-4 ${
                isAllReady ? 'text-emerald-600' : 'text-primary-600'
              }`}
            />
            <span>
              {t(
                'serviceGuide.requirementsReady',
                '{{completed}} of {{total}} requirements ready',
                { completed: completedCount, total: totalCount }
              )}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-20 sm:w-28 bg-gray-200 rounded-full h-2 overflow-hidden shrink-0">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                isAllReady ? 'bg-emerald-600' : 'bg-primary-600'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <span
            className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              isAllReady
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-primary-100 text-primary-800'
            }`}
          >
            {percentage}%
          </span>

          {/* Reset Button (only shown when at least 1 item is checked) */}
          {completedCount > 0 && (
            <button
              type="button"
              onClick={resetChecklist}
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 font-medium transition cursor-pointer ml-1"
              title="Clear saved checkmarks for this guide"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t('serviceGuide.resetChecklist', 'Reset Checklist')}</span>
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
          <ShieldCheck className="w-4 h-4 text-primary-600 shrink-0" />
          <span>
            {t(
              'serviceGuide.checklistEnabled',
              'Morong Citizen Service Guide • Interactive Checklist Enabled'
            )}
          </span>
        </div>
      )}

      {/* Right: Print / Save PDF Button */}
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-lg text-xs font-semibold shadow-2xs hover:border-gray-400 transition cursor-pointer shrink-0 self-start sm:self-auto"
        aria-label="Print this guide or save as PDF"
      >
        <Printer className="w-3.5 h-3.5 text-gray-600" />
        <span>{t('serviceGuide.printGuide', 'Print Guide / Save PDF')}</span>
      </button>
    </div>
  );
}
