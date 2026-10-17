export interface NavLink {
  path: string;
  label: string;
}

/** Main navigation order (header and footer). */
export const NAV_LINKS: readonly NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/gallery', label: 'Gallery' },
  // { path: '/team', label: 'Our Team' }, // disabled until the team page is ready (see app.routes.ts)
  { path: '/contact', label: 'Contact Us' },
];
