import { Routes } from '@angular/router';
import { SITE } from './content/site-content';

const { pages } = SITE;

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: pages.home.title,
    data: { description: pages.home.description },
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    title: pages.about.title,
    data: { description: pages.about.description },
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'gallery',
    title: pages.gallery.title,
    data: { description: pages.gallery.description },
    loadComponent: () => import('./pages/gallery/gallery').then((m) => m.Gallery),
  },
  // TEAM PAGE DISABLED (/team shows Not Found) until team photos are ready. Uncomment this route,
  // the "Our Team" link in layout/nav-links.ts and the /team entry in public/sitemap.xml to bring it back.
  // {
  //   path: 'team',
  //   title: pages.team.title,
  //   data: { description: pages.team.description },
  //   loadComponent: () => import('./pages/team/team').then((m) => m.Team),
  // },
  {
    path: 'contact',
    title: pages.contact.title,
    data: { description: pages.contact.description },
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
  },
  {
    path: '404',
    title: pages.notFound.title,
    data: { description: pages.notFound.description, noindex: true },
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
  {
    path: '**',
    title: pages.notFound.title,
    data: { description: pages.notFound.description, noindex: true },
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
