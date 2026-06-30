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
import { ArrowLeft } from 'lucide-react';

export default function FormRHPage() {
  const t = useTranslations('ProjectFormRH');

  return (
    <>
      {/* Hero — gradient slate → violet, breadcrumb intégré */}
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

      {/* Contexte — blanc */}
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
                <p className="text-lg leading-relaxed text-neutral-600">{t('context.p1')}</p>
                <p className="mt-4 text-lg leading-relaxed text-neutral-600">{t('context.p2')}</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Rôles — fond neutre clair */}
      <section className="border-t border-neutral-100 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {t('roles.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
              {t('roles.title')}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <WorkflowRoles />
          </RevealOnScroll>
        </div>
      </section>

      {/* Architecture — fond sombre */}
      <section className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-500">
              {t('architecture.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-3xl">
              {t('architecture.title')}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <FormRHArchitectureDiagram />
          </RevealOnScroll>
        </div>
      </section>

      {/* Simulator — fond slate très sombre */}
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

      {/* Décisions techniques — blanc */}
      <section className="border-t border-neutral-200/70 bg-white dark:border-neutral-800/70 dark:bg-neutral-950">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-3">
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

      {/* Algorithme — fond neutre */}
      <section className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {t('algo.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
              {t('algo.title')}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <GroupAttributionDiagram />
          </RevealOnScroll>
        </div>
      </section>

      {/* Espaces fonctionnels — teinte violet légère */}
      <section className="border-t border-violet-100 bg-violet-50 dark:border-violet-900/30 dark:bg-violet-950/20">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-600">
              {t('spaces.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
              {t('spaces.title')}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="mt-10">
            <FunctionalSpacesGrid />
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA — fond sombre final */}
      <section className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <RevealOnScroll>
            <div className="flex flex-wrap items-center gap-4">
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
