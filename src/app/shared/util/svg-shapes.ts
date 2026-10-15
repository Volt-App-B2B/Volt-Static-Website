/** Minimal parser for the icon markup used in content (a flat list of <path/>, <rect/>, <circle/> elements). */
export interface SvgShape {
  tag: 'path' | 'rect' | 'circle';
  attrs: Record<string, string>;
}

const ELEMENT = /<(path|rect|circle)\b([^>]*?)\/?>/g;
const ATTR = /([a-z-]+)="([^"]*)"/g;

export function parseSvgShapes(markup: string): SvgShape[] {
  const shapes: SvgShape[] = [];
  for (const el of markup.matchAll(ELEMENT)) {
    const attrs: Record<string, string> = {};
    for (const a of el[2].matchAll(ATTR)) attrs[a[1]] = a[2];
    shapes.push({ tag: el[1] as SvgShape['tag'], attrs });
  }
  return shapes;
}
