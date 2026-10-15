import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EMAIL_PATTERN, ContactService } from '../../core/contact.service';
import { SiteContentService } from '../../core/site-content.service';
import { Magnetic } from '../../shared/directives/magnetic.directive';
import { Reveal } from '../../shared/directives/reveal.directive';
import { Button } from '../../shared/ui/button/button';
import { FaqAccordion } from '../../shared/ui/faq-accordion/faq-accordion';
import { ICONS, Icon } from '../../shared/ui/icon/icon';
import { PageHero } from '../../shared/ui/page-hero/page-hero';
import { SectionHeading } from '../../shared/ui/section-heading/section-heading';

export type FormStatus =
  | { kind: 'idle'; message: '' }
  | { kind: 'loading' | 'success' | 'error'; message: string };

export const FORM_MESSAGES = {
  invalid: 'Please fill in your name, a valid email and a message.',
  sent: 'Thank you! Your message is on its way. We will reply soon.',
  mailto: 'Opening your email app to send the message…',
  failed: 'Something went wrong. Please email us directly.',
} as const;

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, PageHero, SectionHeading, FaqAccordion, Icon, Button, Reveal, Magnetic],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page' },
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly contactService = inject(ContactService);

  protected readonly content = inject(SiteContentService);
  protected readonly site = this.content.site;
  protected readonly icons = ICONS;

  readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
    phone: [''],
    topic: [this.site.form.topics[0]],
    message: ['', Validators.required],
  });

  readonly status = signal<FormStatus>({ kind: 'idle', message: '' });

  /** True when a control should show its inline error (touched or after a submit attempt). */
  protected showError(name: 'name' | 'email' | 'message'): boolean {
    const c = this.form.controls[name];
    return c.invalid && c.touched;
  }

  async submit(): Promise<void> {
    if (this.status().kind === 'loading') return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status.set({ kind: 'error', message: FORM_MESSAGES.invalid });
      this.host.querySelector<HTMLElement>('form .ng-invalid')?.focus();
      return;
    }
    this.status.set({ kind: 'loading', message: 'Sending…' });
    try {
      const outcome = await this.contactService.send(this.form.getRawValue());
      if (outcome === 'sent') {
        this.form.reset({ topic: this.site.form.topics[0] });
        this.status.set({ kind: 'success', message: FORM_MESSAGES.sent });
      } else {
        this.status.set({ kind: 'success', message: FORM_MESSAGES.mailto });
      }
    } catch {
      this.status.set({ kind: 'error', message: FORM_MESSAGES.failed });
    }
  }
}
