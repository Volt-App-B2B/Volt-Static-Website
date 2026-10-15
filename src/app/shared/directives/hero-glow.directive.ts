import { Directive, ElementRef, inject } from '@angular/core';

/** Radial glow that follows the cursor: sets --hx/--hy (px, relative to the host). */
@Directive({
  selector: '[appHeroGlow]',
  host: { '(mousemove)': 'move($event)' },
})
export class HeroGlow {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected move(e: MouseEvent): void {
    const r = this.el.getBoundingClientRect();
    this.el.style.setProperty('--hx', e.clientX - r.left + 'px');
    this.el.style.setProperty('--hy', e.clientY - r.top + 'px');
  }
}
