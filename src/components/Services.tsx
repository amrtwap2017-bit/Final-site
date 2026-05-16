import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Translation,
  Lang,
  servicesData,
  ServiceItem,
} from '../data/content';
import {
  Wrench,
  Truck,
  ShieldCheck,
  Cpu,
  Layers,
  Sliders,
  ArrowRight,
  Check,
  Sparkles,
} from 'lucide-react';

interface ServicesProps {
  t: Translation;
  currentLang: Lang;
  onSelectService: (serviceTitle: string) => void;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SOFT: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const Services: React.FC<ServicesProps> = ({
  t,
  currentLang,
  onSelectService,
}) => {
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'supplies' | 'procurement' | 'maintenance' | 'renovations'
  >('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const isRtl = currentLang === 'ar';

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.2 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });
  const noteInView = useInView(noteRef, { once: true, amount: 0.3 });

  const renderIcon = (iconName: string, isHovered: boolean) => {
    const cls = `w-6 h-6 transition-colors duration-500 ${
      isHovered ? 'text-[#f0d060]' : 'text-[#d4af37]'
    }`;
    switch (iconName) {
      case 'Wrench':
        return <Wrench className={cls} />;
      case 'Truck':
        return <Truck className={cls} />;
      case 'ShieldCheck':
        return <ShieldCheck className={cls} />;
      case 'Cpu':
        return <Cpu className={cls} />;
      case 'Layers':
        return <Layers className={cls} />;
      case 'Sliders':
        return <Sliders className={cls} />;
      default:
        return <Wrench className={cls} />;
    }
  };

  const filteredServices =
    activeFilter === 'all'
      ? servicesData
      : servicesData.filter((s) => s.category === activeFilter);

  const filters = [
    { id: 'all' as const, label: t.services.filterAll },
    { id: 'supplies' as const, label: t.services.filterSupplies },
    { id: 'procurement' as const, label: t.services.filterProcurement },
    { id: 'maintenance' as const, label: t.services.filterMaintenance },
    { id: 'renovations' as const, label: t.services.filterRenovation },
  ];

  return (
    <section
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
      id="services"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* ════════════════════════════════════════════
          LAYERED BACKGROUND
      ════════════════════════════════════════════ */}

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(212,175,55,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.15) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-[#d4af37]/[0.03] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#d4af37]/[0.025] rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative circles */}
      <div className="absolute top-1/3 -right-48 w-[500px] h-[500px] border border-[#d4af37]/[0.04] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] border border-[#d4af37]/[0.03] rounded-full pointer-events-none" />

      {/* SVG path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="svcPath" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.07" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M 0 400 Q 400 300, 800 450 T 1600 350"
          fill="none"
          stroke="url(#svcPath)"
          strokeWidth="1"
        />
      </svg>

      {/* Top & bottom borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent" />

      {/* Top connector from previous section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-14 bg-gradient-to-b from-[#d4af37]/25 to-transparent pointer-events-none" />

      {/* ════════════════════════════════════════════
          CONTENT
      ════════════════════════════════════════════ */}
      <div className="relative z-10 w-[90%] max-w-[1300px] mx-auto">

        {/* ══════════════════════════════════════
            1. SECTION HEADER
        ══════════════════════════════════════ */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
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
                {t.services.badge}
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
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-white mb-5"
          >
            {t.services.heading.split(' ').slice(0, -1).join(' ')}{' '}
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
              {t.services.heading.split(' ').slice(-1)}
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            className="text-neutral-500 text-[13px] sm:text-[14px] font-light leading-[1.8] max-w-xl mx-auto"
          >
            {t.services.subheading}
          </motion.p>

          {/* Underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent mx-auto mt-6"
          />
        </div>

        {/* ══════════════════════════════════════
            2. CATEGORY FILTER TABS
        ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          className="flex flex-wrap justify-center items-center gap-2 mb-16 lg:mb-20 max-w-4xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-neutral-950/80 rounded-2xl border border-neutral-800/50 backdrop-blur-sm">
            {filters.map((f, i) => (
              <motion.button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                initial={{ opacity: 0, y: 8 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.05, ease: EASE }}
                className={`relative px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] font-semibold rounded-xl
                           transition-all duration-400 overflow-hidden ${
                             activeFilter === f.id
                               ? 'text-black'
                               : 'text-neutral-500 hover:text-white hover:bg-neutral-800/50'
                           }`}
              >
                {/* Active background */}
                {activeFilter === f.id && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background:
                        'linear-gradient(135deg, #d4af37, #f0d060, #d4af37)',
                      boxShadow: '0 4px 16px rgba(212,175,55,0.25)',
                    }}
                    transition={{ duration: 0.4, ease: EASE_SOFT }}
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════
            3. SERVICES GRID
        ══════════════════════════════════════ */}
        <div ref={gridRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredServices.map((service: ServiceItem, idx: number) => {
                const isHovered = hoveredCard === service.id;

                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={gridInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + idx * 0.08,
                      ease: EASE,
                    }}
                    onMouseEnter={() => setHoveredCard(service.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="relative group"
                  >
                    {/* Outer glow on hover */}
                    <motion.div
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute -inset-[1px] rounded-2xl pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(212,175,55,0.2), transparent 60%, rgba(212,175,55,0.1))',
                      }}
                    />

                    {/* Card */}
                    <motion.div
                      animate={{
                        y: isHovered ? -6 : 0,
                        borderColor: isHovered
                          ? 'rgba(212,175,55,0.25)'
                          : 'rgba(40,40,40,0.6)',
                      }}
                      transition={{ duration: 0.4, ease: EASE_SOFT }}
                      className="relative h-full bg-neutral-950/90 border rounded-2xl
                                 overflow-hidden backdrop-blur-sm flex flex-col
                                 transition-shadow duration-500
                                 group-hover:shadow-[0_16px_50px_rgba(0,0,0,0.4)]"
                    >
                      {/* Top accent line */}
                      <motion.div
                        animate={{
                          width: isHovered ? '100%' : '0%',
                        }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="absolute top-0 left-0 h-[2px]"
                        style={{
                          background:
                            'linear-gradient(90deg, #d4af37, #f5e070, #d4af37)',
                          boxShadow: '0 0 10px rgba(212,175,55,0.3)',
                        }}
                      />

                      {/* Inner glow */}
                      <motion.div
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.05) 0%, transparent 60%)',
                        }}
                      />

                      {/* Content wrapper */}
                      <div className="relative z-10 p-7 flex-1 flex flex-col">

                        {/* Header: Icon + Category */}
                        <div className="flex justify-between items-start mb-6">
                          <motion.div
                            animate={{
                              backgroundColor: isHovered
                                ? 'rgba(212,175,55,0.12)'
                                : 'rgba(212,175,55,0.06)',
                              borderColor: isHovered
                                ? 'rgba(212,175,55,0.3)'
                                : 'rgba(50,50,50,0.6)',
                            }}
                            transition={{ duration: 0.4 }}
                            className="w-14 h-14 rounded-2xl border flex items-center justify-center"
                          >
                            {renderIcon(service.iconName, isHovered)}
                          </motion.div>

                          <span
                            className={`text-[9px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full
                              border transition-all duration-400 ${
                                isHovered
                                  ? 'border-[#d4af37]/25 text-[#d4af37]/70 bg-[#d4af37]/[0.05]'
                                  : 'border-neutral-800/60 text-neutral-600'
                              }`}
                          >
                            {service.category}
                          </span>
                        </div>

                        {/* Title */}
                        <motion.h3
                          animate={{
                            color: isHovered
                              ? '#f0d060'
                              : 'rgba(255,255,255,0.95)',
                          }}
                          transition={{ duration: 0.4 }}
                          className="text-lg font-bold font-serif mb-3 leading-tight"
                        >
                          {service.title[currentLang]}
                        </motion.h3>

                        {/* Separator */}
                        <motion.div
                          animate={{
                            width: isHovered ? 32 : 16,
                            opacity: isHovered ? 0.5 : 0.15,
                          }}
                          transition={{ duration: 0.4 }}
                          className="h-px bg-[#d4af37] mb-4"
                        />

                        {/* Description */}
                        <p className="text-[12.5px] text-neutral-500 leading-[1.8] font-light mb-6 group-hover:text-neutral-400 transition-colors duration-400">
                          {service.desc[currentLang]}
                        </p>

                        {/* Sub-systems */}
                        <div className="mb-6">
                          <span className="text-[9px] uppercase font-mono text-neutral-600 tracking-[0.2em] block mb-2.5">
                            {t.services.subsystemsLabel}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {service.systems[currentLang].map((sys, sIdx) => (
                              <motion.span
                                key={sIdx}
                                animate={{
                                  borderColor: isHovered
                                    ? 'rgba(212,175,55,0.15)'
                                    : 'rgba(40,40,40,0.6)',
                                  backgroundColor: isHovered
                                    ? 'rgba(212,175,55,0.04)'
                                    : 'rgba(20,20,20,0.6)',
                                }}
                                transition={{ duration: 0.4 }}
                                className="text-[10px] text-neutral-400 px-2.5 py-1 rounded-lg border font-light"
                              >
                                {sys}
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-2 mb-8 pt-5 border-t border-neutral-800/40 flex-1">
                          {service.features[currentLang].map((feat, fIdx) => (
                            <motion.div
                              key={fIdx}
                              initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
                              animate={gridInView ? { opacity: 1, x: 0 } : {}}
                              transition={{
                                duration: 0.4,
                                delay: 0.3 + fIdx * 0.06,
                                ease: EASE,
                              }}
                              className="flex items-center gap-2.5"
                            >
                              <div
                                className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0
                                  transition-colors duration-400 ${
                                    isHovered
                                      ? 'bg-[#d4af37]/15'
                                      : 'bg-neutral-800/60'
                                  }`}
                              >
                                <Check
                                  className={`w-2.5 h-2.5 transition-colors duration-400 ${
                                    isHovered
                                      ? 'text-[#d4af37]'
                                      : 'text-neutral-600'
                                  }`}
                                />
                              </div>
                              <span className="text-[12px] text-neutral-500 font-light group-hover:text-neutral-400 transition-colors duration-300">
                                {feat}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <motion.button
                          onClick={() =>
                            onSelectService(service.title[currentLang])
                          }
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative w-full py-3.5 rounded-xl text-[11px] uppercase tracking-[0.2em]
                                     font-bold overflow-hidden transition-all duration-500 group/btn
                                     border"
                          style={{
                            backgroundColor: isHovered
                              ? 'rgba(212,175,55,1)'
                              : 'rgba(20,20,20,0.8)',
                            color: isHovered ? '#000000' : 'rgba(160,160,160,1)',
                            borderColor: isHovered
                              ? 'rgba(212,175,55,0.5)'
                              : 'rgba(50,50,50,0.5)',
                            boxShadow: isHovered
                              ? '0 8px 24px rgba(212,175,55,0.2)'
                              : 'none',
                          }}
                        >
                          {/* Shine sweep */}
                          <motion.span
                            className="absolute inset-0 block -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: '-150%' }}
                            whileHover={{ x: '150%' }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                          />
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {t.services.requestBtn}
                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </span>
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ══════════════════════════════════════
            4. CUSTOM NOTE BANNER
        ══════════════════════════════════════ */}
        <div ref={noteRef}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={noteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mt-20 lg:mt-24 relative max-w-2xl mx-auto"
          >
            {/* Border glow */}
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-40"
              style={{
                background:
                  'linear-gradient(135deg, rgba(212,175,55,0.2), transparent 50%, rgba(212,175,55,0.12))',
              }}
            />

            <div className="relative bg-neutral-950/90 border border-neutral-800/50 rounded-2xl p-8 backdrop-blur-sm overflow-hidden">
              {/* Top accent */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

              {/* Corner ornament */}
              <div className="absolute top-3 right-3 w-8 h-8 opacity-15 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-[#d4af37] to-transparent" />
                <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-[#d4af37] to-transparent" />
              </div>

              <div className="flex items-start gap-4 text-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#d4af37]/[0.08] border border-[#d4af37]/15 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-[13px] text-neutral-400 font-light leading-[1.8]">
                      <span
                        className="font-semibold"
                        style={{
                          background:
                            'linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {t.services.customNoteTitle}
                      </span>{' '}
                      {t.services.customNoteDesc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Bottom section divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={noteInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 lg:mt-20"
        >
          <div className="flex items-center justify-center gap-3">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={noteInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4af37]/20"
              style={{ transformOrigin: 'right' }}
            />
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/30"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={noteInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]/20"
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </motion.div>
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