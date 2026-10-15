import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  computed,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { GalleryItem } from '../../../content/site-content';
import { SiteContentService } from '../../../core/site-content.service';
import { GalleryMedia } from '../gallery-media/gallery-media';

/**
 * Full-screen photo viewer. Rendered only while open (parent uses @if).
 * Prev/next buttons, keyboard (← → Esc), touch swipe, focus trap, focus returns to the opener on close,
 * body scroll locked while open. Destroying it (e.g. on route change) releases everything.
 */
@Component({
  selector: 'app-lightbox',
  imports: [GalleryMedia],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': 'Photo viewer',
    '(click)': 'onBackdrop($event)',
    '(pointerdown)': 'swipeStart($event)',
    '(pointerup)': 'swipeEnd($event)',
    '(document:keydown)': 'onKey($event)',
  },
  template: `
    <button type="button" class="lb-x" aria-label="Close" (click)="closed.emit()">✕</button>
    <button type="button" class="lb-p" aria-label="Previous photo" (click)="go(-1)">‹</button>
    <figure>
      <div class="lb-m"><app-gallery-media [item]="current()" fit="contain" /></div>
      <figcaption aria-live="polite">
        <b>{{ current().title }}</b>
        <span>{{ meta() }}</span>
      </figcaption>
    </figure>
    <button type="button" class="lb-n" aria-label="Next photo" (click)="go(1)">›</button>
  `,
  styleUrl: './lightbox.scss',
})
export class Lightbox implements OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly doc = inject(DOCUMENT);
  private readonly content = inject(SiteContentService);

  readonly items = input.required<GalleryItem[]>();
  readonly index = model.required<number>();
  readonly closed = output<void>();

  protected readonly current = computed(() => this.items()[this.index()]);
  protected readonly meta = computed(
    () => `${this.content.categoryName(this.current().cat)}  ·  ${this.index() + 1} / ${this.items().length}`,
  );

  private opener: HTMLElement | null = null;
  private swipeX: number | null = null;

  constructor() {
    afterNextRender(() => {
      this.opener = this.doc.activeElement as HTMLElement | null;
      this.doc.body.style.overflow = 'hidden';
      this.host.querySelector<HTMLElement>('.lb-x')?.focus();
    });
  }

  ngOnDestroy(): void {
    this.doc.body.style.overflow = '';
    this.opener?.focus?.();
  }

  /** Moves by `delta` photos, wrapping around both ends. */
  go(delta: number): void {
    const n = this.items().length;
    if (!n) return;
    this.index.set((((this.index() + delta) % n) + n) % n);
  }

  protected onKey(e: KeyboardEvent): void {
    if (e.key === 'Escape') this.closed.emit();
    else if (e.key === 'ArrowRight') this.go(1);
    else if (e.key === 'ArrowLeft') this.go(-1);
    else if (e.key === 'Tab') this.trapFocus(e);
  }

  protected onBackdrop(e: MouseEvent): void {
    const t = e.target as HTMLElement;
    if (t === this.host || t.tagName === 'FIGURE') this.closed.emit();
  }

  protected swipeStart(e: PointerEvent): void {
    this.swipeX = e.clientX;
  }

  protected swipeEnd(e: PointerEvent): void {
    if (this.swipeX == null) return;
    const d = e.clientX - this.swipeX;
    this.swipeX = null;
    if (Math.abs(d) > 60) this.go(d < 0 ? 1 : -1);
  }

  private trapFocus(e: KeyboardEvent): void {
    const focusable = Array.from(this.host.querySelectorAll<HTMLElement>('button'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = this.doc.activeElement;
    if (e.shiftKey && (active === first || !this.host.contains(active))) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && (active === last || !this.host.contains(active))) {
      e.preventDefault();
      first.focus();
    }
  }
}
