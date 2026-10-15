import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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
  private readonly content = inject(SiteContentService);

  protected readonly icons = ICONS;
  protected readonly categories = this.content.site.gallery.categories;
  protected readonly active = signal('all');
  protected readonly items = computed(() => {
    const cat = this.active();
    return this.content.site.gallery.items.filter((g) => cat === 'all' || g.cat === cat);
  });
  /** Filtered views use a uniform grid (no wide/tall tiles). */
  protected readonly flat = computed(() => this.active() !== 'all');
  protected readonly lightboxIndex = signal<number | null>(null);

  protected categoryName(key: string): string {
    return this.content.categoryName(key);
  }
}
