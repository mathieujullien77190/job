---
name: maintenir-base-connaissance
description: Créer ou modifier une fiche de la base de connaissance et garder sa fiche (HTML), son QCM et ses questions ouvertes à jour. A utiliser dès qu'une fiche (outils/fiches/docs-*.mjs) est ajoutée, étoffée, corrigée ou supprimée, ou quand l'utilisateur dit « modifie la fiche », « ajoute une fiche », « mets à jour la base de connaissance ».
---

# Maintenir la base de connaissance (fiche, PDF, QCM, questions ouvertes)

> **Données dans Firestore** (voir `CLAUDE.md`). Il n'y a plus de dossiers `envois/` ni `base/` : tout est lu et écrit avec `node outils/firebase/db.mjs` (`list <coll>`, `get <coll>/<id> [champ]`, `set` ou `merge <coll>/<id> <fichier.json>`, `put <coll>/<id> <champ> <fichier>`, `delete <coll>/<id>`). Pour modifier un document : `get` vers un fichier du dossier scratchpad, l'éditer (Edit/Write), puis `set` ou `merge`. Ne jamais écraser un champ écrit par la page (statut, `checks`, `message`, réponses) sans l'avoir relu juste avant.
> Anciens chemins → Firestore : `envois/<slug>/` (`candidature.json`, `offre.txt`, `resume.md`, `questions.md`, `modifs_cv.md`, `propositions_lettre/`, lettre, `DOC/keywords.json`) → `applications/<slug>` (champs `company`, `title`, `location`, `date`, `url`, `status`, `checks`, `details`, `offer`, `summary`, `questions`, `cvChanges`, `message`, `proposals`, `keywords`) ; `base/qcm/<id>.json` → `qcm/<id>` ; `base/questions_ouvertes/<id>.json` → `openQuestions/<id>` ; `base/reponses/<id>.json` → `answers/<id>` ; `base/entretien.md` → `meta/interview.text` ; `base/sites_recherche.json` → `meta/sites` ; `base/todo.json` → `meta/todos` ; fiches et PDF de `base/connaissances/` → `kb/<id>` (HTML) ; CV → `cv/base` et `cv/<slug>` (HTML annoté et propre).
> Il ne reste en local que `cv_base/` (CV de base en PDF), `envoi/<Entreprise>/` (CV et lettre en PDF à envoyer) et les copies de travail `outils/cv/<slug>.html` et `apercus_cv/` (hors git).

Racine : `C:\Users\User\Desktop\boulot`.

**Règle : une fiche, son QCM et ses questions ouvertes évoluent ensemble.** Toute modification du contenu d'une fiche impose de revoir ses questions dans la même intervention.

## Fichiers liés à une fiche `<id>`

```
outils/fiches/docs-triskell.mjs | docs-cnd.mjs | docs-extra.mjs   définition de la fiche (id, label, category, level, summary, cv, body)
outils/fiches/library.mjs                                          termes de recherche (TERMS) et garde-fou anti-doublon
Firestore kb/<id>                                                  fiche en HTML + texte de recherche (générée par build.mjs --publish, ne pas éditer à la main)
Firestore qcm/<id>                                                 QCM : 10 questions (20 pour react-typescript)
Firestore openQuestions/<id>                                       questions à réponse longue : 3 (6 pour react-typescript)
Firestore answers/<id>                                             réponses de l'utilisateur et corrections : NE PAS écraser
```

## Étapes

1. **Vérifier que la fiche n'existe pas déjà** (règle de `CLAUDE.md`) : chercher l'id et le libellé dans `docs-*.mjs`. Un sujet voisin = fiche existante à mettre à jour, pas à dupliquer.
2. **Écrire ou modifier la fiche** dans le bon `docs-*.mjs` (une nouvelle fiche va dans `docs-extra.mjs`) :
   - `body` en HTML (`h2`, `p`, `ul`, `table`, bloc de code `[[code\n…\n]]`), puis la section finale `<h2>Questions fréquentes</h2>` avec `<dl class="faq">` (questions avec réponses). Pas de backtick ni de `${` dans le body.
   - **Longueur : viser 2 pages de contenu** (jusqu'à 3 au plus), hors questions fréquentes. Une fiche d'une seule page est à étoffer (notions avancées, comparaisons, exemples, pièges, bonnes pratiques, mise en situation), sauf s'il n'y a vraiment rien d'autre à dire.
   - Contenu technique exact : ne rien affirmer dont on n'est pas sûr.
3. **Mettre à jour le QCM** (Firestore `qcm/<id>`, via `db.mjs get` puis `set`) :
   ```json
   { "id": "<id>", "questions": [ { "q": "…", "choices": ["A","B","C","D"], "answer": 2, "explain": "1 à 2 phrases." } ] }
   ```
   - 10 questions (20 pour `react-typescript`), 4 choix, `answer` = index 0 à 3 de l'unique bonne réponse.
   - Garder les questions qui restent valides ; corriger, remplacer ou ajouter pour refléter le contenu modifié (3 de base, 4 de compréhension ou comparaison, 3 de mise en situation).
   - Mauvais choix plausibles. **La bonne réponse ne doit pas être systématiquement la plus longue** ; varier sa position (la page mélange les choix à l'affichage).
   - Aucune question sur l'utilisateur, son CV ou une offre.
4. **Mettre à jour les questions ouvertes** (Firestore `openQuestions/<id>`) :
   ```json
   { "id": "<id>", "questions": [ { "id": "q1", "q": "…", "keyPoints": ["…", "…", "…"] } ] }
   ```
   - 3 questions `q1` à `q3` (explication d'un concept, comparaison ou choix argumenté, mise en situation) ; 6 pour `react-typescript` (`q4` à `q6`).
   - `keyPoints` (3 à 6) = grille de correction, jamais montrée avant la correction ; les mettre à jour avec le contenu de la fiche.
   - **Ne pas changer le sens d'une question déjà répondue** (voir Firestore `answers/<id>`) : si une question change, soit lui donner un nouvel id (`q4`…), soit prévenir l'utilisateur que sa réponse correspond à l'ancienne question. Ne jamais modifier ni supprimer `answers/`.
5. **Termes de recherche** : si l'offre ou la fiche emploie d'autres mots, ajouter des `terms` (champ `terms` de la fiche, ou table `TERMS` de `library.mjs` pour les fiches de `docs-cnd`/`docs-triskell`).
6. **Mesurer puis publier** : `node outils/fiches/build.mjs --check <id>` affiche le nombre de pages de la fiche (`TROP LONG` = plus de 3 pages de contenu : raccourcir) ; `node outils/fiches/build.mjs --publish` envoie toutes les fiches dans Firestore (`kb/<id>`), la page les affiche aussitôt. Pour lier des fiches à une candidature : `node outils/fiches/build.mjs --keywords <slug> id1,id2,…`.
7. **Vérifier** :
   - la fiche fait 2 pages (3 au plus) hors questions fréquentes ; sinon l'étoffer ;
   - les documents `qcm/<id>` (10 questions à 4 choix, `answer` entre 0 et 3) et `openQuestions/<id>` (3 questions, 6 pour react-typescript) relus avec `db.mjs get` sont valides ;
   - `cd candidatures && pnpm exec tsc && pnpm exec vite build`.
8. **Résumer** : fiches modifiées, pages avant et après, questions ajoutées ou changées, et rappeler à l'utilisateur de redemander « valide mes réponses » si une question ouverte déjà répondue a changé.

## Supprimer une fiche

Retirer l'objet de `docs-*.mjs`, puis `db.mjs delete kb/<id>`, `qcm/<id>` et `openQuestions/<id>`, et relancer `build.mjs --publish`. Ne pas supprimer `answers/<id>` sans demander à l'utilisateur.

## Règles

- Les fiches vivent uniquement dans Firestore (`kb/<id>`) : aucun PDF stocké.
- Commits : seulement sur demande, en anglais, sans mention d'assistant (voir `CLAUDE.md`).
