'use client';

import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LangSwitcher from './LangSwitcher';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const pathname = usePathname();

  const links = [
    { href: '/projets', label: t('projects') },
    { href: '/parcours', label: t('about') },
    { href: '/contact', label: t('contact') },
  ] as const;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 transition-transform duration-200 group-hover:scale-125" />
          <span className="font-semibold tracking-tight text-neutral-900">
            Jordan Jimenez
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`group relative pb-px text-sm font-medium transition-colors duration-150 ${
                    active
                      ? 'text-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute inset-x-0 -bottom-px h-px bg-neutral-900 transition-opacity duration-200 ${
                      active ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <LangSwitcher />
      </nav>
    </header>
  );
}
