import React, { useState, useRef, useEffect } from 'react';
import { Translation, Lang, trustedBrands } from '../data/content';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface TestimonialsProps {
  t: Translation;
  currentLang: Lang;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ t, currentLang }) => {
  const isRtl = currentLang === 'ar';
  const [current, setCurrent] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const items = t.testimonials.items;
  const next = () => setCurrent((prev) => (prev + 1) % items.length);
  const prev = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);

  return (
    <section
      className="py-24 bg-black relative overflow-hidden"
      ref={ref}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=2000&q=80"
          alt="Background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>

      <div className="w-[90%] max-w-[1100px] mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37] block mb-3 font-mono">
            {t.testimonials.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif leading-tight">
            {t.testimonials.heading.split(' ').slice(0, -1).join(' ')}{' '}
            <span className="text-[#d4af37]">{t.testimonials.heading.split(' ').slice(-1)}</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className={`relative max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-neutral-950/80 border border-neutral-900 rounded-3xl p-8 md:p-12 relative">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-[#d4af37]/10" />

            <div className="text-center">
              <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed mb-8 italic">
                "{items[current].quote}"
              </p>

              <div>
                <span className="text-white font-bold font-serif block">
                  {items[current].author}
                </span>
                <span className="text-xs text-[#d4af37] uppercase tracking-wider">
                  {items[current].role}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-neutral-800 hover:border-[#d4af37] flex items-center justify-center text-neutral-400 hover:text-[#d4af37] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-6 h-2 bg-[#d4af37]'
                      : 'w-2 h-2 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-neutral-800 hover:border-[#d4af37] flex items-center justify-center text-neutral-400 hover:text-[#d4af37] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Client Brands */}
        <div className={`mt-20 text-center transition-all duration-1000 delay-400 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-xs uppercase tracking-wider text-neutral-600 block mb-6">
            {t.testimonials.brandsBadge}
          </span>
          <div className="flex flex-wrap justify-center gap-6">
            {trustedBrands.map((brand, i) => (
              <span
                key={i}
                className="text-sm text-neutral-600 hover:text-[#d4af37] transition-colors cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
