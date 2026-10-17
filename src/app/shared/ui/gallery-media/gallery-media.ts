import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SiteContentService } from '../../../core/site-content.service';
import { GalleryItem } from '../../../content/site-content';
import { Icon } from '../icon/icon';

/** A gallery photo (NgOptimizedImage, fills its positioned parent) or, when `photo` is empty, a branded placeholder. */
@Component({
  selector: 'app-gallery-media',
  imports: [NgOptimizedImage, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.large]': "fit() === 'contain'" },
  template: `
    @if (item().photo) {
      <img [ngSrc]="item().photo" [alt]="item().title" [style.object-fit]="fit()" fill />
    } @else {
      <div class="ph">
        <small>Photo placeholder</small>
        <app-icon [markup]="icon()" [stroke]="1.1" />
      </div>
    }
  `,
  styleUrl: './gallery-media.scss',
})
export class GalleryMedia {
  private readonly content = inject(SiteContentService);

  readonly item = input.required<GalleryItem>();
  readonly fit = input<'cover' | 'contain'>('cover');

  protected icon(): string {
    return this.content.galleryIcon();
  }
}
