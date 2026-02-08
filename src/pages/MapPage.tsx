import { Heading } from '../components/ui/Heading';
import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Card, CardContent } from '../components/ui/Card';
import SEO from '../components/SEO';
import { MapPin, Mountain, Compass, Ruler } from 'lucide-react';

const geographyFacts = [
  {
    icon: MapPin,
    label: 'Region',
    value: 'CALABARZON (Region IV-A)',
  },
  {
    icon: Ruler,
    label: 'Land Area',
    value: '37.58 km² (14.51 sq mi)',
  },
  {
    icon: Mountain,
    label: 'Average Elevation',
    value: '44 meters (144 ft)',
  },
  {
    icon: Compass,
    label: 'Peak Elevation',
    value: '272 meters (892 ft)',
  },
];

const boundaries = [
  { direction: 'North', neighbors: 'Barangays San Jose and San Juan' },
  { direction: 'South', neighbors: 'Cardona' },
  { direction: 'East', neighbors: 'Laguna Bay' },
  { direction: 'West', neighbors: 'Barangay Bombongan' },
];

export default function MapPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Map', href: '/map' },
  ];

  return (
    <>
      <SEO
        title="Map of Morong, Rizal"
        description="Explore the geography and location of Morong, Rizal - a landlocked municipality in CALABARZON region covering 37.58 square kilometers."
        keywords="Morong map, Rizal map, CALABARZON, geography, location"
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" items={breadcrumbs} />

        <Heading className="mb-6">Map & Geography</Heading>

        {/* Interactive Map */}
        <Card className="mb-8 overflow-hidden">
          <div className="relative w-full h-[400px] md:h-[500px]">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=121.18000%2C14.47000%2C121.28000%2C14.55000&layer=mapnik&marker=14.5117%2C121.2319"
              className="absolute inset-0 w-full h-full border-0"
              title="Map of Morong, Rizal"
              loading="lazy"
              allowFullScreen
            />
          </div>
          <CardContent className="bg-gray-50 border-t">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-medium text-gray-900">Morong, Rizal</p>
                <p className="text-sm text-gray-600">
                  Coordinates: 14°30′42″N 121°13′55″E
                </p>
              </div>
              <a
                href="https://www.openstreetmap.org/?mlat=14.5117&mlon=121.2319#map=13/14.5117/121.2319"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                <MapPin className="w-4 h-4 mr-2" />
                View Larger Map
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Geography Facts */}
        <Heading level={2} className="mb-6">
          Geographic Details
        </Heading>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {geographyFacts.map((fact, index) => {
            const IconComponent = fact.icon;
            return (
              <Card key={index} className="text-center p-6">
                <IconComponent className="w-8 h-8 mx-auto mb-3 text-primary-600" />
                <div className="text-sm text-gray-500 mb-1">{fact.label}</div>
                <div className="font-semibold text-gray-900">{fact.value}</div>
              </Card>
            );
          })}
        </div>

        {/* Boundaries */}
        <Heading level={2} className="mb-6">
          Municipal Boundaries
        </Heading>
        <Card className="mb-8">
          <CardContent>
            <p className="text-gray-600 mb-6">
              Morong is a landlocked municipality situated in the province of
              Rizal, within the CALABARZON region of the Philippines. It
              accounts for 3.18% of Rizal's total area, with a population
              density of 1,893 inhabitants per square kilometer (2020).
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {boundaries.map((boundary, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-gray-50 rounded-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                    <Compass className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {boundary.direction}
                    </div>
                    <div className="text-sm text-gray-600">
                      {boundary.neighbors}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="bg-gradient-to-br from-blue-50 to-primary-50">
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                <Mountain className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Terrain & Climate
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Morong features varied terrain with elevations ranging from
                  sea level (0 meters) to a peak of 272 meters. The municipality
                  enjoys a tropical climate typical of the CALABARZON region,
                  with distinct wet and dry seasons.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
