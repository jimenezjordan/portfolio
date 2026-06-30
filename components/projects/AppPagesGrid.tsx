import { useTranslations } from 'next-intl';
import { Activity, Calendar, TrendingUp, BarChart2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const PAGES: Array<{ key: 'p1' | 'p2' | 'p3' | 'p4'; Icon: LucideIcon; route: string }> = [
  { key: 'p1', Icon: Activity,   route: '/' },
  { key: 'p2', Icon: Calendar,   route: '/daily' },
  { key: 'p3', Icon: TrendingUp, route: '/weekly' },
  { key: 'p4', Icon: BarChart2,  route: '/monthly' },
];

export default function AppPagesGrid() {
  const t = useTranslations('ProjectDegresJours.pages');

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {PAGES.map(({ key, Icon, route }) => (
        <div
          key={key}
          className="rounded-xl border border-sky-100 bg-white p-5 transition hover:border-sky-200 hover:shadow-sm dark:border-sky-900/30 dark:bg-neutral-900 dark:hover:border-sky-800/50"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-sky-50 dark:bg-sky-950/20">
              <Icon size={18} className="text-sky-600" />
            </div>
            <code className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">{route}</code>
          </div>
          <p className="text-sm font-bold text-neutral-900 dark:text-neutral-50">{t(`${key}.title`)}</p>
          <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">{t(`${key}.desc`)}</p>
        </div>
      ))}
    </div>
  );
}
