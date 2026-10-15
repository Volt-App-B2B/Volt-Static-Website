import { Directive, ElementRef, inject } from '@angular/core';
import { RevealObserver } from './reveal-observer.service';

/** Magnetic hover: the element leans toward the pointer when it is within 110px. */
@Directive({
  selector: '[appMagnetic]',
  host: { '(document:mousemove)': 'move($event)' },
})
export class Magnetic {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly observer = inject(RevealObserver);
  private active = false;

  protected move(e: MouseEvent): void {
    if (this.observer.reducedMotion) return;
    const r = this.el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    if (Math.hypot(dx, dy) < 110) {
      this.el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.3}px)`;
      this.active = true;
    } else if (this.active) {
      this.el.style.transform = '';
      this.active = false;
    }
  }
}
