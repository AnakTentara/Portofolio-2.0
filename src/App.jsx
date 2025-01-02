import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import LoadingPage from './utils/LoadingPage';
import NavbarOther from './components/NavbarOther';
import Navbar from './components/Navbar';

import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MoreAbout from './components/pages/MoreAbout';
import Downloads from './components/pages/Downloads';
import Download from './components/pages/direct-page/Download';
import Unduh from './components/pages/direct-page/Unduh';
import More from './components/pages/direct-page/More';
import NotFound from './components/pages/direct-page/404';

import { PreventInteractions } from './utils/preventInteractions';

import icongr from '../images/icon-bggradient.png';
import icon from '../images/icon.png';
import porto1 from '../images/screenshot-portofolio.png';
import porto2 from '../images/naturalsmp-screenshot.png';
import porto3 from '../images/1stportofolio.png';
import porto4 from '../images/nanikoregroup.png'

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCriticalAssets = async () => {
      try {
        const criticalImages = [
          icongr,
          icon,
          porto1,
          porto2,
          porto3,
          porto4,
        ];

        await Promise.all(
          criticalImages.map(src => 
            new Promise((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = reject;
            })
          )
        );

        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsLoading(false);
      } catch (error) {
        console.error("Asset loading error:", error);
        setIsLoading(false);
      }
    };

    loadCriticalAssets();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-gray-100">
      <PreventInteractions />

      {location.pathname === '/' ? <Navbar /> : <NavbarOther />}

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Projects />
            <Contact />
          </>
        } />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/unduh" element={<Unduh />} />
        <Route path="/download" element={<Download />} />
        <Route path="/more-about" element={<MoreAbout />} />
        <Route path="/more" element={<More />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;