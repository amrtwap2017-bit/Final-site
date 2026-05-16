import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Translation, Lang, servicesData } from '../data/content';
import {
  Send,
  Mail,
  Phone,
  Building,
  CheckCircle,
  ArrowRight,
  MapPin,
  Clock,
} from 'lucide-react';

interface ContactProps {
  t: Translation;
  currentLang: Lang;
  prefilledService?: string;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Contact: React.FC<ContactProps> = ({
  t,
  currentLang,
  prefilledService,
}) => {
  const isRtl = currentLang === 'ar';
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: prefilledService || '',
    message: '',
  });

  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, amount: 0.2 });
  const formInView = useInView(formRef, { once: true, amount: 0.15 });
  const infoInView = useInView(infoRef, { once: true, amount: 0.15 });

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, service: prefilledService }));
    }
  }, [prefilledService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      service: '',
      message: '',
    });
  };

  const serviceOptions = servicesData.map((s) => s.title[currentLang]);

  const contactItems = [
    {
      icon: Building,
      label: t.contact.headquarters,
      value: 'TRIANGLE BLACK CORP',
      sub: t.contact.headquartersSub,
      href: undefined,
    },
    {
      icon: Mail,
      label: t.contact.emailLabel,
      value: 'info@triangleblack.com',
      sub: t.contact.emailSub,
      href: 'mailto:info@triangleblack.com',
    },
    {
      icon: Phone,
      label: t.contact.phoneLabel,
      value: '+20 10 XXXX XXXX',
      sub: t.contact.phoneSub,
      href: 'tel:+20100000000',
    },
  ];

  // Input wrapper component for consistent styling
  const InputWrapper: React.FC<{
    fieldName: string;
    children: React.ReactNode;
  }> = ({ fieldName, children }) => (
    <div className="relative group">
      {/* Top accent on focus */}
      <motion.div
        animate={{
          width: focusedField === fieldName ? '100%' : '0%',
          opacity: focusedField === fieldName ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: EASE }}
        className="absolute top-0 left-0 h-[2px] rounded-tr-full z-10"
        style={{
          background: 'linear-gradient(90deg, #d4af37, #f5e070, #d4af37)',
        }}
      />
      {children}
    </div>
  );

  const inputClass = `w-full bg-neutral-950/80 border border-neutral-800/60 rounded-xl px-5 py-4
    text-[13px] text-white placeholder:text-neutral-600 font-light
    focus:outline-none focus:border-[#d4af37]/40 focus:bg-neutral-900/50
    hover:border-neutral-700/80
    transition-all duration-400`;

  return (
    <section
      className="relative py-24 lg:py-32 bg-neutral-950 overflow-hidden"
      id="contact"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* ════════════════════════════════════════════
          LAYERED BACKGROUND
      ════════════════════════════════════════════ */}

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />

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
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#d4af37]/[0.03] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#d4af37]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 -right-40 w-[450px] h-[450px] border border-[#d4af37]/[0.04] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 -left-32 w-[350px] h-[350px] border border-[#d4af37]/[0.03] rounded-full pointer-events-none" />

      {/* SVG path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="contactPath" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.06" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M 0 300 Q 400 200, 800 350 T 1600 250"
          fill="none"
          stroke="url(#contactPath)"
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
                {t.contact.badge}
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
            {t.contact.heading.split(' ').slice(0, -1).join(' ')}{' '}
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
              {t.contact.heading.split(' ').slice(-1)}
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            className="text-neutral-500 text-[13px] sm:text-[14px] font-light leading-[1.8] max-w-xl mx-auto"
          >
            {t.contact.desc}
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
                2. FORM + CONTACT INFO GRID
            ══════════════════════════════════════ */}
            <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 max-w-5xl mx-auto items-stretch">

              {/* ── LEFT: FORM ── */}
              <div ref={formRef} className="lg:col-span-3 flex">
                <motion.div
                  initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                  animate={formInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="relative w-full flex flex-col"
                >
                  {/* Form card border glow */}
                  <div
                    className="absolute -inset-[1px] rounded-2xl opacity-40"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(212,175,55,0.15), transparent 50%, rgba(212,175,55,0.08))',
                    }}
                  />

                  <div className="relative bg-neutral-950/80 border border-neutral-800/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm overflow-hidden flex flex-col flex-1">

                    {/* Top accent */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/25 to-transparent" />

                    {/* Corner ornament */}
                    <div className="absolute top-3 right-3 w-8 h-8 opacity-15 pointer-events-none">
                      <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-[#d4af37] to-transparent" />
                      <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-[#d4af37] to-transparent" />
                    </div>

                    {/* Success message */}
                    <AnimatePresence>
                      {submitted && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: -10, height: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="mb-6 overflow-hidden"
                        >
                          <div className="flex items-center gap-3 bg-[#d4af37]/[0.08] border border-[#d4af37]/20 rounded-xl p-4">
                            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                              <CheckCircle className="w-5 h-5 text-[#d4af37]" />
                            </div>
                            <div>
                              <span
                                className="text-sm font-semibold block"
                                style={{
                                  background:
                                    'linear-gradient(135deg, #d4af37, #f0d060)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  backgroundClip: 'text',
                                }}
                              >
                                {t.contact.successTitle}
                              </span>
                              <span className="text-[11px] text-neutral-500 font-light">
                                {t.contact.successDesc}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Form — flex-1 pushes content to fill, justify-between spreads fields + button */}
                    <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                      <div className="space-y-4 flex-1">

                        {/* Row 1: Name + Email */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <InputWrapper fieldName="name">
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              onFocus={() => setFocusedField('name')}
                              onBlur={() => setFocusedField(null)}
                              placeholder={t.contact.formName}
                              className={inputClass}
                            />
                          </InputWrapper>

                          <InputWrapper fieldName="email">
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField(null)}
                              placeholder={t.contact.formEmail}
                              className={inputClass}
                            />
                          </InputWrapper>
                        </div>

                        {/* Row 2: Company + Phone */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <InputWrapper fieldName="company">
                            <input
                              type="text"
                              value={formData.company}
                              onChange={(e) =>
                                setFormData({ ...formData, company: e.target.value })
                              }
                              onFocus={() => setFocusedField('company')}
                              onBlur={() => setFocusedField(null)}
                              placeholder={t.contact.formCompany}
                              className={inputClass}
                            />
                          </InputWrapper>

                          <InputWrapper fieldName="phone">
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                              onFocus={() => setFocusedField('phone')}
                              onBlur={() => setFocusedField(null)}
                              placeholder={t.contact.formPhone}
                              className={inputClass}
                              dir="ltr"
                            />
                          </InputWrapper>
                        </div>

                        {/* Service select */}
                        <InputWrapper fieldName="service">
                          <div className="relative">
                            <select
                              value={formData.service}
                              onChange={(e) =>
                                setFormData({ ...formData, service: e.target.value })
                              }
                              onFocus={() => setFocusedField('service')}
                              onBlur={() => setFocusedField(null)}
                              className={`${inputClass} appearance-none cursor-pointer`}
                            >
                              <option value="" className="text-neutral-600 bg-neutral-950">
                                {t.contact.formService}
                              </option>
                              {serviceOptions.map((opt) => (
                                <option
                                  key={opt}
                                  value={opt}
                                  className="bg-neutral-950 text-white"
                                >
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <div
                              className={`absolute top-1/2 -translate-y-1/2 ${
                                isRtl ? 'left-4' : 'right-4'
                              } pointer-events-none`}
                            >
                              <svg
                                width="10"
                                height="6"
                                viewBox="0 0 10 6"
                                fill="none"
                              >
                                <path
                                  d="M1 1L5 5L9 1"
                                  stroke="#d4af37"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  opacity="0.4"
                                />
                              </svg>
                            </div>
                          </div>
                        </InputWrapper>

                        {/* Message — flex-1 makes textarea grow to fill remaining space */}
                        <InputWrapper fieldName="message">
                          <textarea
                            required
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            placeholder={t.contact.formMsg}
                            className={`${inputClass} resize-none flex-1 min-h-[120px] h-full`}
                            style={{ flex: '1 1 auto' }}
                          />
                        </InputWrapper>
                      </div>

                      {/* Submit button — always at bottom */}
                      <div className="mt-4">
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative w-full py-4 rounded-xl text-[11px] uppercase tracking-[0.2em]
                                    font-bold overflow-hidden group/btn"
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
                            <Send className="w-4 h-4" />
                            {t.contact.submitBtn}
                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </span>
                        </motion.button>
                      </div>
                    </form>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent" />
                  </div>
                </motion.div>
              </div>
          {/* ── RIGHT: CONTACT INFO ── */}
          <div ref={infoRef} className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
              animate={infoInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              className="space-y-6"
            >
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={infoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-px w-5 bg-[#d4af37]/40" />
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#d4af37]/60 font-mono">
                    {t.contact.directContatto}
                  </span>
                </div>
              </motion.div>

              {/* Contact cards */}
              <div className="relative">
                {/* Border glow */}
                <div
                  className="absolute -inset-[1px] rounded-2xl opacity-30"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(212,175,55,0.15), transparent 50%, rgba(212,175,55,0.08))',
                  }}
                />

                <div className="relative bg-neutral-950/80 border border-neutral-800/40 rounded-2xl overflow-hidden backdrop-blur-sm">

                  {/* Top accent */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />

                  <div className="divide-y divide-neutral-800/30">
                    {contactItems.map((item, i) => {
                      const Icon = item.icon;

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 16 }}
                          animate={infoInView ? { opacity: 1, y: 0 } : {}}
                          transition={{
                            duration: 0.5,
                            delay: 0.25 + i * 0.1,
                            ease: EASE,
                          }}
                          className="p-5 group hover:bg-[#d4af37]/[0.02] transition-colors duration-400"
                        >
                          <div className="flex items-start gap-4">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#d4af37]/10 to-[#d4af37]/5
                                         border border-[#d4af37]/15 flex items-center justify-center shrink-0
                                         group-hover:border-[#d4af37]/25 transition-colors duration-400"
                            >
                              <Icon className="w-4.5 h-4.5 text-[#d4af37]" />
                            </motion.div>

                            <div className="min-w-0">
                              <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-600 font-mono block mb-1">
                                {item.label}
                              </span>

                              {item.href ? (
                                <a
                                  href={item.href}
                                  className="text-sm text-white font-medium font-serif
                                             hover:text-[#d4af37] transition-colors duration-300 block"
                                  dir={item.href.startsWith('tel') ? 'ltr' : undefined}
                                >
                                  {item.value}
                                </a>
                              ) : (
                                <span className="text-sm text-white font-medium font-serif block">
                                  {item.value}
                                </span>
                              )}

                              <span className="text-[10px] text-neutral-600 font-light block mt-0.5">
                                {item.sub}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent" />
                </div>
              </div>

              {/* Response time indicator */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={infoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
                className="bg-[#d4af37]/[0.04] border border-[#d4af37]/10 rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#d4af37]/60 uppercase tracking-[0.15em] font-mono block">
                      SLA Response
                    </span>
                    <span className="text-[12px] text-neutral-400 font-light">
                      {t.contact.emailSub}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Map placeholder / Location visual */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={infoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.65, ease: EASE }}
                className="relative bg-neutral-900/40 border border-neutral-800/30 rounded-xl overflow-hidden"
              >
                <div className="p-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-600 uppercase tracking-[0.15em] font-mono block">
                      {t.contact.headquarters}
                    </span>
                    <span className="text-[12px] text-neutral-400 font-light">
                      {t.contact.headquartersSub}
                    </span>
                  </div>
                </div>

                {/* Decorative map dots */}
                <div className="px-5 pb-4">
                  <div className="h-20 rounded-lg bg-neutral-950/60 border border-neutral-800/20 relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-[0.06]"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle, #d4af37 1px, transparent 1px)',
                        backgroundSize: '12px 12px',
                      }}
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#d4af37]/40"
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={formInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 lg:mt-20"
        >
          <div className="flex items-center justify-center gap-3">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={formInView ? { scaleX: 1 } : {}}
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
              animate={formInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
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