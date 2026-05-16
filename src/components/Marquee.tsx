import { motion } from 'framer-motion';
const items = [
  'MEP Engineering',
  '✦',
  'Luxury Hotels',
  '✦',
  'Energy Solutions',
  '✦',
  'Facility Operations',
  '✦',
  'Resort Design',
  '✦',
  'Sustainability',
  '✦',
  'Smart Buildings',
  '✦',
  'Water Management',
  '✦',
];
export default function Marquee() {
  return (
    <div className="relative py-8 bg-charcoal border-y border-white/5 overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex gap-8 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`text-sm tracking-[0.2em] uppercase shrink-0 ${
              item === '✦'
                ? 'text-gold/40 text-xs'
                : 'text-white/15 font-light'
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
