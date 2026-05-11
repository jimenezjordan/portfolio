# Contexte projet — Portfolio Jordan Jimenez

Je travaille sur mon portfolio personnel. Le Sprint 1 (fondations) et le Sprint 2 (page d'accueil) ont été conçus et codés avec l'aide de Claude (chat). Je te demande de poursuivre le développement à partir du Sprint 3.

## 👤 Profil

- **Nom** : Jordan Jimenez
- **Poste actuel** : Fullstack & DevOps Developer en alternance chez Groupe ESLC depuis sept. 2022
- **Activité parallèle** : Freelance web (sites particuliers) depuis août 2022
- **Stages avant** : Technicien informatique chez OXXODATA (2022) et FMI Groupe (2021)
- **GitHub** : https://github.com/jimenezjordan
- **LinkedIn** : https://www.linkedin.com/in/jordan-jimenez-a8423a224/
- **Objectif** : Portfolio puissant et différenciant pour décrocher un nouveau poste

## 🎯 Objectif du portfolio

Mettre en scène mes projets d'alternance de manière **interactive** pour que les recruteurs et responsables techniques voient mes qualités. Pas un CV en ligne — une vraie démonstration de mes compétences full-stack.

## 🛠️ Stack technique (déjà installée)

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion (animations + scroll)
- Lucide React (icônes)
- next-intl (i18n FR/EN)
- Déploiement : Vercel + GitHub
- MDX prévu pour les pages projets détaillées
- Resend prévu pour le formulaire de contact

## 🎨 Direction artistique

- **Style** : moderne, sobre-pro, beaucoup d'espace blanc, animations subtiles
- **Couleurs** : palette neutre (neutral-50 à neutral-900) + accent emerald pour "disponible" + neutral-900 pour CTA primaire
- **Typo** : Inter (déjà setup)
- **Animations** : reveal au scroll via `RevealOnScroll`, hover micro-interactions
- **Mode sombre** : prévu pour Sprint 6 (pas maintenant)

## 📁 Arborescence existante

```
portfolio/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx            ✅ Existe (Navbar + Footer + NextIntlClientProvider)
│   │   └── page.tsx              ✅ Existe (Hero + About + ProjectsGrid + StackSection)
│   ├── layout.tsx                ✅ Minimal (return children)
│   └── globals.css               ✅ Default Tailwind
├── components/
│   ├── ui/
│   │   └── RevealOnScroll.tsx    ✅ Wrapper Framer Motion (useInView)
│   ├── layout/
│   │   ├── Navbar.tsx            ✅ Navbar sticky + switch langue
│   │   ├── Footer.tsx            ✅ Liens GitHub/LinkedIn/Mail
│   │   └── LangSwitcher.tsx      ✅ Bouton FR/EN
│   ├── home/
│   │   ├── Hero.tsx              ✅ Animé en cascade
│   │   ├── About.tsx             ✅ Layout 12 colonnes
│   │   ├── ProjectsGrid.tsx      ✅ Grille 2 cards
│   │   └── StackSection.tsx      ✅ 4 catégories
│   └── projects/
│       └── ProjectCard.tsx       ✅ Card avec hover -4px
├── content/projects/             ⏳ À créer (MDX)
├── messages/
│   ├── fr.json                   ✅ Existe
│   └── en.json                   ✅ Existe
├── i18n/
│   ├── routing.ts                ✅ locales: ['fr', 'en']
│   └── request.ts                ✅
├── lib/
│   └── projects.ts               ✅ Métadonnées des 2 projets
├── public/
│   ├── projects/                 ⏳ Vide pour l'instant (screenshots à venir)
│   └── cv-jordan-jimenez.pdf     ⏳ À venir
├── middleware.ts                 ✅
└── next.config.ts                ✅ withNextIntl
```

## 🔁 Convention i18n importante

- URL FR : `/projets/formrh` (sans préfixe, locale par défaut)
- URL EN : `/en/projets/formrh`
- Toujours utiliser `import { Link } from '@/i18n/routing'` (pas le Link de next/link)
- `localePrefix: 'as-needed'`

## 📦 Mes deux projets phares (à mettre en avant)

### 1. Degrés Jours — `degres-jours.eslc.fr`

**Pitch** : Chaîne de collecte météo quotidienne pour 22 sites ESLC.

**Stack** : Next.js (port 3002) + Node.js/Express (port 5002) + MongoDB + Docker Compose, et un script C# en amont (SCR-01, tâche planifiée Windows).

**Architecture** :
```
Script C# (SCR-01, 13h30) 
  → fichiers .data (SRV21 + SRV22)  → ICopitole (consomme à 13h45)
  → MongoDB                          → Next.js + Express → site web public
```

**Le truc à mettre en scène** : la **fenêtre critique de 10 minutes** (13h35 → 13h45). 
- 13h30 : trigger automatique
- 13h35 : envoi mail de compte rendu (succès/erreur)
- 13h35→13h45 : fenêtre d'intervention manuelle si erreur
- 13h45 : ICopitole consomme les fichiers .data → point de non-retour
- 14h00 : si correction après 13h45, faut aussi relancer les tâches ICopitole en aval

**Idée d'interactivité forte (déjà validée)** : `<CriticalTimeline />` interactif. 
Frise horizontale 13h30→14h00 avec 5 pastilles cliquables. 
Toggle entre 2 scénarios : "nominal" (tout OK) et "erreur + relance manuelle".
Chaque pastille révèle un panel détaillé : ce qui se passe, quelle action, quel risque.

**Stats à afficher** : 22 sites couverts, 10 min de fenêtre critique, exécution daily, rôle Solo.

**Décision technique notable** : pourquoi 2 écritures parallèles (fichiers .data + MongoDB) plutôt qu'une queue ? Parce qu'ICopitole consomme un format fichier legacy non négociable, et MongoDB sert le portail temps réel. Coupler les 2 via une queue aurait ajouté un point de défaillance pour zéro bénéfice.

### 2. FormRH — Admin dynamique des configurations

**Pitch** : Migration de toutes les configs applicatives (sociétés, services, groupes AD, mappings...) depuis des fichiers TypeScript/JSON statiques vers MongoDB, avec une interface admin à 8 onglets. Résultat : l'équipe SI est devenue autonome, fini les redéploiements à chaque modification.

**Stack** : 
- Backend Express (port 5001) avec Mongoose, 8 modèles via pattern `safeModel()`
- Frontend Next.js (port 3001) avec Server Actions, 8 composants éditeurs dont 3 éditeurs JSON
- MongoDB ESLC-FormRH-PreProd
- Auth Azure AD (NextAuth) + middleware backend `checkGroupMembership([ADMIN_GROUP_ID])`

**Les 8 onglets admin** :
1. Création AD (existant)
2. Structure organisationnelle (sociétés / villes / services)
3. Applications & Matériel
4. Groupes AD (122 groupes importés)
5. Chemins LDAP (24 chemins OU)
6. Affectations Emplois (JSON)
7. Affectations Services (JSON)
8. Configuration N2F (JSON)

**Le truc à mettre en scène** : la **transformation organisationnelle**. 
Avant : chaque modif config = ticket dev + redéploiement (cycle de plusieurs jours).
Après : l'équipe SI modifie en live, déploiement instantané.

**Idée d'interactivité forte (déjà validée)** : `<ConfigFlowDemo />`. 
Animation "before/after" qui montre le flow de modification d'une config :
- Mode "before" : Ticket → Dev → PR → Review → Merge → Build → Deploy → Live (8 étapes, plusieurs jours)
- Mode "after" : Admin SI → Edit → Save → Live (4 étapes, 30 secondes)
Toggle entre les 2 modes avec animation de transition.

**Décision technique notable** : compatibilité descendante du worker AD. La fonction `loadMappings()` dans `ad.create.service.js` a été modifiée pour reshape les résultats MongoDB dans la même structure qu'attendait l'ancien code. Aucune modif sur `ad.logic.service.js` ni `ad.group.service.js`. Migration zéro-downtime.

**Subtilité d'archi** : variable `API_INTERNAL_URL=http://localhost:5001` (vs `NEXT_PUBLIC_API_URL`) pour court-circuiter Nginx sur les appels serveur-à-serveur (Server Actions + Route Handlers). À expliquer dans le case study.

## 📚 Roadmap complète (sprints)

- [x] **Sprint 1** — Fondations (Next.js + i18n + layout + Vercel)
- [x] **Sprint 2** — Page d'accueil (Hero + About + Grille + Stack)
- [ ] **Sprint 3** — Page projet Degrés Jours ⬅️ **À DÉMARRER**
- [ ] **Sprint 4** — Page projet FormRH
- [ ] **Sprint 5** — Pages annexes (parcours, contact avec Resend, liste projets)
- [ ] **Sprint 6** — Polish (SEO, OG images, mode sombre, perfs, accessibilité)

## 🎬 Mission immédiate — Sprint 3

Construire la **page projet "Degrés Jours"** à l'URL `/projets/degres-jours` (FR) et `/en/projets/degres-jours` (EN).

### Structure attendue de la page

1. **Breadcrumb** : Accueil > Projets > Degrés Jours
2. **Hero projet** :
   - Tags techno (Next.js, Node.js, MongoDB, Docker, C#)
   - Titre
   - Pitch en 1-2 phrases
   - 4 stat cards : 22 sites, 10 min fenêtre, Daily, Solo
3. **Section "Le contexte"** : 1-2 paragraphes sur le problème métier
4. **Section "Architecture"** : schéma simple SVG ou ASCII art (4 maillons : SCR-01 → SRV21/22 → MongoDB → site web)
5. **Démo interactive `<CriticalTimeline />`** : la frise des 10 minutes critiques
6. **Section "Décision technique"** : encart avec le choix double écriture parallèle vs queue
7. **Section "Stations couvertes"** : grille/liste des 22 sites avec station MétéoFrance associée (les 22 sont dans le doc)
8. **CTA fin** : "Voir le site live" (degres-jours.eslc.fr) + "Tous les projets"

### Composants réutilisables à créer

- `<ProjectHero>` — réutilisé pour FormRH au Sprint 4
- `<StatCard>` — placeholder/badge si number+label
- `<DecisionCallout>` — encart "Décision technique" avec border-left accent
- `<CriticalTimeline>` — spécifique Degrés Jours, fortement interactif
- `<ArchitectureDiagram>` — paramétrable, réutilisable

### Spécifications du composant `<CriticalTimeline />`

- 5 pastilles horizontales : 13h30, 13h35, 13h40, 13h45, 14h00
- Toggle 2 scénarios : "nominal" / "erreur + relance"
- Chaque pastille cliquable révèle un panel en dessous avec :
  - Heure exacte
  - Statut (AUTO, EN COURS, FENÊTRE, AUTO)
  - Action qui se passe
  - Détails techniques
- 13h45 marqué visuellement comme "Point de non-retour" (icône + couleur info)
- Animation Framer Motion sur les transitions de panel
- Responsive (sur mobile, les pastilles peuvent s'empiler ou défiler horizontalement)

### Contraintes UX

- Tout doit être traduit FR/EN (ajouter les clés dans `messages/fr.json` et `messages/en.json` sous `ProjectDegresJours`)
- Utiliser `<RevealOnScroll>` pour les sections
- Respecter le design system du Sprint 2 (couleurs neutral + emerald, typo Inter, espacements 20-28 py sur sections)
- Aucun screenshot disponible pour l'instant — utiliser des placeholders avec un style cohérent (gradient ou pattern subtil)

## 🚦 Méthodo de travail attendue

1. **Lire d'abord** les fichiers existants pour comprendre les conventions (Hero.tsx, ProjectsGrid.tsx, RevealOnScroll.tsx)
2. **Proposer un plan** avant de coder une seule ligne (composants à créer, ordre, dépendances)
3. **Coder par petites étapes commitables** : un composant = un commit
4. **Tester localement** avant chaque commit (`npm run dev` doit toujours passer)
5. **Convention de commits** : `feat(projects): ...`, `feat(degres-jours): ...`
6. **Ne pas toucher** au Sprint 1/2 sauf si bug évident — me demander avant tout refacto

## ⚠️ Pièges connus

- Toujours `import { Link } from '@/i18n/routing'` (pas next/link)
- Les composants Server doivent utiliser `useTranslations` SANS `'use client'`
- Les composants avec hooks (`useState`, `useInView`, `motion`...) doivent avoir `'use client'` en haut
- Framer Motion fonctionne uniquement en composant client
- Pas de `position: fixed` sans réflexion (Navbar a `sticky`)
- Toutes les images doivent être servies depuis `/public/` ou utiliser `<Image>` de Next

## 💬 Communication

- Je préfère que tu **expliques tes décisions** avant de coder (1-2 phrases)
- Quand tu lis un fichier, ne le réécris pas en entier si une modif ciblée suffit
- Si tu as besoin d'une info que je n'ai pas fournie (ex: un texte, une stat manquante), **demande-moi** plutôt que d'inventer
- Quand un sprint est terminé : checklist + commit + on passe au suivant

**On démarre par le Sprint 3 — commence par lire les fichiers existants et me proposer un plan.**