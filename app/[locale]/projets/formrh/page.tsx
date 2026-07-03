import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import ProjectHero from '@/components/projects/ProjectHero';
import WorkflowRoles from '@/components/projects/WorkflowRoles';
import FormRHArchitectureDiagram from '@/components/projects/FormRHArchitectureDiagram';
import ADWorkerSimulator from '@/components/projects/ADWorkerSimulator';
import GroupAttributionDiagram from '@/components/projects/GroupAttributionDiagram';
import FunctionalSpacesGrid from '@/components/projects/FunctionalSpacesGrid';
import DecisionCallout from '@/components/projects/DecisionCallout';
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
    title: t('formrh.title'),
    description: t('formrh.description'),
    openGraph: {
      title: t('formrh.title'),
      description: t('formrh.description'),
      images: [{ url: '/og/formrh.png', width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${BASE}/projets/formrh`,
      languages: { fr: `${BASE}/projets/formrh`, en: `${BASE}/en/projets/formrh` },
    },
  };
}

export default function FormRHPage() {
  const t = useTranslations('ProjectFormRH');

  return (
    <>
      {/* 1 — Hero */}
      <ProjectHero
        breadcrumb={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.projects'), href: '/projets' },
          { label: t('breadcrumb.current') },
        ]}
        tags={['Next.js', 'Express', 'MongoDB', 'LDAP', 'Active Directory', 'Azure AD', 'NextAuth']}
        title={t('hero.title')}
        pitch={t('hero.pitch')}
        stats={[
          { value: t('hero.stat1Value'), label: t('hero.stat1Label') },
          { value: t('hero.stat2Value'), label: t('hero.stat2Label') },
          { value: t('hero.stat3Value'), label: t('hero.stat3Label') },
          { value: t('hero.stat4Value'), label: t('hero.stat4Label') },
        ]}
        accentColor="violet"
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

      {/* 3 — Rôles */}
      <section className="border-t border-neutral-100 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              {t('roles.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl">
              {t('roles.title')}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
              {t('roles.intro')}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <WorkflowRoles />
          </RevealOnScroll>
        </div>
      </section>

      {/* 4 — Architecture */}
      <section className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-500">
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
            <FormRHArchitectureDiagram />
          </RevealOnScroll>
        </div>
      </section>

      {/* 5 — Simulator */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
              {t('simulator.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
              {t('simulator.title')}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <ADWorkerSimulator />
          </RevealOnScroll>
        </div>
      </section>

      {/* 6 — 3 décisions techniques */}
      <section className="border-t border-neutral-200/70 bg-white dark:border-neutral-800/70 dark:bg-neutral-950">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="grid gap-6 md:grid-cols-3">
            <RevealOnScroll>
              <DecisionCallout
                kicker={t('decision1.kicker')}
                title={t('decision1.title')}
              >
                {t('decision1.content')}
              </DecisionCallout>
            </RevealOnScroll>
            <RevealOnScroll delay={0.05}>
              <DecisionCallout
                kicker={t('decision2.kicker')}
                title={t('decision2.title')}
              >
                {t('decision2.content')}
              </DecisionCallout>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <DecisionCallout
                kicker={t('decision3.kicker')}
                title={t('decision3.title')}
              >
                {t('decision3.content')}
              </DecisionCallout>
            </RevealOnScroll>
          </div>
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

      {/* 8 — Algorithme */}
      <section className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              {t('algo.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl">
              {t('algo.title')}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <GroupAttributionDiagram />
          </RevealOnScroll>
        </div>
      </section>

      {/* 9 — Espaces fonctionnels + CTA */}
      <section className="border-t border-violet-100 bg-violet-50 dark:border-violet-900/30 dark:bg-violet-950/20">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-600">
              {t('spaces.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-3xl">
              {t('spaces.title')}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <FunctionalSpacesGrid />
          </RevealOnScroll>

          {/* Confidentialité + CTA */}
          <RevealOnScroll delay={0.2} className="mt-16 border-t border-violet-200 pt-16 dark:border-violet-900/40">
            {/* Encart confidentialité */}
            <div className="mb-8 flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50 px-6 py-5 dark:border-amber-800/50 dark:bg-amber-950/30">
              <Lock size={20} className="mt-0.5 flex-none text-amber-600 dark:text-amber-400" />
              <div>
                <p className="text-base font-semibold text-amber-800 dark:text-amber-300">
                  {t('cta.confidentialTitle')}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-amber-700 dark:text-amber-400">
                  {t('cta.confidentialText')}
                </p>
              </div>
            </div>
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-300 bg-transparent px-6 py-3 text-sm font-semibold text-violet-700 transition hover:border-violet-500 hover:text-violet-900 dark:border-violet-800 dark:text-violet-300 dark:hover:border-violet-600 dark:hover:text-violet-100"
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
