import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Download, ArrowRight } from 'lucide-react';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jordan-jimenez.dev';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('parcours.title'),
    description: t('parcours.description'),
    openGraph: {
      title: t('parcours.title'),
      description: t('parcours.description'),
      images: [{ url: '/og/parcours.png', width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${BASE}/parcours`,
      languages: { fr: `${BASE}/parcours`, en: `${BASE}/en/parcours` },
    },
  };
}
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import TimelineExperience from '@/components/parcours/TimelineExperience';
import FormationsList from '@/components/parcours/FormationsList';
import LanguesGrid from '@/components/parcours/LanguesGrid';
import ApproachCards from '@/components/parcours/ApproachCards';
import { SKILLS } from '@/components/parcours/data';

const SKILL_NUMBERS = ['01', '02', '03', '04'];

export default function ParcoursPage() {
  const t = useTranslations('Parcours');

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
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-neutral-500">
            {t('hero.bio')}
          </p>
          <a
            href="/cv-jordan-jimenez.pdf"
            download
            className="mt-7 inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50"
          >
            <Download size={15} />
            {t('hero.downloadCv')}
          </a>
        </div>
      </section>

      {/* Expériences */}
      <section className="border-t border-neutral-200/70 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {t('experiences.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
              {t('experiences.title')}
            </h2>
          </RevealOnScroll>
          <div className="mt-12">
            <TimelineExperience />
          </div>
        </div>
      </section>

      {/* Formations */}
      <section className="border-t border-neutral-200/70 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {t('formations.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
              {t('formations.title')}
            </h2>
          </RevealOnScroll>
          <div className="mt-10">
            <FormationsList />
          </div>
        </div>
      </section>

      {/* Compétences — pattern StackSection */}
      <section className="border-t border-neutral-200/70 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {t('skills.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
              {t('skills.title')}
            </h2>
          </RevealOnScroll>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {SKILLS.map((cat, i) => (
              <RevealOnScroll key={cat.key} delay={0.05 + i * 0.05}>
                <div className="rounded-2xl border border-neutral-100 bg-white p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-neutral-300">
                      {SKILL_NUMBERS[i]}
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-700">
                      {t(`skills.${cat.key}` as Parameters<typeof t>[0])}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1.5 font-mono text-xs font-medium text-neutral-700 shadow-sm"
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

      {/* Langues */}
      <section className="border-t border-neutral-200/70 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {t('langues.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
              {t('langues.title')}
            </h2>
          </RevealOnScroll>
          <div className="mt-10">
            <LanguesGrid />
          </div>
        </div>
      </section>

      {/* Atouts */}
      <section className="border-t border-neutral-200/70 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <RevealOnScroll>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {t('atouts.kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
              {t('atouts.title')}
            </h2>
          </RevealOnScroll>
          <div className="mt-10">
            <ApproachCards />
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <RevealOnScroll>
            <p className="text-lg font-medium text-white">{t('cta.text')}</p>
            <Link
              href="/contact"
              className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-400 transition hover:text-white"
            >
              {t('cta.link')}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
