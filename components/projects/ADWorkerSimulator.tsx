'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Preset = 'standard' | 'emploi-special' | 'wildcards';

type Badge =
  | 'OK' | 'WARN' | 'ERR'
  | 'INFO' | 'LDAP' | 'MONGO' | 'AD' | 'ALGO' | 'BATCH';

type TerminalLine = {
  badge?: Badge;
  text: string;
  dim?: boolean;
};

const STEP_DELAY_MS    = 600;
const SUBLINE_DELAY_MS = 200;
const BADGE_DELAY_MS   = 80;

const BADGE_STYLES: Record<Badge, string> = {
  OK:    'bg-emerald-900 text-emerald-400 border border-emerald-700',
  WARN:  'bg-amber-900 text-amber-400 border border-amber-700',
  ERR:   'bg-red-950 text-red-400 border border-red-800',
  INFO:  'bg-neutral-800 text-neutral-400 border border-neutral-700',
  LDAP:  'bg-violet-950 text-violet-300 border border-violet-800',
  MONGO: 'bg-neutral-800 text-neutral-400 border border-neutral-700',
  AD:    'bg-violet-950 text-violet-300 border border-violet-800',
  ALGO:  'bg-neutral-800 text-neutral-300 border border-neutral-700',
  BATCH: 'bg-neutral-800 text-neutral-400 border border-neutral-700',
};

const SIMULATION_STEPS: Record<Preset, TerminalLine[][]> = {
  standard: [
    [
      { badge: 'INFO', text: 'Worker AD démarré — 2026-05-12T13:30:00Z' },
      { badge: 'LDAP', text: 'Connexion: ldap://dc01.eslc.local:389', dim: true },
      { badge: 'MONGO', text: 'Connexion: mongodb://srv-mongo:27017/formrh', dim: true },
    ],
    [
      { badge: 'BATCH', text: 'Récupération lot #1 — 3 travailleurs' },
      { text: '  · MARTIN Pierre        [EMP-1043]', dim: true },
      { text: '  · DUPONT Marie         [EMP-1044]', dim: true },
      { text: '  · BERNARD Paul         [EMP-1045]', dim: true },
    ],
    [
      { badge: 'AD', text: 'Recherche CN=MARTIN Pierre,OU=Collaborateurs,DC=eslc,DC=local' },
      { badge: 'AD', text: 'Compte trouvé — sAMAccountName: p.martin', dim: true },
    ],
    [
      { badge: 'ALGO', text: 'emploiId: EMP-1043 → mode: STANDARD' },
      { text: '  Règles wildcard chargées: 6 patterns', dim: true },
      { text: '  Correspondances: 2 groupes', dim: true },
      { text: '  GRP_Collaborateur_Base', dim: true },
      { text: '  GRP_Portail_RH', dim: true },
    ],
    [
      { badge: 'LDAP', text: 'Mise à jour memberOf (2 groupes)' },
      { text: '  + GRP_Collaborateur_Base', dim: true },
      { text: '  + GRP_Portail_RH', dim: true },
    ],
    [
      { badge: 'MONGO', text: 'Mise à jour: { adGroups: [...], syncedAt: "2026-05-12T13:30:03Z" }' },
      { text: '  Collaborateurs restants: 2/3', dim: true },
    ],
    [
      { badge: 'OK', text: 'Lot #1 traité — 3/3 succès · durée: 1.8s' },
    ],
  ],
  'emploi-special': [
    [
      { badge: 'INFO', text: 'Worker AD démarré — 2026-05-12T13:30:00Z' },
      { badge: 'LDAP', text: 'Connexion: ldap://dc01.eslc.local:389', dim: true },
      { badge: 'MONGO', text: 'Connexion: mongodb://srv-mongo:27017/formrh', dim: true },
    ],
    [
      { badge: 'BATCH', text: 'Récupération lot #1 — 3 travailleurs' },
      { text: '  · LECLERC Sophie       [EMP-9901]  ⚠ emploi spécial', dim: true },
      { text: '  · MOREAU Antoine       [EMP-9902]  ⚠ emploi spécial', dim: true },
      { text: '  · RENARD Camille       [EMP-1099]', dim: true },
    ],
    [
      { badge: 'AD', text: 'Recherche CN=LECLERC Sophie,OU=Formateurs,DC=eslc,DC=local' },
      { badge: 'AD', text: 'Compte trouvé — sAMAccountName: s.leclerc', dim: true },
    ],
    [
      { badge: 'ALGO', text: 'emploiId: EMP-9901 → mode: EMPLOI_SPÉCIAL' },
      { text: '  Mapping direct chargé depuis MongoDB', dim: true },
      { text: '  GRP_Formateur_Intern', dim: true },
      { text: '  GRP_Admin_SI', dim: true },
      { badge: 'WARN', text: 'Sur-permissions détectées: GRP_Admin_SI (accès étendu)' },
    ],
    [
      { badge: 'LDAP', text: 'Mise à jour memberOf (2 groupes)' },
      { text: '  + GRP_Formateur_Intern', dim: true },
      { text: '  + GRP_Admin_SI', dim: true },
    ],
    [
      { badge: 'MONGO', text: 'Mise à jour: { adGroups: [...], flags: ["over-permission"], syncedAt: ... }' },
      { text: '  Alerte consignée dans le journal d\'audit', dim: true },
    ],
    [
      { badge: 'WARN', text: 'Lot #1 traité — 3/3 sync · 2 alertes sur-permission · durée: 2.1s' },
    ],
  ],
  wildcards: [
    [
      { badge: 'INFO', text: 'Worker AD démarré — 2026-05-12T13:30:00Z' },
      { badge: 'LDAP', text: 'Connexion: ldap://dc01.eslc.local:389', dim: true },
      { badge: 'MONGO', text: 'Connexion: mongodb://srv-mongo:27017/formrh', dim: true },
    ],
    [
      { badge: 'BATCH', text: 'Récupération lot #1 — 3 travailleurs' },
      { text: '  · GARCIA Luis          [EMP-5512]  *Responsable*', dim: true },
      { text: '  · PETIT Claire         [EMP-5513]  *Chef*', dim: true },
      { text: '  · THOMAS Hugo          [EMP-5514]  *Directeur*', dim: true },
    ],
    [
      { badge: 'AD', text: 'Recherche CN=GARCIA Luis,OU=Encadrement,DC=eslc,DC=local' },
      { badge: 'AD', text: 'Compte trouvé — sAMAccountName: l.garcia', dim: true },
    ],
    [
      { badge: 'ALGO', text: 'emploiId: EMP-5512 → mode: WILDCARD' },
      { text: '  Pattern: *Responsable* — matching en cours...', dim: true },
      { text: '  → GRP_Responsable_RH         ✓', dim: true },
      { text: '  → GRP_Responsable_Formation   ✓', dim: true },
      { text: '  → GRP_Responsable_Paie        ✓', dim: true },
      { text: '  → GRP_Responsable_Archive     ✓ (doublon)', dim: true },
      { text: '  Déduplification: 4 → 3 groupes finaux', dim: true },
    ],
    [
      { badge: 'LDAP', text: 'Mise à jour memberOf (3 groupes après dédup)' },
      { text: '  + GRP_Responsable_RH', dim: true },
      { text: '  + GRP_Responsable_Formation', dim: true },
      { text: '  + GRP_Responsable_Paie', dim: true },
    ],
    [
      { badge: 'MONGO', text: 'Mise à jour: { adGroups: [...], wildcardMatches: 4, dedupRemoved: 1, syncedAt: ... }' },
    ],
    [
      { badge: 'OK', text: 'Lot #1 traité — 3/3 succès · 9 groupes attribués (wildcards) · durée: 2.4s' },
    ],
  ],
};

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export default function ADWorkerSimulator() {
  const t = useTranslations('ProjectFormRH.simulator');
  const [preset, setPreset]   = useState<Preset>('standard');
  const [running, setRunning] = useState(false);
  const [done, setDone]       = useState(false);
  const [lines, setLines]     = useState<TerminalLine[]>([]);
  const terminalRef           = useRef<HTMLDivElement>(null);
  const abortRef              = useRef(false);

  const scrollBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    });
  }, []);

  const appendLine = useCallback((line: TerminalLine) => {
    setLines((prev) => [...prev, line]);
    scrollBottom();
  }, [scrollBottom]);

  const run = useCallback(async () => {
    if (running) return;
    abortRef.current = false;
    setRunning(true);
    setDone(false);
    setLines([]);

    const steps = SIMULATION_STEPS[preset];

    for (const step of steps) {
      if (abortRef.current) break;
      await sleep(STEP_DELAY_MS);
      for (const line of step) {
        if (abortRef.current) break;
        await sleep(line.badge ? BADGE_DELAY_MS : SUBLINE_DELAY_MS);
        appendLine(line);
      }
    }

    setRunning(false);
    setDone(true);
  }, [preset, running, appendLine]);

  const reset = useCallback(() => {
    abortRef.current = true;
    setRunning(false);
    setDone(false);
    setLines([]);
  }, []);

  const presets: Array<{ id: Preset; label: string }> = [
    { id: 'standard',       label: t('presetStandard') },
    { id: 'emploi-special', label: t('presetEmploiSpecial') },
    { id: 'wildcards',      label: t('presetWildcards') },
  ];

  return (
    <div className="rounded-2xl border border-neutral-800 overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-neutral-800 bg-neutral-900 px-5 py-4">
        {/* Preset pills */}
        <div className="flex flex-wrap gap-2">
          {presets.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { if (!running) { setPreset(id); reset(); } }}
              disabled={running}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-900 ${
                preset === id
                  ? 'bg-violet-600 text-white shadow'
                  : 'border border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-neutral-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {running && (
            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
              {t('runningLabel')}
            </span>
          )}
          {done ? (
            <button
              onClick={reset}
              className="rounded-lg border border-neutral-700 px-4 py-1.5 text-xs font-semibold text-neutral-300 transition hover:border-neutral-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-900"
            >
              {t('resetButton')}
            </button>
          ) : (
            <button
              onClick={run}
              disabled={running}
              className="rounded-lg bg-violet-600 px-4 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-900"
            >
              {t('runButton')}
            </button>
          )}
        </div>
      </div>

      {/* Terminal */}
      <div
        ref={terminalRef}
        role="log"
        aria-label="Terminal de simulation Active Directory"
        aria-live="polite"
        className="h-80 overflow-y-auto p-5 font-mono text-xs leading-relaxed"
        style={{ background: '#0F1614', color: '#C7E5D0' }}
      >
        {lines.length === 0 && !running && (
          <p style={{ color: '#4a5e52' }}>
            {`> Sélectionnez un preset et cliquez sur "${t('runButton')}" pour lancer la simulation`}
          </p>
        )}
        <AnimatePresence initial={false}>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`flex items-start gap-2 ${line.dim ? 'opacity-60' : ''}`}
            >
              {line.badge && (
                <span className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${BADGE_STYLES[line.badge]}`}>
                  {line.badge}
                </span>
              )}
              <span className={`${!line.badge ? 'pl-[44px]' : ''}`} style={{ color: line.dim ? '#4a5e52' : '#C7E5D0' }}>
                {line.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
