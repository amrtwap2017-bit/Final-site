import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.05) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isInView };
}

const steps = [
  {
    number: '01',
    title: 'Discovery & Vision',
    description:
      'We immerse ourselves in your project vision, conducting thorough site analysis, stakeholder interviews, and feasibility studies to establish the engineering foundation.',
    details: ['Site Assessment', 'Stakeholder Alignment', 'Feasibility Study', 'Budget Framework'],
  },
  {
    number: '02',
    title: 'Concept Design',
    description:
      'Our engineers develop innovative system concepts that harmonize with architectural intent, guest experience goals, and sustainability targets.',
    details: ['System Architecture', '3D BIM Modeling', 'Energy Modeling', 'Design Review'],
  },
  {
    number: '03',
    title: 'Engineering & Procurement',
    description:
      'Detailed engineering documentation paired with strategic procurement ensures premium equipment is specified, sourced, and delivered on schedule.',
    details: ['Detail Engineering', 'Equipment Selection', 'Vendor Negotiation', 'Quality Control'],
  },
  {
    number: '04',
    title: 'Implementation & Commissioning',
    description:
      'On-site supervision and rigorous commissioning protocols guarantee every system performs to specification, delivering the luxury experience your guests expect.',
    details: ['Site Supervision', 'System Integration', 'Testing & Balancing', 'Handover & Training'],
  },
];
export default function Process() {
  const { ref, isInView } = useInView(0.05);
  return (
    <section id="process" className="relative py-32 lg:py-40 bg-charcoal overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      {/* Large background number */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[30vw] font-serif font-bold text-white/[0.015] leading-none select-none pointer-events-none">
        TB
      </div>
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="max-w-3xl mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-gold/50" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-gold/80 font-medium">
              Our Methodology
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
          >
            A Process{' '}
            <span className="text-gradient-gold italic">Refined</span> Over
            Decades
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 text-lg font-light leading-relaxed"
          >
            Our four-phase methodology ensures precision delivery at every stage,
            from initial concept through to final commissioning.
          </motion.p>
        </div>
        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 lg:left-[60px] top-0 bottom-0 w-px bg-white/5 hidden sm:block" />
          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 * i }}
                className="group relative grid sm:grid-cols-[120px_1fr] gap-6 lg:gap-12 py-12 sm:py-16 border-b border-white/5 last:border-0"
              >
                {/* Number */}
                <div className="relative">
                  {/* Dot on the line */}
                  <div className="absolute left-6 lg:left-[60px] top-0 -translate-x-1/2 w-3 h-3 border border-white/20 bg-charcoal group-hover:border-gold group-hover:bg-gold/20 transition-all duration-500 hidden sm:block" />
                  <span className="text-6xl lg:text-7xl font-serif font-bold text-white/[0.06] group-hover:text-gold/20 transition-colors duration-500 sm:text-right sm:block leading-none">
                    {step.number}
                  </span>
                </div>
                {/* Content */}
                <div className="sm:pl-8 lg:pl-12">
                  <h3 className="font-serif text-2xl lg:text-3xl font-semibold mb-4 group-hover:text-gold transition-colors duration-500">
                    {step.title}
                  </h3>
                  <p className="text-white/35 font-light leading-relaxed mb-6 max-w-2xl">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {step.details.map((detail, j) => (
                      <span
                        key={j}
                        className="text-[10px] tracking-[0.15em] uppercase px-4 py-2 border border-white/8 text-white/30 group-hover:border-gold/15 group-hover:text-white/50 transition-all duration-500"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}