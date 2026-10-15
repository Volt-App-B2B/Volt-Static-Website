import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ScrollStateService } from '../../core/scroll-state.service';

/** Thin lime bar at the top showing how far down the page you are. Decorative. */
@Component({
  selector: 'app-scroll-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', '[style.transform]': "'scaleX(' + scroll.progress() + ')'" },
  template: '',
  styles: `
    :host {
      position: fixed;
      top: 0;
      inset-inline-start: 0;
      height: 3px;
      width: 100%;
      transform-origin: 0 50%;
      background: var(--l);
      z-index: 100;
      box-shadow: 0 0 12px var(--l);
    }
  `,
})
export class ScrollProgress {
  protected readonly scroll = inject(ScrollStateService);
}
