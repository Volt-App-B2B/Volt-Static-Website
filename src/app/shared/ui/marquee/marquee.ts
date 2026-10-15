import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Skewed lime ticker. Items are listed twice for a seamless loop; pauses on hover; decorative (aria-hidden). */
@Component({
  selector: 'app-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <div class="track">
      @for (w of doubled(); track $index) {
        <span>{{ w }}</span>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      background: var(--l);
      color: var(--g);
      overflow: hidden;
      transform: skewY(-2deg);
      margin: -30px 0 30px;
      position: relative;
      z-index: 5;
      border-block: 3px solid var(--g);
    }
    .track {
      display: flex;
      width: max-content;
      animation: mq 34s linear infinite;
      padding: 16px 0;
    }
    :host(:hover) .track {
      animation-play-state: paused;
    }
    span {
      font: 900 italic 28px/1 var(--display);
      text-transform: uppercase;
      white-space: nowrap;
      padding-inline: 26px;
      display: flex;
      align-items: center;
      gap: 52px;
    }
    span::after {
      content: '';
      width: 14px;
      height: 22px;
      background: var(--g);
      clip-path: polygon(60% 0, 0 58%, 42% 58%, 30% 100%, 100% 38%, 56% 38%);
    }
    @keyframes mq {
      to {
        transform: translateX(-50%);
      }
    }
  `,
})
export class Marquee {
  readonly items = input.required<string[]>();
  protected readonly doubled = computed(() => [...this.items(), ...this.items()]);
}
