import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Home.hero');

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {t('available')}
      </span>
      <h1 className="mt-6 text-5xl font-medium tracking-tight">
        {t('title')}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        {t('subtitle')}
      </p>
    </section>
  );
}