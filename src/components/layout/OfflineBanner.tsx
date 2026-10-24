import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { WifiOff, Wifi, PhoneCall, ShieldAlert, X } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function OfflineBanner() {
  const { t } = useTranslation();
  const [isOffline, setIsOffline] = useState(() => {
    return typeof navigator !== 'undefined' ? !navigator.onLine : false;
  });
  const [showReconnected, setShowReconnected] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setDismissed(false);
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
      }, 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
      setShowReconnected(false);
      setDismissed(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (showReconnected) {
    return (
      <aside
        aria-label="Network status"
        className="bg-emerald-700 text-white text-xs sm:text-sm py-2 px-4 shadow-sm z-50 print:hidden animate-fade-in"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-emerald-200 shrink-0" />
            <span className="font-medium">
              {t(
                'offline.reconnected',
                'Connection restored! You are viewing live municipal data.'
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowReconnected(false)}
            className="text-emerald-100 hover:text-white transition p-1"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    );
  }

  if (!isOffline || dismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Offline Mode"
      className="bg-amber-600 text-white text-xs sm:text-sm py-2.5 px-4 shadow-md z-50 print:hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Notice Info */}
        <div className="flex items-start sm:items-center gap-2.5">
          <div className="p-1 bg-amber-700/80 rounded-md shrink-0 mt-0.5 sm:mt-0">
            <WifiOff className="w-4 h-4 text-amber-100" />
          </div>
          <div>
            <span className="font-bold">
              {t('offline.bannerTitle', 'Typhoon / Offline Mode Active')}:{' '}
            </span>
            <span className="text-amber-50">
              {t(
                'offline.bannerMessage',
                'You are currently offline. Emergency hotlines and disaster preparedness guides remain fully cached on your device.'
              )}
            </span>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-2 shrink-0 pl-7 sm:pl-0">
          <Link
            to="/philippines-hotlines"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-md border border-amber-500/50 transition cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t('offline.viewHotlines', 'Hotlines')}</span>
          </Link>
          <Link
            to="/services/disaster-preparedness"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-md border border-amber-500/50 transition cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{t('offline.viewDisasterGuides', 'Disaster Guides')}</span>
          </Link>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1 text-amber-200 hover:text-white transition ml-1 cursor-pointer"
            aria-label="Dismiss offline banner"
            title="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
