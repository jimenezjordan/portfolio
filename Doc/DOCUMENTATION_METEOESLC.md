# Documentation Complète — MeteoESLC

> **À qui s'adresse ce document ?**
> - **Partie 1 — Pour les non-développeurs** : à quoi sert l'application, comment l'utiliser, comment alimenter les données
> - **Partie 2 — Pour les développeurs** : architecture technique, code, API, base de données, Docker

---

# PARTIE 1 — GUIDE UTILISATEUR (Non-développeurs)

## Qu'est-ce que MeteoESLC ?

MeteoESLC est une application web interne à ESLC qui affiche les **données météorologiques des stations Météo France** situées à proximité des sites de l'entreprise.

**Son utilité principale : le calcul des DJU** (Degrés-Jours Unifiés), un indicateur utilisé pour **estimer la consommation de fioul** des bâtiments selon les températures extérieures. Plus il fait froid, plus les DJU sont élevés, plus les bâtiments consomment.

**En résumé, l'application permet de :**
- Voir en temps réel les températures de chaque station météo (minimale et maximale du jour)
- Détecter les risques de gel sur les sites
- Consulter l'évolution des températures sur la semaine
- Calculer les DJU mensuels répartis en 3 décades (D1, D2, D3) pour le suivi des contrats de fioul
- Exporter ces données en fichier CSV (Excel)

---

## Pourquoi cette application a été créée — L'avant / L'après

### Avant MeteoESLC — Le processus manuel

Avant la mise en place de cette application, le calcul des DJU et le suivi des températures étaient réalisés **entièrement à la main**, via des fichiers Excel. Ce processus récurrent générait de nombreuses contraintes :

**Les problèmes rencontrés :**

| Problème | Impact |
|---|---|
| **Saisie manuelle** des données météo dans Excel | Long, fastidieux, répété chaque mois |
| **Envoi par email** du fichier à chaque interlocuteur | Risque d'oubli, mauvais destinataire, boîte mail encombrée |
| **Multiples versions** du même fichier en circulation | Impossible de savoir quelle version est la bonne (v1, v2, v2_final, v2_final_corrigé…) |
| **Erreurs de saisie** (mauvaise valeur, mauvaise station, mauvaise date) | Calculs de DJU faux, décisions basées sur de mauvaises données |
| **Aucune centralisation** | Chaque personne avait sa propre copie, désynchronisée des autres |
| **Pas de traçabilité** | Impossible de savoir qui avait modifié quoi et quand |
| **Délai de mise à jour** | Les données n'étaient disponibles qu'après que quelqu'un les ait saisies et envoyées |

**Ce que cela représentait concrètement :**
- Du temps perdu chaque mois à copier-coller des données depuis les fichiers Météo France vers Excel
- Des échanges d'emails répétitifs pour distribuer les fichiers mis à jour
- Des corrections à renvoyer quand une erreur était détectée après diffusion
- Une dépendance à une seule personne connaissant le fichier et le processus

---

### Après MeteoESLC — Ce qui a changé

L'application résout **tous ces problèmes en une seule solution centralisée** :

| Avant | Après |
|---|---|
| Saisie manuelle dans Excel | Ingestion automatique dès qu'un fichier `.data` est déposé |
| Envoi par email | Accès direct via navigateur web, disponible pour tous |
| Multiples versions en circulation | **Une seule source de vérité** — la base de données |
| Erreurs de saisie humaines | Parsing automatique et contrôlé, les erreurs de format sont ignorées |
| Délai de mise à jour | Données disponibles **en moins de 10 secondes** après dépôt du fichier |
| Calculs DJU à la main | Calculés **automatiquement** par l'application à chaque consultation |
| Fichiers éparpillés | Historique complet accessible depuis n'importe quel poste |
| Export manuel | Export CSV en un clic, prêt pour Excel |

> En résumé : ce qui prenait plusieurs heures par mois (collecte, saisie, vérification, envoi, corrections) se fait désormais **en quelques secondes, automatiquement, sans intervention humaine**.

---

## Qu'est-ce qu'un DJU ?

Un **Degré-Jour Unifié (DJU)** mesure l'écart entre la température d'un jour donné et une température de référence de **18°C** (seuil à partir duquel un bâtiment a besoin de chauffage).

**Formule :**
```
Température moyenne du jour = (TN + TX) / 2
DJU du jour = 18 - Température moyenne   (si résultat > 0, sinon 0)
```

**Exemple :**
- TN (nuit) = 4°C, TX (jour) = 12°C
- Moyenne = (4 + 12) / 2 = 8°C
- DJU = 18 - 8 = **10 DJU** → journée froide, forte consommation fioul

Si la moyenne est supérieure à 18°C (journée chaude) → **0 DJU**, aucun besoin de chauffage.

---

## Les 20 stations météo surveillées

L'application surveille 20 stations Météo France couvrant les différents sites ESLC :

| Code station | Nom | Localisation |
|---|---|---|
| 01072001 | BOURG / ASOTRANS | Bourg-en-Bresse |
| 06029001 | MANDELIEU | Mandelieu-la-Napoule |
| 06033002 | CARROS | Carros |
| 06083005 | MENTON | Menton |
| 06088007 | ST-ANDREE | Saint-André |
| 06091003 | MONACO | Monaco |
| 06163001 | TENDE | Tende |
| 13055029 | MARSEILLE MENET | Marseille |
| 38053003 | BOURGOIN | Bourgoin-Jallieu |
| 38162001 | DOLOMIEU / ST-SORLIN | Dolomieu |
| 42218011 | ST-ETIENNE | Saint-Étienne |
| 69029001 | VENISSIEUX | Vénissieux |
| 69114001 | THEIZE | Theizé |
| 69123002 | PASTOR ST-ROMAIN | Tassin |
| 73187006 | AIGUESBLANCHE | Aiguebelle |
| 74119002 | THONON | Thonon-les-Bains |
| 74137001 | CRUSEILLES | Cruseilles |
| 83061001 | PUGET | Puget-sur-Argens |
| 83083001 | BRIGNOLES | Brignoles |
| 83145001 | BARJOLS | Barjols |

---

## Les 4 pages de l'application

### Page 1 — Tableau de Bord (`/`)

C'est la page d'accueil. Elle affiche un **résumé du dernier jour importé** pour toutes les stations.

**Indicateurs affichés en haut :**
- **Stations actives** : combien de stations ont fourni des données ce jour
- **Température Minimale Moyenne (TN)** : moyenne de tous les TN + station la plus froide
- **Température Maximale Moyenne (TX)** : moyenne de tous les TX + station la plus chaude
- **Température Moyenne Journalière** : (TN moyen + TX moyen) / 2
- **DJU Cumulés** : somme de tous les DJU de toutes les stations pour ce jour
- **Alerte gel** : si au moins une station a un TN < 0°C, elle est signalée ❄️

**Graphique** : barres comparant TN et TX de chaque station.

**Tableau récapitulatif** : toutes les stations triées de la plus froide à la plus chaude, avec TN, TX, Moyenne, DJU et état gel.

---

### Page 2 — Bilan Journalier (`/daily`)

Permet de consulter les températures de **n'importe quel jour passé**, avec un filtre optionnel par station.

**Fonctionnalités :**
- Sélectionner une date via un calendrier (limité à J-1 au maximum)
- Naviguer jour par jour avec les boutons "◀ Jour précédent" / "Jour suivant ▶"
- Filtrer par station ou voir toutes les stations
- Visualiser un graphique en barres TN/TX
- **Télécharger les données en CSV** (compatible Excel, séparateur `;`, encodage UTF-8 avec BOM)

Le fichier CSV exporté contient : Station, TN, TX, Moyenne, DJU.
Nom du fichier exemple : `MeteoESLC_2026-01-15.csv`

---

### Page 3 — Évolution Hebdomadaire (`/weekly`)

Affiche l'évolution des températures **jour par jour sur une semaine** pour une station choisie.

**Fonctionnalités :**
- Sélectionner une station, une année et une semaine ISO
- Seules les semaines ayant des données sont proposées dans la liste déroulante
- Graphique en courbes : TN moyenne (bleu), Moyenne (vert), TX moyenne (rouge)
- La date de début et de fin de semaine est affichée (ex: "Semaine 3  (20/01 → 26/01)")

---

### Page 4 — Bilan Mensuel DJU (`/monthly`)

C'est la page **la plus utilisée pour le suivi énergétique**. Elle calcule les DJU sur un mois entier, répartis en 3 décades selon la convention fioul :

| Décade | Période |
|--------|---------|
| **D1** | Du 1er au 10 du mois |
| **D2** | Du 11 au 20 du mois |
| **D3** | Du 21 à la fin du mois |
| **Total** | Somme D1 + D2 + D3 |

**Fonctionnalités :**
- Sélectionner une station, un mois et une année
- Tableau de synthèse D1 / D2 / D3 / Total
- **Télécharger le rapport en CSV**
- Nom du fichier exemple : `DJU_01072001_2026-01.csv`

> Ce rapport correspond aux relevés transmis aux fournisseurs de fioul pour la facturation.

---

## Comment fonctionnent les données ? (sans technique)

Les données météo proviennent de **Météo France** via des fichiers texte au format `.data`. Ces fichiers contiennent pour chaque jour : le code de la station, la date, la température minimale (TN) et la température maximale (TX).

Le système surveille automatiquement un **dossier sur le serveur**. Dès qu'un nouveau fichier `.data` est déposé dans ce dossier, l'application le lit, l'analyse et met à jour la base de données **automatiquement en moins de 10 secondes**. Si un fichier est déposé une deuxième fois (mise à jour), les données existantes sont remplacées sans créer de doublons.

**Résumé :**
```
Météo France → fichier .data déposé dans le dossier → détection automatique → base de données mise à jour → graphiques actualisés
```

---

## Mode clair / Mode sombre

L'application propose deux thèmes visuels. Le bouton ☀️ / 🌙 en haut à droite de la navigation permet de basculer entre le **mode sombre** (par défaut) et le **mode clair**. Le choix est mémorisé dans le navigateur.

---

## Accès à l'application

L'application est **accessible sans connexion** (pas d'authentification requise). Elle est accessible depuis le réseau interne ESLC.

---

# PARTIE 2 — DOCUMENTATION TECHNIQUE (Développeurs)

## Architecture globale

```
┌──────────────────────────────────────────────────────────────┐
│                     RÉSEAU INTERNE ESLC                       │
└────────────┬─────────────────────────────────────────────────┘
             │
  ┌──────────▼──────────┐
  │  FRONTEND (Next.js) │  port 3002
  │  next.config.ts     │  TypeScript + React 19 + Recharts
  │  proxy /api → back  │  Tailwind via CSS custom vars
  └──────────┬──────────┘
             │  HTTP (proxy Next.js rewrites)
  ┌──────────▼──────────┐
  │  BACKEND (Express)  │  port 5002
  │  Node.js + Mongoose │  Pino logger
  │  + Chokidar watcher │
  └────┬────────────────┘
       │
  ┌────▼──────────────────┐   ┌──────────────────────────┐
  │  MongoDB Atlas        │   │  Dossier watch (serveur)  │
  │  (cloud)              │   │  *.data → ingestion auto  │
  │  Collection:          │   │  polling toutes 5s        │
  │  measurements         │   └──────────────────────────┘
  │  stations             │
  └───────────────────────┘
```

**Stack technique :**
- **Frontend** : Next.js 16, React 19, TypeScript 5, Recharts 3, Axios, date-fns
- **Backend** : Node.js, Express 5, Mongoose 9, Chokidar 5, Pino (logger), date-fns
- **Base de données** : MongoDB Atlas (cloud, cluster `DataMeteo`)
- **Conteneurisation** : Docker + Docker Compose (2 services : `front` port 3002, `back` port 5002)
- **Pas d'authentification**

---

## Structure des fichiers

### Backend (`/var/www/meteo_france/backend/`)

```
src/
├── index.js                  # Point d'entrée : Express, connexion DB, watcher, scan initial
├── config/
│   ├── db.js                 # Connexion Mongoose à MongoDB Atlas
│   └── logger.js             # Logger Pino (pino-pretty en dev, JSON en prod)
├── models/
│   ├── Measurement.js        # Schéma : poste, date, tn, tx, sourceFile (index unique poste+date)
│   └── Station.js            # Schéma : poste, name + seedDefaults() (noms par défaut)
├── routes/
│   └── stats.js              # Toutes les routes API : /stations, /stats/*, /ingest
└── services/
    ├── ingestService.js      # Parsing CSV + upsert MongoDB (ingestFile, ingestContent, parseLine)
    └── watcherService.js     # Surveillance dossier via chokidar (add + change → ingestFile)
```

### Frontend (`/var/www/meteo_france/frontend/`)

```
app/
├── layout.tsx                # Layout global : Navbar + StationsProvider (Context React)
├── page.tsx                  # Tableau de bord : dernières données, KPIs, graphique, tableau
├── daily/page.tsx            # Bilan journalier : sélecteur date, graphique bar, export CSV
├── weekly/page.tsx           # Évolution hebdomadaire : sélecteur semaine ISO, graphique line
├── monthly/page.tsx          # Bilan mensuel DJU : calcul D1/D2/D3, export CSV
└── globals.css               # Variables CSS (thème dark/light, palette couleurs)

components/
├── Navbar.tsx                # Barre de navigation + liens + ThemeToggle
├── StationsProvider.tsx      # Context React : chargement des stations, getStationName()
├── StationSelector.tsx       # Composant <select> alimenté par le contexte stations
├── TempChart.tsx             # Graphique Recharts (ComposedChart) : mode bar ou line
└── ThemeToggle.tsx           # Bouton dark/light avec persistence localStorage

lib/
├── api.ts                    # Client Axios : toutes les fonctions d'appel API backend
├── types.ts                  # Interfaces TypeScript : Station, Measurement, *StatResponse
├── metrics.ts                # Fonctions : calculateMoyenne(tn, tx), calculateDJU(moyenne)
├── export.ts                 # Fonction : downloadCsv(filename, rows[][]) avec BOM UTF-8
└── stations.ts               # Map statique POSTE → nom (fallback si DB non disponible)
```

---

## Format des fichiers de données `.data`

Les fichiers déposés dans le dossier surveillé doivent respecter ce format CSV :

```
POSTE;DATE;TN;TX
01072001;20260115;-2,5;6,3
06163001;20260115;-5,1;2,8
69029001;20260115;1,2;8,7
```

**Règles de parsing (`ingestService.js:parseLine`) :**
- Séparateur : `;`
- Exactement **4 colonnes** par ligne
- La ligne d'en-tête `POSTE;DATE;TN;TX` est ignorée automatiquement
- `DATE` : format `YYYYMMDD` (8 caractères) → stocké en `Date` UTC à 12:00
- `TN` / `TX` : décimaux avec virgule ou point acceptés (`-2,5` ou `-2.5`)
- Ligne invalide (NaN, mauvais nb colonnes) → ignorée silencieusement

**Comportement upsert :** si une mesure `(poste, date)` existe déjà en base, elle est **mise à jour** (pas de doublon). L'index unique MongoDB `{ poste: 1, date: 1 }` garantit l'unicité.

---

## Base de données MongoDB

### Collection `measurements`

```javascript
{
  _id: ObjectId,
  poste: String,          // Code station Météo France (ex: "01072001")  — indexé
  date: Date,             // Date de la mesure à 12:00:00 UTC            — indexé
  tn: Number,             // Température minimale journalière (°C)
  tx: Number,             // Température maximale journalière (°C)
  sourceFile: String,     // Nom du fichier source (ex: "data_jan2026.data")
  createdAt: Date,        // Automatique (Mongoose timestamps)
  updatedAt: Date         // Automatique
}
// Index unique composé : { poste: 1, date: 1 }
```

### Collection `stations`

```javascript
{
  _id: ObjectId,
  poste: String,    // Code station unique (ex: "01072001")
  name:  String,    // Nom lisible (ex: "BOURG / ASOTRANS")
}
// Index unique : { poste: 1 }
```

À chaque démarrage du backend, `Station.seedDefaults()` insère les 20 noms par défaut en **upsert avec `$setOnInsert`** (ne jamais écraser un nom personnalisé existant).

---

## API Backend — Routes complètes

Base URL : `http://localhost:5002/api` (ou via proxy frontend `/api`)

### Stations

#### `GET /api/stations`
Retourne la liste des stations ayant des mesures en base, avec leur nom.

**Réponse :**
```json
{
  "stations": [
    { "poste": "01072001", "name": "BOURG / ASOTRANS" },
    { "poste": "06029001", "name": "MANDELIEU" }
  ]
}
```

#### `PUT /api/stations/:poste`
Met à jour (ou crée) le nom d'une station.

**Corps :** `{ "name": "Nouveau nom" }`
**Réponse :** le document station mis à jour.

---

### Statistiques

#### `GET /api/stats/latest`
Retourne le dernier jour importé (date max en base) et toutes les mesures de ce jour.

**Réponse :**
```json
{
  "date": "2026-01-15T12:00:00.000Z",
  "count": 18,
  "data": [ { "poste": "01072001", "date": "...", "tn": -2.5, "tx": 6.3 }, ... ]
}
```

#### `GET /api/stats/daily?date=YYYYMMDD`
Retourne toutes les mesures pour une date donnée.

**Paramètre :** `date` (ex: `20260115`)
**Réponse :** même format que `/latest`

#### `GET /api/stats/weekly?poste=XXX&year=YYYY&week=W`
Retourne les agrégats (min/max/avg) de TN et TX sur une semaine ISO.

**Paramètres :**
- `year` : année (obligatoire)
- `week` : numéro de semaine ISO (obligatoire)
- `poste` : code station (optionnel — si absent, agrège par station)

**Si `poste` fourni** : `_id` = date de chaque jour de la semaine
**Si `poste` absent** : `_id` = code station

**Réponse :**
```json
{
  "week": 3,
  "year": 2026,
  "weekStart": "2026-01-12T...",
  "weekEnd": "2026-01-18T...",
  "poste": "01072001",
  "data": [
    {
      "_id": "2026-01-12T...",
      "tnMin": -3.1, "tnMax": -1.2, "tnAvg": -2.1,
      "txMin": 4.0,  "txMax": 7.5,  "txAvg": 5.8,
      "count": 1
    }
  ]
}
```

#### `GET /api/stats/monthly?poste=XXX&year=YYYY&month=M`
Retourne les agrégats par jour sur un mois complet. Le groupement se fait sur la date (`YYYY-MM-DD`).

**Paramètres :** `year`, `month` (obligatoires), `poste` (optionnel)

**Réponse :**
```json
{
  "year": 2026,
  "month": 1,
  "poste": "01072001",
  "data": [
    {
      "_id": "2026-01-01",
      "tnAvg": -1.5, "txAvg": 5.2,
      "tnMin": -1.5, "txMax": 5.2,
      "stations": ["01072001"]
    }
  ]
}
```

#### `GET /api/stats/range?poste=XXX&from=YYYYMMDD&to=YYYYMMDD`
Retourne les mesures brutes sur une plage de dates (limité à 5000 documents).

**Paramètres :** `from`, `to` (obligatoires, format YYYYMMDD), `poste` (optionnel)

#### `GET /api/stats/available-weeks?year=YYYY`
Retourne les numéros de semaines ISO ayant des données pour l'année ISO donnée.

**Réponse :** `{ "year": 2026, "weeks": [1, 2, 3, 5, 6, ...] }`

---

### Ingestion

#### `POST /api/ingest`
Reçoit le contenu brut d'un fichier `.data` (texte) et l'ingère en base.

**Headers :**
- `Content-Type: text/plain` (ou tout type)
- `x-source-file: nom-du-fichier.data` (optionnel, pour traçabilité)

**Corps :** contenu texte du fichier `.data`

**Réponse :**
```json
{ "inserted": 15, "updated": 3, "errors": 0, "sourceFile": "data_jan2026.data" }
```

---

### Health check

#### `GET /health`
Retourne `{ "status": "ok", "timestamp": "..." }` — sans connexion DB.

---

## Service de surveillance (Watcher)

Le `watcherService.js` utilise **Chokidar** pour surveiller le dossier défini par `WATCH_DIR` (`.env`).

**Comportement clé :**
- `ignoreInitial: false` → les fichiers déjà présents au démarrage sont aussi ingérés
- `usePolling: true` → **indispensable** pour les lecteurs réseau (partages `\\srv-...` ou NFS)
- `interval: 5000` → vérification toutes les 5 secondes
- `awaitWriteFinish.stabilityThreshold: 2000` → attend que le fichier soit stable (écriture terminée) avant d'ingérer

**Événements gérés :**
- `add` → nouveau fichier détecté → `ingestFile()`
- `change` → fichier modifié → ré-ingestion complète (`ingestFile()`)
- `error` → erreur loguée, watcher continue

---

## Calcul des Agrégats MongoDB

Les routes `/stats/weekly` et `/stats/monthly` utilisent le **pipeline d'agrégation MongoDB** pour calculer min/max/avg côté base de données (efficace, pas de transfert de données brutes).

**Pipeline monthly (exemple simplifié) :**
```javascript
[
  { $match: { date: { $gte: start, $lte: end }, poste: "01072001" } },
  {
    $group: {
      _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
      tnMin: { $min: '$tn' },
      tnMax: { $max: '$tn' },
      tnAvg: { $avg: '$tn' },
      txMin: { $min: '$tx' },
      txMax: { $max: '$tx' },
      txAvg: { $avg: '$tx' },
      stations: { $addToSet: '$poste' }
    }
  },
  { $sort: { _id: 1 } }
]
```

**Calcul semaine ISO (weekly) :**
Le lundi de la semaine est calculé manuellement à partir du 4 janvier de l'année (algorithme ISO 8601), puis 7 jours sont ajoutés pour obtenir le dimanche.

---

## Calcul DJU (côté frontend)

```typescript
// lib/metrics.ts
function calculateMoyenne(tn: number, tx: number): number {
  return (tn + tx) / 2;
}

function calculateDJU(moyenne: number, base: number = 18): number {
  return moyenne < base ? (base - moyenne) : 0;
}
```

**Page monthly — calcul des décades :**
```typescript
data.forEach(dayData => {
  const day = parseInt(dayData._id.split('-')[2], 10); // jour du mois
  const dju = calculateDJU(calculateMoyenne(dayData.tnAvg, dayData.txAvg));

  if      (day <= 10) sumD1 += dju;
  else if (day <= 20) sumD2 += dju;
  else                sumD3 += dju;
});
```

---

## Contexte React — StationsProvider

Le composant `StationsProvider` charge la liste des stations **une seule fois** au montage de l'application (dans `layout.tsx`), la stocke dans un `Context`, et expose :
- `stations: Station[]` — tableau complet
- `getStationName(poste): string` — résolution code → nom
- `loading: boolean` — état de chargement

Tous les composants enfants (`TempChart`, `StationSelector`, pages) utilisent `useStations()` sans re-fetch. Mis à jour uniquement au rechargement de la page.

---

## Export CSV

La fonction `downloadCsv` (`lib/export.ts`) génère un fichier CSV :
- Séparateur **`;`** (compatible Excel France)
- **BOM UTF-8** (`﻿`) pour que les accents s'affichent correctement à l'ouverture dans Excel
- Chaque cellule est **encadrée de guillemets** (protection contre les virgules dans les noms)
- Téléchargement déclenché côté client via `URL.createObjectURL` (pas de round-trip serveur)

---

## Thème Dark/Light

Le thème est géré entièrement en CSS via l'attribut `data-theme` sur `<html>` :

```css
/* globals.css */
:root[data-theme="dark"]  { --bg: #0f1117; --text-main: #e2e8f0; ... }
:root[data-theme="light"] { --bg: #f8fafc; --text-main: #1e293b; ... }
```

Le composant `ThemeToggle` lit/écrit `localStorage.getItem('meteo-theme')` et applique l'attribut sur `document.documentElement`. Le thème par défaut est **dark**.

---

## Variables d'environnement

### Backend (`backend/.env`)
```bash
MONGO_URI=mongodb+srv://user:pass@datameteo.ve0c6tn.mongodb.net/?appName=DataMeteo
PORT=5002              # Port d'écoute Express (défaut: 4000)
WATCH_DIR=./data/watch # Dossier surveillé pour les fichiers .data
LOG_LEVEL=info         # Niveau de log Pino (debug|info|warn|error)
NODE_ENV=production
```

### Frontend — variables Docker Compose
```bash
NEXT_PUBLIC_API_URL=/api          # URL API côté client (proxy Next.js)
INTERNAL_API_URL=http://back:5002/api  # URL API côté serveur Next.js (réseau Docker interne)
```

> Le frontend Next.js fait office de **proxy** : les requêtes `/api/*` du navigateur sont redirigées vers `INTERNAL_API_URL` via la configuration `next.config.ts` (rewrites).

---

## Docker — Déploiement

### Structure Docker Compose

```yaml
services:
  back:
    build: ./backend
    ports: ["5002:5002"]
    # Monte le dossier data/watch pour les fichiers .data
    restart: always

  front:
    build: ./frontend      # Build multi-étape : builder → standalone Next.js
    ports: ["3002:3002"]
    depends_on: [back]
    restart: always
```

### Build multi-étape du frontend

Le `Dockerfile` frontend utilise un **build en deux étapes** pour minimiser l'image finale :
1. **Stage builder** : `npm ci` + `npm run build` → génère `.next/standalone`
2. **Stage final** : copie uniquement le bundle standalone + static + public → image légère

### Commandes utiles

```bash
# Construire et lancer les deux services :
cd /var/www/meteo_france
docker compose up -d --build

# Reconstruire uniquement le frontend (après changement de code) :
docker compose build front && docker compose up -d front

# Voir les logs en temps réel :
docker compose logs -f back
docker compose logs -f front

# Injecter manuellement un fichier .data (sans déposer sur le serveur) :
curl -X POST http://localhost:5002/api/ingest \
  -H "Content-Type: text/plain" \
  -H "x-source-file: test.data" \
  --data-binary @mon_fichier.data

# Vérifier l'état du backend :
curl http://localhost:5002/health
```

---

## Flux de données complet — Schéma récapitulatif

```
Météo France publie les données journalières
        │
        ▼
Fichier .data déposé dans WATCH_DIR
        │
        ▼
chokidar détecte le fichier (polling 5s)
        │
        ▼
ingestService.parseLine() → { poste, date, tn, tx }
        │
        ▼
Measurement.findOneAndUpdate(upsert) → MongoDB Atlas
        │
        └─→ Logger Pino : "Fichier traité : X inserts, Y updates"
                │
                ▼
Utilisateur ouvre l'application
        │
        ▼
StationsProvider → GET /api/stations (1 fois au chargement)
        │
        ▼
Page tableau de bord → GET /api/stats/latest
  → KPIs calculés côté frontend (tnAvg, txAvg, DJU total)
        │
Page bilan journalier → GET /api/stats/daily?date=YYYYMMDD
  → Export CSV généré localement (downloadCsv)
        │
Page hebdomadaire → GET /api/stats/available-weeks
                  → GET /api/stats/weekly?year&week&poste
        │
Page mensuelle DJU → GET /api/stats/monthly?year&month&poste
  → Décades D1/D2/D3 calculées côté frontend
  → Export CSV généré localement
```

---

## Ajouter une nouvelle station

**Étape 1 — S'assurer que les fichiers `.data` contiennent le nouveau code de poste.**
Le système la détecte automatiquement à l'ingestion.

**Étape 2 — Lui donner un nom lisible** (deux options) :

*Option A — Via l'API (permanente, stockée en MongoDB) :*
```bash
curl -X PUT http://localhost:5002/api/stations/NOUVEAU_CODE \
  -H "Content-Type: application/json" \
  -d '{"name": "NOM DE LA STATION"}'
```

*Option B — Dans le code source (nécessite un redéploiement) :*
- Ajouter dans `backend/src/models/Station.js` → `STATION_NAMES_DEFAULT`
- Ajouter dans `frontend/lib/stations.ts` → `STATION_NAMES` (fallback statique)

---

## Points d'attention / Limitations

1. **Polling réseau** : `usePolling: true` est activé dans Chokidar. Cela consomme légèrement plus de ressources CPU mais est **indispensable** si `WATCH_DIR` pointe vers un partage réseau (SMB, NFS). Sur un disque local, `usePolling: false` serait plus efficace.

2. **Limite `/stats/range`** : la route retourne au maximum **5000 documents**. Pour des plages longues (plusieurs années, beaucoup de stations), cette limite peut tronquer les résultats.

3. **Agrégation monthly sans poste** : si aucun `poste` n'est passé, les données sont agrégées sur toutes les stations pour chaque jour. Les moyennes reflètent alors l'ensemble du réseau, pas une station spécifique. La page mensuelle oblige donc à sélectionner une station.

4. **Pas d'authentification** : l'application est entièrement publique. Elle est conçue pour un usage intranet uniquement. Si une exposition internet est envisagée, une couche d'authentification devra être ajoutée.

5. **Stockage des fichiers .data** : le watcher ne déplace ni ne supprime les fichiers après ingestion. Une gestion manuelle (archivage, rotation) du dossier `WATCH_DIR` peut être nécessaire sur le long terme pour éviter une accumulation de fichiers.
