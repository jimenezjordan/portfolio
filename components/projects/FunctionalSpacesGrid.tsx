import { useTranslations } from 'next-intl';
import { Mail, Bell, UserCheck, CreditCard, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const SPACES: Array<{ key: 's1' | 's2' | 's3' | 's4' | 's5'; Icon: LucideIcon }> = [
  { key: 's1', Icon: Mail },
  { key: 's2', Icon: Bell },
  { key: 's3', Icon: UserCheck },
  { key: 's4', Icon: CreditCard },
  { key: 's5', Icon: Settings },
];

export default function FunctionalSpacesGrid() {
  const t = useTranslations('ProjectFormRH.spaces');

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {SPACES.map(({ key, Icon }) => (
        <div
          key={key}
          className="rounded-xl border border-violet-100 bg-white p-5 transition hover:border-violet-200 hover:shadow-sm"
        >
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
            <Icon size={18} className="text-violet-600" />
          </div>
          <p className="text-sm font-bold text-neutral-900">{t(`${key}.title`)}</p>
          <p className="mt-1 text-xs leading-relaxed text-neutral-500">{t(`${key}.desc`)}</p>
        </div>
      ))}
    </div>
  );
}
