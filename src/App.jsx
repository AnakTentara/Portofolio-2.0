import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import LoadingPage from './components/LoadingPage';
import NavbarOther from './components/NavbarOther';
import Navbar from './components/Navbar';
import FadeUp from './components/FadeUp';
import DynamicBackground from './components/DynamicBackground';
import InteractiveDivider from './components/InteractiveDivider';

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
import MoreProjects from './components/pages/MoreProjects';
import Project from './components/pages/direct-page/Project';
import NotFound from './components/pages/direct-page/404';

import { PreventInteractions } from './utils/preventInteractions';
import CustomCursor from './components/CustomCursor';

import icongr from '../images/icon-bggradient.png';
import icon from '../images/icon.png';
import porto1 from '../images/screenshot-portofolio.png';
import porto2 from '../images/naturalsmp-screenshot.png';
import porto3 from '../images/1stportofolio.png';
import porto4 from '../images/nanikoregroup.png'

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const profileImages = [
          icongr,
          icon
        ];

        await Promise.all(
          profileImages.map(src => 
            new Promise((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = reject;
            })
          )
        );

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setProfileLoaded(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Profile image loading error:", error);
        setProfileLoaded(true);
        setIsLoading(false);
      }
    };

    const preloadPortfolioImages = () => {
      const portfolioImages = [
        porto1,
        porto2,
        porto3,
        porto4
      ];
      portfolioImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    loadProfileImage();
    preloadPortfolioImages();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      <PreventInteractions />
      <CustomCursor />

      {location.pathname === '/' ? <Navbar /> : <NavbarOther />}

      <Routes>
        <Route path="/" element={
          <DynamicBackground>
            <Hero />
            <InteractiveDivider />
            <FadeUp>
              <About />
            </FadeUp>
            <FadeUp delay={200}>
              <Projects />
            </FadeUp>
            <FadeUp delay={400}>
              <Contact />
            </FadeUp>
          </DynamicBackground>
        } />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/unduh" element={<Unduh />} />
        <Route path="/download" element={<Download />} />
        <Route path="/more-about" element={<MoreAbout />} />
        <Route path="/more" element={<More />} />
        <Route path="/more-projects" element={<MoreProjects />} />
        <Route path="/project" element={<Project />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;