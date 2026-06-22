import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import PredictionPage from './pages/PredictionPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header / Navigation Bar */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      {/* Main Page Layout Container */}
      <main style={{ flex: 1 }}>
        {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
        {currentPage === 'prediction' && <PredictionPage />}
        {currentPage === 'about' && <AboutPage />}
      </main>

      {/* Footer Branding Component */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
