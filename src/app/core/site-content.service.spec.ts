import { TestBed } from '@angular/core/testing';
import { SITE } from '../content/site-content';
import { SiteContentService } from './site-content.service';

describe('SiteContentService', () => {
  let service: SiteContentService;

  beforeEach(() => {
    service = TestBed.inject(SiteContentService);
  });

  it('exposes the typed SITE constant', () => {
    expect(service.site).toBe(SITE);
    expect(service.site.services.length).toBe(10);
  });

  it('builds the map embed and directions URLs from location.mapQuery', () => {
    const q = encodeURIComponent(SITE.location.mapQuery);
    expect(service.mapEmbedUrl).toBe(`https://maps.google.com/maps?q=${q}&z=15&output=embed`);
    expect(service.directionsUrl).toBe(`https://www.google.com/maps/dir/?api=1&destination=${q}`);
  });

  it('strips whitespace from tel: and mailto: links', () => {
    expect(service.phoneHref).toBe('tel:01000332861');
    expect(service.emailHref).toBe('mailto:' + SITE.brand.email);
  });

  it('builds absolute URLs without double slashes', () => {
    expect(service.absoluteUrl('/about')).toBe(SITE.brand.siteUrl + '/about');
    expect(service.absoluteUrl('about')).toBe(SITE.brand.siteUrl + '/about');
  });

  it('gives every gallery item a title and subtitle', () => {
    for (const item of SITE.gallery.items) {
      expect(item.title).toBeTruthy();
      expect(item.subtitle).toBeTruthy();
    }
  });

  it('keeps unfinished facts clearly marked', () => {
    expect(SITE.team.every((m) => m.bio.includes('[PLACEHOLDER]'))).toBeTrue();
  });
});
