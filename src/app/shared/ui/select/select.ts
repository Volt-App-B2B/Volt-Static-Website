import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Styled dropdown (replaces the native <select>, whose popup can't be themed).
 * Form control via ControlValueAccessor. Keyboard: Enter/Space/↓ open, ↑↓ move, Home/End, Enter select, Esc/Tab close.
 */
@Component({
  selector: 'app-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => Select), multi: true }],
  host: { '(document:click)': 'onDocClick($event)' },
  template: `
    <button
      type="button"
      class="trigger"
      role="combobox"
      aria-haspopup="listbox"
      [id]="inputId()"
      [attr.aria-expanded]="open()"
      [attr.aria-controls]="listId"
      [attr.aria-activedescendant]="open() ? listId + '-' + active() : null"
      [disabled]="disabled"
      (click)="toggle()"
      (keydown)="onKey($event)"
      (blur)="onTouched()"
    >
      <span>{{ value || placeholder() }}</span>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
    @if (open()) {
      <ul class="list" role="listbox" [id]="listId" tabindex="-1">
        @for (o of options(); track o; let i = $index) {
          <li
            role="option"
            [id]="listId + '-' + i"
            [class.sel]="o === value"
            [class.act]="i === active()"
            [attr.aria-selected]="o === value"
            (mousedown)="$event.preventDefault()"
            (click)="choose(o)"
            (mouseenter)="active.set(i)"
          >
            <span>{{ o }}</span>
            @if (o === value) {
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12l5 5 9-10" />
              </svg>
            }
          </li>
        }
      </ul>
    }
  `,
  styleUrl: './select.scss',
})
export class Select implements ControlValueAccessor {
  private static nextId = 0;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly cdr = inject(ChangeDetectorRef);

  readonly options = input.required<readonly string[]>();
  readonly inputId = input<string | null>(null);
  readonly placeholder = input('Select…');

  protected readonly listId = `app-select-${Select.nextId++}`;
  protected readonly open = signal(false);
  protected readonly active = signal(0);

  protected value = '';
  protected disabled = false;
  private onChange: (v: string) => void = () => undefined;
  protected onTouched: () => void = () => undefined;

  writeValue(v: string | null): void {
    this.value = v ?? '';
    this.cdr.markForCheck();
  }
  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(d: boolean): void {
    this.disabled = d;
    this.cdr.markForCheck();
  }

  protected toggle(): void {
    if (this.open()) this.close();
    else this.openList();
  }

  protected choose(o: string): void {
    this.value = o;
    this.onChange(o);
    this.close();
  }

  protected onDocClick(e: MouseEvent): void {
    if (this.open() && !this.host.contains(e.target as Node)) this.close(false);
  }

  protected onKey(e: KeyboardEvent): void {
    const n = this.options().length;
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        e.preventDefault();
        if (!this.open()) return this.openList();
        this.active.set((this.active() + (e.key === 'ArrowDown' ? 1 : -1) + n) % n);
        break;
      }
      case 'Home':
      case 'End':
        if (!this.open()) return;
        e.preventDefault();
        this.active.set(e.key === 'Home' ? 0 : n - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this.open()) this.choose(this.options()[this.active()]);
        else this.openList();
        break;
      case 'Escape':
        if (this.open()) {
          e.preventDefault();
          this.close();
        }
        break;
      case 'Tab':
        this.close(false);
        break;
    }
  }

  private openList(): void {
    this.active.set(Math.max(0, this.options().indexOf(this.value)));
    this.open.set(true);
  }

  private close(refocus = true): void {
    this.open.set(false);
    if (refocus) this.host.querySelector('button')?.focus();
  }
}
