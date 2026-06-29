import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import LoadingPage from './components/LoadingPage';
import Navbar from './components/Navbar';
import FadeUp from './components/FadeUp';
import DynamicBackground from './components/DynamicBackground';
import InteractiveDivider from './components/InteractiveDivider';

import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';

// Lazy-loaded route pages
const MoreAbout    = lazy(() => import('./components/pages/MoreAbout'));
const Downloads    = lazy(() => import('./components/pages/Downloads'));
const Download     = lazy(() => import('./components/pages/direct-page/Download'));
const Unduh        = lazy(() => import('./components/pages/direct-page/Unduh'));
const MoreProjects = lazy(() => import('./components/pages/MoreProjects'));
const Project      = lazy(() => import('./components/pages/direct-page/Project'));
const NotFound     = lazy(() => import('./components/pages/direct-page/404'));

import icongr from '../images/icon-bggradient.png';
import icon from '../images/icon.png';
import porto1 from '../images/screenshot-portofolio.png';
import porto2 from '../images/naturalsmp-screenshot.png';
import porto3 from '../images/1stportofolio.png';
import porto4 from '../images/nanikoregroup.png';

// Minimal fallback for lazy-loaded pages
const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
    <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-blue-500 animate-spin" />
  </div>
);

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const assets = [icongr, icon, porto1, porto2, porto3, porto4];
    let loadedCount = 0;
    const totalAssets = assets.length;

    if (totalAssets === 0) {
      setLoadingProgress(100);
      setIsLoading(false);
      return;
    }

    const updateProgress = () => {
      loadedCount++;
      const percent = Math.round((loadedCount / totalAssets) * 100);
      setLoadingProgress(percent);
      
      if (loadedCount === totalAssets) {
        // Small delay for clean fade-out transition
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    assets.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
      img.onerror = updateProgress;
    });
  }, []);

  if (isLoading) {
    return <LoadingPage progress={loadingProgress} />;
  }

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      <CustomCursor />
      <ScrollToTop />

      <Navbar />

      <Suspense fallback={<PageFallback />}>
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
          <Route path="/downloads"    element={<Downloads />} />
          <Route path="/unduh"        element={<Unduh />} />
          <Route path="/download"     element={<Download />} />
          <Route path="/more-about"   element={<MoreAbout />} />
          <Route path="/more"         element={<Navigate to="/more-about" replace />} />
          <Route path="/more-projects" element={<MoreProjects />} />
          <Route path="/project"      element={<Project />} />
          <Route path="*"             element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
}

export default App;