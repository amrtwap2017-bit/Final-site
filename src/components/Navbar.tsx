import React, { useState, useEffect } from 'react';
import logo from '../assets/Logo.png';
import { Translation } from '../data/content';
import { Globe, Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
interface NavbarProps {
  currentLang: 'en' | 'ar' | 'it';
  setLang: (lang: 'en' | 'ar' | 'it') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  t: Translation;
}
export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  setLang,
  activeTab,
  setActiveTab,
  t,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.lang-dropdown')) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  const navItems = [
    { id: 'home',     label: t.nav.home     },
    { id: 'about',    label: t.nav.about    },
    { id: 'services', label: t.nav.services },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact',  label: t.nav.contact  },
  ];
  // ✅ FIX: Added `flag` property that was referenced in JSX but missing from the object
  const languages: Record<'en' | 'ar' | 'it', { label: string; flag: string }> = {
    en: { label: 'English',  flag: '🇺🇸' },
    ar: { label: 'العربية',  flag: '🇪🇬' },
    it: { label: 'Italiano', flag: '🇮🇹' },
  };
  function handleNavClick(id: string) {
    setActiveTab(id);
    setMobileMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const section = document.getElementById(id);
    if (section) {
      const navbarHeight = 80;
      const sectionTop =
        section.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: sectionTop, behavior: 'smooth' });
    }
  }
  function handleLangChange(lang: 'en' | 'ar' | 'it') {
    setLang(lang);
    setLangDropdownOpen(false);
  }
  const isRTL = currentLang === 'ar';
  return (
    <header
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 sm:h-[72px] md:h-20 flex items-center justify-between">
        {/* ══════════════════════════
            LOGO + BRAND
        ══════════════════════════ */}
        <button
          onClick={() => handleNavClick('home')}
          className="focus:outline-none group flex items-center gap-2 flex-shrink-0"
        >
          {/* Logo */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-[#d4af37]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
            <img
              src={logo}
              alt="logo"
              className="relative z-10 object-contain select-none
                         w-16 h-16 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-28 xl:h-28 2xl:w-30 2xl:h-30
                         transition-all duration-500
                         group-hover:scale-105 group-hover:brightness-110
                         drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]
                         group-hover:drop-shadow-[0_0_35px_rgba(212,175,55,0.45)]"
            />
          </div>
          {/* Brand Text */}
          <div className="flex flex-col justify-center leading-tight">
            <span
              className={`font-bold text-[#d4af37] uppercase font-serif
                          whitespace-nowrap
                          text-[13px] sm:text-sm md:text-base
                          ${isRTL
                            ? 'tracking-normal'
                            : 'tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.2em]'
                          }`}
            >
              {t.title}
            </span>
            <span
              className={`font-medium text-white/55
                          uppercase whitespace-nowrap
                          text-[10px] md:text-[11px] hidden sm:block
                          ${isRTL
                            ? 'tracking-normal'
                            : 'tracking-[0.2em] sm:tracking-[0.28em] md:tracking-[0.35em]'
                          }`}
            >
              {t.subtitle}
            </span>
            {/* Gold divider */}
            <div className="h-px mt-1 bg-gradient-to-r from-[#d4af37]/60 via-[#d4af37]/20 to-transparent" />
          </div>
        </button>
        {/* ══════════════════════════
            DESKTOP NAV
        ══════════════════════════ */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3 lg:px-4 py-2.5
                            text-[10px] lg:text-[11px] uppercase
                            font-medium transition-all duration-300
                            rounded-sm group focus:outline-none
                            ${isRTL ? 'tracking-normal' : 'tracking-[0.18em] lg:tracking-[0.22em]'}
                            ${isActive ? 'text-[#d4af37]' : 'text-neutral-400 hover:text-white'}`}
              >
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px
                               bg-gradient-to-r from-transparent via-[#d4af37] to-transparent
                               transition-all duration-300 ${
                    isActive
                      ? 'w-4/5 opacity-100'
                      : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50'
                  }`}
                />
                {item.label}
              </button>
            );
          })}
        </nav>
        {/* ══════════════════════════
            RIGHT CONTROLS
        ══════════════════════════ */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
          {/* Language Dropdown */}
          <div className="relative lang-dropdown">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className={`
                inline-flex items-center gap-1 sm:gap-1.5
                bg-neutral-900/80 border border-neutral-800/80
                rounded-lg px-2 sm:px-3 py-1.5 sm:py-2
                hover:bg-neutral-800/80 hover:border-[#d4af37]/40
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30
                ${langDropdownOpen ? 'ring-2 ring-[#d4af37]/30' : ''}
              `}
            >
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#d4af37]/70 flex-shrink-0" />
              <span className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wider">
                {currentLang}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${
                  langDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {/* Dropdown Menu */}
            {langDropdownOpen && (
              <div
                className="absolute top-full mt-2 right-0 w-40 sm:w-44
                            bg-neutral-900/95 backdrop-blur-xl
                            border border-neutral-800/80 rounded-lg
                            shadow-2xl shadow-black/60
                            overflow-hidden z-50"
              >
                {(Object.keys(languages) as Array<'en' | 'ar' | 'it'>).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLangChange(lang)}
                    className={`
                      w-full px-3 sm:px-4 py-2.5 sm:py-3
                      flex items-center gap-2.5 sm:gap-3
                      text-left transition-all duration-200
                      ${currentLang === lang
                        ? 'bg-[#d4af37]/10 text-[#d4af37] border-l-2 border-[#d4af37]'
                        : 'text-neutral-300 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                      }
                    `}
                  >
                    {/* ✅ FIX: flag is now properly defined in the languages object */}
                    <span className="text-lg sm:text-xl">{languages[lang].flag}</span>
                    <span className="text-xs sm:text-sm font-medium">
                      {languages[lang].label}
                    </span>
                    {currentLang === lang && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* CTA Desktop */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`hidden sm:inline-flex items-center gap-1.5 lg:gap-2
                       text-[9px] lg:text-[10px] font-bold uppercase
                       bg-gradient-to-r from-[#d4af37] to-[#e6ca65] text-black
                       px-3 lg:px-5 py-2 lg:py-2.5 rounded-full
                       hover:shadow-lg hover:shadow-[#d4af37]/25
                       transition-all duration-300 hover:scale-105 active:scale-95
                       whitespace-nowrap
                       ${isRTL ? 'tracking-normal' : 'tracking-[0.15em]'}`}
          >
            <span>Quote</span>
            <ArrowRight className={`${isRTL ? "rotate-180" : ""} w-3 h-3`} />
          </button>
          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden h-11 w-11 rounded-lg
                       flex items-center justify-center
                       text-neutral-400 hover:text-[#d4af37]
                       hover:bg-white/5 transition-all duration-200
                       focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen
              ? <X    className="w-5 h-5" />
              : <Menu className="w-5 h-5" />
            }
          </button>
        </div>
      </div>
      {/* ══════════════════════════════════
          MOBILE DRAWER
      ══════════════════════════════════ */}
      <div
        className={`md:hidden absolute top-full left-0 w-full
                    bg-black/98 backdrop-blur-2xl
                    border-b border-neutral-800/60
                    shadow-2xl shadow-black/60
                    transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 sm:px-6 py-5 flex flex-col gap-1.5 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {/* Gold accent */}
          <div className="h-px w-full bg-gradient-to-r from-[#d4af37]/60 via-[#d4af37]/20 to-transparent mb-3" />
          {/* Brand name in mobile drawer */}
          <div className="px-4 pb-3 mb-1 border-b border-neutral-800/60">
            <p className="text-[#d4af37] font-bold font-serif text-base uppercase tracking-wider">
              {t.title}
            </p>
            <p className="text-white/40 text-[9px] uppercase tracking-widest mt-0.5">
              {t.subtitle}
            </p>
          </div>
          {/* Nav Links */}
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full px-4 py-3.5 rounded-xl
                          uppercase text-sm font-medium
                          transition-all duration-200
                          flex items-center justify-between
                          ${isRTL
                            ? 'flex-row-reverse text-right tracking-normal'
                            : 'text-left tracking-[0.15em]'
                          }
                          ${activeTab === item.id
                            ? 'text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/20'
                            : 'text-neutral-300 hover:text-white hover:bg-white/5'
                          }`}
            >
              <span>{item.label}</span>
              {activeTab === item.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] flex-shrink-0" />
              )}
            </button>
          ))}
          {/* Mobile CTA */}
          <button
            onClick={() => handleNavClick('contact')}
            className="mt-3 w-full inline-flex items-center justify-center gap-2
                       px-4 py-3.5 rounded-full
                       bg-gradient-to-r from-[#d4af37] to-[#e6ca65]
                       text-black uppercase text-[11px] font-bold
                       tracking-[0.18em]
                       hover:shadow-lg hover:shadow-[#d4af37]/30
                       transition-all duration-300 active:scale-95"
          >
            <span>Get a Quote</span>
            <ArrowRight className={`${isRTL ? "rotate-180" : ""} w-4 h-4`} />
          </button>
          {/* iOS safe area */}
          <div className="h-6" />
        </div>
      </div>
    </header>
  );
};