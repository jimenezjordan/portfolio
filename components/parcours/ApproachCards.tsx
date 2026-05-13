import { useTranslations } from 'next-intl';
import { Compass, Zap, Brain, MessageSquare, Users, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { ATOUTS } from './data';

const ICON_MAP: Record<string, LucideIcon> = {
  Compass, Zap, Brain, MessageSquare, Users, Shield,
};

export default function ApproachCards() {
  const t = useTranslations('Parcours.atouts');

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ATOUTS.map(({ key, icon }, i) => {
        const Icon = ICON_MAP[icon];
        return (
          <RevealOnScroll key={key} delay={0.05 + i * 0.06}>
            <div className="rounded-2xl border border-neutral-100 bg-white p-6">
              <Icon size={28} className="mb-4 text-neutral-700" />
              <p className="font-medium text-neutral-900">
                {t(`${key}.title` as Parameters<typeof t>[0])}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {t(`${key}.desc` as Parameters<typeof t>[0])}
              </p>
            </div>
          </RevealOnScroll>
        );
      })}
    </div>
  );
}
