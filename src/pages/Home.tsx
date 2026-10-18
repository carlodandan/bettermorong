import Hero from '../components/sections/Hero';
import ServicesSection from '../components/home/ServicesSection';
import MorongWeatherWidget from '../components/home/MorongWeatherWidget';
import EmergencyContactsBanner from '../components/home/EmergencyContactsBanner';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import MunicipalHallMapSection from '../components/home/MunicipalHallMapSection';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Citizen-first portal of BetterMorong (Municipality of Morong, Rizal). Direct access to local public services, offices, ordinances, health programs, and community assistance."
        keywords="BetterMorong, Morong Rizal, citizen portal, Morong services, local government, civic services"
      />
      <main className="flex-grow">
        <Hero />
        <ServicesSection limit={4} />
        <EmergencyContactsBanner />
        <GovernmentActivitySection />
        <MunicipalHallMapSection />
        <MorongWeatherWidget />
      </main>
    </>
  );
};

export default Home;
