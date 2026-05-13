export type Project = {
  slug: string;
  titleKey: 'fromrhTitle' | 'degresJoursTitle';
  summaryKey: 'fromrhSummary' | 'degresJoursSummary';
  tags: string[];
  year: string;
  role: string;
  image: string;
};

export const projects: Project[] = [
  {
    slug: 'degres-jours',
    titleKey: 'degresJoursTitle',
    summaryKey: 'degresJoursSummary',
    tags: ['Next.js', 'Express.js', 'MongoDB', 'Docker', 'Chokidar'],
    year: '2026',
    role: 'Solo',
    image: '/projects/degres-jours/cover.jpg'
  },
  {
    slug: 'formrh',
    titleKey: 'fromrhTitle',
    summaryKey: 'fromrhSummary',
    tags: ['Next.js', 'Express', 'MongoDB', 'Active Directory'],
    year: '2026',
    role: 'Solo',
    image: '/projects/formrh/cover.jpg'
  }
];