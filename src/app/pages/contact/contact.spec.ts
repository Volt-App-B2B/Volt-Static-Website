import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ContactService, EMAIL_PATTERN } from '../../core/contact.service';
import { Contact, FORM_MESSAGES } from './contact';

describe('Contact form', () => {
  let fixture: ComponentFixture<Contact>;
  let component: Contact;
  let sent: unknown[];

  beforeEach(() => {
    sent = [];
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: ContactService, useValue: { send: async (v: unknown) => (sent.push(v), 'mailto') } },
      ],
    });
    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const fill = (v: Partial<Record<'name' | 'email' | 'phone' | 'message', string>>) => component.form.patchValue(v);

  it('is invalid when empty and requires name, email and message', () => {
    expect(component.form.valid).toBeFalse();
    const c = component.form.controls;
    expect(c.name.hasError('required')).toBeTrue();
    expect(c.email.hasError('required')).toBeTrue();
    expect(c.message.hasError('required')).toBeTrue();
    expect(c.phone.valid).toBeTrue();
  });

  it('rejects malformed emails with the prototype pattern', () => {
    fill({ email: 'not-an-email' });
    expect(component.form.controls.email.hasError('pattern')).toBeTrue();
    fill({ email: 'a@b' });
    expect(component.form.controls.email.hasError('pattern')).toBeTrue();
    fill({ email: 'sam@example.com' });
    expect(component.form.controls.email.valid).toBeTrue();
    expect(EMAIL_PATTERN.test('x y@z.com')).toBeFalse();
  });

  it('shows inline errors and an error status when submitted empty, without sending', async () => {
    await component.submit();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('p.err').length).toBe(3);
    expect(component.status()).toEqual({ kind: 'error', message: FORM_MESSAGES.invalid });
    expect(sent.length).toBe(0);
  });

  it('sends valid values and reports the mailto status', async () => {
    fill({ name: 'Sam', email: 'sam@example.com', message: 'Hello' });
    await component.submit();
    expect(sent.length).toBe(1);
    expect(component.status().kind).toBe('success');
    expect(component.status().message).toBe(FORM_MESSAGES.mailto);
  });
});

describe('ContactService.buildMailto', () => {
  it('encodes subject and body with all fields', () => {
    const url = TestBed.inject(ContactService).buildMailto({
      name: 'Sam',
      email: 's@x.com',
      phone: '',
      topic: 'Support',
      message: 'Hi there',
    });
    expect(url.startsWith('mailto:hello@volt-sportshub.com?subject=')).toBeTrue();
    expect(decodeURIComponent(url)).toContain('[Website] Support from Sam');
    expect(decodeURIComponent(url)).toContain('Phone: -');
    expect(decodeURIComponent(url)).toContain('Hi there');
  });
});
