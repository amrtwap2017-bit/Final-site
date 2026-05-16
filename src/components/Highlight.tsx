import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import {  ArrowRight } from 'lucide-react';
import { Translation } from '../data/content';

interface HighlightProps {
  t: Translation;
  currentLang: 'en' | 'ar' | 'it';
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SOFT: [number, number, number, number] = [0.4, 0, 0.2, 1];
const TIMELINE_INTERVAL = 6000;

/* ── Reusable animated section divider ── */
const GoldDivider: React.FC<{ delay?: number; inView: boolean }> = ({
  delay = 0,
  inView,
}) => (
  <div className="flex items-center justify-center gap-3">
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]/30"
      style={{ transformOrigin: 'right' }}
    />
    <motion.div
      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay }}
      className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/40"
    />
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]/30"
      style={{ transformOrigin: 'left' }}
    />
  </div>
);

export const Highlight: React.FC<HighlightProps> = ({ t, currentLang }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isRtl = currentLang === 'ar';
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });

  /* ── Auto-advance with pause on hover ── */
  useEffect(() => {
    if (!isInView || isPaused) return;
    const id = setInterval(() => {
      setActiveIndex((p) => (p + 1) % t.highlight.timeline.length);
    }, TIMELINE_INTERVAL);
    return () => clearInterval(id);
  }, [isInView, isPaused, t.highlight.timeline.length]);

  const progressFraction = (activeIndex + 1) / t.highlight.timeline.length;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-24 bg-black overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* ════════════════════════════════════════════
          LAYERED BACKGROUND SYSTEM
      ════════════════════════════════════════════ */}

      {/* Deep base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />

      {/* Static texture grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(212,175,55,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.15) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Radial ambient glows */}
      <div className="absolute -top-60 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#d4af37]/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#d4af37]/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-[#d4af37]/[0.025] rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative SVG path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pathGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="#d4af37" stopOpacity="0.12" />
            <stop offset="60%" stopColor="#f0d060" stopOpacity="0.18" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="pathGold2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M -50 600 C 200 500, 500 750, 900 550 S 1300 200, 1700 350"
          fill="none"
          stroke="url(#pathGold)"
          strokeWidth="1.5"
        />
        <path
          d="M 0 200 C 300 300, 600 100, 1000 250 S 1400 500, 1800 300"
          fill="none"
          stroke="url(#pathGold2)"
          strokeWidth="1"
        />
      </svg>

      {/* Top & bottom border lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/25 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent" />

      {/* ════════════════════════════════════════════
          CONTENT WRAPPER
      ════════════════════════════════════════════ */}
      <div className="relative z-10 w-[90%] max-w-[1240px] mx-auto">

        {/* ════════════════════════════════════════
            SECTION HEADER (Grounded, no floating)
        ════════════════════════════════════════ */}
        <div className="mb-16 lg:mb-20">

          {/* Badge row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center gap-4 mb-8"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="h-px w-12 bg-gradient-to-r from-[#d4af37] to-transparent"
              style={{ transformOrigin: isRtl ? 'right' : 'left' }}
            />
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full
                          bg-[#d4af37]/[0.06] border border-[#d4af37]/18 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4af37] font-mono">
                {t.highlight.badge}
              </span>
            </div>
          </motion.div>

          {/* Two-column heading + description */}
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-end">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
                className="font-serif text-3xl sm:text-4xl lg:text-[2.9rem] xl:text-[3.2rem] font-bold leading-[1.1] text-white"
              >
                {t.highlight.heading.split('.').map((sentence, idx, arr) =>
                  idx === arr.length - 1 ? (
                    <span
                      key={idx}
                      className="italic block mt-1"
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
                      {sentence}
                    </span>
                  ) : (
                    <span key={idx} className="block">
                      {sentence}.
                    </span>
                  )
                )}
              </motion.h2>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.5, ease: EASE }}
                className="mt-4 h-px w-32 bg-gradient-to-r from-[#d4af37]/50 to-transparent"
                style={{ transformOrigin: isRtl ? 'right' : 'left' }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
              className="lg:border-l lg:border-[#d4af37]/12 lg:pl-10
                         rtl:lg:border-l-0 rtl:lg:border-r rtl:lg:pl-0 rtl:lg:pr-10"
            >
              <p className="text-neutral-400 text-[14px] sm:text-[15px] font-light leading-[1.9]">
                {t.highlight.desc}
              </p>
            </motion.div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════
            DESKTOP TIMELINE
        ════════════════════════════════════════════════════ */}
        <div
          className="hidden lg:block"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ── Progress track ── */}
          <div className="relative mb-4">
            {/* Step labels above track */}
            <div className="grid grid-cols-4 mb-6">
              {t.highlight.timeline.map((item, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: EASE }}
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                >
                  <motion.span
                    animate={{
                      color:
                        i === activeIndex
                          ? '#f0d060'
                          : i < activeIndex
                            ? 'rgba(212,175,55,0.5)'
                            : 'rgba(115,115,115,1)',
                    }}
                    transition={{ duration: 0.4 }}
                    className="text-[10px] font-mono uppercase tracking-[0.3em] font-semibold
                               group-hover:text-[#d4af37] transition-colors duration-300"
                  >
                    {item.year}
                  </motion.span>
                </motion.button>
              ))}
            </div>

            {/* Track container */}
            <div className="relative h-[4px] bg-neutral-800/60 rounded-full my-4">
              {/* Filled progress */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: progressFraction } : { scaleX: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="absolute inset-y-0 left-0 w-full rounded-full"
                style={{
                  transformOrigin: isRtl ? 'right' : 'left',
                  background:
                    'linear-gradient(90deg, #b8860b, #d4af37, #f0d060, #d4af37)',
                  boxShadow:
                    '0 0 12px rgba(212,175,55,0.4), 0 0 3px rgba(212,175,55,0.7)',
                }}
              />

              {/* Step nodes on track (Centered perfectly and scaled up) */}
              {t.highlight.timeline.map((_, i) => {
                const fraction = (i + 0.5) / t.highlight.timeline.length;
                const isPast = i < activeIndex;
                const isAct = i === activeIndex;
                return (
                  <motion.button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className="absolute top-1/2 cursor-pointer z-10"
                    style={{
                      left: `${fraction * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {/* Pulse ring on active */}
                    {isAct && (
                      <motion.div
                        animate={{
                          scale: [1, 2.2, 1],
                          opacity: [0.4, 0, 0.4],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                        className="absolute inset-0 rounded-full bg-[#d4af37]/30"
                      />
                    )}
                    {/* Node dot (Larger sizes) */}
                    <motion.div
                      animate={{
                        width: isAct ? 22 : isPast ? 16 : 14,
                        height: isAct ? 22 : isPast ? 16 : 14,
                        backgroundColor: isAct
                          ? '#f0d060'
                          : isPast
                            ? '#d4af37'
                            : '#404040',
                        boxShadow: isAct
                          ? '0 0 20px rgba(212,175,55,0.7), 0 0 8px rgba(212,175,55,1)'
                          : isPast
                            ? '0 0 10px rgba(212,175,55,0.4)'
                            : 'none',
                      }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="rounded-full relative z-10 border border-black/40"
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ── Cards grid ── */}
          <div className="grid grid-cols-4 gap-5 mt-10">
            {t.highlight.timeline.map((item, i) => {
              const isActive = i === activeIndex;
              const isPast = i < activeIndex;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + i * 0.1,
                    ease: EASE,
                  }}
                  onClick={() => setActiveIndex(i)}
                  className="relative group cursor-pointer"
                >
                  {/* Card */}
                  <motion.div
                    animate={{
                      y: isActive ? -8 : 0,
                      scale: isActive ? 1.01 : 1,
                    }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="relative h-full"
                  >
                    {/* Outer glow border for active */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute -inset-[1px] rounded-2xl"
                          style={{
                            background:
                              'linear-gradient(135deg, rgba(212,175,55,0.3), transparent 60%, rgba(212,175,55,0.15))',
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Main card surface */}
                    <motion.div
                      animate={{
                        backgroundColor: isActive
                          ? 'rgba(18,18,18,0.98)'
                          : isPast
                            ? 'rgba(14,14,14,0.9)'
                            : 'rgba(10,10,10,0.85)',
                        borderColor: isActive
                          ? 'rgba(212,175,55,0.25)'
                          : isPast
                            ? 'rgba(212,175,55,0.08)'
                            : 'rgba(40,40,40,0.8)',
                      }}
                      transition={{ duration: 0.5, ease: EASE_SOFT }}
                      className="relative h-full border rounded-2xl p-6
                                 overflow-hidden backdrop-blur-sm
                                 group-hover:border-[#d4af37]/20
                                 transition-shadow duration-500
                                 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
                    >
                      {/* Top accent line */}
                      <motion.div
                        animate={{
                          width: isActive ? '100%' : '0%',
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="absolute top-0 left-0 h-[2px] rounded-tr-full"
                        style={{
                          background:
                            'linear-gradient(90deg, #d4af37, #f5e070, #d4af37)',
                          boxShadow: '0 0 8px rgba(212,175,55,0.4)',
                        }}
                      />

                      {/* Inner glow */}
                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 65%)',
                        }}
                      />

                      {/* Step number badge */}
                      <div className="flex items-center justify-between mb-5">
                        <motion.div
                          animate={{
                            backgroundColor: isActive
                              ? 'rgba(212,175,55,0.12)'
                              : 'rgba(30,30,30,0.8)',
                            borderColor: isActive
                              ? 'rgba(212,175,55,0.35)'
                              : 'rgba(50,50,50,0.8)',
                          }}
                          transition={{ duration: 0.4 }}
                          className="w-9 h-9 rounded-xl border flex items-center justify-center"
                        >
                          <motion.span
                            animate={{
                              color: isActive ? '#f0d060' : isPast ? 'rgba(212,175,55,0.6)' : 'rgba(90,90,90,1)',
                            }}
                            transition={{ duration: 0.4 }}
                            className="text-xs font-bold font-serif"
                          >
                            {String(i + 1).padStart(2, '0')}
                          </motion.span>
                        </motion.div>

                        {/* Past checkmark */}
                        <AnimatePresence>
                          {isPast && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: EASE }}
                              className="w-5 h-5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20
                                         flex items-center justify-center"
                            >
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path
                                  d="M1 4L3.5 6.5L9 1"
                                  stroke="#d4af37"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Year */}
                      <motion.div
                        animate={{
                          y: isActive ? -2 : 0,
                        }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="mb-3"
                      >
                        <span
                          className={`text-2xl font-serif font-bold tracking-tight
                                      transition-opacity duration-400 ${
                                        isPast && !isActive ? 'opacity-60' : ''
                                      }`}
                          style={{
                            background:
                              'linear-gradient(135deg, #f0d060 0%, #d4af37 50%, #b8860b 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          {item.year}
                        </span>
                      </motion.div>

                      {/* Title */}
                      <motion.h4
                        animate={{
                          color: isActive
                            ? '#f0d060'
                            : isPast
                              ? 'rgba(212,175,55,0.45)'
                              : 'rgba(100,100,100,1)',
                        }}
                        transition={{ duration: 0.4 }}
                        className="text-[10px] uppercase tracking-[0.3em] font-semibold font-mono mb-3
                                   group-hover:text-[#d4af37]/70 transition-colors duration-300"
                      >
                        {item.title}
                      </motion.h4>

                      {/* Separator */}
                      <motion.div
                        animate={{
                          width: isActive ? 32 : 16,
                          opacity: isActive ? 0.6 : 0.2,
                        }}
                        transition={{ duration: 0.4 }}
                        className="h-px bg-[#d4af37] mb-4"
                      />

                      {/* Description */}
                      <motion.p
                        animate={{
                          color: isActive
                            ? 'rgba(210,210,210,1)'
                            : 'rgba(100,100,100,1)',
                        }}
                        transition={{ duration: 0.4 }}
                        className="text-[12.5px] leading-[1.85] font-light
                                   group-hover:text-neutral-400 transition-colors duration-300"
                      >
                        {item.description}
                      </motion.p>

                      {/* Read more caret */}
                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : 0,
                          y: isActive ? 0 : 8,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: isActive ? 0.15 : 0,
                        }}
                        className="mt-5 flex items-center gap-2"
                      >
                        <div className="h-px w-5 bg-gradient-to-r from-[#d4af37]/60 to-transparent" />
                        <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]/60" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Bottom step pills (Loading ring removed) ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
            className="flex items-center justify-center gap-2 mt-10"
          >
            {t.highlight.timeline.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                animate={{
                  width: i === activeIndex ? 36 : 8,
                  backgroundColor:
                    i === activeIndex
                      ? '#d4af37'
                      : i < activeIndex
                        ? 'rgba(212,175,55,0.25)'
                        : 'rgba(50,50,50,1)',
                  boxShadow:
                    i === activeIndex
                      ? '0 0 10px rgba(212,175,55,0.35)'
                      : 'none',
                }}
                transition={{ duration: 0.4, ease: EASE }}
                className="h-[5px] rounded-full cursor-pointer
                           hover:bg-[#d4af37]/30 transition-colors duration-300"
              />
            ))}
          </motion.div>
        </div>

        {/* ════════════════════════════════════════
            MOBILE TIMELINE
        ════════════════════════════════════════ */}
        <div className="lg:hidden relative">
          <div
            className={`absolute ${isRtl ? 'right-[19px]' : 'left-[19px]'} top-0 bottom-0 w-px overflow-hidden`}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#d4af37]/40 via-[#d4af37]/15 to-transparent" />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={
                isInView
                  ? { scaleY: progressFraction }
                  : { scaleY: 0 }
              }
              transition={{ duration: 0.8, ease: EASE }}
              className="absolute top-0 left-0 w-full h-full bg-[#d4af37]"
              style={{ transformOrigin: 'top', opacity: 0.3 }}
            />
          </div>

          <div className="space-y-4">
            {t.highlight.timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isRtl ? 24 : -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.1, ease: EASE }}
                className={`relative ${isRtl ? 'pr-14' : 'pl-14'}`}
                onClick={() => setActiveIndex(i)}
              >
                {/* Node */}
                <div
                  className={`absolute ${isRtl ? 'right-0' : 'left-0'} top-0 z-10`}
                >
                  <motion.div
                    animate={{
                      scale: i === activeIndex ? 1 : 0.82,
                      boxShadow:
                        i === activeIndex
                          ? '0 0 20px rgba(212,175,55,0.35)'
                          : '0 0 0px rgba(212,175,55,0)',
                    }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center
                                border transition-all duration-400
                                ${
                                  i === activeIndex
                                    ? 'bg-gradient-to-br from-[#d4af37] to-[#b8962e] border-[#d4af37]/50'
                                    : i < activeIndex
                                      ? 'bg-[#d4af37]/10 border-[#d4af37]/20'
                                      : 'bg-neutral-900 border-neutral-700/60'
                                }`}
                  >
                    <span
                      className={`font-bold text-xs font-serif ${
                        i === activeIndex
                          ? 'text-black'
                          : i < activeIndex
                            ? 'text-[#d4af37]'
                            : 'text-neutral-500'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  animate={{
                    borderColor:
                      i === activeIndex
                        ? 'rgba(212,175,55,0.22)'
                        : 'rgba(35,35,35,0.8)',
                    backgroundColor:
                      i === activeIndex
                        ? 'rgba(18,18,18,0.95)'
                        : 'rgba(10,10,10,0.7)',
                  }}
                  transition={{ duration: 0.4, ease: EASE_SOFT }}
                  className="border rounded-xl p-4 relative overflow-hidden cursor-pointer"
                >
                  <motion.div
                    animate={{ width: i === activeIndex ? '100%' : '0%' }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#d4af37] to-[#f0d060]"
                  />
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-[15px] font-bold font-serif"
                      style={{
                        background:
                          'linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {item.year}
                    </span>
                    <div className="h-px flex-1 bg-neutral-800" />
                    <span
                      className={`text-[9px] font-mono uppercase tracking-widest
                                  transition-colors duration-300
                                  ${i === activeIndex ? 'text-[#d4af37]/60' : 'text-neutral-700'}`}
                    >
                      {String(i + 1).padStart(2, '0')} / {t.highlight.timeline.length}
                    </span>
                  </div>
                  <h4
                    className={`text-[10px] font-bold uppercase tracking-[0.22em] mb-2 font-mono
                                transition-colors duration-400
                                ${i === activeIndex ? 'text-[#d4af37]' : 'text-[#d4af37]/35'}`}
                  >
                    {item.title}
                  </h4>
                  <p
                    className={`text-[12px] leading-[1.75] font-light transition-colors duration-400
                                ${i === activeIndex ? 'text-neutral-300' : 'text-neutral-600'}`}
                  >
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════
            QUOTE BLOCK (Quote icon removed, tighter margin)
        ════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
          className="mt-16 lg:mt-20 relative"
        >
          {/* Connector */}
          <div className="flex flex-col items-center mb-6">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
              className="w-px h-8 bg-gradient-to-b from-[#d4af37]/20 to-[#d4af37]/40"
              style={{ transformOrigin: 'top' }}
            />
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-2 h-2 rounded-full bg-[#d4af37]/40 mt-1"
            />
          </div>

          {/* Quote card */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div
                className="absolute -inset-[1px] rounded-3xl opacity-50"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(212,175,55,0.2), transparent 50%, rgba(212,175,55,0.15))',
                }}
              />

              <div
                className="relative bg-neutral-950/90 border border-neutral-800/50
                           rounded-3xl backdrop-blur-xl overflow-hidden"
              >
                <div
                  className="absolute top-0 inset-x-0 h-[2px]"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.5) 50%, transparent 100%)',
                  }}
                />

                {/* Corner ornaments */}
                <div className="absolute top-4 left-4 w-12 h-12 opacity-20 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#d4af37] to-transparent" />
                  <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-[#d4af37] to-transparent" />
                </div>
                <div className="absolute bottom-4 right-4 w-12 h-12 opacity-20 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-[#d4af37] to-transparent" />
                  <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-[#d4af37] to-transparent" />
                </div>

                <div
                  className="absolute inset-0 pointer-events-none opacity-40"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 60%)',
                  }}
                />

                <div className="relative px-8 py-10 sm:px-12 sm:py-12">
                  <div
                    className="absolute top-6 left-8 text-[80px] leading-none font-serif
                               text-[#d4af37]/[0.06] select-none pointer-events-none"
                    aria-hidden
                  >
                    "
                  </div>

                  <blockquote className="relative">
                    <p
                      className="text-[15px] sm:text-[16px] lg:text-[17px]
                                 text-neutral-300 italic leading-[1.95] font-light font-serif"
                    >
                      {t.highlight.quote}
                    </p>
                  </blockquote>

                  {/* Author */}
                  <div
                    className={`mt-8 flex items-center gap-4 ${
                      isRtl ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className="w-8 h-px bg-gradient-to-r from-[#d4af37]/40 to-transparent" />
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#d4af37]/60">
                        {t.highlight.quoteAuthor}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom divider (Tighter margin) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-12 lg:mt-16"
        >
          <GoldDivider inView={isInView} delay={1.1} />
        </motion.div>
      </div>

      <style>{`
        @keyframes goldShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>
    </section>
  );
};