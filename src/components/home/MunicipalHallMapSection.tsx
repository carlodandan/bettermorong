import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Building2,
  ExternalLink,
} from 'lucide-react';

export default function MunicipalHallMapSection() {
  return (
    <section
      id="municipal-hall-location"
      className="py-12 md:py-16 bg-slate-50 border-t border-gray-200"
      aria-labelledby="map-section-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-700 bg-primary-50 px-3 py-1 rounded-full border border-primary-200 inline-block">
            Location & Visiting Guide
          </span>
          <h2
            id="map-section-heading"
            className="text-2xl md:text-3xl font-bold text-gray-950 mt-2"
          >
            Visit Morong Municipal Hall
          </h2>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            Official seat of municipal governance, frontline civil registry,
            business permits, social welfare, and public administration in
            Morong, Rizal.
          </p>
        </div>

        {/* Two-Column Layout: Details on Left, Map Embed on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Information Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div
                  className="p-2.5 bg-primary-50 text-primary-700 rounded-lg border border-primary-100 shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Official Address
                  </h3>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">
                    Morong Municipal Building
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-0.5">
                    T. Claudio St., Sitio Paglabas, Barangay San Pedro, Morong,
                    Rizal 1960 Philippines
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                <div
                  className="p-2.5 bg-primary-50 text-primary-700 rounded-lg border border-primary-100 shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Public Service Hours
                  </h3>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">
                    Monday to Friday: 8:00 AM – 5:00 PM
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-0.5">
                    No noon break (Continuous frontline transactions pursuant to
                    RA 11032 / Anti-Red Tape Act).
                  </p>
                </div>
              </div>

              {/* Contact Lines */}
              <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                <div
                  className="p-2.5 bg-primary-50 text-primary-700 rounded-lg border border-primary-100 shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Frontline Contact Lines
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-semibold text-gray-900">
                      Administration:
                    </span>{' '}
                    <a
                      href="tel:0287869398"
                      className="text-primary-700 hover:underline font-medium"
                    >
                      (02) 8786-9398
                    </a>
                  </p>
                  <p className="text-sm text-gray-700 mt-0.5">
                    <span className="font-semibold text-gray-900">
                      24/7 Disaster Center:
                    </span>{' '}
                    <a
                      href="tel:09171350541"
                      className="text-primary-700 hover:underline font-medium"
                    >
                      0917-135-0541
                    </a>
                  </p>
                </div>
              </div>

              {/* Key Frontline Offices Summary */}
              <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                <div
                  className="p-2.5 bg-primary-50 text-primary-700 rounded-lg border border-primary-100 shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Building Directory
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    <span className="font-medium text-gray-900">
                      Ground Floor:
                    </span>{' '}
                    Mayor's Office, Treasury, BOSS, Civil Registry, MSWDO,
                    Agriculture (MAO), Engineering, MENRO.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mt-1">
                    <span className="font-medium text-gray-900">
                      2nd Floor:
                    </span>{' '}
                    Sangguniang Bayan, Vice Mayor's Office, MPDO, BAC
                    Secretariat.
                  </p>
                </div>
              </div>
            </div>

            {/* Directions Action Button */}
            <a
              href="https://www.openstreetmap.org/directions?to=14.505458%2C121.235726#map=18/14.505458/121.235726"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Get Directions on OpenStreetMap
            </a>
          </div>

          {/* Map Embed Column (7 cols) */}
          <div className="lg:col-span-7 h-full min-h-[380px] lg:min-h-[460px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=121.2335%2C14.5038%2C121.2380%2C14.5071&layer=mapnik&marker=14.5054578%2C121.2357256"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              loading="lazy"
              title="OpenStreetMap Location of Morong Municipal Hall"
              className="w-full h-full flex-grow"
            />
            <div className="bg-white px-4 py-2 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
              <span>
                ©{' '}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-primary-700"
                >
                  OpenStreetMap contributors
                </a>
              </span>
              <a
                href="https://www.openstreetmap.org/node/10177592817#map=18/14.505413/121.236137"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-primary-700 font-medium inline-flex items-center gap-1"
              >
                <span>View Larger Map</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
