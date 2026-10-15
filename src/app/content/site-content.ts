/* ==========================================================================
   VOLT SPORTS HUB: SITE CONTENT (edit everything here)
   Typed port of the prototype's content.js. Wording is unchanged.
   Items marked [PLACEHOLDER] must be replaced with real information
   (see the "Before launch" checklist in README.md).
   ========================================================================== */

export interface SocialLinks {
  instagram: string;
  facebook: string;
  linkedin: string;
  x: string;
}

export interface Brand {
  name: string;
  tag: string;
  slogan: string;
  tagline: string;
  email: string;
  phone: string;
  social: SocialLinks;
  /** Public origin used for canonical, Open Graph and sitemap URLs. */
  siteUrl: string;
}

export interface FormConfig {
  /** Formspree/Getform endpoint. Empty = fall back to a mailto: link. */
  action: string;
  topics: string[];
}

export interface OpeningHours {
  day: string;
  time: string;
}

export interface Location {
  name: string;
  address: string;
  mapQuery: string;
  hours: OpeningHours[];
  brief: string;
}

export interface Value {
  t: string;
  d: string;
}

export interface Milestone {
  y: string;
  d: string;
}

export interface About {
  lead: string;
  mission: string;
  /** Phrases inside `mission` that are highlighted in lime. */
  missionHighlights: string[];
  values: Value[];
  milestones: Milestone[];
}

export interface Stat {
  n: number;
  s: string;
  l: string;
}

export interface Service {
  k: string;
  t: string;
  d: string;
  /** Inner SVG markup (24x24 viewBox, stroke icon). Parsed by parseSvgShapes(). */
  i: string;
}

export interface Step {
  t: string;
  d: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** e.g. "images/team/name.jpg" (file in public/). Empty = initials. */
  photo: string;
}

export interface GalleryCategory {
  k: string;
  t: string;
}

export type GallerySpan = '' | 'w2' | 'h2';

export interface GalleryItem {
  cat: string;
  title: string;
  /** e.g. "images/gallery/court-1.jpg" (file in public/images/gallery/). Empty = placeholder tile. */
  photo: string;
  span: GallerySpan;
}

export interface Gallery {
  categories: GalleryCategory[];
  items: GalleryItem[];
}

export interface Faq {
  q: string;
  a: string;
}

export interface WhiteLabelColor {
  color: string;
  name: string;
}

export interface PageMeta {
  title: string;
  description: string;
}

export interface SiteContent {
  brand: Brand;
  form: FormConfig;
  pages: Record<'home' | 'about' | 'gallery' | 'team' | 'contact' | 'notFound', PageMeta>;
  location: Location;
  about: About;
  stats: Stat[];
  sports: string[];
  services: Service[];
  steps: Step[];
  whiteLabelColors: WhiteLabelColor[];
  team: TeamMember[];
  gallery: Gallery;
  faq: Faq[];
}

export const SITE: SiteContent = {
  brand: {
    name: 'Volt',
    tag: 'Sports Hub',
    slogan: 'Power your game.',
    tagline: 'One app for every academy, court, coach and class.',
    email: 'hello@volt-sportshub.com', // [PLACEHOLDER]
    phone: '+20 100 000 0000', // [PLACEHOLDER]
    social: {
      // [PLACEHOLDER] links
      instagram: 'https://instagram.com/',
      facebook: 'https://facebook.com/',
      linkedin: 'https://linkedin.com/',
      x: 'https://x.com/',
    },
    siteUrl: 'https://www.volt-sportshub.com', // [PLACEHOLDER] real production domain
  },

  /* Contact form: leave action empty to open the visitor's email app (mailto).
     Or paste a Formspree / Getform endpoint to send without a backend. */
  form: {
    action: '',
    topics: ['General question', 'Academy / club partnership', 'Become a coach', 'Support'],
  },

  /* Per-route <title> and meta description (also used for Open Graph). */
  pages: {
    home: {
      title: 'Volt Sports Hub | Power your game',
      description: 'Volt Sports Hub: one app for every academy, court, coach and class.',
    },
    about: {
      title: 'About Us',
      description:
        'Meet Volt Sports Hub: the multi-academy sports platform, our main location, opening hours, mission and values.',
    },
    gallery: {
      title: 'Gallery',
      description:
        'Take a look around Volt Sports Hub: the courts, the training halls, the recovery rooms and the people who fill them.',
    },
    team: {
      title: 'Our Team',
      description:
        'The people behind the bolt: players, builders and sport lovers making every session easier to find and enjoy.',
    },
    contact: {
      title: 'Contact Us',
      description:
        'Questions, partnerships or want your academy on Volt? Send a message and the Volt Sports Hub team will answer fast.',
    },
    notFound: {
      title: 'Page not found',
      description: 'This page could not be found. Head back to Volt Sports Hub.',
    },
  },

  location: {
    name: 'Volt Sports Hub — Main Location',
    address: '[PLACEHOLDER] Street name, District, Cairo, Egypt',
    mapQuery: 'Cairo, Egypt', // [PLACEHOLDER] exact address or "lat,lng"
    hours: [
      { day: 'Sunday – Thursday', time: '9:00 AM – 10:00 PM' },
      { day: 'Friday – Saturday', time: '10:00 AM – 11:00 PM' },
    ],
    brief:
      'Our main location is the home base of Volt Sports Hub: a place where academies, ' +
      'coaches, physiotherapists and players meet. Courts, pitches, training halls and a ' +
      'recovery room sit under one roof, so booking an activity in the app turns into walking ' +
      'through the door and scanning your QR code. [PLACEHOLDER — replace with the real description of the place]',
  },

  about: {
    lead:
      'Volt is a multi-academy sports and lifestyle platform. We connect players, families, ' +
      'coaches and clubs in one place, so finding a class, booking a court or tracking progress ' +
      'takes seconds instead of phone calls.',
    mission:
      'Make sport easy to find, easy to book and easy to stick with, for every age and every level.',
    missionHighlights: ['easy to find', 'easy to book', 'easy to stick with'],
    values: [
      { t: 'Energy first', d: 'Fast, clear and motivating in every tap, on the app and on the court.' },
      { t: 'Built for everyone', d: 'Kids, parents, athletes and clubs all get a flow that fits them.' },
      { t: 'Every brand shines', d: 'Academies launch with their own identity on top of one strong platform.' },
      { t: 'Trust by default', d: 'Secure wallet payments, verified reviews and clear policies.' },
    ],
    milestones: [
      // [PLACEHOLDER] real dates
      { y: 'Idea', d: 'A simple question: why is booking sport so hard?' },
      { y: 'Build', d: 'Mobile app, academy dashboard and white-label core take shape.' },
      { y: 'Launch', d: 'First academies go live under their own brand.' },
      { y: 'Next', d: 'More cities, more sports, more ways to play.' },
    ],
  },

  stats: [
    // [PLACEHOLDER] sample numbers
    { n: 25, s: '+', l: 'Academies' },
    { n: 120, s: '+', l: 'Coaches' },
    { n: 40, s: '+', l: 'Courts & pitches' },
    { n: 10, s: 'K+', l: 'Players' },
  ],

  sports: [
    'Football',
    'Padel',
    'Tennis',
    'Swimming',
    'Basketball',
    'Gym',
    'Martial Arts',
    'Gymnastics',
    'Squash',
    'Yoga',
  ],

  services: [
    {
      k: 'academies',
      t: 'Academies & Branches',
      d: 'Browse academies, compare branches and see everything on offer in one tap.',
      i: '<path d="M3 10l9-6 9 6-9 6-9-6z"/><path d="M7 12.5V17c0 1 2.2 2 5 2s5-1 5-2v-4.5"/>',
    },
    {
      k: 'classes',
      t: 'Classes',
      d: 'Discover group classes by sport, level and time, then reserve your spot instantly.',
      i: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    },
    {
      k: 'coaches',
      t: 'Personal Coaches',
      d: 'Find the right coach, check availability and book one-to-one sessions.',
      i: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
    },
    {
      k: 'physio',
      t: 'Physiotherapy',
      d: 'Recover smarter with specialists, booked in the same place you train.',
      i: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
    },
    {
      k: 'assets',
      t: 'Court & Asset Booking',
      d: 'Reserve courts, pitches and pools by the hour with live availability.',
      i: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M12 5v14"/><circle cx="12" cy="12" r="3"/>',
    },
    {
      k: 'events',
      t: 'Events & QR Entry',
      d: 'Join tournaments and events, then walk in with a single QR scan.',
      i: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v7h-3"/>',
    },
    {
      k: 'programs',
      t: 'Training Programs',
      d: 'Follow structured programs with clear goals, schedules and progress.',
      i: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    },
    {
      k: 'wallet',
      t: 'Volt Wallet',
      d: 'Top up once and pay for bookings, classes and events in seconds.',
      i: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/>',
    },
    {
      k: 'community',
      t: 'Family & Community',
      d: 'Create family groups, share bookings and keep everyone moving together.',
      i: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15 14.5c3 0 6 1.5 6 5"/>',
    },
    {
      k: 'reviews',
      t: 'Verified Reviews',
      d: 'Honest ratings from real players help everyone choose with confidence.',
      i: '<path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.3l1-6.2L3 9.7l6.2-.9z"/>',
    },
  ],

  steps: [
    { t: 'Discover', d: 'Explore academies, classes, coaches and courts near you.' },
    { t: 'Book', d: 'Pick a slot, pay from your Volt Wallet, done.' },
    { t: 'Play', d: 'Show your QR at the door and focus on the game.' },
  ],

  /* White-label demo swatches on the home page (first one is the default). */
  whiteLabelColors: [
    { color: '#0C2827', name: 'Your Academy' },
    { color: '#E4572E', name: 'Falcons FC' },
    { color: '#2E6BE4', name: 'Blue Wave' },
    { color: '#C026D3', name: 'Nova Gym' },
    { color: '#111111', name: 'Titan Club' },
  ],

  /* Team: replace name/role/bio. Optional: photo: "images/team/name.jpg" (file in public/) */
  team: [
    { name: 'Full Name', role: 'Founder & CEO', bio: 'Leads vision and partnerships. [PLACEHOLDER]', photo: '' },
    { name: 'Full Name', role: 'Chief Technology Officer', bio: 'Owns architecture and engineering. [PLACEHOLDER]', photo: '' },
    { name: 'Full Name', role: 'Head of Product', bio: 'Turns player needs into simple flows. [PLACEHOLDER]', photo: '' },
    { name: 'Full Name', role: 'Lead Designer', bio: 'Shapes the Volt look and feel. [PLACEHOLDER]', photo: '' },
    { name: 'Full Name', role: 'Head of Operations', bio: 'Keeps every academy running smoothly. [PLACEHOLDER]', photo: '' },
    { name: 'Full Name', role: 'Customer Success Lead', bio: 'Makes sure players and clubs are happy. [PLACEHOLDER]', photo: '' },
  ],

  /* Gallery: set photo to a path like "images/gallery/court-1.jpg" (file in public/images/gallery/).
     Empty photo = placeholder tile. cat must match a key in categories. span: "", "w2" (wide), "h2" (tall).
     Keep the total of all tiles a multiple of 4 (w2 and h2 count as 2) so the grid has no gaps. */
  gallery: {
    categories: [
      { k: 'all', t: 'All' },
      { k: 'courts', t: 'Courts & pitches' },
      { k: 'training', t: 'Training halls' },
      { k: 'recovery', t: 'Recovery' },
      { k: 'events', t: 'Events' },
      { k: 'community', t: 'Community' },
    ],
    items: [
      { cat: 'courts', title: 'Main pitch', photo: '', span: 'w2' },
      { cat: 'training', title: 'Training hall', photo: '', span: '' },
      { cat: 'courts', title: 'Padel courts', photo: '', span: 'h2' },
      { cat: 'recovery', title: 'Physiotherapy room', photo: '', span: '' },
      { cat: 'events', title: 'Tournament day', photo: '', span: '' },
      { cat: 'community', title: 'Family weekend', photo: '', span: 'w2' },
      { cat: 'training', title: 'Strength zone', photo: '', span: '' },
      { cat: 'courts', title: 'Swimming pool', photo: '', span: '' },
      { cat: 'events', title: 'Award night', photo: '', span: 'h2' },
      { cat: 'recovery', title: 'Recovery lounge', photo: '', span: '' },
      { cat: 'community', title: 'Kids academy', photo: '', span: '' },
      { cat: 'courts', title: 'Entrance & reception', photo: '', span: '' },
    ],
  },

  faq: [
    {
      q: 'How do I book a class or a court?',
      a: 'Open the Volt app, choose what you want, pick an available slot and pay with your wallet. Your QR code appears instantly.',
    },
    {
      q: 'Can my academy use its own branding?',
      a: 'Yes. Volt is white-label, so every academy can launch with its own colors, logo and name on top of the shared platform.',
    },
    {
      q: 'How does the wallet work?',
      a: 'Top up your Volt Wallet once, then pay for bookings, classes and events without re-entering card details.',
    },
    {
      q: 'Can I manage bookings for my family?',
      a: 'Yes. Create a family group and book or follow sessions for kids and relatives from one account.',
    },
    {
      q: 'How can my club or academy join Volt?',
      a: 'Send us a message with the form on this page and the team will reach out to walk you through onboarding.',
    },
  ],
};
