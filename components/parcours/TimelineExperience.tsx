import { useTranslations } from 'next-intl';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { EXPERIENCES, FREELANCE_CLIENTS } from './data';

const TYPE_STYLES: Record<string, string> = {
  alternance: 'bg-violet-100 text-violet-700',
  freelance:  'bg-sky-100 text-sky-700',
  stage:      'bg-neutral-100 text-neutral-600',
};

export default function TimelineExperience() {
  const t = useTranslations('Parcours.experiences');

  return (
    <div className="relative">
      {/* Vertical line — desktop: centre, mobile: left */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-700 md:left-1/2 md:-translate-x-px" />

      <ol className="space-y-10">
        {EXPERIENCES.map((exp, i) => {
          const isRight = i % 2 === 0;
          const typeLabel = t(`type${exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}` as Parameters<typeof t>[0]);
          const typeBadge = TYPE_STYLES[exp.type];

          return (
            <li key={exp.key} className="relative">
              {/* Dot — mobile: left-4, desktop: centre */}
              <div className="absolute left-4 top-6 z-10 -translate-x-1/2 md:left-1/2">
                {exp.current ? (
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                  </span>
                ) : (
                  <span className="inline-flex h-3 w-3 rounded-full bg-neutral-400" />
                )}
              </div>

              {/* Layout: stack on mobile, zig-zag on desktop */}
              <div className={`flex flex-col pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-10 ${isRight ? '' : 'md:[&>*:first-child]:order-last'}`}>
                {/* Date column (desktop only visible) */}
                <div className={`hidden md:flex md:items-start md:pt-5 ${isRight ? 'md:justify-end md:pr-10' : 'md:justify-start md:pl-10'}`}>
                  <RevealOnScroll delay={i * 0.1}>
                    <div className="text-right">
                      <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        {t(`${exp.key}.dates` as Parameters<typeof t>[0])}
                      </span>
                      <br />
                      <span className="text-xs text-neutral-400 dark:text-neutral-500">
                        {t(`${exp.key}.location` as Parameters<typeof t>[0])}
                      </span>
                    </div>
                  </RevealOnScroll>
                </div>

                {/* Card */}
                <div className={`${isRight ? 'md:pl-10' : 'md:pr-10'}`}>
                  <RevealOnScroll delay={i * 0.1}>
                    <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                      {/* Header */}
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${typeBadge}`}>
                          {typeLabel}
                        </span>
                        {exp.current && (
                          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                            {t('inProgress')}
                          </span>
                        )}
                        {/* Dates visible on mobile only */}
                        <span className="ml-auto text-xs text-neutral-400 dark:text-neutral-500 md:hidden">
                          {t(`${exp.key}.dates` as Parameters<typeof t>[0])}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-400 dark:text-neutral-500 md:hidden">
                        {t(`${exp.key}.location` as Parameters<typeof t>[0])}
                      </p>

                      <h3 className="mt-2 font-semibold text-neutral-900 dark:text-neutral-50">
                        {t(`${exp.key}.title` as Parameters<typeof t>[0])}
                      </h3>
                      <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                        {t(`${exp.key}.company` as Parameters<typeof t>[0])}
                      </p>

                      <ul className="mt-3 space-y-1.5">
                        {exp.bulletKeys.map((bk) => (
                          <li key={bk} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-neutral-400" />
                            {t(`${exp.key}.${bk}` as Parameters<typeof t>[0])}
                          </li>
                        ))}
                      </ul>

                      {'hasClients' in exp && exp.hasClients && (
                        <p className="mt-4 border-t border-neutral-100 pt-3 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                          <span className="font-medium">{t('clientsLabel')} : </span>
                          {FREELANCE_CLIENTS.join(' · ')}
                        </p>
                      )}
                    </div>
                  </RevealOnScroll>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
