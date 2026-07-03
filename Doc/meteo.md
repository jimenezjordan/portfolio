Documentation technique — Chaîne de collecte météo ESLC =
**degres-jours.eslc.fr — Version 1.0 | Avril 2026**
----
== Vue d'ensemble du système ==
La chaîne de collecte météo ESLC récupère chaque jour les données de température (TN/TX) auprès de MétéoFrance, les consolide, les stocke dans MongoDB et les expose sur le portail web degres-jours.eslc.fr.
Schéma simplifié de la chaîne :
**Script C# (SCR-01) → Fichiers .data (SRV21 / SRV22) → MongoDB (profil Informatique) → Site web degres-jours.eslc.fr** ← lu par ICopitole
----
== Composants de la chaîne ==
=== Script C# — SCR-01 ===
Le script C# est le point d'entrée de toute la chaîne. Il tourne sous forme de tâche planifiée Windows sur le serveur SCR-01.
|=Paramètre|=Valeur
|Serveur|SCR-01
|Type|Tâche planifiée Windows
|Nom de la tâche|Meteo-Test
|Heure de déclenchement|13 h 30 (quotidien)
|Durée maximale|5 minutes
|Fin attendue au plus tard|13 h 35
Actions réalisées par le script :
* Connexion à l'API MétéoFrance pour chaque station configurée
* Récupération des données TN (température minimale) et TX (température maximale) du jour
* Génération des fichiers .data sur SRV21 et SRV22
* Insertion des données dans la base MongoDB
* Envoi d'un e-mail de compte rendu (succès ou erreur)
----
=== Fichiers .data — SRV21 / SRV22 ===
À chaque exécution réussie, le script génère des fichiers .data sur deux serveurs. Ces fichiers sont le format d'échange attendu par ICopitole.
**Emplacements réseau :**
|=Serveur|=Chemin
|SRV21|~\~\srv-eslc21.eslc.ad\iCOPRH-Imports\meteo
|SRV22|~\~\srv-eslc22.eslc.ad\iCOPRH-Imports\meteo
>⚠️ Les fichiers .data ont une durée de vie limitée. Ils sont consommés par la tâche planifiée ICopitole vers 13 h 45. Une fois consommés, ils sont archivés dans le dossier SAV (voir section 7).
----
=== Base de données MongoDB ===
En parallèle de la génération des fichiers .data, le script insère les données météo directement dans MongoDB.
|=Paramètre|=Valeur
|Coffre|Coffres ESLC
|Profil|Informatique (disponible dans le coffre)
|Usage|Alimentation du site web degres-jours.eslc.fr
C'est cette base qui alimente en temps réel le portail web. Si les données n'apparaissent pas sur le site après 13 h 35, c'est un indicateur fiable d'une erreur dans la chaîne.
----
=== Application web — degres-jours.eslc.fr ===
Le portail web est une application Next.js + Node.js dockerisée. Elle lit les données depuis MongoDB et les affiche par site, par jour, semaine ou mois.
|=Paramètre|=Valeur
|URL|[[https:~~/~~/degres-jours.eslc.fr>>url:https://degres-jours.eslc.fr]]
|Frontend|Next.js (port 3002) Serveur 31
|Backend|Node.js Express (port 5002) Serveur 31
|Base de données|MongoDB Web
|Infrastructure|Docker Compose
----
== Séquence d'exécution quotidienne ==
|=Heure|=Statut|=Action
|13 h 30|AUTO|Déclenchement de la tâche planifiée Meteo-Test sur SCR-01
|13 h 30 – 13 h 35|EN COURS|Exécution du script C# : collecte API MétéoFrance, génération fichiers .data (SRV21/SRV22), insertion MongoDB
|~~13 h 35|AUTO|Envoi de l'e-mail de compte rendu (succès ou liste des stations en erreur)
|13 h 35 – 13 h 45|⚠️ FENÊTRE|Fenêtre d'intervention : si erreur signalée, relancer Meteo-Test avant 13 h 45
|~~13 h 45|AUTO|ICopitole déclenche sa tâche planifiée, consomme les fichiers .data et les déplace en SAV
----
== Gestion des erreurs et supervision ==
=== E-mail de compte rendu ===
À la fin de chaque exécution, le script envoie automatiquement un e-mail indiquant :
* **Succès** : toutes les stations ont été collectées correctement
* **Erreur** : liste des stations concernées par l'erreur de collecte
Cet e-mail est le premier signal de surveillance. En cas d'erreur, les stations listées n'auront pas de données sur degres-jours.eslc.fr.
=== Vérification sur le portail web ===
Pour confirmer qu'une erreur a bien impacté les données :
1. Ouvrir [[https:~~/~~/degres-jours.eslc.fr>>url:https://degres-jours.eslc.fr]]
1. Naviguer vers la station mentionnée dans l'e-mail d'erreur
1. Si les données du jour sont absentes ou incorrectes, la chaîne a bien rencontré un problème
=== Fenêtre d'intervention ===
>⚠️ La fenêtre d'intervention est de **13 h 35 à 13 h 45 maximum**. Passé 13 h 45, ICopitole consomme les fichiers .data. Une relance après ce délai ne corrigera plus le fichier déjà ingéré par ICopitole — voir section 8 pour la procédure dans ce cas.
----
== Procédure de relance d'urgence ==
Si l'e-mail de compte rendu signale des erreurs et que la fenêtre **13 h 35 – 13 h 45** est encore ouverte :
|=Étape|=Action
|1|Se connecter au serveur SCR-01
|2|Ouvrir le Planificateur de tâches Windows
|3|Localiser la tâche nommée **Meteo-Test**
|4|Clic droit > **Exécuter**
|5|Attendre la fin d'exécution (max 5 minutes)
|6|Vérifier le nouvel e-mail de compte rendu
|7|Confirmer sur degres-jours.eslc.fr que les données sont maintenant présentes
----
== Outil de régénération sur dates personnalisées ==
Un outil C# est disponible sur SRV21 pour régénérer les données météo sur une plage de dates choisie. Il est utile pour rattraper un ou plusieurs jours manquants sans avoir à attendre le lendemain.
**Emplacement :**
{{{\\srv-eslc21.eslc.ad\iCOPRH-Imports\meteo\Meteo_date_personalisé}}}
**Utilisation :**
1. Ouvrir l'application depuis le chemin ci-dessus
1. Sélectionner la date de début
1. Sélectionner la date de fin
1. Lancer la collecte
Le script régénère les fichiers .data pour la période choisie et réinjecte les données dans MongoDB. Les données manquantes apparaissent ensuite sur degres-jours.eslc.fr.
>Si ICopitole doit aussi ingérer ces données, relancer les tâches planifiées ICopitole correspondantes après l'exécution de l'outil.
----
== Archivage des fichiers .data (SAV) ==
Une fois consommés par ICopitole vers 13 h 45, les fichiers .data sont automatiquement déplacés dans un dossier **SAV** dans le même répertoire.
**Emplacements SAV :**
|=Serveur|=Chemin
|SRV21|~\~\srv-eslc21.eslc.ad\iCOPRH-Imports\meteo\SAV
|SRV22|~\~\srv-eslc22.eslc.ad\iCOPRH-Imports\meteo\SAV
Ce dossier sert d'archive. En cas de problème sur une date passée, il permet de :
* Retrouver le fichier exact qui a été ingéré ce jour-là
* Diagnostiquer un contenu erroné
* Identifier si le fichier était absent ou incorrect au moment de la consommation
----
== Impact sur ICopitole ==
ICopitole consomme les fichiers .data via sa propre tâche planifiée qui se déclenche vers 13 h 45.
|=Situation|=Conséquence
|Fichier .data correct à 13 h 45|ICopitole ingère les données normalement. Aucune action requise.
|Fichier .data absent ou en erreur à 13 h 45|ICopitole ingère quand même le fichier tel quel. Il y aura un retard dans ICOP mais ce n'est pas bloquant.
|Correction nécessaire après 13 h 45|Utiliser l'outil de dates personnalisées (section 6) puis relancer les tâches planifiées ICopitole correspondantes.
>Un retard dans ICopitole dû à un fichier .data incorrect n'est pas critique. La priorité reste de corriger les données sur degres-jours.eslc.fr.
== Informations de connexion ==
|=Accès|=Détail
|MongoDB|Coffre ESLC > profil Informatique
|Serveur script|SCR-01 (accès réseau interne ESLC)
|Tâche planifiée|Planificateur de tâches Windows > Meteo-Test
|Portail web|[[https:~~/~~/degres-jours.eslc.fr>>url:https://degres-jours.eslc.fr]]
|Fichiers .data SRV21|~\~\srv-eslc21.eslc.ad\iCOPRH-Imports\meteo
|Fichiers .data SRV22|~\~\srv-eslc22.eslc.ad\iCOPRH-Imports\meteo
|Outil dates perso|~\~\srv-eslc21.eslc.ad\iCOPRH-Imports\meteo\Meteo_date_personalisé
|SAV SRV21|~\~\srv-eslc21.eslc.ad\iCOPRH-Imports\meteo\SAV
|SAV SRV22|~\~\srv-eslc22.eslc.ad\iCOPRH-Imports\meteo\SAV