import { Link } from '@/i18n/routing';

type BreadcrumbItem = { label: string; href?: string };

export default function Breadcrumb({ items, dark = false }: { items: BreadcrumbItem[]; dark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-5xl px-6 pt-6">
      <ol className={`flex items-center gap-2 text-sm ${dark ? 'text-neutral-500' : 'text-neutral-500'}`}>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className={dark ? 'text-neutral-700' : 'text-neutral-300'}>›</span>}
            {item.href ? (
              <Link
                href={item.href}
                className={`transition-colors ${dark ? 'hover:text-neutral-200' : 'hover:text-neutral-900'}`}
              >
                {item.label}
              </Link>
            ) : (
              <span className={`font-semibold ${dark ? 'text-white' : 'text-neutral-900'}`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
