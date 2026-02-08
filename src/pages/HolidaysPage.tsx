import { Heading } from '../components/ui/Heading';
import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import SEO from '../components/SEO';
import {
  Calendar,
  PartyPopper,
  Church,
  Music,
  Utensils,
  Star,
} from 'lucide-react';

const localFestivals = [
  {
    name: 'Town Fiesta',
    date: 'First Sunday of February',
    description:
      'The primary town fiesta of Morong, celebrating the municipality with parades, cultural shows, and community gatherings.',
    icon: PartyPopper,
    highlight: true,
  },
  {
    name: 'Feast of Saint Jerome',
    date: 'September 15 & 30',
    description:
      'Honoring the patron saint of Morong. September 30 is designated as a "Special Day" in the municipality.',
    icon: Church,
    highlight: true,
  },
  {
    name: 'Sanrok sa Ringring Festival',
    date: 'December',
    description:
      'Celebrates Morong\'s distinctive linguistic heritage and culinary traditions. The name translates to "ladle on the wall," reflecting the unique D-to-R sound substitution in the local Teresian-Morong Tagalog dialect.',
    icon: Utensils,
    highlight: true,
  },
  {
    name: 'Feast of San Isidro Labrador',
    date: 'May 15',
    description:
      'Celebrated annually in Barangay San Guillermo, honoring the patron saint of farmers with processions and blessing of crops.',
    icon: Star,
  },
  {
    name: 'Holy Week (Pabasa)',
    date: 'March/April (varies)',
    description:
      'Traditional Holy Week activities including "Pabasa," the ceremonial chanting of the life and Passion of Christ.',
    icon: Church,
  },
  {
    name: 'Float Festival',
    date: 'Various dates',
    description:
      'A colorful parade featuring decorated floats representing different barangays and organizations.',
    icon: Music,
  },
];

const nationalHolidays = [
  { date: 'January 1', name: "New Year's Day", type: 'Regular' },
  { date: 'February 25', name: 'EDSA Revolution Anniversary', type: 'Special' },
  { date: 'April 9', name: 'Araw ng Kagitingan', type: 'Regular' },
  { date: 'May 1', name: 'Labor Day', type: 'Regular' },
  { date: 'June 12', name: 'Independence Day', type: 'Regular' },
  { date: 'August 21', name: 'Ninoy Aquino Day', type: 'Special' },
  { date: 'August 26', name: 'National Heroes Day', type: 'Regular' },
  { date: 'November 1', name: "All Saints' Day", type: 'Special' },
  { date: 'November 30', name: 'Bonifacio Day', type: 'Regular' },
  { date: 'December 25', name: 'Christmas Day', type: 'Regular' },
  { date: 'December 30', name: 'Rizal Day', type: 'Regular' },
];

export default function HolidaysPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Holidays & Festivals', href: '/holidays' },
  ];

  return (
    <>
      <SEO
        title="Holidays & Festivals - Morong, Rizal"
        description="Discover the vibrant festivals and holidays of Morong, Rizal including Town Fiesta, Sanrok sa Ringring Festival, and Feast of Saint Jerome."
        keywords="Morong festivals, Sanrok sa Ringring, Town Fiesta, Saint Jerome, Philippine holidays"
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" items={breadcrumbs} />

        <Heading className="mb-2">Holidays & Festivals</Heading>
        <p className="text-gray-600 mb-8 max-w-2xl">
          Experience the rich cultural heritage of Morong through its vibrant
          festivals and traditional celebrations throughout the year.
        </p>

        {/* Featured Festivals */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white mb-12">
          <div className="flex items-center gap-3 mb-4">
            <PartyPopper className="w-8 h-8" />
            <span className="text-purple-100 font-medium">Local Festivals</span>
          </div>
          <Heading level={2} className="text-white mb-4">
            Sanrok sa Ringring Festival
          </Heading>
          <p className="text-purple-100 max-w-2xl leading-relaxed">
            Morong's unique December festival celebrates the municipality's
            distinctive linguistic heritage and culinary traditions. The
            festival name, meaning "ladle on the wall," reflects the local
            dialect's characteristic D-to-R sound substitution.
          </p>
        </div>

        {/* Local Festivals */}
        <Heading level={2} className="mb-6">
          Local Celebrations
        </Heading>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {localFestivals.map((festival, index) => {
            const IconComponent = festival.icon;
            return (
              <Card
                key={index}
                hoverable
                className={
                  festival.highlight ? 'border-l-4 border-l-primary-500' : ''
                }
              >
                <CardHeader className="pb-0 border-none">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        festival.highlight ? 'bg-primary-100' : 'bg-gray-100'
                      }`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${
                          festival.highlight
                            ? 'text-primary-600'
                            : 'text-gray-600'
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {festival.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-primary-600 font-medium">
                        <Calendar className="w-4 h-4" />
                        {festival.date}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 pl-16">{festival.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* National Holidays */}
        <Heading level={2} className="mb-6">
          Philippine National Holidays
        </Heading>
        <Card>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {nationalHolidays.map((holiday, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-primary-600 border border-gray-200">
                      {holiday.date.split(' ')[0].substring(0, 3)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {holiday.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {holiday.date}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      holiday.type === 'Regular'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {holiday.type}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Section>
    </>
  );
}
