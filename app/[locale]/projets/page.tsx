import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { projects } from '@/lib/projects';
import ProjectCard from '@/components/projects/ProjectCard';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { ArrowRight } from 'lucide-react';

export default function ProjetsPage() {
  const t = useTranslations('Projects');

  return (
    <>
      {/* Hero */}
      <section className="border-b border-neutral-200/70 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-neutral-400">
              <li>
                <Link href="/" className="transition-colors hover:text-neutral-700">
                  {t('breadcrumb.home')}
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="font-medium text-neutral-700">{t('breadcrumb.current')}</li>
            </ol>
          </nav>

          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            {t('hero.kicker')}
          </span>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-neutral-900 md:text-5xl">
            {t('hero.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-neutral-500">{t('hero.subtitle')}</p>
        </div>
      </section>

      {/* Grid de projets */}
      <section className="bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <RevealOnScroll key={project.slug} delay={0.05 + i * 0.1}>
                <ProjectCard project={project} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Section finale */}
      <section className="border-t border-neutral-200/70 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
          <RevealOnScroll>
            <p className="text-neutral-500">{t('final.text')}</p>
            <Link
              href="/contact"
              className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 transition hover:text-neutral-600"
            >
              {t('final.cta')}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
