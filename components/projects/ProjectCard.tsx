'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '@/lib/projects';

export default function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations('Home.projects');

  return (
    <Link href={`/projets/${project.slug}`} className="group block">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
            <span className="text-sm font-medium text-neutral-400">
              {project.slug}
            </span>
          </div>

          <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-700 backdrop-blur transition group-hover:bg-neutral-900 group-hover:text-white">
            {t('viewCase')}
            <ArrowUpRight
              size={12}
              className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>

        <div className="p-6">
          <div className="mb-3 flex items-center gap-3 text-xs text-neutral-500">
            <span>{project.year}</span>
            <span className="h-1 w-1 rounded-full bg-neutral-300" />
            <span>{project.role}</span>
          </div>

          <h3 className="text-xl font-medium tracking-tight text-neutral-900">
            {t(project.titleKey)}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            {t(project.summaryKey)}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600"
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