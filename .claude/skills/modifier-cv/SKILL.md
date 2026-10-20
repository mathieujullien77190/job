---
name: modifier-cv
description: Produire le CV adapté à une candidature (exactement les modifications de cvChanges, en jaune dans l'aperçu), relire le résultat pour corriger les erreurs, générer les PDF (CV et lettre) puis mettre à jour le statut. A utiliser quand l'utilisateur dit "modifie le CV pour <entreprise>", "applique les modifs du CV", "génère le CV de <entreprise>", "prépare le CV à envoyer", ou quand une candidature en statut étude a des modifs de CV à appliquer.
---

# Modifier le CV d'une candidature

> **Données dans Firestore** (voir `CLAUDE.md`). Le CV est du HTML dans Firestore : `cv/base` (CV de base, champ `html`) et `cv/<slug>` (champs `annotated` et `clean`). Les modifs demandées sont dans `applications/<slug>.cvChanges`. Lire et écrire avec `node outils/firebase/db.mjs`. En local : copie de travail `outils/cv/<slug>.html` et `apercus_cv/<slug>.pdf` (hors git), PDF à envoyer dans `envoi/<Entreprise>/`.

Entrée : le slug de la candidature (ex. `cnd`). Racine : `C:\Users\User\Desktop\boulot`.
Le CV de référence est `cv/base` dans Firestore (PDF : `cv_base/CV_base.pdf`, régénéré par `node outils/cv/build-base.mjs`), jamais modifié.

## Règles

- Appliquer **exactement** les modifications de `cvChanges`, ni plus ni moins. Rien n'est supprimé du CV de base, sauf ce qu'un remplacement (`<del>` / `<mark>`) remplace.
- Ne rien inventer : seulement des faits présents dans le CV de base. Les éléments marqués « à combler », « seulement si pratiqué » ou « si vrai » dans `cvChanges` ne sont PAS appliqués, sauf si l'utilisateur confirme dans la conversation que c'est vrai.
- `cvChanges` peut avoir été modifié dans la page : toujours le relire dans Firestore (`db.mjs get applications/<slug> cvChanges`) avant de commencer.
- Les aperçus colorés vont dans `apercus_cv/` (jamais dans `envoi/`). Le seul CV dans `envoi/<Entreprise>/` est le CV propre.
- Avant de créer un fichier, vérifier s'il existe déjà (`outils/cv/<slug>.html`, `envoi/<Entreprise>/CV_*.pdf`) et le mettre à jour plutôt que le dupliquer.

## Étapes

1. **Lire** `applications/<slug>` : `cvChanges`, `status`, `company`.

2. **Copie de travail annotée** `outils/cv/<slug>.html` : si absente, `node outils/cv/build.mjs <slug>` la crée (depuis `cv/<slug>.annotated`, sinon depuis le CV de base) ; la modifier ensuite. Y appliquer chaque modification avec ces conventions (elles pilotent le script) :
   - remplacement : `<del>ancien texte</del> <mark>nouveau texte</mark>` ;
   - ajout en milieu ou fin de phrase : `<mark>texte ajouté</mark>` ;
   - ligne ou puce entièrement nouvelle : `<li><mark>…</mark></li>` ;
   - ligne d'une liste de compétences nouvelle : `<li><mark><b>Libellé :</b> …</mark></li>` ;
   - **proposition en vert** (pas encore validée par l'utilisateur) : `<ins>texte proposé</ins>` ; visible en vert dans l'aperçu, ignorée dans le CV à envoyer. Quand l'utilisateur valide, remplacer `<ins>` par `<mark>` (et mettre `cvChanges` à jour) ;
   - annotation lisible seulement dans l'aperçu : `<span class="note">(ligne ajoutée)</span>` ;
   - déplacement d'un bloc (ex. un projet remonté en premier) : déplacer le bloc HTML et ajouter une note `↑ remonté en premier (était en dernier)`.
   Ne jamais mettre `<mark>` autour de texte inchangé.

3. **Générer** depuis `C:\Users\User\Desktop\boulot` : `node outils/cv/build.mjs <slug>`.
   Le script (Chrome headless) écrit `cv/<slug>` dans Firestore (`annotated` et `clean` : la page affiche l'aperçu et le CV à envoyer), `apercus_cv/<slug>.pdf` (annoté, jaune et rouge barré) et `envoi/<Entreprise>/CV_*.pdf` (propre : nouveau texte seul). Il échoue s'il reste une annotation dans le CV propre.

4. **Relire le résultat (obligatoire)** : lire avec Read le PDF d'aperçu ET le CV propre, puis vérifier point par point :
   - chaque modification de `cvChanges` est présente, en jaune dans l'aperçu et sans couleur dans le CV propre ;
   - le CV propre ne contient aucune couleur, aucun texte barré, aucune note ;
   - rien d'autre n'a changé par rapport au CV de base (aucune ligne perdue, aucun mot déplacé, ordre des sections conservé hors déplacement demandé) ;
   - orthographe, accents, ponctuation, doubles espaces, majuscules, cohérence des termes ;
   - aucune information fausse ou non présente dans le CV de base ;
   - mise en page : pas de titre de section seul en bas de page, pas de dernière page presque vide (si c'est le cas, ajuster le CSS de `outils/cv/<slug>.html`, par exemple taille de police ou marges, sans toucher au contenu).
   **Corriger** dans `outils/cv/<slug>.html`, relancer l'étape 3, relire de nouveau. Répéter jusqu'à ce qu'il n'y ait plus d'erreur.

5. **Statut** (`applications/<slug>.status`) :
   - la page affiche automatiquement le badge « CV modifié » (comparaison avec `cv/base`) : rien à faire ;
   - si l'utilisateur dit que la candidature est envoyée : `db.mjs merge applications/<slug> <fichier>` avec `{ "status": "envoyée", "date": "<date du jour>" }` ;
   - sinon laisser `étude` et le dire clairement ;
   - le statut est le même qu'il soit changé dans la page ou avec `db.mjs`.

   **Dossier d'envoi** : une fois le CV relu et la lettre prête (`message` dans Firestore), lancer `node outils/cv/send.mjs <slug>`. Il ajoute la lettre en PDF (une page) dans `envoi/<Entreprise>/`, à côté du CV, et prévient si « CV vérifié » ou « Lettre vérifiée » ne sont pas cochées (cases `checks`, que seul l'utilisateur coche). Relire le PDF de la lettre (une seule page, objet correct).

6. **Vérifier le site** : `cd candidatures && pnpm exec tsc && pnpm exec vite build`.

7. **Résumer** : modifications appliquées (liste courte), ce qui n'a pas été appliqué et pourquoi (« à combler »), corrections faites à la relecture, nombre de pages, statut final.

## Fichiers

```
Firestore cv/base                  CV de base sans annotation (champ html)
Firestore cv/<slug>                annotated (aperçu) et clean (CV à envoyer)
outils/cv/<slug>.html              copie de travail annotée (hors git)
outils/cv/build.mjs                écrit Firestore + aperçu + CV propre
outils/cv/build-base.mjs           régénère cv_base/CV_base.pdf depuis cv/base
apercus_cv/<slug>.pdf              aperçu annoté (ne pas envoyer)
envoi/<Entreprise>/CV_*.pdf        CV propre à envoyer
envoi/<Entreprise>/Lettre_motivation_*.pdf   lettre en PDF (node outils/cv/send.mjs)
```
