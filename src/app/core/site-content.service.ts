import { Injectable } from '@angular/core';
import { SITE, SiteContent } from '../content/site-content';

/** Exposes the typed SITE constant plus derived URLs (map, directions, tel:, mailto:). */
@Injectable({ providedIn: 'root' })
export class SiteContentService {
  readonly site: SiteContent = SITE;

  /** Google Maps embed URL built from location.mapQuery. */
  get mapEmbedUrl(): string {
    return `https://maps.google.com/maps?q=${encodeURIComponent(this.site.location.mapQuery)}&z=15&output=embed`;
  }

  get directionsUrl(): string {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(this.site.location.mapQuery)}`;
  }

  get emailHref(): string {
    return 'mailto:' + this.site.brand.email.replace(/\s+/g, '');
  }

  get phoneHref(): string {
    return 'tel:' + this.site.brand.phone.replace(/\s+/g, '');
  }

  /** Absolute URL for a route path, based on brand.siteUrl. */
  absoluteUrl(path: string): string {
    const base = this.site.brand.siteUrl.replace(/\/+$/, '');
    return base + (path.startsWith('/') ? path : '/' + path);
  }

  /** Icon markup for a gallery placeholder tile (reuses a service icon, as in the design). */
  galleryIcon(): string {
    return this.site.services[4].i;
  }
}
