// TODO: replace with your real hardware/software list before publishing.

export interface UsesItem {
  name: string;
  note: string;
}

export interface UsesGroup {
  group: string;
  items: UsesItem[];
}

export const USES: UsesGroup[] = [
  {
    group: 'Hardware',
    items: [
      { name: '14" MacBook Pro (M-series)', note: 'Daily driver for everything.' },
      { name: '27" 4K monitor', note: 'External display for the desk setup.' },
      { name: 'Mechanical keyboard', note: 'Placeholder — swap in your actual model.' },
    ],
  },
  {
    group: 'Editor & Terminal',
    items: [
      { name: 'VS Code', note: 'Main editor, with a handful of extensions.' },
      { name: 'iTerm2 + zsh', note: 'Terminal setup.' },
    ],
  },
  {
    group: 'Browsers & Devtools',
    items: [
      { name: 'Chrome', note: 'Primary browser for development and devtools.' },
      { name: 'Firefox', note: 'Cross-browser testing.' },
    ],
  },
  {
    group: 'Apps',
    items: [
      { name: 'Astro + Tailwind CSS', note: 'Current stack for this site.' },
      { name: 'Figma', note: 'Placeholder — swap in what you actually use for design.' },
    ],
  },
];
