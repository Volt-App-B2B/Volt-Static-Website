import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { parseSvgShapes } from '../../util/svg-shapes';

/** Named icon markup for chrome elements (content-driven icons come from SITE.services[].i). */
export const ICONS = {
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  qr: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v7h-3"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  zoom: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5M11 8v6M8 11h6"/>',
} as const;

/** Inline stroke icon (24x24 viewBox). Sized by the parent via width/height on <app-icon>. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="stroke()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (s of shapes(); track $index) {
        @switch (s.tag) {
          @case ('path') {
            <svg:path [attr.d]="s.attrs['d']" />
          }
          @case ('rect') {
            <svg:rect
              [attr.x]="s.attrs['x']"
              [attr.y]="s.attrs['y']"
              [attr.width]="s.attrs['width']"
              [attr.height]="s.attrs['height']"
              [attr.rx]="s.attrs['rx']"
            />
          }
          @case ('circle') {
            <svg:circle [attr.cx]="s.attrs['cx']" [attr.cy]="s.attrs['cy']" [attr.r]="s.attrs['r']" />
          }
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: block;
      flex: none;
      width: 1.5em;
      height: 1.5em;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class Icon {
  readonly markup = input.required<string>();
  readonly stroke = input(1.8);

  protected readonly shapes = computed(() => parseSvgShapes(this.markup()));
}
