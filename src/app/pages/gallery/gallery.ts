import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SiteContentService } from '../../core/site-content.service';
import { ICONS, Icon } from '../../shared/ui/icon/icon';
import { GalleryMedia } from '../../shared/ui/gallery-media/gallery-media';
import { Lightbox } from '../../shared/ui/lightbox/lightbox';
import { PageHero } from '../../shared/ui/page-hero/page-hero';

@Component({
  selector: 'app-gallery',
  imports: [PageHero, GalleryMedia, Icon, Lightbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page' },
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  protected readonly icons = ICONS;
  protected readonly items = inject(SiteContentService).site.gallery.items;
  protected readonly lightboxIndex = signal<number | null>(null);
}
