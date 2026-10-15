import { Directive, ElementRef, OnDestroy, OnInit, afterNextRender, inject, input } from '@angular/core';
import { RevealObserver } from './reveal-observer.service';

/** Cubic ease-out, as in the prototype. */
export function easeOutCubic(p: number): number {
  return 1 - Math.pow(1 - p, 3);
}

/** Value shown at `progress` (0..1) of a count-up to `end`. */
export function countUpValue(end: number, progress: number): number {
  return Math.round(end * easeOutCubic(Math.min(1, Math.max(0, progress))));
}

/**
 * Animated stat counter. The final number is rendered into the HTML (SEO / no-JS); in the browser it resets to 0
 * and counts up when scrolled into view (instantly final under prefers-reduced-motion).
 */
@Directive({ selector: '[appCountUp]' })
export class CountUp implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly observer = inject(RevealObserver);
  private frame = 0;

  readonly appCountUp = input.required<number>();
  readonly countSuffix = input('');
  readonly countDuration = input(1400);

  constructor() {
    afterNextRender(() => {
      if (this.observer.reducedMotion) return this.render(this.appCountUp());
      this.render(0);
      this.observer.observe(this.el, () => this.run());
    });
  }

  /** Server / pre-hydration text. */
  ngOnInit(): void {
    this.render(this.appCountUp());
  }

  ngOnDestroy(): void {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.observer.unobserve(this.el);
  }

  private render(value: number): void {
    this.el.textContent = value + this.countSuffix();
  }

  private run(): void {
    const end = this.appCountUp();
    const dur = this.countDuration();
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      this.render(countUpValue(end, p));
      if (p < 1) this.frame = requestAnimationFrame(tick);
    };
    this.frame = requestAnimationFrame(tick);
  }
}
