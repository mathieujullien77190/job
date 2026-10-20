import { docs as tk } from './docs-triskell.mjs'

const reuse = (...ids) => ids.map((id) => tk.find((d) => d.id === id))

const own = [
  {
    id: 'accessibilite',
    label: 'Accessibilité web (RGAA / WCAG)',
    category: 'Exigence forte du poste',
    level: 'à préparer',
    summary: 'Concevoir des interfaces utilisables par tous, y compris avec un handicap (vue, motricité, audition, cognition). Obligatoire pour les services publics via le RGAA.',
    cv: 'L’accessibilité n’est pas dans ton CV alors que l’offre la cite deux fois et que c’est une obligation légale dans le secteur public. Point à travailler en priorité : lis le RGAA, teste avec un lecteur d’écran et prépare un exemple.',
    body: `
<h2>Les référentiels</h2>
<ul>
<li><b>WCAG</b> (W3C) : standard international, niveaux A, AA, AAA. Quatre principes : <b>perceptible, utilisable, compréhensible, robuste</b>.</li>
<li><b>RGAA</b> : référentiel français pour l’accessibilité (obligatoire pour les services publics), basé sur WCAG 2.x niveau AA. Environ 100 critères regroupés en 13 thématiques (images, couleurs, formulaires, navigation, tableaux…).</li>
<li><b>Déclaration d’accessibilité</b> publiée par l’organisme, avec le taux de conformité.</li>
</ul>
<h2>Les réflexes techniques</h2>
<ul>
<li><b>HTML sémantique d’abord</b> : <code>button</code>, <code>a</code>, <code>label</code>, titres hiérarchisés (<code>h1</code> à <code>h6</code>), landmarks (<code>main</code>, <code>nav</code>).</li>
<li><b>Clavier</b> : tout est utilisable sans souris, ordre de tabulation logique, focus visible, aucun piège clavier. Gérer le focus à l’ouverture/fermeture d’une modale.</li>
<li><b>Alternatives textuelles</b> : <code>alt</code> sur les images (vide si décorative).</li>
<li><b>Contrastes</b> : texte normal ≥ 4,5:1, grand texte ≥ 3:1. Ne jamais transmettre une information par la couleur seule.</li>
<li><b>Formulaires</b> : <code>label</code> associé à chaque champ, erreurs explicites et annoncées.</li>
<li><b>ARIA</b> en dernier recours (<code>role</code>, <code>aria-label</code>, <code>aria-live</code> pour les mises à jour dynamiques). « Pas d’ARIA vaut mieux que du mauvais ARIA ».</li>
<li><b>Responsive et zoom</b> : lisible à 200 % et en petit écran, respect de <code>prefers-reduced-motion</code>.</li>
</ul>
[[code
<button aria-expanded={open} aria-controls="menu" onClick={toggle}>
  Menu
</button>
<ul id="menu" hidden={!open}>...</ul>
<p role="status" aria-live="polite">{count} résultats</p>
]]
<h2>Outils de contrôle</h2>
<ul>
<li>Automatiques (détectent ~30-40 % des problèmes) : <b>axe DevTools</b>, Lighthouse, <code>eslint-plugin-jsx-a11y</code>, <code>jest-axe</code>, <code>@axe-core/playwright</code>.</li>
<li>Manuels : navigation clavier seule, lecteur d’écran (NVDA, VoiceOver), zoom 200 %.</li>
<li>Intégrer l’audit à la CI et au design system (composants accessibles par défaut).</li>
</ul>
<h2>Niveaux de conformité et obligations</h2>
<ul>
<li><b>A</b> : minimum vital (ex. alternative textuelle, accès au clavier). <b>AA</b> : niveau visé par le RGAA et la loi (contraste 4,5:1, redimensionnement du texte, étiquettes de formulaire). <b>AAA</b> : niveau le plus exigeant, rarement exigé en totalité.</li>
<li>En France, l’obligation découle de la loi de 2005 et de la directive européenne sur l’accessibilité des sites publics ; l’<b>European Accessibility Act</b> étend l’exigence à une partie du secteur privé.</li>
<li>Une application est « totalement conforme », « partiellement conforme » ou « non conforme » selon le taux de critères respectés, mesuré sur un échantillon de pages représentatif. La <b>déclaration d’accessibilité</b>, le schéma pluriannuel et un moyen de contact pour les usagers sont publiés.</li>
<li>Les <b>dérogations</b> (charge disproportionnée) doivent être justifiées et ne dispensent pas de proposer une alternative accessible.</li>
</ul>
<h2>Les quatre principes en pratique</h2>
<table><tr><th>Principe</th><th>Question à se poser</th><th>Exemples de critères</th></tr>
<tr><td><b>Perceptible</b></td><td>L’information peut-elle être perçue par tous les sens disponibles ?</td><td>Alternatives textuelles, sous-titres, contrastes, pas d’information par la couleur seule</td></tr>
<tr><td><b>Utilisable</b></td><td>Peut-on naviguer et agir sans souris, sans limite de temps abusive ?</td><td>Clavier complet, focus visible, liens d’évitement, pas de clignotement dangereux</td></tr>
<tr><td><b>Compréhensible</b></td><td>Le contenu et le comportement sont-ils prévisibles ?</td><td>Langue de la page (<code>lang</code>), libellés clairs, aide à la saisie, messages d’erreur explicites</td></tr>
<tr><td><b>Robuste</b></td><td>Les technologies d’assistance interprètent-elles correctement le code ?</td><td>HTML valide, nom, rôle et valeur des composants, messages de statut annoncés</td></tr></table>
<h2>Gestion du focus et composants dynamiques</h2>
<ul>
<li><b>Navigation dans une SPA</b> : un changement de route ne recharge pas la page, donc le lecteur d’écran ne l’annonce pas. Déplacer le focus vers le titre principal (<code>h1</code> avec <code>tabIndex=-1</code>) ou une région annoncée, et mettre à jour le <code>title</code> du document.</li>
<li><b>Lien d’évitement</b> (« Aller au contenu ») en première position, visible au focus.</li>
<li><b>Focus visible</b> : ne jamais faire <code>outline: none</code> sans équivalent ; préférer <code>:focus-visible</code>.</li>
<li><b>Widgets complexes</b> (onglets, menu, combobox) : suivre les motifs de l’ARIA Authoring Practices (flèches, Début/Fin, Échap) ou utiliser des briques éprouvées (Radix, React Aria).</li>
<li><b>Messages dynamiques</b> : <code>aria-live</code> poli pour les confirmations, <code>role="alert"</code> pour les erreurs bloquantes ; la région live doit exister dans le DOM avant que son contenu change.</li>
</ul>
[[code
<label htmlFor="mail">Courriel</label>
<input id="mail" type="email" autoComplete="email"
  aria-invalid={!!error} aria-describedby={error ? 'mail-err' : undefined} />
{error && <p id="mail-err" role="alert">{error}</p>}
]]
<h2>Erreurs fréquentes</h2>
<ul>
<li><code>div</code> ou <code>span</code> cliquable au lieu d’un <code>button</code> : pas de focus, pas de touche Entrée ni Espace, pas de rôle.</li>
<li><code>placeholder</code> utilisé à la place d’un <code>label</code> (disparaît à la saisie, contraste souvent insuffisant).</li>
<li><code>aria-label</code> qui contredit le texte visible : le nom accessible doit contenir le texte affiché (critère « label in name »).</li>
<li>Titres choisis pour leur taille et non pour la structure (saut de <code>h2</code> à <code>h5</code>).</li>
<li>Icône seule sans nom accessible, lien « cliquez ici » sans contexte.</li>
<li>Modale qui laisse le focus derrière elle, ou carrousel qui défile sans bouton pause.</li>
<li>Désactiver le zoom (<code>user-scalable=no</code>) ou verrouiller l’orientation.</li>
</ul>
<h2>Intégrer l’accessibilité au cycle de développement</h2>
<ul>
<li><b>Dès la conception</b> : maquettes avec contrastes vérifiés, états de focus et d’erreur dessinés, textes alternatifs prévus.</li>
<li><b>Dans le design system</b> : composants accessibles par défaut, documentés avec leurs interactions clavier.</li>
<li><b>Définition de terminé</b> : navigation clavier et passage axe font partie des critères d’acceptation d’un ticket.</li>
<li><b>Audit</b> : un expert vérifie un échantillon de pages selon la méthode du RGAA ; les écarts alimentent un plan de correction priorisé par impact utilisateur.</li>
<li><b>Mise en situation</b> : si un formulaire est signalé inutilisable au lecteur d’écran, vérifier dans l’ordre les libellés associés, l’ordre du DOM, les erreurs annoncées, puis rejouer avec NVDA ou VoiceOver avant de corriger.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Comment rends-tu une modale accessible ?</dt><dd>Rôle <code>dialog</code> avec <code>aria-modal</code> et un titre lié par <code>aria-labelledby</code>, focus déplacé dans la modale à l’ouverture et rendu à l’élément déclencheur à la fermeture, focus piégé à l’intérieur, fermeture par Échap, et contenu de la page masqué aux lecteurs d’écran (<code>inert</code>).</dd>
<dt>Quelle différence entre RGAA et WCAG ?</dt><dd>WCAG est le standard international du W3C, avec des niveaux A, AA, AAA. Le RGAA est le référentiel français, obligatoire pour les services publics : il reprend WCAG niveau AA sous forme de critères et de tests précis.</dd>
<dt>Quand utiliser ARIA et quand l’éviter ?</dt><dd>Les règles d’ARIA disent de préférer un élément HTML natif quand il existe (un <code>button</code> plutôt qu’un <code>div role="button"</code>). ARIA sert à compléter la sémantique pour des composants que HTML ne fournit pas (onglets, combobox) ou pour annoncer des mises à jour dynamiques ; il n’ajoute aucun comportement clavier, qu’il faut coder soi-même.</dd>
<dt>Comment gères-tu le focus lors d’un changement de page dans une SPA ?</dt><dd>On déplace le focus vers le titre principal ou un conteneur annoncé, on met à jour le titre du document, et on évite de laisser le focus sur un lien qui a disparu du DOM.</dd>
<dt>Comment testes-tu l’accessibilité dans la pipeline ?</dt><dd>Lint <code>eslint-plugin-jsx-a11y</code>, <code>jest-axe</code> sur les composants, <code>@axe-core/playwright</code> sur les parcours e2e. Ces outils ne voient qu’une partie des problèmes : on garde des tests manuels au clavier et au lecteur d’écran.</dd>
</dl>`,
  },
  {
    id: 'e2e',
    label: 'Tests e2e (Playwright / Cypress)',
    category: 'Qualité & livraison',
    level: 'à préparer',
    summary: 'Tests de bout en bout : un navigateur automatisé joue les parcours utilisateur réels sur l’application complète.',
    cv: 'Tu as Jest et Jasmine (unitaires), pas d’outil e2e dans ton CV alors que l’offre cite Cypress et Playwright. Fais un petit projet Playwright (une heure suffit) pour pouvoir en parler.',
    body: `
<h2>Principe</h2>
<p>Un test e2e pilote un vrai navigateur (Chromium, Firefox, WebKit) : il ouvre l’application, clique, saisit, vérifie ce qui s’affiche. Il valide l’ensemble : front, API, parcours. Plus lent et plus fragile que l’unitaire : à réserver aux <b>parcours critiques</b> (connexion, création, paiement).</p>
<h2>Playwright vs Cypress</h2>
<table><tr><th></th><th>Playwright (Microsoft)</th><th>Cypress</th></tr>
<tr><td>Navigateurs</td><td>Chromium, Firefox, WebKit</td><td>Chromium, Firefox, WebKit (expérimental)</td></tr>
<tr><td>Exécution</td><td>Hors du navigateur, multi-onglets possible</td><td>Dans le navigateur</td></tr>
<tr><td>Parallélisme</td><td>Natif, gratuit</td><td>Plus limité (service payant)</td></tr>
<tr><td>Débogage</td><td>Trace viewer, vidéo, captures</td><td>Time-travel dans l’interface</td></tr>
<tr><td>Langage</td><td>TS/JS, Python, Java, .NET</td><td>JS/TS</td></tr></table>
[[code
import { test, expect } from '@playwright/test'

test('un utilisateur dépose une annonce', async ({ page }) => {
  await page.goto('/deposer')
  await page.getByLabel('Titre').fill('T2 lumineux')
  await page.getByRole('button', { name: 'Publier' }).click()
  await expect(page.getByText('Annonce publiée')).toBeVisible()
})
]]
<h2>Bonnes pratiques</h2>
<ul>
<li><b>Sélecteurs robustes</b> : par rôle ou texte accessible (<code>getByRole</code>), sinon <code>data-testid</code>. Pas de classes CSS.</li>
<li><b>Attentes automatiques</b> plutôt que des <code>sleep</code> ; assertions « web-first » qui réessaient.</li>
<li><b>Isoler les tests</b> : données propres à chaque test, API simulée (<code>page.route</code>) ou environnement dédié.</li>
<li><b>En CI</b> : exécution en headless, parallèle, rapports et traces conservés comme artefacts, relance limitée des tests instables.</li>
<li>Couplage avec l’accessibilité : <code>@axe-core/playwright</code>.</li>
<li>Pyramide de tests : beaucoup d’unitaires, quelques tests d’intégration, peu d’e2e.</li>
</ul>
<h2>Localisateurs et assertions</h2>
<ul>
<li><b>Ordre de préférence</b> : <code>getByRole</code> (nom accessible), <code>getByLabel</code>, <code>getByText</code>, <code>getByTestId</code> en dernier recours. Un test qui trouve ses éléments par rôle vérifie en même temps l’accessibilité de base.</li>
<li><b>Localisateurs paresseux</b> : <code>page.getByRole(...)</code> ne cherche l’élément qu’au moment de l’action ou de l’assertion, ce qui évite les références périmées.</li>
<li><b>Assertions web-first</b> : <code>expect(locator).toBeVisible()</code>, <code>toHaveText()</code>, <code>toHaveURL()</code> réessaient jusqu’au délai d’expiration. À l’inverse, <code>expect(await locator.isVisible())</code> évalue une seule fois et devient instable.</li>
<li><b>Actions</b> : Playwright attend que l’élément soit visible, stable et actif avant de cliquer (auto-waiting) ; Cypress réessaie aussi les commandes de requête.</li>
</ul>
<h2>Configuration et organisation</h2>
[[code
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html'], ['list']],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: { command: 'pnpm dev', url: 'http://localhost:5173', reuseExistingServer: !process.env.CI },
})
]]
<ul>
<li><b>Projets</b> : un même test s’exécute sur plusieurs navigateurs et tailles d’écran (desktop, mobile émulé).</li>
<li><b>webServer</b> démarre l’application avant les tests ; <b>baseURL</b> permet d’écrire <code>page.goto('/deposer')</code>.</li>
<li><b>Page Object Model</b> : une classe par page ou composant qui encapsule les localisateurs et les actions (<code>loginPage.seConnecter(email, mdp)</code>) pour éviter la duplication ; à garder léger.</li>
<li><b>Fixtures</b> : mécanisme de Playwright pour fournir un contexte prêt (utilisateur connecté, données créées) à chaque test, avec nettoyage automatique.</li>
</ul>
<h2>Authentification, données et réseau</h2>
[[code
// auth.setup.ts : connexion une fois, état sauvegardé
setup('connexion', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Courriel').fill('test@exemple.fr')
  await page.getByLabel('Mot de passe').fill(process.env.E2E_PASSWORD!)
  await page.getByRole('button', { name: 'Se connecter' }).click()
  await page.context().storageState({ path: '.auth/user.json' })
})

// dans un test : simuler une erreur de l'API
await page.route('**/api/annonces', (route) => route.fulfill({ status: 500 }))
]]
<ul>
<li>Réutiliser l’état d’authentification (<code>storageState</code>) ; ne jamais commiter de mots de passe, les lire dans l’environnement.</li>
<li><b>Simuler le réseau</b> pour couvrir les cas d’erreur difficiles à provoquer (500, lenteur, liste vide). Pour les parcours critiques, préférer un vrai back-end de test afin de valider l’intégration réelle.</li>
<li><b>Données de test</b> : créées par l’API avant le test et supprimées après, plutôt que partagées entre tests.</li>
</ul>
<h2>Diagnostiquer un échec</h2>
<ul>
<li><b>Trace viewer</b> (Playwright) : chronologie des actions, captures avant/après, requêtes réseau, console ; ouvrir avec <code>npx playwright show-trace</code>.</li>
<li><b>Mode UI et débogueur</b> : <code>--ui</code> et <code>--debug</code> pour rejouer pas à pas ; <code>codegen</code> pour enregistrer un parcours et récupérer des localisateurs.</li>
<li><b>Cypress</b> : exécuteur interactif avec voyage dans le temps, vidéos et captures en mode CI.</li>
<li>Causes classiques d’instabilité : attente d’un état au lieu d’un élément, animations, dépendance à l’heure ou à l’aléatoire, données partagées, serveur de test lent.</li>
</ul>
<h2>En CI et dans la stratégie de test</h2>
<ul>
<li><b>Sharding</b> : répartir les tests sur plusieurs machines (<code>--shard=1/4</code>) pour garder un temps de pipeline court.</li>
<li>Conserver rapports, traces et vidéos des échecs comme artefacts ; ne relancer automatiquement qu’un nombre limité de fois et suivre les tests « flaky » pour les corriger plutôt que les ignorer.</li>
<li><b>Tests visuels</b> : <code>toHaveScreenshot()</code> compare des captures ; utile mais sensible au rendu (polices, systèmes), à exécuter dans un conteneur fixe.</li>
<li><b>Mise en situation</b> : un test e2e échoue une fois sur dix en CI. Ouvrir la trace de l’échec, repérer l’attente manquante ou la donnée partagée, corriger la cause plutôt que d’augmenter les relances.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Comment éviter les tests instables ?</dt><dd>Sélecteurs par rôle ou texte plutôt que par CSS, attentes automatiques (jamais de <code>sleep</code>), données propres à chaque test, API externes simulées, et tests indépendants de l’ordre d’exécution.</dd>
<dt>Que couvres-tu en e2e et que laisses-tu à l’unitaire ?</dt><dd>E2E : les parcours critiques de bout en bout (connexion, création, paiement), peu nombreux. Unitaire et intégration : la logique, les cas limites, les états d’erreur, beaucoup plus nombreux et rapides.</dd>
<dt>Faut-il simuler l’API ou utiliser un vrai back-end ?</dt><dd>Les deux, selon l’objectif : un back-end réel de test pour les quelques parcours critiques (valide l’intégration), des réponses simulées avec <code>page.route</code> pour les cas d’erreur et les cas limites, rapides et déterministes.</dd>
<dt>À quoi sert le trace viewer ?</dt><dd>À comprendre un échec après coup, surtout en CI : il rejoue la chronologie des actions avec captures, requêtes réseau et console, sans avoir à reproduire localement.</dd>
<dt>Comment gères-tu l’authentification dans les tests ?</dt><dd>On se connecte une fois dans un script de préparation, on sauvegarde l’état (cookies, storage) et chaque test le réutilise, plutôt que de rejouer le formulaire de connexion à chaque fois.</dd>
</dl>`,
  },
  {
    id: 'rest-graphql',
    label: 'APIs REST / GraphQL',
    category: 'Échanges avec le back-end',
    level: 'partiel',
    summary: 'Deux styles d’API pour échanger avec le serveur : REST (ressources + verbes HTTP) et GraphQL (une requête décrit exactement les données voulues).',
    cv: 'REST, BFF et Next.js Route Handlers sont dans ton CV. GraphQL n’y est pas : l’offre accepte « REST ou GraphQL », donc ce n’est pas bloquant. Retiens les différences ci-dessous.',
    body: `
<h2>REST</h2>
<ul>
<li>Des <b>ressources</b> à des URL (<code>/annonces/42</code>) et des <b>verbes HTTP</b> : GET lire, POST créer, PUT/PATCH modifier, DELETE supprimer.</li>
<li><b>Codes de statut</b> : 200, 201, 204, 400, 401, 403, 404, 409, 422, 500. Gérer chaque famille côté front.</li>
<li>Cache HTTP natif (<code>ETag</code>, <code>Cache-Control</code>), pagination, filtres en query string.</li>
<li>Inconvénients : <i>over-fetching</i> (trop de champs), <i>under-fetching</i> (plusieurs requêtes pour un écran).</li>
</ul>
<h2>GraphQL</h2>
<ul>
<li>Un <b>endpoint unique</b>, un <b>schéma typé</b> ; le client demande précisément les champs voulus.</li>
<li><b>Query</b> (lecture), <b>Mutation</b> (écriture), <b>Subscription</b> (temps réel).</li>
<li>Clients : Apollo Client, urql, TanStack Query + <code>graphql-request</code>. Génération des types TypeScript avec <code>graphql-codegen</code>.</li>
<li>Inconvénients : cache HTTP moins simple, risque de requêtes coûteuses (limiter profondeur et complexité), erreurs avec statut 200.</li>
</ul>
[[code
query Annonce($id: ID!) {
  annonce(id: $id) {
    titre
    loyer
    candidats { nom statut }
  }
}
]]
<h2>Côté front, dans les deux cas</h2>
<ul>
<li><b>Typer</b> les réponses (et valider avec <code>zod</code> si la source n’est pas fiable).</li>
<li><b>États</b> de chargement, d’erreur et de vide dans chaque écran ; <code>AbortController</code> pour annuler.</li>
<li><b>Cache de données serveur</b> avec TanStack Query ou RTK Query ; mises à jour optimistes.</li>
<li><b>Authentification</b> : jeton en cookie <code>HttpOnly</code> plutôt que <code>localStorage</code> ; gestion du 401 (rafraîchissement, redirection).</li>
<li><b>BFF</b> : couche serveur qui agrège et adapte les API pour l’interface.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>REST ou GraphQL, comment choisir ?</dt><dd>REST quand les ressources sont simples, que le cache HTTP compte et que les clients sont variés. GraphQL quand les écrans ont besoin de données imbriquées et différentes d’un client à l’autre, et que l’équipe peut gérer le schéma et la complexité des requêtes.</dd>
<dt>PUT ou PATCH ?</dt><dd>PUT remplace la ressource entière (idempotent), PATCH modifie seulement les champs envoyés.</dd>
<dt>Comment gères-tu une erreur 401 en cascade ?</dt><dd>Un intercepteur unique côté client : à la première 401, on tente un rafraîchissement du jeton une seule fois, les autres requêtes attendent le résultat, puis on les rejoue ; si le rafraîchissement échoue, on déconnecte et on redirige.</dd>
<dt>Comment évites-tu le over-fetching en REST ?</dt><dd>Paramètres de sélection de champs (<code>?fields=</code>), ressources composées adaptées aux écrans, pagination, ou une couche BFF qui agrège et filtre pour le front.</dd>
</dl>`,
  },
  {
    id: 'build-bundling',
    label: 'Outils de build et gestion de paquets',
    category: 'Outillage',
    level: 'acquis',
    summary: 'npm/yarn/pnpm installent les dépendances ; Webpack, Vite et consorts assemblent le code source en fichiers optimisés pour le navigateur.',
    cv: 'npm/yarn/pnpm, Webpack et Module Federation sont dans ton CV ; Vite sur tes projets personnels. Tu peux comparer les deux bundlers avec des exemples vécus.',
    body: `
<h2>Gestionnaires de paquets</h2>
<table><tr><th></th><th>npm</th><th>yarn</th><th>pnpm</th></tr>
<tr><td>Stockage</td><td>Copie dans chaque projet</td><td>Idem (Plug'n'Play en option)</td><td>Magasin global + liens : rapide, économe en disque</td></tr>
<tr><td>Lockfile</td><td>package-lock.json</td><td>yarn.lock</td><td>pnpm-lock.yaml</td></tr>
<tr><td>Spécificité</td><td>Livré avec Node</td><td>Workspaces précurseur</td><td>Strict : pas d’accès aux dépendances non déclarées</td></tr></table>
<ul>
<li><b>Lockfile commité</b> et installation figée en CI : <code>npm ci</code>, <code>pnpm install --frozen-lockfile</code>.</li>
<li><code>dependencies</code> / <code>devDependencies</code>, versions semver (<code>^</code>, <code>~</code>), <b>workspaces</b> pour les monorepos.</li>
<li><b>Sécurité</b> : <code>npm audit</code>, mises à jour régulières, registre interne en milieu sécurisé.</li>
</ul>
<h2>Bundlers</h2>
<p>Le <b>bundler</b> résout les imports, transforme (TypeScript, JSX, CSS), regroupe, minifie et découpe le code.</p>
<table><tr><th></th><th>Webpack</th><th>Vite</th></tr>
<tr><td>Dev</td><td>Bundle tout, plus lent au démarrage</td><td>Modules ES natifs servis à la demande (esbuild) : démarrage quasi instantané</td></tr>
<tr><td>Production</td><td>Webpack</td><td>Rollup (Rolldown dans les versions récentes)</td></tr>
<tr><td>Config</td><td>Puissante, verbeuse</td><td>Simple, conventions</td></tr>
<tr><td>Atout</td><td>Écosystème, Module Federation</td><td>Rapidité, HMR fluide</td></tr></table>
<h2>Notions à connaître</h2>
<ul>
<li><b>Code splitting</b> (<code>import()</code> dynamique, <code>React.lazy</code>), <b>tree shaking</b>, minification, <i>source maps</i>, hash de fichiers pour le cache.</li>
<li><b>HMR</b> : remplacement à chaud des modules en développement.</li>
<li><b>Variables d’environnement</b> (<code>import.meta.env</code> dans Vite) : jamais de secret côté client.</li>
<li><b>Analyse du bundle</b> (<code>rollup-plugin-visualizer</code>, <code>webpack-bundle-analyzer</code>), budgets de taille en CI.</li>
<li><b>Module Federation</b> : partage de modules entre applications déployées séparément (micro-frontends).</li>
</ul>
<h2>Versions et dépendances</h2>
<ul>
<li><b>Semver</b> : MAJEUR.MINEUR.CORRECTIF. <code>^1.2.3</code> accepte les versions compatibles jusqu’au prochain majeur (&lt; 2.0.0), <code>~1.2.3</code> seulement les correctifs (&lt; 1.3.0), une version exacte est figée.</li>
<li><b>peerDependencies</b> : dépendances que l’application hôte doit fournir (ex. <code>react</code> pour une bibliothèque de composants). Les <b>dépendances transitives</b> sont celles des dépendances.</li>
<li><b>Scripts</b> : <code>build</code>, <code>dev</code>, <code>test</code>, <code>lint</code> dans <code>package.json</code> ; <code>npx</code> ou <code>pnpm dlx</code> exécutent un binaire sans l’installer globalement.</li>
<li><b>Corepack</b> : fixe la version du gestionnaire (champ <code>packageManager</code>) pour que tous utilisent le même.</li>
<li><b>Monorepo</b> : <code>pnpm-workspace.yaml</code>, dépendances internes en <code>workspace:*</code>, outils de pilotage (Turborepo, Nx) avec cache des tâches.</li>
<li><b>Mises à jour</b> : Renovate ou Dependabot ouvrent des demandes de fusion ; lire le changelog des majeurs, s’appuyer sur les tests.</li>
<li>Risques de la chaîne d’approvisionnement : scripts <code>postinstall</code>, noms de paquets proches (typosquatting), paquets abandonnés ; verrouiller, auditer, limiter le nombre de dépendances.</li>
</ul>
<h2>Modules : ESM, CommonJS et tree shaking</h2>
<ul>
<li><b>ESM</b> (<code>import</code> / <code>export</code>) est statique : le bundler connaît les exports utilisés à la compilation et peut éliminer le reste (<b>tree shaking</b>). <b>CommonJS</b> (<code>require</code>) est dynamique et s’élague mal.</li>
<li>Les bibliothèques déclarent <code>"sideEffects": false</code> dans leur <code>package.json</code> et des champs <code>exports</code> / <code>module</code> pour être élaguées correctement.</li>
<li>Importer précisément (<code>import debounce from 'lodash/debounce'</code> ou <code>lodash-es</code>) plutôt que toute la bibliothèque.</li>
<li>Les <b>barrel files</b> (<code>index.ts</code> qui réexporte tout) peuvent ralentir le développement et gêner l’élagage si les modules ont des effets de bord.</li>
</ul>
<h2>Configuration Vite et découpage</h2>
[[code
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': '/src' } },
  server: { proxy: { '/api': 'http://localhost:3000' } },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: { manualChunks: { vendor: ['react', 'react-dom'] } },
    },
  },
})

// découpage par route
const Annonces = lazy(() => import('./pages/Annonces'))
]]
<ul>
<li><b>Proxy de développement</b> : évite les problèmes de CORS en local en redirigeant <code>/api</code> vers le back-end.</li>
<li><b>Alias</b> d’import (<code>@/</code>) à déclarer aussi dans <code>tsconfig.json</code>.</li>
<li><b>Variables</b> : seules celles préfixées par <code>VITE_</code> sont exposées au client ; elles sont figées dans le bundle au build, donc visibles de tous.</li>
<li><b>Fichiers hachés</b> (<code>app.3f9a1c.js</code>) : cache long côté navigateur, invalidé automatiquement à chaque changement ; seul le fichier HTML n’est pas mis en cache longtemps.</li>
</ul>
<h2>Transpilation, compatibilité et outils</h2>
<ul>
<li><b>TypeScript</b> : esbuild ou SWC retirent les types sans les vérifier ; le contrôle se fait avec <code>tsc --noEmit</code> en CI.</li>
<li><b>Babel</b> transforme la syntaxe selon les navigateurs ciblés (<code>browserslist</code>) ; SWC est une alternative bien plus rapide.</li>
<li><b>Polyfills</b> pour les API absentes des navigateurs ciblés ; ne charger que le nécessaire.</li>
<li><b>Écosystème rapide</b> : esbuild (Go), SWC et Rolldown (Rust), Turbopack (Next.js), Rspack (compatible avec la config Webpack) pour accélérer les builds.</li>
<li><b>Webpack</b> : loaders (transformer un type de fichier), plugins (étendre le processus), <code>splitChunks</code> pour découper, Module Federation pour partager des modules à l’exécution.</li>
</ul>
<h2>Pièges fréquents</h2>
<ul>
<li>Bundle qui grossit sans que personne le voie : un budget de taille en CI et un rapport de visualisation à chaque version.</li>
<li>Dépendance dupliquée dans deux versions (visible dans l’analyseur) ; résoudre par une version commune ou <code>overrides</code> / <code>resolutions</code>.</li>
<li>Import dynamique qui ne découpe rien parce que le même module est aussi importé statiquement ailleurs.</li>
<li>Secret placé dans une variable <code>VITE_</code> ou équivalent : il se retrouve dans le code livré au navigateur.</li>
<li>Différence entre « ça marche en dev » et en production : tester le résultat du build avec <code>vite preview</code>.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Pourquoi Vite démarre-t-il plus vite ?</dt><dd>En développement, il ne construit pas de bundle : il sert chaque module ES à la demande, après une transformation très rapide par esbuild, et ne pré-bundle que les dépendances.</dd>
<dt>Que fait un lockfile ?</dt><dd>Il fige la version exacte de chaque dépendance, directe et transitive, pour que toutes les installations (collègues, CI, production) soient identiques.</dd>
<dt>Quelle différence entre dependencies, devDependencies et peerDependencies ?</dt><dd><code>dependencies</code> sont nécessaires à l’exécution, <code>devDependencies</code> seulement au développement et au build (tests, linter, bundler), <code>peerDependencies</code> sont à fournir par l’application qui utilise la bibliothèque, pour éviter d’en embarquer plusieurs copies.</dd>
<dt>Pourquoi tester avec vite preview ?</dt><dd>Parce que le développement sert des modules ES non optimisés, alors que la production est bundlée par Rollup : certaines erreurs (imports, variables d’environnement, chemins) n’apparaissent qu’après le build.</dd>
<dt>Comment réduire un bundle trop lourd ?</dt><dd>Analyser (visualizer), découper le code par route ou composant (<code>import()</code>), supprimer ou remplacer les grosses dépendances, s’assurer du tree shaking (ESM), et différer ce qui n’est pas nécessaire au premier affichage.</dd>
</dl>`,
  },
  {
    id: 'conteneurisation',
    label: 'Conteneurisation (Docker)',
    category: 'Compétence du poste : maîtrise',
    level: 'partiel',
    summary: 'Empaqueter une application et ses dépendances dans une image isolée et reproductible, exécutée de la même façon partout.',
    cv: 'Docker est dans tes outils, mais aucun projet décrit ne l’illustre. L’offre demande une « maîtrise » : prépare un Dockerfile front multi-étapes que tu as écrit ou que tu vas écrire.',
    body: `
<h2>Concepts</h2>
<ul>
<li><b>Image</b> : modèle en lecture seule, construit par couches à partir d’un <code>Dockerfile</code>. <b>Conteneur</b> : instance en cours d’exécution d’une image (processus isolé, pas une machine virtuelle).</li>
<li><b>Registre</b> : stockage d’images (Docker Hub, GitLab Registry, registre interne).</li>
<li><b>Volumes</b> (données persistantes), <b>réseaux</b>, variables d’environnement, <b>docker compose</b> pour lancer plusieurs services.</li>
</ul>
<h2>Dockerfile d’un front : build multi-étapes</h2>
[[code
# 1) construction
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# 2) image finale légère : serveur statique
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
]]
<p>L’image finale ne contient que les fichiers statiques et nginx : petite, rapide à déployer, surface d’attaque réduite.</p>
<h2>Bonnes pratiques</h2>
<ul>
<li>Copier d’abord les fichiers de dépendances pour profiter du <b>cache des couches</b>.</li>
<li><code>.dockerignore</code> (node_modules, .git), images de base légères et <b>versions figées</b>.</li>
<li>Ne pas tourner en <b>root</b> ; ne jamais mettre de secrets dans l’image.</li>
<li><b>Scanner</b> les images (Trivy, Docker Scout) en CI.</li>
<li>Config injectée au démarrage (variables d’environnement) plutôt que figée dans l’image : une image, plusieurs environnements.</li>
</ul>
<h2>Commandes de base</h2>
[[code
docker build -t front:1.0 .
docker run --rm -p 8080:8080 front:1.0
docker ps / docker logs -f <id> / docker exec -it <id> sh
]]
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Différence conteneur / machine virtuelle ?</dt><dd>Une VM embarque un système d’exploitation complet sur un hyperviseur ; un conteneur partage le noyau de l’hôte et n’isole que les processus, le système de fichiers et le réseau : il démarre en secondes et pèse quelques dizaines de Mo.</dd>
<dt>Pourquoi un build multi-étapes ?</dt><dd>Pour que l’image finale ne contienne que le résultat (fichiers statiques et serveur), sans Node ni les dépendances de build : image plus petite, plus rapide à déployer et moins exposée.</dd>
<dt>Comment déboguer un conteneur qui s’arrête ?</dt><dd><code>docker logs</code> pour voir la sortie, <code>docker inspect</code> pour le code de sortie et la configuration, puis <code>docker run -it image sh</code> pour entrer dans l’image et rejouer la commande à la main.</dd>
</dl>`,
  },
  {
    id: 'cloud-native',
    label: 'Architecture cloud et cloud native',
    category: 'Compétence du poste : maîtrise',
    level: 'à préparer',
    summary: 'Concevoir des applications faites pour le cloud : conteneurs, services découplés, déploiement automatisé, montée en charge et résilience.',
    cv: 'Seul Docker figure dans ton CV. Le poste classe cette compétence en « maîtrise » : sois honnête sur ton niveau (déploiement indépendant via Module Federation, CI/CD) et montre que tu comprends les principes.',
    body: `
<h2>Définitions</h2>
<ul>
<li><b>Cloud computing</b> : ressources (calcul, stockage, réseau) à la demande. Modèles <b>IaaS</b> (machines), <b>PaaS</b> (plateforme), <b>SaaS</b> (logiciel). Cloud public, privé ou hybride ; pour une administration, souvent un cloud de confiance ou interne.</li>
<li><b>Cloud native</b> (CNCF) : applications conçues pour tirer parti du cloud : <b>conteneurs</b>, <b>microservices</b>, <b>infrastructure déclarative</b>, <b>automatisation</b>, observabilité.</li>
</ul>
<h2>Principes</h2>
<ul>
<li><b>12-factor app</b> : config dans l’environnement, processus sans état, logs sur la sortie standard, dépendances déclarées, parité dev/prod.</li>
<li><b>Découplage</b> : services petits et indépendants, communiquant par API ou messages.</li>
<li><b>Élasticité et résilience</b> : montée en charge horizontale, redémarrage automatique, tolérance aux pannes.</li>
<li><b>Immutabilité</b> : on remplace une image, on ne modifie pas un serveur.</li>
</ul>
<h2>Briques courantes</h2>
<table><tr><th>Domaine</th><th>Exemples</th></tr>
<tr><td>Conteneurs</td><td>Docker, images OCI</td></tr>
<tr><td>Orchestration</td><td><b>Kubernetes</b> : pods, déploiements, services, ingress, ConfigMap/Secret, sondes de santé</td></tr>
<tr><td>Infrastructure as Code</td><td>Terraform, Ansible, Helm</td></tr>
<tr><td>Livraison</td><td>CI/CD, GitOps (Argo CD, Flux)</td></tr>
<tr><td>Observabilité</td><td>Logs, métriques (Prometheus, Grafana), traces (OpenTelemetry), Datadog</td></tr></table>
<h2>Impacts pour un développeur front</h2>
<ul>
<li>Front servi comme <b>fichiers statiques</b> (CDN, nginx) ; déploiement indépendant de l’API (micro-frontends possibles).</li>
<li>Configuration d’exécution injectée (URL d’API par environnement), sans rebuild.</li>
<li><b>Sondes</b> <code>/health</code>, versions exposées, stratégies de déploiement (blue/green, canary) et retour arrière.</li>
<li>Observabilité front : remontée d’erreurs et de Web Vitals, corrélation avec les logs back.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Qu’est-ce qu’un pod ?</dt><dd>La plus petite unité déployable de Kubernetes : un ou plusieurs conteneurs qui partagent le réseau et le stockage, créés et remplacés par l’orchestrateur.</dd>
<dt>Pourquoi des processus sans état ?</dt><dd>Parce qu’un conteneur peut être arrêté, déplacé ou multiplié à tout moment : l’état (sessions, fichiers) doit vivre dans un service dédié (base, cache, stockage) pour que n’importe quelle instance puisse répondre.</dd>
<dt>Comment déploies-tu un front sans interruption de service ?</dt><dd>Déploiement progressif (rolling update) ou bleu / vert : la nouvelle version est servie à côté de l’ancienne, puis la bascule se fait quand elle répond correctement ; les fichiers sont versionnés (hash) pour que les anciens onglets continuent de fonctionner.</dd>
<dt>Monolithe ou microservices ?</dt><dd>Un monolithe bien structuré reste le bon choix pour une petite équipe ; les microservices se justifient quand plusieurs équipes doivent déployer indépendamment, au prix de la complexité d’exploitation.</dd>
</dl>`,
  },
  {
    id: 'securite-front',
    label: 'Sécurité front-end',
    category: 'Exigence forte du poste',
    level: 'partiel',
    summary: 'Protéger les données sensibles et les communications côté navigateur : XSS, CSRF, gestion des jetons, HTTPS, en-têtes de sécurité, dépendances saines.',
    cv: 'Ton parcours de vérification d’identité (KYC, données biométriques, BFF qui centralise les appels) est ton meilleur exemple. Prépare-le comme étude de cas sécurité.',
    body: `
<h2>Menaces principales (OWASP)</h2>
<table><tr><th>Menace</th><th>Principe</th><th>Parade</th></tr>
<tr><td><b>XSS</b></td><td>Injection de script dans la page</td><td>React échappe par défaut ; éviter <code>dangerouslySetInnerHTML</code> ; assainir (DOMPurify) ; CSP</td></tr>
<tr><td><b>CSRF</b></td><td>Requête forgée avec les cookies de l’utilisateur</td><td>Cookies <code>SameSite</code>, jeton anti-CSRF</td></tr>
<tr><td><b>Vol de jeton</b></td><td>Jeton lu par un script</td><td>Cookie <code>HttpOnly</code> + <code>Secure</code> plutôt que <code>localStorage</code></td></tr>
<tr><td><b>Clickjacking</b></td><td>Page embarquée dans un cadre</td><td><code>frame-ancestors</code> (CSP), <code>X-Frame-Options</code></td></tr>
<tr><td><b>Dépendances vulnérables</b></td><td>Paquet compromis (chaîne d’approvisionnement)</td><td><code>npm audit</code>, lockfile, registre interne, mises à jour suivies</td></tr></table>
<h2>Sécuriser les communications</h2>
<ul>
<li><b>HTTPS partout</b>, HSTS ; pas de contenu mixte.</li>
<li><b>CORS</b> restrictif (origines précises) ; <b>CSP</b> pour limiter les sources de scripts.</li>
<li>Autres en-têtes : <code>X-Content-Type-Options</code>, <code>Referrer-Policy</code>, <code>Permissions-Policy</code>.</li>
<li><b>Authentification</b> : OAuth 2.0 / OpenID Connect (Authorization Code + PKCE), jetons à durée courte, rafraîchissement.</li>
</ul>
<h2>Données sensibles</h2>
<ul>
<li>Le client n’est <b>jamais</b> un lieu sûr : aucune clé secrète dans le code ou les variables front ; contrôles d’accès toujours refaits côté serveur.</li>
<li>Minimiser ce qu’on affiche et stocke ; pas de données sensibles dans l’URL, les logs ou les outils de suivi ; vider l’état à la déconnexion.</li>
<li>Valider les entrées côté client (ergonomie) <i>et</i> côté serveur (sécurité).</li>
<li>Principe du <b>moindre privilège</b> ; journalisation des accès côté serveur.</li>
</ul>
[[code
Content-Security-Policy: default-src 'self'; script-src 'self'; img-src 'self' data:; frame-ancestors 'none'
Set-Cookie: session=...; HttpOnly; Secure; SameSite=Strict
]]
<h2>Contexte défense</h2>
<p>Politique de sécurité de l’organisation : niveaux de sensibilité, homologation des systèmes, habilitations, souvent des réseaux fermés (dépendances via un registre interne, pas de services externes).</p>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Où stocker un jeton d’authentification et pourquoi ?</dt><dd>Dans un cookie <code>HttpOnly</code>, <code>Secure</code>, <code>SameSite</code> : il n’est pas lisible par du JavaScript, donc protégé contre le vol par XSS. Le <code>localStorage</code> est accessible à tout script de la page.</dd>
<dt>Comment React protège-t-il du XSS et où est la faille possible ?</dt><dd>React échappe tout ce qui est rendu dans le JSX, donc une chaîne malveillante s’affiche en texte. La faille reste possible avec <code>dangerouslySetInnerHTML</code>, les URL (<code>href="javascript:"</code>) et le HTML injecté par des bibliothèques : d’où assainir avec DOMPurify et une CSP.</dd>
<dt>À quoi sert une CSP ?</dt><dd>La Content Security Policy indique au navigateur d’où les scripts, styles et images peuvent être chargés : un script injecté depuis une autre origine est bloqué, ce qui limite fortement l’impact d’un XSS.</dd>
</dl>`,
  },
  {
    id: 'design-system',
    label: 'Bibliothèque de composants et design system',
    category: 'Architecture front-end',
    level: 'partiel',
    summary: 'Un ensemble de composants, de règles et de tokens partagés pour que toutes les applications aient le même aspect et le même comportement.',
    cv: 'Tu as Storybook sur Azimuth Quiz et des UI adaptées à deux marques (SeLoger / Immowelt). Tu n’as pas mené un design system complet : présente-le comme un sujet où tu as des bases solides.',
    body: `
<h2>Composition d’un design system</h2>
<ul>
<li><b>Design tokens</b> : valeurs nommées (couleurs, espacements, typographies, ombres), source unique pour le design et le code (variables CSS, JSON).</li>
<li><b>Composants</b> : boutons, champs, tableaux, modales… documentés, testés, accessibles.</li>
<li><b>Règles et guides</b> : usage, ton, grille, motifs d’interaction.</li>
<li><b>Outillage</b> : Figma (bibliothèque) ↔ code, Storybook (catalogue vivant), tests visuels.</li>
</ul>
<p>Exemple public : le <b>Système de Design de l’État (DSFR)</b>, composants conformes au RGAA, utilisé par les sites publics français. À connaître pour un poste en ministère.</p>
<h2>Construire une bibliothèque partagée</h2>
<ul>
<li><b>Paquet npm interne</b> (registre privé), idéalement dans un <b>monorepo</b> (pnpm workspaces) ; build en ESM avec types TypeScript.</li>
<li><b>Versionnage sémantique</b> et <b>changelog</b> (Changesets) ; dépréciation avant suppression.</li>
<li><b>API de composants stable</b> : peu de props, composition (<code>children</code>), variantes typées, thème par variables CSS.</li>
<li><b>Accessibilité intégrée</b> (clavier, rôles, focus) ; envisager des briques « headless » (Radix, React Aria) pour le comportement.</li>
<li><b>Tests</b> : unitaires, accessibilité (<code>jest-axe</code>), régression visuelle (Chromatic, Playwright).</li>
<li><b>Storybook</b> : une story par état ; documentation et exemples copiables.</li>
</ul>
[[code
export type ButtonProps = React.ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
}
export const Button = ({ variant = 'primary', size = 'md', ...rest }: ButtonProps) => (
  <button className={'btn btn--' + variant + ' btn--' + size} {...rest} />
)
]]
<h2>Enjeux d’organisation</h2>
<ul><li>Gouvernance : qui décide, comment proposer un composant, support aux équipes. Adoption progressive et migration des applications existantes.</li></ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Comment faire évoluer un composant sans casser les applications ?</dt><dd>Versionnage sémantique du paquet, ajout de props plutôt que modification, dépréciation annoncée avant suppression, changelog, et tests visuels pour repérer les régressions ; les applications montent de version à leur rythme.</dd>
<dt>Où s’arrête le design system, où commence le composant métier ?</dt><dd>Le design system fournit des briques génériques sans logique métier (bouton, champ, table). Dès qu’un composant connaît un concept de l’application (annonce, candidat), il appartient à l’application, composé à partir des briques.</dd>
<dt>Comment gérer le thème ?</dt><dd>Par des design tokens exposés en variables CSS (couleurs, espacements, typographies) ; un thème est un jeu de valeurs, appliqué par une classe ou un attribut sur la racine, sans toucher aux composants.</dd>
</dl>`,
  },
  {
    id: 'diagnostic-incident',
    label: 'Diagnostic suite à incident',
    category: 'Compétence du poste : maîtrise',
    level: 'partiel',
    summary: 'Comprendre rapidement la cause d’une panne ou d’un bug en production, rétablir le service puis éviter la récidive (analyse post-incident).',
    cv: 'Datadog est dans ton CV et tu as maintenu des produits à fort trafic. Prépare un incident réel raconté avec la méthode : détection, cause, correctif, leçon.',
    body: `
<h2>Déroulé d’un incident</h2>
<ol>
<li><b>Détecter et qualifier</b> : alerte, retour utilisateur ; impact, périmètre, gravité.</li>
<li><b>Stabiliser d’abord</b> : <i>rollback</i>, désactivation d’une fonctionnalité (feature flag), bascule. Rétablir le service passe avant de chercher la cause profonde.</li>
<li><b>Diagnostiquer</b> : hypothèses puis vérifications (voir ci-dessous).</li>
<li><b>Corriger</b> et livrer (correctif ciblé, test de non-régression).</li>
<li><b>Communiquer</b> régulièrement aux parties prenantes.</li>
<li><b>Post-mortem</b> sans recherche de coupable : chronologie, cause racine, actions préventives.</li>
</ol>
<h2>Méthode de diagnostic côté front</h2>
<ul>
<li><b>Que s’est-il passé juste avant ?</b> Dernière livraison, changement de configuration, d’API, de dépendance. Comparer avec la version précédente.</li>
<li><b>Reproduire</b> (navigateur, compte, données, réseau) ; réduire jusqu’au cas minimal.</li>
<li><b>Outils du navigateur</b> : console, onglet Réseau (statut, charge utile, temps), Performance, source maps pour lire une trace minifiée.</li>
<li><b>Observabilité</b> : <b>logs</b>, <b>métriques</b>, <b>traces</b> ; supervision d’erreurs front (Sentry), Web Vitals, <i>Real User Monitoring</i> (Datadog RUM). Identifiant de corrélation pour suivre une requête du navigateur jusqu’au serveur.</li>
<li><b>Localiser la couche</b> : front, API, base, réseau, service tiers ? Bissection (<code>git bisect</code>) pour trouver le commit fautif.</li>
</ul>
[[code
# retrouver le commit qui a introduit le bug
git bisect start
git bisect bad            # version actuelle cassée
git bisect good v1.4.1    # dernière version saine
# git propose des commits à tester, répondre good / bad jusqu'au coupable
]]
<h2>Prévenir</h2>
<ul><li>Tests de non-régression, déploiements progressifs (canary), feature flags, alertes sur les Web Vitals et le taux d’erreur, runbooks, revue des incidents.</li></ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Raconte un incident en production.</dt><dd>Structure à suivre : contexte, détection (alerte ou retour utilisateur), impact, action immédiate pour stabiliser, diagnostic (ce qui avait changé juste avant), correctif, et ce qui a été mis en place pour éviter la récidive. Préparer un cas réel de SeLoger.</dd>
<dt>Rollback ou correctif en avant ?</dt><dd>Rollback si la version précédente est saine et que le retour est rapide : on restaure d’abord le service. Correctif en avant quand le rollback est impossible (migration de données) ou que la cause est triviale et la pipeline rapide.</dd>
<dt>Comment prouves-tu la cause racine ?</dt><dd>En reproduisant le problème, en isolant le changement responsable (bissection, comparaison de versions, logs corrélés), puis en vérifiant que la correction fait disparaître le symptôme et qu’un test le couvre.</dd>
<dt>Quelles actions préventives proposes-tu ?</dt><dd>Un test de non-régression, une alerte sur la métrique qui aurait dû prévenir, un déploiement progressif ou un feature flag pour limiter l’impact, et une note dans le runbook.</dd>
</dl>`,
  },
  {
    id: 'frameworks',
    label: 'Frameworks front-end (React, Vue, Angular)',
    category: 'Fondations web',
    level: 'acquis',
    summary: 'Trois grandes approches pour construire des interfaces : React (bibliothèque flexible), Vue (progressif), Angular (framework complet).',
    cv: 'React est ton expertise ; Vue.js et Svelte sont en notions. L’offre demande « au moins un framework » : tu coches la case. Sois capable de comparer.',
    body: `
<h2>Comparaison</h2>
<table><tr><th></th><th>React</th><th>Vue</th><th>Angular</th></tr>
<tr><td>Nature</td><td>Bibliothèque UI</td><td>Framework progressif</td><td>Framework complet</td></tr>
<tr><td>Langage</td><td>JSX + JS/TS</td><td>Templates (SFC) + JS/TS</td><td>TypeScript, templates</td></tr>
<tr><td>Réactivité</td><td>État + re-rendu (hooks)</td><td>Proxys réactifs (<code>ref</code>, <code>reactive</code>)</td><td>Signals, RxJS</td></tr>
<tr><td>Outils inclus</td><td>Peu : routeur, état à choisir</td><td>Routeur, état (Pinia) officiels</td><td>Tout : routeur, formulaires, HTTP, injection de dépendances</td></tr>
<tr><td>Méta-framework</td><td>Next.js, Remix</td><td>Nuxt</td><td>(Angular Universal / SSR intégré)</td></tr>
<tr><td>Courbe d’apprentissage</td><td>Moyenne</td><td>Douce</td><td>Plus raide</td></tr></table>
<h2>Concepts communs</h2>
<ul>
<li><b>Composants</b> avec props et événements ; <b>flux de données</b> descendant ; rendu conditionnel et listes.</li>
<li><b>Cycle de vie</b> et effets de bord ; <b>routage</b> côté client ; <b>gestion d’état</b> (local, partagé, serveur).</li>
<li><b>SSR / SSG</b> pour le référencement et le temps d’affichage.</li>
<li><b>Écosystème de tests</b> : Testing Library pour tous.</li>
</ul>
<h2>Passer d’un framework à l’autre</h2>
<p>Les principes (composition, état, effets, typage) se transfèrent ; seule la syntaxe change. En cas de poste sur un autre framework, mettre en avant cette capacité d’adaptation et la maîtrise de TypeScript.</p>
[[code
// React                            // Vue 3 (script setup)
const [n, setN] = useState(0)       const n = ref(0)
<button onClick={() => setN(n+1)}>  <button @click="n++">
  {n}                                 {{ n }}
</button>                           </button>
]]
<h2>Modèle de rendu et réactivité</h2>
<ul>
<li><b>React</b> : un composant est une fonction qui retourne une description de l’interface (DOM virtuel). Quand l’état change, la fonction est rejouée et React compare l’ancien et le nouveau résultat pour ne modifier que le nécessaire (réconciliation). L’état est <b>immuable</b> : on remplace, on ne mute pas.</li>
<li><b>Vue 3</b> : <code>ref</code> et <code>reactive</code> enveloppent les données dans des proxys qui enregistrent qui les lit ; seuls les composants et calculs concernés se mettent à jour. <code>computed</code> dérive une valeur, <code>watch</code> réagit à un changement.</li>
<li><b>Angular</b> : détection de changements (zones ou, plus récemment, signals) ; les <b>signals</b> offrent une réactivité fine ; <b>RxJS</b> modélise les flux asynchrones (HTTP, événements).</li>
<li>Svelte, mentionné dans le CV, compile les composants en code qui met à jour le DOM directement, sans DOM virtuel.</li>
</ul>
<h2>Correspondances entre frameworks</h2>
<table><tr><th>Besoin</th><th>React</th><th>Vue</th><th>Angular</th></tr>
<tr><td>État local</td><td><code>useState</code>, <code>useReducer</code></td><td><code>ref</code>, <code>reactive</code></td><td><code>signal</code></td></tr>
<tr><td>Valeur dérivée</td><td>Calcul au rendu, <code>useMemo</code></td><td><code>computed</code></td><td><code>computed</code></td></tr>
<tr><td>Effet de bord</td><td><code>useEffect</code></td><td><code>watch</code>, <code>onMounted</code></td><td><code>effect</code>, hooks de cycle de vie</td></tr>
<tr><td>Communication parent-enfant</td><td>Props, fonctions de rappel</td><td>Props, <code>emit</code></td><td><code>input</code> / <code>output</code></td></tr>
<tr><td>État partagé</td><td>Context, Redux, Zustand</td><td>Pinia</td><td>Services injectables</td></tr>
<tr><td>Routage</td><td>React Router, Next.js</td><td>Vue Router, Nuxt</td><td>Angular Router</td></tr>
<tr><td>Formulaires</td><td>React Hook Form, Formik</td><td>VeeValidate, FormKit</td><td>Reactive Forms (inclus)</td></tr>
<tr><td>Tests</td><td>Testing Library, Vitest/Jest</td><td>Testing Library, Vue Test Utils</td><td>TestBed, Testing Library</td></tr></table>
<h2>Choisir un framework</h2>
<ul>
<li><b>Équipe et contexte</b> : compétences existantes, code déjà en place, recrutement possible. C’est souvent le critère décisif.</li>
<li><b>Cadre imposé</b> : Angular apporte une structure uniforme pour de grandes équipes (conventions, injection de dépendances, CLI) ; React laisse choisir mais demande de se doter de règles communes.</li>
<li><b>Rendu serveur et référencement</b> : Next.js, Nuxt ou Angular SSR si le contenu public doit être indexé et affiché vite.</li>
<li><b>Durée de vie</b> : mesurer la maintenabilité (mises à jour de versions majeures, taille de la communauté, documentation).</li>
<li>Un choix de framework ne se justifie pas par la performance brute : les trois sont suffisants pour la plupart des applications ; ce sont l’architecture et la discipline qui comptent.</li>
</ul>
<h2>Pièges communs</h2>
<ul>
<li><b>React</b> : dépendances d’effet oubliées ou erronées, mutation directe de l’état, <code>key</code> instable dans les listes, effets utilisés pour dériver une valeur qu’on pouvait calculer au rendu.</li>
<li><b>Vue</b> : perdre la réactivité en déstructurant un objet réactif, oublier <code>.value</code> sur un <code>ref</code> dans le script.</li>
<li><b>Angular</b> : abonnements RxJS jamais désabonnés (préférer <code>async</code> pipe ou <code>takeUntilDestroyed</code>), modules et composants trop couplés.</li>
<li><b>Tous</b> : état global pour tout (préférer l’état local et le cache de données serveur), composants géants, absence de typage des props.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Pourquoi React plutôt que Vue ou Angular ?</dt><dd>Écosystème le plus large, grande liberté d’outillage, et surtout dix ans de pratique : je suis le plus efficace avec. Les principes se transfèrent, je peux travailler sur Vue ou Angular avec un temps d’adaptation.</dd>
<dt>Qu’est-ce que la réactivité ?</dt><dd>Le mécanisme par lequel l’interface se met à jour quand les données changent : React re-rend le composant quand l’état change ; Vue et Angular (signals) suivent les dépendances et ne mettent à jour que ce qui en dépend.</dd>
<dt>Pourquoi la prop key est-elle importante dans une liste ?</dt><dd>Elle identifie chaque élément de façon stable : le framework peut ainsi déplacer, conserver ou supprimer les bons nœuds, et garder l’état des composants. Un index de tableau comme clé pose problème quand la liste est réordonnée ou filtrée.</dd>
<dt>Qu’est-ce qui différencie Angular d’une bibliothèque comme React ?</dt><dd>Angular est un framework complet et opiniâtre (routeur, formulaires, HTTP, injection de dépendances, CLI), alors que React se limite à l’interface et laisse choisir le reste : plus de liberté, mais plus de décisions d’architecture à prendre.</dd>
<dt>Comment migrerais-tu une application d’un framework à un autre ?</dt><dd>Progressivement : isoler les parties indépendantes (routes, widgets), les réécrire une à une en les intégrant par micro-frontend ou Web Components, garder les tests e2e comme filet, et ne jamais réécrire tout d’un bloc.</dd>
</dl>`,
  },
]

export const docs = [
  ...reuse('react-typescript', 'html-css'),
  own.find((d) => d.id === 'frameworks'),
  ...reuse('redux-context'),
  own.find((d) => d.id === 'rest-graphql'),
  own.find((d) => d.id === 'build-bundling'),
  ...reuse('integration-continue'),
  own.find((d) => d.id === 'conteneurisation'),
  own.find((d) => d.id === 'cloud-native'),
  ...reuse('tests'),
  own.find((d) => d.id === 'e2e'),
  own.find((d) => d.id === 'accessibilite'),
  ...reuse('perf-backend'),
  own.find((d) => d.id === 'securite-front'),
  own.find((d) => d.id === 'design-system'),
  own.find((d) => d.id === 'diagnostic-incident'),
]
