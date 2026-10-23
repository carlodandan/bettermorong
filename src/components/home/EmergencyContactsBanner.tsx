import { Link } from 'react-router';

export default function EmergencyContactsBanner() {
  return (
    <section
      className="bg-primary-900 text-white py-8 border-y border-primary-800"
      aria-labelledby="emergency-contacts-title"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-md">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-200 bg-primary-800/80 px-2.5 py-0.5 rounded-full border border-primary-700/60 inline-block">
              Immediate Assistance
            </span>
            <h2
              id="emergency-contacts-title"
              className="text-xl sm:text-2xl font-bold mt-1 text-white"
            >
              24/7 Morong Emergency Hotlines
            </h2>
            <p className="text-sm text-primary-100 mt-1">
              Direct dispatch for disaster response, emergency medical
              assistance, peace & order, and fire rescue in Morong, Rizal.
            </p>
            <Link
              to="/philippines-hotlines"
              className="inline-flex items-center text-xs sm:text-sm font-semibold text-primary-200 hover:text-white mt-2 transition-colors underline underline-offset-2"
            >
              View all National &amp; Philippines Hotlines →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 shrink-0">
            <div className="bg-primary-950/70 border border-primary-800/80 rounded-lg p-3">
              <span className="text-xs font-semibold text-primary-200 block uppercase tracking-wider">
                MDRRMO 24/7
              </span>
              <a
                href="tel:09171350541"
                className="text-sm sm:text-base font-bold text-white hover:text-primary-200 block mt-0.5 transition-colors font-mono"
                aria-label="Call Morong MDRRMO at 0917-135-0541"
              >
                0917-135-0541
              </a>
              <span className="text-xs text-primary-300 block mt-0.5">
                (02) 7212-5741
              </span>
            </div>

            <div className="bg-primary-950/70 border border-primary-800/80 rounded-lg p-3">
              <span className="text-xs font-semibold text-primary-200 block uppercase tracking-wider">
                Police (PNP)
              </span>
              <a
                href="tel:09065130718"
                className="text-sm sm:text-base font-bold font-mono text-white hover:text-primary-200 block mt-0.5 transition-colors"
                aria-label="Call Morong Police Station at 0906-513-0718"
              >
                0906-513-0718
              </a>
              <span className="text-xs text-primary-300 block mt-0.5">
                0998-598-5725
              </span>
            </div>

            <div className="bg-primary-950/70 border border-primary-800/80 rounded-lg p-3">
              <span className="text-xs font-semibold text-primary-200 block uppercase tracking-wider">
                Fire (BFP)
              </span>
              <a
                href="tel:09084417754"
                className="text-sm sm:text-base font-bold font-mono text-white hover:text-primary-200 block mt-0.5 transition-colors"
                aria-label="Call Morong Fire Station at 0908-441-7754"
              >
                0908-441-7754
              </a>
              <span className="text-xs text-primary-300 block mt-0.5">
                0945-710-6766
              </span>
            </div>

            <div className="bg-primary-950/70 border border-primary-800/80 rounded-lg p-3">
              <span className="text-xs font-semibold text-primary-200 block uppercase tracking-wider">
                National Dispatch
              </span>
              <a
                href="tel:911"
                className="text-sm sm:text-base font-bold text-white hover:text-primary-200 block mt-0.5 transition-colors"
                aria-label="Call National Emergency 911"
              >
                911
              </a>
              <span className="text-xs text-primary-300 block mt-0.5">
                Toll-free 24/7
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
