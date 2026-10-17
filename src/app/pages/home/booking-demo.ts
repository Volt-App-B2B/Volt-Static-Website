import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { Reveal } from '../../shared/directives/reveal.directive';

type Step = 'pick' | 'pay' | 'paying' | 'done';

interface Court {
  name: string;
  kind: string;
  price: number;
}

interface Slot {
  time: string;
  booked: boolean;
}

interface QrCell {
  x: number;
  y: number;
}

const WALLET_START = 500;
const COURTS: readonly Court[] = [
  { name: 'Court 1', kind: 'Padel', price: 200 },
  { name: 'Court 2', kind: 'Padel', price: 220 },
  { name: 'Court 3', kind: 'Padel · Premium', price: 250 },
];
const DAYS = ['Today', 'Tomorrow', 'Friday'] as const;
const TIMES = ['4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM'];
const QR_SIZE = 21;

/** Home-page demo: pick a court slot in a mock Volt app, pay with the Volt Wallet and get a QR code. */
@Component({
  selector: 'app-booking-demo',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bk pad">
      <div class="wrap">
        <div appReveal>
          <span class="eyebrow">Try the app</span>
          <h2 class="disp">Pick a slot.<br />Pay. Play.</h2>
          <p>
            Book a court in three taps. Choose your time, pay from your Volt Wallet and walk in with a QR code. Go on,
            try it on the phone.
          </p>
          <ol class="steps">
            @for (s of stepList; track s.n) {
              <li [class.on]="stepNo() === s.n" [class.past]="stepNo() > s.n">
                <b>{{ s.n }}</b>
                <span>{{ s.label }}</span>
              </li>
            }
          </ol>
        </div>

        <div appReveal [revealDelay]="0.15">
          <div class="phone">
            <div class="bar">
              <span class="brand">VOLT</span>
              <span class="wallet" [class.dip]="step() === 'done'">
                <i></i>EGP <b>{{ balance() }}</b>
              </span>
            </div>

            @switch (step()) {
              @case ('pick') {
                <div class="screen" aria-label="Choose a court and time">
                  <h3>Book a court</h3>
                  <div class="chips" role="group" aria-label="Day">
                    @for (d of days; track d; let i = $index) {
                      <button type="button" [class.on]="day() === i" [attr.aria-pressed]="day() === i" (click)="setDay(i)">
                        {{ d }}
                      </button>
                    }
                  </div>
                  <div class="courts" role="group" aria-label="Court">
                    @for (c of courts; track c.name; let i = $index) {
                      <button type="button" [class.on]="court() === i" [attr.aria-pressed]="court() === i" (click)="setCourt(i)">
                        <b>{{ c.name }}</b>
                        <small>{{ c.kind }}</small>
                      </button>
                    }
                  </div>
                  <div class="label">Available slots</div>
                  <div class="slots" role="group" aria-label="Time slots">
                    @for (s of slots(); track s.time; let i = $index) {
                      <button
                        type="button"
                        class="slot"
                        [class.on]="slot() === i"
                        [class.taken]="s.booked"
                        [style.--d]="i * 0.04 + 's'"
                        [disabled]="s.booked"
                        [attr.aria-pressed]="slot() === i"
                        (click)="slot.set(i)"
                      >
                        {{ s.time }}
                        @if (s.booked) {
                          <small>Booked</small>
                        }
                      </button>
                    }
                  </div>
                  <button type="button" class="cta" [disabled]="slot() === null" (click)="step.set('pay')">
                    {{ slot() === null ? 'Pick a slot' : 'Continue · EGP ' + price() }}
                  </button>
                </div>
              }
              @case ('pay') {
                <div class="screen" aria-label="Review and pay">
                  <h3>Review &amp; pay</h3>
                  <div class="sum">
                    <div class="sum-t">
                      <b>{{ courts[court()].name }} · {{ courts[court()].kind }}</b>
                      <span>{{ days[day()] }} · {{ slots()[slot() ?? 0].time }} · 60 min</span>
                    </div>
                    <div class="sum-p">EGP {{ price() }}</div>
                  </div>
                  <div class="label">Pay with</div>
                  <div class="method">
                    <i></i>
                    <div>
                      <b>Volt Wallet</b>
                      <small>Balance EGP {{ balance() }} → {{ balance() - price() }}</small>
                    </div>
                    <span class="tick">✓</span>
                  </div>
                  <button type="button" class="cta" (click)="pay()">Pay EGP {{ price() }}</button>
                  <button type="button" class="back" (click)="step.set('pick')">← Change slot</button>
                </div>
              }
              @case ('paying') {
                <div class="screen center" aria-live="polite">
                  <div class="spin" aria-hidden="true"></div>
                  <h3>Paying…</h3>
                  <small>Charging your Volt Wallet</small>
                </div>
              }
              @case ('done') {
                <div class="screen center done" aria-live="polite">
                  <svg class="ok" viewBox="0 0 52 52" aria-hidden="true">
                    <circle cx="26" cy="26" r="24" />
                    <path d="M15 27l8 8 15-17" />
                  </svg>
                  <h3>You're booked!</h3>
                  <small>{{ courts[court()].name }} · {{ days[day()] }} · {{ slots()[slot() ?? 0].time }}</small>
                  <svg class="qr" viewBox="0 0 21 21" role="img" aria-label="Your entry QR code (demo)" shape-rendering="crispEdges">
                    <rect width="21" height="21" fill="#fff" />
                    @for (c of qr(); track c.x + '-' + c.y) {
                      <rect [attr.x]="c.x" [attr.y]="c.y" width="1" height="1" />
                    }
                  </svg>
                  <small>Show this at the door</small>
                  <button type="button" class="cta" (click)="reset()">Book another</button>
                </div>
              }
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './booking-demo.scss',
})
export class BookingDemo {
  private readonly destroyRef = inject(DestroyRef);
  private timer: ReturnType<typeof setTimeout> | undefined;

  protected readonly courts = COURTS;
  protected readonly days = DAYS;
  protected readonly stepList = [
    { n: 1, label: 'Choose a court & time' },
    { n: 2, label: 'Pay with Volt Wallet' },
    { n: 3, label: 'Scan in and play' },
  ];

  protected readonly step = signal<Step>('pick');
  protected readonly day = signal(0);
  protected readonly court = signal(0);
  protected readonly slot = signal<number | null>(null);
  protected readonly balance = signal(WALLET_START);

  protected readonly price = computed(() => COURTS[this.court()].price);
  protected readonly stepNo = computed(() => (this.step() === 'pick' ? 1 : this.step() === 'done' ? 3 : 2));
  protected readonly slots = computed<Slot[]>(() =>
    TIMES.map((time, i) => ({ time, booked: (i * 7 + this.court() * 3 + this.day() * 5) % 4 === 0 })),
  );
  protected readonly qr = computed(() => this.buildQr(this.court() * 100 + this.day() * 10 + (this.slot() ?? 0)));

  constructor() {
    this.destroyRef.onDestroy(() => clearTimeout(this.timer));
  }

  protected setDay(i: number): void {
    this.day.set(i);
    this.dropTakenSlot();
  }

  protected setCourt(i: number): void {
    this.court.set(i);
    this.dropTakenSlot();
  }

  protected pay(): void {
    this.step.set('paying');
    this.timer = setTimeout(() => {
      this.balance.update((b) => b - this.price());
      this.step.set('done');
    }, 1400);
  }

  protected reset(): void {
    this.balance.set(WALLET_START);
    this.slot.set(null);
    this.step.set('pick');
  }

  /** Clears the chosen slot when a day/court change makes it unavailable. */
  private dropTakenSlot(): void {
    const s = this.slot();
    if (s !== null && this.slots()[s].booked) this.slot.set(null);
  }

  /** A decorative QR-looking grid (demo only), seeded by the booking so it changes per slot. */
  private buildQr(seed: number): QrCell[] {
    const cells: QrCell[] = [];
    let n = (seed * 2654435761 + 12345) >>> 0;
    const finder = (ox: number, oy: number) => {
      for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
          const edge = x === 0 || y === 0 || x === 6 || y === 6;
          const core = x >= 2 && x <= 4 && y >= 2 && y <= 4;
          if (edge || core) cells.push({ x: ox + x, y: oy + y });
        }
      }
    };
    finder(0, 0);
    finder(QR_SIZE - 7, 0);
    finder(0, QR_SIZE - 7);
    for (let y = 0; y < QR_SIZE; y++) {
      for (let x = 0; x < QR_SIZE; x++) {
        const inFinder = (x < 8 && y < 8) || (x > QR_SIZE - 9 && y < 8) || (x < 8 && y > QR_SIZE - 9);
        if (inFinder) continue;
        n = (Math.imul(n, 1103515245) + 12345) >>> 0;
        if ((n >>> 16) & 1) cells.push({ x, y });
      }
    }
    return cells;
  }
}
