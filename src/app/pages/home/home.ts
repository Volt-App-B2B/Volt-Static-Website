import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteContentService } from '../../core/site-content.service';
import { CountUp } from '../../shared/directives/count-up.directive';
import { HeroGlow } from '../../shared/directives/hero-glow.directive';
import { Magnetic } from '../../shared/directives/magnetic.directive';
import { Reveal } from '../../shared/directives/reveal.directive';
import { Tilt } from '../../shared/directives/tilt.directive';
import { BoltMark } from '../../shared/logo/bolt-mark';
import { Button } from '../../shared/ui/button/button';
import { ICONS, Icon } from '../../shared/ui/icon/icon';
import { Marquee } from '../../shared/ui/marquee/marquee';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { WhiteLabelDemo } from './white-label-demo';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    Button,
    BoltMark,
    Icon,
    Marquee,
    SectionHeading,
    WhiteLabelDemo,
    Reveal,
    CountUp,
    Tilt,
    HeroGlow,
    Magnetic,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page' },
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly site = inject(SiteContentService).site;
  protected readonly icons = ICONS;

  protected number(i: number): string {
    return String(i + 1).padStart(2, '0');
  }
}
