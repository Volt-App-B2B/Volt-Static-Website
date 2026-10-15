import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteContentService } from '../../core/site-content.service';
import { Reveal } from '../../shared/directives/reveal.directive';
import { Button } from '../../shared/ui/button/button';
import { PageHero } from '../../shared/ui/page-hero/page-hero';
import { initials } from '../../shared/util/text';

@Component({
  selector: 'app-team',
  imports: [RouterLink, NgOptimizedImage, PageHero, Button, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page' },
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team {
  protected readonly team = inject(SiteContentService).site.team;
  protected readonly initials = initials;
}
