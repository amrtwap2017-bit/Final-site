import React, { useState, useEffect } from 'react';
import logo from '../assets/Logo.png';
interface LoadingScreenProps {
  onComplete: () => void;
}
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        const increment = prev < 60 ? 3 : prev < 85 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);
  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-600 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Decorative gradient lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#d4af37]/15 to-transparent" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent" />
        <div className="absolute top-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-white/3 to-transparent" />
        <div className="absolute top-[80%] left-0 w-full h-px bg-gradient-to-r from-transparent via-white/3 to-transparent" />
      </div>
      <div className="relative flex flex-col items-center gap-8 px-8">
        {/* Animated Triangle Logo */}
        <div className="relative w-20 h-20">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-[#d4af37]/5 blur-3xl scale-[2] animate-pulse" />
          
          {/* Logo image centered */}
          <img
            src={logo}
            alt="logo"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20
                      w-22 h-22
                      transition-all duration-500
                      group-hover:scale-105 group-hover:brightness-110
                      drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]
                      group-hover:drop-shadow-[0_0_35px_rgba(212,175,55,0.45)]"
          />
          
          {/* SVG Triangle with animation */}
          <div className="relative w-20 h-20">

            {/* --- Ambient outer glow ring --- */}
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(198,161,91,0.12) 0%, transparent 70%)',
                animation: 'pulse-gold 3s ease-in-out infinite',
              }}
            />

            {/* --- Orbit ring (slow rotate) --- */}
            <svg
              viewBox="0 0 80 80"
              className="absolute inset-0 w-20 h-20 pointer-events-none z-10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ animation: 'orbitGlow 12s linear infinite' }}
            >
              <circle
                cx="40"
                cy="40"
                r="37"
                stroke="#C6A15B"
                strokeWidth="0.3"
                strokeDasharray="4 6"
                opacity="0.3"
              />
            </svg>

            {/* --- Main SVG Triangle --- */}
            <svg
              viewBox="0 0 80 80"
              className="absolute inset-0 w-20 h-20 z-30 pointer-events-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glow filter definition */}
              <defs>
                <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F4B942" stopOpacity="1" />
                  <stop offset="50%" stopColor="#C6A15B" stopOpacity="1" />
                  <stop offset="100%" stopColor="#d4af37" stopOpacity="0.7" />
                </linearGradient>
              </defs>

              {/* Shadow/depth outer triangle */}
              <polygon
                points="40,6 74,66 6,66"
                stroke="rgba(198,161,91,0.15)"
                strokeWidth="4"
                fill="none"
                filter="url(#goldGlow)"
              />

              {/* Outer triangle — animated draw */}
              <polygon
                points="40,6 74,66 6,66"
                stroke="url(#goldGrad)"
                strokeWidth="1.8"
                fill="none"
                filter="url(#goldGlow)"
                style={{
                  strokeDasharray: 300,
                  strokeDashoffset: 300,
                  animation: 'dashAnim 3.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                }}
              />

              {/* Inner triangle — fade in with delay */}
              <polygon
                points="40,20 62,58 18,58"
                stroke="#C6A15B"
                strokeWidth="0.6"
                fill="none"
                filter="url(#softGlow)"
                style={{
                  opacity: 0,
                  transformOrigin: '40px 40px',
                  animation: 'innerTriangleFade 1.8s ease forwards 3s',
                }}
              />

              {/* Center dot — luxury accent */}
              <circle
                cx="40"
                cy="42"
                r="1.5"
                fill="#C6A15B"
                opacity="0"
                style={{
                  animation: 'innerTriangleFade 0.8s ease forwards 2s',
                }}
              />

              {/* Corner accent dots */}
              <circle cx="40" cy="6" r="1.2" fill="#F4B942" opacity="0"
                style={{ animation: 'innerTriangleFade 0.8s ease forwards 1.8s' }}
              />
              <circle cx="40" cy="42" r="1.5" fill="#C6A15B" opacity="0"
                style={{ animation: 'innerTriangleFade 1s ease forwards 3.5s' }}
              />
              <circle cx="6" cy="66" r="1.2" fill="#F4B942" opacity="0"
                style={{ animation: 'innerTriangleFade 0.8s ease forwards 2s' }}
              />
            </svg>

            {/* --- Ambient particle dots --- */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full pointer-events-none"
                style={{
                  background: '#C6A15B',
                  top: `${[15, 70, 45][i]}%`,
                  left: `${[10, 80, 50][i]}%`,
                  opacity: 0.4,
                  animation: `particleFloat ${5 + i * 2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.8}s`,
                }}
              />
            ))}
          </div>

          <svg
            viewBox="0 0 80 80"
            className="absolute inset-0 w-20 h-20 z-30 pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          > 
            {/* Outer triangle */}
            <polygon
              points="40,6 74,66 6,66"
              stroke="#d4af37"
              strokeWidth="2"
              fill="none"
              style={{ 
                strokeDasharray: 200, 
                strokeDashoffset: 200, 
                animation: 'dashAnim 1.5s ease forwards' 
              }}
            />
            {/* Inner triangle */}
            <polygon
              points="40,20 62,58 18,58"
              stroke="#d4af37"
              strokeWidth="0.8"
              fill="none"
              opacity="0.4"
            />
          </svg>
          
          <style>{`
            @keyframes dashAnim {
              to { stroke-dashoffset: 0; }
            }
          `}</style>
        </div>        {/* Brand Name */}
        <div className="text-center space-y-1">
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-[0.3em] text-[#d4af37] uppercase"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            TRIANGLE BLACK
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
          <p className="text-[9px] sm:text-[10px] tracking-[0.35em] text-white/40 uppercase font-mono">
            Hospitality Engineering Initialization
          </p>
        </div>
        {/* Progress Bar */}
        <div className="w-64 sm:w-80 space-y-2">
          <div className="h-px bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d4af37]/60 to-[#d4af37] rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-[#d4af37]/60 uppercase tracking-widest font-mono">
              SYSTEMS SECURED
            </span>
            <span className="text-[9px] text-[#d4af37] font-mono font-bold">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};