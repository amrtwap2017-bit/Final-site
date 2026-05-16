import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Translation, hospitalityClients } from '../data/content';
import {
  CheckCircle2,
  Target,
  Eye,
  Award,
  Settings,
  ArrowRight,
  Shield,
  Zap,
  BadgeCheck,
} from 'lucide-react';

interface AboutProps {
  t: Translation;
  currentLang: 'en' | 'ar' | 'it';
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SOFT: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const About: React.FC<AboutProps> = ({ t, currentLang }) => {
  const isRtl = currentLang === 'ar';

  const headerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.2 });
  const splitInView = useInView(splitRef, { once: true, amount: 0.15 });
  const pillarsInView = useInView(pillarsRef, { once: true, amount: 0.15 });
  const whyInView = useInView(whyRef, { once: true, amount: 0.15 });
  const clientsInView = useInView(clientsRef, { once: true, amount: 0.2 });

  const [activeValue, setActiveValue] = useState(0);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const valuePillars = [
    {
      icon: Target,
      title: t.about.missionTitle,
      desc: t.about.missionDesc,
      accent: 'from-amber-500/20 to-yellow-600/5',
    },
    {
      icon: Eye,
      title: t.about.visionTitle,
      desc: t.about.visionDesc,
      accent: 'from-yellow-500/20 to-amber-600/5',
    },
    {
      icon: Award,
      title: t.about.valuesTitle,
      desc: t.about.valuesDesc,
      accent: 'from-orange-500/15 to-yellow-600/5',
    },
  ];

  const stats = [
    {
      val: '100%',
      label: t.about.statsOem,
      icon: BadgeCheck,
      desc: 'Direct manufacturer partnerships',
    },
    {
      val: '< 4 Hrs',
      label: t.about.statsEmergency,
      icon: Zap,
      desc: 'Critical response guarantee',
    },
    {
      val: 'ISO 9001',
      label: t.about.statsQuality,
      icon: Shield,
      desc: 'International standards compliant',
    },
  ];

  // Auto-cycle value pillars
  useEffect(() => {
    if (!pillarsInView) return;
    const id = setInterval(() => {
      setActiveValue((p) => (p + 1) % valuePillars.length);
    }, 5000);
    return () => clearInterval(id);
  }, [pillarsInView, valuePillars.length]);

  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 bg-neutral-950 overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* ════════════════════════════════════════════
          LAYERED BACKGROUND
      ════════════════════════════════════════════ */}

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(212,175,55,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.12) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#d4af37]/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#d4af37]/[0.025] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-[500px] h-[500px] border border-[#d4af37]/[0.04] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-[350px] h-[350px] border border-[#d4af37]/[0.03] rounded-full pointer-events-none" />

      {/* SVG decorative paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="aboutPath1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M 0 300 Q 300 200, 600 350 T 1200 250 T 1800 400"
          fill="none"
          stroke="url(#aboutPath1)"
          strokeWidth="1"
        />
      </svg>

      {/* Borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent" />

      {/* ════════════════════════════════════════════
          CONTENT
      ════════════════════════════════════════════ */}
      <div className="relative z-10 w-[90%] max-w-[1280px] mx-auto">

        {/* ══════════════════════════════════════
            1. SECTION HEADER
        ══════════════════════════════════════ */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20 lg:mb-24">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="h-px w-10 bg-gradient-to-r from-transparent to-[#d4af37]/60"
              style={{ transformOrigin: 'right' }}
            />
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#d4af37]/[0.06] border border-[#d4af37]/15 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4af37] font-mono">
                {t.about.badge}
              </span>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="h-px w-10 bg-gradient-to-l from-transparent to-[#d4af37]/60"
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-white mb-6"
          >
            {t.about.missionTitle.split(' ').slice(0, -1).join(' ')}{' '}
            <span
              className="italic"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f5e070 45%, #d4af37 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'goldShimmer 4s linear infinite',
              }}
            >
              {t.about.missionTitle.split(' ').slice(-1)}
            </span>
          </motion.h2>

          {/* Underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="w-20 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mx-auto"
          />
        </div>

        {/* ══════════════════════════════════════
            2. SPLIT LAYOUT — IMAGE + CONTENT
        ══════════════════════════════════════ */}
        <div ref={splitRef} className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center mb-28 lg:mb-32">

          {/* ── LEFT: Image Block ── */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 40 : -40 }}
            animate={splitInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative"
          >
            {/* Background glow */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-[#d4af37]/5 rounded-3xl blur-2xl pointer-events-none" />

            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800/60">
              {/* Gradient border overlay */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#d4af37]/20 via-transparent to-[#d4af37]/10 opacity-0 hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />

              <img
                src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=900&q=85"
                alt="Triangle Black Engineering"
                className="w-full aspect-[4/5] object-cover filter grayscale hover:grayscale-0 transition-all duration-1000"
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

              {/* Bottom overlay card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={splitInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
                className="absolute bottom-0 inset-x-0 p-5 z-20"
              >
                <div className="bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-white/8">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#d4af37]/15 to-[#d4af37]/5 border border-[#d4af37]/20 flex items-center justify-center shrink-0">
                      <Settings className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <div className="text-[9px] uppercase text-[#d4af37]/60 tracking-[0.2em] font-mono mb-0.5">
                        {t.about.operationalSecurity}
                      </div>
                      <div className="text-sm font-bold text-white font-serif">
                        {t.about.operationalSecuritySub}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Side accent line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={splitInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
              className={`absolute top-8 ${isRtl ? '-right-4' : '-left-4'} w-px h-28 bg-gradient-to-b from-[#d4af37]/50 to-transparent hidden lg:block`}
              style={{ transformOrigin: 'top' }}
            />

            {/* Floating OEM badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={splitInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
              className={`absolute -bottom-8 ${isRtl ? '-left-4 lg:-left-8' : '-right-4 lg:-right-8'} z-30`}
            >
              <div className="bg-neutral-900/95 border border-[#d4af37]/15 backdrop-blur-xl rounded-2xl p-5 shadow-2xl shadow-black/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 flex items-center justify-center">
                    <BadgeCheck className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <div
                    className="text-2xl font-serif font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    100%
                  </div>
                </div>
                <div className="text-[9px] tracking-[0.2em] uppercase text-neutral-500 font-mono max-w-[140px]">
                  OEM Certified Engineering Partners
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Text Content ── */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
            animate={splitInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="space-y-8 lg:pt-4"
          >
            {/* Sub heading */}
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={splitInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] text-white mb-2"
              >
                {t.about.subheading?.split(' ').slice(0, -2).join(' ')}{' '}
                <span
                  className="italic"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {t.about.subheading?.split(' ').slice(-2).join(' ')}
                </span>
              </motion.h3>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={splitInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
                className="h-px w-20 bg-gradient-to-r from-[#d4af37]/40 to-transparent mt-3"
                style={{ transformOrigin: isRtl ? 'right' : 'left' }}
              />
            </div>

            {/* Paragraphs */}
            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={splitInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
                className={`relative ${isRtl ? 'border-r-2 pr-5' : 'border-l-2 pl-5'} border-[#d4af37]/30 py-1`}
              >
                <p className="text-neutral-300 text-[14px] sm:text-[15px] leading-[1.85] font-light">
                  {t.about.p1}
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={splitInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
                className="text-neutral-500 text-[13px] sm:text-[14px] leading-[1.85] font-light"
              >
                {t.about.p2}
              </motion.p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-neutral-800/60">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={splitInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: EASE }}
                    onMouseEnter={() => setHoveredStat(i)}
                    onMouseLeave={() => setHoveredStat(null)}
                    className="relative group cursor-default"
                  >
                    <div
                      className={`relative p-4 rounded-xl border transition-all duration-500
                        ${hoveredStat === i
                          ? 'bg-[#d4af37]/[0.06] border-[#d4af37]/25 shadow-[0_8px_30px_rgba(212,175,55,0.08)]'
                          : 'bg-neutral-900/40 border-neutral-800/60'
                        }`}
                    >
                      {/* Top accent */}
                      <motion.div
                        animate={{ width: hoveredStat === i ? '100%' : '0%' }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="absolute top-0 left-0 h-[2px] rounded-tr-full bg-gradient-to-r from-[#d4af37] to-[#f0d060]"
                      />

                      <div className="flex items-center gap-2 mb-2">
                        <Icon
                          className={`w-4 h-4 transition-colors duration-400 ${
                            hoveredStat === i ? 'text-[#d4af37]' : 'text-neutral-600'
                          }`}
                        />
                        <span
                          className="text-xl font-bold font-serif"
                          style={{
                            background: 'linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          {stat.val}
                        </span>
                      </div>
                      <div className="text-[9px] text-neutral-500 font-mono uppercase tracking-[0.15em]">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════
            3. MISSION / VISION / VALUES
        ══════════════════════════════════════ */}
        <div ref={pillarsRef} className="mb-24 lg:mb-28">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8 bg-[#d4af37]/40" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#d4af37]/70 font-semibold font-mono">
                {t.about.principlesTitle}
              </span>
              <div className="h-px w-8 bg-[#d4af37]/40" />
            </div>
          </motion.div>

          {/* Value cards — Interactive with active state */}
          <div className="grid md:grid-cols-3 gap-4 items-stretch">
            {valuePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              const isActive = i === activeValue;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.12 * i, ease: EASE }}
                  onClick={() => setActiveValue(i)}
                  className="relative cursor-pointer group flex"
                >
                  {/* Outer glow */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute -inset-[1px] rounded-2xl z-0"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(212,175,55,0.25), transparent 60%, rgba(212,175,55,0.12))',
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{
                      backgroundColor: isActive
                        ? 'rgba(18,18,18,0.98)'
                        : 'rgba(12,12,12,0.9)',
                      borderColor: isActive
                        ? 'rgba(212,175,55,0.2)'
                        : 'rgba(40,40,40,0.6)',
                      y: isActive ? -4 : 0,
                    }}
                    transition={{ duration: 0.5, ease: EASE_SOFT }}
                    className="relative border rounded-2xl p-8 overflow-hidden w-full flex flex-col
                              group-hover:border-[#d4af37]/15 transition-shadow duration-500
                              group-hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
                  >
                    {/* Top accent */}
                    <motion.div
                      animate={{ width: isActive ? '100%' : '0%' }}
                      transition={{ duration: 0.7, ease: EASE }}
                      className="absolute top-0 left-0 h-[2px]"
                      style={{
                        background:
                          'linear-gradient(90deg, #d4af37, #f5e070, #d4af37)',
                        boxShadow: '0 0 8px rgba(212,175,55,0.3)',
                      }}
                    />

                    {/* Inner glow */}
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 65%)',
                      }}
                    />

                    {/* Icon */}
                    <motion.div
                      animate={{
                        backgroundColor: isActive
                          ? 'rgba(212,175,55,0.1)'
                          : 'rgba(30,30,30,0.8)',
                        borderColor: isActive
                          ? 'rgba(212,175,55,0.3)'
                          : 'rgba(50,50,50,0.6)',
                      }}
                      transition={{ duration: 0.4 }}
                      className="w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 shrink-0"
                    >
                      <Icon
                        size={24}
                        strokeWidth={1.5}
                        className={`transition-colors duration-500 ${
                          isActive
                            ? 'text-[#d4af37]'
                            : 'text-neutral-600 group-hover:text-[#d4af37]/60'
                        }`}
                      />
                    </motion.div>

                    {/* Title */}
                    <motion.h4
                      animate={{
                        color: isActive
                          ? '#f0d060'
                          : 'rgba(255,255,255,0.9)',
                      }}
                      transition={{ duration: 0.4 }}
                      className="font-serif text-lg font-semibold mb-3 group-hover:text-[#d4af37] transition-colors duration-300 shrink-0"
                    >
                      {pillar.title}
                    </motion.h4>

                    {/* Separator */}
                    <motion.div
                      animate={{
                        width: isActive ? 32 : 16,
                        opacity: isActive ? 0.5 : 0.15,
                      }}
                      transition={{ duration: 0.4 }}
                      className="h-px bg-[#d4af37] mb-4 shrink-0"
                    />

                    {/* Description — flex-1 pushes bottom content down equally */}
                    <motion.p
                      animate={{
                        color: isActive
                          ? 'rgba(190,190,190,1)'
                          : 'rgba(100,100,100,1)',
                      }}
                      transition={{ duration: 0.4 }}
                      className="text-[13px] leading-[1.85] font-light flex-1
                                group-hover:text-neutral-400 transition-colors duration-300"
                    >
                      {pillar.desc}
                    </motion.p>

                    {/* Bottom indicator — always at bottom */}
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : 6,
                      }}
                      transition={{ duration: 0.4 }}
                      className="mt-5 flex items-center gap-2 shrink-0"
                    >
                      <div className="h-px w-5 bg-gradient-to-r from-[#d4af37]/60 to-transparent" />
                      <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]/50" />
                    </motion.div>

                    {/* Bottom gold line — same on all cards */}
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Pillar step indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {valuePillars.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveValue(i)}
                animate={{
                  width: i === activeValue ? 32 : 8,
                  backgroundColor: i === activeValue ? '#d4af37' : 'rgba(50,50,50,1)',
                  boxShadow: i === activeValue ? '0 0 10px rgba(212,175,55,0.3)' : 'none',
                }}
                transition={{ duration: 0.4, ease: EASE }}
                className="h-[4px] rounded-full cursor-pointer hover:bg-[#d4af37]/30 transition-colors duration-300"
              />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════
            4. WHY CHOOSE US
        ══════════════════════════════════════ */}
        <div ref={whyRef} className="mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Card border glow */}
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#d4af37]/15 via-transparent to-[#d4af37]/10 opacity-60" />

            <div className="relative bg-neutral-950/95 border border-neutral-800/50 rounded-3xl p-8 sm:p-12 backdrop-blur-sm">
              {/* Top accent */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

              {/* Corner ornaments */}
              <div className="absolute top-5 right-5 w-10 h-10 opacity-15 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-[#d4af37] to-transparent" />
                <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-[#d4af37] to-transparent" />
              </div>

              <div className="grid lg:grid-cols-12 gap-10 items-start">
                {/* Left column */}
                <div className="lg:col-span-5">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={whyInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px w-6 bg-[#d4af37]/50" />
                      <span className="text-[9px] uppercase tracking-[0.35em] text-[#d4af37] font-bold font-mono">
                        {t.about.whyChooseTitle}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif mb-5 leading-[1.15]">
                      {t.about.whyChooseSub}
                    </h3>

                    <div className="h-px w-16 bg-gradient-to-r from-[#d4af37]/30 to-transparent mb-5" />

                    <p className="text-[13px] text-neutral-500 leading-[1.85] font-light">
                      {t.about.whyChooseDesc}
                    </p>
                  </motion.div>
                </div>

                {/* Right column — Feature list */}
                <div className="lg:col-span-7">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {t.about.whyChooseItems.map((item: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: isRtl ? -16 : 16 }}
                        animate={whyInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.06, ease: EASE }}
                        className="group flex gap-3 p-4 rounded-xl
                                   bg-neutral-900/40 border border-neutral-800/50
                                   hover:border-[#d4af37]/20 hover:bg-[#d4af37]/[0.03]
                                   transition-all duration-400 cursor-default"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#d4af37]/60 shrink-0 mt-0.5 group-hover:text-[#d4af37] group-hover:scale-110 transition-all duration-300" />
                        <span className="text-[12.5px] text-neutral-400 leading-[1.7] font-light group-hover:text-neutral-300 transition-colors duration-300">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════
            5. CLIENT TRUST BANNER
        ══════════════════════════════════════ */}
        <div ref={clientsRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={clientsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center"
          >
            {/* Divider */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={clientsInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]/20"
                style={{ transformOrigin: 'right' }}
              />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/30"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={clientsInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]/20"
                style={{ transformOrigin: 'left' }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={clientsInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[10px] uppercase tracking-[0.3em] text-neutral-600 mb-8 font-mono"
            >
              {t.about.clientsTitle}
            </motion.p>

            {/* Client names */}
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
              {hospitalityClients.map((clientName: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={clientsInView ? { opacity: 0.35, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.04, ease: EASE }}
                  whileHover={{ opacity: 0.8, scale: 1.05 }}
                  className="text-[12px] text-neutral-500 font-serif tracking-wider
                             hover:text-[#d4af37]/70 transition-all duration-300 cursor-default
                             px-3 py-1.5 rounded-full border border-transparent
                             hover:border-[#d4af37]/10 hover:bg-[#d4af37]/[0.03]"
                >
                  {clientName}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes goldShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>
    </section>
  );
};