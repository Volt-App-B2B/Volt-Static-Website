import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteContentService } from '../../core/site-content.service';
import { Logo } from '../../shared/logo/logo';
import { NAV_LINKS } from '../nav-links';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly content = inject(SiteContentService);
  protected readonly site = this.content.site;
  protected readonly links = NAV_LINKS;
  protected readonly year = new Date().getFullYear();
}
