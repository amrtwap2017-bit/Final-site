import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Translation, resourceLinks as resourceLinksData } from '../data/content';
import {
  ArrowUp,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import logo from '../assets/Logo.png';

interface FooterProps {
  t: Translation;
  setActiveTab: (tab: string) => void;
  currentLang: 'en' | 'ar' | 'it';
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Footer: React.FC<FooterProps> = ({
  t,
  setActiveTab,
  currentLang,
}) => {
  const isRtl = currentLang === 'ar';

  const ctaRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.15 });

  // Get translated resource links
  const translatedResources = resourceLinksData[currentLang] || resourceLinksData.en;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (id: string) => {
    setActiveTab(id);
    if (id === 'home') {
      scrollToTop();
      return;
    }
    const section = document.getElementById(id);
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <footer
      className="relative bg-black overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* ════════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════ */}
      <div className="relative bg-neutral-950 border-t border-white/5">

        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-black" />
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(212,175,55,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.15) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div
          ref={ctaRef}
          className="relative w-[90%] max-w-[1300px] mx-auto py-16 lg:py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative"
          >
            {/* Card border glow */}
            <div
              className="absolute -inset-[1px] rounded-3xl opacity-50"
              style={{
                background:
                  'linear-gradient(135deg, rgba(212,175,55,0.2), transparent 50%, rgba(212,175,55,0.12))',
              }}
            />

            <div
              className="relative overflow-hidden rounded-3xl p-8 lg:p-14
                          border border-neutral-800/50
                          bg-neutral-950/90 backdrop-blur-sm"
            >
              {/* Top accent */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

              {/* Corner ornaments */}
              <div className="absolute top-4 right-4 w-12 h-12 opacity-15 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-[#d4af37] to-transparent" />
                <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-[#d4af37] to-transparent" />
              </div>
              <div className="absolute bottom-4 left-4 w-12 h-12 opacity-15 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#d4af37] to-transparent" />
                <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-[#d4af37] to-transparent" />
              </div>

              {/* Inner glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background:
                    'radial-gradient(ellipse at 80% 20%, rgba(212,175,55,0.08) 0%, transparent 60%)',
                }}
              />

              {/* Background glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <motion.div
                  initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                  animate={ctaInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                >
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-white leading-tight">
                    {t.footer.ctaHeading.split('?')[0].split(' ').slice(0, -1).join(' ')}{' '}
                    <span
                      className="italic"
                      style={{
                        background:
                          'linear-gradient(135deg, #d4af37 0%, #f5e070 45%, #d4af37 100%)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: 'goldShimmer 4s linear infinite',
                      }}
                    >
                      {t.footer.ctaHeading.split('?')[0].split(' ').slice(-1)}
                    </span>
                    ?
                  </h3>
                  <p className="text-neutral-500 font-light max-w-lg text-[13px] leading-[1.8]">
                    {t.footer.ctaDesc}
                  </p>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                  animate={ctaInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleNav('contact')}
                  className="group relative flex items-center gap-3 px-10 py-4
                             text-[11px] tracking-[0.2em] uppercase font-bold
                             rounded-xl overflow-hidden shrink-0"
                  style={{
                    background:
                      'linear-gradient(135deg, #d4af37, #f0d060, #d4af37)',
                    boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
                  }}
                >
                  {/* Shine sweep */}
                  <motion.span
                    className="absolute inset-0 block -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-150%' }}
                    whileHover={{ x: '150%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                  <span className="relative text-black">{t.footer.ctaButton}</span>
                  <ArrowUpRight
                    size={14}
                    className="relative text-black transition-transform duration-300
                               group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </motion.button>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          MAIN FOOTER
      ════════════════════════════════════════════ */}
      <div className="relative bg-black border-t border-neutral-800/30">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black to-neutral-950" />
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, #d4af37 0.5px, transparent 0.5px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Ambient glows */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#d4af37]/[0.02] rounded-full blur-[140px] pointer-events-none" />

        <div
          ref={gridRef}
          className="relative w-[90%] max-w-[1300px] mx-auto pt-16 pb-8"
        >

          {/* ── Footer Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-neutral-800/30">

            {/* ── Col 1: Brand ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="lg:col-span-4 space-y-5"
            >
              {/* Logo */}
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="Triangle Black Logo"
                  className="w-auto h-20 object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.15)]"
                />
                <div className="flex flex-col leading-tight">
                  <span
                    className="text-sm font-bold tracking-[0.25em] uppercase font-serif"
                    style={{
                      background:
                        'linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {t.title}
                  </span>
                  <span className="text-[8px] tracking-[0.3em] uppercase text-neutral-600 font-medium">
                    {t.subtitle}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-neutral-600 text-[12px] font-light leading-[1.8] max-w-sm">
                {t.footer.brandDesc}
              </p>

              {/* OEM Badge */}
              <div className="inline-flex items-center gap-2 bg-neutral-900/60 border border-neutral-800/40 px-3 py-1.5 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/40" />
                <span className="text-[9px] text-neutral-500 font-mono uppercase tracking-[0.15em]">
                  {t.footer.oemBadge}
                </span>
              </div>
            </motion.div>

            {/* ── Col 2: Navigation ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="h-px w-4 bg-[#d4af37]/30" />
                <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37]/50 font-bold font-mono">
                  {t.footer.navTitle}
                </h4>
              </div>
              <ul className="space-y-2.5">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
                    animate={gridInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.15 + i * 0.04,
                      ease: EASE,
                    }}
                  >
                    <button
                      onClick={() => handleNav(item.id)}
                      className="group flex items-center gap-2 text-[11px] text-neutral-600
                                 hover:text-neutral-300 uppercase tracking-[0.15em] font-light
                                 transition-all duration-300"
                    >
                      <ArrowRight className="w-3 h-3 text-[#d4af37]/0 group-hover:text-[#d4af37]/50 transition-all duration-300" />
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* ── Col 3: Services ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="lg:col-span-3"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="h-px w-4 bg-[#d4af37]/30" />
                <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37]/50 font-bold font-mono">
                  {t.footer.servicesTitle}
                </h4>
              </div>
              <ul className="space-y-2.5">
                {[
                  t.services.filterSupplies,
                  t.services.filterProcurement,
                  t.services.filterMaintenance,
                  t.services.filterRenovation,
                ].map((link, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
                    animate={gridInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.25 + i * 0.04,
                      ease: EASE,
                    }}
                  >
                    <button
                      onClick={() => handleNav('services')}
                      className="group flex items-center gap-2 text-[11px] text-neutral-600
                                 hover:text-neutral-300 font-light
                                 transition-all duration-300"
                    >
                      <ArrowRight className="w-3 h-3 text-[#d4af37]/0 group-hover:text-[#d4af37]/50 transition-all duration-300" />
                      {link}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* ── Col 4: Contact + Resources ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="lg:col-span-3"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="h-px w-4 bg-[#d4af37]/30" />
                <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37]/50 font-bold font-mono">
                  {t.contact.directContatto}
                </h4>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:info@triangleblack.com"
                  className="flex items-center gap-3 group"
                >
                  <div
                    className="w-9 h-9 rounded-xl bg-neutral-900/60 border border-neutral-800/40
                               flex items-center justify-center shrink-0
                               group-hover:bg-[#d4af37]/[0.08] group-hover:border-[#d4af37]/20
                               transition-all duration-400"
                  >
                    <Mail size={14} className="text-[#d4af37]/50" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-neutral-500 group-hover:text-neutral-300 font-mono transition-colors duration-300">
                      info@triangleblack.com
                    </span>
                    <span className="block text-[9px] text-neutral-700 mt-0.5">
                      {t.contact.emailSub}
                    </span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+20100000000"
                  className="flex items-center gap-3 group"
                >
                  <div
                    className="w-9 h-9 rounded-xl bg-neutral-900/60 border border-neutral-800/40
                              flex items-center justify-center shrink-0
                              group-hover:bg-[#d4af37]/[0.08] group-hover:border-[#d4af37]/20
                              transition-all duration-400"
                  >
                    <Phone size={14} className="text-[#d4af37]/50" />
                  </div>
                  <div>
                    <span
                      className="block text-[11px] text-neutral-500 group-hover:text-neutral-300 font-mono transition-colors duration-300"
                      dir="ltr"
                      style={{ unicodeBidi: 'isolate' }}
                    >
                      +20 XXX XXX XXXX
                    </span>
                    <span className="block text-[9px] text-neutral-700 mt-0.5">
                      {t.contact.phoneSub}
                    </span>
                  </div>
                </a>


                {/* Location */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl bg-neutral-900/60 border border-neutral-800/40
                               flex items-center justify-center shrink-0"
                  >
                    <MapPin size={14} className="text-[#d4af37]/50" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-neutral-500">
                      {t.contact.headquartersSub}
                    </span>
                    <span className="block text-[9px] text-neutral-700 mt-0.5">
                      {t.contact.headquarters}
                    </span>
                  </div>
                </div>
              </div>

              {/* Resources */}
              <div className="mt-6 pt-5 border-t border-neutral-800/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-3 bg-[#d4af37]/20" />
                  <h4 className="text-[9px] tracking-[0.25em] uppercase text-[#d4af37]/40 font-bold font-mono">
                    {t.footer.resourcesTitle}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {translatedResources.map((link: string, i: number) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 4 }}
                      animate={gridInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: 0.4 + i * 0.04,
                        ease: EASE,
                      }}
                      className="text-[9px] text-neutral-600 px-2.5 py-1 rounded-lg
                                 border border-neutral-800/30 hover:border-[#d4af37]/15
                                 hover:text-neutral-400 hover:bg-[#d4af37]/[0.02]
                                 transition-all duration-300 cursor-pointer font-mono"
                    >
                      {link}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Bottom Bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={gridInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
            {/* Left */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <p className="text-[10px] text-neutral-700 tracking-wider font-mono">
                {t.footer.copyright}
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-[10px] text-neutral-800 hover:text-neutral-500 transition-colors duration-300"
                >
                  {t.footer.privacyPolicy}
                </a>
                <a
                  href="#"
                  className="text-[10px] text-neutral-800 hover:text-neutral-500 transition-colors duration-300"
                >
                  {t.footer.termsOfService}
                </a>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-[9px] text-neutral-800 font-mono uppercase tracking-[0.15em]">
                {t.footer.engineered}
              </span>
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-1.5 px-3 py-2 rounded-xl
                           bg-neutral-900/60 border border-neutral-800/40
                           text-neutral-600 hover:text-[#d4af37]
                           hover:border-[#d4af37]/20 hover:bg-[#d4af37]/[0.05]
                           transition-all duration-300"
                aria-label="Back to Top"
              >
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span className="text-[8px] uppercase tracking-wider hidden sm:inline font-mono">
                  Top
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Fixed Scroll-to-Top Button ── */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full
                   border border-[#d4af37]/20 bg-black/80 backdrop-blur-md
                   text-[#d4af37] flex items-center justify-center
                   shadow-[0_8px_24px_rgba(0,0,0,0.4)]
                   hover:border-[#d4af37]/40 hover:bg-[#d4af37]/5
                   transition-all duration-300"
      >
        <ArrowUp className="w-4 h-4" />
      </motion.button>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes goldShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>
    </footer>
  );
};