// TODO: replace with your real résumé content before publishing.

export interface Experience {
  years: string;
  role: string;
  company: string;
  summary: string;
}

export interface Education {
  years: string;
  degree: string;
  school: string;
}

export const EXPERIENCE: Experience[] = [
  {
    years: '2023–Present',
    role: 'Frontend Developer',
    company: 'Company Name',
    summary: 'Placeholder summary of responsibilities and impact in this role.',
  },
  {
    years: '2020–2023',
    role: 'Software Developer',
    company: 'Previous Company',
    summary: 'Placeholder summary of responsibilities and impact in this role.',
  },
];

export const SKILLS: string[] = ['TypeScript', 'React', 'Astro', 'Tailwind CSS', 'Node.js'];

export const EDUCATION: Education[] = [
  {
    years: '2016–2020',
    degree: 'B.S. in Computer Science',
    school: 'University Name',
  },
];
