import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

/**
 * Pill button. Use on an element: <a app-button routerLink="/x">…</a> or <button app-button>…</button>.
 * Variants: solid (default) | ghost; sizes: md (default) | sm. Pair with appMagnetic where the design has it.
 */
@Component({
  selector: 'a[app-button], button[app-button]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'btn',
    '[class.ghost]': "variant() === 'ghost'",
    '[class.sm]': "size() === 'sm'",
  },
  template: '<ng-content />',
  styleUrl: './button.scss',
})
export class Button {
  readonly variant = input<'solid' | 'ghost'>('solid');
  readonly size = input<'md' | 'sm'>('md');
}
