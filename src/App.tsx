import { NuqsAdapter } from 'nuqs/adapters/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ScrollToTop from './components/ui/ScrollToTop';
import Services from './pages/Services';
import Document from './pages/Document';
import AboutPage from './pages/AboutPage';
import HistoryPage from './pages/HistoryPage';
import MapPage from './pages/MapPage';
import HotlinesPage from './pages/HotlinesPage';
import HolidaysPage from './pages/HolidaysPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NuqsAdapter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/history" element={<HistoryPage />} />
            <Route path="/about/hotlines" element={<HotlinesPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/holidays" element={<HolidaysPage />} />
            <Route path="/services/:category" element={<Services />} />
            <Route path="/services" element={<Services />} />
            <Route path="/:lang/:documentSlug" element={<Document />} />
            <Route path="/:documentSlug" element={<Document />} />
          </Routes>
          <Footer />
        </div>
      </NuqsAdapter>
    </Router>
  );
}

export default App;
