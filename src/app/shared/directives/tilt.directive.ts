import { Directive, ElementRef, inject } from '@angular/core';
import { RevealObserver } from './reveal-observer.service';

/** 3D tilt + pointer-following glow. Sets --rx/--ry (tilt) and --mx/--my (glow position) on the host. */
@Directive({
  selector: '[appTilt]',
  host: { '(mousemove)': 'move($event)', '(mouseleave)': 'leave()' },
})
export class Tilt {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly observer = inject(RevealObserver);

  protected move(e: MouseEvent): void {
    const r = this.el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const s = this.el.style;
    if (!this.observer.reducedMotion) {
      s.setProperty('--rx', (-y * 10).toFixed(2) + 'deg');
      s.setProperty('--ry', (x * 12).toFixed(2) + 'deg');
    }
    s.setProperty('--mx', ((x + 0.5) * 100).toFixed(1) + '%');
    s.setProperty('--my', ((y + 0.5) * 100).toFixed(1) + '%');
  }

  protected leave(): void {
    this.el.style.setProperty('--rx', '0deg');
    this.el.style.setProperty('--ry', '0deg');
  }
}
