---
name: ajouter-candidature
description: Ajouter une candidature au suivi (document Firestore applications/<slug> avec offre, lettre, modifs du CV, mots-clés liés aux fiches, CV et lettre en PDF dans envoi/<Entreprise>/). A utiliser quand l'utilisateur colle une offre d'emploi, dit "ajoute cette candidature", "nouvelle candidature", "prépare une candidature pour ..." ou donne un lien/texte d'annonce.
---

# Ajouter une candidature

> **Données dans Firestore** (voir `CLAUDE.md`). Une candidature est le document `applications/<slug>`, lu et écrit avec `node outils/firebase/db.mjs` (`get`, `set`, `merge`, `put <coll>/<id> <champ> <fichier>`, `list`, `delete`). Il n'y a plus de dossier `envois/`. En local il ne reste que `cv_base/`, `envoi/<Entreprise>/` (CV et lettre en PDF) et les copies de travail `outils/cv/<slug>.html` et `apercus_cv/` (hors git).

Le site `candidatures/` ne contient aucune donnée en dur : il lit Firestore. Ajouter une candidature = créer ce document. Pas de formulaire, pas de modification de code. Racine : `C:\Users\User\Desktop\boulot`.

## Règles

- Ne jamais ouvrir ni analyser le lien de l'annonce (WebFetch, navigateur, recherche web) : travailler uniquement avec le texte collé. Voir `CLAUDE.md`. Seule exception : l'utilisateur le demande explicitement.
- Ne rien inventer dans le CV ni dans la lettre : seulement ce qui est dans `cv_base/CV_base.pdf` (HTML : `db.mjs get cv/base html`). Ce qui manque va dans `cvChanges` (section « à combler »), pas dans la lettre.
- Textes en français, accents conservés. Écrire les fichiers temporaires avec l'outil Write dans le dossier scratchpad (UTF-8 sans BOM).
- Commits : ne pas committer sauf demande. Aucune mention d'assistant dans les messages.
- Si l'entreprise, le poste ou la date manquent, les déduire de l'annonce ; date d'ajout = date du jour. Ne poser une question que si l'entreprise est introuvable.

## Étapes

1. **Slug** : nom d'entreprise en minuscules, sans accents ni espaces (`triskell`, `cnd`). Vérifier qu'il n'existe pas (`db.mjs list applications`) ; s'il existe, demander avant d'écraser.

2. **Document `applications/<slug>`** : écrire un fichier JSON puis `db.mjs set applications/<slug> <fichier>`. Champs :
   ```json
   {
     "company": "…", "title": "…", "location": "…", "date": "YYYY-MM-DD", "url": "…", "status": "étude",
     "addedAt": 1760000000000,
     "details": [{ "label": "Contrat", "value": "CDI" }],
     "checks": { "cv": false, "letter": false },
     "offer": "texte de l'annonce", "summary": "# …", "message": "lettre", "cvChanges": "# …", "proposals": []
   }
   ```
   - `addedAt` : `Date.now()` (départage les candidatures du même jour).
   - `details` : la section « Détails du poste » de la page. Mettre toutes les informations utiles de l'annonce (contrat, salaire, télétravail, expérience, formation, mission, outils cités, entreprise, avantages, publication, référence), « Non indiqué » si absent ; jamais d'information devinée. Ne pas en réduire le nombre : la page les masque par défaut.
   - `checks` : cases « CV vérifié » et « Lettre de motivation vérifiée ». Ne jamais les passer à `true` sans que l'utilisateur l'ait fait.
   - `status` : `étude`, `envoyée`, `reçue`, `relancée`, `entretien`, `refusée`, `acceptée`. Nettoyer le lien (enlever une parenthèse finale collée par erreur).
   - `offer` : le texte de l'annonce, fidèle, sans le bruit du site (menus, boutons, FAQ, offres similaires, pied de page). Lien de l'annonce sur la dernière ligne (`Lien : …`).
   - `summary` : petit résumé de l'offre en Markdown (un titre `# Entreprise : poste`, 5 à 7 puces en gras : entreprise, poste et conditions, mission, profil, stack, entretiens, puis une ligne « Ton adéquation / À préparer » d'après le CV de base). Faits de l'annonce uniquement.
   - `questions` : historique des questions de l'utilisateur sur l'offre, créé à la première question (voir `CLAUDE.md`, « Historique des questions »). Ne pas l'inventer à la création.
   - `message` : brouillon de la lettre, modifiable depuis la page. Texte de la lettre SEUL (jamais de lien d'annonce, de statut ni de note) : `Madame, Monsieur,`, une ligne vide, un paragraphe par bloc séparé par une ligne vide, `Cordialement,` puis `Mathieu Jullien`. 3 paragraphes courts, appuyés sur des éléments réels du CV qui répondent à l'offre.
   - `proposals` : propositions de lettre affichées en boutons dans l'onglet Lettre (statut `étude`) : `{ "id": "0-Mixte.txt", "label": "0. Mixte", "text": "" }` **toujours présent et vide** (l'utilisateur y enregistre sa lettre mélangée avec « Enregistrer dans 0. Mixte »), puis 3 variantes `{ "id": "1-Directe.txt", "label": "1. Directe", "text": "…" }`, `2-<Titre>`, `3-<Titre>` (texte de la lettre seul, de « Madame, Monsieur, » à la signature). Un clic sur un bouton copie la proposition dans `message`.
   - `cvChanges` : **Markdown** listant les modifications à appliquer au CV pour cette offre : un titre `# …`, une citation `>` pour la règle (n'ajouter que ce qui est vrai), puis une section `##` par sujet (titre, résumé, compétences, expériences à réordonner, projets), et une section « À combler avant d'envoyer » en tableau pour ce que l'offre demande et que le CV n'a pas. Modèle : `db.mjs get applications/cnd cvChanges`.

3. **Fiches techniques** : une fiche de 1 à 2 pages par mot-clé de l'offre, stockée dans Firestore (`kb/<id>`).
   a. Lister tous les mots-clés techniques et exigences de l'annonce (outils, langages, méthodes, domaine, compétences listées).
   b. **Vérifier d'abord que la fiche n'existe pas déjà** (règle de l'utilisateur, valable pour toute doc) : lister les `id`/`label` de `outils/fiches/docs-triskell.mjs`, `docs-cnd.mjs`, `docs-extra.mjs` (ou `db.mjs list kb`). Un sujet voisin (ex. « Jest » vs « tests unitaires », « CI/CD » vs « intégration continue ») = fiche existante : la réutiliser, éventuellement en ajoutant des `terms` dans `library.mjs`, sans la dupliquer. `library.mjs` refuse d'ailleurs une fiche de `docs-extra.mjs` dont l'id ou le libellé existe déjà.
   c. **Pour toute fiche créée ou modifiée, suivre le skill `maintenir-base-connaissance`** : QCM (10 questions) et questions ouvertes (3) mis à jour en même temps, fiche de 2 pages (3 au plus). Pour chaque mot-clé sans fiche, ajouter un objet dans `outils/fiches/docs-extra.mjs` : `{ id, label, category, level, summary, cv, body }` ;
      - `level` : `acquis` (dans le CV), `partiel`, `à préparer` (absent du CV) : à justifier honnêtement d'après le CV de base ;
      - `summary` : 1 à 2 phrases, affichées dans la page ;
      - `terms` (facultatif) : mots à retrouver dans l'offre (la page affiche la ligne de l'offre où il apparaît, mot surligné). Sans `terms`, le libellé est utilisé. Pour une fiche existante, ajouter ses termes dans la table `TERMS` de `outils/fiches/library.mjs` si l'offre les formule autrement ;
      - `cv` : lien avec le CV de l'utilisateur (ce qu'il a, ce qui manque) ;
      - `body` : HTML (`h2`, `p`, `ul`, `table`) avec un bloc de code `[[code\n…\n]]`, sections : définition, notions clés, exemple, bonnes pratiques, puis en dernier `<h2>Questions fréquentes</h2>` sous forme de questions **avec leurs réponses** : `<dl class="faq"><dt>Question ?</dt><dd>Réponse en 1 à 3 phrases, exacte.</dd>…</dl>` (3 à 4 questions). Contenu hors questions/réponses : 2 pages maximum. Pas de backtick ni de `${` dans le code. Contenu technique exact.
   d. Publier : `node outils/fiches/build.mjs --check id1,id2` (longueur, `TROP LONG` sinon raccourcir), puis `node outils/fiches/build.mjs --publish` (fiches dans Firestore) et `node outils/fiches/build.mjs --keywords <slug> id1,id2,…` (mots-clés de l'offre dans `applications/<slug>.keywords`).

4. **CV modifié (obligatoire, à chaque candidature)** : lancer le skill `modifier-cv` pour <slug> : copie de travail `outils/cv/<slug>.html` (modifs en jaune, ancien texte en rouge barré), `node outils/cv/build.mjs <slug>` (met `cv/<slug>` à jour dans Firestore, écrit `apercus_cv/<slug>.pdf` et `envoi/<Entreprise>/CV_*.pdf`), relecture du PDF d'aperçu et du CV propre. Ne pas laisser le CV de base brut.

5. **Vérifier** : `cd candidatures && pnpm exec tsc && pnpm exec vite build`. La page liste la candidature automatiquement (abonnement Firestore).

6. **Résumer** à l'utilisateur : candidature créée, mots-clés avec leur niveau (acquis / partiel / à préparer), points faibles du CV, modifs du CV à faire.

## Dans la page

- Le site lit et écrit Firestore en direct (déployé sur GitHub Pages, ouvert avec `?key=<secret>`), sans localStorage.
- Statut `étude` : la lettre et les modifs du CV sont modifiables dans la page ; elles sont écrites dans `message` et `cvChanges`.
- Le statut et les cases « CV vérifié » / « Lettre vérifiée » se changent dans la page et sont écrits dans `status` et `checks`.
- Supprimer une candidature = `db.mjs delete applications/<slug>` et `cv/<slug>`, puis supprimer `envoi/<Entreprise>/`.
- Les PDF à envoyer se génèrent en local : CV par `outils/cv/build.mjs`, lettre par `outils/cv/send.mjs <slug>` (dans `envoi/<Entreprise>/`).
