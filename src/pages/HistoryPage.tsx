import { Heading } from '../components/ui/Heading';
import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import SEO from '../components/SEO';
import { Church, Landmark, Flag, BookOpen } from 'lucide-react';

const timeline = [
  {
    year: '1572',
    title: 'Discovery & Founding',
    description:
      'On January 16, Captain Juan Maldonado, under Martin de Goiti, discovered an active community by a river and named it "Moron" after a town in Spain.',
    icon: Flag,
  },
  {
    year: '1578',
    title: 'Christianization Begins',
    description:
      'Franciscan missionaries Juan de Placencia and Diego de Oropesa began the Christianization of indigenous people, establishing chapels that evolved into "Pueblo de Moron."',
    icon: Church,
  },
  {
    year: '1696-1701',
    title: 'Bridge of Morong Built',
    description:
      'The original Bridge of Morong was constructed without metals, using adobe stones, fine sand, lime, molasses, and juice of ground puso-puso leaves.',
    icon: Landmark,
  },
  {
    year: 'Spanish Era',
    title: 'Provincial Capital',
    description:
      'Morong served as the provincial capital for the Franciscan Order and the capital of Politico-Militar Distrito de Morong until 1901.',
    icon: BookOpen,
  },
  {
    year: '1898',
    title: 'Philippine Revolution',
    description:
      'Morong is represented as one of the eight rays on the Philippine flag, signifying provinces that initiated the revolt against Spanish rule.',
    icon: Flag,
  },
];

const landmarks = [
  {
    name: "St. Jerome's Parish Church",
    description:
      'A Spanish-era church noted for its unique Baroque architecture, dedicated to Saint Jerome, the patron saint of Morong.',
    significance: 'Historical Religious Site',
  },
  {
    name: 'Bridge of Morong',
    description:
      'Built between 1696-1701, this remarkable bridge was constructed without metals using traditional materials including adobe stones, lime, molasses, and plant extracts.',
    significance: 'Engineering Heritage',
  },
];

export default function HistoryPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'History', href: '/about/history' },
  ];

  return (
    <>
      <SEO
        title="History of Morong, Rizal"
        description="Explore the rich history of Morong from its founding in 1572 to its role in the Philippine Revolution as one of the eight rays of the flag."
        keywords="Morong history, Philippine history, Spanish colonial, Franciscan missionaries, Bridge of Morong"
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" items={breadcrumbs} />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl p-8 md:p-12 text-white mb-12">
          <Heading className="text-white mb-4">History of Morong</Heading>
          <p className="text-xl text-amber-100 mb-4">
            Over 450 Years of Heritage
          </p>
          <p className="text-amber-50 max-w-3xl leading-relaxed">
            From a riverside settlement discovered by Spanish explorers to one
            of the eight rays of the Philippine flag, Morong has played a
            significant role in shaping Philippine history.
          </p>
        </div>

        {/* Timeline */}
        <Heading level={2} className="mb-8">
          Historical Timeline
        </Heading>
        <div className="relative mb-12">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200 hidden md:block" />

          <div className="space-y-6">
            {timeline.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div key={index} className="relative flex gap-6">
                  {/* Timeline dot */}
                  <div className="hidden md:flex w-16 h-16 rounded-full bg-primary-100 items-center justify-center flex-shrink-0 z-10 border-4 border-white shadow-md">
                    <IconComponent className="w-6 h-6 text-primary-600" />
                  </div>

                  <Card className="flex-1 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-primary-100 text-primary-700">
                        {event.year}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {event.description}
                    </p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Eight Rays Significance */}
        <Card className="mb-12 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-yellow-500 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Flag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">The Eight Rays of the Sun</h3>
                <p className="text-red-100">Philippine Flag Significance</p>
              </div>
            </div>
          </div>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              Morong holds a special place in Philippine history as one of the
              eight provinces that initiated the revolt against Spanish colonial
              rule. This historic significance is represented by the eight rays
              of the sun on the Philippine flag. The original Distrito de Morong
              encompassed several towns now part of Rizal province, and
              historically included areas of present-day Manila, Makati, Cainta,
              Taytay, Pasig, and Angono.
            </p>
          </CardContent>
        </Card>

        {/* Historical Landmarks */}
        <Heading level={2} className="mb-6">
          Historical Landmarks
        </Heading>
        <div className="grid md:grid-cols-2 gap-6">
          {landmarks.map((landmark, index) => (
            <Card key={index} hoverable>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Landmark className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {landmark.name}
                    </h3>
                    <span className="text-sm text-amber-600 font-medium">
                      {landmark.significance}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{landmark.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
