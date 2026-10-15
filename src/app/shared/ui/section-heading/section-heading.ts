import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Reveal } from '../../directives/reveal.directive';

/**
 * Eyebrow label + projected heading/intro, revealed together on scroll.
 * Project the heading as `<h2 class="disp">…</h2>` and an optional `<p class="sub">`.
 */
@Component({
  selector: 'app-section-heading',
  hostDirectives: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="eyebrow">{{ eyebrow() }}</span>
    <ng-content />
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class SectionHeading {
  readonly eyebrow = input.required<string>();
}
