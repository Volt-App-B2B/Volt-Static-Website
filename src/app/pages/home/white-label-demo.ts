import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { SiteContentService } from '../../core/site-content.service';
import { Reveal } from '../../shared/directives/reveal.directive';

/** White-label demo: color swatches re-theme the mock phone and change its academy name. */
@Component({
  selector: 'app-white-label-demo',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="wl pad">
      <div class="wrap">
        <div appReveal>
          <span class="eyebrow">White-label ready</span>
          <h2 class="disp">Your academy.<br />Your brand.</h2>
          <p>
            Academies launch with their own colors, logo and name on top of the Volt platform. Tap a color and watch the
            app become yours.
          </p>
          <div class="swatches" role="group" aria-label="Try a brand color">
            <b>Try it</b>
            @for (c of colors; track c.color; let i = $index) {
              <button
                type="button"
                class="sw"
                [class.on]="i === activeIndex()"
                [style.--c]="c.color"
                [attr.aria-label]="c.name"
                [attr.aria-pressed]="i === activeIndex()"
                (click)="activeIndex.set(i)"
              ></button>
            }
          </div>
        </div>
        <div appReveal [revealDelay]="0.15" aria-hidden="true">
          <div class="phone" [style.--brand]="active().color">
            <div class="top">
              <small>Welcome back</small>
              <div class="name">{{ active().name }}</div>
            </div>
            <div class="row">
              <i></i>
              <div><b>Padel · Court 2</b>Today, 7:00 PM</div>
            </div>
            <div class="row">
              <i></i>
              <div><b>Junior Football</b>Tomorrow, 5:30 PM</div>
            </div>
            <div class="row">
              <i></i>
              <div><b>Physio session</b>Friday, 11:00 AM</div>
            </div>
            <div class="fab">Book now</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './white-label-demo.scss',
})
export class WhiteLabelDemo {
  protected readonly colors = inject(SiteContentService).site.whiteLabelColors;
  protected readonly activeIndex = signal(0);
  protected readonly active = computed(() => this.colors[this.activeIndex()]);
}
