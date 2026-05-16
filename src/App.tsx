import '@fontsource/cormorant-garamond/300.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/cormorant-garamond/300-italic.css';
import '@fontsource/cormorant-garamond/400-italic.css';
import '@fontsource/cormorant-garamond/600-italic.css';
import '@fontsource/cormorant-garamond/700-italic.css';

import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
// ────────────────────────────────────────────────────

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import { useState, useRef, useCallback, useEffect, lazy, Suspense } from 'react'
import { translations, Lang } from './data/content';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
const Hero = lazy(() => import('./components/Hero').then(module => ({ default: module.Hero })));
const Highlight = lazy(() => import('./components/Highlight').then(module => ({ default: module.Highlight })));
const About = lazy(() => import('./components/About').then(module => ({ default: module.About })));
const Services = lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const Projects = lazy(() => import('./components/Projects').then(module => ({ default: module.Projects })));
const Testimonials = lazy(() => import('./components/Testimonials').then(module => ({ default: module.Testimonials })));
const Contact = lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));
const WhatsAppWidget = lazy(() => import('./components/WhatsAppWidget').then(module => ({ default: module.WhatsAppWidget })));

export default function App() {
  // ═══════════════════════ STATE ═══════════════════════
  const [currentLang, setCurrentLang] = useState<Lang>('en');
  const [activeTab, setActiveTab] = useState('home');
  const [initialLoading, setInitialLoading] = useState(true);
  const [prefilledService, setPrefilledService] = useState('');
  const t = translations[currentLang];

  // ═══════════════════════ HTML DIR & LANG ═══════════════════════
  useEffect(() => {
    const html = document.documentElement;
    html.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    html.lang = currentLang;
  }, [currentLang]);

  // ═══════════════════════ SCROLL TRACKING ═══════════════════════
  const tickingRef = useRef(false);
  const updateActiveSection = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;  

    // Calculate how far down the page (0 to 1)
    const scrollProgress = scrollY / (documentHeight - windowHeight);

    // This allows CSS to know scroll position for effects
    document.documentElement.style.setProperty(
      '--scroll-progress',
      scrollProgress.toString()
    );

    // Add class to navbar when user scrolls down
    if (scrollY > 80) {
      document.documentElement.classList.add('scrolled');
    } else {
      document.documentElement.classList.remove('scrolled');
    }

    // Find all sections and animate them in when visible
    const sections = document.querySelectorAll('[data-section]');

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const offset = windowHeight * 0.85;

      if (rect.top <= offset) {
        section.classList.add('is-visible');
      }
    });

    tickingRef.current = false;}, []);

  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      window.requestAnimationFrame(updateActiveSection);
      tickingRef.current = true;
    }
  }, [updateActiveSection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // ═══════════════════════ NAV HANDLER ═══════════════════════
  const handleSetTab = useCallback((tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(tabId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // ═══════════════════════ SERVICE SELECT ═══════════════════════
  const handleSelectService = useCallback((serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    setActiveTab('contact');
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // ═══════════════════════ RENDER ═══════════════════════
  return (
    <div className="bg-black min-h-screen text-white">
      {/* LOADING SCREEN */}
      {initialLoading && (
        <LoadingScreen onComplete={() => setInitialLoading(false)} />
      )}

      {/* NAVBAR */}
      <Navbar
        currentLang={currentLang}
        setLang={setCurrentLang}
        activeTab={activeTab}
        setActiveTab={handleSetTab}
        t={t}
      />

      {/* MAIN CONTENT */}
      <Suspense fallback={<div className='min-h-screen bg-black' />}><main>
        <Hero t={t} setActiveTab={handleSetTab} currentLang={currentLang} />
        <Highlight t={t} currentLang={currentLang} />
        <About t={t} currentLang={currentLang} />
        <Services t={t} currentLang={currentLang} onSelectService={handleSelectService} />
        <Projects t={t} currentLang={currentLang} />
        <Testimonials t={t} currentLang={currentLang} />
        <Contact t={t} currentLang={currentLang} prefilledService={prefilledService} />
      </main></Suspense>

      {/* FOOTER */}
      <Footer t={t} currentLang={currentLang} setActiveTab={handleSetTab} />

      {/* WHATSAPP FLOAT */}
      <WhatsAppWidget t={t} currentLang={currentLang} />
    </div>
  );
}
