import { Link } from '@/i18n/routing';
import StatCard from './StatCard';

type Stat = { value: string; label: string };
type BreadcrumbItem = { label: string; href?: string };

type Props = {
  breadcrumb?: BreadcrumbItem[];
  tags: string[];
  title: string;
  pitch: string;
  stats: Stat[];
  accentColor?: 'sky' | 'violet';
};

const ACCENT = {
  sky: {
    section:  'from-slate-950 via-sky-950 to-slate-950',
    tag:      'border-sky-800/60 bg-sky-900/40 text-sky-300',
    stat:     'sky',
    glow:     'bg-sky-500',
    dot:      'bg-sky-600',
  },
  violet: {
    section:  'from-slate-950 via-violet-950 to-slate-950',
    tag:      'border-violet-800/60 bg-violet-900/40 text-violet-300',
    stat:     'violet',
    glow:     'bg-violet-500',
    dot:      'bg-violet-600',
  },
} as const;

export default function ProjectHero({ breadcrumb, tags, title, pitch, stats, accentColor = 'sky' }: Props) {
  const a = ACCENT[accentColor];

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${a.section}`}>
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Glow */}
      <div className={`pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full ${a.glow} opacity-10 blur-3xl`} />

      <div className="relative mx-auto max-w-5xl px-6 pt-6 pb-16">
        {/* Breadcrumb */}
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              {breadcrumb.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">›</span>}
                  {item.href ? (
                    <Link href={item.href} className="transition-colors hover:text-white/70">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-white/75">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-md border px-2.5 py-1 font-mono text-xs font-medium ${a.tag}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl md:leading-[1.1]">
          {title}
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-400">
          {pitch}
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 border-t border-white/10 pt-10">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} dark />
          ))}
        </div>
      </div>
    </section>
  );
}
