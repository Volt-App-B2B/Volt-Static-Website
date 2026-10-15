import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

/** Hero band for inner pages: eyebrow + projected `<h1 class="disp">` and `<p class="sub">` over the bolt pattern. */
@Component({
  selector: 'app-page-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="phero">
      <div class="wrap">
        <span class="eyebrow">{{ eyebrow() }}</span>
        <ng-content />
      </div>
    </div>
  `,
  styles: `
    app-page-hero {
      display: block;
    }
    .phero {
      position: relative;
      padding: 170px 0 80px;
      overflow: hidden;
    }
    .phero::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: var(--bolt);
      background-size: 520px;
      opacity: 0.9;
    }
    .phero .wrap {
      position: relative;
    }
    .phero h1 {
      font-size: clamp(48px, 8vw, 112px);
      margin: 18px 0 20px;
    }
  `,
})
export class PageHero {
  readonly eyebrow = input.required<string>();
}
