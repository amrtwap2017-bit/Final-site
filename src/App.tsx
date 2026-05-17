import {
  useState,
  useRef,
  useCallback,
  useEffect,
  lazy,
  Suspense,
} from 'react';

import { translations, Lang } from './data/content';

import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';

// Lazy Sections
const Hero = lazy(() =>
  import('./components/Hero').then((m) => ({ default: m.Hero }))
);

const Highlight = lazy(() =>
  import('./components/Highlight').then((m) => ({
    default: m.Highlight,
  }))
);

const About = lazy(() =>
  import('./components/About').then((m) => ({
    default: m.About,
  }))
);

const Services = lazy(() =>
  import('./components/Services').then((m) => ({
    default: m.Services,
  }))
);

const Projects = lazy(() =>
  import('./components/Projects').then((m) => ({
    default: m.Projects,
  }))
);

const Testimonials = lazy(() =>
  import('./components/Testimonials').then((m) => ({
    default: m.Testimonials,
  }))
);

const Contact = lazy(() =>
  import('./components/Contact').then((m) => ({
    default: m.Contact,
  }))
);

const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({
    default: m.Footer,
  }))
);

const WhatsAppWidget = lazy(() =>
  import('./components/WhatsAppWidget').then((m) => ({
    default: m.WhatsAppWidget,
  }))
);

export default function App() {
  // ─────────────────────────────
  // STATE
  // ─────────────────────────────
  const [currentLang, setCurrentLang] = useState<Lang>('en');
  const [activeTab, setActiveTab] = useState('home');
  const [initialLoading, setInitialLoading] = useState(true);
  const [prefilledService, setPrefilledService] = useState('');

  const tickingRef = useRef(false);

  const t = translations[currentLang];

  // ─────────────────────────────
  // HTML ATTRIBUTES
  // ─────────────────────────────
  useEffect(() => {
    const html = document.documentElement;

    html.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    html.lang = currentLang;
  }, [currentLang]);

  // ─────────────────────────────
  // SCROLL OPTIMIZATION
  // ─────────────────────────────
  const updateActiveSection = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const scrollProgress =
      scrollY / (documentHeight - windowHeight);

    document.documentElement.style.setProperty(
      '--scroll-progress',
      scrollProgress.toString()
    );

    document.documentElement.classList.toggle(
      'scrolled',
      scrollY > 80
    );

    const sections =
      document.querySelectorAll<HTMLElement>(
        '[data-section]'
      );

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      if (rect.top <= windowHeight * 0.85) {
        section.classList.add('is-visible');
      }
    });

    tickingRef.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      tickingRef.current = true;

      requestAnimationFrame(updateActiveSection);
    }
  }, [updateActiveSection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    updateActiveSection();

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, [handleScroll, updateActiveSection]);

  // ─────────────────────────────
  // NAVIGATION
  // ─────────────────────────────
  const handleSetTab = useCallback(
    (tabId: string) => {
      setActiveTab(tabId);

      const target =
        tabId === 'home'
          ? document.body
          : document.getElementById(tabId);

      target?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
    []
  );

  // ─────────────────────────────
  // SERVICE PREFILL
  // ─────────────────────────────
  const handleSelectService = useCallback(
    (serviceTitle: string) => {
      setPrefilledService(serviceTitle);

      handleSetTab('contact');
    },
    [handleSetTab]
  );

  // ─────────────────────────────
  // RENDER
  // ─────────────────────────────
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Loading */}
      {initialLoading && (
        <LoadingScreen
          onComplete={() =>
            setInitialLoading(false)
          }
        />
      )}

      {/* Navbar */}
      <Navbar
        currentLang={currentLang}
        setLang={setCurrentLang}
        activeTab={activeTab}
        setActiveTab={handleSetTab}
        t={t}
      />

      {/* Main */}
      <Suspense
        fallback={
          <div className="min-h-screen bg-black" />
        }
      >
        <main>
          <Hero
            t={t}
            setActiveTab={handleSetTab}
            currentLang={currentLang}
          />

          <Highlight
            t={t}
            currentLang={currentLang}
          />

          <About
            t={t}
            currentLang={currentLang}
          />

          <Services
            t={t}
            currentLang={currentLang}
            onSelectService={handleSelectService}
          />

          <Projects
            t={t}
            currentLang={currentLang}
          />

          <Testimonials
            t={t}
            currentLang={currentLang}
          />

          <Contact
            t={t}
            currentLang={currentLang}
            prefilledService={prefilledService}
          />
        </main>

        <Footer
          t={t}
          currentLang={currentLang}
          setActiveTab={handleSetTab}
        />

        <WhatsAppWidget
          t={t}
          currentLang={currentLang}
        />
      </Suspense>
    </div>
  );
}