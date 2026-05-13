import { useTranslations } from 'next-intl';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { FORMATIONS } from './data';

export default function FormationsList() {
  const t = useTranslations('Parcours.formations');

  return (
    <div className="divide-y divide-neutral-100">
      {FORMATIONS.map((f, i) => (
        <RevealOnScroll key={f.key} delay={i * 0.08}>
          <div className="grid gap-4 py-6 md:grid-cols-[160px_1fr]">
            {/* Left column — dates */}
            <div className="flex flex-row items-center gap-3 md:flex-col md:items-start md:gap-1">
              <span className="text-sm font-medium text-neutral-500">
                {t(`${f.key}.dates` as Parameters<typeof t>[0])}
              </span>
              {'duration' in f && (
                <span className="text-xs text-neutral-400">
                  {t(`${f.key}.duration` as Parameters<typeof t>[0])}
                </span>
              )}
              <span className="text-xs text-neutral-400">
                {t(`${f.key}.location` as Parameters<typeof t>[0])}
              </span>
            </div>

            {/* Right column — content */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-neutral-900">
                  {t(`${f.key}.diploma` as Parameters<typeof t>[0])}
                </h3>
                {f.graduated && (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                    {t('diplomeBadge')}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-neutral-500">
                {t(`${f.key}.school` as Parameters<typeof t>[0])}
              </p>
              {f.bulletKeys.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {f.bulletKeys.map((bk) => (
                    <li key={bk} className="flex items-start gap-2 text-sm text-neutral-600">
                      <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-neutral-400" />
                      {t(`${f.key}.${bk}` as Parameters<typeof t>[0])}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
