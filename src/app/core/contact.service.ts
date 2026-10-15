import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { SiteContentService } from './site-content.service';

export interface ContactValues {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

export type SendOutcome = 'sent' | 'mailto';

export const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

/** Sends the contact form: POSTs FormData to SITE.form.action (Formspree style) or falls back to mailto:. */
@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly content = inject(SiteContentService);
  private readonly doc = inject(DOCUMENT);

  buildMailto(v: ContactValues): string {
    const body = `Name: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone || '-'}\nTopic: ${v.topic || '-'}\n\n${v.message}`;
    const subject = `[Website] ${v.topic || 'Message'} from ${v.name}`;
    const to = this.content.site.brand.email.replace(/\s+/g, '');
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  /** Resolves 'sent' (POST ok) or 'mailto' (email app opened); rejects when the POST fails. */
  async send(v: ContactValues): Promise<SendOutcome> {
    const action = this.content.site.form.action;
    if (action) {
      const data = new FormData();
      for (const [k, val] of Object.entries(v)) data.append(k, val);
      const res = await fetch(action, { method: 'POST', headers: { Accept: 'application/json' }, body: data });
      if (!res.ok) throw new Error(`Form endpoint responded ${res.status}`);
      return 'sent';
    }
    const win = this.doc.defaultView;
    if (win) win.location.href = this.buildMailto(v);
    return 'mailto';
  }
}
