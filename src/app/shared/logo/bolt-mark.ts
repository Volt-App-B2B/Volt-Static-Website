import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * The Volt V-bolt mark (stand-in drawing from the prototype).
 * TODO: replace the two paths with the official vector exported from Volt.ai (ask the brand owner for an SVG).
 * Fill follows `color` (currentColor); `animated` adds the drawing underline stroke + flicker used in the hero.
 */
@Component({
  selector: 'app-bolt-mark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 100 110" aria-hidden="true" focusable="false" [class.animated]="animated()">
      <path class="m1" fill="currentColor" d="M24 34 L46 34 L56 78 L90 2 L72 62 L60 100 L52 104 Z" />
      <path class="m2" d="M14 26 L24 18 L19 32 L28 27 L21 46 L11 41" />
    </svg>
  `,
  styles: `
    :host {
      display: block;
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
    }
    .m2 {
      fill: none;
      stroke: #fff;
      stroke-width: 3.5;
      stroke-linejoin: round;
    }
    .animated .m2 {
      stroke-width: 3;
      stroke-dasharray: 140;
      stroke-dashoffset: 140;
      animation:
        draw 2.4s 0.4s forwards,
        flick 3s 3s infinite;
    }
    @keyframes draw {
      to {
        stroke-dashoffset: 0;
      }
    }
    @keyframes flick {
      0%,
      92%,
      100% {
        opacity: 1;
      }
      94% {
        opacity: 0.2;
      }
      96% {
        opacity: 1;
      }
      98% {
        opacity: 0.3;
      }
    }
  `,
})
export class BoltMark {
  readonly animated = input(false);
}
