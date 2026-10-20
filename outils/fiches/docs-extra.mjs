// Fiches ajoutées pour les nouvelles candidatures. Même format que docs-cnd.mjs :
// { id, label, category, level: 'acquis' | 'partiel' | 'à préparer', summary, terms?, cv, body }
// Dans body, un bloc de code s'écrit : [[code\n...\n]]
export const docs = [
  {
    id: 'microfrontend',
    label: 'Micro-frontend / Composite UI',
    category: 'Architecture front-end',
    level: 'acquis',
    terms: ['Microfrontend', 'Composite UI'],
    summary: 'Découper une application web en morceaux autonomes, développés et déployés séparément, puis les assembler dans une même page.',
    cv: 'Ton projet « Déposer une annonce » est un vrai micro-frontend : module intégré dans une application shell via Module Federation, avec déploiement indépendant. C’est ton meilleur exemple pour cette offre.',
    body: `
<h2>Définition</h2>
<p>Un <b>micro-frontend</b> applique aux interfaces l’idée des microservices : chaque équipe possède une partie de l’écran (fonctionnalité, page, widget), la construit et la déploie <b>indépendamment</b>. Une <b>Composite UI</b> est la page finale, composée de vues venant de plusieurs modules, assemblées par une application « shell » (hôte).</p>
<h2>Techniques d’assemblage</h2>
<table><tr><th>Approche</th><th>Principe</th><th>Remarque</th></tr>
<tr><td><b>Module Federation</b> (Webpack 5)</td><td>Un module expose des composants, l’hôte les charge à l’exécution</td><td>Dépendances partagées, déploiement indépendant</td></tr>
<tr><td>single-spa</td><td>Orchestrateur de plusieurs applications dans une page</td><td>Indépendant du framework</td></tr>
<tr><td>Web Components</td><td>Éléments personnalisés standard du navigateur</td><td>Isolation, interopérable</td></tr>
<tr><td>iframes</td><td>Chaque morceau dans son cadre</td><td>Isolation forte, mais UX et échanges limités</td></tr>
<tr><td>Paquets npm</td><td>Assemblage à la compilation</td><td>Pas de déploiement indépendant</td></tr></table>
[[code
// Module « annonces » (remote)
new ModuleFederationPlugin({
  name: 'annonces',
  filename: 'remoteEntry.js',
  exposes: { './App': './src/App' },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } },
})
// L'application shell charge ensuite : const App = lazy(() => import('annonces/App'))
]]
<h2>Points d’attention</h2>
<ul>
<li><b>Dépendances partagées</b> : une seule instance de React (<code>singleton</code>), versions compatibles entre modules.</li>
<li><b>Design system commun</b> pour garder une interface cohérente entre les équipes.</li>
<li><b>Communication</b> : événements ou contrats d’API simples, pas d’état global partagé entre modules.</li>
<li><b>Routage</b> : le shell possède les routes de premier niveau, chaque module ses sous-routes.</li>
<li><b>Performance</b> : éviter le code dupliqué, charger les modules à la demande.</li>
<li><b>Tests et déploiement</b> : tests de contrat entre le shell et les modules, versions et retour arrière.</li>
</ul>
<h2>Avantages et limites</h2>
<p>Équipes autonomes, déploiements indépendants, migration progressive d’un ancien front. En contrepartie : complexité de l’outillage, cohérence visuelle plus difficile, surcoût de performance si mal maîtrisé. Pour une petite équipe, un monolithe bien structuré est souvent plus simple.</p>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Quand choisir un micro-frontend plutôt qu’un monolithe ?</dt><dd>Quand plusieurs équipes doivent déployer indépendamment sur la même application, ou pour migrer progressivement un ancien front. Pour une seule équipe, un monolithe modulaire est plus simple.</dd>
<dt>Comment partager l’état ?</dt><dd>Le moins possible : chaque module gère son état ; ce qui doit être partagé (session, thème) passe par le shell via un contrat explicite (événements, props, URL), pas par un store global commun.</dd>
<dt>Comment éviter deux versions de React ?</dt><dd>Déclarer React et ReactDOM en dépendances partagées <code>singleton</code> dans Module Federation, avec des plages de versions compatibles, pour qu’une seule instance soit chargée.</dd>
<dt>Comment tester l’ensemble ?</dt><dd>Tests unitaires et d’intégration dans chaque module, tests de contrat entre le shell et les modules (ce qui est exposé), et quelques tests e2e sur l’application assemblée.</dd>
</dl>`,
  },
  {
    id: 'spa-architecture',
    label: 'Architecture SPA et design patterns front',
    category: 'Architecture front-end',
    level: 'acquis',
    terms: ['SPA', 'design patterns', 'algorithmiques', 'algorithmique', 'architecture technique', 'architecture applicative'],
    summary: 'Une SPA charge l’application une fois et navigue côté client ; des design patterns structurent le code d’une application front moderne.',
    cv: 'React, Next.js, React Router, Redux et micro-frontend font de la SPA ton quotidien. Les bonnes connaissances algorithmiques ne sont pas décrites dans ton CV : prévoir quelques exercices.',
    body: `
<h2>Architecture SPA</h2>
<p>Une <b>Single Page Application</b> charge un seul document HTML, puis le JavaScript gère l’affichage et la navigation côté client (History API), en appelant des API pour les données.</p>
<ul>
<li><b>Atouts</b> : navigation fluide, interface riche, séparation nette front / back.</li>
<li><b>Limites</b> : premier chargement plus lourd, référencement (SEO) plus délicat. Réponses : <b>SSR / SSG</b> (Next.js), découpage du code (<code>React.lazy</code>), mise en cache.</li>
<li><b>Briques</b> : routeur, gestion d’état, couche d’accès aux données, gestion d’erreurs (<code>ErrorBoundary</code>), authentification.</li>
</ul>
<h2>Design patterns d’une application React moderne</h2>
<table><tr><th>Pattern</th><th>Usage</th></tr>
<tr><td>Composition / <code>children</code></td><td>Assembler des composants plutôt qu’hériter</td></tr>
<tr><td>Custom hooks</td><td>Extraire une logique réutilisable (données, formulaires)</td></tr>
<tr><td>Compound components</td><td>Composants qui coopèrent (<code>Tabs</code>, <code>Tab</code>, <code>TabPanel</code>)</td></tr>
<tr><td>Provider / Context</td><td>Partager thème, session, configuration</td></tr>
<tr><td>Container / Presentational</td><td>Séparer données et affichage</td></tr>
<tr><td>Facade / Adapter</td><td>Isoler les appels API derrière une couche (services)</td></tr>
<tr><td>Machine à états</td><td>Parcours complexes (formulaire multi-étapes)</td></tr>
<tr><td>Feature folders</td><td>Organiser par fonctionnalité plutôt que par type de fichier</td></tr></table>
[[code
const Tabs = ({ children }: { children: React.ReactNode }) => <div role="tablist">{children}</div>
const Tab = ({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) => (
  <button role="tab" aria-selected={active} onClick={onClick}>{label}</button>
)
// <Tabs><Tab label="Détails" active … /><Tab label="Lettre" … /></Tabs>
]]
<h2>Connaissances algorithmiques attendues</h2>
<ul>
<li><b>Complexité</b> : savoir estimer O(n), O(n log n), O(n²) d’une boucle ou d’un tri.</li>
<li><b>Structures</b> : tableaux, <code>Map</code> / <code>Set</code> (recherche en O(1)), piles, files, arbres (arbre de composants, DOM), graphes.</li>
<li><b>Exercices classiques</b> : dédoublonner, regrouper (<code>groupBy</code>), tri et filtre, aplatir un tableau, parcours d’arbre récursif, <i>debounce</i> / <i>throttle</i>, mémoïsation.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>SPA ou SSR, comment choisir ?</dt><dd>SPA pour une application derrière une connexion où le référencement ne compte pas ; SSR (ou SSG) pour les pages publiques, le SEO et le premier affichage. Next.js permet de mélanger les deux.</dd>
<dt>Comment structurer un projet de plusieurs dizaines d’écrans ?</dt><dd>Par fonctionnalité (feature folders) plutôt que par type de fichier, avec une couche partagée (ui, helpers, api), des routes chargées à la demande, et des règles d’import pour éviter les dépendances circulaires.</dd>
<dt>Comment éviter les re-rendus inutiles ?</dt><dd>État au bon niveau, découpage des composants, <code>React.memo</code> et <code>useCallback</code> ciblés après mesure au Profiler, sélecteurs précis dans le store, clés stables dans les listes.</dd>
<dt>Écrire un debounce à la main.</dt><dd><code>const debounce = (fn, delay) =&gt; { let t; return (...args) =&gt; { clearTimeout(t); t = setTimeout(() =&gt; fn(...args), delay) } }</code> : chaque appel annule le précédent, la fonction ne s’exécute qu’après un silence de <code>delay</code> ms.</dd>
</dl>`,
  },
  {
    id: 'tdd-clean-code',
    label: 'TDD, test first et Clean Code',
    category: 'Qualité & livraison',
    level: 'partiel',
    terms: ['TDD', 'Test first development', 'Clean Code'],
    summary: 'Écrire le test avant le code (TDD) et produire un code lisible et simple à faire évoluer (Clean Code).',
    cv: 'Ton CV parle de tests unitaires (Jest, Jasmine) et de qualité de code, pas de TDD. Si tu ne l’as pas pratiqué, présente-le comme une pratique que tu connais et que tu veux généraliser, sans prétendre l’avoir appliqué.',
    body: `
<h2>TDD : le cycle</h2>
<ol>
<li><b>Red</b> : écrire un test qui échoue, décrivant le comportement voulu.</li>
<li><b>Green</b> : écrire le code le plus simple qui le fait passer.</li>
<li><b>Refactor</b> : améliorer le code en gardant les tests au vert.</li>
</ol>
<p><b>Test first</b> signifie que le test précède le code, ce qui force à penser l’interface (props, retours) avant l’implémentation. Bénéfices : moins de régressions, conception plus simple, refactoring sans peur, documentation vivante.</p>
<h2>TDD avec React</h2>
<p>On teste ce que voit l’utilisateur avec <b>React Testing Library</b> (rôles, textes, clics), pas les détails internes.</p>
[[code
// 1) Le test, écrit d'abord
test('affiche le total TTC', () => {
  render(<Total ht={100} tva={0.2} />)
  expect(screen.getByText('120,00 €')).toBeInTheDocument()
})
// 2) Le composant minimal qui le fait passer, puis refactor
]]
<h2>Clean Code : principes</h2>
<ul>
<li><b>Noms explicites</b> (<code>isLoading</code>, <code>formatPrice</code>), pas d’abréviations obscures.</li>
<li><b>Fonctions courtes</b>, une seule responsabilité (SRP) ; composants petits et composables.</li>
<li><b>DRY</b> sans abstraction prématurée, <b>KISS</b> : la solution la plus simple qui marche.</li>
<li>Pas de nombres magiques (constantes nommées), pas de code mort, commentaires pour expliquer le <i>pourquoi</i>.</li>
<li><b>Revues de code</b>, linter, types TypeScript stricts comme garde-fous.</li>
</ul>
<h2>Pyramide de tests</h2>
<p>Beaucoup de tests unitaires rapides, quelques tests d’intégration de composants, peu de tests e2e. Ne pas viser un pourcentage de couverture pour lui-même : tester les comportements importants et les cas limites.</p>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Décris le cycle red / green / refactor.</dt><dd>Red : écrire un test qui échoue et décrit le comportement attendu. Green : écrire le code minimal qui le fait passer. Refactor : nettoyer le code en gardant les tests verts. Puis recommencer avec le comportement suivant.</dd>
<dt>Que testes-tu dans un composant ?</dt><dd>Le comportement vu par l’utilisateur : affichage selon les props, réactions aux clics et saisies, appels déclenchés. Pas l’implémentation interne.</dd>
<dt>TDD sur du code d’interface : pertinent ou non ?</dt><dd>Oui pour la logique et les comportements (validation, états, interactions), moins pour l’apparence pure, qui change souvent et se vérifie mieux visuellement (Storybook, tests visuels).</dd>
<dt>Donne un exemple de refactoring.</dt><dd>Extraire la logique d’un gros composant dans un hook personnalisé (chargement, erreur, pagination), puis ne garder dans le composant que l’affichage : même comportement, tests inchangés, code plus lisible et réutilisable.</dd>
</dl>`,
  },
  {
    id: 'azure',
    label: 'Azure et Azure DevOps',
    category: 'CI/CD & cloud',
    level: 'à préparer',
    terms: ['Azure DevOps', 'Azure'],
    summary: 'Azure est le cloud de Microsoft ; Azure DevOps regroupe dépôt, pipelines CI/CD, tickets et dépôt de paquets.',
    cv: 'Azure et Azure DevOps ne sont pas dans ton CV (tu as CircleCI, Jenkins, GitHub Actions, Docker). Présente-les comme équivalents à ce que tu connais déjà, et prépare quelques notions.',
    body: `
<h2>Azure : services utiles à un développeur front</h2>
<table><tr><th>Besoin</th><th>Service Azure</th></tr>
<tr><td>Héberger un front statique</td><td><b>Static Web Apps</b> ou Blob Storage + CDN / <b>Front Door</b></td></tr>
<tr><td>Héberger une application web ou une API</td><td><b>App Service</b>, ou conteneurs (Container Apps, AKS)</td></tr>
<tr><td>Fonctions serverless</td><td><b>Azure Functions</b></td></tr>
<tr><td>Secrets (clés, jetons)</td><td><b>Key Vault</b></td></tr>
<tr><td>Supervision (logs, erreurs, performances)</td><td><b>Application Insights</b> / Azure Monitor</td></tr>
<tr><td>Identité et connexion</td><td><b>Microsoft Entra ID</b> (ex Azure AD), OAuth 2.0 / OpenID Connect</td></tr></table>
<h2>Azure DevOps</h2>
<ul>
<li><b>Repos</b> : dépôts Git, pull requests, politiques de branches.</li>
<li><b>Pipelines</b> : CI/CD décrite dans <code>azure-pipelines.yml</code> (<i>trigger</i>, <i>pool</i>, <i>stages</i>, <i>jobs</i>, <i>steps</i>), exécutée par des agents.</li>
<li><b>Boards</b> : tickets, sprints Scrum, tableaux Kanban.</li>
<li><b>Artifacts</b> : dépôt de paquets (registre npm interne).</li>
<li><b>Test Plans</b> : plans de test manuels.</li>
</ul>
[[code
trigger: [main]
pool: { vmImage: ubuntu-latest }
steps:
  - task: NodeTool@0
    inputs: { versionSpec: '22.x' }
  - script: npm ci && npm test -- --ci && npm run build
    displayName: Installer, tester, construire
  - publish: dist
    artifact: web
]]
<h2>Notions à connaître</h2>
<ul>
<li><b>Environnements et approbations</b> : déploiement vers dev, recette, production avec validation manuelle.</li>
<li><b>Secrets</b> : <i>variable groups</i> ou Key Vault, jamais dans le dépôt.</li>
<li><b>Connexions de service</b> pour déployer vers Azure.</li>
<li><b>Retour arrière</b> et déploiements progressifs (<i>slots</i>).</li>
</ul>
<h2>Équivalences avec ce que tu connais</h2>
<table><tr><th>Azure DevOps</th><th>Équivalent</th></tr>
<tr><td>Pipelines YAML</td><td>GitHub Actions, CircleCI (config.yml)</td></tr>
<tr><td>Agents</td><td>Runners GitHub, agents Jenkins</td></tr>
<tr><td>Artifacts</td><td>Registre npm privé</td></tr></table>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Comment déploies-tu un front en production ?</dt><dd>La pipeline construit les fichiers statiques, les publie comme artefact, puis les déploie vers l’hébergement (Static Web Apps, stockage + CDN) avec un cache long sur les fichiers versionnés et court sur index.html ; validation manuelle avant la production.</dd>
<dt>Où ranges-tu les secrets ?</dt><dd>Dans Key Vault ou les variables protégées de la pipeline, injectés au moment du build ou du déploiement ; jamais dans le dépôt, et jamais côté navigateur.</dd>
<dt>Quelle différence entre CI et CD ?</dt><dd>CI : intégrer et vérifier le code en continu (build, lint, tests) à chaque changement. CD : livrer ou déployer automatiquement ce qui a passé la CI.</dd>
<dt>Comment faire un retour arrière ?</dt><dd>Redéployer l’artefact de la version précédente (conservé dans la pipeline), ou basculer le slot ou l’alias vers l’ancienne version ; d’où l’importance de versionner chaque livraison.</dd>
</dl>`,
  },
  {
    id: 'scrum',
    label: 'Scrum (méthode agile)',
    category: 'Méthode',
    level: 'acquis',
    terms: ['Scrum', 'Agile', 'agiles'],
    summary: 'Cadre de travail agile : des itérations courtes (sprints), des rôles et des rendez-vous réguliers pour livrer par petites étapes.',
    cv: 'Ton CV cite Agile (Kanban, Scrum) et le pair programming. Prépare un exemple concret de ton rôle dans un sprint.',
    body: `
<h2>Principes</h2>
<p><b>Scrum</b> organise le travail en <b>sprints</b> (souvent 2 semaines) qui produisent un incrément utilisable. On inspecte et on adapte à chaque cycle.</p>
<h2>Rôles</h2>
<ul>
<li><b>Product Owner</b> : porte la vision, ordonne le <i>product backlog</i>.</li>
<li><b>Scrum Master</b> : aide l’équipe à appliquer Scrum, lève les obstacles.</li>
<li><b>Équipe de développement</b> : conçoit, développe, teste (le développeur front en fait partie).</li>
</ul>
<h2>Événements</h2>
<table><tr><th>Événement</th><th>Objectif</th></tr>
<tr><td>Sprint planning</td><td>Choisir ce qui entre dans le sprint</td></tr>
<tr><td>Daily</td><td>Se synchroniser (15 minutes)</td></tr>
<tr><td>Raffinement du backlog</td><td>Préciser et estimer les tickets : le cadrage des fonctionnalités</td></tr>
<tr><td>Sprint review</td><td>Montrer l’incrément aux parties prenantes</td></tr>
<tr><td>Rétrospective</td><td>Améliorer la façon de travailler</td></tr></table>
<h2>Artefacts et notions</h2>
<ul>
<li><b>Product backlog</b>, <b>sprint backlog</b>, <b>incrément</b>.</li>
<li><b>User story</b> : « En tant que… je veux… afin de… » avec critères d’acceptation.</li>
<li><b>Definition of Done</b> : critères communs (tests, revue de code, déploiement).</li>
<li><b>Estimation</b> : points de complexité, vélocité.</li>
</ul>
<h2>Scrum et Kanban</h2>
<p>Scrum = itérations de durée fixe et rôles définis ; Kanban = flux continu, limite du travail en cours, pas de sprint.</p>
<h2>Dans l’offre</h2>
<p>Le poste inclut le <b>cadrage</b> des fonctionnalités et des <b>ateliers de conception</b> avec le produit, le métier, le design et le support : ce sont les phases de raffinement. Prépare un exemple où tu as challengé une user story ou proposé une solution technique en amont.</p>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Décris un sprint type.</dt><dd>Planning pour choisir les tickets, daily de quinze minutes, développement avec revues de code et tests, raffinement du backlog en cours de sprint, review de l’incrément avec le produit, puis rétrospective.</dd>
<dt>Que fais-tu au raffinement ?</dt><dd>Je pose les questions qui restent sur le besoin, je signale les impacts techniques et les risques, je propose un découpage et une estimation, et je vérifie que les critères d’acceptation sont testables.</dd>
<dt>Une user story est trop grosse : que fais-tu ?</dt><dd>Je la découpe en tranches livrables et démontrables (par cas d’usage, par étape du parcours, par plateforme), chacune apportant de la valeur, plutôt que par couche technique.</dd>
<dt>Scrum ou Kanban, quand choisir ?</dt><dd>Scrum quand on veut un rythme fixe et des engagements par itération ; Kanban quand les demandes arrivent en continu (support, maintenance) et qu’on veut limiter le travail en cours.</dd>
</dl>`,
  },
  {
    id: 'tailwind-hook-form',
    label: 'Tailwind CSS et React Hook Form',
    category: 'Outils front-end',
    level: 'acquis',
    terms: ['Tailwind CSS', 'React Hook Form'],
    summary: 'Tailwind CSS : styles par classes utilitaires. React Hook Form : formulaires React performants avec peu de re-rendus.',
    cv: 'Tailwind figure dans ton écosystème React, et React Hook Form dans ton CV (moteur de recherche, projet SeLoger). Deux points de la stack de l’offre que tu coches.',
    body: `
<h2>Tailwind CSS</h2>
<p>Framework <b>utility-first</b> : on compose le style directement dans le JSX avec de petites classes (<code>flex</code>, <code>p-4</code>, <code>text-sm</code>, <code>hover:bg-blue-600</code>).</p>
<ul>
<li><b>Responsive</b> avec des préfixes : <code>md:flex-row</code>, <code>lg:w-1/2</code> (mobile d’abord).</li>
<li><b>États</b> : <code>hover:</code>, <code>focus:</code>, <code>disabled:</code>, thème sombre avec <code>dark:</code>.</li>
<li><b>Configuration</b> : couleurs, espacements, polices (design tokens) dans la config du thème.</li>
<li><b>Moteur JIT</b> : seules les classes utilisées sont générées, d’où un CSS final léger.</li>
<li><b>Variantes de composant</b> : <code>clsx</code> et <code>class-variance-authority</code> pour éviter les chaînes de classes illisibles ; <code>@apply</code> avec modération.</li>
<li>Inconvénient : JSX chargé de classes ; atout : cohérence, pas de CSS mort, pas de nommage à inventer.</li>
</ul>
<h2>React Hook Form</h2>
<p>Bibliothèque de formulaires basée sur des champs <b>non contrôlés</b> : l’état vit dans le DOM, ce qui évite de re-rendre le formulaire à chaque frappe.</p>
<ul>
<li><code>useForm()</code> fournit <code>register</code>, <code>handleSubmit</code> et <code>formState.errors</code>.</li>
<li><b>Validation</b> par règles intégrées, ou schéma <b>Zod</b> / Yup via un <i>resolver</i>.</li>
<li><code>Controller</code> pour les composants contrôlés (sélecteurs, bibliothèques UI), <code>useFieldArray</code> pour les listes de champs.</li>
<li>Avec TypeScript : le type du formulaire se déduit du schéma Zod.</li>
</ul>
[[code
const { register, handleSubmit, formState: { errors } } = useForm<{ email: string }>()

<form onSubmit={handleSubmit((data) => save(data))} className="flex flex-col gap-2">
  <input {...register('email', { required: 'Email obligatoire' })} className="rounded border p-2" />
  {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
  <button className="rounded bg-blue-600 px-3 py-2 text-white">Envoyer</button>
</form>
]]
<h2>Tailwind : variants, responsive et mode sombre</h2>
<table><tr><th>Besoin</th><th>Exemple</th><th>Remarque</th></tr>
<tr><td>Breakpoint</td><td><code>md:flex-row</code></td><td>Mobile d’abord : la classe sans préfixe vaut pour tous les écrans, le préfixe s’applique à partir du breakpoint</td></tr>
<tr><td>État</td><td><code>hover:bg-blue-700 focus:ring-2 disabled:opacity-50</code></td><td>Plusieurs variants se combinent : <code>md:hover:underline</code></td></tr>
<tr><td>Mode sombre</td><td><code>dark:bg-gray-900</code></td><td>Selon la préférence système ou une classe posée sur l’élément racine, selon la configuration</td></tr>
<tr><td>Parent ou frère</td><td><code>group-hover:</code>, <code>peer-checked:</code></td><td>On marque le parent avec <code>group</code> ou le frère avec <code>peer</code></td></tr>
<tr><td>Valeur arbitraire</td><td><code>grid-cols-[1fr_2fr]</code></td><td>À réserver aux cas qui ne justifient pas un token</td></tr></table>
<h2>Tailwind : composition et limites</h2>
[[code
// Variantes d'un bouton avec class-variance-authority
const button = cva('rounded px-3 py-2 font-medium', {
  variants: {
    intent: { primary: 'bg-blue-600 text-white', ghost: 'bg-transparent text-blue-600' },
    size: { sm: 'text-sm', md: 'text-base' },
  },
  defaultVariants: { intent: 'primary', size: 'md' },
})

<button className={button({ intent: 'ghost', size: 'sm' })}>Annuler</button>
]]
<ul>
<li><b>Composer</b> : extraire un composant React (un <code>Button</code>) plutôt que de copier la même chaîne de classes partout. C’est la bonne abstraction, bien plus que <code>@apply</code>.</li>
<li><b>@apply</b> : utile pour styler du HTML qu’on ne contrôle pas (contenu Markdown, bibliothèque tierce), mais il recrée du CSS à nommer et à maintenir.</li>
<li><b>Classes dynamiques</b> : une classe construite par concaténation (<code>'text-' + color + '-500'</code>) n’est pas détectée à la génération. Il faut écrire les noms complets ou les lister dans un objet.</li>
<li><b>Conflits de classes</b> : si deux classes agissent sur la même propriété, c’est l’ordre dans la feuille de style qui décide, pas l’ordre dans l’attribut. Un utilitaire comme <code>tailwind-merge</code> résout ces conflits quand on surcharge des classes en props.</li>
<li><b>Lisibilité</b> : un plugin Prettier trie les classes, et un linter peut signaler les classes inutiles ou contradictoires.</li>
<li><b>Accessibilité</b> : les classes ne remplacent pas le HTML sémantique ni les attributs ARIA ; <code>sr-only</code> masque visuellement un texte en le gardant lisible par les lecteurs d’écran.</li>
</ul>
<h2>React Hook Form : register et Controller</h2>
<table><tr><th>Outil</th><th>Usage</th><th>Détail</th></tr>
<tr><td><code>register</code></td><td>Champs natifs (input, select, textarea)</td><td>Renvoie les props <code>name</code>, <code>ref</code>, <code>onChange</code>, <code>onBlur</code> à étaler sur le champ</td></tr>
<tr><td><code>Controller</code> / <code>useController</code></td><td>Composants contrôlés (sélecteur de bibliothèque UI, date picker)</td><td>Fait le pont avec un composant qui attend <code>value</code> et <code>onChange</code></td></tr>
<tr><td><code>watch</code></td><td>Lire une valeur pour l’afficher ou conditionner un champ</td><td>Re-rend le composant à chaque changement de la valeur observée</td></tr>
<tr><td><code>getValues</code></td><td>Lire les valeurs ponctuellement (dans un gestionnaire)</td><td>Ne déclenche aucun re-rendu</td></tr>
<tr><td><code>setValue</code>, <code>reset</code></td><td>Modifier une valeur, réinitialiser le formulaire</td><td><code>reset(data)</code> sert à pré-remplir un formulaire d’édition après un chargement</td></tr></table>
<h2>React Hook Form : validation avec Zod</h2>
[[code
const schema = z.object({
  email: z.string().email('Email invalide'),
  age: z.coerce.number().min(18, 'Majeur requis'),
})
type FormValues = z.infer<typeof schema>

const { register, handleSubmit, formState: { errors, isSubmitting } } =
  useForm<FormValues>({ resolver: zodResolver(schema), mode: 'onBlur' })

async function onSubmit(data: FormValues) {
  await save(data)
}
]]
<ul>
<li><b>mode</b> : moment de la validation (<code>onSubmit</code> par défaut, <code>onBlur</code>, <code>onChange</code>, <code>onTouched</code>, <code>all</code>). Après une première soumission, la revalidation se fait à chaque changement par défaut.</li>
<li><b>Valeurs par défaut</b> : à passer dans <code>defaultValues</code> pour que les champs soient initialisés et que <code>reset</code> sache vers quoi revenir.</li>
<li><b>Erreurs</b> : <code>errors.champ?.message</code> pour afficher le message ; <code>setError</code> pour injecter une erreur renvoyée par le serveur (email déjà utilisé, par exemple).</li>
<li><b>État de soumission</b> : <code>isSubmitting</code> pour désactiver le bouton, <code>isDirty</code> et <code>isValid</code> pour piloter l’interface.</li>
<li>Les champs numériques d’un input HTML sont des chaînes : conversion avec <code>valueAsNumber</code> dans <code>register</code> ou <code>z.coerce.number()</code> dans le schéma.</li>
<li>Avantage du schéma : la <b>même validation</b> peut servir côté client et côté serveur, et le type TypeScript est déduit sans duplication.</li>
</ul>
<h2>React Hook Form : formulaires dynamiques et performances</h2>
[[code
const { control, register } = useForm<{ items: { name: string }[] }>({
  defaultValues: { items: [{ name: '' }] },
})
const { fields, append, remove } = useFieldArray({ control, name: 'items' })

{fields.map((field, index) => (
  <div key={field.id}>
    <input {...register('items.' + index + '.name')} />
    <button type="button" onClick={() => remove(index)}>Supprimer</button>
  </div>
))}
<button type="button" onClick={() => append({ name: '' })}>Ajouter</button>
]]
<ul>
<li><b>useFieldArray</b> : gère l’ajout, la suppression, le déplacement et l’insertion de lignes. La clé React doit être <code>field.id</code> (généré par la bibliothèque), pas l’index.</li>
<li><b>FormProvider</b> et <code>useFormContext</code> : partagent le formulaire avec des composants enfants sans faire descendre les props, utile pour les formulaires découpés en sections ou en étapes.</li>
<li><b>useWatch</b> : isole le re-rendu dans le composant qui observe la valeur, plutôt que de re-rendre tout le formulaire avec <code>watch</code>.</li>
<li><b>Champs contrôlés lourds</b> : limiter leur nombre ; chaque <code>Controller</code> re-rend son champ à chaque changement de sa valeur.</li>
<li><b>Pièges fréquents</b> : oublier <code>type="button"</code> sur un bouton qui ne doit pas soumettre, oublier le <code>name</code> unique, ou utiliser <code>register</code> sur un composant qui ne transmet pas la <code>ref</code>.</li>
</ul>
<h2>Les associer</h2>
<p>Tailwind stylise le formulaire (états d’erreur avec <code>border-red-500</code>, champs désactivés avec <code>disabled:</code>), React Hook Form gère les données et la validation. On encapsule généralement le couple dans des composants réutilisables (<code>TextField</code>, <code>SelectField</code>) qui reçoivent <code>register</code> ou <code>control</code>, affichent le libellé, le champ et le message d’erreur, avec <code>aria-invalid</code> et <code>aria-describedby</code> pour l’accessibilité.</p>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Pourquoi des champs non contrôlés ?</dt><dd>La valeur vit dans le DOM et n’est lue qu’à la soumission ou à la validation : pas de re-rendu du formulaire à chaque frappe, donc des formulaires longs restent fluides.</dd>
<dt>Comment valider avec Zod ?</dt><dd>On décrit le schéma (<code>z.object({ email: z.string().email() })</code>), on le passe à <code>useForm</code> via <code>zodResolver</code>, et le type TypeScript du formulaire se déduit du schéma avec <code>z.infer</code>.</dd>
<dt>Comment gérer un formulaire multi-étapes ?</dt><dd>Un seul <code>useForm</code> partagé (ou un <code>FormProvider</code>), une validation par étape avec <code>trigger</code> sur les champs de l’étape, et l’état de l’étape courante dans le routeur ou un état local.</dd>
<dt>Tailwind ou CSS-in-JS : avantages et limites ?</dt><dd>Tailwind : rapide, cohérent, CSS final léger, mais JSX chargé. CSS-in-JS (styled-components) : styles liés au composant et aux props, mais coût à l’exécution. Les deux marchent ; on choisit un seul système par projet.</dd>
<dt>Faut-il utiliser @apply partout pour alléger le JSX ?</dt><dd>Non. La bonne réponse est d’extraire un composant React ou des variantes (clsx, class-variance-authority). <code>@apply</code> se garde pour du HTML non maîtrisé.</dd>
<dt>Quand préférer Controller à register ?</dt><dd>Quand le composant est contrôlé (attend <code>value</code> et <code>onChange</code>), comme un sélecteur de bibliothèque UI. Pour un input natif, <code>register</code> suffit et reste plus performant.</dd>
<dt>Comment gérer une liste de champs répétables ?</dt><dd>Avec <code>useFieldArray</code> : <code>fields</code> pour le rendu (clé <code>field.id</code>), <code>append</code> et <code>remove</code> pour modifier la liste.</dd>
</dl>`,
  },
  {
    id: 'nextjs-ssr',
    label: 'Next.js, SSR et SSG',
    category: 'Frameworks React',
    level: 'acquis',
    terms: ['Next.js', 'SSR', 'SSG', 'server-side rendering', 'rendu serveur', 'SEO'],
    summary: 'Next.js est un framework React qui ajoute le routage, le rendu côté serveur (SSR), la génération statique (SSG) et de nombreuses optimisations (SEO, images, découpage du code).',
    cv: 'Tu as migré le parcours KYC de Next.js 12 à 15 (Pages Router vers App Router, Server/Client Components, SSG) et mis en place le SSR des pages de résultats chez SeLoger : c’est un point fort pour cette offre.',
    body: `
<h2>Définition</h2>
<p>Une application React « classique » (SPA) est rendue dans le navigateur : la page arrive vide, puis le JavaScript construit l’interface. <b>Next.js</b> permet de produire le HTML <b>avant</b> d’arriver au navigateur, ce qui améliore le temps d’affichage perçu et le référencement (SEO).</p>
<h2>Modes de rendu</h2>
<table><tr><th>Mode</th><th>Quand le HTML est produit</th><th>Usage</th></tr>
<tr><td><b>SSG</b> (statique)</td><td>À la compilation</td><td>Pages qui changent peu : blog, documentation, pages marketing</td></tr>
<tr><td><b>SSR</b></td><td>À chaque requête, sur le serveur</td><td>Contenu dynamique ou personnalisé, SEO nécessaire</td></tr>
<tr><td><b>ISR</b> / revalidation</td><td>Statique, régénéré après un délai ou à la demande</td><td>Catalogue, pages produit</td></tr>
<tr><td><b>CSR</b></td><td>Dans le navigateur</td><td>Zones très interactives, derrière une connexion</td></tr></table>
<h2>App Router</h2>
<ul>
<li>Dossier <code>app/</code> : chaque dossier est une route, avec <code>page.tsx</code>, <code>layout.tsx</code>, <code>loading.tsx</code>, <code>error.tsx</code>.</li>
<li><b>Server Components</b> par défaut : s’exécutent sur le serveur, peuvent lire une base ou une API directement, n’envoient pas leur JavaScript au navigateur.</li>
<li><b>Client Components</b> : <code>"use client"</code> en première ligne, pour les états, effets et événements.</li>
<li><b>Route Handlers</b> (<code>route.ts</code>) : endpoints d’API, utiles pour un BFF.</li>
<li><code>next/image</code>, <code>next/font</code>, <code>next/link</code> : images, polices et navigation optimisées.</li>
</ul>
[[code
// app/produits/[id]/page.tsx : Server Component
export const revalidate = 3600 // régénération au plus toutes les heures

export default async function Produit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const produit = await fetch('https://api.exemple.fr/produits/' + id).then((r) => r.json())
  return <h1>{produit.nom}</h1>
}
]]
<h2>Migrer progressivement vers Next.js</h2>
<ul>
<li>Next.js accepte les deux routeurs en même temps : on migre page par page de <code>pages/</code> vers <code>app/</code>.</li>
<li>Une application Vite ou Create React App se migre en déplaçant les routes, en remplaçant React Router par le routage fichier et en traitant les accès à <code>window</code> côté client uniquement.</li>
<li>Vérifier le SEO (métadonnées, <code>generateMetadata</code>), les Web Vitals et l’hydratation avant de généraliser.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Quelle différence entre SSR et SSG ?</dt><dd>SSG produit le HTML une fois à la compilation (très rapide, mis en cache) ; SSR le produit à chaque requête (contenu toujours frais ou personnalisé, mais plus de charge serveur).</dd>
<dt>Qu’est-ce que l’hydratation ?</dt><dd>Le navigateur reçoit du HTML déjà prêt, puis React « rattache » les événements et l’état à ce HTML. Si le HTML serveur et le premier rendu client diffèrent, React signale une erreur d’hydratation.</dd>
<dt>Server Component ou Client Component ?</dt><dd>Server par défaut (moins de JavaScript envoyé, accès direct aux données). Client seulement quand il faut de l’état, des effets ou des événements navigateur, le plus bas possible dans l’arbre.</dd>
<dt>Comment Next.js aide le SEO ?</dt><dd>Le contenu est présent dans le HTML initial, les métadonnées sont générées côté serveur, et les performances (Web Vitals) sont meilleures grâce au découpage du code et à l’optimisation des images.</dd>
</dl>`,
  },
  {
    id: 'react-native-expo',
    label: 'React Native et Expo',
    category: 'Mobile',
    level: 'partiel',
    terms: ['React Native', 'Expo', 'mobiles', 'mobile', 'applications mobiles'],
    summary: 'React Native permet de construire des applications iOS et Android avec React : les composants sont traduits en vues natives. Expo fournit l’outillage (build, mises à jour, modules) pour aller plus vite.',
    cv: 'Ton projet personnel Azimuth Quiz est une seule base de code Expo / React Native pour web, iOS et Android (Firebase, Zustand, Jest, Storybook), et ta formation Le Réacteur couvre React Native. Pas d’expérience professionnelle : à assumer comme un projet solide mais personnel.',
    body: `
<h2>Définition</h2>
<p><b>React Native</b> réutilise le modèle de React (composants, props, état, hooks) mais, au lieu de produire du HTML, pilote des <b>composants natifs</b> : <code>View</code>, <code>Text</code>, <code>Image</code>, <code>ScrollView</code>, <code>FlatList</code>. Le code est en TypeScript, le rendu est natif sur iOS et Android.</p>
<h2>Différences avec React pour le web</h2>
<table><tr><th>Web</th><th>React Native</th></tr>
<tr><td><code>div</code>, <code>span</code>, <code>p</code></td><td><code>View</code>, <code>Text</code> (le texte doit être dans un <code>Text</code>)</td></tr>
<tr><td>CSS, classes, styled-components</td><td>Objets de style (<code>StyleSheet</code>), Flexbox par défaut en colonne, pas de cascade</td></tr>
<tr><td>React Router, URL</td><td>React Navigation ou Expo Router (pile d’écrans)</td></tr>
<tr><td>Événement <code>onClick</code></td><td><code>onPress</code> (<code>Pressable</code>)</td></tr>
<tr><td>Liste avec <code>map</code></td><td><code>FlatList</code> (virtualisée)</td></tr></table>
<h2>Expo</h2>
<ul>
<li><b>Expo Router</b> : routage par fichiers, comme Next.js, sur mobile et web.</li>
<li><b>EAS Build / Update</b> : compilation des applications dans le cloud, mises à jour sans passer par les stores.</li>
<li>Modules prêts à l’emploi : caméra, notifications, fichiers, localisation.</li>
<li>Le <i>development build</i> permet d’ajouter du code natif quand un module Expo ne suffit pas.</li>
</ul>
[[code
import { FlatList, Pressable, Text } from 'react-native'

export const Liste = ({ items, onChoisir }: { items: string[]; onChoisir: (nom: string) => void }) => (
  <FlatList
    data={items}
    keyExtractor={(nom) => nom}
    renderItem={({ item }) => (
      <Pressable onPress={() => onChoisir(item)}>
        <Text>{item}</Text>
      </Pressable>
    )}
  />
)
]]
<h2>Partager du code entre web et mobile</h2>
<ul>
<li>Mutualiser la logique (hooks, appels API, types, validations) ; les composants d’interface restent propres à chaque plateforme, ou passent par <code>react-native-web</code>.</li>
<li>Un design system commun passe par des <b>tokens</b> (couleurs, espacements, typographie) partagés plutôt que par les mêmes composants.</li>
<li>Tests : Jest et React Native Testing Library pour les composants, Detox pour les tests e2e sur appareil ou émulateur.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>React Native, c’est du web dans une application ?</dt><dd>Non, ce n’est pas une WebView : les composants React deviennent de vraies vues natives. C’est ce qui distingue React Native d’Ionic ou Cordova.</dd>
<dt>Quel intérêt d’Expo ?</dt><dd>Un outillage prêt à l’emploi (démarrage, build cloud, mises à jour, modules). On le garde dans la plupart des projets ; on ajoute du code natif via un development build au besoin.</dd>
<dt>Comment garder des performances correctes ?</dt><dd>Listes virtualisées (<code>FlatList</code>), limiter les re-rendus (<code>memo</code>, état local), animations sur le thread natif (Reanimated), images à la bonne taille.</dd>
<dt>Comment assurer la cohérence web et mobile ?</dt><dd>Un design system partagé (tokens, comportements documentés), une logique métier commune dans des paquets partagés, et des tests sur chaque plateforme.</dd>
</dl>`,
  },
  {
    id: 'react-query',
    label: 'React Query (TanStack Query) : état serveur',
    category: 'Gestion d’état',
    level: 'à préparer',
    terms: ['React-query', 'React Query', 'TanStack Query'],
    summary: 'React Query gère les données qui viennent d’un serveur : cache, rechargement, états de chargement et d’erreur, mutations. Il laisse à Redux ou à l’état local le seul état de l’interface.',
    cv: 'Ton CV cite Redux et Zustand mais pas React Query. Le principe (séparer état serveur et état d’interface) t’est familier ; prévoir de pratiquer l’API sur un petit projet avant l’entretien.',
    body: `
<h2>Définition</h2>
<p>Les données d’un serveur ne sont pas un « état » comme les autres : elles sont distantes, partagées, peuvent devenir obsolètes. <b>TanStack Query</b> (anciennement React Query) les traite comme un <b>cache</b> : il les récupère, les mémorise, les rafraîchit et gère les cas limites (chargement, erreur, relance).</p>
<h2>Notions clés</h2>
<ul>
<li><code>useQuery</code> : lecture. Identifiée par une <b>clé</b> (<code>queryKey</code>) qui sert de clé de cache.</li>
<li><code>useMutation</code> : écriture (POST, PUT, DELETE), avec <code>onSuccess</code> pour invalider ou mettre à jour le cache.</li>
<li><b>staleTime</b> : durée pendant laquelle la donnée est considérée fraîche (pas de nouvel appel). <b>gcTime</b> : durée de conservation en mémoire sans utilisateur.</li>
<li><b>Invalidation</b> : <code>queryClient.invalidateQueries</code> marque des données obsolètes et les recharge.</li>
<li>Rechargement automatique au retour sur l’onglet ou à la reconnexion, relances en cas d’échec, pagination et scroll infini (<code>useInfiniteQuery</code>), mises à jour optimistes.</li>
</ul>
[[code
const { data, isPending, error } = useQuery({
  queryKey: ['clients', page],
  queryFn: () => fetch('/api/clients?page=' + page).then((r) => r.json()),
  staleTime: 60_000,
})

const queryClient = useQueryClient()
const creer = useMutation({
  mutationFn: (client: NouveauClient) => api.post('/clients', client),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
})
]]
<h2>Redux et React Query ensemble</h2>
<ul>
<li><b>React Query</b> : tout ce qui vient du serveur (listes, détails, cache).</li>
<li><b>Redux</b> : l’état d’interface et du client (panier en cours, filtres, étapes d’un parcours, préférences).</li>
<li>On évite de copier les données serveur dans Redux : un seul endroit pour chaque donnée, pas de synchronisation à maintenir.</li>
<li>Redux Toolkit propose <b>RTK Query</b>, qui joue le même rôle dans l’écosystème Redux.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Pourquoi ne pas tout mettre dans Redux ?</dt><dd>Il faudrait réécrire à la main le cache, les états de chargement et d’erreur, les rechargements et l’invalidation. React Query les fournit et évite les données dupliquées.</dd>
<dt>Quelle différence entre staleTime et gcTime ?</dt><dd>staleTime : combien de temps la donnée est « fraîche » (aucun nouvel appel réseau). gcTime : combien de temps elle reste en mémoire quand plus aucun composant ne l’utilise.</dd>
<dt>Comment mettre à jour la liste après une création ?</dt><dd>Dans <code>onSuccess</code> de la mutation : invalider la clé de la liste (rechargement) ou écrire directement dans le cache avec <code>setQueryData</code>.</dd>
<dt>À quoi sert la clé de requête ?</dt><dd>C’est l’identifiant du cache : elle contient les paramètres (page, filtre). Quand un paramètre change, la clé change et une nouvelle requête est lancée.</dd>
</dl>`,
  },
  {
    id: 'monitoring-front',
    label: 'Supervision front-end : Datadog et Sentry',
    category: 'Qualité & livraison',
    level: 'partiel',
    terms: ['Datadog', 'Sentry', 'monitoring', 'Suivi de qualité et de performance', 'Crashlytics', 'crashs', 'Monitorer'],
    summary: 'Surveiller une application en production : remonter les erreurs JavaScript (Sentry), mesurer la performance réelle et suivre les parcours des utilisateurs (Datadog RUM, logs, métriques).',
    cv: 'Datadog figure dans les outils de ton CV. Prépare un exemple concret d’usage (un tableau de bord, une alerte, une régression de performance détectée). Sentry n’est pas cité : à présenter comme un outil du même type que tu connais en principe.',
    body: `
<h2>Définition</h2>
<p>Les tests protègent avant la mise en production ; la <b>supervision</b> protège après. Elle répond à trois questions : que s’est-il cassé (<b>erreurs</b>), est-ce lent (<b>performance</b>), que font les utilisateurs (<b>parcours</b>).</p>
<h2>Les outils</h2>
<table><tr><th>Outil</th><th>Rôle</th></tr>
<tr><td><b>Sentry</b></td><td>Capture des erreurs JavaScript avec la pile d’appels, la version, le navigateur, le parcours qui a précédé (breadcrumbs) ; regroupement des erreurs identiques ; alertes ; liaison avec les <i>source maps</i> pour lire le code d’origine</td></tr>
<tr><td><b>Datadog RUM</b> (Real User Monitoring)</td><td>Mesures sur de vrais utilisateurs : Web Vitals (LCP, CLS, INP), temps de chargement, appels réseau lents, sessions rejouables</td></tr>
<tr><td><b>Datadog logs / APM</b></td><td>Logs et traces des services back-end, corrélés aux sessions front pour suivre une requête de bout en bout</td></tr></table>
<h2>Mise en place</h2>
<ul>
<li>Initialiser le SDK au démarrage de l’application avec l’environnement (<code>production</code>, <code>staging</code>) et la <b>version</b> déployée.</li>
<li>Envoyer les <b>source maps</b> au moment du build (CI) sans les publier.</li>
<li>Entourer l’interface d’un <b>Error Boundary</b> qui signale l’erreur et affiche un écran de secours.</li>
<li>Ne jamais envoyer de données personnelles (mots de passe, champs de formulaire) : masquage et filtrage.</li>
<li>Définir des alertes sur des seuils utiles (taux d’erreurs, LCP) plutôt que sur chaque erreur.</li>
</ul>
[[code
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  release: import.meta.env.VITE_APP_VERSION,
  tracesSampleRate: 0.1, // 10 % des sessions pour la performance
})

export const App = () => (
  <Sentry.ErrorBoundary fallback={<p>Une erreur est survenue.</p>}>
    <Routes />
  </Sentry.ErrorBoundary>
)
]]
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Pourquoi des source maps ?</dt><dd>Le code envoyé au navigateur est minifié : sans source map, la pile d’erreur est illisible. Avec elle, l’outil retrouve le fichier et la ligne du code TypeScript d’origine.</dd>
<dt>Quelle différence entre mesure synthétique et RUM ?</dt><dd>La mesure synthétique (Lighthouse, tests programmés) est reproductible mais artificielle. Le RUM mesure de vrais utilisateurs, avec leurs appareils et leurs réseaux, donc la performance réellement vécue.</dd>
<dt>Comment éviter le bruit des alertes ?</dt><dd>Alerter sur des tendances (taux d’erreurs, dégradation d’un indicateur) plutôt que sur chaque erreur, regrouper les doublons et ignorer les erreurs sans action possible (extensions de navigateur, réseaux coupés).</dd>
<dt>Comment relier un bug utilisateur à une cause ?</dt><dd>Avec la version déployée, la pile d’appels, les breadcrumbs, la session rejouée et un identifiant de corrélation passé aussi au back-end.</dd>
</dl>`,
  },
  {
    id: 'ia-claude-code',
    label: 'Développer avec l’IA : Claude Code et assistants',
    category: 'Méthode',
    level: 'partiel',
    terms: ['Claude code', 'Cursor', 'IA', 'l’IA', 'workflow', 'outils d’IA'],
    summary: 'Utiliser un assistant de code (Claude Code, Copilot) comme un collègue rapide mais faillible : on cadre, on fait lire le code existant, on relit, on teste. L’exigence de qualité reste celle du développeur.',
    cv: 'Ton CV cite VS Code, Copilot et Claude, et ta formation Le Réacteur (2026) couvre l’IA. Prépare un exemple concret : une tâche menée avec l’assistant, ce que tu as relu ou corrigé, et un cas où tu as refusé sa proposition.',
    body: `
<h2>Définition</h2>
<p><b>Claude Code</b> est un assistant de programmation qui travaille dans le terminal et dans le dépôt : il lit les fichiers, propose et applique des modifications, lance les tests et les commandes, avec l’accord du développeur. Les assistants comme Copilot complètent plutôt du code dans l’éditeur.</p>
<h2>Un workflow efficace</h2>
<ol>
<li><b>Cadrer</b> : décrire le résultat attendu, les contraintes (conventions, tests, périmètre), les fichiers concernés.</li>
<li><b>Explorer avant de modifier</b> : faire lire le code existant et proposer un plan, le valider.</li>
<li><b>Avancer par petites étapes</b> : un changement, un test, un commit, plutôt qu’un très gros lot.</li>
<li><b>Relire comme une revue de code</b> : l’auteur du code reste le développeur, et il en répond.</li>
<li><b>Vérifier</b> : tests, typage, lint, exécution réelle de la fonctionnalité.</li>
</ol>
<h2>Cadrer le projet : le fichier CLAUDE.md</h2>
<ul>
<li>Fichier à la racine du dépôt : commandes de test et de build, conventions de code, architecture, règles (« ne pas modifier tel dossier »).</li>
<li>Il est relu à chaque session : l’assistant respecte les règles de l’équipe sans qu’on les répète.</li>
<li>Des <b>skills</b> décrivent des procédures répétables (par exemple « créer un composant selon la structure du projet »).</li>
</ul>
<h2>Risques et bonnes pratiques</h2>
<ul>
<li>Code plausible mais faux, API inventées, tests qui valident le bug : toujours vérifier avec des tests et la documentation.</li>
<li>Pas de secrets, clés ni données personnelles dans les échanges ; respecter la politique de l’entreprise.</li>
<li>Garder une architecture cohérente : l’assistant suit les conventions du dépôt si elles sont écrites et visibles.</li>
<li>Partager les pratiques avec l’équipe : prompts utiles, règles du <code>CLAUDE.md</code>, erreurs fréquentes à surveiller en revue.</li>
</ul>
[[code
# CLAUDE.md (extrait)
- Tests : pnpm test (Jest + React Testing Library). Toute modif de logique = test.
- Composants : un dossier par composant (index.ts, X.tsx, types.ts), exports nommés.
- Interdit : any, commentaires redondants, nouvelles dépendances sans accord.
- Avant de terminer : pnpm lint && pnpm tsc --noEmit
]]
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Comment garder un code bien architecturé avec l’IA ?</dt><dd>Écrire les conventions (CLAUDE.md), faire proposer un plan avant le code, travailler par petits changements, relire chaque modification et la faire valider par les tests, le typage et le lint.</dd>
<dt>Que ne faut-il pas déléguer à l’IA ?</dt><dd>Les décisions d’architecture et de sécurité sans relecture, la gestion des secrets, et tout code que l’on ne comprendrait pas. Le développeur doit pouvoir expliquer et défendre chaque ligne livrée.</dd>
<dt>Comment contrôler la qualité du code généré ?</dt><dd>Revue de code comme pour un collègue, tests automatisés (écrits ou relus par le développeur), analyse statique (ESLint, TypeScript strict) et vérification en conditions réelles.</dd>
<dt>Comment partager les bonnes pratiques dans l’équipe ?</dt><dd>Un CLAUDE.md versionné, des skills partagés, des retours d’expérience réguliers (rétrospective) et des exemples de bonnes et mauvaises utilisations en revue de code.</dd>
</dl>`,
  },
  {
    id: 'angular',
    label: 'Angular (version 18)',
    category: 'Frameworks front-end',
    level: 'à préparer',
    terms: ['Angular 18', 'Angular'],
    summary: 'Angular est un framework complet de Google, en TypeScript : composants, injection de dépendances, routeur, formulaires et HTTP intégrés. La version 18 s’appuie sur les signals et les composants standalone.',
    cv: 'C’est la stack principale du poste et elle n’est pas dans ton CV (React, Vue et Svelte en notions). Les concepts te sont familiers (composants, TypeScript, routage) : prévoir un petit projet Angular avant l’entretien, et le dire honnêtement.',
    body: `
<h2>Définition</h2>
<p><b>Angular</b> est un framework « tout-en-un » écrit en TypeScript : routage, formulaires, client HTTP, injection de dépendances, tests et outil en ligne de commande (Angular CLI) sont fournis. Là où React laisse choisir ses bibliothèques, Angular impose une structure.</p>
<h2>Notions clés</h2>
<ul>
<li><b>Composant</b> : classe TypeScript décorée par <code>@Component</code>, avec un gabarit HTML et ses styles. Depuis les versions récentes, les composants sont <b>standalone</b> (sans <code>NgModule</code>).</li>
<li><b>Signals</b> (<code>signal</code>, <code>computed</code>, <code>effect</code>) : état réactif à granularité fine, qui remplace peu à peu la détection de changements globale de zone.js.</li>
<li><b>Nouvelle syntaxe de gabarit</b> : <code>@if</code>, <code>@for</code>, <code>@switch</code> à la place de <code>*ngIf</code> et <code>*ngFor</code>.</li>
<li><b>Injection de dépendances</b> : les services sont fournis par le framework (<code>inject()</code> ou le constructeur), ce qui facilite les tests.</li>
<li><b>RxJS</b> : flux asynchrones (<code>Observable</code>) pour le HTTP et les événements ; le pipe <code>async</code> s’abonne et se désabonne dans le gabarit.</li>
<li><b>Routeur</b> : routes, guards, resolvers, chargement paresseux (<code>loadComponent</code>).</li>
<li><b>Formulaires</b> : « template-driven » ou « reactive forms » (<code>FormGroup</code>, validateurs), plus adaptés aux formulaires complexes.</li>
</ul>
[[code
@Component({
  selector: 'app-compteur',
  standalone: true,
  template: '<button (click)="ajouter()">{{ total() }}</button>',
})
export class CompteurComponent {
  total = signal(0)
  ajouter() {
    this.total.update((n) => n + 1)
  }
}
]]
<h2>Comparaison avec React</h2>
<table><tr><th></th><th>React</th><th>Angular</th></tr>
<tr><td>Nature</td><td>Bibliothèque d’interface</td><td>Framework complet</td></tr>
<tr><td>État</td><td><code>useState</code>, Redux, Zustand</td><td>Signals, services, RxJS</td></tr>
<tr><td>Gabarit</td><td>JSX (JavaScript)</td><td>HTML avec syntaxe propre</td></tr>
<tr><td>Données et dépendances</td><td>Props, contexte</td><td>Injection de dépendances</td></tr>
<tr><td>Choix d’outils</td><td>Libre</td><td>Imposés par le framework</td></tr></table>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Quelle différence entre signal et Observable ?</dt><dd>Un signal contient toujours une valeur courante et notifie les consommateurs de ses changements (état synchrone). Un Observable est un flux dans le temps (HTTP, événements) que l’on transforme avec des opérateurs. On convertit de l’un à l’autre avec <code>toSignal</code> et <code>toObservable</code>.</dd>
<dt>Qu’est-ce qu’un composant standalone ?</dt><dd>Un composant qui déclare lui-même ses dépendances (<code>imports</code>) sans appartenir à un <code>NgModule</code>. C’est le mode par défaut des versions récentes d’Angular.</dd>
<dt>À quoi sert l’injection de dépendances ?</dt><dd>À fournir aux composants leurs services sans qu’ils les créent eux-mêmes : on partage une instance, et on la remplace facilement par un faux dans les tests.</dd>
<dt>Comment éviter les fuites mémoire avec RxJS ?</dt><dd>Utiliser le pipe <code>async</code>, <code>takeUntilDestroyed()</code> ou <code>toSignal</code> pour se désabonner automatiquement à la destruction du composant.</dd>
</dl>`,
  },
  {
    id: 'postgresql',
    label: 'PostgreSQL et bases de données relationnelles',
    category: 'Back-end',
    level: 'à préparer',
    terms: ['PostgreSQL', 'postgresql', 'bases de données relationnelles', 'Postgresql'],
    summary: 'PostgreSQL est une base de données relationnelle : les données sont rangées dans des tables liées entre elles et interrogées en SQL, avec transactions et contraintes d’intégrité.',
    cv: 'Ton CV cite MongoDB, Firestore et Oracle (projet Numericable), pas PostgreSQL. Les notions SQL de base viennent de ton Master MIAGE et d’Oracle ; à réviser : jointures, index, transactions.',
    body: `
<h2>Définition</h2>
<p>Une base <b>relationnelle</b> organise les données en <b>tables</b> (lignes et colonnes) reliées par des <b>clés étrangères</b>. On l’interroge en <b>SQL</b>. <b>PostgreSQL</b> est une des bases libres les plus utilisées ; elle gère les transactions, les contraintes et des types riches (JSON, tableaux, dates).</p>
<h2>Notions clés</h2>
<ul>
<li><b>Clé primaire</b> identifie une ligne ; <b>clé étrangère</b> la relie à une autre table.</li>
<li><b>Jointures</b> : <code>INNER JOIN</code> (lignes présentes des deux côtés), <code>LEFT JOIN</code> (toutes celles de gauche).</li>
<li><b>Index</b> : accélèrent les lectures sur certaines colonnes, au prix d’écritures un peu plus lentes. <code>EXPLAIN ANALYZE</code> montre le plan d’exécution.</li>
<li><b>Transactions (ACID)</b> : un ensemble d’opérations réussit ou échoue en entier (<code>BEGIN</code>, <code>COMMIT</code>, <code>ROLLBACK</code>).</li>
<li><b>Normalisation</b> : éviter de dupliquer les données en les répartissant dans plusieurs tables.</li>
<li><b>Migrations</b> : évolutions du schéma versionnées dans le dépôt (Knex, Prisma, TypeORM, Flyway).</li>
</ul>
[[code
-- Les 10 derniers dossiers d'une entreprise, avec le nom du responsable
SELECT d.id, d.titre, u.nom
FROM dossiers d
JOIN utilisateurs u ON u.id = d.responsable_id
WHERE d.entreprise_id = 42
ORDER BY d.cree_le DESC
LIMIT 10;

CREATE INDEX idx_dossiers_entreprise ON dossiers (entreprise_id, cree_le DESC);
]]
<h2>Depuis Node.js</h2>
<ul>
<li>Pilote <code>pg</code> ou générateur de requêtes (Knex), ou ORM (Prisma, TypeORM, Sequelize).</li>
<li>Toujours des <b>requêtes paramétrées</b> (<code>$1, $2</code>) : jamais de texte concaténé, sinon injection SQL.</li>
<li>Un pool de connexions pour ne pas ouvrir une connexion par requête.</li>
</ul>
<h2>Relationnel ou document ?</h2>
<p>Relationnel (PostgreSQL) : données structurées, liens forts, cohérence transactionnelle. Document (MongoDB) : schémas flexibles, données imbriquées. Pour un logiciel métier comme celui de l’offre, le relationnel est le choix habituel.</p>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>À quoi sert un index et quel est son coût ?</dt><dd>Il évite de parcourir toute la table pour trouver des lignes. Coût : de l’espace disque et des écritures plus lentes ; on indexe les colonnes souvent filtrées, jointes ou triées.</dd>
<dt>Que veut dire ACID ?</dt><dd>Atomicité (tout ou rien), Cohérence (les contraintes sont respectées), Isolation (les transactions concurrentes ne se perturbent pas), Durabilité (un changement validé est conservé).</dd>
<dt>Qu’est-ce que le problème N+1 ?</dt><dd>Une requête pour une liste, puis une requête par élément pour ses relations. On le corrige par une jointure ou un chargement groupé.</dd>
<dt>Comment se protéger d’une injection SQL ?</dt><dd>Requêtes paramétrées ou ORM, jamais de concaténation de saisies, et un compte de base avec le minimum de droits.</dd>
</dl>`,
  },
  {
    id: 'node-express',
    label: 'Node.js et Express (API back-end)',
    category: 'Back-end',
    level: 'acquis',
    terms: ['Node', 'Node.js', 'Express', 'fullstack', 'Fullstack'],
    summary: 'Node.js exécute JavaScript côté serveur ; Express est un framework minimal pour construire des API HTTP avec des routes et des middlewares.',
    cv: 'Ton CV cite Node.js, Express, API REST, BFF (Next.js Route Handlers) et MongoDB, et ta formation Le Réacteur (2026) était orientée Full-Stack JS/Node. Ton expérience back-end est en projets, pas en poste dédié : à présenter honnêtement.',
    body: `
<h2>Définition</h2>
<p><b>Node.js</b> est un environnement d’exécution JavaScript hors du navigateur, basé sur le moteur V8, avec une boucle d’événements qui gère de nombreuses connexions sans bloquer. <b>Express</b> ajoute une couche légère pour définir des routes et enchaîner des <b>middlewares</b>.</p>
<h2>Notions clés</h2>
<ul>
<li><b>Boucle d’événements</b> : les opérations d’entrée/sortie (fichiers, réseau, base) sont asynchrones ; un calcul long bloque tout le serveur.</li>
<li><b>Middleware</b> : fonction <code>(req, res, next)</code> exécutée en chaîne (authentification, validation, journalisation, gestion d’erreurs).</li>
<li><b>Routes REST</b> : <code>GET /clients</code>, <code>POST /clients</code>, <code>PUT /clients/:id</code>, avec les bons codes HTTP (200, 201, 400, 401, 403, 404, 500).</li>
<li><b>Validation</b> des entrées (Zod, Joi) et <b>gestion centralisée des erreurs</b>.</li>
<li><b>Authentification</b> : sessions ou jetons JWT, mots de passe hachés (bcrypt, argon2).</li>
<li><b>Tests</b> : Jest et Supertest pour appeler l’API sans démarrer un vrai serveur.</li>
</ul>
[[code
import express from 'express'
import { z } from 'zod'

const app = express()
app.use(express.json())

const Client = z.object({ nom: z.string().min(1), email: z.string().email() })

app.post('/clients', async (req, res, next) => {
  try {
    const client = Client.parse(req.body)
    const cree = await clientsRepository.create(client)
    res.status(201).json(cree)
  } catch (error) {
    next(error)
  }
})

app.use((error, req, res, next) => {
  res.status(error.name === 'ZodError' ? 400 : 500).json({ message: error.message })
})
]]
<h2>Bonnes pratiques</h2>
<ul>
<li>Séparer routes, logique métier (services) et accès aux données (repositories) pour tester chaque couche.</li>
<li>TypeScript partout, types partagés avec le front quand c’est possible.</li>
<li>Variables d’environnement pour la configuration, jamais de secrets dans le code.</li>
<li>Limiter le débit, valider les entrées, activer CORS et les en-têtes de sécurité (<code>helmet</code>).</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Node.js est mono-thread : comment gère-t-il beaucoup de requêtes ?</dt><dd>Les entrées/sorties sont asynchrones et non bloquantes : pendant l’attente d’une base ou d’un réseau, la boucle d’événements traite d’autres requêtes. Les calculs lourds sont confiés à des worker threads ou à un autre service.</dd>
<dt>Qu’est-ce qu’un middleware ?</dt><dd>Une fonction qui reçoit la requête, la réponse et <code>next</code> ; elle peut modifier la requête, répondre, ou passer à la suivante. Ils s’exécutent dans l’ordre de déclaration.</dd>
<dt>Quelle différence entre authentification et autorisation ?</dt><dd>L’authentification vérifie qui est l’utilisateur ; l’autorisation vérifie ce qu’il a le droit de faire (rôles, permissions).</dd>
<dt>Comment structurer une API maintenable ?</dt><dd>Couches séparées (routes, services, accès aux données), validation des entrées, erreurs centralisées, tests d’intégration sur les routes et configuration par environnement.</dd>
</dl>`,
  },
  {
    id: 'mentorat-juniors',
    label: 'Encadrer des développeurs juniors et partager ses connaissances',
    category: 'Méthode',
    level: 'partiel',
    terms: ['juniors', 'Encadrer', 'pédagogue', 'Transmettre', 'partager tes connaissances', 'accompagner', 'leadership technique', 'partager vos connaissances'],
    summary: 'Faire monter en compétence les développeurs moins expérimentés : revues de code constructives, pair programming, explications, délégation progressive et exemples de bonnes pratiques.',
    cv: 'Ton CV cite le pair programming et 15 ans d’expérience, mais pas d’encadrement formel. Prépare 2 ou 3 exemples précis (qui, quoi, résultat) où tu as aidé un développeur plus junior ou transmis une pratique.',
    body: `
<h2>Définition</h2>
<p>Un développeur senior ne produit pas seulement du code : il <b>rend l’équipe meilleure</b>. L’encadrement des juniors passe par les revues de code, le pair programming, l’aide aux choix techniques et la transmission des habitudes de qualité, sans faire à leur place.</p>
<h2>Les outils</h2>
<table><tr><th>Pratique</th><th>Principe</th></tr>
<tr><td><b>Revue de code</b></td><td>Expliquer le « pourquoi » plutôt qu’imposer, poser des questions, distinguer l’obligatoire (bug, sécurité) du souhaitable (style), féliciter ce qui est bien</td></tr>
<tr><td><b>Pair programming</b></td><td>Travailler à deux sur le même code : le junior conduit, le senior guide et explique</td></tr>
<tr><td><b>Délégation progressive</b></td><td>Tâches bien cadrées, puis plus autonomes, avec un point régulier</td></tr>
<tr><td><b>Documentation et exemples</b></td><td>Guides de conventions, modèles de composants, décisions d’architecture écrites</td></tr>
<tr><td><b>Retours réguliers</b></td><td>Points courts et fréquents, objectifs concrets, bilan en rétrospective</td></tr></table>
<h2>Bonnes pratiques</h2>
<ul>
<li>Commencer par comprendre ce que le junior a essayé avant de donner la solution : une question vaut souvent mieux qu’une réponse.</li>
<li>Rendre l’erreur sans risque : tests, intégration continue et revues attrapent les problèmes avant la production.</li>
<li>Adapter le niveau de détail à la personne et à la tâche, et monter progressivement en autonomie.</li>
<li>Rester disponible mais protéger son propre temps : créneaux dédiés pour les questions.</li>
</ul>
<h2>Revues de code : exemples de commentaires</h2>
<table><tr><th>Moins utile</th><th>Plus utile</th></tr>
<tr><td>« Mauvais nom. »</td><td>« Que représente <code>data</code> ici ? Un nom comme <code>userProfile</code> dirait ce que contient la variable sans avoir à lire la suite. »</td></tr>
<tr><td>« Il faut un try/catch. »</td><td>« Que se passe-t-il pour l’utilisateur si cet appel échoue ? À mon avis, on affiche un message et on permet de réessayer ; qu’en penses-tu ? »</td></tr>
<tr><td>« Refais ça avec reduce. »</td><td>« Ta boucle est correcte. Une alternative est <code>reduce</code>, mais elle n’est pas plus lisible ici : je garderais ta version. »</td></tr>
<tr><td>« Pas de tests. »</td><td>« Bloquant : ce calcul de prix n’a aucun test, et une régression coûterait cher. Un cas nominal et un cas limite suffiraient. »</td></tr></table>
<ul>
<li><b>Préfixer</b> les commentaires pour que l’intention soit claire : « bloquant », « suggestion », « question », « détail (nit) », « bravo ».</li>
<li><b>Limiter la taille</b> des demandes de fusion : une petite revue est lue sérieusement, une grosse est survolée.</li>
<li><b>Automatiser le style</b> (formateur, linter) pour que la revue humaine porte sur la conception, la lisibilité et les risques.</li>
<li><b>Relire sa propre revue</b> : un commentaire doit être applicable sans avoir à deviner ce qu’attend le relecteur.</li>
<li>Pour les sujets de fond, passer à l’oral plutôt que d’échanger vingt commentaires écrits.</li>
</ul>
<h2>Pair programming : formats</h2>
<table><tr><th>Format</th><th>Principe</th><th>Quand</th></tr>
<tr><td><b>Pilote et copilote</b></td><td>Une personne tape, l’autre réfléchit à voix haute et guide ; on échange les rôles régulièrement</td><td>Découverte d’une partie du code, bug à comprendre</td></tr>
<tr><td><b>Ping-pong</b></td><td>L’un écrit un test qui échoue, l’autre écrit le code qui le fait passer, puis on inverse</td><td>Apprentissage des tests et du TDD</td></tr>
<tr><td><b>Le junior conduit</b></td><td>Il tient le clavier, le senior pose des questions et n’intervient que sur les blocages</td><td>Montée en autonomie, intégration</td></tr>
<tr><td><b>Mob programming</b></td><td>Toute l’équipe sur un seul écran, un rôle tournant au clavier</td><td>Décision structurante, partage d’une pratique</td></tr></table>
<ul>
<li>Cadrer la séance : objectif précis, durée limitée (une heure environ), pause avant de continuer.</li>
<li>Se retenir de prendre le clavier : montrer en le faisant soi-même transmet moins que guider par des questions.</li>
<li>À distance : partage d’écran et outil de collaboration dans l’éditeur, sinon la séance dérive vite en simple démonstration.</li>
</ul>
<h2>Donner du feedback</h2>
<ul>
<li><b>Situation, comportement, impact</b> : décrire un fait observable (« dans la demande de fusion de mardi, la fonction fait 200 lignes »), puis son effet (« elle est difficile à relire et à tester »), puis la suite proposée.</li>
<li><b>Rapidement</b> : un retour donné le jour même est utile, un retour au bout de trois mois est une surprise.</li>
<li><b>Mélanger</b> renforcement (ce qu’il faut continuer) et amélioration (ce qu’il faut changer), sans appliquer mécaniquement la recette « sandwich ».</li>
<li><b>En privé</b> pour ce qui est difficile, en public pour valoriser une réussite avec son accord.</li>
<li><b>Demander le sien</b> : « Mon accompagnement t’aide-t-il ? Que voudrais-tu que je fasse autrement ? » montre que la relation va dans les deux sens.</li>
</ul>
<h2>Déléguer et intégrer</h2>
<table><tr><th>Niveau</th><th>Ce qu’on confie</th><th>Suivi</th></tr>
<tr><td>1</td><td>Petite tâche avec solution décrite (correction simple, texte, test à ajouter)</td><td>Revue détaillée, pair programming si besoin</td></tr>
<tr><td>2</td><td>Tâche bornée : le résultat est précisé, la méthode est laissée au junior</td><td>Point à mi-parcours, revue normale</td></tr>
<tr><td>3</td><td>Fonctionnalité entière, du découpage à la mise en production</td><td>Point régulier, aide sur demande</td></tr>
<tr><td>4</td><td>Choix techniques sur un périmètre, accompagnement d’un nouvel arrivant</td><td>Retour a posteriori, échanges ponctuels</td></tr></table>
<ul>
<li><b>Onboarding</b> : environnement installable en une commande, guide de démarrage à jour, première tâche réaliste et petite (le « bon premier ticket ») livrée en production dans la première semaine.</li>
<li><b>Référent identifié</b> (parrain ou marraine) pour poser toute question sans crainte de déranger, et un point hebdomadaire pendant les premiers mois.</li>
<li><b>Cadrer une tâche déléguée</b> : objectif, contexte, critères de réussite, échéance, personne à contacter, et ce qui est laissé libre.</li>
<li><b>Objectifs de progression</b> : un ou deux à la fois (par exemple « écrire des tests de composants », « découper les fonctions »), relus lors des points.</li>
</ul>
<h2>Erreurs à éviter</h2>
<ul>
<li><b>Réécrire à sa place</b> : le code est corrigé mais la personne n’apprend rien et la prochaine revue sera identique.</li>
<li><b>Tout déclarer bloquant</b> : le junior ne sait plus ce qui compte vraiment, ou perd confiance.</li>
<li><b>Imposer ses goûts</b> comme des règles : on s’appuie sur les conventions de l’équipe et on explique les compromis.</li>
<li><b>Critiquer la personne</b> plutôt que le code : « ce code est difficile à tester », pas « tu ne sais pas tester ».</li>
<li><b>Déléguer sans cadre</b> ou, à l’inverse, surveiller chaque ligne : les deux freinent l’autonomie.</li>
<li><b>Oublier les réussites</b> : un retour uniquement négatif décourage et finit par faire taire les questions.</li>
<li><b>Garder le savoir pour soi</b> : cela fait du senior un point de blocage unique pour l’équipe.</li>
</ul>
<h2>Mise en situation</h2>
<p>Une développeuse junior propose une demande de fusion de 800 lignes qui mélange un correctif et un refactoring, avec un composant de formulaire qui fait tout lui-même. Une réponse efficace :</p>
<ul>
<li>Commencer par un échange court : « Peux-tu me raconter comment tu as abordé le sujet ? »</li>
<li>Proposer de découper en deux demandes (le correctif d’abord, le refactoring ensuite) et expliquer pourquoi : revue plus fiable, retour en arrière plus facile.</li>
<li>Faire une séance de pair programming de 45 minutes où elle conduit pour extraire un sous-composant et ajouter un test.</li>
<li>Laisser des commentaires préfixés : un seul « bloquant » (gestion d’erreur manquante), deux « suggestions », et un « bravo » sur la clarté des noms.</li>
<li>Noter la convention de découpage dans le guide de l’équipe, pour que la règle serve aux suivants.</li>
<li>Au point suivant, vérifier la progression : taille des demandes suivantes, nombre de commentaires répétés.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Comment faire une revue de code utile à un junior ?</dt><dd>Commenter le raisonnement (« pourquoi ») plutôt que seulement corriger, proposer des alternatives, séparer ce qui bloque de ce qui est facultatif, et signaler aussi les points réussis.</dd>
<dt>Que faire quand un junior est bloqué depuis longtemps ?</dt><dd>Lui demander ce qu’il a essayé, le guider avec des questions, faire une courte session de pair programming, puis lui laisser terminer. L’objectif est qu’il apprenne à se débloquer seul.</dd>
<dt>Comment transmettre sans devenir un goulot d’étranglement ?</dt><dd>En écrivant les conventions et les décisions, en faisant des revues croisées, en partageant en équipe (présentations courtes) et en formant d’autres relais.</dd>
<dt>Comment mesurer que ça fonctionne ?</dt><dd>Autonomie croissante, qualité des revues reçues, diminution des mêmes erreurs, et retours du junior lors des points réguliers.</dd>
<dt>Pair programming ou revue asynchrone ?</dt><dd>Le pair programming convient aux sujets nouveaux, aux blocages et à l’intégration (retour immédiat). La revue asynchrone coûte moins de temps, laisse une trace écrite et suit bien les changements cadrés. On les combine selon la personne et la tâche.</dd>
<dt>Que faire si le junior n’applique pas les retours ?</dt><dd>Vérifier d’abord que les commentaires sont compris et applicables (bloquant ou facultatif ?), puis en parler à l’oral pour connaître la cause : incompréhension, manque de temps, désaccord. Le désaccord argumenté est légitime.</dd>
<dt>Comment montrer ce savoir-faire sans titre de lead ?</dt><dd>Avec des exemples précis : qui a été aidé, ce qui a été fait (revue, pair programming, guide écrit), et le résultat observé (autonomie, qualité, délai).</dd>
</dl>`,
  },
  {
    id: 'pilotage-technique',
    label: 'Piloter techniquement un projet de bout en bout',
    category: 'Méthode',
    level: 'partiel',
    terms: ['piloter techniquement', 'bout en bout', 'choix techniques', 'structuration de projets', 'startup', 'scale-up', 'Feature Owner', 'de bout en bout'],
    summary: 'Cadrer un projet, choisir et justifier l’architecture, découper le travail, livrer par étapes, suivre la qualité en production et en rendre compte : le rôle d’un référent technique, avec ou sans titre de lead.',
    cv: 'Ton CV montre des projets menés de bout en bout (Déposer une annonce, KYC front et appels back-end, Azimuth Quiz en solo) mais pas de titre de lead ni d’expérience start-up. Prépare un projet raconté en entier : cadrage, choix, difficultés, résultat, et ce que tu referais autrement.',
    body: `
<h2>Définition</h2>
<p>Piloter techniquement un projet, c’est en être le <b>garant technique</b> du cadrage à la mise en production : comprendre le besoin, proposer une solution, décider (et justifier) l’architecture, répartir le travail, maintenir la qualité et la livrer. Le rôle se joue autant dans la communication que dans le code.</p>
<h2>Les étapes</h2>
<table><tr><th>Étape</th><th>Ce qu’on fait</th></tr>
<tr><td><b>Cadrer</b></td><td>Questions au produit et au métier, périmètre, contraintes (délai, équipe, sécurité), critères de réussite, risques</td></tr>
<tr><td><b>Choisir</b></td><td>Comparer 2 ou 3 options, décider, écrire la décision (ADR : <i>Architecture Decision Record</i>, une page : contexte, options, choix, conséquences)</td></tr>
<tr><td><b>Structurer</b></td><td>Découpage en modules, conventions de code, structure de dépôt, tests et CI dès le départ</td></tr>
<tr><td><b>Découper et livrer</b></td><td>Tranches fines et utilisables (<i>walking skeleton</i> puis fonctionnalités), mises en production fréquentes, drapeaux de fonctionnalité</td></tr>
<tr><td><b>Suivre</b></td><td>Monitoring, alertes, métriques de performance, dette technique visible et priorisée</td></tr>
<tr><td><b>Transmettre</b></td><td>Documentation, revues, pair programming, démonstrations</td></tr></table>
<h2>Bonnes pratiques</h2>
<ul>
<li>Choisir des technologies adaptées à l’équipe et au besoin, pas à la mode : « ennuyeux mais maîtrisé » vaut souvent mieux.</li>
<li>Rendre les décisions réversibles quand c’est possible, et noter pourquoi on a choisi.</li>
<li>Dire non ou « pas maintenant » avec des arguments : coût, risque, alternative.</li>
<li>En start-up ou scale-up : accepter l’imperfection pour avancer, mais protéger les points critiques (sécurité, données, paiement) et garder la dette sous contrôle.</li>
</ul>
[[code
# ADR-007 : Authentification par sessions plutôt que JWT
Statut : accepté (2026-10-13)
Contexte : application web unique, besoin de révoquer une session immédiatement.
Options : (1) JWT sans état  (2) sessions côté serveur  (3) fournisseur externe.
Décision : sessions côté serveur, stockées en base.
Conséquences : révocation simple ; un accès base par requête ; à revoir si plusieurs applications.
]]
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Comment justifier un choix d’architecture ?</dt><dd>En partant des besoins et des contraintes, en comparant des options avec leurs avantages et leurs coûts, et en documentant la décision (ADR) pour que l’équipe en connaisse la raison et puisse la remettre en cause.</dd>
<dt>Comment gérer la dette technique dans une équipe qui va vite ?</dt><dd>La rendre visible (liste priorisée), consacrer une part régulière du temps à la réduire, et traiter en priorité celle qui ralentit l’équipe ou crée un risque.</dd>
<dt>Qu’est-ce qu’un walking skeleton ?</dt><dd>Une première version minimale qui traverse toute la chaîne (interface, API, base, déploiement) pour valider l’architecture et la livraison avant d’ajouter des fonctionnalités.</dd>
<dt>Comment travailler avec le produit et le métier ?</dt><dd>Reformuler le besoin, proposer des alternatives plus simples, expliquer les coûts techniques en termes compréhensibles et livrer tôt pour obtenir des retours.</dd>
</dl>`,
  },
  {
    id: 'python',
    label: 'Python (back-end et traitement de données)',
    category: 'Back-end',
    level: 'à préparer',
    terms: ['Python'],
    summary: 'Python est un langage généraliste lisible, très utilisé pour les API web, le traitement de données et l’intelligence artificielle. FastAPI, Flask et Django sont ses frameworks web courants.',
    cv: 'Python est dans « Notions » de ton CV (vu en projet), sans usage professionnel. L’offre demande de le maîtriser : prévoir de réviser la syntaxe, le typage et un petit projet FastAPI, et le dire honnêtement.',
    body: `
<h2>Définition</h2>
<p><b>Python</b> est un langage interprété, à typage dynamique (avec annotations facultatives), dont la syntaxe repose sur l’indentation. Il est omniprésent en science des données, en IA et en scripts, et sert aussi à bâtir des API web.</p>
<h2>Notions clés (pour un développeur JavaScript / TypeScript)</h2>
<table><tr><th>JavaScript / TypeScript</th><th>Python</th></tr>
<tr><td><code>const x = 1</code></td><td><code>x = 1</code> (pas de mot-clé)</td></tr>
<tr><td>Tableaux, objets</td><td>listes, dictionnaires, tuples, ensembles</td></tr>
<tr><td><code>arr.map(f)</code></td><td>compréhension de liste : <code>[f(x) for x in xs]</code></td></tr>
<tr><td>Types TypeScript</td><td>annotations : <code>def f(x: int) -&gt; str</code>, vérifiées par mypy ou pyright</td></tr>
<tr><td>Classes, modules ES</td><td>classes, <code>import</code>, paquets avec <code>__init__.py</code></td></tr>
<tr><td><code>async / await</code></td><td><code>asyncio</code> : <code>async def</code>, <code>await</code></td></tr>
<tr><td>npm, package.json</td><td>pip, <code>pyproject.toml</code>, environnement virtuel (<code>venv</code>, Poetry, uv)</td></tr></table>
<h2>Écosystème</h2>
<ul>
<li><b>FastAPI</b> : API modernes, typage avec Pydantic, documentation OpenAPI générée automatiquement, asynchrone.</li>
<li><b>Flask</b> (minimal) et <b>Django</b> (complet, avec ORM et administration).</li>
<li><b>pytest</b> : tests ; <b>ruff</b> et <b>black</b> : style ; <b>mypy</b> : typage.</li>
<li>Traitement de données et médias : NumPy, pandas, OpenCV, Pillow, ffmpeg, bibliothèques d’IA (PyTorch).</li>
<li>Limite : le GIL (verrou d’interpréteur) empêche l’exécution parallèle de threads Python sur du calcul pur ; on utilise <code>multiprocessing</code>, des tâches asynchrones ou des bibliothèques écrites en C.</li>
</ul>
[[code
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Media(BaseModel):
    nom: str
    duree_secondes: float

@app.post("/medias", status_code=201)
async def creer(media: Media) -> dict:
    return {"id": 1, "nom": media.nom}
]]
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Quelle différence entre liste et tuple ?</dt><dd>La liste est modifiable, le tuple ne l’est pas (immuable) : il sert pour des valeurs fixes et peut servir de clé de dictionnaire.</dd>
<dt>Qu’est-ce que le GIL ?</dt><dd>Un verrou de l’interpréteur CPython qui n’autorise qu’un thread à exécuter du code Python à la fois. Il pénalise le calcul parallèle en threads, pas les entrées/sorties ; on contourne avec des processus ou de l’asynchrone.</dd>
<dt>À quoi sert un environnement virtuel ?</dt><dd>À isoler les dépendances d’un projet (versions précises) pour ne pas les mélanger avec celles des autres projets ou du système.</dd>
<dt>FastAPI ou Django ?</dt><dd>FastAPI pour des API rapides et typées, avec documentation générée ; Django pour une application complète avec base, administration et authentification intégrées.</dd>
</dl>`,
  },
  {
    id: 'architecture-evenements',
    label: 'Architecture orientée événements (Kafka, RabbitMQ)',
    category: 'Architecture',
    level: 'à préparer',
    terms: ['architectures orientées événements', 'orientées événements', 'Kafka', 'RabbitMQ'],
    summary: 'Les services communiquent en publiant des événements dans un broker de messages (Kafka, RabbitMQ) plutôt qu’en s’appelant directement : traitements asynchrones, découplage, absorption des pics de charge.',
    cv: 'Absent de ton CV. Tu connais le principe côté front (WebSocket temps réel dans Carto Search, événements) ; prévoir de comprendre la différence Kafka / RabbitMQ et un schéma de traitement asynchrone.',
    body: `
<h2>Définition</h2>
<p>Dans une architecture <b>orientée événements</b>, un service qui fait quelque chose publie un <b>événement</b> (« média importé », « transcription terminée ») dans un <b>broker</b>. Les autres services intéressés le consomment quand ils sont prêts. L’émetteur ne connaît pas les consommateurs : le couplage est faible.</p>
<h2>Kafka et RabbitMQ</h2>
<table><tr><th></th><th>RabbitMQ</th><th>Kafka</th></tr>
<tr><td>Modèle</td><td>File de messages (<i>message queue</i>) avec échanges et routage</td><td>Journal d’événements distribué et conservé (<i>log</i>)</td></tr>
<tr><td>Message consommé</td><td>Supprimé après acquittement</td><td>Conservé (durée configurée) : on peut le relire</td></tr>
<tr><td>Concepts</td><td>Exchange, queue, binding, ack</td><td>Topic, partition, groupe de consommateurs, offset</td></tr>
<tr><td>Atouts</td><td>Routage flexible, tâches de travail, simple à démarrer</td><td>Très gros débit, rejeu, flux continus, analyse</td></tr>
<tr><td>Usage typique</td><td>File de tâches (traiter un média, envoyer un courriel)</td><td>Flux d’événements, intégration entre nombreux services</td></tr></table>
<h2>Notions importantes</h2>
<ul>
<li><b>Asynchrone</b> : l’utilisateur n’attend pas le traitement long ; il reçoit un identifiant de tâche et un statut (en cours, terminé, erreur).</li>
<li><b>Livraison</b> : « au moins une fois » (risque de doublons) est la norme ; les consommateurs doivent être <b>idempotents</b> (rejouer un message ne change pas le résultat).</li>
<li><b>Ordre</b> : garanti dans une partition Kafka, ou dans une file RabbitMQ à un seul consommateur.</li>
<li><b>Dead letter queue</b> : file des messages en échec, pour analyse et nouvel essai.</li>
<li><b>Contrat d’événement</b> : schéma versionné (JSON Schema, Avro) pour faire évoluer sans casser les consommateurs.</li>
</ul>
[[code
// Événement publié quand un média est importé
{
  "type": "media.importe",
  "version": 1,
  "id": "evt-7f3c",
  "date": "2026-10-13T09:30:00Z",
  "donnees": { "mediaId": "m-123", "format": "audio/wav", "duree": 184.2 }
}
// Le service de transcription le consomme, puis publie « media.transcrit ».
]]
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Quand choisir Kafka plutôt que RabbitMQ ?</dt><dd>Kafka pour de gros volumes, des flux continus et la possibilité de rejouer les événements. RabbitMQ pour des files de tâches classiques avec un routage souple et un volume plus modeste.</dd>
<dt>Qu’est-ce que l’idempotence ?</dt><dd>Traiter plusieurs fois le même message donne le même résultat qu’une seule fois. C’est indispensable car la livraison « au moins une fois » peut produire des doublons.</dd>
<dt>Comment le front suit-il un traitement asynchrone ?</dt><dd>L’API renvoie un identifiant de tâche ; le front interroge régulièrement son statut (polling) ou reçoit des mises à jour en temps réel (WebSocket, Server-Sent Events).</dd>
<dt>Que faire d’un message qui échoue toujours ?</dt><dd>Après quelques essais, il part dans une dead letter queue, avec une alerte, pour être examiné et rejoué une fois le problème corrigé.</dd>
</dl>`,
  },
  {
    id: 'microservices-openapi',
    label: 'Microservices REST et OpenAPI',
    category: 'Architecture',
    level: 'partiel',
    terms: ['microservices REST', 'microservices', 'OpenApi', 'OpenAPI', 'architecture logicielle'],
    summary: 'Découper un système en petits services indépendants qui communiquent par des API REST, décrites par un contrat OpenAPI qui permet de générer documentation, clients et tests.',
    cv: 'Tu as la partie contrat côté front (API REST, BFF, micro-frontend avec déploiement indépendant), mais pas de microservices back-end en poste. Prépare la différence microservices / monolithe et l’intérêt d’un contrat OpenAPI.',
    body: `
<h2>Définition</h2>
<p>Une architecture en <b>microservices</b> découpe une application en services petits, chacun responsable d’un domaine, déployé et mis à l’échelle séparément, avec sa propre base. Ils communiquent par des API (souvent REST) ou des événements. <b>OpenAPI</b> (ex-Swagger) est le format standard pour décrire une API REST dans un fichier YAML ou JSON.</p>
<h2>Microservices ou monolithe ?</h2>
<table><tr><th></th><th>Monolithe (modulaire)</th><th>Microservices</th></tr>
<tr><td>Déploiement</td><td>Un seul bloc</td><td>Par service, indépendant</td></tr>
<tr><td>Complexité</td><td>Faible au départ</td><td>Réseau, supervision, cohérence des données</td></tr>
<tr><td>Équipes</td><td>Petites, un seul code</td><td>Plusieurs équipes autonomes</td></tr>
<tr><td>Échelle</td><td>Tout ensemble</td><td>Service par service</td></tr></table>
<p>Un monolithe bien découpé suffit souvent ; les microservices se justifient par l’organisation (plusieurs équipes) ou des besoins d’échelle très différents.</p>
<h2>Contrat OpenAPI</h2>
<ul>
<li>Décrit les chemins, méthodes, paramètres, corps de requête et de réponse, codes d’erreur et authentification.</li>
<li><b>Contract first</b> : on écrit le contrat d’abord, front et back travaillent en parallèle ; ou <b>code first</b> : le contrat est généré depuis le code (FastAPI le fait automatiquement).</li>
<li>Outils : Swagger UI (documentation interactive), génération de clients TypeScript (<code>openapi-typescript</code>, <code>openapi-generator</code>), validation des requêtes, tests de contrat.</li>
<li>Versionner l’API (<code>/v1</code>) et ne pas casser les clients : ajouter plutôt que modifier ou supprimer.</li>
</ul>
[[code
openapi: 3.0.3
info: { title: API Médias, version: 1.0.0 }
paths:
  /medias/{id}:
    get:
      parameters:
        - { name: id, in: path, required: true, schema: { type: string } }
      responses:
        "200":
          description: Le média
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Media" }
        "404": { description: Média introuvable }
components:
  schemas:
    Media:
      type: object
      required: [id, nom]
      properties: { id: { type: string }, nom: { type: string } }
]]
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Quels sont les inconvénients des microservices ?</dt><dd>Complexité du réseau et du déploiement, supervision à renforcer, cohérence des données plus difficile (pas de transaction unique), tests d’ensemble plus longs. Il faut en avoir l’utilité.</dd>
<dt>Pourquoi un contrat OpenAPI ?</dt><dd>Il sert de référence commune au front et au back : documentation, génération de clients typés, validation, tests de contrat. Les écarts entre ce qui est promis et ce qui est servi se détectent tôt.</dd>
<dt>Comment faire évoluer une API sans casser les clients ?</dt><dd>Ajouter des champs facultatifs, ne pas changer le sens de l’existant, versionner (<code>/v2</code>) pour les changements incompatibles et annoncer une période de transition.</dd>
<dt>Comment les services se parlent-ils ?</dt><dd>En synchrone par HTTP (REST, gRPC) quand la réponse est nécessaire tout de suite, en asynchrone par événements (Kafka, RabbitMQ) pour découpler et lisser la charge.</dd>
</dl>`,
  },
  {
    id: 'kubernetes',
    label: 'Kubernetes (déploiement de conteneurs)',
    category: 'DevOps',
    level: 'à préparer',
    terms: ['Kubernetes'],
    summary: 'Kubernetes orchestre des conteneurs sur un ensemble de machines : il les déploie, les relance en cas de panne, les met à l’échelle et les expose sur le réseau, à partir de fichiers de description.',
    cv: 'Docker figure dans ton CV, pas Kubernetes. En tant que développeur de l’application, tu n’as pas à l’administrer, mais à comprendre comment elle y est déployée : conteneur, déploiement, service, configuration, sondes.',
    body: `
<h2>Définition</h2>
<p>Un <b>conteneur</b> (Docker) empaquette une application et ses dépendances. <b>Kubernetes</b> (« K8s ») gère de nombreux conteneurs sur plusieurs machines : il décide où les lancer, les relance s’ils tombent, ajuste leur nombre selon la charge et permet des mises à jour sans interruption.</p>
<h2>Objets principaux</h2>
<table><tr><th>Objet</th><th>Rôle</th></tr>
<tr><td><b>Pod</b></td><td>Plus petite unité : un ou plusieurs conteneurs qui partagent réseau et stockage</td></tr>
<tr><td><b>Deployment</b></td><td>Décrit combien de pods lancer et avec quelle image ; gère les mises à jour progressives (<i>rolling update</i>) et le retour arrière</td></tr>
<tr><td><b>Service</b></td><td>Adresse stable qui répartit le trafic entre les pods d’une application</td></tr>
<tr><td><b>Ingress</b></td><td>Entrée HTTP(S) depuis l’extérieur, routage par nom de domaine et chemin</td></tr>
<tr><td><b>ConfigMap / Secret</b></td><td>Configuration et données sensibles injectées dans les pods (variables, fichiers)</td></tr>
<tr><td><b>Namespace</b></td><td>Espace de séparation (par environnement ou par équipe)</td></tr>
<tr><td><b>HPA</b></td><td>Ajuste automatiquement le nombre de pods selon la charge (CPU, mémoire)</td></tr></table>
<h2>Côté développeur</h2>
<ul>
<li>Une application « cloud native » est <b>sans état</b> (état dans une base ou un cache), configurée par variables d’environnement, et écrit ses logs sur la sortie standard.</li>
<li>Des <b>sondes</b> indiquent à Kubernetes si l’application est vivante (<i>liveness</i>) et prête à recevoir du trafic (<i>readiness</i>).</li>
<li>Le déploiement est automatisé par la CI/CD ; les outils courants sont <code>kubectl</code>, Helm (modèles de manifestes), Argo CD (déploiement piloté par Git).</li>
<li>Les pods sont éphémères : un redémarrage peut arriver à tout moment, l’application doit s’arrêter proprement.</li>
</ul>
[[code
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels: { app: web }
  template:
    metadata:
      labels: { app: web }
    spec:
      containers:
        - name: web
          image: registre.exemple.fr/web:1.4.2
          ports: [{ containerPort: 3000 }]
          readinessProbe:
            httpGet: { path: /sante, port: 3000 }
]]
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Différence entre Docker et Kubernetes ?</dt><dd>Docker construit et exécute des conteneurs. Kubernetes orchestre un grand nombre de conteneurs sur un parc de machines : déploiement, relance, mise à l’échelle, réseau.</dd>
<dt>Qu’est-ce qu’un pod ?</dt><dd>La plus petite unité déployable : un ou plusieurs conteneurs liés qui partagent le réseau et le stockage. Les pods sont éphémères et remplaçables.</dd>
<dt>Comment une mise à jour se fait-elle sans interruption ?</dt><dd>Avec un Deployment en <i>rolling update</i> : de nouveaux pods démarrent, deviennent prêts (sonde de disponibilité), puis les anciens sont arrêtés progressivement ; un retour arrière est possible.</dd>
<dt>Où mettre la configuration et les secrets ?</dt><dd>Hors de l’image : dans des ConfigMap pour la configuration et des Secret (idéalement chiffrés ou gérés par un coffre) pour les données sensibles, injectés en variables d’environnement ou en fichiers.</dd>
</dl>`,
  },
  {
    id: 'anglais-technique',
    label: 'Anglais technique (écrit et oral)',
    category: 'Langues',
    level: 'partiel',
    terms: ['Anglais technique', 'anglais', 'English'],
    summary: 'L’anglais utilisé au travail par un développeur : lire la documentation, rédiger des commits, des revues de code et des tickets, et expliquer son travail à l’oral en réunion et en entretien.',
    cv: 'Ton CV indique « Anglais B1, technique et écrit ». C’est honnête et cohérent avec une offre qui demande de l’anglais technique. L’oral est ton point à travailler : prépare une présentation de 2 minutes de ton parcours et de tes projets, et entraîne-toi à la dire à voix haute.',
    body: `
<h2>Ce que « anglais technique » recouvre</h2>
<ul>
<li><b>Lire</b> la documentation, les issues GitHub, Stack Overflow, les articles : le niveau le plus utile, et le tien.</li>
<li><b>Écrire</b> des messages de commit, des descriptions de pull request, des commentaires de revue, des tickets et de la documentation technique.</li>
<li><b>Parler</b> en réunion (point d’équipe, démonstration, revue d’architecture) et en entretien.</li>
</ul>
<p>Le niveau <b>B1</b> (cadre européen) : se débrouiller dans la plupart des situations, parler d’un sujet familier, expliquer ses projets et ses choix, avec des hésitations. Il suffit pour lire, écrire du technique et suivre une réunion lente ; l’oral spontané demande de la pratique.</p>
<h2>Vocabulaire du développeur</h2>
<table><tr><th>Français</th><th>Anglais</th></tr>
<tr><td>Faire une revue de code</td><td>to review a pull request, code review</td></tr>
<tr><td>Corriger un bug</td><td>to fix a bug</td></tr>
<tr><td>Mise en production</td><td>release, deployment, to ship</td></tr>
<tr><td>Dette technique</td><td>technical debt</td></tr>
<tr><td>Gestion d’état, composant</td><td>state management, component</td></tr>
<tr><td>Montée de version</td><td>upgrade, version bump</td></tr>
<tr><td>Rétrocompatibilité</td><td>backward compatibility</td></tr>
<tr><td>Intégration continue</td><td>continuous integration (CI)</td></tr>
<tr><td>Un point de blocage</td><td>a blocker</td></tr>
<tr><td>Retour arrière</td><td>rollback, to revert</td></tr></table>
<h2>Phrases utiles</h2>
<ul>
<li><b>Se présenter :</b> “I’m a front-end developer with 15 years of experience, mostly in React and TypeScript.”</li>
<li><b>Décrire un projet :</b> “I worked on an identity verification flow. I built the front end and the calls to the back end.”</li>
<li><b>Expliquer un choix :</b> “We chose this approach because it was simpler to maintain and easier to test.”</li>
<li><b>Demander de répéter :</b> “Sorry, could you repeat that?” / “Do you mean…?”</li>
<li><b>Gagner du temps :</b> “That’s a good question. Let me think for a moment.”</li>
<li><b>Être honnête sur ses limites :</b> “I haven’t used it in production, but I understand the principles and I can learn quickly.”</li>
</ul>
[[code
# Messages de commit et de revue en anglais
feat: add identity check step to the onboarding flow
fix: prevent double submit on the upload button
refactor: extract the form validation into a hook

Review comment: "Could we move this logic into a custom hook? It would make the component easier to test."
]]
<h2>Comment progresser</h2>
<ul>
<li>Écrire ses commits, tickets et notes en anglais, tous les jours.</li>
<li>Regarder des conférences techniques sous-titrées en anglais (React Conf, talks) et répéter à voix haute.</li>
<li>Préparer et dire à voix haute 3 réponses types (présentation, un projet, une difficulté résolue).</li>
<li>S’entraîner à une simulation d’entretien (avec un outil ou une personne) et s’enregistrer.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Que répondre à « How is your English? » ?</dt><dd>Une réponse honnête et positive : “I read and write technical English every day, so documentation and written exchanges are comfortable. Speaking is something I keep practising, and I’m happy to continue in English.”</dd>
<dt>Comment se présenter en 30 secondes ?</dt><dd>“I’m a developer with 15 years of experience, mostly front end with React and TypeScript, and some back end with Node.js. At SeLoger I worked on high-traffic products. I like building maintainable, tested code and working closely with product and design.”</dd>
<dt>Que faire si je ne comprends pas une question ?</dt><dd>Demander poliment de reformuler : “Could you rephrase that, please?” plutôt que de deviner. C’est bien perçu.</dd>
<dt>Faut-il traduire tous les termes techniques ?</dt><dd>Non : component, state, hook, pull request, build ou deployment restent en anglais, même en français ; l’important est de les prononcer correctement.</dd>
</dl>`,
  },
  {
    id: 'mobile-release-stores',
    label: 'Publier une application mobile sur les stores',
    category: 'Mobile',
    level: 'à préparer',
    terms: ['releases sur les stores', 'stores', 'cycle de vie', 'applications mobiles', 'OTA', 'EAS', 'certificats', 'versioning', 'feature flags', 'App Store', 'Google Play'],
    summary: 'Livrer une application iOS et Android : signature, builds, tests internes (TestFlight, pistes de test Google Play), validation des stores, versions, mises à jour et retours arrière.',
    cv: 'Ton projet Azimuth Quiz est en Expo / React Native pour web, iOS et Android, mais ton CV ne dit pas qu’il a été publié sur les stores (le CI/CD cité part vers GitHub Pages). L’offre attend, pour les seniors, le cycle de vie complet : à préparer honnêtement, sans prétendre l’avoir fait.',
    body: `
<h2>Le cycle de vie d’une application mobile</h2>
<table><tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td><b>Développer</b></td><td>React Native avec Expo ou en natif ; tests unitaires (Jest), e2e (Detox, Maestro)</td></tr>
<tr><td><b>Build</b></td><td>Génération des binaires : <code>.ipa</code> (iOS), <code>.aab</code> (Android) ; avec Expo, EAS Build les produit dans le cloud</td></tr>
<tr><td><b>Signer</b></td><td>iOS : certificats et profils d’approvisionnement (compte Apple Developer payant). Android : keystore de signature (à ne jamais perdre)</td></tr>
<tr><td><b>Tester en interne</b></td><td>iOS : <b>TestFlight</b>. Android : pistes de test (interne, fermée, ouverte) de la Google Play Console</td></tr>
<tr><td><b>Soumettre</b></td><td>Fiche du store : captures d’écran, description, politique de confidentialité, déclarations de données collectées</td></tr>
<tr><td><b>Validation</b></td><td>Revue par Apple (quelques heures à quelques jours, rejets possibles) et par Google</td></tr>
<tr><td><b>Déployer</b></td><td>Déploiement progressif (pourcentage d’utilisateurs), surveillance des plantages (Sentry, Crashlytics)</td></tr>
<tr><td><b>Mettre à jour</b></td><td>Nouvelle version par les stores, ou mise à jour du code JavaScript à distance (EAS Update, sans repasser par la validation si le code natif ne change pas)</td></tr></table>
<h2>Notions importantes</h2>
<ul>
<li><b>Numéro de version et numéro de build :</b> la version visible (1.4.0) et un numéro de build qui augmente à chaque envoi.</li>
<li><b>Versions anciennes en circulation :</b> toutes les versions installées doivent continuer à fonctionner avec l’API : compatibilité ascendante, <i>force update</i> si besoin.</li>
<li><b>Pas de retour arrière immédiat :</b> on ne « rollback » pas une version déjà installée ; on publie un correctif, ou on désactive la fonctionnalité à distance (<i>feature flag</i>).</li>
<li><b>Permissions :</b> caméra, notifications, localisation : à demander au bon moment avec une explication.</li>
<li><b>Automatiser :</b> pipeline CI/CD (GitHub Actions, Bitrise, EAS) pour construire, tester et envoyer vers TestFlight / Play automatiquement.</li>
</ul>
[[code
# eas.json (Expo) : profils de build et d'envoi
{
  "build": {
    "preview":    { "distribution": "internal" },
    "production": { "autoIncrement": true }
  },
  "submit": { "production": {} }
}
# eas build --platform all --profile production
# eas submit --platform ios   (envoi vers App Store Connect / TestFlight)
]]
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Pourquoi une mise à jour mobile est-elle plus délicate qu’un déploiement web ?</dt><dd>Parce que les utilisateurs gardent des versions anciennes et que la validation par les stores prend du temps. L’API doit rester compatible avec elles, et on ne peut pas annuler une version déjà installée.</dd>
<dt>À quoi sert TestFlight ?</dt><dd>À distribuer une version iOS à des testeurs internes ou externes avant la mise en ligne. Google Play a l’équivalent avec ses pistes de test interne, fermée et ouverte.</dd>
<dt>Qu’est-ce qu’une mise à jour « over-the-air » ?</dt><dd>Un changement du code JavaScript livré directement à l’application installée (EAS Update, CodePush), sans passer par la validation du store. Impossible si le code natif ou les permissions changent.</dd>
<dt>Que faire si Apple rejette la version ?</dt><dd>Lire le motif (confidentialité, contenu, plantage), corriger, incrémenter le numéro de build et soumettre de nouveau ; répondre à l’équipe de revue si le rejet est une erreur d’appréciation.</dd>
</dl>`,
  },
]
