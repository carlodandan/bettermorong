import { NuqsAdapter } from 'nuqs/adapters/react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import OfflineBanner from './components/layout/OfflineBanner';
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
            <OfflineBanner />
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
              <Route
                path="/budget"
                element={
                  <Navigate
                    to="/government/transparency-documents/blgf-statement-of-receipts-and-expenditures"
                    replace
                  />
                }
              />
              <Route
                path="/forms"
                element={
                  <Navigate
                    to="/government/transparency-documents/downloadable-forms"
                    replace
                  />
                }
              />
              <Route
                path="/government/downloadable-forms"
                element={
                  <Navigate
                    to="/government/transparency-documents/downloadable-forms"
                    replace
                  />
                }
              />
              <Route path="/philippines-hotlines" element={<Hotlines />} />
              <Route path="/philippines-holidays" element={<Holidays />} />
              {/* Backward compatibility redirects */}
              <Route
                path="/philippines/hotlines"
                element={<Navigate to="/philippines-hotlines" replace />}
              />
              <Route
                path="/hotlines"
                element={<Navigate to="/philippines-hotlines" replace />}
              />
              <Route
                path="/philippines/holidays"
                element={<Navigate to="/philippines-holidays" replace />}
              />
              <Route
                path="/holidays"
                element={<Navigate to="/philippines-holidays" replace />}
              />
              <Route
                path="/philippines"
                element={<Navigate to="/philippines-hotlines" replace />}
              />
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
