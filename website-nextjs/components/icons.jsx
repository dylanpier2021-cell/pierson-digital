// Tiny shared SVG icon set — minimal, single-color strokes
const I = ({ children, size = 16, stroke = 1.6, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...p}>
    {children}
  </svg>
);

export const Icon = {
  arrowRight: (p) => <I {...p}><path d="M5 12h14M13 6l6 6-6 6" /></I>,
  arrowUpRight: (p) => <I {...p}><path d="M7 17 17 7M8 7h9v9" /></I>,
  phone: (p) => <I {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></I>,
  phoneMissed: (p) => <I {...p}><path d="m22 8-6 6-4-4-6 6" /><path d="M22 14V8h-6" /></I>,
  message: (p) => <I {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></I>,
  mail: (p) => <I {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></I>,
  star: (p) => <I {...p}><path d="M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" /></I>,
  check: (p) => <I {...p}><path d="m20 6-11 11-5-5" /></I>,
  plus: (p) => <I {...p}><path d="M12 5v14M5 12h14" /></I>,
  sparkles: (p) => <I {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></I>,
  chevronDown: (p) => <I {...p}><path d="m6 9 6 6 6-6" /></I>,
  bolt: (p) => <I {...p}><path d="M13 2 3 14h9l-1 8 10-12h-9z" /></I>,
  calendar: (p) => <I {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></I>,
  globe: (p) => <I {...p}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></I>,
  form: (p) => <I {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></I>,
  user: (p) => <I {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></I>,
  refresh: (p) => <I {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" /></I>,
  trending: (p) => <I {...p}><path d="m3 17 6-6 4 4 8-8M14 7h7v7" /></I>,
  shield: (p) => <I {...p}><path d="M12 2 4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6z" /></I>,
  search: (p) => <I {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></I>,
  moon: (p) => <I {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></I>,
  sun: (p) => <I {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></I>,
  menu: (p) => <I {...p}><path d="M3 12h18M3 6h18M3 18h18" /></I>,
  x: (p) => <I {...p}><path d="m18 6-12 12M6 6l12 12" /></I>,
  play: (p) => <I {...p}><path d="M7 5v14l12-7z" fill="currentColor" /></I>,
  mapPin: (p) => <I {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></I>,
  instagram: (p) => <I {...p}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" /></I>,
  linkedin: (p) => <I {...p}><path d="M4.5 9.5v9M4.5 5.5v.01M9.5 18.5v-5a3 3 0 0 1 6 0v5M9.5 18.5v-9" /></I>,
  youtube: (p) => <I {...p}><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" /></I>,
};
