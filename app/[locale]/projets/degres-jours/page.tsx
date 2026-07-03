import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import ProjectHero from '@/components/projects/ProjectHero';
import ArchitectureDiagram from '@/components/projects/ArchitectureDiagram';
import CriticalTimeline from '@/components/projects/CriticalTimeline';
import DecisionCallout from '@/components/projects/DecisionCallout';
import StationGrid from '@/components/projects/StationGrid';
import AppPagesGrid from '@/components/projects/AppPagesGrid';
import { Link } from '@/i18n/routing';
import { ArrowLeft, X, Check, Lock } from 'lucide-react';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jordan-jimenez.dev';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('degresJours.title'),
    description: t('degresJours.description'),
    openGraph: {
      title: t('degresJours.title'),
      description: t('degresJours.description'),
      images: [{ url: '/og/degres-jours.png', width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${BASE}/projets/degres-jours`,
      languages: { fr: `${BASE}/projets/degres-jours`, en: `${BASE}/en/projets/degres-jours` },
    },
  };
}

export default function DegresJoursPage() {
  const t = useTranslations('ProjectDegresJours');

  return (
    <>
      {/* 1 — Hero */}
      <ProjectHero
        breadcrumb={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.projects'), href: '/projets' },
          { label: t('breadcrumb.current') },
        ]}
        tags={['Next.js', 'Express.js', 'MongoDB', 'Docker', 'Chokidar']}
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

      {/* 2 — Contexte */}
      <section className="border-t border-neutral-200/70 bg-white dark:border-neutral-800/70 dark:bg-neutral-950">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <div className="grid gap-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  {t('context.kicker')}
                </span>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl">
                  {t('context.title')}
                </h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">{t('context.p1')}</p>
                <p className="mt-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">{t('context.p2')}</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 3 — DJU + Pipeline */}
      <section className="border-t border-neutral-200/70 bg-neutral-50 dark:border-neutral-800/70 dark:bg-neutral-900">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <div className="grid gap-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  {t('dju.kicker')}
                </span>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl">
                  {t('dju.title')}
                </h2>
              </div>
              <div className="md:col-span-8">
                {/* Encart DJU */}
                <div className="rounded-xl border border-sky-200 bg-sky-50 px-6 py-5 dark:border-sky-800/50 dark:bg-sky-950/30">
                  <p className="text-sm font-semibold text-sky-700 dark:text-sky-400">
                    {t('dju.explainerTitle')}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-sky-800 dark:text-sky-300">
                    {t('dju.explainerBody')}
                  </p>
                </div>
                {/* Pipeline */}
                <ol className="mt-8 flex flex-col gap-3">
                  {(['s1', 's2', 's3', 's4', 's5'] as const).map((key, i) => (
                    <li key={key} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700 dark:bg-sky-900/40 dark:text-sky-400">
                        {i + 1}
                      </span>
                      <span className="font-mono text-sm text-neutral-700 dark:text-neutral-300">
                        {t(`dju.steps.${key}` as any)}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 4 — Architecture */}
      <section className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-500">
              {t('architecture.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
              {t('architecture.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">
              {t('architecture.leadIn')}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <ArchitectureDiagram
              branch1Label={t('architecture.branch1Label')}
              branch2Label={t('architecture.branch2Label')}
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* 5 — Fenêtre critique */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-500">
              {t('timeline.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
              {t('timeline.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
              {t('timeline.context')}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <CriticalTimeline />
          </RevealOnScroll>
        </div>
      </section>

      {/* 6 — 3 décisions techniques */}
      <section className="border-t border-neutral-200/70 bg-white dark:border-neutral-800/70 dark:bg-neutral-950">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <div className="grid gap-6 md:grid-cols-3">
              <DecisionCallout
                kicker={t('decision1.kicker')}
                title={t('decision1.title')}
              >
                {t('decision1.content')}
              </DecisionCallout>
              <DecisionCallout
                kicker={t('decision2.kicker')}
                title={t('decision2.title')}
              >
                {t('decision2.content')}
              </DecisionCallout>
              <DecisionCallout
                kicker={t('decision3.kicker')}
                title={t('decision3.title')}
              >
                {t('decision3.content')}
              </DecisionCallout>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 7 — Avant / Après */}
      <section className="border-t border-neutral-200/70 bg-neutral-50 dark:border-neutral-800/70 dark:bg-neutral-900">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              {t('beforeAfter.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl">
              {t('beforeAfter.title')}
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {/* Colonne Avant */}
              <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-5 dark:border-red-900/40 dark:bg-red-950/20">
                <p className="mb-4 text-sm font-semibold text-red-700 dark:text-red-400">
                  {t('beforeAfter.before')}
                </p>
                <ul className="flex flex-col gap-3">
                  {(['row1before', 'row2before', 'row3before', 'row4before', 'row5before'] as const).map((key) => (
                    <li key={key} className="flex items-start gap-2.5">
                      <X size={15} className="mt-0.5 flex-none text-red-500 dark:text-red-400" />
                      <span className="text-sm text-red-800 dark:text-red-300">
                        {t(`beforeAfter.${key}` as any)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Colonne Après */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <p className="mb-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  {t('beforeAfter.after')}
                </p>
                <ul className="flex flex-col gap-3">
                  {(['row1after', 'row2after', 'row3after', 'row4after', 'row5after'] as const).map((key) => (
                    <li key={key} className="flex items-start gap-2.5">
                      <Check size={15} className="mt-0.5 flex-none text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm text-emerald-800 dark:text-emerald-300">
                        {t(`beforeAfter.${key}` as any)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 8 — L'application */}
      <section className="border-t border-sky-100 bg-sky-50 dark:border-sky-900/30 dark:bg-sky-950/20">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-600">
              {t('pages.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl">
              {t('pages.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              {t('pages.intro')}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <AppPagesGrid />
          </RevealOnScroll>
        </div>
      </section>

      {/* 9 — Couverture géographique + CTA */}
      <section className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-500">
              {t('stations.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
              {t('stations.title')}
            </h2>
            <p className="mt-3 text-base text-neutral-400">{t('stations.description')}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <StationGrid />
          </RevealOnScroll>

          {/* Confidentialité + CTA */}
          <RevealOnScroll delay={0.2} className="mt-16 border-t border-neutral-800 pt-16">
            {/* Encart confidentialité */}
            <div className="mb-8 flex items-start gap-4 rounded-xl border border-amber-700/50 bg-amber-950/30 px-6 py-5">
              <Lock size={20} className="mt-0.5 flex-none text-amber-400" />
              <div>
                <p className="text-base font-semibold text-amber-300">
                  {t('cta.confidentialTitle')}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-amber-400">
                  {t('cta.confidentialText')}
                </p>
              </div>
            </div>
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-transparent px-6 py-3 text-sm font-semibold text-neutral-300 transition hover:border-neutral-500 hover:text-white"
            >
              <ArrowLeft size={16} />
              {t('cta.allProjects')}
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
