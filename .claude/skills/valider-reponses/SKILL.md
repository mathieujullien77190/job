---
name: valider-reponses
description: Valider et corriger les réponses longues du QCM (boutons « Questions ouvertes » des fiches de la base de connaissance du site). A utiliser quand l'utilisateur dit « valide mes réponses », « corrige mes réponses », « corrige mon QCM » ou veut de nouvelles questions ouvertes pour une fiche.
---

# Valider et corriger les réponses longues

> **Données dans Firestore** (voir `CLAUDE.md`). Il n'y a plus de dossiers `envois/` ni `base/` : tout est lu et écrit avec `node outils/firebase/db.mjs` (`list <coll>`, `get <coll>/<id> [champ]`, `set` ou `merge <coll>/<id> <fichier.json>`, `put <coll>/<id> <champ> <fichier>`, `delete <coll>/<id>`). Pour modifier un document : `get` vers un fichier du dossier scratchpad, l'éditer (Edit/Write), puis `set` ou `merge`. Ne jamais écraser un champ écrit par la page (statut, `checks`, `message`, réponses) sans l'avoir relu juste avant.
> Anciens chemins → Firestore : `envois/<slug>/` (`candidature.json`, `offre.txt`, `resume.md`, `questions.md`, `modifs_cv.md`, `propositions_lettre/`, lettre, `DOC/keywords.json`) → `applications/<slug>` (champs `company`, `title`, `location`, `date`, `url`, `status`, `checks`, `details`, `offer`, `summary`, `questions`, `cvChanges`, `message`, `proposals`, `keywords`) ; `base/qcm/<id>.json` → `qcm/<id>` ; `base/questions_ouvertes/<id>.json` → `openQuestions/<id>` ; `base/reponses/<id>.json` → `answers/<id>` ; `base/entretien.md` → `meta/interview.text` ; `base/sites_recherche.json` → `meta/sites` ; `base/todo.json` → `meta/todos` ; fiches et PDF de `base/connaissances/` → `kb/<id>` (HTML) ; CV → `cv/base` et `cv/<slug>` (HTML annoté et propre).
> Il ne reste en local que `cv_base/` (CV de base en PDF), `envoi/<Entreprise>/` (CV et lettre en PDF à envoyer) et les copies de travail `outils/cv/<slug>.html` et `apercus_cv/` (hors git).

Racine : `C:\Users\User\Desktop\boulot`.

Le site (base de connaissance, bouton « Questions ouvertes » sous chaque fiche) pose des questions à réponse longue par fiche de la base de connaissance. L'utilisateur écrit sa réponse dans la page ; elle est enregistrée dans Firestore. Ce skill corrige ces réponses quand l'utilisateur le demande.

## Fichiers

```
Firestore openQuestions/<fiche>         questions : { id: "<fiche>", questions: [{ id: "q1", q, keyPoints: [...] }] }
Firestore answers/<fiche>               réponses : { id: "<fiche>", answers: { "q1": { text, savedAt, review? } } }
Firestore qcm/<fiche>                      QCM (choix multiples) : pas concerné par ce skill
```

- `keyPoints` = grille de correction (jamais montrée dans la page avant la correction).
- `text` et `savedAt` sont écrits par la page. **Ne jamais modifier `text` ni `savedAt`** : c'est la réponse de l'utilisateur.
- `review` est écrit par toi uniquement :
  ```json
  "review": {
    "status": "correct | partiel | incorrect",
    "feedback": "Ce qui est juste, ce qui manque ou est faux, en français, précis et bienveillant (3 à 6 phrases).",
    "improved": "Réponse modèle courte (facultatif, 4 à 8 phrases), qui reprend ses bonnes idées.",
    "reviewedAt": "2026-10-13T10:00:00.000Z"
  }
  ```

## Valider (« valide mes réponses »)

1. Lister les documents `answers` (`db.mjs list answers`, puis `db.mjs get answers/<fiche>`). Une réponse est **à valider** si `text` n'est pas vide et que `review` est absent, ou que `savedAt` est plus récent que `review.reviewedAt` (réponse modifiée depuis la correction).
2. Pour chaque réponse à valider, lire la question et ses `keyPoints` dans `openQuestions/<fiche>` (et au besoin la fiche : `outils/fiches/docs-*.mjs`, id de la fiche).
3. Comparer la réponse aux `keyPoints` :
   - `correct` : l'essentiel des points est présent et exact ;
   - `partiel` : une partie des points, ou imprécisions ;
   - `incorrect` : points essentiels absents ou erreurs de fond.
   Juger le fond, pas l'orthographe ni le style (sauf pour la fiche `anglais-technique`, où la langue compte).
4. Écrire `feedback` (ce qui est bien, ce qui manque avec les points manquants nommés, ce qui est faux et pourquoi) et `improved` si la réponse est `partiel` ou `incorrect`. Rester exact techniquement : ne rien affirmer dont on n'est pas sûr.
5. Écrire `review` dans `answers/<fiche>` en gardant le reste du document intact : `db.mjs get answers/<fiche>` vers un fichier, ajouter `review` à la réponse, puis `db.mjs set answers/<fiche> <fichier>` (relire juste avant : l'utilisateur a pu modifier une réponse entre-temps). `reviewedAt` = date et heure courantes (ISO).
6. Ne pas toucher aux réponses vides ni à celles déjà corrigées et inchangées, sauf demande explicite (« re-corrige tout »).
7. Résumer à l'utilisateur : nombre de réponses corrigées, statuts par fiche, les 2 ou 3 points les plus utiles à revoir. La page se met à jour toute seule.

L'utilisateur peut aussi demander la correction d'une seule fiche ou d'une seule question, ou coller une réponse dans la conversation : appliquer la même grille et écrire le résultat dans le document correspondant s'il s'agit d'une question existante.

## Ajouter des questions (« ajoute des questions ouvertes pour <fiche> »)

1. Lire la fiche (`outils/fiches/docs-*.mjs`, id) et `openQuestions/<fiche>` pour ne pas répéter les questions existantes.
2. Ajouter des questions avec les ids suivants (`q4`, `q5`…), de types variés (explication d'un concept, comparaison ou choix argumenté, mise en situation), chacune avec 3 à 6 `keyPoints` précis.
3. Contenu technique exact ; aucune question sur le CV ni sur une offre.

Pour le QCM à choix multiples (`qcm/<fiche>`) : 4 choix, `answer` = index de la bonne réponse, `explain` en 1 ou 2 phrases ; la page mélange les choix à l'affichage. Veiller à ce que la bonne réponse ne soit pas systématiquement la plus longue.

## Règles

- Ne jamais écrire ni modifier la réponse de l'utilisateur.
- Aucun localStorage : tout est dans Firestore.
- Ne pas committer sauf demande, et sans mention d'assistant (voir `CLAUDE.md`).
