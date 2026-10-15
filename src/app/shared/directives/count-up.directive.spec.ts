import { countUpValue, easeOutCubic } from './count-up.directive';

describe('count-up maths', () => {
  it('starts at 0 and ends exactly on the target', () => {
    expect(countUpValue(120, 0)).toBe(0);
    expect(countUpValue(120, 1)).toBe(120);
  });

  it('clamps progress outside 0..1', () => {
    expect(countUpValue(25, -1)).toBe(0);
    expect(countUpValue(25, 3)).toBe(25);
  });

  it('eases out (faster at the start than linear)', () => {
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
    expect(countUpValue(100, 0.5)).toBe(88);
  });
});
