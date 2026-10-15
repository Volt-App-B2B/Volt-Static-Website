import { isPlatformBrowser } from '@angular/common';
import { ApplicationRef, Injectable, PLATFORM_ID, inject } from '@angular/core';

/** One shared IntersectionObserver for reveal-on-scroll and count-up (threshold 0.15, like the prototype). */
@Injectable({ providedIn: 'root' })
export class RevealObserver {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private io?: IntersectionObserver;
  private readonly callbacks = new WeakMap<Element, () => void>();

  /** True until the first page has rendered; elements already on screen then skip the hide/reveal flash. */
  initialLoad = true;

  constructor() {
    if (this.browser) {
      inject(ApplicationRef)
        .whenStable()
        .then(() => (this.initialLoad = false));
    }
  }

  get reducedMotion(): boolean {
    return this.browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  inViewport(el: Element): boolean {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.85 && r.bottom > 0;
  }

  observe(el: Element, onVisible: () => void): void {
    if (!this.browser) return;
    if (typeof IntersectionObserver === 'undefined') {
      onVisible();
      return;
    }
    this.io ??= new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          this.io?.unobserve(e.target);
          this.callbacks.get(e.target)?.();
          this.callbacks.delete(e.target);
        }
      },
      { threshold: 0.15 },
    );
    this.callbacks.set(el, onVisible);
    this.io.observe(el);
  }

  private queue: { el: HTMLElement; skipIfVisible: boolean }[] = [];
  private flushScheduled = false;

  /**
   * Hides the element (.reveal) until it scrolls into view. Registrations are batched: all viewport reads happen
   * before any class writes, which avoids a forced reflow per element.
   */
  reveal(el: HTMLElement): void {
    if (!this.browser) return;
    this.queue.push({ el, skipIfVisible: this.initialLoad });
    if (this.flushScheduled) return;
    this.flushScheduled = true;
    requestAnimationFrame(() => this.flush());
  }

  private flush(): void {
    this.flushScheduled = false;
    const batch = this.queue;
    this.queue = [];
    const visible = batch.map((b) => b.skipIfVisible && this.inViewport(b.el));
    batch.forEach(({ el }, i) => {
      if (visible[i] || !el.isConnected) return;
      el.classList.add('reveal');
      this.observe(el, () => el.classList.add('in'));
    });
  }

  unobserve(el: Element): void {
    this.callbacks.delete(el);
    this.io?.unobserve(el);
  }
}
