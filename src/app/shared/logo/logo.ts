import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BoltMark } from './bolt-mark';

/**
 * Brand logo link (mark + "VOLT / SPORTS HUB" wordmark).
 * TODO: swap in the official vector logo (see BoltMark); the wordmark is Montserrat 900 italic as a stand-in.
 */
@Component({
  selector: 'app-logo',
  imports: [RouterLink, BoltMark],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="logo" routerLink="/">
      <app-bolt-mark class="mark" />
      <span class="wm"><b>VOLT</b> <i>SPORTS HUB</i></span>
      <span class="sr-only">Home</span>
    </a>
  `,
  styles: `
    :host {
      display: block;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .mark {
      width: 34px;
      height: 38px;
      color: var(--l);
    }
    .wm {
      display: flex;
      flex-direction: column;
      line-height: 1;
    }
    b {
      font: 900 italic 26px/1 var(--display);
      letter-spacing: -0.01em;
    }
    i {
      font: 400 normal 8.5px/1 var(--body);
      letter-spacing: 0.42em;
      margin-top: 5px;
      color: var(--mut);
    }
  `,
})
export class Logo {}
