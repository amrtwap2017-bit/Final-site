/* ══════════════════════════════════════════════════════════════════
   TRIANGLE BLACK — Root Application Component
   src/App.tsx

   Responsibilities:
   ├── Language state (EN / AR)
   ├── RTL / LTR direction management
   ├── Scroll tracking & section animation
   ├── Active tab / navigation state
   ├── Service pre-fill (Services → Contact)
   └── Lazy-loaded component tree
══════════════════════════════════════════════════════════════════ */

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  lazy,
  Suspense,
} from 'react';

// ── Data & Types ──────────────────────────────────────────────────
import { translations, type Lang } from './data/content';

// ── Eagerly Loaded (Critical Path) ───────────────────────────────
// These components are needed immediately — no lazy loading
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar }        from './components/Navbar';

// ── Lazily Loaded (Below the Fold) ───────────────────────────────
// Each section loads only when needed — improves initial bundle size
const Hero         = lazy(() =>
  import('./components/Hero').then(m => ({ default: m.Hero }))
);
const Highlight    = lazy(() =>
  import('./components/Highlight').then(m => ({ default: m.Highlight }))
);
const About        = lazy(() =>
  import('./components/About').then(m => ({ default: m.About }))
);
const Services     = lazy(() =>
  import('./components/Services').then(m => ({ default: m.Services }))
);
const Projects     = lazy(() =>
  import('./components/Projects').then(m => ({ default: m.Projects }))
);
const Testimonials = lazy(() =>
  import('./components/Testimonials').then(m => ({ default: m.Testimonials }))
);
const Contact      = lazy(() =>
  import('./components/Contact').then(m => ({ default: m.Contact }))
);
const Footer       = lazy(() =>
  import('./components/Footer').then(m => ({ default: m.Footer }))
);
const WhatsAppWidget = lazy(() =>
  import('./components/WhatsAppWidget').then(m => ({ default: m.WhatsAppWidget }))
);

// ── Constants ─────────────────────────────────────────────────────
const SCROLL_THRESHOLD      = 80;    // px before navbar gets backdrop
const SECTION_REVEAL_OFFSET = 0.85;  // 85% viewport height trigger

// ── Fallback UI ───────────────────────────────────────────────────
const SectionFallback = () => (
  <div
    className="min-h-screen bg-black"
    aria-hidden="true"
  />
);

// ══════════════════════════════════════════════════════════════════
// APP COMPONENT
// ══════════════════════════════════════════════════════════════════
export default function App() {

  // ── State ──────────────────────────────────────────────────────
  const [currentLang,    setCurrentLang]    = useState<Lang>('en');
  const [activeTab,      setActiveTab]      = useState<string>('home');
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [prefilledService, setPrefilledService] = useState<string>('');

  // ── Derived ────────────────────────────────────────────────────
  const t = translations[currentLang];

  // ── Refs ───────────────────────────────────────────────────────
  const tickingRef          = useRef<boolean>(false);
  const lastScrollYRef      = useRef<number>(0);
  const lastScrollTimeRef   = useRef<number>(Date.now());

  // ── Effect: HTML lang + dir ────────────────────────────────────
  useEffect(() => {
    const html = document.documentElement;
    const isArabic = currentLang === 'ar';

    html.lang = currentLang;
    html.dir  = isArabic ? 'rtl' : 'ltr';

    // Swap body font for Arabic
    document.body.style.fontFamily = isArabic
      ? "var(--font-arabic)"
      : "var(--font-sans)";
  }, [currentLang]);

  // ── Effect: Page title per language ───────────────────────────
  useEffect(() => {
    document.title =
      currentLang === 'ar'
        ? 'تراينجل بلاك | هندسة الضيافة الفاخرة'
        : 'Triangle Black | Luxury Hospitality Engineering';
  }, [currentLang]);

  // ── Scroll Handler ─────────────────────────────────────────────
  const updateActiveSection = useCallback(() => {
    const scrollY        = window.scrollY;
    const windowHeight   = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const now            = Date.now();

    // ── Scroll progress (0 → 1) for CSS custom property
    const maxScroll     = Math.max(documentHeight - windowHeight, 1);
    const scrollProgress = Math.min(scrollY / maxScroll, 1);

    // ── Scroll velocity for parallax / effects
    const timeDelta  = Math.max(now - lastScrollTimeRef.current, 1);
    const posDelta   = scrollY - lastScrollYRef.current;
    const velocity   = Math.abs(posDelta / timeDelta);

    lastScrollYRef.current    = scrollY;
    lastScrollTimeRef.current = now;

    // ── Update CSS custom properties
    const html = document.documentElement;
    html.style.setProperty('--scroll-progress', scrollProgress.toFixed(4));
    html.style.setProperty('--scroll-velocity', Math.min(velocity, 1).toFixed(4));

    // ── Navbar scrolled state
    if (scrollY > SCROLL_THRESHOLD) {
      html.classList.add('scrolled');
    } else {
      html.classList.remove('scrolled');
    }

    // ── Section reveal animation
    const sections = document.querySelectorAll<HTMLElement>('[data-section]');
    const triggerLine = windowHeight * SECTION_REVEAL_OFFSET;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= triggerLine) {
        section.classList.add('is-visible');
      }
    });

    // ── Active nav tab based on scroll position
    const navSections = ['home', 'about', 'services', 'projects', 'testimonials', 'contact'];

    for (let i = navSections.length - 1; i >= 0; i--) {
      const id = navSections[i];
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= windowHeight * 0.4) {
          setActiveTab(id);
          break;
        }
      }
    }

    // Reset home tab when at top
    if (scrollY < windowHeight * 0.5) {
      setActiveTab('home');
    }

    tickingRef.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    if (!tickingRef.current) {
      window.requestAnimationFrame(updateActiveSection);
      tickingRef.current = true;
    }
  }, [updateActiveSection]);

  // ── Effect: Scroll listener ────────────────────────────────────
  useEffect(() => {
    // Run once on mount to set initial states
    updateActiveSection();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, updateActiveSection]);

  // ── Effect: Keyboard accessibility (Escape closes modals etc.) ─
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Future: close any open modals/drawers
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ── Navigation Handler ─────────────────────────────────────────
  const handleSetTab = useCallback((tabId: string) => {
    setActiveTab(tabId);

    if (tabId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(tabId);
    if (el) {
      // Offset for fixed navbar height (~80px)
      const navbarHeight = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  // ── Service Pre-fill Handler ───────────────────────────────────
  const handleSelectService = useCallback((serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    setActiveTab('contact');

    // Small delay to ensure state updates before scroll
    requestAnimationFrame(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const navbarHeight = 80;
        const top =
          contactSection.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }, []);

  // ── Loading Complete Handler ───────────────────────────────────
  const handleLoadingComplete = useCallback(() => {
    setInitialLoading(false);

    // Re-trigger section checks after loading screen removed
    requestAnimationFrame(() => {
      updateActiveSection();
    });
  }, [updateActiveSection]);

  // ══════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════
  return (
    <div
      className="bg-black min-h-screen text-white"
      id="app-root"
    >

      {/* ── Loading Screen (unmounts after animation) ── */}
      {initialLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* ── Skip Navigation (Accessibility) ── */}
      <a
        href="#main-content"
        className="skip-nav"
        aria-label="Skip to main content"
      >
        {currentLang === 'ar' ? 'تخطى إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>

      {/* ── Navbar (always visible, critical path) ── */}
      <Navbar
        currentLang={currentLang}
        setLang={setCurrentLang}
        activeTab={activeTab}
        setActiveTab={handleSetTab}
        t={t}
      />

      {/* ── Main Content (lazy loaded sections) ── */}
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<SectionFallback />}>

          {/* Hero — above fold, highest priority */}
          <section id="home" aria-label="Hero">
            <Hero
              t={t}
              setActiveTab={handleSetTab}
              currentLang={currentLang}
            />
          </section>

          {/* Highlight — brand differentiators */}
          <section id="highlight" aria-label="Highlights">
            <Highlight
              t={t}
              currentLang={currentLang}
            />
          </section>

          {/* About */}
          <section id="about" aria-label="About Triangle Black">
            <About
              t={t}
              currentLang={currentLang}
            />
          </section>

          {/* Services */}
          <section id="services" aria-label="Our Services">
            <Services
              t={t}
              currentLang={currentLang}
              onSelectService={handleSelectService}
            />
          </section>

          {/* Projects */}
          <section id="projects" aria-label="Our Projects">
            <Projects
              t={t}
              currentLang={currentLang}
            />
          </section>

          {/* Testimonials */}
          <section id="testimonials" aria-label="Client Testimonials">
            <Testimonials
              t={t}
              currentLang={currentLang}
            />
          </section>

          {/* Contact */}
          <section id="contact" aria-label="Contact Us">
            <Contact
              t={t}
              currentLang={currentLang}
              prefilledService={prefilledService}
            />
          </section>

        </Suspense>
      </main>

      {/* ── Footer (lazy, below fold) ── */}
      <Suspense fallback={null}>
        <Footer
          t={t}
          currentLang={currentLang}
          setActiveTab={handleSetTab}
        />
      </Suspense>

      {/* ── WhatsApp Float Widget ── */}
      <Suspense fallback={null}>
        <WhatsAppWidget
          t={t}
          currentLang={currentLang}
        />
      </Suspense>

    </div>
  );
}
