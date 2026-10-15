import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Faq } from '../../../content/site-content';

/** Accordion: one item open at a time, aria-expanded on the toggle, animated height (grid-rows transition). */
@Component({
  selector: 'app-faq-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (item of items(); track item.q; let i = $index) {
      <div class="faq-item" [class.open]="openIndex() === i">
        <h3>
          <button
            type="button"
            class="faq-q"
            [id]="'faq-q-' + i"
            [attr.aria-expanded]="openIndex() === i"
            [attr.aria-controls]="'faq-a-' + i"
            (click)="toggle(i)"
          >
            {{ item.q }}
          </button>
        </h3>
        <div
          class="faq-a"
          role="region"
          [id]="'faq-a-' + i"
          [attr.aria-labelledby]="'faq-q-' + i"
          [attr.inert]="openIndex() === i ? null : ''"
        >
          <div class="faq-a-inner">
            <p>{{ item.a }}</p>
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './faq-accordion.scss',
})
export class FaqAccordion {
  readonly items = input.required<Faq[]>();
  readonly openIndex = signal<number | null>(null);

  toggle(i: number): void {
    this.openIndex.update((cur) => (cur === i ? null : i));
  }
}
