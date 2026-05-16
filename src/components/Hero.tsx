import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Translation, Lang } from '../data/content';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  t: Translation;
  setActiveTab: (tab: string) => void;
  currentLang: Lang;
}

const backgroundOptions = [
  {
    id: 'corridor',
    nameKey: 'sceneDelivery',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'hvac',
    nameKey: 'sceneQuality',
    url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'lounge',
    nameKey: 'sceneTrusted',
    url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85',
  },
];

const SLIDE_DURATION = 9000;
const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* ══════════════════════════════════════════════════════════
   PERFORMANCE: Pre-generate all random values at module level
══════════════════════════════════════════════════════════ */
const PARTICLE_DATA = (() => {
  const risingTrails = Array.from({ length: 80 }, (_, i) => ({
    id: `rise-${i}`,
    x: Math.random() * 100,
    size: 1 + Math.random() * 3,
    delay: Math.random() * 14,
    duration: 6 + Math.random() * 9,
    opacity: 0.2 + Math.random() * 0.5,
  }));

  const floatingOrbs = Array.from({ length: 35 }, (_, i) => ({
    id: `orb-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 8,
    delay: Math.random() * 7,
    driftX: [
      0,
      8 + Math.random() * 12,
      -(6 + Math.random() * 10),
      5 + Math.random() * 8,
      0,
    ] as number[],
    driftY: [
      0,
      -(15 + Math.random() * 20),
      -(5 + Math.random() * 10),
      -(18 + Math.random() * 15),
      0,
    ] as number[],
    duration: 9 + Math.random() * 5,
  }));

  const tinySparkles = Array.from({ length: 60 }, (_, i) => ({
    id: `sparkle-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 9,
    flashDuration: 1.2 + Math.random() * 1.8,
    repeatDelay: 2 + Math.random() * 5,
  }));

  const slowDrifters = Array.from({ length: 12 }, (_, i) => ({
    id: `drift-${i}`,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    size: 20 + Math.random() * 30,
    delay: Math.random() * 5,
    duration: 18 + Math.random() * 10,
    rotation: Math.random() * 360,
  }));

  const shootingStreaks = Array.from({ length: 6 }, (_, i) => ({
    id: `streak-${i}`,
    x: 5 + Math.random() * 75,
    y: 10 + Math.random() * 60,
    delay: 3 + i * 4 + Math.random() * 5,
    duration: 1.2 + Math.random() * 1.5,
    repeatDelay: 10 + Math.random() * 12,
  }));

  const pulseRings = Array.from({ length: 5 }, (_, i) => ({
    id: `pulse-${i}`,
    x: 20 + Math.random() * 60,
    y: 20 + Math.random() * 60,
    delay: i * 3.5 + Math.random() * 2,
    duration: 5 + Math.random() * 3,
  }));

  const constellationDots = Array.from({ length: 30 }, (_, i) => ({
    id: `const-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 1.5,
    delay: Math.random() * 6,
    duration: 2.5 + Math.random() * 3.5,
  }));

  return {
    risingTrails,
    floatingOrbs,
    tinySparkles,
    slowDrifters,
    shootingStreaks,
    pulseRings,
    constellationDots,
  };
})();

/* ── Word-by-word headline reveal ── */
const WordReveal: React.FC<{
  text: string;
  highlightLastN?: number;
  delay?: number;
}> = ({ text, highlightLastN = 2, delay = 0 }) => {
  const words = text.split(' ');
  const splitIndex = words.length - highlightLastN;
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 36, rotateX: 45 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.65, delay: delay + i * 0.09, ease: EASE }}
          style={{ perspective: 600 }}
        >
          {i >= splitIndex ? (
            <span
              className="italic"
              style={{
                background:
                  'linear-gradient(135deg,#d4af37 0%,#f0d060 50%,#d4af37 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 3s ease-in-out infinite',
              }}
            >
              {word}
            </span>
          ) : (
            <span className="text-white">{word}</span>
          )}
          {i < words.length - 1 && <span>&nbsp;</span>}
        </motion.span>
      ))}
    </>
  );
};

/* ── Animated count-up for KPI numbers ── */
const CountUp: React.FC<{ value: string; inView: boolean; delay: number }> = ({
  value,
  inView,
  delay,
}) => {
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9.]/g, '').replace('+', '');
  const hasPlus = value.includes('+');
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView || isNaN(numeric)) {
      setDisplay(value);
      return;
    }
    let start: number | null = null;
    let raf: number;
    const duration = 1800;
    const run = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(
        `${Math.floor(eased * numeric)}${suffix}${hasPlus ? '+' : ''}`
      );
      if (p < 1) raf = requestAnimationFrame(run);
      else setDisplay(value);
    };
    const t = setTimeout(() => {
      raf = requestAnimationFrame(run);
    }, delay * 1000);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [inView, value, numeric, suffix, hasPlus, delay]);

  return <>{display}</>;
};

/* ══════════════════════════════════════════════════════════
   PARTICLE COMPONENTS
══════════════════════════════════════════════════════════ */

/* Layer 1 — Rising Trails */
const RisingTrail: React.FC<{
  x: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}> = React.memo(({ x, size, delay, duration, opacity }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      bottom: '-2%',
      width: size,
      height: size,
      willChange: 'transform, opacity',
      background: `radial-gradient(circle, rgba(212,175,55,${opacity}) 0%, transparent 70%)`,
      boxShadow:
        opacity > 0.4
          ? `0 0 ${size * 2}px rgba(212,175,55,${opacity * 0.25})`
          : 'none',
    }}
    initial={{ y: 0, opacity: 0 }}
    animate={{
      y: '-110vh',
      opacity: [0, opacity, opacity, opacity * 0.4, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  />
));

/* Layer 2 — Floating Orbs */
const FloatingOrb: React.FC<{
  x: number;
  y: number;
  size: number;
  delay: number;
  driftX: number[];
  driftY: number[];
  duration: number;
}> = React.memo(({ x, y, size, delay, driftX, driftY, duration }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      willChange: 'transform, opacity',
      background:
        'radial-gradient(circle, rgba(212,175,55,0.35) 0%, transparent 70%)',
      boxShadow: `0 0 ${size * 3}px rgba(212,175,55,0.12)`,
    }}
    animate={{
      x: driftX,
      y: driftY,
      opacity: [0.1, 0.45, 0.25, 0.55, 0.1],
      scale: [1, 1.15, 0.9, 1.1, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
));

/* Layer 3 — Tiny Sparkles */
const TinySparkle: React.FC<{
  x: number;
  y: number;
  delay: number;
  flashDuration: number;
  repeatDelay: number;
}> = React.memo(({ x, y, delay, flashDuration, repeatDelay }) => (
  <motion.div
    className="absolute w-[2px] h-[2px] rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      willChange: 'transform, opacity',
      background: '#d4af37',
      boxShadow: '0 0 5px rgba(212,175,55,0.7)',
    }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1.6, 0],
    }}
    transition={{
      duration: flashDuration,
      delay,
      repeat: Infinity,
      repeatDelay,
      ease: 'easeInOut',
    }}
  />
));

/* Layer 4 — Slow Drifters — Triangle Shape */
const SlowDrifter: React.FC<{
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
}> = React.memo(({ x, y, size, delay, duration, rotation }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      willChange: 'transform, opacity',
      filter: `blur(${size * 0.15}px)`,
    }}
    animate={{
      x: [0, 35, -25, 18, 0],
      y: [0, -45, -18, -35, 0],
      opacity: [0.04, 0.18, 0.08, 0.14, 0.04],
      scale: [1, 1.25, 0.85, 1.1, 1],
      rotate: [
        rotation,
        rotation + 60,
        rotation + 120,
        rotation + 180,
        rotation + 360,
      ],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ display: 'block' }}
    >
      <polygon
        points="12,2 22,20 2,20"
        fill="none"
        stroke="rgba(212,175,55,0.15)"
        strokeWidth="1"
        strokeLinejoin="miter"
      />
    </svg>
  </motion.div>
));

/* Layer 5 — Shooting Streaks */
const ShootingStreak: React.FC<{
  x: number;
  y: number;
  delay: number;
  duration: number;
  repeatDelay: number;
}> = React.memo(({ x, y, delay, duration, repeatDelay }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: '55px',
      height: '1.5px',
      willChange: 'transform, opacity',
      background:
        'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.7) 50%, transparent 100%)',
      transformOrigin: 'left center',
      rotate: '-32deg',
      boxShadow: '0 0 10px rgba(212,175,55,0.35)',
    }}
    initial={{ opacity: 0, scaleX: 0, x: 0, y: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scaleX: [0, 1, 0.3],
      x: [0, 110, 190],
      y: [0, -55, -90],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatDelay,
      ease: 'easeOut',
    }}
  />
));

/* Layer 6 — Pulse Rings */
const PulseRing: React.FC<{
  x: number;
  y: number;
  delay: number;
  duration: number;
}> = React.memo(({ x, y, delay, duration }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: 6,
      height: 6,
      willChange: 'transform, opacity',
      border: '1px solid rgba(212,175,55,0.25)',
      transform: 'translate(-50%, -50%)',
    }}
    animate={{
      scale: [1, 22, 38],
      opacity: [0.35, 0.07, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatDelay: 3,
      ease: 'easeOut',
    }}
  />
));

/* Layer 7 — Constellation Dots */
const ConstellationDot: React.FC<{
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}> = React.memo(({ x, y, size, delay, duration }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      willChange: 'transform, opacity',
      background: '#d4af37',
      boxShadow: `0 0 ${size * 2.5}px rgba(212,175,55,0.5)`,
    }}
    animate={{
      opacity: [0.08, 0.65, 0.08],
      scale: [0.8, 1.25, 0.8],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
));

/* ══════════════════════════════════════════════
   MAIN HERO
   ✅ SplashScreen completely removed
   ✅ Image fades in smoothly when ready
   ✅ Content waits for image then fades in
══════════════════════════════════════════════ */
export const Hero: React.FC<HeroProps> = ({ t, setActiveTab, currentLang }) => {
  const [activeBg, setActiveBg] = useState(0);
  const [direction, setDirection] = useState(1);
  const [kpiVisible, setKpiVisible] = useState(false);

  // ✅ FIXED: imageReady controls content visibility
  // No SplashScreen — just smooth fade in when image loads
  const [imageReady, setImageReady] = useState(false);

  const isRtl = currentLang === 'ar';

  const {
    risingTrails,
    floatingOrbs,
    tinySparkles,
    slowDrifters,
    shootingStreaks,
    pulseRings,
    constellationDots,
  } = PARTICLE_DATA;

  /* ✅ Preload first image silently — no splash, just wait */
  useEffect(() => {
    const img = new Image();
    img.src = backgroundOptions[0].url;

    img.onload = () => setImageReady(true);
    img.onerror = () => setImageReady(true);

    // Preload other images silently in background
    backgroundOptions.slice(1).forEach((bg) => {
      const preload = new Image();
      preload.src = bg.url;
    });

    // Safety fallback — never wait more than 4s
    const fallback = setTimeout(() => setImageReady(true), 4000);

    return () => clearTimeout(fallback);
  }, []);

  /* Auto-slide — only after image is ready */
  useEffect(() => {
    if (!imageReady) return;
    const id = setInterval(() => {
      setDirection(1);
      setActiveBg((p) => (p + 1) % backgroundOptions.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [imageReady]);

  /* Count-up trigger */
  useEffect(() => {
    if (!imageReady) return;
    const id = setTimeout(() => setKpiVisible(true), 1200);
    return () => clearTimeout(id);
  }, [imageReady]);

  const handleBgChange = useCallback(
    (index: number) => {
      setDirection(index > activeBg ? 1 : -1);
      setActiveBg(index);
    },
    [activeBg]
  );

  const handleNav = useCallback(
    (id: string) => {
      setActiveTab(id);
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const el = document.getElementById(id);
      if (el)
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth',
        });
    },
    [setActiveTab]
  );

  const getSceneName = (key: string) =>
    (t.hero[key as keyof typeof t.hero] as string) || key;

  const bgEnter = (d: number) => ({
    opacity: 0,
    scale: 1.1,
    x: d > 0 ? 60 : -60,
  });

  const bgCenter = {
    opacity: 1,
    scale: 1.04,
    x: 0,
    transition: { duration: 1.2, ease: EASE },
  };

  const bgExit = (d: number) => ({
    opacity: 0,
    scale: 1,
    x: d > 0 ? -60 : 60,
    transition: { duration: 1.0, ease: EASE },
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>

      {/* ✅ Pure black base — visible while image loads, no flash */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* ── Backgrounds — fade in when ready ── */}
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={activeBg}
          custom={direction}
          initial={imageReady ? bgEnter(direction) : { opacity: 0, scale: 1.1, x: 0 }}
          animate={bgCenter}
          exit={bgExit(direction)}
          className="absolute inset-0 will-change-transform z-[1]"
        >
          {/* ✅ Image fades in smoothly — no jarring transition */}
          <motion.img
            src={backgroundOptions[activeBg].url}
            alt={getSceneName(backgroundOptions[activeBg].nameKey)}
            className="w-full h-full object-cover object-center"
            loading="eager"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: imageReady ? 1 : 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/92" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/15" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.45)_100%)]" />
        </motion.div>
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════
          PARTICLE SYSTEM — 7 LAYERS
      ══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[12] pointer-events-none overflow-hidden">

        {/* L1 — Rising Trails */}
        {risingTrails.map((p) => (
          <RisingTrail
            key={p.id}
            x={p.x}
            size={p.size}
            delay={p.delay}
            duration={p.duration}
            opacity={p.opacity}
          />
        ))}

        {/* L2 — Floating Orbs */}
        {floatingOrbs.map((p) => (
          <FloatingOrb
            key={p.id}
            x={p.x}
            y={p.y}
            size={p.size}
            delay={p.delay}
            driftX={p.driftX}
            driftY={p.driftY}
            duration={p.duration}
          />
        ))}

        {/* L3 — Tiny Sparkles */}
        {tinySparkles.map((p) => (
          <TinySparkle
            key={p.id}
            x={p.x}
            y={p.y}
            delay={p.delay}
            flashDuration={p.flashDuration}
            repeatDelay={p.repeatDelay}
          />
        ))}

        {/* L4 — Slow Drifters — Triangle SVG */}
        {slowDrifters.map((p) => (
          <SlowDrifter
            key={p.id}
            x={p.x}
            y={p.y}
            size={p.size}
            delay={p.delay}
            duration={p.duration}
            rotation={p.rotation}
          />
        ))}

        {/* L5 — Shooting Streaks */}
        {shootingStreaks.map((p) => (
          <ShootingStreak
            key={p.id}
            x={p.x}
            y={p.y}
            delay={p.delay}
            duration={p.duration}
            repeatDelay={p.repeatDelay}
          />
        ))}

        {/* L6 — Pulse Rings */}
        {pulseRings.map((p) => (
          <PulseRing
            key={p.id}
            x={p.x}
            y={p.y}
            delay={p.delay}
            duration={p.duration}
          />
        ))}

        {/* L7 — Constellation Dots */}
        {constellationDots.map((p) => (
          <ConstellationDot
            key={p.id}
            x={p.x}
            y={p.y}
            size={p.size}
            delay={p.delay}
            duration={p.duration}
          />
        ))}
      </div>

      {/* ── Grid overlay ── */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] z-[13] pointer-events-none"
        animate={{ opacity: [0.018, 0.04, 0.018] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Decorative rings ── */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] border border-[#d4af37]/[0.06] rounded-full pointer-events-none z-[14]"
        animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] border border-[#d4af37]/[0.08] rounded-full pointer-events-none z-[14]"
        animate={{ rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] border border-[#d4af37]/[0.05] rounded-full pointer-events-none z-[14]"
        animate={{ rotate: -360 }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── Left scroll label ── */}
      <div className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-20">
        <motion.div
          className="w-px h-20 bg-gradient-to-b from-transparent to-[#d4af37]/40"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: imageReady ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
          style={{ transformOrigin: 'top' }}
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: imageReady ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-[10px] tracking-[0.3em] uppercase text-white/40 [writing-mode:vertical-lr] rotate-180"
        >
          {t.hero.scrollLabel}
        </motion.span>
        <motion.div
          className="w-px h-20 bg-gradient-to-b from-[#d4af37]/40 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: imageReady ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
          style={{ transformOrigin: 'bottom' }}
        />
      </div>

      {/* ── Scene selector top-right ── */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: imageReady ? 1 : 0, x: imageReady ? 0 : 16 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-28 right-8 z-20 hidden lg:flex flex-col items-end gap-1.5"
      >
        <span className="text-[8px] uppercase tracking-[0.3em] text-neutral-600 font-mono">
          {t.hero.activeScene}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={activeBg}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
            className="text-[11px] text-[#d4af37]/70 font-medium tracking-wider"
          >
            {getSceneName(backgroundOptions[activeBg].nameKey)}
          </motion.span>
        </AnimatePresence>
        <div className="flex gap-1.5 mt-0.5">
          {backgroundOptions.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => handleBgChange(i)}
              className={`rounded-full transition-colors duration-300 ${
                i === activeBg
                  ? 'bg-[#d4af37]'
                  : 'bg-neutral-700 hover:bg-neutral-500'
              }`}
              animate={
                i === activeBg
                  ? { width: 20, height: 4 }
                  : { width: 4, height: 4 }
              }
              transition={{ duration: 0.4, ease: EASE }}
            />
          ))}
        </div>
      </motion.div>

      {/* ━━━ Main content ━━━ */}
      <div
        className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8 text-center pt-24 pb-32 w-full"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: imageReady ? 1 : 0, y: imageReady ? 0 : 16 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <motion.div
            className="h-px w-8 bg-[#d4af37]/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: imageReady ? 1 : 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ transformOrigin: 'right' }}
          />
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                        bg-neutral-900/80 border border-[#d4af37]/25 backdrop-blur-sm
                        text-[#d4af37] text-[10px] uppercase tracking-[0.25em] font-medium"
            whileHover={{ scale: 1.06, borderColor: 'rgba(212,175,55,0.5)' }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="flex"
              animate={{ rotate: [0, 18, -18, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
            >
              <Sparkles className="w-3 h-3" />
            </motion.span>
            <span>{t.hero.badge}</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
            </span>
          </motion.div>
          <motion.div
            className="h-px w-8 bg-[#d4af37]/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: imageReady ? 1 : 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] mb-8">
          {imageReady && (
            <WordReveal
              text={t.hero.headline}
              highlightLastN={2}
              delay={0.2}
            />
          )}
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{
            opacity: imageReady ? 1 : 0,
            y: imageReady ? 0 : 18,
            filter: imageReady ? 'blur(0px)' : 'blur(6px)',
          }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="max-w-2xl mx-auto text-sm sm:text-base text-white/70 mb-10 leading-relaxed"
        >
          {t.hero.desc}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: imageReady ? 1 : 0, y: imageReady ? 0 : 18 }}
          transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={() => handleNav('contact')}
            className="group relative px-8 py-4 bg-gradient-to-r from-[#d4af37] to-[#e6ca65]
                       text-black font-bold text-sm uppercase tracking-wider rounded-full overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 18px 38px rgba(212,175,55,0.35)',
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="absolute inset-0 block -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ x: '-150%' }}
              whileHover={{ x: '150%' }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
            />
            <span className="relative flex items-center gap-2">
              {t.hero.ctaPrimary}
              <motion.span
                className="flex"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </span>
          </motion.button>

          <motion.button
            onClick={() => handleNav('projects')}
            className="px-8 py-4 border border-white/20 text-white font-bold
                       text-sm uppercase tracking-wider rounded-full"
            whileHover={{
              scale: 1.05,
              borderColor: 'rgba(212,175,55,0.5)',
              color: '#d4af37',
              boxShadow: '0 0 24px rgba(212,175,55,0.1)',
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            {t.hero.ctaSecondary}
          </motion.button>
        </motion.div>

        {/* KPI Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: imageReady ? 1 : 0, y: imageReady ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { val: t.hero.kpi1, sub: t.hero.kpi1Sub },
            { val: t.hero.kpi2, sub: t.hero.kpi2Sub },
            { val: t.hero.kpi3, sub: t.hero.kpi3Sub },
            { val: t.hero.kpi4, sub: t.hero.kpi4Sub },
          ].map((kpi, i) => (
            <motion.div
              key={i}
              className="text-center group cursor-default"
              whileHover={{ scale: 1.07, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-[#d4af37] font-serif">
                <CountUp
                  value={kpi.val}
                  inView={kpiVisible}
                  delay={i * 0.12}
                />
              </div>
              <motion.div
                className="h-px bg-[#d4af37]/30 mx-auto mt-2 mb-1"
                initial={{ width: 0 }}
                whileHover={{ width: 32 }}
                transition={{ duration: 0.35 }}
              />
              <div className="text-[10px] text-white/50 uppercase tracking-wider mt-1">
                {kpi.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: imageReady ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => handleNav('about')}
        >
          <motion.span
            className="text-[9px] uppercase tracking-[0.3em] text-white/30 group-hover:text-[#d4af37]/60 transition-colors duration-300"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {t.hero.scrollLabel}
          </motion.span>
          <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-[#d4af37]/40 flex items-start justify-center pt-1 transition-colors duration-300">
            <motion.div
              className="w-0.5 h-2 rounded-full bg-[#d4af37]/60"
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{
                duration: 1.7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};