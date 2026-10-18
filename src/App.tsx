import { NuqsAdapter } from 'nuqs/adapters/react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ScrollToTop from './components/ui/ScrollToTop';
import Services from './pages/Services';
import Document from './pages/Document';
import Government from './pages/Government';
import Search from './pages/Search';
import Hotlines from './pages/Hotlines';
import Holidays from './pages/Holidays';
import Sitemap from './pages/Sitemap';
import Accessibility from './pages/Accessibility';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <NuqsAdapter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services/:category" element={<Services />} />
              <Route path="/services" element={<Services />} />
              <Route
                path="/services/:category/:documentSlug"
                element={<Document categoryType="service" />}
              />
              <Route path="/government/:category" element={<Government />} />
              <Route path="/government" element={<Government />} />
              <Route
                path="/government/:category/:documentSlug"
                element={<Document categoryType="government" />}
              />
              <Route path="/search" element={<Search />} />
              <Route path="/philippines/hotlines" element={<Hotlines />} />
              <Route path="/hotlines" element={<Hotlines />} />
              <Route path="/philippines/holidays" element={<Holidays />} />
              <Route path="/holidays" element={<Holidays />} />
              <Route
                path="/about"
                element={<Navigate to="/government/about-morong" replace />}
              />
              <Route
                path="/about-morong"
                element={<Navigate to="/government/about-morong" replace />}
              />
              <Route
                path="/government/about"
                element={<Navigate to="/government/about-morong" replace />}
              />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="/:lang/:documentSlug" element={<Document />} />
              <Route path="/:documentSlug" element={<Document />} />
            </Routes>
            <Footer />
          </div>
        </NuqsAdapter>
      </Router>
    </HelmetProvider>
  );
}

export default App;
