export const EXPERIENCES = [
  {
    key: 'eslc' as const,
    type: 'alternance' as const,
    current: true,
    bulletKeys: ['b1', 'b2', 'b3', 'b4'] as const,
  },
  {
    key: 'freelance' as const,
    type: 'freelance' as const,
    current: true,
    bulletKeys: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'] as const,
    hasClients: true,
  },
  {
    key: 'oxxodata' as const,
    type: 'stage' as const,
    current: false,
    bulletKeys: ['b1'] as const,
  },
  {
    key: 'fmi' as const,
    type: 'stage' as const,
    current: false,
    bulletKeys: ['b1'] as const,
  },
] as const;

export const FORMATIONS = [
  { key: 'bachelor' as const, graduated: true,  bulletKeys: ['b1', 'b2', 'b3', 'b4'] as const },
  { key: 'bacpro'   as const, graduated: false, bulletKeys: [] as const },
  { key: 'brevet'   as const, graduated: false, bulletKeys: [] as const },
] as const;

export const LANGUES = ['fr', 'en', 'es'] as const;

export const ATOUTS = [
  { key: 'autonomie'     as const, icon: 'Compass'       },
  { key: 'reactivite'    as const, icon: 'Zap'           },
  { key: 'reflexion'     as const, icon: 'Brain'         },
  { key: 'communication' as const, icon: 'MessageSquare' },
  { key: 'equipe'        as const, icon: 'Users'         },
  { key: 'stress'        as const, icon: 'Shield'        },
] as const;

export const SKILLS = [
  { key: 'frontend'  as const, items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MDX'] },
  { key: 'backend'   as const, items: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'REST APIs', 'C# .NET 8'] },
  { key: 'devops'    as const, items: ['Docker', 'Docker Compose', 'Nginx', 'Linux', 'Git', 'Vercel', 'CI/CD', 'Active Directory', 'Azure AD'] },
  { key: 'languages' as const, items: ['Bash', 'SQL', 'HTML', 'CSS', 'JavaScript'] },
] as const;

export const FREELANCE_CLIENTS = ['BSV', "LM's Barber", 'Travel-easy'] as const;
