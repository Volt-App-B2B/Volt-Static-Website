import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SiteContentService } from '../../../core/site-content.service';

/** Lazy Google Maps embed built from location.mapQuery (trusted resource URL, dark-tinted like the design). */
@Component({
  selector: 'app-map-embed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pin">{{ pinLabel() }}</div>
    <iframe
      title="Map of Volt main location"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      [src]="src()"
    ></iframe>
  `,
  styleUrl: './map-embed.scss',
})
export class MapEmbed {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly content = inject(SiteContentService);

  readonly pinLabel = input('Volt · Main location');
  protected readonly src = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(this.content.mapEmbedUrl),
  );
}
