import { useTranslations } from 'next-intl';
import { projects } from '@/lib/projects';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import ProjectCard from '@/components/projects/ProjectCard';

export default function ProjectsGrid() {
  const t = useTranslations('Home.projects');

  return (
    <section className="border-t border-neutral-200/70 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <RevealOnScroll>
          <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            {t('kicker')}
          </span>
          <h2 className="mt-3 max-w-2xl text-2xl font-medium tracking-tight text-neutral-900 md:text-3xl">
            {t('title')}
          </h2>
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