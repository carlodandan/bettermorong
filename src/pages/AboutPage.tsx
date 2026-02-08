import { Heading } from '../components/ui/Heading';
import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import SEO from '../components/SEO';
import {
  Users,
  MapPin,
  GraduationCap,
  Building2,
  User,
  Phone,
} from 'lucide-react';

const barangays = [
  {
    name: 'San Pedro (Poblacion)',
    description:
      'The poblacion barangay, housing the main offices of the Local Government of Morong.',
  },
  {
    name: 'Bombongan',
    description: 'A residential and agricultural community in western Morong.',
  },
  {
    name: 'Can-Cal-Lan (CCL)',
    description:
      'A growing barangay known for its blend of residential and commercial areas.',
  },
  {
    name: 'Lagundi',
    description: 'A barangay with a mix of agricultural and residential zones.',
  },
  {
    name: 'Maybancal',
    description:
      'Comprises 10 sitios with a predominantly agricultural community.',
  },
  {
    name: 'San Guillermo',
    description:
      'An agricultural community that celebrates San Isidro Labrador every May 15.',
  },
  {
    name: 'San Jose',
    description: 'A barangay in the northern part of the municipality.',
  },
  {
    name: 'San Juan',
    description: 'A vibrant barangay bordering the northern areas of Morong.',
  },
];

const officials = [
  { position: 'Mayor', name: 'Hon. Sidney B. Soriano' },
  { position: 'Vice Mayor', name: 'Hon. Joeven G. Condez' },
];

const councilMembers = [
  'Hon. Eliseo A. Abary',
  'Hon. Felix R. Marcelino',
  'Hon. Leonardo S. Pantaleon',
  'Hon. Ireneo M. Pascual',
  'Hon. Randall Harold S. Pascual',
  'Hon. Elpidio S. San Juan II',
  'Hon. Radney A. San Luis',
  'Hon. Matt Anthony G. Sy',
];

export default function AboutPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About Morong', href: '/about' },
  ];

  return (
    <>
      <SEO
        title="About Morong, Rizal"
        description="Learn about Morong, Rizal - a historic municipality in CALABARZON region with 8 barangays and a population of 71,151."
        keywords="Morong Rizal, about Morong, barangays, government, municipality"
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" items={breadcrumbs} />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white mb-12">
          <Heading className="text-white mb-4">Bayan ng Morong, Rizal</Heading>
          <p className="text-xl text-primary-100 mb-6 max-w-3xl">
            "Una Ang Edukasyon" — Education First
          </p>
          <p className="text-primary-50 max-w-3xl leading-relaxed">
            Morong is a first-class municipality in the province of Rizal,
            Philippines. Known as one of the eight rays of the Philippine flag,
            it has been an educational hub since the Spanish colonial era.
          </p>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="text-center p-6">
            <Users className="w-8 h-8 mx-auto mb-3 text-primary-600" />
            <div className="text-2xl font-bold text-gray-900">71,151</div>
            <div className="text-sm text-gray-600">Population (2020)</div>
          </Card>
          <Card className="text-center p-6">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-primary-600" />
            <div className="text-2xl font-bold text-gray-900">37.58 km²</div>
            <div className="text-sm text-gray-600">Land Area</div>
          </Card>
          <Card className="text-center p-6">
            <Building2 className="w-8 h-8 mx-auto mb-3 text-primary-600" />
            <div className="text-2xl font-bold text-gray-900">8</div>
            <div className="text-sm text-gray-600">Barangays</div>
          </Card>
          <Card className="text-center p-6">
            <GraduationCap className="w-8 h-8 mx-auto mb-3 text-primary-600" />
            <div className="text-2xl font-bold text-gray-900">1572</div>
            <div className="text-sm text-gray-600">Year Founded</div>
          </Card>
        </div>

        {/* Government Officials */}
        <Heading level={2} className="mb-6">
          Municipal Government
        </Heading>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {officials.map((official, index) => (
            <Card key={index} className="flex items-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                <User className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <div className="font-semibold text-lg text-gray-900">
                  {official.name}
                </div>
                <div className="text-primary-600 font-medium">
                  {official.position}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mb-12">
          <CardHeader>
            <Heading level={3} className="mb-0">
              Sangguniang Bayan (Municipal Council)
            </Heading>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {councilMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <Phone className="w-4 h-4 text-primary-600 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{member}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Barangays */}
        <Heading level={2} className="mb-6">
          The 8 Barangays
        </Heading>
        <div className="grid md:grid-cols-2 gap-4">
          {barangays.map((barangay, index) => (
            <Card key={index} hoverable className="p-5">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {barangay.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {barangay.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
