**Sommaire :**
(% class="box" %)
(((
{{toc/}}
)))
= ##Qu'est-ce que FormRH ?## =
FormRH est une application web interne à ESLC qui **automatise l'intégration (onboarding) et la sortie (offboarding) des collaborateurs**. Elle remplace les échanges d'emails manuels entre les RH, les managers et le service informatique.
**Ce que l'application fait concrètement :**
- Les RH saisissent les informations d'un nouveau collaborateur
- Le manager reçoit automatiquement un email pour compléter les besoins matériels et logiciels
- Le SI reçoit automatiquement un récapitulatif pour préparer le poste de travail
- L'admin SI peut créer le compte Active Directory en un clic depuis l'application
- Le compte N2F (notes de frais) est créé automatiquement
- Toutes les créations sont archivées dans un historique consultable
-----
## Les rôles dans l'application##
Il existe 4 types d'accès dans FormRH. Chaque personne voit uniquement ce qui la concerne.
| Rôle | Qui ? |(% style="width:618px" %) Accès |(% style="width:189px" %) 
| | |(% style="width:618px" %) |(% style="width:189px" %) 
| **Admin** | Service Informatique |(% style="width:618px" %) Tout (création AD, configuration, historique complet) |(% style="width:189px" %) 
| **RH** | Ressources Humaines |(% style="width:618px" %) Créer/modifier/supprimer des collaborateurs, voir l'historique, gérer les sorties |(% style="width:189px" %) 
| **Manager** | Responsables d'équipe |(% style="width:618px" %) Voir uniquement leurs collaborateurs, compléter les besoins matériels |(% style="width:189px" %) 
| **Utilisateur** | Accès de base |(% style="width:618px" %) Connexion uniquement (pas de fonctionnalité spéciale) |(% style="width:189px" %) 
> Les rôles sont attribués via des groupes Azure Active Directory (gestion par le SI).
## Le parcours d'un nouveau collaborateur — De A à Z##
== ##Saisie par les RH (`/user`)## ==
Les RH se connectent et accèdent à la page **"Gestion des utilisateurs"**.
Elles saisissent :
- Prénom, Nom
- Société, Ville
- Date d'arrivée (et date de fin pour les CDD)
- Matricule, Code analytique
- Service, Emploi
- Manager (sélectionné depuis l'annuaire Azure)
- Informations complémentaires éventuelles
[[image:1778831458088-369.png||height="397" width="753"]]
**Ce qui se passe automatiquement après la création :**
- Le collaborateur est enregistré en base de données
- Un **email est envoyé au manager** pour l'informer qu'un nouveau collaborateur attend sa validation
== ##Validation par le Manager (`/manager`)## ==
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
[[image:1778831610569-846.png||height="401" width="757"]]
**Ce qui se passe automatiquement après la validation :**
- Les informations sont sauvegardées
- Un **email est envoyé au SI** avec un récapitulatif complet (infos RH + besoins matériels + logiciels)
- La fiche passe dans la vue "À exporter par admin" du tableau de bord
> **Rappels automatiques :** Si le manager ne complète pas le formulaire, il reçoit un **email de rappel automatique chaque jour** jusqu'à validation. Le compteur de rappels est visible dans la base de données. 
== ##Création du compte AD par l'Admin (`/admin`)## ==
L'admin SI se connecte à la page **Administration**, onglet **"Création AD"**.
Il voit la liste de tous les collaborateurs dont les informations manager sont complètes (prêts à être exportés).
Il peut **sélectionner un ou plusieurs collaborateurs** et cliquer sur **"Créer les comptes AD"**.
[[image:1778831667534-550.png||height="394" width="756"]]
**Ce que fait le système automatiquement :**
1. Génère un mot de passe sécurisé aléatoire (12 caractères, avec au moins 1 caractère spécial)
2. Crée le compte dans l'**Active Directory LDAP** de l'organisation
3. Place le compte dans la bonne **Unité Organisationnelle (OU)** selon la société et la ville
4. Ajoute le compte aux **groupes AD appropriés** selon le service et l'emploi (règles configurables)
5. Envoie un **email de rapport** au SI avec le résumé des créations (login, email, groupes attribués)
6. Archive le tout dans l'**historique d'export** (`/histo`)
7. Supprime le collaborateur de la liste "en attente" (collection `User`)
== ##Suivi des tâches post-création (`/histo`)## ==
Après la création du compte AD, il reste souvent des tâches à effectuer (installer un logiciel, configurer le poste, etc.).
La page **Historique** permet de :
- Voir tous les exports passés
- Cocher les tâches accomplies (installation logiciels, matériels)
- Ajouter des numéros de série / numéros de téléphone si non renseignés
- Télécharger le fichier de création de compte (contient le login et mot de passe temporaire)
[[image:1778831720877-803.png||height="403" width="727"]]
**Filtrage selon le rôle :**
- Admin/RH : voient tous les historiques
- Manager : voit uniquement les historiques de ses collaborateurs
== ##Création du compte N2F## ==
Dans l'historique, l'admin peut déclencher la **création du compte N2F** (logiciel de notes de frais) depuis la fiche d'un collaborateur.
Le système :
- Formate automatiquement le nom/prénom (sans accents, casse standard)
- Récupère automatiquement l'email du manager dans Azure AD
- Détermine la société et la structure selon les règles configurées
- Génère les codes analytiques appropriés
- Crée le compte via l'API N2F
[[image:1778831753050-189.png||height="343" width="752"]]
== ## Gestion des sorties de collaborateurs (`/edition`)## ==
Accessible uniquement aux Admin et RH.
Permet d'enregistrer une **date de fin d'emploi** pour un collaborateur sortant (matricule + date de fin).
Les demandes sont ensuite traitées par le SI (désactivation du compte AD).
[[image:1778831800797-363.png||height="417" width="733"]]
== ## Tableau de bord principal (`/`)## ==
La page d'accueil affiche un résumé en temps réel :
| Indicateur | Signification | 
| |-----| 
| **Utilisateurs total** | Collaborateurs en attente de création AD | 
| **À traiter par manager** | Collaborateurs dont le manager n'a pas encore complété le formulaire | 
| **À exporter par admin** | Collaborateurs prêts pour création AD (formulaire manager complété) | 
| **Tâches en attente** | Tâches post-création non encore cochées dans l'historique | 
Les 5 tâches les plus urgentes sont affichées directement sur le tableau de bord avec un bouton "Compléter".
== ## Interface d'administration (`/admin`)## ==
[[https:~~/~~/xwiki.eslc.fr/xwiki/bin/view/DSI/1.%20LOGICIELS/FORMRH/Interface%20d%27administration%20des%20configurations%20FormRH/>>https://xwiki.eslc.fr/xwiki/bin/view/DSI/1.%20LOGICIELS/FORMRH/Interface%20d%27administration%20des%20configurations%20FormRH/]]
== ##Connexion à l'application## ==
L'application utilise la **connexion Microsoft (Azure AD)**. Il suffit de se connecter avec son compte professionnel ESLC (`@eslc.fr`).
Si votre compte n'appartient à aucun groupe autorisé, vous arriverez sur une page "Non autorisé". Contactez le SI pour obtenir les accès.