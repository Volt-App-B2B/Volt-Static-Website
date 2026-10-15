import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteContentService } from '../../core/site-content.service';
import { Magnetic } from '../../shared/directives/magnetic.directive';
import { Reveal } from '../../shared/directives/reveal.directive';
import { Button } from '../../shared/ui/button/button';
import { ICONS, Icon } from '../../shared/ui/icon/icon';
import { MapEmbed } from '../../shared/ui/map-embed/map-embed';
import { PageHero } from '../../shared/ui/page-hero/page-hero';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';
import { highlightPhrases } from '../../shared/util/text';

@Component({
  selector: 'app-about',
  imports: [RouterLink, Button, Icon, MapEmbed, PageHero, SectionHeading, Reveal, Magnetic],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page' },
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly content = inject(SiteContentService);
  protected readonly site = this.content.site;
  protected readonly icons = ICONS;
  protected readonly mission = highlightPhrases(this.site.about.mission, this.site.about.missionHighlights);
}
