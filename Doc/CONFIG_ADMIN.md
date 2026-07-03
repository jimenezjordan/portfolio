# Mise à jour — Interface d'administration des configurations FormRH

> **Date :** Mai 2026  
> **Environnement concerné :** Préprod uniquement (`preprod-formrh.eslc.fr`)  
> **Production :** Non touchée

---

## Pour l'équipe SI (non-développeurs)

### Ce qui change pour vous

Avant cette mise à jour, toute modification de configuration (ajouter une société, un groupe AD, un emploi...) nécessitait l'intervention d'un développeur et un redéploiement de l'application. **Ce n'est plus le cas.**

### Comment accéder à l'interface

1. Connectez-vous sur `https://preprod-formrh.eslc.fr`
2. Dans le menu en haut, cliquez sur **"Outils avancés" → "⚙️ Admin"**
3. Vous arrivez sur la page d'administration avec 8 onglets

> **Accès restreint** : seuls les membres du groupe administrateur Azure AD ont accès à cette page.

---

### Les 8 onglets disponibles

| Onglet | Ce que vous pouvez faire |
|--------|--------------------------|
| **Création AD** | Liste des collaborateurs en attente de création de compte (existant) |
| **Structure organisationnelle** | Gérer les sociétés, leurs villes et services associés |
| **Applications & Matériel** | Gérer la liste des apps et matériels proposés dans les formulaires |
| **Groupes AD** | Gérer les groupes Active Directory (nom, GUID, DN LDAP) |
| **Chemins LDAP** | Gérer les chemins OU dans lesquels sont créés les comptes AD |
| **Affectations Emplois** | Définir quels groupes AD sont assignés selon l'emploi |
| **Affectations Services** | Définir quels groupes AD sont assignés selon le service/ville/emploi |
| **Configuration N2F** | Gérer le mapping entre sociétés FormRH et identifiants N2F |

---

### Règles importantes à respecter

#### Structure organisationnelle
- **D'abord** créer le service dans l'onglet "Emplois par service" (colonne droite)
- **Ensuite** associer ce service à une société via le menu déroulant (colonne centrale)
- Les villes restent en saisie libre
- Chaque modification nécessite de cliquer **"Sauvegarder"** pour être enregistrée

#### Applications & Matériels
- La **clé technique** (ex: `icopitole`, `laptop`) ne doit **jamais être modifiée** si elle est déjà utilisée dans des formulaires existants — les données en base seraient orphelines
- Le **libellé** (texte affiché) peut être changé librement à tout moment
- Les nouveaux éléments ajoutés apparaissent **immédiatement** dans le formulaire Manager

#### Groupes AD
- Avant de supprimer un groupe, vérifier qu'il n'est pas référencé dans les onglets "Affectations Emplois" ou "Affectations Services"
- Une **boîte de confirmation** apparaît avant chaque suppression pour éviter les erreurs

#### Affectations Emplois / Services / Configuration N2F
- Ces onglets utilisent un **éditeur JSON** — respecter la syntaxe JSON (les erreurs sont signalées en orange)
- Un bouton **"Télécharger"** permet de sauvegarder une copie de sauvegarde avant modification
- Le badge **"Modifications non sauvegardées"** apparaît dès qu'une modification n'a pas encore été enregistrée
- Une **confirmation** est demandée avant d'annuler les modifications

---

## Pour les développeurs

### Contexte

L'objectif était de sortir toutes les configurations applicatives des fichiers TypeScript/JSON statiques pour les migrer en base MongoDB. Toute modification de configuration ne doit plus nécessiter un `git push` + rebuild + redéploiement.

### Architecture retenue

```
MongoDB (ESLC-FormRH-PreProd)
    └── Collections de config
            ├── orgstructureconfigs     (1 doc / société)
            ├── emploisconfigs          (1 doc / service)
            ├── apptasksconfigs         (singleton)
            ├── adgroupconfigs          (1 doc / groupe)
            ├── oupathsconfigs          (1 doc / société+ville)
            ├── affectationsemploisconfigs   (singleton)
            ├── affectationsservicesconfigs  (singleton)
            └── n2fstructureconfigs     (singleton)

Backend Express (port 5001)
    └── /config/*  → configRoutes.js → configController.js
            ├── Routes publiques (tous les users authentifiés) :
            │       GET /config/public/org-structure
            │       GET /config/public/app-tasks
            └── Routes admin (groupe ADMIN_GROUP_ID) :
                    CRUD complet sur les 8 collections

Frontend Next.js (port 3001)
    ├── /app/admin/configApi.ts          → Server Actions ('use server')
    ├── /app/admin/page.tsx              → Page 8 onglets
    ├── /app/admin/components/           → 8 composants éditeurs + ConfirmModal
    ├── /app/api/config/public/          → Route handlers Next.js (proxy interne)
    └── /hooks/                          → useOrgStructure, useAppTasksConfig
```

---

### Nouveaux fichiers créés

#### Backend (`backend_preprod/`)

| Fichier | Rôle |
|---------|------|
| `models/configModels.js` | 8 modèles Mongoose avec pattern `safeModel()` anti-doublon |
| `routes/configRoutes.js` | Routes `/config/*` — public avant middleware admin |
| `controllers/configController.js` | CRUD complet, `updatedBy: req.user.email` sur chaque mutation |
| `scripts/seedConfig.js` | Migration one-shot (idempotente via `upsert: true`) |

#### Frontend (`frontend_preprod/`)

| Fichier | Rôle |
|---------|------|
| `app/admin/configApi.ts` | Server Actions pour tous les appels API config (Bearer token via `getServerSession`) |
| `app/admin/components/ConfirmModal.tsx` | Modal de confirmation réutilisable (remplace les `confirm()` natifs) |
| `app/admin/components/OrgStructureEditor.tsx` | Éditeur structure org (3 colonnes) |
| `app/admin/components/AppTasksEditor.tsx` | Éditeur apps/matériels |
| `app/admin/components/ADGroupsEditor.tsx` | Table searchable groupes AD |
| `app/admin/components/OUPathsEditor.tsx` | Éditeur chemins LDAP groupés par société |
| `app/admin/components/AffectationsEmploisEditor.tsx` | Éditeur JSON affectations emplois |
| `app/admin/components/AffectationsServicesEditor.tsx` | Éditeur JSON affectations services |
| `app/admin/components/N2FStructureEditor.tsx` | Éditeur JSON config N2F (3 sections) |
| `app/api/config/public/org-structure/route.ts` | Route handler proxy (→ backend:5001, `cache: no-store`) |
| `app/api/config/public/app-tasks/route.ts` | Route handler proxy (→ backend:5001, `cache: no-store`) |
| `hooks/useOrgStructure.ts` | Hook client → `/api/config/public/org-structure` |
| `hooks/useAppTasksConfig.ts` | Hook client → `/api/config/public/app-tasks` (fallback hardcodé) |

---

### Fichiers modifiés

#### Backend

| Fichier | Modification |
|---------|-------------|
| `server.js` | Ajout `app.use('/config', authenticateToken, configRoutes)` |
| `utils/ad/ad.create.service.js` | `loadMappings()` : remplacé les `require('./mappings/*.json')` par des requêtes MongoDB (`AffectationsEmploisConfig`, `AffectationsServicesConfig`, `ADGroupConfig`, `OUPathsConfig`) |
| `utils/n2f/n2fCompanyMapper.js` | Réécriture complète en async : toutes les fonctions lisent depuis `N2FStructureConfig.findOne()` |
| `controllers/n2fController.js` | Ajout `await` sur l'appel à `getCompanyAndStructure()` (rendu async) |

#### Frontend

| Fichier | Modification |
|---------|-------------|
| `app/admin/page.tsx` | Converti en navigation par 8 onglets (`useState<Tab>`) |
| `app/user/components/UserForm.tsx` | Remplacement des imports statiques `departments.ts` par le hook `useOrgStructure` |
| `app/manager/components/ManagerForm.tsx` | Remplacement des tableaux `materialFields` / `infoFields` hardcodés par `useAppTasksConfig()` — les nouveaux items admin s'affichent sans rebuild |
| `app/manager/page.tsx` | Signature `handleMaterialChange` assouplie (`string` au lieu de `keyof AdditionalInfoManager`) pour accepter les clés dynamiques |
| `.env` | Ajout `API_INTERNAL_URL=http://localhost:5001` (évite le passage par Nginx pour les appels serveur-à-serveur) |

---

### Points techniques notables

#### Pourquoi `API_INTERNAL_URL` et pas `NEXT_PUBLIC_API_URL` ?

Les Server Actions (`configApi.ts`) et les Route Handlers (`/app/api/config/public/`) s'exécutent côté serveur Node.js. Utiliser l'URL publique (`https://preprod-formrh.eslc.fr`) ferait passer les requêtes par Nginx, qui n'est pas configuré pour router `/config/*` vers le backend. En utilisant `http://localhost:5001` directement, on court-circuite Nginx pour les appels internes.

#### Sécurité

- **Frontend** : `AuthGuard` vérifie `checkAccess(session.user.groups, '/admin')` via `routePermissions` — redirige vers `/unauthorized` si non-admin
- **Backend** : `router.use(checkGroupMembership([process.env.ADMIN_GROUP_ID]))` protège toutes les routes admin
- **Routes publiques** (`/config/public/*`) : accessibles à tout utilisateur authentifié (token Azure valide), pas de vérification de groupe — utilisées pour les dropdowns UserForm et la checklist ManagerForm

#### Migration des données (one-shot)

```bash
cd /var/www/formrh/backend_preprod
node scripts/seedConfig.js
```

Résultat lors de l'exécution initiale :
- 8 sociétés importées
- 11 services + emplois importés
- 1 doc AppTasksConfig (apps + matériels)
- 122 groupes AD importés depuis `GroupeAD.json`
- 24 chemins OU importés depuis `OUPaths.json`
- Affectations emplois, services et N2F importés

Le script est **idempotent** (`updateOne + upsert: true`) — peut être relancé sans risque.

#### Compatibilité descendante du worker AD

La fonction `loadMappings()` dans `ad.create.service.js` reshape les résultats MongoDB dans la même structure qu'attendait l'ancien code (objets `groupesAD`, `ouPaths`, `affectationsEmplois`, `affectationsServices`). Aucune modification sur `ad.logic.service.js` ni `ad.group.service.js`.

---

### Variables d'environnement requises

#### `backend_preprod/.env`
```
MONGODB_URI=mongodb://...@127.0.0.1:27017/ESLC-FormRH-PreProd?authSource=...
ADMIN_GROUP_ID=<guid-du-groupe-azure-admin>
PORT=5001
```

#### `frontend_preprod/.env`
```
NEXT_PUBLIC_API_URL=https://preprod-formrh.eslc.fr   # URL publique (Nginx)
API_INTERNAL_URL=http://localhost:5001                # URL interne directe (nouveau)
NEXTAUTH_URL=https://preprod-formrh.eslc.fr
NEXTAUTH_SECRET=...
AZURE_TENANT_ID=...
AZURE_CLIENT_ID=...
AZURE_CLIENT_SECRET=...
NEXT_PUBLIC_ADMIN_GROUP_ID=...
```

---

### Ce qui n'a PAS été migré (intentionnel)

| Élément | Raison |
|---------|--------|
| `routePermissions` dans `roles.ts` | Contrôle d'accès — modification = risque sécurité, doit passer par revue dev |
| Group IDs Azure dans `.env` | Idem — rester modifiable uniquement par les fichiers `.env` sur le serveur |
| Base de données production | Aucun fichier du dossier `prod` ni de la BDD prod n'a été touché |
