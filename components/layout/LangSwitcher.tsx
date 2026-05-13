'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';

export default function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const otherLocale = locale === 'fr' ? 'en' : 'fr';

  const switchLocale = () => {
    startTransition(() => {
      router.replace(pathname, { locale: otherLocale });
    });
  };

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="rounded-md border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
    >
      {otherLocale.toUpperCase()}
    </button>
  );
}