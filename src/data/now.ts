// TODO: replace with your real /now entries before publishing.

export interface NowEntry {
  date: string;
  kind: 'Working' | 'Studying' | 'Learning';
  text: string;
}

export const NOW: NowEntry[] = [
  {
    date: 'Sep 2026',
    kind: 'Working',
    text: 'Currently focused on shipping small, fast frontend projects and writing up what I learn along the way.',
  },
  {
    date: 'Jun 2026',
    kind: 'Studying',
    text: 'Placeholder entry — replace with what you were studying at this point.',
  },
  {
    date: 'Mar 2026',
    kind: 'Learning',
    text: 'Placeholder entry — replace with what you were learning at this point.',
  },
];
