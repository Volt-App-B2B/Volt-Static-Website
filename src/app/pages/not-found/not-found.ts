import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BoltMark } from '../../shared/logo/bolt-mark';
import { Button } from '../../shared/ui/button/button';

/** Branded 404. The route sets noindex via route data (see app.routes.ts). */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink, Button, BoltMark],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page' },
  template: `
    <section class="nf">
      <div class="wrap">
        <app-bolt-mark class="bolt" />
        <span class="eyebrow">Error 404</span>
        <h1 class="disp">Out of <span class="lime">bounds</span>.</h1>
        <p class="sub">This page does not exist or has moved. Head back to the pitch and keep playing.</p>
        <div class="cta">
          <a app-button routerLink="/">Back to home</a>
          <a app-button variant="ghost" routerLink="/contact">Contact us</a>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .nf {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 150px 0 90px;
      overflow: hidden;
    }
    .nf::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: var(--bolt);
      background-size: 520px;
    }
    .wrap {
      position: relative;
    }
    .bolt {
      width: 90px;
      color: var(--l);
      margin-bottom: 26px;
      filter: drop-shadow(0 0 30px rgba(149, 206, 9, 0.5));
    }
    h1 {
      font-size: clamp(54px, 9vw, 130px);
      margin: 18px 0 20px;
    }
    .cta {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      margin-top: 32px;
    }
  `,
})
export class NotFound {}
