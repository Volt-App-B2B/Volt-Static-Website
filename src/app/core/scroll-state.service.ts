import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

/** Scroll position state: "scrolled" flag (header), progress 0..1 (top bar) and a --scroll CSS var (hero parallax). */
@Injectable({ providedIn: 'root' })
export class ScrollStateService {
  private readonly doc = inject(DOCUMENT);

  readonly scrolled = signal(false);
  readonly progress = signal(0);

  constructor() {
    const win = this.doc.defaultView;
    if (!isPlatformBrowser(inject(PLATFORM_ID)) || !win) return;
    const update = () => {
      const y = win.scrollY;
      const h = this.doc.documentElement.scrollHeight - win.innerHeight;
      this.scrolled.set(y > 24);
      this.progress.set(h > 0 ? Math.min(1, y / h) : 0);
      this.doc.documentElement.style.setProperty('--scroll', String(Math.round(y)));
    };
    win.addEventListener('scroll', update, { passive: true });
    win.addEventListener('resize', update, { passive: true });
    update();
  }
}
