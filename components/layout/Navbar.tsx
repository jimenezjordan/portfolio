'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LangSwitcher from './LangSwitcher';

export default function Navbar() {
  const t = useTranslations('Navbar');

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-neutral-50/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-medium tracking-tight">
          Jordan Jimenez
        </Link>

        <ul className="hidden items-center gap-8 text-sm text-neutral-600 md:flex">
          <li>
            <Link href="/projets" className="hover:text-neutral-900">
              {t('projects')}
            </Link>
          </li>
          <li>
            <Link href="/parcours" className="hover:text-neutral-900">
              {t('about')}
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-neutral-900">
              {t('contact')}
            </Link>
          </li>
        </ul>

        <LangSwitcher />
      </nav>
    </header>
  );
}