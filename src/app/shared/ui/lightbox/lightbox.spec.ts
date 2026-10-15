import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryItem } from '../../../content/site-content';
import { Lightbox } from './lightbox';

const ITEMS: GalleryItem[] = [
  { cat: 'courts', title: 'A', photo: '', span: '' },
  { cat: 'events', title: 'B', photo: '', span: '' },
  { cat: 'recovery', title: 'C', photo: '', span: '' },
];

describe('Lightbox', () => {
  let fixture: ComponentFixture<Lightbox>;
  let closed: number;

  const caption = () => (fixture.nativeElement.querySelector('figcaption b') as HTMLElement).textContent;
  const key = (k: string) => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: k }));
    fixture.detectChanges();
  };

  beforeEach(() => {
    closed = 0;
    fixture = TestBed.createComponent(Lightbox);
    fixture.componentRef.setInput('items', ITEMS);
    fixture.componentRef.setInput('index', 0);
    fixture.componentInstance.closed.subscribe(() => closed++);
    fixture.detectChanges();
  });

  it('shows the current item and position', () => {
    expect(caption()).toBe('A');
    expect(fixture.nativeElement.querySelector('figcaption span').textContent).toContain('1 / 3');
  });

  it('moves with the arrow keys and wraps around both ends', () => {
    key('ArrowRight');
    expect(caption()).toBe('B');
    key('ArrowLeft');
    key('ArrowLeft');
    expect(caption()).toBe('C');
    key('ArrowRight');
    expect(caption()).toBe('A');
  });

  it('moves with the prev/next buttons', () => {
    fixture.nativeElement.querySelector('.lb-n').click();
    fixture.detectChanges();
    expect(caption()).toBe('B');
    fixture.nativeElement.querySelector('.lb-p').click();
    fixture.detectChanges();
    expect(caption()).toBe('A');
  });

  it('emits closed on Escape and on the close button', () => {
    key('Escape');
    fixture.nativeElement.querySelector('.lb-x').click();
    expect(closed).toBe(2);
  });

  it('is an aria-modal dialog', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('role')).toBe('dialog');
    expect(el.getAttribute('aria-modal')).toBe('true');
  });

  it('locks body scroll while open and releases it on destroy', async () => {
    await fixture.whenStable();
    expect(document.body.style.overflow).toBe('hidden');
    fixture.destroy();
    expect(document.body.style.overflow).toBe('');
  });
});
