import { Directive, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';
import { RevealObserver } from './reveal-observer.service';

/**
 * Reveal-on-scroll. Content is visible in the prerendered HTML; the hidden state (.reveal) is only added in the
 * browser, and elements already on screen during the first load are left alone to avoid a flash.
 * `revealDelay` is the stagger in seconds (sets --d).
 */
@Directive({
  selector: '[appReveal]',
  host: { '[style.--d]': 'delayVar()' },
})
export class Reveal implements OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly observer = inject(RevealObserver);

  readonly revealDelay = input(0);

  protected delayVar(): string | null {
    const d = this.revealDelay();
    return d ? `${d}s` : null;
  }

  constructor() {
    afterNextRender(() => this.observer.reveal(this.el));
  }

  ngOnDestroy(): void {
    this.observer.unobserve(this.el);
  }
}
