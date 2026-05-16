import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Translation,
  Lang,
  projectsData,
  ProjectItem,
} from '../data/content';
import {
  MapPin,
  X,
  Clock,
  Briefcase,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Award,
} from 'lucide-react';

interface ProjectsProps {
  t: Translation;
  currentLang: Lang;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SOFT: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const Projects: React.FC<ProjectsProps> = ({ t, currentLang }) => {
  const isRtl = currentLang === 'ar';
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.2 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  const categories = [
    { id: 'all', label: t.projects.filterAll },
    { id: 'renovations', label: t.projects.filterRenovations },
    { id: 'maintenance', label: t.projects.filterMaintenance },
    { id: 'procurement', label: t.projects.filterProcurement },
  ];

  const filteredProjects =
    filter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <section
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
      id="projects"
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
      <div className="absolute top-0 right-1/3 w-[700px] h-[700px] bg-[#d4af37]/[0.03] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#d4af37]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] border border-[#d4af37]/[0.04] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-[400px] h-[400px] border border-[#d4af37]/[0.03] rounded-full pointer-events-none" />

      {/* SVG path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="projPath" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M 0 500 Q 500 350, 900 500 T 1700 300"
          fill="none"
          stroke="url(#projPath)"
          strokeWidth="1"
        />
      </svg>

      {/* Borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent" />

      {/* Top connector */}
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
                {t.projects.badge}
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
            {t.projects.heading.split(' ').slice(0, -1).join(' ')}{' '}
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
              {t.projects.heading.split(' ').slice(-1)}
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            className="text-neutral-500 text-[13px] sm:text-[14px] font-light leading-[1.8] max-w-xl mx-auto"
          >
            {t.projects.subheading}
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
            2. FILTER TABS
        ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          className="flex flex-wrap justify-center items-center gap-2 mb-16 lg:mb-20 max-w-3xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-neutral-950/80 rounded-2xl border border-neutral-800/50 backdrop-blur-sm">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                initial={{ opacity: 0, y: 8 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.05, ease: EASE }}
                className={`relative px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] font-semibold rounded-xl
                           transition-all duration-400 overflow-hidden ${
                             filter === cat.id
                               ? 'text-black'
                               : 'text-neutral-500 hover:text-white hover:bg-neutral-800/50'
                           }`}
              >
                {filter === cat.id && (
                  <motion.div
                    layoutId="activeProjectFilter"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background:
                        'linear-gradient(135deg, #d4af37, #f0d060, #d4af37)',
                      boxShadow: '0 4px 16px rgba(212,175,55,0.25)',
                    }}
                    transition={{ duration: 0.4, ease: EASE_SOFT }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════
            3. PROJECT GRID
        ══════════════════════════════════════ */}
        <div ref={gridRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredProjects.map((project, idx) => {
                const isHovered = hoveredCard === project.id;

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={gridInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + idx * 0.1,
                      ease: EASE,
                    }}
                    onMouseEnter={() => setHoveredCard(project.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="relative group"
                  >
                    {/* Outer glow */}
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
                      {/* ── Image Section ── */}
                      <div className="relative h-52 overflow-hidden">
                        <motion.img
                          src={project.imageUrl}
                          alt={project.title[currentLang]}
                          className="w-full h-full object-cover"
                          animate={{
                            scale: isHovered ? 1.08 : 1,
                            filter: isHovered
                              ? 'brightness(0.7)'
                              : 'brightness(0.5)',
                          }}
                          transition={{ duration: 0.7, ease: EASE_SOFT }}
                        />

                        {/* Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/30 to-transparent" />

                        {/* Top accent line */}
                        <motion.div
                          animate={{
                            width: isHovered ? '100%' : '0%',
                          }}
                          transition={{ duration: 0.6, ease: EASE }}
                          className="absolute top-0 left-0 h-[2px] z-10"
                          style={{
                            background:
                              'linear-gradient(90deg, #d4af37, #f5e070, #d4af37)',
                            boxShadow: '0 0 10px rgba(212,175,55,0.4)',
                          }}
                        />

                        {/* Category + Year badges */}
                        <div className="absolute top-4 inset-x-4 flex justify-between items-start z-10">
                          <motion.span
                            animate={{
                              backgroundColor: isHovered
                                ? 'rgba(212,175,55,1)'
                                : 'rgba(212,175,55,0.9)',
                              boxShadow: isHovered
                                ? '0 4px 16px rgba(212,175,55,0.3)'
                                : 'none',
                            }}
                            transition={{ duration: 0.4 }}
                            className="text-[9px] uppercase tracking-[0.2em] font-bold text-black px-3 py-1.5 rounded-full"
                          >
                            {project.category}
                          </motion.span>

                          {project.year && (
                            <span className="text-[10px] font-mono text-white/60 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/8">
                              {project.year}
                            </span>
                          )}
                        </div>

                        {/* Location at bottom of image */}
                        <div className="absolute bottom-4 left-4 z-10">
                          <div className="flex items-center gap-1.5 text-[10px] text-white/70 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/5">
                            <MapPin className="w-3 h-3 text-[#d4af37]" />
                            <span>{project.location[currentLang]}</span>
                          </div>
                        </div>

                        {/* KPI overlay on hover */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.3, ease: EASE }}
                              className="absolute bottom-4 right-4 z-10 flex gap-2"
                            >
                              {project.kpis.slice(0, 2).map((kpi, ki) => (
                                <div
                                  key={ki}
                                  className="bg-black/60 backdrop-blur-md rounded-lg px-3 py-2 border border-white/8 text-center"
                                >
                                  <div
                                    className="text-sm font-bold font-serif"
                                    style={{
                                      background:
                                        'linear-gradient(135deg, #d4af37, #f0d060)',
                                      WebkitBackgroundClip: 'text',
                                      WebkitTextFillColor: 'transparent',
                                      backgroundClip: 'text',
                                    }}
                                  >
                                    {kpi.value}
                                  </div>
                                  <div className="text-[8px] text-neutral-400 font-mono uppercase tracking-wider mt-0.5">
                                    {kpi.label[currentLang]}
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* ── Content Section ── */}
                      <div className="relative z-10 p-6 flex-1 flex flex-col">

                        {/* Inner glow */}
                        <motion.div
                          animate={{ opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 60%)',
                          }}
                        />

                        {/* Client */}
                        <div className="flex items-center gap-2 mb-3">
                          <Briefcase className="w-3 h-3 text-[#d4af37]/40" />
                          <span className="text-[10px] text-neutral-600 uppercase tracking-[0.15em] font-mono">
                            {project.client[currentLang]}
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
                          {project.title[currentLang]}
                        </motion.h3>

                        {/* Separator */}
                        <motion.div
                          animate={{
                            width: isHovered ? 32 : 16,
                            opacity: isHovered ? 0.5 : 0.15,
                          }}
                          transition={{ duration: 0.4 }}
                          className="h-px bg-[#d4af37] mb-3"
                        />

                        {/* Scope */}
                        <p className="text-[12px] text-neutral-500 leading-[1.8] font-light mb-5 line-clamp-3 group-hover:text-neutral-400 transition-colors duration-300 flex-1">
                          {project.scope[currentLang]}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.tags[currentLang].map((tag, i) => (
                            <motion.span
                              key={i}
                              animate={{
                                borderColor: isHovered
                                  ? 'rgba(212,175,55,0.15)'
                                  : 'rgba(40,40,40,0.6)',
                                backgroundColor: isHovered
                                  ? 'rgba(212,175,55,0.04)'
                                  : 'rgba(20,20,20,0.6)',
                              }}
                              transition={{ duration: 0.4 }}
                              className="text-[9px] text-neutral-500 px-2.5 py-1 rounded-lg border font-mono tracking-wide"
                            >
                              #{tag}
                            </motion.span>
                          ))}
                        </div>

                        {/* Timeline indicator */}
                        <div className="flex items-center gap-2 mb-5 pt-4 border-t border-neutral-800/40">
                          <Clock className="w-3 h-3 text-[#d4af37]/40" />
                          <span className="text-[10px] text-neutral-600 font-mono tracking-wide">
                            {project.timeline[currentLang]}
                          </span>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                          onClick={() => setSelectedProject(project)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative w-full py-3.5 rounded-xl text-[11px] uppercase tracking-[0.2em]
                                     font-bold overflow-hidden transition-all duration-500 group/btn border"
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
                          <motion.span
                            className="absolute inset-0 block -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: '-150%' }}
                            whileHover={{ x: '150%' }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                          />
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {t.projects.viewSpecs}
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

        {/* Bottom divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={gridInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 lg:mt-20"
        >
          <div className="flex items-center justify-center gap-3">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={gridInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
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
              animate={gridInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4af37]/20"
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════
          MODAL
      ════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />

            {/* Modal card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Gradient border */}
              <div
                className="absolute -inset-[1px] rounded-3xl opacity-60"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(212,175,55,0.25), transparent 50%, rgba(212,175,55,0.15))',
                }}
              />

              <div className="relative bg-neutral-950/98 border border-neutral-800/50 rounded-3xl backdrop-blur-xl overflow-hidden">

                {/* Top accent */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />

                {/* Corner ornaments */}
                <div className="absolute top-4 right-4 w-10 h-10 opacity-15 pointer-events-none z-10">
                  <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-[#d4af37] to-transparent" />
                  <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-[#d4af37] to-transparent" />
                </div>

                {/* ── Modal Header ── */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-[#d4af37]" />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-600 font-mono block">
                        {t.projects.operationsClass}
                      </span>
                      <span className="text-sm font-bold text-white font-serif">
                        {t.projects.scopeLabel}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setSelectedProject(null)}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="w-9 h-9 flex items-center justify-center rounded-xl
                               border border-neutral-800/50 hover:border-[#d4af37]/20
                               hover:bg-[#d4af37]/5 transition-colors duration-300"
                  >
                    <X className="w-4 h-4 text-neutral-500" />
                  </motion.button>
                </div>

                {/* ── Modal Content ── */}
                <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">

                  {/* Title + Client info */}
                  <motion.h3
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
                    className="text-2xl font-bold text-white font-serif mb-2 leading-tight"
                  >
                    {selectedProject.title[currentLang]}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="flex items-center gap-3 text-[12px] text-neutral-500 mb-6"
                  >
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3 h-3 text-[#d4af37]/40" />
                      <span>{selectedProject.client[currentLang]}</span>
                    </div>
                    <span className="text-neutral-700">—</span>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#d4af37]/40" />
                      <span>{selectedProject.location[currentLang]}</span>
                    </div>
                  </motion.div>

                  {/* Scope description */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
                    className="mb-6"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-px w-4 bg-[#d4af37]/40" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37]/70 font-mono font-semibold">
                        {t.projects.scopeLabel}
                      </span>
                    </div>
                    <p className="text-[13px] text-neutral-400 leading-[1.85] font-light">
                      {selectedProject.scope[currentLang]}
                    </p>
                  </motion.div>

                  {/* Info boxes */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25, ease: EASE }}
                    className="grid grid-cols-2 gap-3 mb-6"
                  >
                    {[
                      {
                        icon: Clock,
                        label: t.projects.durationLabel,
                        value: selectedProject.timeline[currentLang],
                      },
                      {
                        icon: Award,
                        label: t.projects.operationsClass,
                        value: t.projects.enterpriseSla,
                      },
                    ].map((box, bi) => {
                      const BoxIcon = box.icon;
                      return (
                        <div
                          key={bi}
                          className="bg-neutral-900/50 border border-neutral-800/40 rounded-xl p-4
                                     hover:border-[#d4af37]/15 transition-colors duration-300"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <BoxIcon className="w-4 h-4 text-[#d4af37]/50" />
                            <span className="text-[9px] text-neutral-600 uppercase tracking-[0.15em] font-mono">
                              {box.label}
                            </span>
                          </div>
                          <span className="text-sm text-white font-semibold font-serif">
                            {box.value}
                          </span>
                        </div>
                      );
                    })}
                  </motion.div>

                  {/* KPI deliverables */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
                    className="mb-6"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-px w-4 bg-[#d4af37]/40" />
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37]/70 font-mono font-semibold">
                        {t.projects.deliverableLogs}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedProject.kpis.map((kpi, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
                          className="bg-neutral-900/40 border border-neutral-800/30 rounded-xl p-4 text-center
                                     hover:border-[#d4af37]/15 transition-colors duration-300"
                        >
                          <div className="flex items-center justify-center gap-1.5 mb-1">
                            <TrendingUp className="w-3 h-3 text-[#d4af37]/50" />
                            <span
                              className="text-xl font-bold font-serif"
                              style={{
                                background:
                                  'linear-gradient(135deg, #d4af37, #f0d060)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                              }}
                            >
                              {kpi.value}
                            </span>
                          </div>
                          <span className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider">
                            {kpi.label[currentLang]}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* OEM Note */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="bg-[#d4af37]/[0.04] border border-[#d4af37]/10 rounded-xl p-4"
                  >
                    <p className="text-[11px] text-neutral-500 italic leading-[1.7] font-light">
                      <span className="text-[#d4af37]/60 font-semibold not-italic">
                        OEM /{' '}
                      </span>
                      {t.projects.oemNote}
                    </p>
                  </motion.div>
                </div>

                {/* ── Modal Footer ── */}
                <div className="p-6 border-t border-neutral-800/40">
                  <motion.button
                    onClick={() => setSelectedProject(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full py-3.5 rounded-xl text-[11px] uppercase tracking-[0.2em]
                               font-bold overflow-hidden"
                    style={{
                      background:
                        'linear-gradient(135deg, #d4af37, #f0d060, #d4af37)',
                      boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
                    }}
                  >
                    <motion.span
                      className="absolute inset-0 block -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-150%' }}
                      whileHover={{ x: '150%' }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2 text-black">
                      {t.projects.closeBtn}
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </motion.button>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes goldShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(20,20,20,0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212,175,55,0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212,175,55,0.4);
        }
      `}</style>
    </section>
  );
};