/* ══════════════════════════════════════════════════════════════════════
   TRIANGLE BLACK — CONTENT DATA WITH FULL i18n SUPPORT
   Original structure preserved, all content translatable
══════════════════════════════════════════════════════════════════════ */

export type Lang = 'en' | 'ar' | 'it';

// ══════════════════════════════════════════════════════════════════════
// SERVICE ITEM (Translated)
// ══════════════════════════════════════════════════════════════════════
export interface ServiceItem {
  id: string;
  category: 'supplies' | 'procurement' | 'maintenance' | 'renovations';
  iconName: string;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
  systems: Record<Lang, string[]>;
  features: Record<Lang, string[]>;
}

// ══════════════════════════════════════════════════════════════════════
// PROJECT ITEM (Translated)
// ══════════════════════════════════════════════════════════════════════
export interface ProjectItem {
  id: string;
  category: string;
  imageUrl: string;
  year?: string;
  title: Record<Lang, string>;
  client: Record<Lang, string>;
  location: Record<Lang, string>;
  scope: Record<Lang, string>;
  timeline: Record<Lang, string>;
  tags: Record<Lang, string[]>;
  kpis: Array<{ label: Record<Lang, string>; value: string }>;
}

// ══════════════════════════════════════════════════════════════════════
// TRANSLATION INTERFACE
// ══════════════════════════════════════════════════════════════════════
export interface Translation {
  title: string;
  subtitle: string;
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    contact: string;
    deploy: string;
    quote: string;
  };
  hero: {
    badge: string;
    headline: string;
    desc: string;
    ctaPrimary: string;
    ctaSecondary: string;
    kpi1: string;
    kpi1Sub: string;
    kpi2: string;
    kpi2Sub: string;
    kpi3: string;
    kpi3Sub: string;
    kpi4: string;
    kpi4Sub: string;
    scrollLabel: string;
    activeScene: string;
    sceneDelivery: string;
    sceneQuality: string;
    sceneTrusted: string;
  };
  highlight: {
    badge: string;
    heading: string;
    desc: string;
    timeline: Array<{ year: string; title: string; description: string }>;
    quote: string;
    quoteAuthor: string;
  };
  about: {
    badge: string;
    heading: string;
    subheading: string;
    p1: string;
    p2: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
    valuesTitle: string;
    valuesDesc: string;
    principlesTitle: string;
    whyChooseTitle: string;
    whyChooseSub: string;
    whyChooseDesc: string;
    whyChooseItems: string[];
    statsOem: string;
    statsEmergency: string;
    statsQuality: string;
    clientsTitle: string;
    operationalSecurity: string;
    operationalSecuritySub: string;
  };
  services: {
    badge: string;
    heading: string;
    subheading: string;
    filterAll: string;
    filterSupplies: string;
    filterProcurement: string;
    filterMaintenance: string;
    filterRenovation: string;
    requestBtn: string;
    subsystemsLabel: string;
    customNoteTitle: string;
    customNoteDesc: string;
  };
  projects: {
    badge: string;
    heading: string;
    subheading: string;
    viewSpecs: string;
    clientLabel: string;
    durationLabel: string;
    scopeLabel: string;
    closeBtn: string;
    filterAll: string;
    filterRenovations: string;
    filterMaintenance: string;
    filterProcurement: string;
    operationsClass: string;
    enterpriseSla: string;
    deliverableLogs: string;
    oemNote: string;
  };
  testimonials: {
    badge: string;
    heading: string;
    brandsBadge: string;
    items: Array<{ quote: string; author: string; role: string }>;
  };
  contact: {
    badge: string;
    heading: string;
    desc: string;
    formName: string;
    formEmail: string;
    formCompany: string;
    formPhone: string;
    formService: string;
    formMsg: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
    directContatto: string;
    headquarters: string;
    headquartersSub: string;
    emailLabel: string;
    emailSub: string;
    phoneLabel: string;
    phoneSub: string;
  };
  footer: {
    ctaHeading: string;
    ctaDesc: string;
    ctaButton: string;
    brandDesc: string;
    oemBadge: string;
    navTitle: string;
    servicesTitle: string;
    resourcesTitle: string;
    copyright: string;
    engineered: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  whatsapp: {
    headerTitle: string;
    headerSub: string;
    welcomeMsg: string;
    actionLabel: string;
    launchBtn: string;
    dispatchTime: string;
    tooltip: string;
  };
}

// ══════════════════════════════════════════════════════════════════════
// SERVICES DATA
// ══════════════════════════════════════════════════════════════════════
export const servicesData: ServiceItem[] = [
  {
    id: 'serv-1',
    category: 'supplies',
    iconName: 'Wrench',
    title: {
      en: 'Hotel Engineering Supplies',
      ar: 'مستلزمات الهندسة الفندقية',
      it: 'Forniture di Ingegneria Alberghiera',
    },
    desc: {
      en: 'HVAC, heavy electrical equipment, automated plumbing controls, circulating pumps, premium OEM spare parts, and durable mechanical installation materials.',
      ar: 'أنظمة التكييف والتبريد، المعدات الكهربائية الثقيلة، أنظمة السباكة الآلية، مضخات التدوير، قطع غيار OEM الأصلية، ومواد التركيب الميكانيكية المتينة.',
      it: 'Sistemi HVAC, apparecchiature elettriche pesanti, controlli idraulici automatizzati, pompe di circolazione, ricambi OEM premium e materiali di installazione meccanica di alta durata.',
    },
    systems: {
      en: ['Air Cooled Chillers', 'Variable Frequency Drives (VFDs)', 'Boiler Elements', 'Sanitary Cartridges'],
      ar: ['مبردات هوائية التبريد', 'محركات التردد المتغير (VFDs)', 'عناصر الغلايات', 'خراطيش صحية'],
      it: ['Refrigeratori ad Aria', 'Variatori di Frequenza (VFD)', 'Elementi per Caldaia', 'Cartucce Sanitarie'],
    },
    features: {
      en: ['Authorized Brand Sourcing', 'Original Guarantee Certificates', 'Emergency Stock Reserves'],
      ar: ['توريد العلامات التجارية المعتمدة', 'شهادات الضمان الأصلية', 'احتياطي مخزون الطوارئ'],
      it: ['Approvvigionamento Marchi Autorizzati', 'Certificati di Garanzia Originali', 'Riserve di Stock d\'Emergenza'],
    },
  },
  {
    id: 'serv-2',
    category: 'procurement',
    iconName: 'Truck',
    title: {
      en: 'Procurement & Supply Chain',
      ar: 'المشتريات وسلسلة التوريد',
      it: 'Approvvigionamento e Supply Chain',
    },
    desc: {
      en: 'Strategic global sourcing, direct vendor coordination, lifecycle inventory optimization, cost efficiency audits, and operational logistics management.',
      ar: 'التوريد العالمي الاستراتيجي، التنسيق المباشر مع الموردين، تحسين المخزون خلال دورة الحياة، تدقيق كفاءة التكلفة، وإدارة اللوجستيات التشغيلية.',
      it: 'Sourcing globale strategico, coordinamento diretto dei fornitori, ottimizzazione delle scorte nel ciclo di vita, audit di efficienza dei costi e gestione logistica operativa.',
    },
    systems: {
      en: ['ERP Procurement Integration', 'Consolidated Freight Solutions', 'Customs Clearance Assurance'],
      ar: ['تكامل مشتريات ERP', 'حلول الشحن الموحدة', 'ضمان التخليص الجمركي'],
      it: ['Integrazione ERP Acquisti', 'Soluzioni di Spedizione Consolidata', 'Garanzia Sdoganamento'],
    },
    features: {
      en: ['Cost-Plus Pricing Models', 'Strict SLA Deadlines', 'Multi-Vendor Consolidation'],
      ar: ['نماذج تسعير التكلفة الإضافية', 'مواعيد SLA صارمة', 'توحيد الموردين المتعددين'],
      it: ['Modelli di Prezzo Cost-Plus', 'Scadenze SLA Rigorose', 'Consolidamento Multi-Fornitore'],
    },
  },
  {
    id: 'serv-3',
    category: 'maintenance',
    iconName: 'ShieldCheck',
    title: {
      en: 'Advanced Maintenance Solutions',
      ar: 'حلول الصيانة المتقدمة',
      it: 'Soluzioni di Manutenzione Avanzata',
    },
    desc: {
      en: 'Preventive automated maintenance calendars, structural technical inspections, live troubleshooting, thermal mapping, and emergency immediate deployments.',
      ar: 'جداول الصيانة الوقائية الآلية، الفحوصات الفنية الهيكلية، استكشاف الأخطاء المباشر، الخرائط الحرارية، والانتشار الفوري للطوارئ.',
      it: 'Calendari di manutenzione preventiva automatizzati, ispezioni tecniche strutturali, risoluzione problemi in tempo reale, mappatura termica e interventi d\'emergenza immediati.',
    },
    systems: {
      en: ['Vibration Analysis on Pumps', 'Thermal Electrical Scans', 'Water Treatment Quality Audits'],
      ar: ['تحليل الاهتزازات على المضخات', 'المسح الحراري الكهربائي', 'تدقيق جودة معالجة المياه'],
      it: ['Analisi delle Vibrazioni sulle Pompe', 'Scansioni Termiche Elettriche', 'Audit Qualità Trattamento Acqua'],
    },
    features: {
      en: ['24/7 Hotline Support', 'Certified OEM Technicians', 'Zero Down-time Guarantees'],
      ar: ['دعم الخط الساخن 24/7', 'فنيون OEM معتمدون', 'ضمانات عدم التوقف'],
      it: ['Supporto Hotline 24/7', 'Tecnici OEM Certificati', 'Garanzie Zero Downtime'],
    },
  },
  {
    id: 'serv-4',
    category: 'renovations',
    iconName: 'Cpu',
    title: {
      en: 'Projects & Back-Of-House Renovations',
      ar: 'المشاريع وتجديدات المرافق الخلفية',
      it: 'Progetti e Ristrutturazioni Back-Of-House',
    },
    desc: {
      en: 'Hotel mechanical room renovation support, meticulous MEP contractor coordination, green building technical upgrades, and high-fidelity site supervision.',
      ar: 'دعم تجديد غرف الميكانيكا الفندقية، التنسيق الدقيق مع مقاولي MEP، الترقيات التقنية للمباني الخضراء، والإشراف عالي الدقة على الموقع.',
      it: 'Supporto alla ristrutturazione delle sale macchine alberghiere, coordinamento meticoloso degli appaltatori MEP, aggiornamenti tecnici per edifici green e supervisione del cantiere ad alta fedeltà.',
    },
    systems: {
      en: ['Chilled Water Pipe Retrofits', 'Energy Efficient LED Automation', 'Smart BMS Controls Upgrade'],
      ar: ['تحديث أنابيب المياه المبردة', 'أتمتة LED الموفرة للطاقة', 'ترقية أنظمة BMS الذكية'],
      it: ['Retrofit Tubazioni Acqua Refrigerata', 'Automazione LED ad Alta Efficienza Energetica', 'Aggiornamento Controlli BMS Intelligenti'],
    },
    features: {
      en: ['Phased Installation Plans', 'Full Commissioning Sign-offs', 'Energy Payback Calculations'],
      ar: ['خطط التركيب المرحلية', 'موافقات التشغيل الكاملة', 'حسابات استرداد الطاقة'],
      it: ['Piani di Installazione Graduale', 'Collaudi Completi e Certificazioni', 'Calcoli del Ritorno Energetico'],
    },
  },
  {
    id: 'serv-5',
    category: 'supplies',
    iconName: 'Layers',
    title: {
      en: 'Kitchen & Laundry Technical Spares',
      ar: 'قطع الغيار التقنية للمطبخ والمغسلة',
      it: 'Ricambi Tecnici per Cucina e Lavanderia',
    },
    desc: {
      en: 'Thermostats, commercial custom seals, heavy heating rods, professional drainage components, and motorized exhaust ventilation elements.',
      ar: 'منظمات الحرارة، الأختام التجارية المخصصة، قضبان التسخين الثقيلة، مكونات الصرف المهنية، وعناصر تهوية العادم الآلية.',
      it: 'Termostati, guarnizioni commerciali personalizzate, resistenze riscaldanti pesanti, componenti di drenaggio professionali ed elementi di ventilazione motorizzata a scarico.',
    },
    systems: {
      en: ['Combi Oven Microcontrollers', 'Rotary Steam Valves', 'High Capacity Bearings Sets'],
      ar: ['متحكمات أفران الكومبي الدقيقة', 'صمامات البخار الدوارة', 'مجموعات المحامل عالية السعة'],
      it: ['Microcontrollori Forni Combi', 'Valvole Vapore Rotative', 'Set Cuscinetti ad Alta Capacità'],
    },
    features: {
      en: ['Instant Part Verification', 'Food-Grade Components', 'Same-day Courier Service'],
      ar: ['التحقق الفوري من القطع', 'مكونات بدرجة غذائية', 'خدمة البريد السريع في نفس اليوم'],
      it: ['Verifica Immediata dei Ricambi', 'Componenti Food-Grade', 'Servizio Corriere in Giornata'],
    },
  },
  {
    id: 'serv-6',
    category: 'maintenance',
    iconName: 'Sliders',
    title: {
      en: 'Acoustic & Environmental Diagnostics',
      ar: 'التشخيصات الصوتية والبيئية',
      it: 'Diagnostica Acustica e Ambientale',
    },
    desc: {
      en: 'Ensuring ultra-quiet room ambient performance, dynamic water flow pressure equilibrium, and air purity testing suitable for premium luxury guest wings.',
      ar: 'ضمان أداء هادئ للغاية للغرف، توازن ضغط تدفق المياه الديناميكي، واختبار نقاء الهواء المناسب لأجنحة الضيوف الفاخرة.',
      it: 'Garanzia di performance ambientale ultra-silenziosa, equilibrio dinamico della pressione idraulica e test di purezza dell\'aria adatti alle ali di lusso premium per gli ospiti.',
    },
    systems: {
      en: ['Air Duct Noise Attenuators', 'Pressure Booster Balancing', 'HEPA Filtration Assays'],
      ar: ['مخمدات ضوضاء مجاري الهواء', 'موازنة معززات الضغط', 'فحوصات فلترة HEPA'],
      it: ['Attenuatori di Rumore per Condotti', 'Bilanciamento Pressostati', 'Analisi Filtrazione HEPA'],
    },
    features: {
      en: ['Acoustic Decibel Reports', 'Microbial Swab Testing', 'ISO 14001 Compliant Guidelines'],
      ar: ['تقارير الديسيبل الصوتية', 'اختبار المسحة الميكروبية', 'إرشادات متوافقة مع ISO 14001'],
      it: ['Report Acustici in Decibel', 'Test Tampone Microbiologico', 'Linee Guida Conformi ISO 14001'],
    },
  },
];

// ══════════════════════════════════════════════════════════════════════
// PROJECTS DATA
// ══════════════════════════════════════════════════════════════════════
export const projectsData: ProjectItem[] = [
  {
    id: 'proj-1',
    category: 'renovations',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    year: '2024',
    title: {
      en: 'Premium 5-Star Resort Technical Upgrade',
      ar: 'ترقية تقنية لمنتجع 5 نجوم فاخر',
      it: 'Aggiornamento Tecnico Resort 5 Stelle Premium',
    },
    client: {
      en: 'Luxury Riviera Hotel Group',
      ar: 'مجموعة فنادق ريفييرا الفاخرة',
      it: 'Luxury Riviera Hotel Group',
    },
    location: {
      en: 'Red Sea Coast, Egypt',
      ar: 'ساحل البحر الأحمر، مصر',
      it: 'Costa del Mar Rosso, Egitto',
    },
    scope: {
      en: 'Complete overhaul of HVAC chiller loops, replacement of aged secondary circulation pumps, and supply of smart automated flow balancers.',
      ar: 'إعادة تأهيل كاملة لدوائر مبردات HVAC، واستبدال مضخات التدوير الثانوية القديمة، وتوريد موازنات التدفق الآلية الذكية.',
      it: 'Revisione completa dei circuiti dei refrigeratori HVAC, sostituzione delle pompe di circolazione secondarie obsolete e fornitura di bilanciatori di flusso automatizzati intelligenti.',
    },
    timeline: {
      en: '3 Months (Phased during operation)',
      ar: '3 أشهر (مراحل أثناء التشغيل)',
      it: '3 Mesi (Esecuzione Graduale a Struttura Aperta)',
    },
    tags: {
      en: ['HVAC Overhaul', 'Pumps Installation', 'Energy Efficiency'],
      ar: ['إعادة تأهيل HVAC', 'تركيب المضخات', 'كفاءة الطاقة'],
      it: ['Revisione HVAC', 'Installazione Pompe', 'Efficienza Energetica'],
    },
    kpis: [
      { label: { en: 'Energy Savings', ar: 'توفير الطاقة', it: 'Risparmio Energetico' }, value: '24.5%' },
      { label: { en: 'Chillers Replaced', ar: 'المبردات المستبدلة', it: 'Refrigeratori Sostituiti' }, value: '3 Units' },
    ],
  },
  {
    id: 'proj-2',
    category: 'maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    year: '2023',
    title: {
      en: 'Continuous Facility Maintenance Agreement',
      ar: 'اتفاقية صيانة المرافق المستمرة',
      it: 'Contratto di Manutenzione Continuativa degli Impianti',
    },
    client: {
      en: 'Nile Grand Plaza & Suites',
      ar: 'نايل جراند بلازا وأجنحة',
      it: 'Nile Grand Plaza & Suites',
    },
    location: {
      en: 'Cairo Downtown',
      ar: 'وسط القاهرة',
      it: 'Centro del Cairo',
    },
    scope: {
      en: 'Implementation of round-the-clock predictive monitoring for high-rise water pressure stations and critical guest room ventilation.',
      ar: 'تنفيذ المراقبة التنبؤية على مدار الساعة لمحطات ضغط المياه في المباني العالية وتهوية غرف الضيوف الحرجة.',
      it: 'Implementazione del monitoraggio predittivo 24/7 per le stazioni di pressione idrica ad alta quota e la ventilazione critica delle camere degli ospiti.',
    },
    timeline: {
      en: 'Annual SLA Contract',
      ar: 'عقد SLA سنوي',
      it: 'Contratto SLA Annuale',
    },
    tags: {
      en: ['Predictive Maintenance', 'Water Systems', '24/7 SLA'],
      ar: ['الصيانة التنبؤية', 'أنظمة المياه', 'SLA على مدار الساعة'],
      it: ['Manutenzione Predittiva', 'Sistemi Idrici', 'SLA 24/7'],
    },
    kpis: [
      { label: { en: 'Uptime Achieved', ar: 'وقت التشغيل المحقق', it: 'Disponibilità Garantita' }, value: '99.8%' },
      { label: { en: 'Response Time', ar: 'وقت الاستجابة', it: 'Tempo di Risposta' }, value: '<2 Hrs' },
    ],
  },
  {
    id: 'proj-3',
    category: 'procurement',
    imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
    year: '2024',
    title: {
      en: 'Strategic Parts Supply Framework',
      ar: 'إطار توريد القطع الاستراتيجي',
      it: 'Framework Strategico di Fornitura Ricambi',
    },
    client: {
      en: 'Meridian Hospitality International',
      ar: 'ميريديان للضيافة الدولية',
      it: 'Meridian Hospitality International',
    },
    location: {
      en: 'Alexandria, Egypt',
      ar: 'الإسكندرية، مصر',
      it: 'Alessandria d\'Egitto, Egitto',
    },
    scope: {
      en: 'Establishing multi-year procurement contracts for OEM spare parts across 12 hotel properties with consolidated logistics.',
      ar: 'إنشاء عقود مشتريات متعددة السنوات لقطع غيار OEM عبر 12 فندقاً مع لوجستيات موحدة.',
      it: 'Definizione di contratti pluriennali di approvvigionamento per ricambi OEM su 12 strutture alberghiere con logistica consolidata.',
    },
    timeline: {
      en: '5-Year Framework Agreement',
      ar: 'اتفاقية إطارية لمدة 5 سنوات',
      it: 'Accordo Quadro Quinquennale',
    },
    tags: {
      en: ['OEM Parts', 'Multi-Property', 'Cost Optimization'],
      ar: ['قطع OEM', 'عقارات متعددة', 'تحسين التكلفة'],
      it: ['Ricambi OEM', 'Multi-Struttura', 'Ottimizzazione Costi'],
    },
    kpis: [
      { label: { en: 'Cost Reduction', ar: 'تخفيض التكلفة', it: 'Riduzione dei Costi' }, value: '32%' },
      { label: { en: 'Properties Covered', ar: 'العقارات المغطاة', it: 'Strutture Coperte' }, value: '12' },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════════
// STATIC DATA
// ══════════════════════════════════════════════════════════════════════
export const hospitalityClients = [
  'Marriott International',
  'Hilton Hotels',
  'Four Seasons',
  'Hyatt Hotels',
  'Accor Group',
  'IHG Hotels',
  'Kempinski',
  'Rotana Hotels',
];

export const trustedBrands = ['Marriott', 'Hilton', 'Four Seasons', 'Hyatt', 'Accor', 'IHG'];

export const resourceLinks = {
  en: ['Documentation', 'Technical Specs', 'Case Studies', 'FAQ'],
  ar: ['الوثائق', 'المواصفات التقنية', 'دراسات الحالة', 'الأسئلة الشائعة'],
  it: ['Documentazione', 'Specifiche Tecniche', 'Casi Studio', 'FAQ'],
};
// ══════════════════════════════════════════════════════════════════════
// TRANSLATIONS
// ══════════════════════════════════════════════════════════════════════
export const translations: Record<Lang, Translation> = {
  // ════════════════════════════════════════════════════════════════════
  // ENGLISH
  // ════════════════════════════════════════════════════════════════════
  en: {
    title: 'TRIANGLE BLACK',
    subtitle: 'Engineering Excellence for Hospitality',
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      contact: 'Contact',
      deploy: 'Deploy',
      quote: 'Quote',
    },
    hero: {
      badge: 'Premium Engineering Solutions',
      headline: 'Engineering Built for Hospitality',
      desc: 'Triangle Black delivers engineering procurement, technical execution, and operational infrastructure support designed exclusively for hotels, resorts, and hospitality assets. Built from real field experience inside hospitality operations — not from corporate theory.',
      ctaPrimary: 'Request Quotation',
      ctaSecondary: 'View Projects',
      kpi1: '20M+ EGP',
      kpi1Sub: 'Engineering Volume Managed',
      kpi2: '100%',
      kpi2Sub: 'OEM Certified',
      kpi3: '+12',
      kpi3Sub: 'Years of Field Expertise',
      kpi4: '15+',
      kpi4Sub: 'Major National Projects',
      scrollLabel: 'Engineering Excellence',
      activeScene: 'Active Scene',
      sceneDelivery: 'DELIVERY EXCELLENCE',
      sceneQuality: 'PREMIUM QUALITY',
      sceneTrusted: 'TRUSTED BY LEADING BRANDS',
    },
    highlight: {
      badge: 'OUR EVOLUTION',
      heading: 'A Legacy of Integrity. A Future of Operational Intelligence.',
      desc: 'Triangle Black was not built in a boardroom. It was forged in the field, tested by national-scale infrastructure, and refined by a commitment to professional ethics that remains our North Star.',
      timeline: [
        {
          year: '2014',
          title: 'Foundation',
          description: 'Our journey began at the heart of Egypt\'s urban transformation. Operating as El-Khatib Supplies, we contributed to the nation\'s most ambitious projects—including the New Administrative Capital. We did not just supply materials; we managed an annual volume exceeding EGP 10M, learning the complexities of high-demand engineering environments.',
        },
        {
          year: '2019',
          title: 'Engineering Expansion',
          description: 'Growth led to the founding of United Brothers General Supplies. We expanded our scope to MEP materials, technical finishes, and infrastructure support. With an annual volume surpassing EGP 20M, we became a trusted partner for 11+ landmark projects, including Cairo Festival City and Mostakbal City. We learned that at this scale, precision is the only path to success.',
        },
        {
          year: '2023',
          title: 'The Integrity Stress Test',
          description: 'The mark of a true partner is not how they act during a boom, but how they respond to a crisis. During a period of severe regional economic instability, many chose to retreat. We chose to stand firm. To honor every commitment and every supplier obligation, we made the difficult decision to liquidate company assets. We prioritized our reputation and our ethics over convenience.',
        },
        {
          year: '2025',
          title: 'The Evolution',
          description: 'Triangle Black is the culmination of this decade-long journey. We have taken our experience in national-scale infrastructure and our unbreakable ethical code to create a specialized firm. Today, we focus exclusively on engineering procurement and technical execution for the hospitality sector.',
        },
      ],
      quote: 'We do not aspire to be yet another supplier in the chain. We are an operational partner built from the field to ensure that your infrastructure never compromises your guest experience.',
      quoteAuthor: 'Founding Philosophy, Triangle Black',
    },
    about: {
      badge: 'Who We Are',
      heading: 'Engineering Excellence',
      subheading: 'Building the Backbone of Extraordinary Experiences',
      p1: 'We support hotels and hospitality assets with precision-driven MEP coordination, intelligent procurement systems, and operational engineering strategies designed to ensure reliability, efficiency, and uninterrupted performance. Our team of factory-trained technicians and procurement specialists operates with a deep understanding of the unique demands of hospitality infrastructure.',
      p2: 'Every solution is approached with a hospitality-first mindset — combining certified supply networks, technical expertise, rapid operational response, and long-term infrastructure thinking to support the demanding standards of modern hotel operations.',
      missionTitle: 'Our Mission',
      missionDesc: 'To bridge the gap between technical engineering execution and hospitality operational excellence. We provide the procurement intelligence and infrastructure support necessary to ensure that hotels and resorts never face operational failure.',
      visionTitle: 'Our Vision',
      visionDesc: 'To be the definitive engineering infrastructure partner for the Middle East and Africa hospitality sector — recognized not for our size, but for our operational intelligence, our integrity under pressure, and our deep understanding of technical excellence and operational reliability.',
      valuesTitle: 'Our Values',
      valuesDesc: 'We believe a partnership is defined when things get difficult. We honor our commitments regardless of market volatility.',
      principlesTitle: 'Principles That Define Us',
      whyChooseTitle: 'Why Choose Us',
      whyChooseSub: 'Engineered for Hospitality Excellence',
      whyChooseDesc: 'Hospitality infrastructure leaves no room for generic supply delays. Triangle Black implements targeted industrial inventory buffers tailored specifically for high-occupancy cycles.',
      whyChooseItems: [
        'Direct OEM manufacturer relationships',
        'ISO 9001 certified processes',
        '24/7 emergency dispatch capability',
        'Multi-property portfolio management',
        'Predictive maintenance technology',
        'Dedicated account managers',
      ],
      statsOem: 'OEM Certification',
      statsEmergency: 'Emergency Dispatch',
      statsQuality: 'Quality Compliant',
      clientsTitle: 'Trusted Engineering Partner for Luxury Hospitality & Mission-Critical Infrastructure',
      operationalSecurity: 'Operational Security',
      operationalSecuritySub: 'Zero Mechanical Blindspots',
    },
    services: {
      badge: 'What We Offer',
      heading: 'Our Core Services',
      subheading: 'From absolute part accuracy to automated thermal diagnostics, Triangle Black deploys specialized tiers of engineering assurance.',
      filterAll: 'All Services',
      filterSupplies: 'Supplies',
      filterProcurement: 'Procurement',
      filterMaintenance: 'Maintenance',
      filterRenovation: 'Renovations',
      requestBtn: 'Request Service',
      subsystemsLabel: 'Core Supported Sub-Systems:',
      customNoteTitle: 'Need custom material configuration?',
      customNoteDesc: 'We import heavy-duty replacement materials matching original MEP documentation protocols.',
    },
    projects: {
      badge: 'Our Portfolio',
      heading: 'Featured Operations',
      subheading: 'Review certified mechanical intervention models executed natively within operational luxury real estate.',
      viewSpecs: 'View Specifications',
      clientLabel: 'Client',
      durationLabel: 'Duration',
      scopeLabel: 'Scope of Execution',
      closeBtn: 'Close',
      filterAll: 'All Operations',
      filterRenovations: 'Upgrades & MEP',
      filterMaintenance: 'SLA Maintenance',
      filterProcurement: 'Strategic Supply',
      operationsClass: 'Operations Class',
      enterpriseSla: 'Enterprise SLA',
      deliverableLogs: 'Authenticated Deliverable Logs',
      oemNote: 'OEM parts sourced through direct European logistics channels with full test certificates.',
    },
    testimonials: {
      badge: 'Client Feedback',
      heading: 'Trusted Partnerships',
      brandsBadge: 'Trusted by Industry Leaders',
      items: [
        {
          quote: 'Triangle Black transformed our mechanical infrastructure. Their attention to detail and commitment to quality is unmatched in the industry.',
          author: 'Ahmed Hassan',
          role: 'Director of Engineering, Luxury Resort Group',
        },
        {
          quote: 'The 24/7 maintenance support has been invaluable. Response times are exceptional and their technicians are truly experts.',
          author: 'Sarah Mitchell',
          role: 'Operations Manager, International Hotel Chain',
        },
        {
          quote: 'Their procurement expertise saved us significant costs while improving part quality. A true strategic partner.',
          author: 'Mohamed El-Sayed',
          role: 'Chief Engineer, Premium Hospitality Holdings',
        },
      ],
    },
    contact: {
      badge: 'Get In Touch',
      heading: 'Start Your Project',
      desc: 'Ready to elevate your hospitality engineering standards? Our team is prepared to discuss your requirements.',
      formName: 'Full Name',
      formEmail: 'Email Address',
      formCompany: 'Company / Property Name',
      formPhone: 'Phone Number',
      formService: 'Select Service',
      formMsg: 'Project Details',
      submitBtn: 'Submit Inquiry',
      successTitle: 'Inquiry Submitted!',
      successDesc: 'Our engineering team will respond within 2 hours during business days.',
      directContatto: 'Direct Contact',
      headquarters: 'Headquarters Hub',
      headquartersSub: 'Luxury Hospitality Engineering Solutions',
      emailLabel: 'Engineering Inquiries',
      emailSub: 'SLA Response target: < 2 hours',
      phoneLabel: 'Direct Switchboard',
      phoneSub: '24/7 Operations Duty Dispatch',
    },
    footer: {
      ctaHeading: 'Ready to Start Your Project?',
      ctaDesc: 'Let\'s discuss how Triangle Black can engineer the perfect foundation for your next hospitality development.',
      ctaButton: 'Request Consultation',
      brandDesc: 'Premium mechanical supplies, lifecycle inventory optimization, and round-the-clock maintenance protocols crafted exclusively for 5-star operations.',
      oemBadge: 'Authorized Original Equipment Sourcing Hub',
      navTitle: 'Navigation',
      servicesTitle: 'Services',
      resourcesTitle: 'Resources',
      copyright: '© 2026 TRIANGLE BLACK CORP. All rights reserved.',
      engineered: 'Engineered for luxury operations',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
    },
    whatsapp: {
      headerTitle: 'Triangle Black Secure Routing',
      headerSub: 'Live Operational Support',
      welcomeMsg: 'Welcome to Triangle Black Engineering. How can we support your facility critical parts logistics or SLA maintenance today?',
      actionLabel: 'Select direct action:',
      launchBtn: 'Launch Premium Secure Chat',
      dispatchTime: 'Average Dispatch Link: < 5 minutes',
      tooltip: 'Live OEM Sourcing Desk',
    },
  },

  // ════════════════════════════════════════════════════════════════════
  // ARABIC
  // ════════════════════════════════════════════════════════════════════
  ar: {
    title: 'تراينجل بلاك',
    subtitle: 'التميز الهندسي للضيافة',
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'الخدمات',
      projects: 'المشاريع',
      contact: 'اتصل بنا',
      deploy: 'النشر',
      quote: 'عرض سعر',
    },
    hero: {
      badge: 'حلول هندسية متميزة',
      headline: 'الشريك الهندسي الذي تعتمد عليه الفنادق الفاخرة',
      desc: 'تقدم تراينجل بلاك خدمات الهندسة والمشتريات والتنفيذ الفني والدعم التشغيلي المصمم حصريًا للفنادق والمنتجعات وأصول الضيافة. مبني من خبرة ميدانية حقيقية داخل قطاع الضيافة — نفهم التشغيل قبل التوريد.',
      ctaPrimary: 'طلب عرض سعر',
      ctaSecondary: 'عرض المشاريع',
      kpi1: '+20 مليون',
      kpi1Sub: 'حجم أعمال هندسية',
      kpi2: '100%',
      kpi2Sub: 'شبكة موردين OEM معتمدين',
      kpi3: '+12',
      kpi3Sub: ' سنوات من الخبرة الميدانية',
      kpi4: '+15',
      kpi4Sub: 'مشروع قومي واستراتيجي',
      scrollLabel: 'مرر للاستكشاف',
      activeScene: 'المشهد النشط',
      sceneDelivery: 'تميز التسليم',
      sceneQuality: 'جودة فائقة',
      sceneTrusted: 'موثوق من العلامات الرائدة',
    },
    highlight: {
      badge: 'تطورنا',
      heading: 'إرثٌ من النزاهة.. ومستقبلٌ من الذكاء التشغيلي',
      desc: 'تراينجل بلاك لم تُولد خلف المكاتب، بل صُقلت في الميادين. اختبرتها مشاريع البنية التحتية القومية وهذّبها التزامٌ بأخلاقيات المهنة مما أنشأ بوصلتنا الدائمة.',
      timeline: [
        {
          year: '2014',
          title: 'التأسيس',
          description: 'بدأت رحلتنا من قلب النهضة العمرانية في مصر. من خلال "الخطيب للتوريدات"، ساهمنا في أضخم المشاريع القومية، بما في ذلك العاصمة الإدارية الجديدة. لم نكن مجرد موردين، بل أدرنا تدفقات هندسية تجاوزت 10 ملايين جنيه سنوياً، مما منحنا فهماً عميقاً لتعقيدات البيئات الهندسية عالية الكثافة.',
        },
        {
          year: '2019',
          title: 'التوسع الهندسي',
          description: 'قادنا النمو إلى تأسيس "الإخوة المتحدون للتوريدات العمومية"، حيث توسع نطاق عملنا ليشمل الأنظمة الميكانيكية والكهربائية (MEP)، والتشطيبات الفنية، ودعم البنية التحتية. بحجم أعمال تخطى 20 مليون جنيه سنوياً، أصبحنا شريكاً موثوقاً في أكثر من 11 مشروعاً عملاقاً، مثل "كايرو فيستيفال سيتي" و"مستقبل سيتي".',
        },
        {
          year: '2023',
          title: 'اختبار النزاهة الحقيقي',
          description: 'قيمة الشريك الحقيقي تظهر في الأزمات لا في أوقات الرخاء. خلال فترة من عدم الاستقرار الاقتصادي الإقليمي، وبينما اختار الكثيرون الانسحاب، اخترنا نحن الثبات. وفاءً بكل التزاماتنا تجاه موردينا، اتخذنا قراراً صعباً بتسييل أصول الشركة للوفاء بالعهود.',
        },
        {
          year: '2025',
          title: 'التطور',
          description: 'تمثل "تراينجل بلاك" ذروة هذه الرحلة الممتدة لعقد من الزمان. لقد دمجنا خبرتنا في المشاريع القومية الكبرى مع ميثاقنا الأخلاقي الراسخ لنخلق كياناً متخصصاً. اليوم، نكرس جهودنا حصرياً لخدمة قطاع الضيافة والفنادق.',
        },
      ],
      quote: 'لا نطمح لأن نكون مجرد حلقة أخرى في سلسلة التوريد؛ نحن شريك تشغيلي وُلد من قلب الميدان، لضمان استمرارية بنية تحتية لا تخذل ضيوفكم.',
      quoteAuthor: 'فلسفة التأسيس، تراينجل بلاك',
    },
    about: {
      badge: 'من نحن',
      heading: 'التميز الهندسي',
      subheading: 'بناء العمود الفقري للتجارب الاستثنائية',
      p1: 'نحن ندعم الفنادق وأصول الضيافة بتنسيق MEP دقيق وأنظمة مشتريات ذكية واستراتيجيات هندسة تشغيلية مصممة لضمان الموثوقية والكفاءة والأداء المتواصل. يعمل فريقنا من الفنيين المدربين في المصانع ومتخصصي المشتريات بفهم عميق للمتطلبات الفريدة للبنية التحتية للضيافة.',
      p2: 'يُقارَب كل حل بعقلية الضيافة أولاً — تجمع بين شبكات التوريد المعتمدة والخبرة التقنية والاستجابة التشغيلية السريعة والتفكير طويل المدى في البنية التحتية لدعم المعايير الصارمة لعمليات الفنادق الحديثة.',
      missionTitle: 'مهمتنا',
      missionDesc: 'سد الفجوة بين التنفيذ الهندسي التقني وتميز العمليات الفندقية. نوفر ذكاء المشتريات والدعم اللازم لضمان عدم تعرض الفنادق والمنتجعات لأي إخفاق تشغيلي.',
      visionTitle: 'رؤيتنا',
      visionDesc: 'أن نكون الشريك الهندسي المرجعي لقطاع الضيافة في الشرق الأوسط وأفريقيا — معترفاً بنا ليس لحجمنا، بل لذكائنا التشغيلي ونزاهتنا تحت الضغط وفهمنا العميق للتميز التقني والموثوقية التشغيلية.',
      valuesTitle: 'قيمنا',
      valuesDesc: 'نؤمن بأن الشراكة الحقيقية تُعرَّف في الأوقات الصعبة. نفي بالتزاماتنا بصرف النظر عن تقلبات السوق.',
      principlesTitle: 'المبادئ التي تحددنا',
      whyChooseTitle: 'لماذا تختارنا',
      whyChooseSub: 'مصمم للتميز في الضيافة',
      whyChooseDesc: 'البنية التحتية للضيافة لا تترك مجالاً لتأخيرات التوريد العامة. تنفذ تراينجل بلاك احتياطيات مخزون صناعية مستهدفة مصممة خصيصاً لدورات الإشغال العالي.',
      whyChooseItems: [
        'علاقات مباشرة مع مصنعي OEM',
        'عمليات معتمدة من ISO 9001',
        'الاستجابة لطلبات الطوارئ علي مدار الساعه',
        'إدارة محفظة متعددة العقارات',
        'تقنية الصيانة التنبؤية',
        'مديرو حسابات مخصصون',
      ],
      statsOem: 'شهادة OEM',
      statsEmergency: 'إرسال الطوارئ',
      statsQuality: 'متوافق مع الجودة',
      clientsTitle: 'البنى التحتية الهندسية المدعومة وقطاعات العملاء',
      operationalSecurity: 'الأمان التشغيلي',
      operationalSecuritySub: 'بدون نقاط عمياء ميكانيكية',
    },
    services: {
      badge: 'ما نقدمه',
      heading: 'خدماتنا الأساسية',
      subheading: 'من الدقة المطلقة في القطع إلى التشخيص الحراري الآلي، تنشر تراينجل بلاك مستويات متخصصة من الضمان الهندسي.',
      filterAll: 'جميع الخدمات',
      filterSupplies: 'المستلزمات',
      filterProcurement: 'المشتريات',
      filterMaintenance: 'الصيانة',
      filterRenovation: 'التجديدات',
      requestBtn: 'طلب الخدمة',
      subsystemsLabel: 'الأنظمة الفرعية المدعومة:',
      customNoteTitle: 'تحتاج تكوين مواد مخصصة؟',
      customNoteDesc: 'نستورد مواد بديلة للخدمة الشاقة تتوافق مع بروتوكولات توثيق MEP الأصلية.',
    },
    projects: {
      badge: 'محفظة أعمالنا',
      heading: 'العمليات المميزة',
      subheading: 'راجع نماذج التدخل الميكانيكي المعتمدة المنفذة محلياً ضمن العقارات الفاخرة التشغيلية.',
      viewSpecs: 'عرض المواصفات',
      clientLabel: 'العميل',
      durationLabel: 'المدة',
      scopeLabel: 'نطاق التنفيذ',
      closeBtn: 'إغلاق',
      filterAll: 'جميع العمليات',
      filterRenovations: 'الترقيات و MEP',
      filterMaintenance: 'صيانة SLA',
      filterProcurement: 'التوريد الاستراتيجي',
      operationsClass: 'فئة العمليات',
      enterpriseSla: 'SLA المؤسسي',
      deliverableLogs: 'سجلات التسليم المصادقة',
      oemNote: 'قطع OEM مصدرها قنوات لوجستية أوروبية مباشرة مع شهادات اختبار كاملة.',
    },
    testimonials: {
      badge: 'آراء العملاء',
      heading: 'شراكات موثوقة',
      brandsBadge: 'موثوق من قادة الصناعة',
      items: [
        {
          quote: 'قامت تراينجل بلاك بتحويل بنيتنا التحتية الميكانيكية. اهتمامهم بالتفاصيل والتزامهم بالجودة لا مثيل له في الصناعة.',
          author: 'أحمد حسن',
          role: 'مدير الهندسة، مجموعة المنتجعات الفاخرة',
        },
        {
          quote: 'كان دعم الصيانة على مدار الساعة لا يقدر بثمن. أوقات الاستجابة استثنائية وفنيوهم خبراء حقيقيون.',
          author: 'سارة ميتشل',
          role: 'مديرة العمليات، سلسلة فنادق دولية',
        },
        {
          quote: 'خبرتهم في المشتريات وفرت لنا تكاليف كبيرة مع تحسين جودة القطع. شريك استراتيجي حقيقي.',
          author: 'محمد السيد',
          role: 'كبير المهندسين، القابضة للضيافة الفاخرة',
        },
      ],
    },
    contact: {
      badge: 'تواصل معنا',
      heading: 'ابدأ مشروعك',
      desc: 'هل أنت مستعد لرفع معايير الهندسة الفندقية لديك؟ فريقنا مستعد لمناقشة متطلباتك.',
      formName: 'الاسم الكامل',
      formEmail: 'البريد الإلكتروني',
      formCompany: 'اسم الشركة / العقار',
      formPhone: 'رقم الهاتف',
      formService: 'اختر الخدمة',
      formMsg: 'تفاصيل المشروع',
      submitBtn: 'إرسال الاستفسار',
      successTitle: 'تم إرسال الاستفسار!',
      successDesc: 'سيرد فريقنا الهندسي خلال ساعتين في أيام العمل.',
      directContatto: 'الاتصال المباشر',
      headquarters: 'المقر الرئيسي',
      headquartersSub: 'حلول هندسة الضيافة الفاخرة',
      emailLabel: 'استفسارات الهندسة',
      emailSub: 'هدف استجابة SLA: أقل من ساعتين',
      phoneLabel: 'لوحة التحويل المباشرة',
      phoneSub: 'إرسال عمليات الواجب على مدار الساعة',
    },
    footer: {
      ctaHeading: 'هل أنت مستعد لبدء مشروعك؟',
      ctaDesc: 'دعنا نناقش كيف يمكن لتراينجل بلاك هندسة الأساس المثالي لمشروع الضيافة القادم.',
      ctaButton: 'طلب استشارة',
      brandDesc: 'مستلزمات ميكانيكية فاخرة، وتحسين مخزون دورة الحياة، وبروتوكولات صيانة على مدار الساعة مصممة حصرياً لعمليات 5 نجوم.',
      oemBadge: 'مركز توريد المعدات الأصلية المعتمد',
      navTitle: 'التنقل',
      servicesTitle: 'الخدمات',
      resourcesTitle: 'الموارد',
      copyright: '© 2026 تراينجل بلاك. جميع الحقوق محفوظة.',
      engineered: 'مصمم لعمليات الفخامة',
      privacyPolicy: 'سياسة الخصوصية',
      termsOfService: 'شروط الخدمة',
    },
    whatsapp: {
      headerTitle: 'توجيه تراينجل بلاك الآمن',
      headerSub: 'دعم تشغيلي مباشر',
      welcomeMsg: 'مرحباً بك في هندسة تراينجل بلاك. كيف يمكننا دعم لوجستيات قطع الغيار الحرجة أو صيانة SLA اليوم؟',
      actionLabel: 'اختر إجراءً مباشراً:',
      launchBtn: 'إطلاق المحادثة الآمنة',
      dispatchTime: 'متوسط رابط الإرسال: أقل من 5 دقائق',
      tooltip: 'مكتب توريد OEM المباشر',
    },
  },

  // ════════════════════════════════════════════════════════════════════
  // ITALIAN
  // ════════════════════════════════════════════════════════════════════
  it: {
    title: 'TRIANGLE BLACK',
    subtitle: 'Eccellenza Ingegneristica per l\'Ospitalità',
    nav: {
      home: 'Home',
      about: 'Chi Siamo',
      services: 'Servizi',
      projects: 'Progetti',
      contact: 'Contatto',
      deploy: 'Deploy',
      quote: 'Preventivo',
    },
    hero: {
      badge: 'Soluzioni Ingegneristiche Premium',
      headline: 'Ingegneria Costruita per l\'Ospitalità',
      desc: 'Triangle Black eroga procurement ingegneristico, esecuzione tecnica e supporto infrastrutturale operativo progettato esclusivamente per hotel, resort e strutture ricettive. Costruito su esperienza reale sul campo nell\'industria dell\'ospitalità — non su teoria aziendale.',
      ctaPrimary: 'Richiedi un Preventivo',
      ctaSecondary: 'Visualizza i Progetti',
      kpi1: '20M+ EGP',
      kpi1Sub: 'Volume Ingegneristico Gestito',
      kpi2: '100%',
      kpi2Sub: 'Certificazione OEM',
      kpi3: '+12',
      kpi3Sub: 'anni di esperienza sul campo',
      kpi4: '15+',
      kpi4Sub: 'Grandi Progetti Nazionali',
      scrollLabel: 'Scorri per esplorare',
      activeScene: 'Scena Attiva',
      sceneDelivery: 'ECCELLENZA NELLE CONSEGNE',
      sceneQuality: 'QUALITÀ PREMIUM',
      sceneTrusted: 'LA FIDUCIA DEI BRAND LEADER',
    },
    highlight: {
      badge: 'LA NOSTRA EVOLUZIONE',
      heading: 'Un\'Eredità di Integrità. Un Futuro di Intelligenza Operativa.',
      desc: 'Triangle Black non è nata in una sala riunioni. È stata forgiata sul campo, messa alla prova da infrastrutture su scala nazionale e affinata da un impegno verso l\'etica professionale che rimane la nostra stella polare.',
      timeline: [
        {
          year: '2014',
          title: 'Fondazione',
          description: 'Il nostro percorso è iniziato nel cuore della trasformazione urbana dell\'Egitto. Operando come El-Khatib Supplies, abbiamo contribuito ai progetti più ambiziosi del paese — inclusa la Nuova Capitale Amministrativa. Non ci siamo limitati a fornire materiali: abbiamo gestito un volume annuo superiore a 10 milioni di EGP, acquisendo una comprensione profonda delle complessità degli ambienti ingegneristici ad alta domanda.',
        },
        {
          year: '2019',
          title: 'Espansione Ingegneristica',
          description: 'La crescita ha portato alla fondazione di United Brothers General Supplies. Abbiamo ampliato il nostro raggio d\'azione a materiali MEP, finiture tecniche e supporto infrastrutturale. Con un volume annuo superiore a 20 milioni di EGP, siamo diventati partner di riferimento per oltre 11 progetti emblematici, tra cui Cairo Festival City e Mostakbal City. Abbiamo imparato che, a questa scala, la precisione è l\'unica via al successo.',
        },
        {
          year: '2023',
          title: 'Il Test di Integrità',
          description: 'Il valore di un vero partner non si misura nei momenti di crescita, ma nella risposta alle crisi. Durante un periodo di grave instabilità economica regionale, molti hanno scelto di ritirarsi. Noi abbiamo scelto di restare. Per onorare ogni impegno e ogni obbligo verso i fornitori, abbiamo preso la difficile decisione di liquidare gli asset aziendali. Abbiamo anteposto la nostra reputazione e la nostra etica alla convenienza momentanea.',
        },
        {
          year: '2025',
          title: 'L\'Evoluzione',
          description: 'Triangle Black è il culmine di questo percorso decennale. Abbiamo unito la nostra esperienza nelle infrastrutture su scala nazionale e il nostro codice etico incrollabile per creare una società specializzata. Oggi ci concentriamo esclusivamente sul procurement ingegneristico e sull\'esecuzione tecnica per il settore dell\'ospitalità.',
        },
      ],
      quote: 'Non aspiriamo a essere l\'ennesimo fornitore nella catena. Siamo un partner operativo costruito sul campo per garantire che la vostra infrastruttura non comprometta mai l\'esperienza degli ospiti.',
      quoteAuthor: 'Filosofia Fondativa, Triangle Black',
    },
    about: {
      badge: 'Chi Siamo',
      heading: 'Eccellenza Ingegneristica',
      subheading: 'Costruire la Spina Dorsale di Esperienze Straordinarie',
      p1: 'Supportiamo hotel e strutture ricettive con coordinamento MEP di precisione, sistemi di approvvigionamento intelligenti e strategie di ingegneria operativa progettate per garantire affidabilità, efficienza e prestazioni ininterrotte. Il nostro team di tecnici formati in fabbrica e specialisti del procurement opera con una comprensione profonda delle esigenze uniche dell\'infrastruttura alberghiera.',
      p2: 'Ogni soluzione è affrontata con una mentalità hospitality-first — combinando reti di fornitura certificate, competenza tecnica, risposta operativa rapida e una visione infrastrutturale a lungo termine per supportare gli standard esigenti delle operazioni alberghiere moderne.',
      missionTitle: 'La Nostra Missione',
      missionDesc: 'Colmare il divario tra l\'esecuzione tecnica ingegneristica e l\'eccellenza operativa alberghiera. Forniamo l\'intelligenza di procurement e il supporto infrastrutturale necessari a garantire che hotel e resort non affrontino mai un fallimento operativo.',
      visionTitle: 'La Nostra Visione',
      visionDesc: 'Essere il partner infrastrutturale ingegneristico di riferimento per il settore dell\'ospitalità in Medio Oriente e Africa — riconosciuti non per le nostre dimensioni, ma per la nostra intelligenza operativa, la nostra integrità sotto pressione e la nostra profonda comprensione dell\'eccellenza tecnica e della affidabilità operativa.',
      valuesTitle: 'I Nostri Valori',
      valuesDesc: 'Crediamo che una partnership si definisca nei momenti difficili. Onoriamo i nostri impegni indipendentemente dalla volatilità del mercato.',
      principlesTitle: 'I Principi che Ci Definiscono',
      whyChooseTitle: 'Perché Sceglierci',
      whyChooseSub: 'Progettato per l\'Eccellenza nell\'Ospitalità',
      whyChooseDesc: 'L\'infrastruttura alberghiera non lascia spazio a ritardi generici nella fornitura. Triangle Black implementa buffer di inventario industriale mirati, calibrati specificamente sui cicli di alta occupazione.',
      whyChooseItems: [
        'Relazioni dirette con i produttori OEM',
        'Processi certificati ISO 9001',
        'Capacità di intervento d\'emergenza 24/7',
        'Gestione di portafogli multi-struttura',
        'Tecnologia di manutenzione predittiva',
        'Account manager dedicati',
      ],
      statsOem: 'Certificazione OEM',
      statsEmergency: 'Intervento d\'Emergenza',
      statsQuality: 'Conformità Qualità',
      clientsTitle: 'Infrastrutture Ingegneristiche Supportate e Settori Clienti',
      operationalSecurity: 'Sicurezza Operativa',
      operationalSecuritySub: 'Zero Punti Ciechi Meccanici',
    },
    services: {
      badge: 'Cosa Offriamo',
      heading: 'I Nostri Servizi Principali',
      subheading: 'Dalla massima precisione nei ricambi alla diagnostica termica automatizzata, Triangle Black implementa livelli specializzati di garanzia ingegneristica.',
      filterAll: 'Tutti i Servizi',
      filterSupplies: 'Forniture',
      filterProcurement: 'Approvvigionamento',
      filterMaintenance: 'Manutenzione',
      filterRenovation: 'Ristrutturazioni',
      requestBtn: 'Richiedi il Servizio',
      subsystemsLabel: 'Sottosistemi Principali Supportati:',
      customNoteTitle: 'Hai bisogno di una configurazione materiale personalizzata?',
      customNoteDesc: 'Importiamo materiali sostitutivi per uso intensivo conformi ai protocolli di documentazione MEP originali.',
    },
    projects: {
      badge: 'Il Nostro Portfolio',
      heading: 'Operazioni in Evidenza',
      subheading: 'Consulta i modelli di intervento meccanico certificati eseguiti all\'interno di strutture ricettive di lusso operative.',
      viewSpecs: 'Visualizza le Specifiche',
      clientLabel: 'Cliente',
      durationLabel: 'Durata',
      scopeLabel: 'Ambito di Esecuzione',
      closeBtn: 'Chiudi',
      filterAll: 'Tutte le Operazioni',
      filterRenovations: 'Aggiornamenti & MEP',
      filterMaintenance: 'Manutenzione SLA',
      filterProcurement: 'Fornitura Strategica',
      operationsClass: 'Classe Operativa',
      enterpriseSla: 'SLA Enterprise',
      deliverableLogs: 'Registri di Consegna Autenticati',
      oemNote: 'Ricambi OEM approvvigionati tramite canali logistici europei diretti con certificati di collaudo completi.',
    },
    testimonials: {
      badge: 'Feedback dei Clienti',
      heading: 'Partnership di Fiducia',
      brandsBadge: 'La Fiducia dei Leader del Settore',
      items: [
        {
          quote: 'Triangle Black ha trasformato la nostra infrastruttura meccanica. La loro attenzione ai dettagli e l\'impegno per la qualità sono ineguagliabili nel settore.',
          author: 'Ahmed Hassan',
          role: 'Direttore Ingegneria, Luxury Resort Group',
        },
        {
          quote: 'Il supporto di manutenzione 24/7 è stato di valore inestimabile. I tempi di risposta sono eccezionali e i loro tecnici sono veri esperti.',
          author: 'Sarah Mitchell',
          role: 'Responsabile Operazioni, Catena Alberghiera Internazionale',
        },
        {
          quote: 'La loro competenza nel procurement ci ha fatto risparmiare costi significativi migliorando al contempo la qualità dei componenti. Un vero partner strategico.',
          author: 'Mohamed El-Sayed',
          role: 'Ingegnere Capo, Premium Hospitality Holdings',
        },
      ],
    },
    contact: {
      badge: 'Contattaci',
      heading: 'Avvia il Tuo Progetto',
      desc: 'Pronto a elevare i tuoi standard di ingegneria alberghiera? Il nostro team è pronto a discutere le tue esigenze.',
      formName: 'Nome Completo',
      formEmail: 'Indirizzo Email',
      formCompany: 'Nome Azienda / Struttura',
      formPhone: 'Numero di Telefono',
      formService: 'Seleziona Servizio',
      formMsg: 'Dettagli del Progetto',
      submitBtn: 'Invia Richiesta',
      successTitle: 'Richiesta Inviata!',
      successDesc: 'Il nostro team ingegneristico risponderà entro 2 ore nei giorni lavorativi.',
      directContatto: 'Contatto Diretto',
      headquarters: 'Sede Centrale',
      headquartersSub: 'Soluzioni di Ingegneria Alberghiera di Lusso',
      emailLabel: 'Richieste di Ingegneria',
      emailSub: 'Obiettivo di risposta SLA: < 2 ore',
      phoneLabel: 'Centralino Diretto',
      phoneSub: 'Dispatch Operativo 24/7',
    },
    footer: {
      ctaHeading: 'Pronto ad Avviare il Tuo Progetto?',
      ctaDesc: 'Discutiamo di come Triangle Black possa progettare le fondamenta perfette per il tuo prossimo sviluppo alberghiero.',
      ctaButton: 'Richiedi una Consulenza',
      brandDesc: 'Forniture meccaniche premium, ottimizzazione delle scorte nel ciclo di vita e protocolli di manutenzione 24/7 progettati esclusivamente per operazioni a 5 stelle.',
      oemBadge: 'Hub Autorizzato di Approvvigionamento Attrezzature Originali',
      navTitle: 'Navigazione',
      servicesTitle: 'Servizi',
      resourcesTitle: 'Risorse',
      copyright: '© 2026 TRIANGLE BLACK CORP. Tutti i diritti riservati.',
      engineered: 'Progettato per operazioni di lusso',
      privacyPolicy: 'Informativa sulla Privacy',
      termsOfService: 'Termini di Servizio',
    },
    whatsapp: {
      headerTitle: 'Routing Sicuro Triangle Black',
      headerSub: 'Supporto Operativo in Tempo Reale',
      welcomeMsg: 'Benvenuto in Triangle Black Engineering. Come possiamo supportare la logistica dei componenti critici della tua struttura o la manutenzione SLA oggi?',
      actionLabel: 'Seleziona un\'azione diretta:',
      launchBtn: 'Avvia la Chat Sicura Premium',
      dispatchTime: 'Tempo medio di dispatch: < 5 minuti',
      tooltip: 'Desk Live di Approvvigionamento OEM',
    },
  },
};