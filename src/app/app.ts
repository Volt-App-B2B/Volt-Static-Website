import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { ScrollProgress } from './layout/scroll-progress/scroll-progress';
import { SkipLink } from './layout/skip-link/skip-link';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SkipLink, ScrollProgress, Header, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-skip-link />
    <app-scroll-progress />
    <app-header />
    <main id="main" tabindex="-1"><router-outlet /></main>
    <app-footer />
  `,
  styles: `
    main:focus {
      outline: none;
    }
  `,
})
export class App {}
