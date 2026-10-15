import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

/** "Skip to main content" link; handled in JS because <base href="/"> would turn "#main" into a navigation. */
@Component({
  selector: 'app-skip-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<a href="#main" (click)="skip($event)">Skip to main content</a>`,
  styles: `
    a {
      position: fixed;
      inset-inline-start: 16px;
      top: -80px;
      z-index: 300;
      background: var(--l);
      color: var(--g);
      font-weight: 800;
      padding: 12px 20px;
      border-radius: 99px;
      transition: top 0.2s;
    }
    a:focus {
      top: 16px;
    }
  `,
})
export class SkipLink {
  private readonly doc = inject(DOCUMENT);

  protected skip(e: Event): void {
    e.preventDefault();
    this.doc.getElementById('main')?.focus();
  }
}
