'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Scenario = 'nominal' | 'error';

const NODE_KEYS = ['n1330', 'n1335', 'n1340', 'n1345', 'n1400'] as const;
type NodeKey = typeof NODE_KEYS[number];

const NO_RETURN_NODE: NodeKey = 'n1345';

const STATUS_STYLES: Record<string, string> = {
  AUTO:     'bg-neutral-800 text-neutral-300 border border-neutral-700',
  FENÊTRE:  'bg-amber-950 text-amber-400 border border-amber-800',
  WINDOW:   'bg-amber-950 text-amber-400 border border-amber-800',
  CRITIQUE: 'bg-red-950 text-red-400 border border-red-800',
  CRITICAL: 'bg-red-950 text-red-400 border border-red-800',
};

export default function CriticalTimeline() {
  const t = useTranslations('ProjectDegresJours.timeline');
  const [activeNode, setActiveNode] = useState<NodeKey | null>(null);
  const [scenario, setScenario] = useState<Scenario>('nominal');

  const handleNode = (key: NodeKey) => {
    setActiveNode((prev) => (prev === key ? null : key));
  };

  const activeData = activeNode
    ? {
        time:   t(`nodes.${activeNode}.time`),
        status: t(`nodes.${activeNode}.status`),
        action: t(`nodes.${activeNode}.${scenario}.action`),
        detail: t(`nodes.${activeNode}.${scenario}.detail`),
      }
    : null;

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 md:p-8">
      {/* Toggle scenario */}
      <div className="mb-8 flex gap-2">
        <button
          onClick={() => { setScenario('nominal'); setActiveNode(null); }}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
            scenario === 'nominal'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'border border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200'
          }`}
        >
          {t('scenarioNominal')}
        </button>
        <button
          onClick={() => { setScenario('error'); setActiveNode(null); }}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
            scenario === 'error'
              ? 'bg-red-600 text-white shadow-md'
              : 'border border-neutral-700 text-neutral-400 hover:border-neutral-600 hover:text-neutral-200'
          }`}
        >
          {t('scenarioError')}
        </button>
      </div>

      {/* Timeline track */}
      <div className="overflow-x-auto pb-2">
        <div className="relative flex min-w-[480px] items-start justify-between pt-8">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-[28px] h-px bg-neutral-700" />

          {NODE_KEYS.map((key) => {
            const isActive = activeNode === key;
            const isNoReturn = key === NO_RETURN_NODE;

            return (
              <div key={key} className="relative z-10 flex flex-col items-center gap-2.5">
                {/* No-return badge above */}
                {isNoReturn && (
                  <span className="absolute -top-6 whitespace-nowrap rounded-full border border-amber-800 bg-amber-950 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                    {t('noReturn')}
                  </span>
                )}

                <button
                  onClick={() => handleNode(key)}
                  aria-pressed={isActive}
                  className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${
                    isNoReturn
                      ? isActive
                        ? 'scale-110 border-amber-500 bg-amber-500 text-white shadow-lg shadow-amber-900/50'
                        : 'border-amber-700 bg-amber-950 text-amber-400 hover:border-amber-500'
                      : isActive
                      ? 'scale-110 border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-900/50'
                      : 'border-neutral-600 bg-neutral-800 text-neutral-500 hover:border-neutral-400 hover:text-neutral-300'
                  }`}
                >
                  {isNoReturn ? (
                    <span className="text-sm leading-none">⚠</span>
                  ) : (
                    <span className={`h-2 w-2 rounded-full transition-colors ${isActive ? 'bg-white' : 'bg-neutral-600'}`} />
                  )}
                </button>

                <span className={`font-mono text-xs font-semibold tabular-nums ${
                  isNoReturn ? 'text-amber-400' : isActive ? 'text-sky-400' : 'text-neutral-500'
                }`}>
                  {t(`nodes.${key}.time`)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {activeData ? (
          <motion.div
            key={`${activeNode}-${scenario}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 rounded-xl border border-neutral-700 bg-neutral-800 p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-white">
                {activeData.time}
              </span>
              <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                STATUS_STYLES[activeData.status] ?? 'bg-neutral-800 text-neutral-400 border border-neutral-700'
              }`}>
                {activeData.status}
              </span>
            </div>
            <p className="font-semibold text-white">{activeData.action}</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">{activeData.detail}</p>
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 text-center text-sm text-neutral-600"
          >
            {t('clickHint')}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
