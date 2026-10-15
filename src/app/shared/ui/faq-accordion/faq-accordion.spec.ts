import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqAccordion } from './faq-accordion';

describe('FaqAccordion', () => {
  let fixture: ComponentFixture<FaqAccordion>;
  let buttons: () => HTMLButtonElement[];

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqAccordion);
    fixture.componentRef.setInput('items', [
      { q: 'One?', a: 'a1' },
      { q: 'Two?', a: 'a2' },
      { q: 'Three?', a: 'a3' },
    ]);
    fixture.detectChanges();
    buttons = () => Array.from(fixture.nativeElement.querySelectorAll('button.faq-q'));
  });

  const expanded = () => buttons().map((b) => b.getAttribute('aria-expanded'));

  it('starts fully collapsed', () => {
    expect(expanded()).toEqual(['false', 'false', 'false']);
  });

  it('opens one item at a time', () => {
    buttons()[0].click();
    fixture.detectChanges();
    expect(expanded()).toEqual(['true', 'false', 'false']);
    buttons()[2].click();
    fixture.detectChanges();
    expect(expanded()).toEqual(['false', 'false', 'true']);
  });

  it('closes the open item when it is clicked again', () => {
    buttons()[1].click();
    buttons()[1].click();
    fixture.detectChanges();
    expect(expanded()).toEqual(['false', 'false', 'false']);
  });

  it('wires aria-controls to the answer region', () => {
    const region = fixture.nativeElement.querySelector('#' + buttons()[0].getAttribute('aria-controls'));
    expect(region.getAttribute('role')).toBe('region');
  });
});
