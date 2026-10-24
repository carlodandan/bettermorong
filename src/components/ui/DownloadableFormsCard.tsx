import { FileDown, ExternalLink } from 'lucide-react';
import type { DownloadableForm } from '../../types';
import { useTranslation } from '../../hooks/useTranslation';

export default function DownloadableFormsCard({
  forms,
}: {
  forms: DownloadableForm[];
}) {
  const { t } = useTranslation();

  if (!forms || forms.length === 0) return null;

  return (
    <div className="mb-8 p-5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-3 print:border-gray-400 print:bg-white">
      <div className="flex items-center gap-2">
        <FileDown className="w-5 h-5 text-primary-700 shrink-0" />
        <h3 className="text-base font-bold text-gray-900">
          {t(
            'serviceGuide.downloadableFormsTitle',
            'Official Downloadable Blank Forms & Templates'
          )}
        </h3>
      </div>
      <p className="text-xs text-gray-600">
        {t(
          'serviceGuide.downloadableFormsSubtitle',
          'Print and accomplish these official forms before proceeding to Municipal Hall to save time.'
        )}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {forms.map((form, idx) => {
          const isExternal =
            form.url.startsWith('http://') || form.url.startsWith('https://');

          return (
            <a
              key={idx}
              href={form.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-xs transition group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 uppercase shrink-0">
                  {form.fileType || 'PDF'}
                </span>
                <span className="text-xs font-semibold text-gray-900 group-hover:text-primary-700 truncate">
                  {form.title}
                </span>
              </div>
              {isExternal ? (
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary-600 shrink-0 ml-2" />
              ) : (
                <FileDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary-600 shrink-0 ml-2" />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
