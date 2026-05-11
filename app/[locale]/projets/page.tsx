import { useTranslations } from 'next-intl';
import { projects } from '@/lib/projects';
import ProjectCard from '@/components/projects/ProjectCard';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function ProjetsPage() {
  const t = useTranslations('Home.projects');

  return (
    <section className="bg-neutral-50 min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <RevealOnScroll>
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            {t('kicker')}
          </span>
          <h1 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight text-neutral-900 md:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-600">{t('subtitle')}</p>
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.slug} delay={0.1 + i * 0.1}>
              <ProjectCard project={project} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
