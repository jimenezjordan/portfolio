import { useTranslations } from 'next-intl';

type Step = {
  key: 's1' | 's2' | 's3' | 's4' | 's5';
  autoKeys: string[];
  role: 'rh' | 'manager' | 'admin' | 'auto';
};

const STEPS: Step[] = [
  { key: 's1', role: 'rh',      autoKeys: ['auto1'] },
  { key: 's2', role: 'manager', autoKeys: ['auto1', 'auto2'] },
  { key: 's3', role: 'admin',   autoKeys: ['auto1', 'auto2', 'auto3'] },
  { key: 's4', role: 'admin',   autoKeys: ['auto1'] },
  { key: 's5', role: 'auto',    autoKeys: ['auto1', 'auto2'] },
];

const ROLE_STYLES: Record<string, { badge: string; dot: string; num: string }> = {
  rh:      { badge: 'bg-violet-100 text-violet-700', dot: 'bg-violet-500', num: 'bg-violet-600' },
  manager: { badge: 'bg-sky-100 text-sky-700',       dot: 'bg-sky-500',    num: 'bg-sky-600' },
  admin:   { badge: 'bg-amber-100 text-amber-700',   dot: 'bg-amber-500',  num: 'bg-amber-600' },
  auto:    { badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500', num: 'bg-emerald-600' },
};

export default function WorkflowRoles() {
  const t = useTranslations('ProjectFormRH.roles');

  return (
    <div className="relative">
      {/* Vertical connector line */}
      <div className="absolute left-[15px] top-8 bottom-8 w-px bg-neutral-200 dark:bg-neutral-700 md:left-[19px]" />

      <ol className="space-y-0">
        {STEPS.map(({ key, role, autoKeys }, i) => {
          const s = ROLE_STYLES[role];
          const isLast = i === STEPS.length - 1;

          return (
            <li key={key} className="relative flex gap-4 md:gap-6">
              {/* Step number */}
              <div className="relative z-10 flex-none">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm ${s.num}`}
                >
                  {i + 1}
                </span>
              </div>

              {/* Content card */}
              <div className={`mb-4 flex-1 rounded-xl border border-neutral-100 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900 ${isLast ? '' : ''}`}>
                {/* Header */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${s.badge}`}>
                    {t(`${key}.role`)}
                  </span>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-50">
                    {t(`${key}.title`)}
                  </h3>
                </div>

                {/* Human action */}
                <p className="text-sm text-neutral-600 leading-relaxed dark:text-neutral-400">
                  {t(`${key}.action`)}
                </p>

                {/* Automatic triggers */}
                {autoKeys.length > 0 && (
                  <ul className="mt-3 space-y-1.5 border-t border-neutral-100 pt-3 dark:border-neutral-800">
                    {autoKeys.map((ak) => (
                      <li key={ak} className="flex items-start gap-2 text-xs text-emerald-700">
                        <span className="mt-0.5 shrink-0 rounded bg-emerald-100 px-1.5 py-0.5 font-bold uppercase tracking-wide text-emerald-600" style={{ fontSize: '9px' }}>
                          {t('autoLabel')}
                        </span>
                        <span className="leading-relaxed">{t(`${key}.${ak}`)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
