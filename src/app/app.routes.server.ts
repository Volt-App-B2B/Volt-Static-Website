import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Every route is prerendered to its own index.html at build time (static output).
 * '/404' is listed explicitly so the branded not-found page is prerendered too (see README for 404.html handling).
 */
export const serverRoutes: ServerRoute[] = [
  { path: '404', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender },
];
