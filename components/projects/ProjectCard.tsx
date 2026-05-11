'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/projects';

const CARD_STYLES: Record<string, { gradient: string; initials: string }> = {
  'degres-jours': {
    gradient: 'from-slate-900 via-sky-950 to-slate-800',
    initials: 'DJ',
  },
  formrh: {
    gradient: 'from-slate-900 via-violet-950 to-slate-800',
    initials: 'RH',
  },
};

export default function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations('Home.projects');
  const style = CARD_STYLES[project.slug] ?? {
    gradient: 'from-neutral-800 to-neutral-900',
    initials: '?',
  };

  return (
    <Link href={`/projets/${project.slug}`} className="group block">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-300 group-hover:shadow-xl"
      >
        {/* Image placeholder */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`}
          />
          {/* Decorative initials */}
          <span className="absolute right-5 top-4 select-none font-black text-white/10"
            style={{ fontSize: '5rem', lineHeight: 1 }}
          >
            {style.initials}
          </span>
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          {/* CTA pill */}
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-sm transition duration-200 group-hover:bg-white group-hover:text-neutral-900">
            {t('viewCase')}
            <ArrowUpRight size={12} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-3 flex items-center gap-3 text-xs text-neutral-400">
            <span>{project.year}</span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span>{project.role}</span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-neutral-900">
            {t(project.titleKey)}
          </h3>

          <p className="mt-2.5 text-sm leading-relaxed text-neutral-500">
            {t(project.summaryKey)}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-neutral-200 bg-neutral-50 px-2 py-1 font-mono text-[11px] font-medium text-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
