import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { ScrollStateService } from '../../core/scroll-state.service';
import { Magnetic } from '../../shared/directives/magnetic.directive';
import { Logo } from '../../shared/logo/logo';
import { Button } from '../../shared/ui/button/button';
import { NAV_LINKS } from '../nav-links';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Logo, Button, Magnetic],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'close()' },
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly scroll = inject(ScrollStateService);
  protected readonly links = NAV_LINKS;
  protected readonly menuOpen = signal(false);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.close());
  }

  protected toggle(): void {
    this.menuOpen.update((v) => !v);
  }

  protected close(): void {
    this.menuOpen.set(false);
  }
}
