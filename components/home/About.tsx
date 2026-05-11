import { useTranslations } from 'next-intl';
import RevealOnScroll from '@/components/ui/RevealOnScroll';

export default function About() {
  const t = useTranslations('Home.about');

  return (
    <section className="relative border-t border-neutral-200/70 bg-neutral-50 overflow-hidden">
      {/* Decorative large number */}
      <span className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 select-none text-[160px] font-black leading-none text-neutral-200 md:block">
        4
      </span>

      <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <RevealOnScroll className="md:col-span-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {t('kicker')}
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
              {t('title')}
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="md:col-span-8">
            <p className="text-lg leading-relaxed text-neutral-600">
              {t('p1')}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600">
              {t('p2')}
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
