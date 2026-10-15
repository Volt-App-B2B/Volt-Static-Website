export interface TextPart {
  text: string;
  highlight: boolean;
}

/** Splits text into parts, flagging the given phrases (used for the mission statement). */
export function highlightPhrases(text: string, phrases: string[]): TextPart[] {
  if (!phrases.length) return [{ text, highlight: false }];
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${escaped.join('|')})`, 'g');
  return text
    .split(re)
    .filter((t) => t !== '')
    .map((t) => ({ text: t, highlight: phrases.includes(t) }));
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
