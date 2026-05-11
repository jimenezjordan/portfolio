import { useTranslations } from 'next-intl';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import Breadcrumb from '@/components/projects/Breadcrumb';
import ProjectHero from '@/components/projects/ProjectHero';
import ArchitectureDiagram from '@/components/projects/ArchitectureDiagram';
import CriticalTimeline from '@/components/projects/CriticalTimeline';
import DecisionCallout from '@/components/projects/DecisionCallout';
import StationGrid from '@/components/projects/StationGrid';
import { Link } from '@/i18n/routing';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';

export default function DegresJoursPage() {
  const t = useTranslations('ProjectDegresJours');

  return (
    <>
      {/* Breadcrumb — sur fond sombre du hero */}
      <div className="bg-gradient-to-b from-slate-950 to-transparent">
        <Breadcrumb
          items={[
            { label: t('breadcrumb.home'), href: '/' },
            { label: t('breadcrumb.projects'), href: '/projets' },
            { label: t('breadcrumb.current') },
          ]}
          dark
        />
      </div>

      {/* Hero — gradient slate → sky */}
      <ProjectHero
        tags={['Next.js', 'Node.js', 'MongoDB', 'Docker', 'C#']}
        title={t('hero.title')}
        pitch={t('hero.pitch')}
        stats={[
          { value: t('hero.stat1Value'), label: t('hero.stat1Label') },
          { value: t('hero.stat2Value'), label: t('hero.stat2Label') },
          { value: t('hero.stat3Value'), label: t('hero.stat3Label') },
          { value: t('hero.stat4Value'), label: t('hero.stat4Label') },
        ]}
        accentColor="sky"
      />

      {/* Contexte — blanc */}
      <section className="border-t border-neutral-200/70 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <div className="grid gap-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  {t('context.kicker')}
                </span>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
                  {t('context.title')}
                </h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-lg leading-relaxed text-neutral-600">{t('context.p1')}</p>
                <p className="mt-4 text-lg leading-relaxed text-neutral-600">{t('context.p2')}</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Architecture — fond sombre, visuel technique */}
      <section className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-500">
              {t('architecture.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
              {t('architecture.title')}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <ArchitectureDiagram
              branch1Label={t('architecture.branch1Label')}
              branch2Label={t('architecture.branch2Label')}
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* Timeline — fond slate très sombre */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-500">
              {t('timeline.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
              {t('timeline.title')}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <CriticalTimeline />
          </RevealOnScroll>
        </div>
      </section>

      {/* Décision technique — blanc avec accents */}
      <section className="border-t border-neutral-200/70 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <DecisionCallout
              kicker={t('decision.kicker')}
              title={t('decision.title')}
            >
              {t('decision.content')}
            </DecisionCallout>
          </RevealOnScroll>
        </div>
      </section>

      {/* Stations — teinte sky très légère */}
      <section className="border-t border-sky-100 bg-sky-50">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-600">
              {t('stations.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
              {t('stations.title')}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <StationGrid />
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA — fond sombre final */}
      <section className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <RevealOnScroll>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://degres-jours.eslc.fr"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-sky-400"
              >
                {t('cta.live')}
                <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <Link
                href="/projets"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-transparent px-6 py-3 text-sm font-semibold text-neutral-300 transition hover:border-neutral-500 hover:text-white"
              >
                <ArrowLeft size={16} />
                {t('cta.allProjects')}
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
