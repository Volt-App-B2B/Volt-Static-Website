import { parseSvgShapes } from './svg-shapes';
import { highlightPhrases, initials } from './text';

describe('parseSvgShapes', () => {
  it('parses paths, rects and circles with their attributes', () => {
    const shapes = parseSvgShapes('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/><circle cx="12" cy="12" r="9"/>');
    expect(shapes.map((s) => s.tag)).toEqual(['rect', 'path', 'circle']);
    expect(shapes[0].attrs['width']).toBe('18');
    expect(shapes[1].attrs['d']).toBe('M3 10h18');
    expect(shapes[2].attrs['r']).toBe('9');
  });
});

describe('highlightPhrases', () => {
  it('flags only the given phrases and keeps all the text', () => {
    const parts = highlightPhrases('Make sport easy to find, easy to book and more', ['easy to find', 'easy to book']);
    expect(parts.filter((p) => p.highlight).map((p) => p.text)).toEqual(['easy to find', 'easy to book']);
    expect(parts.map((p) => p.text).join('')).toBe('Make sport easy to find, easy to book and more');
  });
});

describe('initials', () => {
  it('returns up to two uppercase initials', () => {
    expect(initials('Full Name')).toBe('FN');
    expect(initials('amr')).toBe('A');
    expect(initials('a b c')).toBe('AB');
  });
});
