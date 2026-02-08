import { Heading } from '../components/ui/Heading';
import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import SEO from '../components/SEO';
import {
  Shield,
  Flame,
  Stethoscope,
  Building2,
  AlertTriangle,
  Ambulance,
  BadgeCheck,
} from 'lucide-react';

const emergencyHotlines = [
  {
    name: 'National Emergency Hotline',
    number: '911',
    description: 'Police, Fire, Medical Emergency',
    icon: AlertTriangle,
    priority: true,
  },
  {
    name: 'Philippine National Police (PNP)',
    number: '117',
    description: 'Police assistance and crime reporting',
    icon: Shield,
    priority: true,
  },
  {
    name: 'Bureau of Fire Protection',
    number: '(02) 8426-0219',
    description: 'Fire emergencies',
    icon: Flame,
    priority: true,
  },
  {
    name: 'Red Cross',
    number: '143',
    description: 'Medical emergencies and blood services',
    icon: Ambulance,
    priority: true,
  },
];

const municipalHotlines = [
  {
    name: 'Municipal Hall',
    number: '(02) 8653-1234',
    description: 'Main line for local government inquiries',
    icon: Building2,
  },
  {
    name: 'Morong PNP Station',
    number: '(02) 8653-0117',
    description: 'Local police station',
    icon: Shield,
  },
  {
    name: 'Rural Health Unit',
    number: '(02) 8653-5678',
    description: 'Health center and medical services',
    icon: Stethoscope,
  },
  {
    name: 'Municipal DRRMO',
    number: '(02) 8653-9911',
    description: 'Disaster Risk Reduction and Management Office',
    icon: AlertTriangle,
  },
];

const nationalHotlines = [
  { name: 'DOH Health Hotline', number: '1555' },
  { name: 'DSWD Assistance', number: '(02) 8931-8101' },
  { name: 'NBI Hotline', number: '(02) 8523-8231' },
  { name: 'DENR Hotline', number: '(02) 8920-2252' },
  { name: 'BOC Hotline', number: '(02) 8705-6000' },
  { name: 'PAG-ASA Weather', number: '(02) 8927-1335' },
];

export default function HotlinesPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Hotlines', href: '/about/hotlines' },
  ];

  return (
    <>
      <SEO
        title="Emergency Hotlines - Morong, Rizal"
        description="Important emergency and government hotlines for Morong, Rizal residents. Find police, fire, medical, and municipal contact numbers."
        keywords="emergency hotlines, Morong contacts, emergency numbers, PNP, fire department"
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" items={breadcrumbs} />

        <Heading className="mb-2">Emergency Hotlines</Heading>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Important contact numbers for emergencies and government services in
          Morong, Rizal and the Philippines.
        </p>

        {/* Emergency Alert */}
        <Card className="mb-8 border-red-200 bg-red-50">
          <CardContent className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-bold text-red-800 text-lg">
                For Emergencies, Dial 911
              </h3>
              <p className="text-red-700">
                The national emergency hotline connects you to police, fire, and
                medical services 24/7.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Hotlines */}
        <Heading level={2} className="mb-6">
          Emergency Services
        </Heading>
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {emergencyHotlines.map((hotline, index) => {
            const IconComponent = hotline.icon;
            return (
              <Card
                key={index}
                className={`p-5 ${hotline.priority ? 'border-l-4 border-l-red-500' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {hotline.name}
                    </h3>
                    <a
                      href={`tel:${hotline.number.replace(/[^0-9]/g, '')}`}
                      className="text-2xl font-bold text-primary-600 hover:text-primary-700 block mb-1"
                    >
                      {hotline.number}
                    </a>
                    <p className="text-sm text-gray-600">
                      {hotline.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Municipal Hotlines */}
        <Heading level={2} className="mb-6">
          Municipal Government
        </Heading>
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {municipalHotlines.map((hotline, index) => {
            const IconComponent = hotline.icon;
            return (
              <Card key={index} className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {hotline.name}
                    </h3>
                    <a
                      href={`tel:${hotline.number.replace(/[^0-9]/g, '')}`}
                      className="text-xl font-bold text-primary-600 hover:text-primary-700 block mb-1"
                    >
                      {hotline.number}
                    </a>
                    <p className="text-sm text-gray-600">
                      {hotline.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* National Hotlines */}
        <Heading level={2} className="mb-6">
          National Government Hotlines
        </Heading>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <BadgeCheck className="w-6 h-6 text-primary-600" />
              <span className="font-medium text-gray-900">
                Government Agency Contacts
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nationalHotlines.map((hotline, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-700 text-sm">{hotline.name}</span>
                  <a
                    href={`tel:${hotline.number.replace(/[^0-9]/g, '')}`}
                    className="font-semibold text-primary-600 hover:text-primary-700"
                  >
                    {hotline.number}
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
