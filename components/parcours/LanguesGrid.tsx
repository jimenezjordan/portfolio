import { useTranslations } from 'next-intl';
import { LANGUES } from './data';

export default function LanguesGrid() {
  const t = useTranslations('Parcours.langues');

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {LANGUES.map((lang) => (
        <div
          key={lang}
          className="rounded-xl border border-neutral-100 bg-neutral-50 px-5 py-4"
        >
          <p className="font-medium text-neutral-900">
            {t(`${lang}.name` as Parameters<typeof t>[0])}
          </p>
          <p className="mt-0.5 text-sm text-neutral-500">
            {t(`${lang}.level` as Parameters<typeof t>[0])}
          </p>
        </div>
      ))}
    </div>
  );
}
