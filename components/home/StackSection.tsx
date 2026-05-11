import { useTranslations } from 'next-intl';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

const stackCategories = [
  {
    key: 'frontend' as const,
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MDX']
  },
  {
    key: 'backend' as const,
    items: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'REST APIs']
  },
  {
    key: 'devops' as const,
    items: [
      'Docker',
      'Docker Compose',
      'Nginx',
      'Linux',
      'Git',
      'Vercel',
      'Active Directory',
      'Azure AD',
      'CI/CD'
    ]
  },
  {
    key: 'languages' as const,
    items: ['C#', 'Bash', 'SQL']
  }
];

export default function StackSection() {
  const t = useTranslations('Home.stack');

  return (
    <section className="border-t border-neutral-200/70 bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <RevealOnScroll>
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            {t('kicker')}
          </span>
          <h2 className="mt-3 max-w-2xl text-2xl font-medium tracking-tight text-neutral-900 md:text-3xl">
            {t('title')}
          </h2>
        </RevealOnScroll>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {stackCategories.map((cat, i) => (
            <RevealOnScroll key={cat.key} delay={0.1 + i * 0.05}>
              <div>
                <h3 className="text-sm font-medium text-neutral-900">
                  {t(cat.key)}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}