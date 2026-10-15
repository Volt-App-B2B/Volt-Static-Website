import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { SiteContentService } from './site-content.service';

/** Sets <title>, meta description, canonical, Open Graph/Twitter tags and robots per route. */
@Injectable({ providedIn: 'root' })
export class SeoTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);
  private readonly content = inject(SiteContentService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const { brand } = this.content.site;
    const brandName = `${brand.name} ${brand.tag}`;
    const routeTitle = this.buildTitle(snapshot);
    const fullTitle = !routeTitle
      ? `${brandName} | ${brand.slogan}`
      : routeTitle.includes(brandName)
        ? routeTitle
        : `${routeTitle} | ${brandName}`;

    let leaf = snapshot.root;
    while (leaf.firstChild) leaf = leaf.firstChild;
    const description = (leaf.data['description'] as string | undefined) ?? this.content.site.pages.home.description;
    const noindex = leaf.data['noindex'] === true;
    const path = snapshot.url.split(/[?#]/)[0] || '/';
    const url = this.content.absoluteUrl(path);
    const image = this.content.absoluteUrl('/og-image.png');

    this.title.setTitle(fullTitle);
    this.setName('description', description);
    this.setName('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    this.setName('twitter:card', 'summary_large_image');
    this.setProp('og:type', 'website');
    this.setProp('og:site_name', brandName);
    this.setProp('og:title', fullTitle);
    this.setProp('og:description', description);
    this.setProp('og:url', url);
    this.setProp('og:image', image);
    this.setProp('og:image:alt', `${brandName}: ${brand.slogan}`);
    this.setCanonical(noindex ? null : url);
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private setProp(property: string, content: string): void {
    this.meta.updateTag({ property, content }, `property='${property}'`);
  }

  private setCanonical(url: string | null): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!url) {
      link?.remove();
      return;
    }
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
