# Documentation Complète — FormRH (ESLC)

> **À qui s'adresse ce document ?**
> Cette documentation est organisée en deux parties :
> - **Partie 1 — Pour les non-développeurs** : comment utiliser l'application au quotidien, qui fait quoi, quel est le flux de travail
> - **Partie 2 — Pour les développeurs** : architecture technique, code, API, base de données, déploiement

---

# PARTIE 1 — GUIDE UTILISATEUR (Non-développeurs)

## Qu'est-ce que FormRH ?

FormRH est une application web interne à ESLC qui **automatise l'intégration (onboarding) et la sortie (offboarding) des collaborateurs**. Elle remplace les échanges d'emails manuels entre les RH, les managers et le service informatique.

**Ce que l'application fait concrètement :**
- Les RH saisissent les informations d'un nouveau collaborateur
- Le manager reçoit automatiquement un email pour compléter les besoins matériels et logiciels
- Le SI reçoit automatiquement un récapitulatif pour préparer le poste de travail
- L'admin SI peut créer le compte Active Directory en un clic depuis l'application
- Le compte N2F (notes de frais) est créé automatiquement
- Toutes les créations sont archivées dans un historique consultable

---

## Les rôles dans l'application

Il existe 4 types d'accès dans FormRH. Chaque personne voit uniquement ce qui la concerne.

| Rôle | Qui ? | Accès |
|------|-------|-------|
| **Admin** | Service Informatique | Tout (création AD, configuration, historique complet) |
| **RH** | Ressources Humaines | Créer/modifier/supprimer des collaborateurs, voir l'historique, gérer les sorties |
| **Manager** | Responsables d'équipe | Voir uniquement leurs collaborateurs, compléter les besoins matériels |
| **Utilisateur** | Accès de base | Connexion uniquement (pas de fonctionnalité spéciale) |

> Les rôles sont attribués via des groupes Azure Active Directory (gestion par le SI).

---

## Le parcours d'un nouveau collaborateur — De A à Z

### Étape 1 — Saisie par les RH (`/user`)

Les RH se connectent et accèdent à la page **"Gestion des utilisateurs"**.

Elles saisissent :
- Prénom, Nom
- Société, Ville
- Date d'arrivée (et date de fin pour les CDD)
- Matricule, Code analytique
- Service, Emploi
- Manager (sélectionné depuis l'annuaire Azure)
- Informations complémentaires éventuelles

**Ce qui se passe automatiquement après la création :**
- Le collaborateur est enregistré en base de données
- Un **email est envoyé au manager** pour l'informer qu'un nouveau collaborateur attend sa validation

---

### Étape 2 — Validation par le Manager (`/manager`)

Le manager reçoit un email avec un lien vers l'**Espace Manager**.

Il voit uniquement les collaborateurs de son équipe (filtrés par son identifiant Azure AD).

Pour chaque collaborateur, il doit compléter :

**Matériels :**
- PC Portable (besoin oui/non, et si déjà existant : numéro de série)
- PC Fixe (besoin oui/non, et si déjà existant : numéro de série)
- Téléphone portable (besoin oui/non, et si déjà existant : numéro de téléphone à 10 chiffres)
- Téléphone fixe (besoin oui/non, et si déjà existant : numéro de poste à 4 chiffres)

**Logiciels :**
- Icopitole, Sage, ALX, N2F, DeliverUp, Solid (cocher si nécessaire)

**Notes libres** : zone de texte pour tout commentaire.

**Ce qui se passe automatiquement après la validation :**
- Les informations sont sauvegardées
- Un **email est envoyé au SI** avec un récapitulatif complet (infos RH + besoins matériels + logiciels)
- La fiche passe dans la vue "À exporter par admin" du tableau de bord

> **Rappels automatiques :** Si le manager ne complète pas le formulaire, il reçoit un **email de rappel automatique chaque jour** jusqu'à validation. Le compteur de rappels est visible dans la base de données.

---

### Étape 3 — Création du compte AD par l'Admin (`/admin`)

L'admin SI se connecte à la page **Administration**, onglet **"Création AD"**.

Il voit la liste de tous les collaborateurs dont les informations manager sont complètes (prêts à être exportés).

Il peut **sélectionner un ou plusieurs collaborateurs** et cliquer sur **"Créer les comptes AD"**.

**Ce que fait le système automatiquement :**
1. Génère un mot de passe sécurisé aléatoire (12 caractères, avec au moins 1 caractère spécial)
2. Crée le compte dans l'**Active Directory LDAP** de l'organisation
3. Place le compte dans la bonne **Unité Organisationnelle (OU)** selon la société et la ville
4. Ajoute le compte aux **groupes AD appropriés** selon le service et l'emploi (règles configurables)
5. Envoie un **email de rapport** au SI avec le résumé des créations (login, email, groupes attribués)
6. Archive le tout dans l'**historique d'export** (`/histo`)
7. Supprime le collaborateur de la liste "en attente" (collection `User`)

---

### Étape 4 — Suivi des tâches post-création (`/histo`)

Après la création du compte AD, il reste souvent des tâches à effectuer (installer un logiciel, configurer le poste, etc.).

La page **Historique** permet de :
- Voir tous les exports passés
- Cocher les tâches accomplies (installation logiciels, matériels)
- Ajouter des numéros de série / numéros de téléphone si non renseignés
- Télécharger le fichier de création de compte (contient le login et mot de passe temporaire)

**Filtrage selon le rôle :**
- Admin/RH : voient tous les historiques
- Manager : voit uniquement les historiques de ses collaborateurs

---

### Étape 5 — Création du compte N2F

Dans l'historique, l'admin peut déclencher la **création du compte N2F** (logiciel de notes de frais) depuis la fiche d'un collaborateur.

Le système :
- Formate automatiquement le nom/prénom (sans accents, casse standard)
- Récupère automatiquement l'email du manager dans Azure AD
- Détermine la société et la structure selon les règles configurées
- Génère les codes analytiques appropriés
- Crée le compte via l'API N2F

---

## Gestion des sorties de collaborateurs (`/edition`)

Accessible uniquement aux Admin et RH.

Permet d'enregistrer une **date de fin d'emploi** pour un collaborateur sortant (matricule + date de fin).

Les demandes sont ensuite traitées par le SI (désactivation du compte AD).

---

## Tableau de bord principal (`/`)

La page d'accueil affiche un résumé en temps réel :

| Indicateur | Signification |
|------------|---------------|
| **Utilisateurs total** | Collaborateurs en attente de création AD |
| **À traiter par manager** | Collaborateurs dont le manager n'a pas encore complété le formulaire |
| **À exporter par admin** | Collaborateurs prêts pour création AD (formulaire manager complété) |
| **Tâches en attente** | Tâches post-création non encore cochées dans l'historique |

Les 5 tâches les plus urgentes sont affichées directement sur le tableau de bord avec un bouton "Compléter".

---

## Interface d'administration (`/admin`)

Accessible uniquement aux Admin SI. Elle contient 8 onglets de configuration :

### Onglet 1 — Création AD
Liste des collaborateurs à traiter + bouton de lancement du worker AD.

### Onglet 2 — Structure organisationnelle
Gère les **sociétés, villes et services** disponibles dans les formulaires RH.
Exemple : ajouter une nouvelle ville à une société.

### Onglet 3 — Applications & Matériel
Gère la **liste des applications et matériels** qui apparaissent dans le formulaire manager.
Permet d'ajouter/supprimer un logiciel (ex: ajouter "Teams" à la liste).

### Onglet 4 — Groupes AD
Gère la **liste des groupes Active Directory** connus de l'application (nom, GUID, DN LDAP).

### Onglet 5 — Chemins LDAP (OU Paths)
Définit dans **quelle Unité Organisationnelle** LDAP est placé un compte selon la combinaison société + ville.

### Onglet 6 — Affectations Emplois
Règles spéciales pour certains emplois (ex: Chauffeur/Livreur, Technicien) : définit quels groupes AD sont attribués selon l'emploi, indépendamment du service.

### Onglet 7 — Affectations Services
Règles générales : définit quels groupes AD sont attribués selon le service, la ville, et l'emploi. Supporte une logique de wildcards (`*` = toutes villes / tous emplois).

### Onglet 8 — Configuration N2F
Définit les correspondances entre les sociétés ESLC et les identifiants N2F, ainsi que les normalisations de noms.

---

## Connexion à l'application

L'application utilise la **connexion Microsoft (Azure AD)**. Il suffit de se connecter avec son compte professionnel ESLC (`@eslc.fr`).

Si votre compte n'appartient à aucun groupe autorisé, vous arriverez sur une page "Non autorisé". Contactez le SI pour obtenir les accès.

---

# PARTIE 2 — DOCUMENTATION TECHNIQUE (Développeurs)

## Architecture globale

```
┌─────────────────────────────────────────────────────────────────┐
│                         INTERNET / INTRANET                      │
└────────────────┬────────────────────────────────────────────────┘
                 │
     ┌───────────▼────────────┐
     │   FRONTEND (Next.js)   │  port 3000 (ou via reverse proxy)
     │   /var/www/formrh/     │  TypeScript + React + Tailwind CSS
     │   frontend_preprod/    │  Authentification : NextAuth + Azure AD
     └───────────┬────────────┘
                 │  API calls (Bearer token JWT)
     ┌───────────▼────────────┐
     │   BACKEND (Express.js) │  port 5001
     │   /var/www/formrh/     │  Node.js + Mongoose
     │   backend_preprod/     │  Auth : Microsoft Graph API
     └──────┬─────┬───────────┘
            │     │
    ┌───────▼──┐ ┌▼───────────────┐
    │ MongoDB  │ │  Active         │
    │ (local)  │ │  Directory LDAP │
    │ port 27017│ │  ldaps://...    │
    └──────────┘ └────────────────┘
                        │
               ┌────────▼────────┐
               │  Azure AD /     │
               │  Microsoft 365  │
               │  Graph API      │
               └─────────────────┘
```

**Technologies utilisées :**
- **Frontend** : Next.js 15, React 19, TypeScript, Tailwind CSS 4, NextAuth 4
- **Backend** : Node.js, Express 4, Mongoose 8, ldapjs 3, nodemailer, node-cron
- **Base de données** : MongoDB (local, port 27017)
- **Authentification** : Azure Active Directory (OAuth2/OIDC) via Microsoft Graph API
- **LDAP** : Active Directory ESLC (`ldaps://10.254.100.200:636`)
- **Email** : SMTP via Exchange Online (`eslc-fr.mail.protection.outlook.com:25`)
- **N2F** : API REST externe (`https://www.n2f.com/services/api/v2/`)

---

## Structure des fichiers

### Backend (`/var/www/formrh/backend_preprod/`)

```
server.js                     # Point d'entrée Express — config CORS, routes, MongoDB
├── middleware/
│   ├── auth.js               # Authentification JWT via Microsoft Graph + cache LRU
│   ├── graphManagerService.js# Appels Microsoft Graph (récup. manager, infos user)
│   └── n2ftoken.js           # Gestion du token OAuth2 pour l'API N2F
├── routes/
│   ├── userRoutes.js         # GET/POST/PUT/DELETE /users
│   ├── historyRoutes.js      # GET/POST/PUT /exportHistory
│   ├── editRoutes.js         # GET/POST/PUT/DELETE /edits
│   ├── workerRoutes.js       # POST /run-worker (création AD)
│   ├── n2fRoutes.js          # POST /n2f
│   └── configRoutes.js       # CRUD /config/* (admin uniquement)
├── controllers/
│   ├── userController.js     # Logique CRUD utilisateurs
│   ├── historyController.js  # Logique CRUD historique
│   ├── editController.js     # Logique CRUD sorties
│   ├── n2fController.js      # Logique création compte N2F
│   └── configController.js   # Logique CRUD toutes les configs admin
├── models/
│   ├── userModel.js          # Schéma MongoDB pour les collaborateurs en attente
│   ├── exportHistory.js      # Schéma MongoDB pour l'historique des créations
│   ├── editModel.js          # Schéma MongoDB pour les sorties collaborateurs
│   └── configModels.js       # Schémas MongoDB pour toutes les configs admin
├── utils/
│   ├── ad/
│   │   ├── ad.unified.worker.js    # Worker principal de création AD
│   │   ├── ad.create.service.js    # Service de création d'un compte AD
│   │   ├── ad.group.service.js     # Service d'ajout aux groupes AD
│   │   ├── ad.search.service.js    # Service de recherche dans l'AD
│   │   ├── ad.logic.service.js     # Logique : OU paths, groupes à attribuer, MDP
│   │   ├── ldap.client.service.js  # Client LDAP (connexion, retry)
│   │   ├── ldap.utils.js           # Utilitaires LDAP (escape DN, etc.)
│   │   └── mappings/               # JSON de configuration (chargés en DB)
│   │       ├── AffectationsEmplois.json
│   │       ├── AffectationsServices.json
│   │       ├── GroupeAD.json
│   │       └── OUPaths.json
│   ├── n2f/
│   │   ├── n2f.service.js          # Appel API N2F (POST users)
│   │   ├── n2fCompanyMapper.js     # Mapping société/ville → company N2F
│   │   ├── n2fAnalyticMapper.js    # Génération des customPrefills analytiques
│   │   └── mappings/
│   │       └── n2fCompanyStructureConfig.json
│   └── managerReminderWorker.js    # Worker d'envoi des rappels email aux managers
└── scripts/
    ├── managerWorkerProcess.js     # Script standalone pour crontab (rappels manager)
    ├── runManagerReminders.js      # Alternative d'exécution des rappels
    └── seedConfig.js               # Initialisation des configs en DB depuis les JSON
```

### Frontend (`/var/www/formrh/frontend_preprod/`)

```
app/
├── layout.tsx                # Layout global (navbar, providers)
├── page.tsx                  # Tableau de bord principal
├── providers.tsx             # SessionProvider NextAuth
├── auth-guard.tsx            # Protection des routes selon les rôles
├── globals.css               # Styles globaux (Tailwind)
│
├── user/                     # Gestion des collaborateurs (RH)
│   ├── page.tsx
│   └── components/
│       ├── UserForm.tsx      # Formulaire de création/édition
│       └── UserList.tsx      # Liste des collaborateurs
│
├── manager/                  # Espace manager
│   ├── page.tsx
│   └── components/
│       ├── ManagerList.tsx   # Liste des collaborateurs du manager
│       └── ManagerForm.tsx   # Modal de saisie matériels/logiciels
│
├── histo/                    # Historique des exports
│   ├── page.tsx
│   └── components/
│       ├── HistoryList.tsx   # Liste des exports
│       └── HistoTaskModal.tsx # Modal de gestion des tâches post-création
│
├── edition/                  # Gestion des sorties
│   ├── page.tsx
│   └── components/
│       ├── EditForm.tsx      # Formulaire de sortie (matricule + date fin)
│       └── EditList.tsx      # Liste des sorties en attente
│
├── admin/                    # Administration (SI uniquement)
│   ├── page.tsx              # Navigation par onglets
│   ├── adWorkerApi.ts        # Client API pour le worker AD
│   ├── configApi.ts          # Client API pour les configs
│   └── components/
│       ├── AdminList.tsx         # Onglet création AD
│       ├── OrgStructureEditor.tsx
│       ├── AppTasksEditor.tsx
│       ├── ADGroupsEditor.tsx
│       ├── OUPathsEditor.tsx
│       ├── AffectationsEmploisEditor.tsx
│       ├── AffectationsServicesEditor.tsx
│       └── N2FStructureEditor.tsx
│
└── api/                      # API Routes Next.js (proxy vers services tiers)
    ├── auth/[...nextauth]/route.ts   # Handler NextAuth (login/logout)
    ├── userApi.ts                    # Client API vers le backend
    ├── userDetails/route.ts          # Proxy Graph API (infos utilisateur)
    ├── users/route.ts                # Proxy vers backend /users
    ├── managers/route.ts             # Proxy Graph API (infos manager)
    ├── sendMailToResponsable/route.ts # Envoi email au manager (SMTP)
    ├── sendMailToSI/route.ts         # Envoi email au SI (SMTP)
    └── config/public/
        ├── app-tasks/route.ts        # Proxy config tâches (public)
        └── org-structure/route.ts   # Proxy config structure org (public)

utils/
├── auth.ts               # Configuration NextAuth (Azure AD, refresh token, groupes)
├── roles.ts              # Définition des rôles et permissions par route
├── permission.ts         # Fonction checkAccess(groups, path)
├── user.ts               # Types TypeScript pour User, MaterialInfo, AppInfo
├── exportHistory.ts      # Types TypeScript pour ExportHistory
├── exportHistoryUtils.ts # Utilitaires (recherche dans l'historique)
├── taskUtils.ts          # Logique des tâches (getTasksFromUser, updateUserTasks)
├── editUser.ts           # Logique de modification collaborateur
└── departments.ts        # (Legacy) liste des départements

hooks/
├── useExportHistory.ts   # Hook : chargement et parsing de l'historique
├── useOrgStructure.ts    # Hook : chargement de la structure organisationnelle
├── useAppTasksConfig.ts  # Hook : chargement de la config tâches
└── useTaskModal.ts       # Hook : état et logique du modal de tâches

types/
├── next-auth.d.ts        # Extension des types NextAuth (groups, azureId, etc.)
└── UserListProps.ts      # Types props composants
```

---

## Base de données MongoDB

### Collections

#### `users` — Collaborateurs en attente de création AD

```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  societe: String,
  ville: String,
  startDate: String,          // Date d'arrivée
  endDate: String,            // Date de fin (CDD)
  matricule: String,
  analyticCode: String,
  manager: String,            // Azure Object ID du manager
  service: String,
  emploi: String,
  needPhone: String,          // (legacy)
  needDesktop: String,        // (legacy)
  additionalInfo: String,     // Notes libres RH

  additionalInfoManager: {    // Rempli par le manager
    laptop:      { need, alreadyHas, serialNumber },
    desktop:     { need, alreadyHas, serialNumber },
    mobilePhone: { need, alreadyHas, phoneNumber, extensionNumber },
    deskPhone:   { need, alreadyHas, serialNumber, extensionNumber },
    icopitole:   { need },
    sage:        { need },
    alx:         { need },
    n2f:         { need },
    deliverup:   { need },
    solid:       { need },
    notes: String
  },

  managerCompleted: Boolean,        // true quand le manager a rempli le formulaire
  managerReminderCount: Number,     // Nb de rappels envoyés
  lastManagerReminder: Date         // Date du dernier rappel
}
```

> **Cycle de vie** : Un document `User` est **créé** par les RH, **mis à jour** par le manager, puis **supprimé** automatiquement après la création AD réussie (il passe dans `exporthistories`).

---

#### `exporthistories` — Historique des créations AD

```javascript
{
  _id: ObjectId,
  date: Date,               // Date de l'export (création AD)
  users: [{
    // Copie des données RH au moment de l'export
    firstName, lastName, societe, ville, startDate, endDate,
    matricule, analyticCode, manager, service, emploi,
    additionalInfo,

    fileData: {             // Fichier texte contenant login + mot de passe
      fileName: String,     // ex: "jdupont.txt"
      content: String,      // "Compte AD cree : ...\nLogin: ...\nMot de passe: ..."
      uploadedAt: Date
    },

    additionalInfoManager: {
      // Même structure que dans users, mais avec des champs supplémentaires :
      laptop:      { need, alreadyHas, do, checkedBy, serialNumber },
      // do = tâche effectuée (cochée par l'admin)
      // checkedBy = { name: "Prénom Nom" } de qui a coché
      ...
    }
  }]
}
```

---

#### `edits` — Demandes de sorties collaborateurs

```javascript
{
  _id: ObjectId,
  matricule: String,          // Matricule du collaborateur sortant
  Enddate: String,            // Date de fin
  status: 'PENDING' | 'SUCCESS' | 'ERROR',
  executedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

#### Collections de configuration (gérées via l'admin)

| Collection | Contenu |
|-----------|---------|
| `orgstructureconfigs` | Sociétés avec leurs villes et services |
| `emploisconfigs` | Services avec leurs emplois |
| `apptasksconfigs` | Liste des apps et matériels (checklist manager) |
| `adgroupconfigs` | Groupes AD (name, GUID, DN LDAP) |
| `oupathsconfigs` | Chemins LDAP par société+ville |
| `affectationsemploisconfigs` | Règles emploi → groupes AD |
| `affectationsservicesconfigs` | Règles service/ville/emploi → groupes AD |
| `n2fstructureconfigs` | Config mapping N2F |

---

## Authentification et gestion des rôles

### Flux de connexion

```
Utilisateur → "Se connecter avec Microsoft"
    → Redirection vers login.microsoftonline.com (Azure AD)
    → Callback NextAuth avec access_token + refresh_token
    → JWT callback :
        1. Appel Graph API : GET /me/memberOf (groupes)
        2. Appel Graph API : GET /me (employeeId, mail)
        3. Filtre les groupes autorisés uniquement
        4. Si aucun groupe autorisé → erreur "UnauthorizedGroup"
        5. Stocke dans le token : accessToken, groups, azureId, employeeId
    → Session disponible côté frontend et backend
```

### Vérification des tokens côté backend

Le middleware `auth.js` utilise un **cache LRU** pour éviter d'appeler Microsoft Graph à chaque requête :
- **Cache utilisateur** : TTL 5 minutes (ou jusqu'à expiration du token)
- **Cache groupes** : TTL 15 minutes (ou jusqu'à expiration du token)
- **Déduplication** : si deux requêtes simultanées arrivent avec le même token, une seule requête Graph est faite

```javascript
// Vérification token :
GET https://graph.microsoft.com/v1.0/me → { id, mail, displayName }

// Vérification groupes :
GET https://graph.microsoft.com/v1.0/me/memberOf → [{ id }]
```

### Groupes Azure AD et leurs rôles

| Variable d'environnement | Rôle | Accès backend |
|--------------------------|------|---------------|
| `ADMIN_GROUP_ID` | Admin SI | Tout |
| `RH_GROUP_ID` | Ressources Humaines | Créer/modifier/supprimer users, historique |
| `USER_GROUP_ID` | Utilisateur de base | Lecture seule |
| `MANAGER_ENERGIES_ID` | Manager Énergies | PUT users (ses collaborateurs) |
| `MANAGER_ALPES_ID` | Manager Alpes | PUT users |
| `MANAGER_PROVENCE_ID` | Manager Provence | PUT users |
| `MANAGER_SERVICES_ID` | Manager Services | PUT users |
| `MANAGER_PASTOR_ID` | Manager Pastor | PUT users |
| `MANAGER_SOMODIPE_ID` | Manager Somodipe | PUT users |
| `MANAGER_GUILLE` | Manager Guille | PUT users |

---

## API Backend — Routes complètes

### Base URL : `https://preprod-formrh.eslc.fr` (ou port 5001 en direct)

> Toutes les routes (sauf `/health`) nécessitent un header `Authorization: Bearer <token>`.

#### Utilisateurs — `/users`
| Méthode | Route | Accès | Description |
|---------|-------|-------|-------------|
| GET | `/users` | Tous authentifiés | Liste tous les collaborateurs en attente |
| POST | `/users` | Admin, RH | Créer un collaborateur |
| PUT | `/users/:id` | Admin, RH, Managers | Modifier un collaborateur |
| DELETE | `/users/:id` | Admin, RH | Supprimer un collaborateur |

#### Historique — `/exportHistory`
| Méthode | Route | Accès | Description |
|---------|-------|-------|-------------|
| GET | `/exportHistory` | Tous authentifiés | Liste l'historique des exports |
| POST | `/exportHistory` | Tous authentifiés | Créer une entrée d'historique |
| PUT | `/exportHistory/:id` | Tous authentifiés | Mettre à jour les tâches d'un export |

#### Sorties — `/edits`
| Méthode | Route | Accès | Description |
|---------|-------|-------|-------------|
| GET | `/edits` | Tous authentifiés | Liste les demandes de sortie |
| POST | `/edits` | Tous authentifiés | Créer une demande de sortie |
| PUT | `/edits/:id` | Tous authentifiés | Modifier une demande |
| DELETE | `/edits/:id` | Tous authentifiés | Supprimer une demande |

#### Worker AD — `/run-worker`
| Méthode | Route | Accès | Description |
|---------|-------|-------|-------------|
| POST | `/run-worker` | Admin uniquement | Lancer la création AD (`{ userIds: [...] }` optionnel) |

#### N2F — `/n2f`
| Méthode | Route | Accès | Description |
|---------|-------|-------|-------------|
| POST | `/n2f` | Tous authentifiés | Créer un compte N2F (`{ id: userId }`) |

#### Configuration — `/config` (Admin uniquement sauf routes `/public`)
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/config/public/org-structure` | Structure org (accès public) |
| GET | `/config/public/app-tasks` | Config tâches (accès public) |
| GET/POST | `/config/org-structure` | Gestion sociétés/villes/services |
| PUT/DELETE | `/config/org-structure/:societe` | Modifier/supprimer une société |
| GET/POST | `/config/emplois` | Gestion emplois par service |
| PUT/DELETE | `/config/emplois/:service` | Modifier/supprimer un service |
| GET/PUT | `/config/app-tasks` | Config applications et matériels |
| GET/POST | `/config/ad-groups` | Gestion groupes AD |
| PUT/DELETE | `/config/ad-groups/:name` | Modifier/supprimer un groupe |
| GET/POST | `/config/ou-paths` | Gestion chemins LDAP |
| PUT/DELETE | `/config/ou-paths/:id` | Modifier/supprimer un chemin |
| GET/PUT | `/config/affectations/emplois` | Règles emploi → groupes AD |
| GET/PUT | `/config/affectations/services` | Règles service/ville → groupes AD |
| GET/PUT | `/config/n2f` | Configuration N2F |

---

## Worker de création Active Directory

### Déclenchement

Le worker est déclenché via `POST /run-worker` par l'admin depuis l'interface.

Il peut être lancé :
- **Sur tous les collaborateurs éligibles** (firstName, lastName, emploi, service, ville renseignés)
- **Sur une sélection** : en passant `{ userIds: ["id1", "id2"] }`

### Processus de création (par collaborateur)

```
1. Chargement des mappings depuis MongoDB
   (OUPaths, AffectationsEmplois, AffectationsServices, ADGroups)

2. Pour chaque collaborateur (lots de 3, semi-séquentiel) :
   a. Détermination de l'OU LDAP cible (société + ville → OUPaths)
   b. Génération du samAccountName (format : "p.nom" dédupliqué)
   c. Génération du mot de passe sécurisé (12 car., 1 spécial)
   d. Détermination des groupes AD (logique emploi/service/ville)
   e. Création du compte LDAP (attributs AD standards + employeeID)
   f. Ajout du compte aux groupes AD identifiés
   g. Archivage dans ExportHistory (avec fichier texte login+MDP)
   h. Suppression du document User (passage en historique)

3. Envoi d'un email de rapport au SI (succès + erreurs)
```

### Logique d'attribution des groupes AD

```
Si l'emploi figure dans AffectationsEmplois (emplois spéciaux : Chauffeur, Technicien...)
    → Uniquement les groupes de l'emploi (pas de groupes service)
    → Groupes [emploi]["*"] + [emploi][ville]

Sinon (emploi standard)
    → Groupes globaux : [*][*][*]
    → Groupes par ville : [*][ville][*] + [*][ville][emploi]
    → Groupes par service : [service][*][*] + [service][*][emploi]
    → Groupes service+ville : [service][ville][*] + [service][ville][emploi]
```

> La comparaison est **insensible à la casse et aux accents** (normalisation NFD).

---

## Worker de rappels manager

Le worker `managerReminderWorker.js` est conçu pour être exécuté **par crontab** (non pas par le serveur Express).

```bash
# Exécution via npm script :
npm run manager-worker

# Ou directement :
node scripts/managerWorkerProcess.js
```

**Comportement :**
1. Cherche tous les `User` où `managerCompleted !== true`
2. Pour chacun, récupère l'email du manager via Graph API (par Azure Object ID)
3. Envoie un email HTML de rappel avec les infos du collaborateur
4. Met à jour `managerReminderCount` et `lastManagerReminder`

---

## Système d'emails

### Emails automatiques envoyés par l'application

| Déclencheur | Destinataire | Expéditeur (code) |
|-------------|--------------|-------------------|
| Création collaborateur par RH | Manager du collaborateur | `frontend/api/sendMailToResponsable/route.ts` |
| Validation manager complète | SI (`SMTP_SI`) | `frontend/api/sendMailToSI/route.ts` |
| Rappel journalier (cron) | Manager | `backend/utils/managerReminderWorker.js` |
| Fin du worker AD | SI (`SMTP_SI`) | `backend/utils/ad/ad.unified.worker.js` |

**Configuration SMTP** (`.env` backend) :
```
SMTP_HOST=eslc-fr.mail.protection.outlook.com
SMTP_PORT=25
SMTP_FROM=ne-pas-repondre@eslc.fr
SMTP_SI=jordan.jimenez@eslc.fr
```

---

## Variables d'environnement

### Backend (`backend_preprod/.env`)

```bash
# MongoDB
MONGODB_URI=mongodb://user:pass@127.0.0.1:27017/ESLC-FormRH-PreProd?authSource=ESLC-FormRH-PreProd

# Azure AD (pour vérification des tokens)
AZURE_TENANT_ID=...
AZURE_CLIENT_ID=...
AZURE_CLIENT_SECRET=...

# Active Directory LDAP
AD_URL=ldaps://10.254.100.200:636
AD_USERNAME=CN=...
AD_PASSWORD=...
AD_BASEDN=OU=MS Office 365,DC=eslc,DC=ad

# Groupes Azure AD
ADMIN_GROUP_ID=...
RH_GROUP_ID=...
USER_GROUP_ID=...
MANAGER_ENERGIES_ID=...
# (etc. pour chaque manager)

# API N2F
N2F_CLIENT_ID=...
N2F_CLIENT_SECRET=...

# Serveur
PORT=5001

# Email
SMTP_HOST=eslc-fr.mail.protection.outlook.com
SMTP_PORT=25
SMTP_FROM=ne-pas-repondre@eslc.fr
SMTP_SI=jordan.jimenez@eslc.fr
```

### Frontend (`frontend_preprod/.env`)

```bash
# Azure AD (NextAuth)
AZURE_CLIENT_ID=...
AZURE_CLIENT_SECRET=...
AZURE_TENANT_ID=...

# Groupes (publics - visibles côté client)
NEXT_PUBLIC_ADMIN_GROUP_ID=...
NEXT_PUBLIC_RH_GROUP_ID=...
NEXT_PUBLIC_USER_GROUP_ID=...
NEXT_PUBLIC_MANAGER_ENERGIES_ID=...
# (etc.)

# Backend API
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
# ou https://preprod-formrh.eslc.fr/api (selon proxy)

# NextAuth
NEXTAUTH_URL=https://preprod-formrh.eslc.fr
NEXTAUTH_SECRET=...

# Email (SMTP - côté serveur Next.js)
SMTP_HOST=...
SMTP_PORT=25
SMTP_FROM=ne-pas-repondre@eslc.fr
```

---

## Gestion de session et sécurité

### Tokens JWT (NextAuth)

Le JWT stocké côté client contient uniquement les groupes autorisés (filtrés au login), ce qui réduit la taille du cookie. Si le token Azure dépasse 5000 octets (trop de groupes AD), le backend retourne une erreur 413.

### Protection des routes frontend

Le composant `auth-guard.tsx` vérifie à chaque changement de route que l'utilisateur a les droits requis. La fonction `checkAccess(groups, path)` compare les groupes de la session avec les permissions définies dans `roles.ts`.

### Protection des routes backend

Deux middlewares :
- `authenticateToken` : vérifie que le token est valide via Graph API (avec cache)
- `checkGroupMembership(allowedGroups)` : vérifie l'appartenance aux groupes (avec cache)

---

## Flux de données complet — Schéma récapitulatif

```
RH saisit un collaborateur
        │
        ▼
POST /users → MongoDB (collection: users)
        │
        └─→ Email automatique au manager (via /api/sendMailToResponsable)
                │
                ▼
        Manager reçoit l'email → accède à /manager
                │
                ▼
        PUT /users/:id (additionalInfoManager renseigné)
        → managerCompleted = true
                │
                └─→ Email automatique au SI (via /api/sendMailToSI)
                        │
                        ▼
                Admin voit le collaborateur dans /admin (onglet "Création AD")
                        │
                        ▼
                POST /run-worker → Worker AD
                        │
                        ├─→ Crée le compte LDAP dans l'AD
                        ├─→ Ajoute aux groupes AD (selon règles)
                        ├─→ Sauvegarde dans ExportHistory (avec fichier MDP)
                        ├─→ Supprime de la collection User
                        └─→ Email de rapport au SI
                                │
                                ▼
                        Admin coche les tâches dans /histo
                        (installation matériel, logiciels...)
                                │
                                ▼
                        POST /n2f → Création compte N2F (si besoin)
```

---

## Diagramme des environnements

| Environnement | Frontend | Backend | Base de données |
|---------------|----------|---------|----------------|
| **Preprod** | `https://preprod-formrh.eslc.fr` | port 5001 | `ESLC-FormRH-PreProd` |
| **Production** | `https://formrh.eslc.fr` | port 5001 (autre instance) | `ESLC-FormRH` |

Les dossiers `backend_preprod` / `frontend_preprod` correspondent à l'environnement de **préproduction** (plus avancé que production).

---

## Démarrage / Relance des services

```bash
# Backend (avec PM2) :
cd /var/www/formrh/backend_preprod
pm2 start server.js --name formrh-backend-preprod
pm2 restart formrh-backend-preprod

# Frontend (avec PM2 ou pm2 + next start) :
cd /var/www/formrh/frontend_preprod
npm run build
pm2 start "npm run start" --name formrh-frontend-preprod

# Rappels manager (à planifier en crontab) :
cd /var/www/formrh/backend_preprod
node scripts/managerWorkerProcess.js
# Exemple crontab (tous les jours à 8h) :
# 0 8 * * * cd /var/www/formrh/backend_preprod && node scripts/managerWorkerProcess.js
```

---

## Points d'attention / Limitations connues

1. **Taille du token Azure** : si un utilisateur appartient à trop de groupes AD (>100), le token peut dépasser la limite de 5000 octets. Le backend retourne une erreur 413 dans ce cas.

2. **Worker AD non parallèle** : le worker traite les collaborateurs par lots de 3 en séquentiel (pas en parallèle) pour éviter des problèmes sur le client LDAP unique.

3. **Rappels manager** : le script de rappel est conçu pour tourner via crontab, pas comme un cron interne au serveur Express. Il faut s'assurer qu'il est bien configuré sur le serveur.

4. **Mot de passe initial** : le mot de passe généré est stocké en clair dans `ExportHistory.fileData.content` (dans MongoDB). Il faut changer le mot de passe à la première connexion.

5. **Configs en base vs JSON** : les fichiers JSON dans `utils/ad/mappings/` et `utils/n2f/mappings/` sont la version initiale. Les configs actives sont en MongoDB (gérées depuis l'interface admin). Le script `seedConfig.js` permet de réimporter les JSON en DB si besoin.
