export const docs = [
  {
    id: 'react-typescript',
    label: 'ReactJS / TypeScript',
    category: 'Cœur du poste',
    level: 'acquis',
    summary: 'React construit l’interface à partir de composants ; TypeScript ajoute un typage statique à JavaScript. C’est le socle de tout le poste.',
    cv: 'C’est ton cœur de métier : près de dix ans de React/TypeScript chez SeLoger, generics, Utility Types et types conditionnels cités dans ton CV. Prépare un exemple concret de typage avancé.',
    body: `
<h2>React en bref</h2>
<p>Bibliothèque d’interface <b>déclarative</b> : tu décris ce que l’écran doit afficher pour un état donné, React met le DOM à jour. L’UI est découpée en <b>composants</b> (fonctions qui reçoivent des <code>props</code> et renvoient du JSX).</p>
<ul>
<li><b>État</b> (<code>useState</code>, <code>useReducer</code>) : quand il change, le composant se rend de nouveau.</li>
<li><b>Réconciliation</b> : React compare l’ancien et le nouvel arbre virtuel et ne modifie que le nécessaire. D’où l’importance de <code>key</code> stable dans les listes.</li>
<li><b>Flux unidirectionnel</b> : les données descendent par les props, les événements remontent par des callbacks.</li>
<li><b>Effets</b> (<code>useEffect</code>) : synchroniser avec l’extérieur (API, abonnements). À nettoyer au démontage.</li>
</ul>
<h2>TypeScript en bref</h2>
<p>Sur-ensemble typé de JavaScript, vérifié à la compilation (<code>tsc</code>), effacé à l’exécution. Mode <code>strict</code> recommandé.</p>
<ul>
<li><b>Types</b> : <code>type</code> / <code>interface</code>, unions (<code>'a' | 'b'</code>), intersections, littéraux.</li>
<li><b>Generics</b> : <code>function first&lt;T&gt;(xs: T[]): T | undefined</code>.</li>
<li><b>Utility Types</b> : <code>Partial</code>, <code>Pick</code>, <code>Omit</code>, <code>Record</code>, <code>ReturnType</code>.</li>
<li><b>Narrowing</b> : <code>typeof</code>, <code>in</code>, unions discriminées. Préfère <code>unknown</code> à <code>any</code>.</li>
</ul>
<h2>Les deux ensemble</h2>
[[code
type Props<T> = {
  items: T[]
  getLabel: (item: T) => string
  onSelect: (item: T) => void
}

export function List<T>({ items, getLabel, onSelect }: Props<T>) {
  return (
    <ul>
      {items.map((it, i) => (
        <li key={i} onClick={() => onSelect(it)}>{getLabel(it)}</li>
      ))}
    </ul>
  )
}
]]
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Pourquoi des re-renders inutiles et comment les éviter ?</dt><dd>Un composant se rend de nouveau quand son état, ses props ou son contexte changent, et tous ses enfants avec lui. On évite le gaspillage en gardant l’état au plus près de qui l’utilise, en mémoïsant les enfants coûteux avec <code>React.memo</code>, en stabilisant les fonctions passées en props (<code>useCallback</code>) et en donnant des clés stables aux listes.</dd>
<dt><code>type</code> ou <code>interface</code> ?</dt><dd>Les deux décrivent un objet. <code>interface</code> peut être étendue et fusionnée (pratique pour des bibliothèques), <code>type</code> accepte aussi les unions, intersections et types conditionnels. En pratique : <code>type</code> partout, sauf besoin de fusion de déclarations.</dd>
<dt>Comment typer un hook générique, un contexte, un événement ?</dt><dd>Hook : <code>function useList&lt;T&gt;(items: T[])</code>. Contexte : <code>createContext&lt;Value | null&gt;(null)</code> puis un hook qui lève une erreur si la valeur est nulle. Événement : <code>React.ChangeEvent&lt;HTMLInputElement&gt;</code> ou <code>React.MouseEvent&lt;HTMLButtonElement&gt;</code>.</dd>
</dl>`,
  },
  {
    id: 'html-css',
    label: 'HTML / CSS',
    category: 'Fondations web',
    level: 'acquis',
    summary: 'HTML structure le contenu avec des balises sémantiques, CSS le met en forme (mise en page, responsive, thèmes). Base de toute interface.',
    cv: 'HTML5/CSS3 cités dans ton CV depuis Michelin ; styled-components et Tailwind côté React. Sur une interface de données, insiste sur Grid et les variables CSS.',
    body: `
<h2>HTML sémantique</h2>
<p>Choisir la balise selon le <b>sens</b> : <code>header</code>, <code>nav</code>, <code>main</code>, <code>section</code>, <code>table</code> (avec <code>thead</code>, <code>th scope</code>), <code>button</code> pour une action, <code>a</code> pour une navigation. Gain : accessibilité, SEO, navigation clavier gratuite.</p>
<h2>CSS : les notions clés</h2>
<ul>
<li><b>Modèle de boîte</b> : <code>box-sizing: border-box</code>, marges/paddings, effondrement des marges.</li>
<li><b>Cascade et spécificité</b> : ordre, sélecteurs, <code>!important</code> à éviter. <code>@layer</code> pour maîtriser l’ordre.</li>
<li><b>Flexbox</b> (1 dimension) et <b>Grid</b> (2 dimensions) pour les mises en page, y compris des tableaux de bord denses.</li>
<li><b>Responsive</b> : unités relatives (<code>rem</code>, <code>%</code>, <code>fr</code>), media queries, container queries, <code>clamp()</code>.</li>
<li><b>Variables CSS</b> (<code>--couleur</code>) pour thèmes clair/sombre et design tokens.</li>
<li><b>Performance</b> : animer <code>transform</code> et <code>opacity</code> plutôt que <code>width</code>/<code>top</code> (évite le reflow).</li>
</ul>
[[code
.dashboard {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 16px;
}
.panel { background: var(--card); border-radius: 8px; }
@media (max-width: 800px) {
  .dashboard { grid-template-columns: 1fr; }
}
]]
<h2>CSS dans React</h2>
<table><tr><th>Approche</th><th>Avantage</th><th>Limite</th></tr>
<tr><td>CSS Modules</td><td>Portée locale, zéro runtime</td><td>Thèmes dynamiques moins directs</td></tr>
<tr><td>styled-components</td><td>Style lié au composant, props</td><td>Coût runtime</td></tr>
<tr><td>Tailwind</td><td>Rapide, cohérent</td><td>Classes verbeuses</td></tr></table>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Flex ou Grid ?</dt><dd>Flexbox aligne des éléments sur une seule dimension (une ligne ou une colonne), Grid place sur deux dimensions (lignes et colonnes). Barre d’outils ou liste : Flex ; mise en page de page ou tableau de bord : Grid.</dd>
<dt>Comment centrer un élément ?</dt><dd>Sur le parent : <code>display: grid; place-items: center</code>, ou <code>display: flex; justify-content: center; align-items: center</code>. Un bloc seul en largeur : <code>margin: 0 auto</code> avec une largeur définie.</dd>
<dt>Comment fonctionne la spécificité ?</dt><dd>Quand deux règles visent le même élément, la plus spécifique gagne : style inline, puis id, puis classe / attribut / pseudo-classe, puis balise. À spécificité égale, la dernière déclarée gagne. <code>!important</code> passe devant tout, d’où l’éviter.</dd>
<dt>Comment rendre un tableau lisible sur mobile ?</dt><dd>Soit défilement horizontal du conteneur (<code>overflow-x: auto</code>), soit transformer chaque ligne en carte sous un point de rupture (les cellules deviennent des blocs, l’en-tête est répété via <code>data-label</code> et <code>::before</code>), soit masquer les colonnes secondaires.</dd>
</dl>`,
  },
  {
    id: 'redux-context',
    label: 'Redux / Context API',
    category: 'Gestion d’état',
    level: 'acquis',
    summary: 'Context API partage une valeur dans l’arbre de composants sans la passer par les props ; Redux centralise l’état global dans un store prévisible.',
    cv: 'Redux est dans ton CV (moteur de recherche, Carto Search), ainsi que Zustand. Prépare une comparaison argumentée Redux / Context / Zustand.',
    body: `
<h2>Context API</h2>
<p>Intégrée à React : <code>createContext</code>, un <code>Provider</code>, et <code>useContext</code> chez les consommateurs. Idéale pour des valeurs <b>stables ou rares</b> : thème, langue, utilisateur connecté.</p>
<ul><li><b>Limite</b> : tout consommateur se re-rend quand la valeur change. Pour un état qui bouge souvent, il faut découper les contextes ou mémoïser la valeur.</li><li>Pas de middleware ni d’outils de debug intégrés.</li></ul>
<h2>Redux (Redux Toolkit)</h2>
<p>Un <b>store</b> unique, un état modifié seulement par des <b>actions</b> traitées par des <b>reducers</b> purs. Redux Toolkit (RTK) est la manière officielle d’écrire du Redux aujourd’hui.</p>
<ul>
<li><code>createSlice</code> : reducers + actions, avec Immer (écriture « mutable » qui reste immuable).</li>
<li><code>createAsyncThunk</code> ou <b>RTK Query</b> : appels API, cache, états de chargement.</li>
<li><b>Selectors</b> (<code>useSelector</code>, <code>createSelector</code> mémoïsé) : lire et dériver sans re-rendus inutiles.</li>
<li><b>Redux DevTools</b> : historique des actions, voyage dans le temps.</li>
</ul>
[[code
const alarms = createSlice({
  name: 'alarms',
  initialState: { byId: {} as Record<string, Alarm> },
  reducers: {
    received(state, action: PayloadAction<Alarm>) {
      state.byId[action.payload.id] = action.payload
    },
  },
})
]]
<h2>Choisir</h2>
<table><tr><th>Besoin</th><th>Choix</th></tr>
<tr><td>Thème, langue, session</td><td>Context</td></tr>
<tr><td>Gros état partagé, flux complexe, traçabilité</td><td>Redux Toolkit</td></tr>
<tr><td>Données serveur (cache, refetch)</td><td>RTK Query / TanStack Query</td></tr>
<tr><td>État global simple, peu de code</td><td>Zustand</td></tr></table>
<h2>Les principes de Redux</h2>
<ul>
<li><b>Source unique de vérité</b> : un store contient l’état global.</li>
<li><b>État en lecture seule</b> : on ne le modifie que par des actions décrivant ce qui s’est passé.</li>
<li><b>Changements par des fonctions pures</b> : les reducers.</li>
<li>Flux à sens unique : l’interface envoie une action (<code>dispatch</code>), le reducer calcule l’état, les composants abonnés se mettent à jour.</li>
</ul>
<h2>Context en pratique</h2>
[[code
const ThemeContext = createContext<'clair' | 'sombre'>('clair')

function App() {
  const [theme, setTheme] = useState<'clair' | 'sombre'>('clair')
  return (
    <ThemeContext.Provider value={theme}>
      <Page onToggle={() => setTheme(t => (t === 'clair' ? 'sombre' : 'clair'))} />
    </ThemeContext.Provider>
  )
}
function Badge() {
  const theme = useContext(ThemeContext)
  return <span className={theme}>OK</span>
}
]]
<ul>
<li>Si la valeur du Provider est un objet créé à chaque rendu, tous les consommateurs se rendent de nouveau : mémoïser avec <code>useMemo</code>.</li>
<li>Séparer le contexte de <b>lecture</b> de celui des <b>actions</b> (dispatch) évite des rendus inutiles pour ceux qui ne font qu’envoyer des actions.</li>
<li>Context combiné à <code>useReducer</code> donne un mini Redux sans dépendance, suffisant pour un état local à une fonctionnalité.</li>
<li>Context n’est pas un gestionnaire d’état : il transporte une valeur ; c’est le composant parent qui la gère.</li>
</ul>
<h2>Redux Toolkit : aller plus loin</h2>
<ul>
<li><b>configureStore</b> : crée le store avec les bons réglages par défaut (DevTools, vérifications en développement, thunk).</li>
<li><b>Typage TypeScript</b> : exporter <code>RootState</code> et <code>AppDispatch</code>, créer des hooks typés (<code>useAppSelector</code>, <code>useAppDispatch</code>).</li>
<li><b>createEntityAdapter</b> : état normalisé (<code>ids</code> et <code>entities</code>) avec sélecteurs prêts à l’emploi, utile pour des listes comme des alarmes ou des équipements.</li>
<li><b>extraReducers</b> : réagir à des actions définies ailleurs (par exemple les états pending, fulfilled, rejected d’un thunk).</li>
<li><b>Listener middleware</b> : effets de bord déclenchés par des actions.</li>
<li><b>Sérialisabilité</b> : garder dans le store des valeurs sérialisables (pas de fonctions ni d’instances de classes).</li>
</ul>
[[code
const store = configureStore({ reducer: { alarms: alarms.reducer } })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const fetchAlarms = createAsyncThunk('alarms/fetch', async (site: string) => {
  const res = await fetch('/api/alarms?site=' + site)
  return (await res.json()) as Alarm[]
})
]]
<h2>Immutabilité et Immer</h2>
<p>Dans un reducer classique, on copie l’état : un nouvel objet avec la propriété modifiée. Avec <code>createSlice</code>, Immer fournit un brouillon que l’on peut « muter », puis produit un nouvel état immuable. Attention : dans un même reducer, soit on modifie le brouillon, soit on retourne un nouvel état, pas les deux.</p>
<h2>RTK Query</h2>
<ul>
<li>Définir des <i>endpoints</i> (<code>query</code> pour lire, <code>mutation</code> pour écrire) ; la bibliothèque génère les hooks.</li>
<li>Cache par arguments, déduplication des requêtes identiques, états <code>isLoading</code> / <code>isFetching</code> / <code>error</code>.</li>
<li><b>Tags</b> : une mutation invalide des tags, ce qui relance les requêtes concernées.</li>
<li>Alternative proche : TanStack Query, indépendante de Redux.</li>
</ul>
<h2>Zustand en comparaison</h2>
<p>Zustand crée un store avec une fonction, sans Provider ni reducer obligatoire ; on s’abonne avec un sélecteur et seuls les composants concernés se rendent de nouveau. Moins cadré que Redux : moins de conventions imposées pour une grande équipe.</p>
<table><tr><th>Critère</th><th>Context</th><th>Redux Toolkit</th><th>Zustand</th></tr>
<tr><td>Dépendance</td><td>Aucune</td><td>Oui</td><td>Oui, légère</td></tr>
<tr><td>Abonnement fin (sélecteur)</td><td>Non</td><td>Oui</td><td>Oui</td></tr>
<tr><td>Outils de debug</td><td>Limités</td><td>DevTools complets</td><td>Possibles via middleware</td></tr>
<tr><td>Cadre et conventions</td><td>Libre</td><td>Strict</td><td>Libre</td></tr>
<tr><td>Code à écrire</td><td>Peu</td><td>Modéré</td><td>Peu</td></tr></table>
<h2>Que mettre dans un état global ?</h2>
<ul>
<li>Oui : état partagé par plusieurs zones éloignées (utilisateur, filtres globaux, sélection courante).</li>
<li>Non : état d’un formulaire, d’une modale ou d’un survol (reste local), données serveur (cache dédié), valeurs dérivables (à calculer avec un sélecteur).</li>
<li>Mettre l’état au niveau le plus bas qui satisfait tous ses utilisateurs, et ne le monter qu’en cas de besoin.</li>
</ul>
<h2>Erreurs fréquentes</h2>
<ul>
<li>Muter l’état en dehors d’Immer : l’interface ne se met pas à jour.</li>
<li>Sélecteur qui renvoie un nouvel objet à chaque appel : rendu à chaque changement du store ; utiliser <code>createSelector</code>.</li>
<li>Tout mettre dans Redux, y compris les données serveur et l’état d’interface éphémère.</li>
<li>Un Provider unique géant qui contient tout l’état de l’application.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Pourquoi les reducers doivent-ils être purs ?</dt><dd>Un reducer calcule le nouvel état uniquement à partir de l’état précédent et de l’action, sans effet de bord ni mutation. C’est ce qui rend l’état prévisible, testable et rejouable (DevTools, voyage dans le temps) ; Redux détecte les changements par comparaison de référence, donc une mutation en place passerait inaperçue.</dd>
<dt>Quand Context pose-t-il un problème de performance ?</dt><dd>Dès que la valeur du contexte change, tous les composants qui la consomment se rendent de nouveau, même s’ils n’utilisent qu’une partie. Avec une valeur qui change souvent (saisie, position), on découpe en plusieurs contextes, on mémoïse la valeur, ou on passe à un store avec sélecteurs (Redux, Zustand).</dd>
<dt>Comment éviter les rendus inutiles avec Redux ?</dt><dd>Sélectionner précisément la donnée voulue avec useSelector, utiliser createSelector pour les valeurs dérivées, normaliser les listes et ne pas stocker dans le store ce qui reste local à un composant.</dd>
<dt>Faut-il mettre les données serveur dans Redux ?</dt><dd>Plutôt avec RTK Query ou TanStack Query, qui gèrent cache, revalidation et états de chargement. Le store garde alors surtout l’état d’interface réellement partagé.</dd>
</dl>`,
  },
  {
    id: 'hooks-composants',
    label: 'Hooks React & composants réutilisables',
    category: 'Architecture front-end',
    level: 'acquis',
    summary: 'Les Hooks donnent état et effets aux composants fonction ; des composants réutilisables s’appuient sur la composition et des props bien typées.',
    cv: 'Ton CV mentionne Storybook et un système multi-marques (SeLoger / Immowelt) : bon matériau pour parler de composants réutilisables. Prépare un exemple de hook maison.',
    body: `
<h2>Hooks essentiels</h2>
<table><tr><th>Hook</th><th>Usage</th></tr>
<tr><td><code>useState</code> / <code>useReducer</code></td><td>État local ; reducer pour des transitions complexes</td></tr>
<tr><td><code>useEffect</code></td><td>Synchronisation externe ; toujours penser au nettoyage et aux dépendances</td></tr>
<tr><td><code>useMemo</code> / <code>useCallback</code></td><td>Mémoïser un calcul coûteux / une fonction stable (à utiliser après mesure)</td></tr>
<tr><td><code>useRef</code></td><td>Référence DOM ou valeur persistante sans re-rendu</td></tr>
<tr><td><code>useContext</code></td><td>Lire un contexte</td></tr></table>
<p><b>Règles</b> : appeler les hooks au niveau racine du composant (pas dans une condition ni une boucle), uniquement dans des composants ou d’autres hooks.</p>
<h2>Hook personnalisé</h2>
<p>Extraire une logique réutilisable, séparée de l’affichage.</p>
[[code
export function useDebounced<T>(value: T, delay = 300) {
  const [v, setV] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return v
}
]]
<h2>Composants réutilisables et maintenables</h2>
<ul>
<li><b>Composition</b> plutôt qu’héritage : <code>children</code>, slots, <i>render props</i>.</li>
<li><b>API de props petite et typée</b> ; valeurs par défaut sûres ; variantes via une union (<code>variant: 'primary' | 'ghost'</code>).</li>
<li><b>Contrôlé / non contrôlé</b> : exposer <code>value</code> + <code>onChange</code> pour laisser le parent décider.</li>
<li><b>Séparer logique et présentation</b> (hook + composant d’affichage), plus facile à tester.</li>
<li><b>Documentation vivante</b> : Storybook, un cas par état (vide, chargement, erreur).</li>
<li><b>Accessibilité intégrée</b> au composant (rôles, focus, clavier).</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Pourquoi une boucle infinie avec useEffect ?</dt><dd>L’effet modifie un état qui figure dans ses dépendances, ou une dépendance est un objet ou une fonction recréée à chaque rendu : l’effet se relance sans fin. Remède : dépendances stables (<code>useMemo</code>, <code>useCallback</code>), ou mettre à jour l’état avec une fonction plutôt qu’en lisant la valeur.</dd>
<dt>Quand éviter useMemo ?</dt><dd>Quand le calcul est bon marché : la mémoïsation a elle-même un coût (comparaison des dépendances, mémoire). On la réserve aux calculs lourds ou aux valeurs qui doivent garder une référence stable, après avoir mesuré.</dd>
<dt>Comment tester un hook ?</dt><dd>Avec <code>renderHook</code> de Testing Library : on obtient <code>result.current</code> et on déclenche les mises à jour dans <code>act()</code>. Un hook qui appelle une API se teste avec l’API simulée (MSW ou mock).</dd>
</dl>`,
  },
  {
    id: 'figma',
    label: 'Figma : maquettage et prototypage',
    category: 'UI / UX',
    level: 'partiel',
    summary: 'Outil de design collaboratif : on y dessine les écrans, compose des composants et crée des prototypes cliquables pour valider une interface avant de la coder.',
    cv: 'Figma et Zeplin figurent dans ton CV, mais sans projet de conception décrit. L’offre demande de concevoir des maquettes et prototypes : prépare un exemple où tu as maquetté ou retravaillé des écrans.',
    body: `
<h2>À quoi ça sert dans ce poste</h2>
<p>L’offre te demande d’<b>étudier des spécifications UI/UX</b> et de <b>concevoir maquettes et prototypes interactifs</b>. Il s’agit de proposer et valider des écrans (tableaux, courbes, schémas) avec le client avant le développement.</p>
<h2>Notions clés</h2>
<ul>
<li><b>Frames et Auto Layout</b> : mise en page qui s’adapte (équivalent de Flexbox).</li>
<li><b>Composants et variantes</b> : un bouton avec états (défaut, survol, désactivé), instances réutilisables, <i>overrides</i>.</li>
<li><b>Styles et variables</b> : couleurs, typographies, espacements, modes (clair/sombre) = <b>design tokens</b>.</li>
<li><b>Prototypage</b> : liens entre frames, transitions, interactions, états conditionnels (variables).</li>
<li><b>Mode Dev</b> : mesures, CSS généré, handoff vers le développeur. Commentaires et historique de versions pour la relecture.</li>
<li><b>Bibliothèques partagées</b> : un seul système de composants pour toute l’équipe.</li>
</ul>
<h2>Du design au code</h2>
<table><tr><th>Figma</th><th>Code</th></tr>
<tr><td>Composant + variantes</td><td>Composant React + prop <code>variant</code></td></tr>
<tr><td>Auto Layout</td><td>Flexbox / Grid</td></tr>
<tr><td>Variables / styles</td><td>Variables CSS, thème</td></tr>
<tr><td>Prototype</td><td>Parcours à implémenter et tester</td></tr></table>
<h2>Bonnes pratiques</h2>
<ul><li>Nommer clairement les calques ; partir de composants avant les écrans.</li><li>Prototyper les <b>cas limites</b> d’une interface de données : vide, chargement, erreur, très grand volume.</li><li>Valider tôt avec les utilisateurs ; mesurer le contraste et la lisibilité.</li></ul>
<h2>Organiser un fichier Figma</h2>
<ul>
<li><b>Pages</b> : séparer par exemple « Composants », « Écrans », « Prototypes » et « Archives ». Un fichier lisible se parcourt sans deviner.</li>
<li><b>Sections et frames</b> : une frame correspond à un écran ou à une taille d’écran (bureau, tablette, mobile) ; les sections regroupent les écrans d’un même parcours.</li>
<li><b>Nommage</b> : une convention commune (par exemple <code>Bouton/Primaire/Survol</code>) range les composants par groupes dans le panneau des ressources et se traduit presque directement en noms de composants dans le code.</li>
<li><b>Contraintes et redimensionnement</b> : les contraintes (gauche, droite, centré, étirer) et l’Auto Layout (remplir, ajuster au contenu, taille fixe) décrivent le comportement quand la fenêtre change de taille.</li>
</ul>
<h2>Composants avancés</h2>
<ul>
<li><b>Propriétés de composant</b> : booléen (afficher ou masquer une icône), texte, échange d’instance (<i>instance swap</i>) et variantes. Elles évitent de multiplier les variantes pour chaque combinaison.</li>
<li><b>Composant principal et instances</b> : modifier le principal met à jour toutes les instances ; une instance peut être détachée, mais elle perd alors le lien, ce qu’il vaut mieux éviter.</li>
<li><b>Composants imbriqués</b> : un champ de formulaire peut contenir une étiquette, une icône et un message d’erreur, eux-mêmes des composants.</li>
<li><b>Bibliothèque publiée</b> : les équipes l’activent dans leurs fichiers et reçoivent les mises à jour de façon contrôlée.</li>
</ul>
<h2>Variables et design tokens</h2>
<p>Les variables Figma peuvent être de type couleur, nombre, chaîne de caractères ou booléen. Elles sont regroupées en <b>collections</b>, chaque collection pouvant avoir plusieurs <b>modes</b> (clair / sombre, ou plusieurs langues, ou densité compacte / confortable).</p>
<table><tr><th>Niveau</th><th>Exemple</th><th>Rôle</th></tr>
<tr><td>Primitif</td><td>bleu-500 = une valeur de couleur précise</td><td>Palette brute</td></tr>
<tr><td>Sémantique</td><td>couleur-action = bleu-500 (clair) ou bleu-300 (sombre)</td><td>Intention, utilisée par les composants</td></tr>
<tr><td>Composant</td><td>bouton-fond = couleur-action</td><td>Spécifique à un composant</td></tr></table>
<p>Côté code, on retrouve cette hiérarchie dans des variables CSS (<code>--color-action</code>) redéfinies par thème. Changer un mode dans Figma ou une classe de thème dans le code produit alors le même effet.</p>
[[code
:root {
  --color-action: #1f6feb;
  --space-2: 8px;
}
:root[data-theme="dark"] {
  --color-action: #79a8ff;
}
.button { background: var(--color-action); padding: var(--space-2); }
]]
<h2>Prototypage avancé</h2>
<ul>
<li><b>Déclencheurs</b> : au clic, au survol, pendant l’appui, après un délai, avec le clavier.</li>
<li><b>Actions</b> : naviguer vers une frame, ouvrir une superposition (menu, modale), revenir en arrière, défiler jusqu’à un élément, changer de variante.</li>
<li><b>Animations</b> : instantané, fondu, <i>Smart animate</i> (anime les calques de même nom entre deux frames), glissement.</li>
<li><b>Variables et conditions</b> : un prototype peut mémoriser une valeur (filtre actif, onglet choisi) et afficher des résultats différents, ce qui permet de simuler un vrai comportement sans développement.</li>
<li><b>Limites</b> : un prototype n’est pas une application ; il ne gère pas de vraies données ni les performances. Il sert à valider un parcours, pas à le garantir.</li>
</ul>
<h2>Handoff et collaboration avec les développeurs</h2>
<ul>
<li>Le <b>mode Dev</b> affiche mesures, propriétés et extraits de code pour un calque sélectionné, et permet de marquer les écrans « prêts pour le développement ».</li>
<li>Les <b>commentaires</b> épinglés sur un écran et l’<b>historique de versions</b> servent de trace des décisions.</li>
<li><b>Zeplin</b> remplit un rôle voisin de livraison des maquettes aux développeurs ; <b>FigJam</b> est un tableau blanc pour les ateliers et schémas de parcours.</li>
<li>Un <b>Storybook</b> côté code, comparé à la bibliothèque Figma, aide à vérifier que les composants réels correspondent aux composants dessinés.</li>
</ul>
<h2>Accessibilité dès la maquette</h2>
<ul>
<li><b>Contraste</b> : au minimum 4,5:1 pour le texte normal et 3:1 pour le grand texte (critères WCAG niveau AA).</li>
<li>Ne pas transmettre une information par la couleur seule (alarme rouge : ajouter une icône ou un libellé).</li>
<li>Prévoir l’état de <b>focus visible</b> au clavier et des zones cliquables suffisantes.</li>
<li>Annoter l’ordre de lecture et les libellés pour les technologies d’assistance.</li>
</ul>
<h2>Cas d’une interface de données (tableaux, courbes, schémas)</h2>
<ul>
<li>Prévoir les états <b>vide</b>, <b>chargement</b>, <b>erreur</b> et <b>très grand volume</b> (colonnes tronquées, pagination ou défilement virtualisé).</li>
<li>Dessiner un tableau avec un en-tête fixe, un tri, des filtres et des lignes sélectionnées comme composants distincts.</li>
<li>Pour les alarmes, définir une échelle de sévérité cohérente (couleur, icône, libellé) et tester la lisibilité en niveaux de gris.</li>
</ul>
<h2>Erreurs fréquentes</h2>
<ul>
<li>Dessiner des écrans avant d’avoir défini les composants : on duplique et on dérive.</li>
<li>Utiliser des valeurs en dur (couleur copiée, espacement au pixel) au lieu des variables.</li>
<li>Maquettes uniquement pour le « cas heureux » ; oublier les erreurs et les données extrêmes.</li>
<li>Détacher des instances pour « aller plus vite » : la bibliothèque devient incohérente.</li>
<li>Transmettre des maquettes sans les avoir confrontées à la faisabilité technique.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Comment passes-tu d’une maquette à des composants ?</dt><dd>Je repère d’abord les éléments répétés (boutons, champs, cartes) et leurs variantes, je les rapproche du design system existant, puis je découpe l’écran en composants du plus petit au plus grand. Les valeurs (couleurs, espacements) viennent des tokens, pas de mesures au pixel.</dd>
<dt>Comment gères-tu un désaccord entre maquette et faisabilité technique ?</dt><dd>J’explique tôt le problème avec des faits (coût, performance, accessibilité), je propose une alternative proche visuellement, et on tranche ensemble avec le designer et le produit. Le but est de garder l’intention de la maquette, pas forcément son pixel exact.</dd>
<dt>Comment organises-tu une bibliothèque de composants pour qu’elle reste maintenable ?</dt><dd>Je pars de tokens (variables) puis de composants simples, je nomme avec une convention hiérarchique, j’utilise des propriétés de composant plutôt que de multiplier les variantes, et je publie les changements avec une description pour que les équipes sachent ce qui évolue.</dd>
<dt>Pourquoi prototyper les cas limites ?</dt><dd>Parce qu’une interface de données est souvent jugée sur ses cas difficiles : liste vide, erreur, très grand volume, alarmes en rafale. Les voir tôt évite de découvrir en développement des écrans non prévus.</dd>
</dl>`,
  },
  {
    id: 'grpc',
    label: 'gRPC',
    category: 'Échanges avec le back-end',
    level: 'à préparer',
    summary: 'Protocole d’appel de procédures à distance de Google : contrat décrit en Protocol Buffers, transport HTTP/2, messages binaires compacts, streaming natif.',
    cv: 'gRPC n’apparaît pas dans ton CV (REST, BFF, WebSocket oui). C’est un point d’attention : l’offre le cite explicitement. Prépare les bases ci-dessous et dis que tu connais REST/WebSocket, avec envie de monter en compétence.',
    body: `
<h2>Principe</h2>
<p>On décrit le service dans un fichier <code>.proto</code> ; des générateurs produisent client et serveur typés dans chaque langage. Au lieu d’URL et de JSON (REST), on appelle des <b>méthodes</b> avec des messages <b>Protocol Buffers</b> (binaire, schéma strict, rétrocompatible par numéros de champs).</p>
[[code
syntax = "proto3";

service Telemetry {
  rpc GetLink (LinkRequest) returns (Link);              // unaire
  rpc Watch   (LinkRequest) returns (stream Metric);     // streaming serveur
}
message LinkRequest { string id = 1; }
message Link  { string id = 1; string state = 2; }
message Metric { double value = 1; int64 ts = 2; }
]]
<h2>Quatre modes d’appel</h2>
<table><tr><th>Mode</th><th>Usage</th></tr>
<tr><td>Unaire</td><td>Requête / réponse classique</td></tr>
<tr><td>Streaming serveur</td><td>Flux de mesures, alarmes en temps réel</td></tr>
<tr><td>Streaming client</td><td>Envoi continu (upload, journaux)</td></tr>
<tr><td>Bidirectionnel</td><td>Échange continu dans les deux sens</td></tr></table>
<h2>gRPC dans le navigateur</h2>
<p>Un navigateur ne peut pas parler gRPC natif (pas de contrôle fin d’HTTP/2). Solutions : <b>gRPC-Web</b> via un proxy (Envoy) ou <b>Connect</b> (<code>@connectrpc/connect-web</code>), et génération du client TypeScript avec <code>protoc-gen-es</code> ou <code>ts-proto</code>. Le streaming client et bidirectionnel est limité côté web.</p>
<h2>gRPC vs REST</h2>
<table><tr><th></th><th>gRPC</th><th>REST/JSON</th></tr>
<tr><td>Format</td><td>Binaire, compact</td><td>Texte, lisible</td></tr>
<tr><td>Contrat</td><td>Fort (.proto, code généré)</td><td>OpenAPI optionnel</td></tr>
<tr><td>Streaming</td><td>Natif</td><td>Via SSE/WebSocket</td></tr>
<tr><td>Débogage</td><td>Outils dédiés</td><td>Simple (curl, navigateur)</td></tr></table>
<p>Fréquent en télécom et industriel : supervision d’équipements (ex. gNMI, basé sur gRPC), services internes à faible latence.</p>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Pourquoi HTTP/2 ?</dt><dd>gRPC a besoin du multiplexage (plusieurs appels sur une connexion), des flux bidirectionnels et de la compression d’en-têtes d’HTTP/2 : c’est ce qui permet le streaming et la faible latence.</dd>
<dt>Comment gérer l’évolution d’un schéma sans casser les clients ?</dt><dd>Chaque champ Protobuf a un numéro : on ajoute de nouveaux champs avec de nouveaux numéros, on ne réutilise ni ne renumérote jamais un champ supprimé (on le réserve avec <code>reserved</code>), et on ne change pas le type d’un champ existant. Les anciens clients ignorent les champs inconnus.</dd>
<dt>Comment consommer un flux gRPC depuis React ?</dt><dd>On ouvre l’abonnement dans un <code>useEffect</code>, on pousse les messages dans l’état (en les regroupant si le débit est élevé), et on annule le flux dans la fonction de nettoyage de l’effet. En cas de coupure, on reconnecte avec un délai croissant.</dd>
</dl>`,
  },
  {
    id: 'integration-continue',
    label: 'Intégration continue (CI/CD)',
    category: 'Qualité & livraison',
    level: 'acquis',
    summary: 'À chaque modification, une chaîne automatique construit, vérifie et teste le code (puis le livre), pour détecter les erreurs tôt.',
    cv: 'CircleCI, Jenkins et GitHub Actions apparaissent dans ton CV (projets pro et perso). Tu peux citer concrètement ce que ta pipeline exécute (tests Jest, build, déploiement).',
    body: `
<h2>Idée</h2>
<p><b>CI</b> : intégrer le code souvent dans la branche commune, avec vérifications automatiques. <b>CD</b> : livraison continue (artefact toujours prêt, déploiement sur validation) ou déploiement continu (automatique).</p>
<h2>Pipeline front typique</h2>
<ol>
<li><b>Installation</b> des dépendances (<code>npm ci</code>, cache du gestionnaire de paquets)</li>
<li><b>Qualité</b> : <code>eslint</code>, <code>prettier --check</code>, <code>tsc --noEmit</code></li>
<li><b>Tests</b> unitaires avec couverture</li>
<li><b>Analyse statique</b> (SonarQube) et audit des dépendances (<code>npm audit</code>)</li>
<li><b>Build</b> de production et contrôle de la taille du bundle</li>
<li><b>Publication</b> de l’artefact (dépôt d’artefacts), déploiement, tests de fumée</li>
</ol>
<h2>Bonnes pratiques</h2>
<ul>
<li>Pipeline rapide (cache, jobs parallèles) : un retour en quelques minutes.</li>
<li>Pipeline <b>reproductible</b> : versions figées (lockfile, image Docker), pas d’étape manuelle.</li>
<li>Branche protégée : merge seulement si la pipeline est verte et la revue faite.</li>
<li>Secrets dans le coffre du CI, jamais dans le dépôt.</li>
<li>Versionner et tagger les livraisons (semver), garder un moyen de <i>rollback</i>.</li>
</ul>
[[code
# exemple générique (GitHub Actions)
jobs:
  ci:
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint && pnpm tsc --noEmit
      - run: pnpm test --coverage
      - run: pnpm build
]]
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Différence livraison continue / déploiement continu ?</dt><dd>Livraison continue : chaque version validée est prête à être déployée, mais le déploiement en production est déclenché par une décision humaine. Déploiement continu : la mise en production est automatique dès que la pipeline est verte.</dd>
<dt>Que fais-tu d’un test instable (flaky) ?</dt><dd>Je ne le relance pas en boucle : je le mets en quarantaine pour débloquer l’équipe, puis je cherche la cause (dépendance au temps, à l’ordre, à une donnée partagée, à une attente trop courte) et je le corrige ou le supprime s’il n’apporte rien.</dd>
<dt>Comment accélérer une pipeline lente ?</dt><dd>Mettre en cache les dépendances et le build, paralléliser les jobs (lint, tests, build), ne lancer que les tests concernés par le changement, utiliser des agents plus rapides, et repousser les étapes lentes (e2e complets) à une pipeline nocturne ou de release.</dd>
</dl>`,
  },
  {
    id: 'outils-ci',
    label: 'GitLab / TeamCity / Artifactory / SonarQube',
    category: 'Qualité & livraison',
    level: 'partiel',
    summary: 'Quatre outils de la chaîne de livraison : GitLab (dépôt et CI), TeamCity (serveur de builds), Artifactory (dépôt d’artefacts), SonarQube (qualité du code).',
    cv: 'Tu as pratiqué CircleCI, Jenkins et GitHub Actions : les principes sont les mêmes. Aucun de ces quatre outils n’est cité dans ton CV ; présente-les comme des équivalents à tes outils.',
    body: `
<h2>GitLab (et GitLab CI)</h2>
<p>Plateforme complète : dépôt Git, <i>merge requests</i>, tickets, registre, CI/CD. La pipeline est décrite dans <code>.gitlab-ci.yml</code> (stages, jobs, <code>rules</code>), exécutée par des <b>runners</b>. Notions : <code>artifacts</code>, <code>cache</code>, variables protégées, environnements.</p>
[[code
stages: [check, build]
test:
  stage: check
  image: node:22
  cache: { paths: [node_modules/] }
  script: [npm ci, npm run lint, npm test -- --coverage]
build:
  stage: build
  script: [npm ci, npm run build]
  artifacts: { paths: [dist/] }
]]
<h2>TeamCity (JetBrains)</h2>
<p>Serveur d’intégration continue : <b>configurations de build</b> exécutées sur des <b>agents</b>, étapes (<i>build steps</i>), déclencheurs, <b>chaînes de dépendances</b> entre builds (build → tests → livraison). Configuration possible en code (Kotlin DSL). Équivalent proche de Jenkins.</p>
<h2>Artifactory (JFrog)</h2>
<p>Gestionnaire d’<b>artefacts</b> : stocke les paquets internes (npm, Maven, Docker…) et sert de <b>proxy/cache</b> des dépôts publics. Intérêt en milieu industriel ou sécurisé : sources maîtrisées, traçabilité, builds reproductibles. Côté front : un <code>.npmrc</code> pointe vers le registre npm privé.</p>
[[code
# .npmrc
registry=https://artifactory.exemple.fr/artifactory/api/npm/npm-virtual/
]]
<h2>SonarQube</h2>
<p>Analyse statique : détecte <b>bugs</b>, <b>vulnérabilités</b>, <b>code smells</b>, duplications, mesure la <b>couverture</b> de tests. Une <b>Quality Gate</b> (ex. couverture ≥ 80 %, aucune nouvelle vulnérabilité) fait échouer la pipeline si le seuil n’est pas atteint. Souvent appliqué sur le « nouveau code » seulement.</p>
<h2>Vue d’ensemble</h2>
<table><tr><th>Étape</th><th>Outil</th></tr>
<tr><td>Code + revue</td><td>GitLab</td></tr><tr><td>Build + tests</td><td>GitLab CI ou TeamCity</td></tr>
<tr><td>Contrôle qualité</td><td>SonarQube</td></tr><tr><td>Stockage des livrables et dépendances</td><td>Artifactory</td></tr></table>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Qu’est-ce qu’une Quality Gate ?</dt><dd>Un ensemble de seuils (couverture, nouveaux bugs, vulnérabilités, duplication) que SonarQube évalue sur le nouveau code ; si un seuil est dépassé, la pipeline échoue.</dd>
<dt>Pourquoi un registre d’artefacts interne ?</dt><dd>Pour maîtriser les dépendances (cache, disponibilité hors ligne, versions figées), tracer ce qui est livré et éviter de dépendre directement de dépôts publics, surtout en milieu sécurisé.</dd>
<dt>Comment migrer une pipeline Jenkins vers GitLab CI ?</dt><dd>Lister les étapes du Jenkinsfile, les traduire en stages et jobs dans <code>.gitlab-ci.yml</code>, déplacer les secrets dans les variables protégées, puis faire tourner les deux en parallèle sur quelques builds avant de couper Jenkins.</dd>
</dl>`,
  },
  {
    id: 'java',
    label: 'Java (connaissance appréciée)',
    category: 'Compétence appréciée',
    level: 'à préparer',
    summary: 'Langage objet typé exécuté sur la JVM, très présent dans les back-ends d’entreprise. Utile ici pour dialoguer avec l’équipe serveur.',
    cv: 'Java n’est pas dans ton CV (tu as C#, très proche). Compétence « appréciée », pas bloquante : mets en avant ta maîtrise de C# et du typage fort.',
    body: `
<h2>Pourquoi c’est dans l’offre</h2>
<p>Le back-end et les outils du projet sont probablement en Java. Le développeur front doit comprendre les contrats d’API, les modèles de données et les messages d’erreur de la couche serveur.</p>
<h2>Notions de base</h2>
<ul>
<li><b>JVM</b> : le code est compilé en bytecode, exécuté par la machine virtuelle ; garbage collector automatique.</li>
<li><b>Typage statique fort</b>, classes, interfaces, héritage, <b>generics</b> (<code>List&lt;String&gt;</code>), <i>records</i> (données immuables), <code>Optional</code>.</li>
<li><b>Collections</b> : <code>List</code>, <code>Map</code>, <code>Set</code> ; <b>Streams</b> (<code>map</code>, <code>filter</code>, <code>collect</code>), proches de <code>Array.map/filter</code>.</li>
<li><b>Exceptions</b> : vérifiées (checked) et non vérifiées.</li>
<li><b>Build</b> : Maven ou Gradle (équivalents de npm + scripts) ; <b>Spring Boot</b> pour exposer des API REST.</li>
<li><b>Tests</b> : JUnit.</li>
</ul>
<h2>Java et TypeScript : parallèles</h2>
<table><tr><th>Java</th><th>TypeScript</th></tr>
<tr><td><code>interface</code>, <code>record</code></td><td><code>interface</code>, <code>type</code></td></tr>
<tr><td><code>List&lt;T&gt;</code>, generics</td><td><code>T[]</code>, generics</td></tr>
<tr><td>Streams</td><td>Méthodes de tableau</td></tr>
<tr><td>Maven / Gradle</td><td>npm / pnpm</td></tr>
<tr><td>Types vérifiés à l’exécution aussi</td><td>Types effacés à l’exécution</td></tr></table>
[[code
// Java
record Link(String id, String state) {}
List<Link> up = links.stream()
    .filter(l -> l.state().equals("UP"))
    .toList();
// TypeScript équivalent
const up = links.filter(l => l.state === 'UP')
]]
<h2>Côté front</h2>
<ul><li>Un contrat d’API peut générer des types TypeScript (OpenAPI, Protobuf) : plus de divergence entre client et serveur.</li><li>Savoir lire une stack trace Java aide à qualifier une anomalie avant de la remonter.</li></ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Quelle expérience as-tu d’un autre langage typé côté serveur ?</dt><dd>C# chez Numericable : application web et web services SOAP, avec Oracle et LDAP. Les notions de Java (classes, interfaces, generics, exceptions) sont très proches, ce qui facilite la lecture du code back-end.</dd>
<dt>Comment collabores-tu avec une équipe back-end ?</dt><dd>On définit ensemble le contrat d’API (champs, codes d’erreur) avant de développer, idéalement avec un schéma qui génère les types TypeScript ; je remonte les anomalies avec un cas reproductible et la trace, et je teste côté front avec l’API simulée en attendant la vraie.</dd>
</dl>`,
  },
  {
    id: 'dataviz',
    label: 'Visualisation de données complexes',
    category: 'Cœur du métier du projet',
    level: 'partiel',
    summary: 'Représenter graphiquement des données : schémas de réseau (nœuds et liens), courbes temporelles, grands tableaux, avec fluidité et lisibilité.',
    cv: 'Tu as de la cartographie temps réel (MapBox, Turf, WebSocket) et une application de visualisation du réseau fibre (ArcGIS). Aucune librairie de graphiques citée : prépare D3 ou une alternative et un exemple de grand volume.',
    body: `
<h2>Trois familles à maîtriser</h2>
<table><tr><th>Besoin</th><th>Outils courants</th></tr>
<tr><td><b>Schémas de réseau</b> (nœuds, liens)</td><td>React Flow, Cytoscape.js, D3-force, vis-network</td></tr>
<tr><td><b>Courbes / séries temporelles</b></td><td>D3, ECharts, Recharts, visx, uPlot (très rapide)</td></tr>
<tr><td><b>Tableaux volumineux</b></td><td>TanStack Table + virtualisation, AG Grid</td></tr></table>
<h2>Technologies de rendu</h2>
<ul>
<li><b>SVG</b> : vectoriel, éléments dans le DOM, accessible et stylable en CSS. Limité à quelques milliers d’éléments.</li>
<li><b>Canvas 2D</b> : dessin en pixels, bien plus rapide pour des dizaines de milliers de points ; il faut gérer soi-même clics et survols.</li>
<li><b>WebGL</b> : accélération GPU pour de très gros volumes (cartes, millions de points).</li>
</ul>
<h2>D3 : le principe</h2>
<p>D3 fournit des briques (échelles, axes, générateurs de formes, mises en page), pas un composant prêt. Dans React, on laisse React rendre le SVG et on utilise D3 pour les calculs.</p>
[[code
const x = scaleTime().domain(extent(data, d => d.ts)).range([0, w])
const y = scaleLinear().domain([0, max(data, d => d.value)!]).range([h, 0])
const path = line<Point>().x(d => x(d.ts)).y(d => y(d.value))(data)
// <path d={path!} fill="none" stroke="currentColor" />
]]
<h2>Performance sur gros volumes</h2>
<ul>
<li><b>Virtualiser</b> les tableaux (ne rendre que les lignes visibles : TanStack Virtual, react-window).</li>
<li><b>Sous-échantillonner</b> les courbes (algorithme LTTB) selon la largeur en pixels.</li>
<li>Canvas au-delà de quelques milliers de points ; <code>requestAnimationFrame</code> pour les mises à jour temps réel ; calculs lourds dans un <b>Web Worker</b>.</li>
<li>Mémoïser les données dérivées, éviter de recréer les échelles à chaque rendu.</li>
</ul>
<h2>Qualité d’une visualisation</h2>
<ul><li>Lisibilité (couleurs contrastées, légende, unités), interactions (zoom, survol, sélection), accessibilité (alternative texte ou tableau), thème clair/sombre, états vide/chargement.</li></ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>SVG ou Canvas ?</dt><dd>SVG jusqu’à quelques milliers d’éléments : chaque forme est dans le DOM, stylable en CSS et accessible. Canvas au-delà : on dessine des pixels, bien plus rapide, mais il faut gérer soi-même la détection des clics et l’accessibilité.</dd>
<dt>Comment afficher 100 000 points ?</dt><dd>Ne jamais tout dessiner : sous-échantillonner selon la largeur en pixels (un écran ne montre pas 100 000 points), agréger, puis rendre en Canvas ou WebGL. Les calculs lourds vont dans un Web Worker.</dd>
<dt>Comment mettre à jour un graphe réseau en temps réel sans tout redessiner ?</dt><dd>Garder les nœuds et liens indexés par identifiant, appliquer seulement les deltas reçus (ajout, suppression, changement d’état), regrouper les mises à jour par <code>requestAnimationFrame</code>, et ne recalculer la disposition que si la topologie change.</dd>
</dl>`,
  },
  {
    id: 'telecom-reseaux',
    label: 'Domaine télécom, réseaux et environnement industriel',
    category: 'Domaine métier',
    level: 'partiel',
    summary: 'Le projet concerne un terminal de transmission télécom : interfaces pour superviser et configurer des équipements réseau dans un cadre industriel exigeant.',
    cv: 'Ton expérience Numericable (visualisation du réseau de fibre optique, authentification, droits, édition des données) est directement pertinente. Appuie-toi dessus ; tu n’as pas besoin d’être expert télécom.',
    body: `
<p><i>Les notions ci-dessous sont des repères généraux pour comprendre le vocabulaire ; l’offre ne précise pas le matériel exact, à demander à l’entretien.</i></p>
<h2>Vocabulaire réseau</h2>
<ul>
<li><b>Topologie</b> : nœuds (équipements), liens, ports/interfaces ; représentée par un schéma de réseau (graphe).</li>
<li><b>Modèle OSI</b> : couche 1 physique (fibre, radio), 2 liaison (Ethernet), 3 réseau (IP), 4 transport (TCP/UDP).</li>
<li><b>Transmission</b> : acheminement de gros débits sur longue distance. Technologies : fibre optique, multiplexage <b>DWDM</b> (plusieurs longueurs d’onde sur une fibre), <b>SDH/SONET</b>, <b>OTN</b>, Ethernet, faisceaux hertziens.</li>
<li><b>Débit, latence, gigue, taux d’erreur</b> : indicateurs de qualité d’un lien.</li>
</ul>
<h2>Ce que fait une interface de supervision</h2>
<p>On la décrit souvent par le modèle <b>FCAPS</b> :</p>
<table><tr><th>F</th><th>Fault</th><th>Alarmes, pannes, états des liens</th></tr>
<tr><td>C</td><td>Configuration</td><td>Paramétrer ports, services, sauvegarde</td></tr>
<tr><td>A</td><td>Accounting</td><td>Usage, facturation</td></tr>
<tr><td>P</td><td>Performance</td><td>Courbes de débit, qualité, seuils</td></tr>
<tr><td>S</td><td>Security</td><td>Droits, authentification, journalisation</td></tr></table>
<p>D’où les « schémas de réseau, courbes, tableaux » de l’offre : topologie (graphe), performances (séries temporelles), inventaire et alarmes (tableaux).</p>
<h2>Protocoles de gestion fréquents</h2>
<ul><li><b>SNMP</b> : supervision classique (lecture de compteurs, traps d’alarme).</li><li><b>NETCONF / YANG</b> : configuration structurée.</li><li><b>gNMI</b> (sur gRPC) : télémétrie en flux. Fait le lien avec l’exigence gRPC de l’offre.</li></ul>
<h2>Contraintes d’un environnement industriel</h2>
<ul>
<li>Fiabilité et traçabilité : spécifications écrites, tests, gestion de configuration, livraisons versionnées.</li>
<li>Données temps réel et alarmes : l’UI doit rester claire et réactive en cas d’afflux.</li>
<li>Sécurité (accès restreint, journalisation) et longue durée de vie du produit.</li>
<li>Processus rigoureux : revue, documentation, suivi des anomalies jusqu’à leur résolution.</li>
</ul>
<h2>Architecture d’un réseau d’opérateur</h2>
<ul>
<li><b>Accès</b> : la partie qui relie les abonnés ou sites clients (fibre jusqu’au domicile, câble, cuivre, radio).</li>
<li><b>Collecte / agrégation</b> : regroupe le trafic de nombreux accès.</li>
<li><b>Cœur de réseau</b> (<i>core</i>) : gros débits entre grands nœuds, haute disponibilité.</li>
<li><b>Réseau de transport</b> : les liaisons optiques longue distance qui relient ces nœuds.</li>
<li>Le <b>plan de gestion</b> (supervision, configuration) est distinct du plan de données qui achemine le trafic.</li>
</ul>
<h2>Fibre optique : notions utiles</h2>
<ul>
<li><b>Monomode ou multimode</b> : la fibre monomode sert aux longues distances et aux grands débits, la multimode aux courtes distances (intérieur de bâtiment, centre de données).</li>
<li><b>Atténuation</b> : perte de puissance lumineuse le long de la fibre et aux connecteurs ou soudures, mesurée en décibels ; elle limite la portée sans amplification ni régénération.</li>
<li><b>Réflectométrie (OTDR)</b> : mesure qui permet de localiser une coupure ou un défaut sur une fibre.</li>
<li><b>PON</b> (réseau optique passif) : une fibre est partagée entre plusieurs abonnés grâce à des coupleurs (splitters) passifs ; le FTTH désigne la fibre jusqu’à l’abonné.</li>
<li><b>Organisation physique</b> : câbles, tubes, fibres, boîtiers de raccordement, baies, chambres de tirage ; on identifie une fibre par son chemin dans cette hiérarchie.</li>
</ul>
<h2>Gestion de parc réseau et inventaire</h2>
<p>Un inventaire décrit les équipements, leurs ports, les liaisons et les services qui les utilisent. Il sert à planifier, à diagnostiquer et à mesurer l’impact d’une panne.</p>
<table><tr><th>Objet</th><th>Exemples d’attributs</th></tr>
<tr><td>Site</td><td>Nom, adresse, coordonnées géographiques</td></tr>
<tr><td>Équipement</td><td>Type, modèle, version logicielle, état, emplacement en baie</td></tr>
<tr><td>Port / interface</td><td>Type, débit, état administratif et opérationnel</td></tr>
<tr><td>Liaison</td><td>Extrémités, support (fibre), longueur, capacité</td></tr>
<tr><td>Service</td><td>Client, chemin utilisé, niveau de qualité attendu</td></tr></table>
<ul>
<li>Un modèle en <b>graphe</b> (nœuds et arêtes) se prête bien à la recherche de chemins et au calcul d’impact : quelles liaisons dépendent de cette fibre ?</li>
<li>La qualité des données (doublons, états obsolètes) est un enjeu majeur : prévoir validations, droits de modification et historique des changements.</li>
</ul>
<h2>SIG et cartographie du réseau</h2>
<ul>
<li>Un <b>système d’information géographique</b> superpose le réseau (tracé des câbles, sites) à un fond de carte.</li>
<li>Formats d’échange courants : <b>GeoJSON</b> (JSON avec géométries Point, LineString, Polygon) ; tuiles vectorielles ou raster pour de gros volumes.</li>
<li>Bibliothèques web : Leaflet, OpenLayers, MapLibre GL ; <b>systèmes de coordonnées</b> à connaître (WGS 84 en latitude / longitude, projections métriques).</li>
<li>Avec beaucoup d’objets : regroupement (clustering), affichage selon le niveau de zoom, chargement par zone visible.</li>
</ul>
[[code
{
  "type": "Feature",
  "properties": { "id": "FO-0042", "etat": "en_service" },
  "geometry": {
    "type": "LineString",
    "coordinates": [[2.35, 48.85], [2.36, 48.86]]
  }
}
]]
<h2>Supervision : alarmes et indicateurs</h2>
<ul>
<li><b>Sévérité</b> d’une alarme : en général critique, majeure, mineure, avertissement, avec effacement (clear) quand le défaut disparaît.</li>
<li><b>Corrélation</b> : une coupure de fibre génère des alarmes sur plusieurs équipements ; on cherche à remonter à la cause racine plutôt qu’à afficher chaque symptôme.</li>
<li><b>Filtrage et acquittement</b> : l’opérateur filtre par site, sévérité, état, et acquitte pour indiquer qu’il prend en charge.</li>
<li><b>Seuils et tendances</b> : alerter sur un dépassement de seuil ou une dégradation progressive (taux d’erreur en hausse) avant la panne.</li>
<li>Disponibilité exprimée en pourcentage : par exemple 99,99 % correspond à environ 53 minutes d’indisponibilité par an.</li>
</ul>
<h2>Sécurité et droits d’accès</h2>
<ul>
<li><b>Authentification</b> et <b>autorisation par rôle</b> : lecture seule, exploitation, administration ; les actions de configuration sont limitées et confirmées.</li>
<li><b>Journalisation</b> (audit) de qui a fait quoi et quand, indispensable pour les actions sur des équipements.</li>
<li>Communications chiffrées (TLS) et gestion prudente des identifiants des équipements.</li>
</ul>
<h2>Bonnes pratiques d’interface pour l’exploitation</h2>
<ul>
<li>Densité d’information élevée mais lisible : tableaux triables, filtres mémorisés, raccourcis clavier.</li>
<li>Indiquer l’<b>horodatage</b> et la fraîcheur des données ; signaler clairement une perte de connexion avec l’équipement.</li>
<li>Actions risquées : confirmation explicite, résumé de l’effet, possibilité d’annuler ou de revenir à la configuration précédente.</li>
<li>Ne pas coder l’état par la couleur seule (daltonisme, écrans de supervision variés).</li>
</ul>
<h2>Questions à poser</h2>
<ul><li>Quels équipements et protocoles le terminal expose-t-il ? Quel volume de données et quelle fréquence de mise à jour ? Quel navigateur ou environnement d’exécution cible ?</li></ul>`,
  },
  {
    id: 'tests',
    label: 'Tests unitaires et de pré-intégration',
    category: 'Qualité & livraison',
    level: 'acquis',
    summary: 'Vérifier automatiquement le code : tests unitaires sur de petites unités, tests de pré-intégration sur des composants assemblés avant la phase système.',
    cv: 'Jest et Jasmine sont dans ton CV, avec couverture suivie sur « Déposer une annonce » et le KYC. Prépare un exemple de test de composant avec API simulée.',
    body: `
<h2>Les niveaux</h2>
<table><tr><th>Niveau</th><th>Cible</th><th>Outils</th></tr>
<tr><td>Unitaire</td><td>Fonction, hook, composant isolé</td><td>Jest ou Vitest</td></tr>
<tr><td>Pré-intégration</td><td>Plusieurs composants + état + API simulée, avant l’intégration système</td><td>Testing Library + MSW</td></tr>
<tr><td>E2E</td><td>Parcours complet dans un navigateur</td><td>Playwright, Cypress</td></tr></table>
<h2>Tester un composant React</h2>
<p><b>React Testing Library</b> : tester ce que voit et fait l’utilisateur (texte, rôle, clic), pas les détails d’implémentation (état interne).</p>
[[code
test('affiche les alarmes puis filtre', async () => {
  render(<AlarmList />)
  expect(await screen.findByText('Lien 12 : DOWN')).toBeInTheDocument()

  await userEvent.click(screen.getByRole('button', { name: /critiques/i }))
  expect(screen.queryByText('Lien 3 : WARN')).not.toBeInTheDocument()
})
]]
<h2>Simuler l’API</h2>
<ul><li><b>MSW</b> (Mock Service Worker) intercepte les requêtes réseau : le code de production reste inchangé.</li><li><code>jest.fn()</code> / <code>vi.fn()</code> pour les dépendances ; horloge simulée pour les temporisations.</li></ul>
<h2>Bonnes pratiques</h2>
<ul>
<li>Un test = un comportement ; noms explicites ; schéma <i>Arrange / Act / Assert</i>.</li>
<li>Pas de dépendance à l’ordre ni au temps réel ; éviter les tests instables.</li>
<li>Couverture utile, pas un score à atteindre à tout prix : cibler la logique métier et les cas limites.</li>
<li>Les <i>snapshots</i> à usage modéré (fragiles).</li>
<li>Tests lancés en CI à chaque commit ; anomalie trouvée = test de non-régression.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Que testes-tu dans un composant ?</dt><dd>Son comportement visible : ce qui s’affiche selon les props, ce qui se passe au clic ou à la saisie, les appels déclenchés. Pas son état interne ni ses classes CSS.</dd>
<dt>Mock ou vrai serveur ?</dt><dd>En unitaire et intégration : API simulée (MSW ou mock) pour des tests rapides et déterministes. Le vrai serveur est réservé aux tests e2e sur un environnement dédié.</dd>
<dt>Comment tester un hook avec renderHook ?</dt><dd><code>const { result } = renderHook(() =&gt; useCompteur())</code>, puis on lit <code>result.current</code> et on enveloppe les actions dans <code>act(() =&gt; result.current.increment())</code> avant de vérifier la nouvelle valeur.</dd>
<dt>Différence entre test unitaire et d’intégration ?</dt><dd>Unitaire : une fonction, un hook ou un composant isolé, dépendances simulées. Intégration : plusieurs composants assemblés avec leur état et leurs appels (simulés par le réseau), pour vérifier qu’ils fonctionnent ensemble.</dd>
</dl>`,
  },
  {
    id: 'git-config',
    label: 'Gestion de configuration du code source',
    category: 'Qualité & livraison',
    level: 'acquis',
    summary: 'Suivre et maîtriser les versions du code : branches, revues, étiquettes de version, livraisons reproductibles. Git en est l’outil central.',
    cv: 'Git, revue de code et pair programming sont dans ton CV. Prépare ta stratégie de branches et de versions (ex. SeLoger).',
    body: `
<h2>Pourquoi c’est une exigence en industriel</h2>
<p>Un produit livré à un client doit pouvoir être <b>reconstruit à l’identique</b> et chaque changement doit être <b>tracé</b> (qui, quand, pourquoi). C’est le rôle de la gestion de configuration.</p>
<h2>Git : notions à maîtriser</h2>
<ul>
<li><b>Branches</b> et fusion : <code>merge</code> (garde l’historique) ou <code>rebase</code> (historique linéaire) ; résolution de conflits.</li>
<li><b>Stratégies</b> : <i>trunk-based</i> (branches courtes, intégration fréquente) ou <i>Gitflow</i> (develop, release, hotfix).</li>
<li><b>Merge / Pull requests</b> : revue de code obligatoire, pipeline verte.</li>
<li><b>Tags</b> et <b>versionnage sémantique</b> (<code>MAJEUR.MINEUR.CORRECTIF</code>) pour identifier les livraisons.</li>
<li><b>Commits</b> atomiques, messages clairs (Conventional Commits : <code>feat:</code>, <code>fix:</code>).</li>
<li><code>cherry-pick</code> (reprendre un correctif), <code>revert</code> (annuler proprement), <code>bisect</code> (trouver le commit fautif).</li>
</ul>
<h2>Configuration au-delà du code</h2>
<ul>
<li><b>Lockfile</b> (<code>pnpm-lock.yaml</code>) commité : mêmes dépendances partout.</li>
<li>Versions des outils figées (<code>.nvmrc</code>, <code>packageManager</code>), configuration en code (lint, CI).</li>
<li><b>Changelog</b> et notes de livraison ; lien commit ↔ ticket.</li>
<li>Secrets hors du dépôt.</li>
</ul>
[[code
git switch -c fix/alarm-filter
git commit -m "fix: keep filter when alarms refresh"
git tag -a v1.4.2 -m "Livraison 1.4.2"
git push --follow-tags
]]
<h2>Comment Git stocke l’historique</h2>
<ul>
<li>Un <b>commit</b> est un instantané du projet, identifié par une empreinte (hash) et lié à son ou ses parents. L’historique est donc un graphe.</li>
<li>Une <b>branche</b> est simplement un pointeur mobile vers un commit ; une <b>étiquette</b> (tag) est un pointeur fixe.</li>
<li><b>HEAD</b> désigne l’endroit où l’on se trouve. Trois zones : répertoire de travail, index (zone de préparation, <code>git add</code>) et dépôt.</li>
<li>Un dépôt <b>distant</b> (origin) est une copie partagée ; <code>fetch</code> récupère sans modifier, <code>pull</code> équivaut à <code>fetch</code> suivi d’un merge ou d’un rebase.</li>
</ul>
<h2>Merge, rebase et fast-forward</h2>
<table><tr><th>Opération</th><th>Effet sur l’historique</th><th>Usage typique</th></tr>
<tr><td>merge (fast-forward)</td><td>Avance simplement le pointeur, aucun commit de fusion</td><td>La branche cible n’a pas bougé</td></tr>
<tr><td>merge (avec commit)</td><td>Crée un commit à deux parents, historique fidèle</td><td>Intégrer une branche de fonctionnalité</td></tr>
<tr><td>squash merge</td><td>Condense la branche en un seul commit</td><td>Garder une branche principale lisible</td></tr>
<tr><td>rebase</td><td>Rejoue les commits sur une nouvelle base, historique linéaire, hashs modifiés</td><td>Mettre à jour sa branche locale</td></tr></table>
<h2>Stratégies de branches en détail</h2>
<ul>
<li><b>Trunk-based</b> : branches très courtes ou commits directs sur la branche principale, intégration continue, fonctionnalités masquées par des <i>feature flags</i>. Demande de bons tests automatiques.</li>
<li><b>Gitflow</b> : branches <code>develop</code>, <code>release/*</code>, <code>hotfix/*</code>. Adapté aux produits livrés par versions numérotées avec maintenance de plusieurs versions, plus lourd à gérer.</li>
<li><b>Branches de maintenance</b> : une branche par version majeure encore supportée, où l’on reporte les correctifs.</li>
<li>Dans tous les cas : protéger la branche principale (revue obligatoire, pipeline verte avant fusion).</li>
</ul>
<h2>Résoudre un conflit</h2>
<p>Un conflit apparaît quand deux branches modifient les mêmes lignes. Git marque le fichier avec des séparateurs ; on choisit ou combine les deux versions, on supprime les marqueurs, puis on termine l’opération.</p>
[[code
git merge feature/export
# CONFLICT (content): Merge conflict in src/export.ts
# éditer le fichier, retirer les marqueurs de conflit
git add src/export.ts
git commit
# pour abandonner : git merge --abort
]]
<h2>Commandes de rattrapage</h2>
<table><tr><th>Besoin</th><th>Commande</th></tr>
<tr><td>Mettre de côté un travail en cours</td><td><code>git stash</code> puis <code>git stash pop</code></td></tr>
<tr><td>Corriger le dernier commit non poussé</td><td><code>git commit --amend</code></td></tr>
<tr><td>Retrouver un commit perdu</td><td><code>git reflog</code></td></tr>
<tr><td>Défaire un commit en gardant les changements</td><td><code>git reset --soft HEAD~1</code></td></tr>
<tr><td>Voir qui a modifié une ligne</td><td><code>git blame fichier</code></td></tr>
<tr><td>Trouver le commit qui a introduit un bug</td><td><code>git bisect start</code>, puis <code>good</code> / <code>bad</code></td></tr>
<tr><td>Annuler un commit déjà partagé</td><td><code>git revert</code></td></tr></table>
<h2>Revue de code et qualité de livraison</h2>
<ul>
<li>Petites demandes de fusion (quelques centaines de lignes au plus), description claire, lien vers le ticket.</li>
<li>Vérifications automatiques à chaque demande : lint, types, tests, build. Les hooks Git locaux (par exemple avec Husky) évitent d’envoyer des erreurs triviales.</li>
<li><b>CODEOWNERS</b> : désigner des relecteurs par dossier.</li>
<li>Commits signés si la politique de sécurité l’exige.</li>
</ul>
<h2>Versions, livraisons et traçabilité</h2>
<ul>
<li>Un <b>tag annoté</b> (<code>git tag -a</code>) contient auteur, date et message : c’est la référence d’une livraison.</li>
<li><b>Semver</b> : MAJEUR pour une rupture de compatibilité, MINEUR pour un ajout compatible, CORRECTIF pour un bug corrigé. Des suffixes comme <code>-rc.1</code> désignent des versions candidates.</li>
<li>Le <b>changelog</b> peut être produit à partir des commits Conventional Commits.</li>
<li>Pour reconstruire une livraison : se placer sur le tag, installer depuis le lockfile, builder avec les mêmes versions d’outils (idéalement en CI ou en conteneur).</li>
<li>Les gros fichiers binaires n’ont pas leur place dans l’historique (utiliser Git LFS ou un dépôt d’artefacts).</li>
</ul>
<h2>Erreurs fréquentes</h2>
<ul>
<li>Réécrire l’historique d’une branche partagée (rebase puis push forcé) : prévoir plutôt <code>--force-with-lease</code> sur une branche personnelle uniquement.</li>
<li>Commiter un secret : le retirer du dernier commit ne suffit pas, il reste dans l’historique ; il faut révoquer le secret.</li>
<li>Commits fourre-tout mélangeant refactoring et fonctionnalité, difficiles à relire et à annuler.</li>
<li>Branches qui vivent des semaines : conflits et intégration douloureuse.</li>
<li>Oublier le lockfile ou le modifier sans le vouloir : builds non reproductibles.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Merge ou rebase ?</dt><dd>Rebase pour mettre à jour sa branche locale et garder un historique linéaire ; merge pour intégrer une branche partagée ou terminée. Règle : on ne rebase jamais une branche déjà poussée et utilisée par d’autres.</dd>
<dt>Comment annuler un commit déjà poussé ?</dt><dd>Avec <code>git revert</code>, qui crée un commit inverse sans réécrire l’historique. <code>git reset</code> suivi d’un push forcé n’est acceptable que sur une branche personnelle.</dd>
<dt>Comment livres-tu un correctif urgent sur une version déjà publiée ?</dt><dd>Je crée une branche depuis le tag de la version en production, j’y applique le correctif (ou je le cherry-pick depuis main), je tague une version corrective (par exemple 1.4.3), je déploie, puis je reporte le correctif sur la branche principale.</dd>
<dt>Qu’est-ce qu’un tag et pourquoi l’utiliser pour une livraison ?</dt><dd>Un tag est un pointeur fixe vers un commit. Il identifie précisément ce qui a été livré, ce qui permet de reconstruire cette version et d’y appliquer un correctif plus tard.</dd>
<dt>Que faire si un secret a été commité ?</dt><dd>Le révoquer et en générer un nouveau en priorité, car il reste lisible dans l’historique. On peut ensuite nettoyer l’historique avec des outils dédiés, mais sans compter dessus si le dépôt a déjà été partagé.</dd>
</dl>`,
  },
  {
    id: 'perf-backend',
    label: 'Performances et échanges avec le back-end',
    category: 'Échanges avec le back-end',
    level: 'acquis',
    summary: 'Garder l’interface fluide (rendu, chargement) et réduire le coût des appels serveur : cache, pagination, flux temps réel, requêtes bien orchestrées.',
    cv: 'Web Vitals, SSR, lazy loading, bundle splitting, WebSocket et BFF sont dans ton CV : sujet où tu es solide. Cite des chiffres avant/après si tu en as.',
    body: `
<h2>Performance de rendu</h2>
<ul>
<li><b>Mesurer d’abord</b> : React DevTools Profiler, onglet Performance de Chrome, Lighthouse.</li>
<li><b>Réduire les re-rendus</b> : état au bon niveau, <code>React.memo</code>, <code>useMemo</code>/<code>useCallback</code> ciblés, sélecteurs précis.</li>
<li><b>Grands volumes</b> : virtualisation des listes et tableaux, Canvas pour les graphiques, <code>useDeferredValue</code> / <code>startTransition</code> pour garder la saisie fluide.</li>
<li><b>Bundle</b> : code splitting (<code>React.lazy</code>, imports dynamiques), tree shaking, analyse de taille.</li>
<li><b>Web Vitals</b> : LCP (chargement), INP (réactivité), CLS (stabilité visuelle).</li>
</ul>
<h2>Échanges avec le back-end</h2>
<ul>
<li><b>Cache côté client</b> : TanStack Query ou RTK Query (<i>stale-while-revalidate</i>, déduplication, invalidation).</li>
<li><b>Pagination / filtrage serveur</b> plutôt que tout charger ; <i>cursor</i> pour les flux changeants.</li>
<li><b>Éviter les cascades</b> de requêtes (<i>waterfalls</i>) : paralléliser avec <code>Promise.all</code>.</li>
<li><b>Debounce</b> des recherches, <code>AbortController</code> pour annuler les requêtes périmées.</li>
<li><b>Temps réel</b> : WebSocket, SSE ou gRPC streaming ; regrouper (<i>batching</i>) les messages avant de rendre.</li>
<li><b>Réseau</b> : compression, cache HTTP (<code>ETag</code>, <code>Cache-Control</code>), formats compacts (Protobuf).</li>
<li><b>BFF</b> : une couche intermédiaire agrège et adapte les appels pour l’interface.</li>
</ul>
[[code
const [alarms, setAlarms] = useState<Alarm[]>([])
useEffect(() => {
  const ws = new WebSocket(url)
  let buffer: Alarm[] = []
  const flush = setInterval(() => {
    if (buffer.length) { setAlarms(a => [...buffer, ...a]); buffer = [] }
  }, 250) // un rendu toutes les 250 ms, pas un par message
  ws.onmessage = e => buffer.push(JSON.parse(e.data))
  return () => { ws.close(); clearInterval(flush) }
}, [url])
]]
<h2>Comprendre le rendu React</h2>
<ul>
<li>Un composant se rend de nouveau quand son état change, quand son parent se rend (sauf s’il est mémoïsé) ou quand un contexte consommé change.</li>
<li>Un rendu n’est pas forcément coûteux : la phase de rendu calcule le résultat, puis React ne modifie le DOM que pour les différences.</li>
<li><b>Clés stables</b> dans les listes (identifiant métier, pas l’index) pour éviter de recréer des éléments.</li>
<li>Déplacer l’état au plus près de son usage est souvent plus efficace qu’ajouter de la mémoïsation.</li>
</ul>
<h2>Mémoïsation : quand et comment</h2>
<table><tr><th>Outil</th><th>Rôle</th><th>Piège</th></tr>
<tr><td><code>React.memo</code></td><td>Évite le rendu si les props sont identiques (comparaison superficielle)</td><td>Inutile si une prop objet ou fonction change à chaque rendu</td></tr>
<tr><td><code>useMemo</code></td><td>Mémorise un calcul coûteux ou une référence stable</td><td>Mal dimensionné, coûte plus qu’il ne rapporte</td></tr>
<tr><td><code>useCallback</code></td><td>Mémorise une fonction passée à un enfant mémoïsé</td><td>Dépendances oubliées : valeurs périmées</td></tr></table>
<p>Règle pratique : mesurer avec le Profiler, mémoïser là où le gain est démontré. Les outils de compilation récents (React Compiler) automatisent une partie de ce travail, sans dispenser de comprendre le principe.</p>
<h2>Gros volumes de données</h2>
<ul>
<li><b>Virtualisation</b> : ne rendre que les lignes visibles (bibliothèques comme TanStack Virtual ou react-window). Un tableau de dizaines de milliers de lignes devient fluide.</li>
<li><b>Canvas ou WebGL</b> pour les courbes ou schémas très denses ; le SVG reste agréable jusqu’à quelques milliers d’éléments.</li>
<li><b>Web Worker</b> : déplacer un calcul lourd (tri, agrégation, décodage) hors du thread principal pour ne pas geler l’interface.</li>
<li><b>Découpage des tâches longues</b> : au-delà de 50 ms, une tâche est considérée comme longue et dégrade l’INP ; <code>startTransition</code> marque une mise à jour comme non urgente.</li>
<li><b>Échantillonnage</b> (décimation) des séries temporelles côté serveur ou client avant tracé.</li>
</ul>
<h2>Chargement des ressources</h2>
<ul>
<li><b>Images</b> : formats modernes (WebP, AVIF), dimensions explicites pour éviter les décalages (CLS), chargement différé (<code>loading="lazy"</code>) sous la ligne de flottaison.</li>
<li><b>Polices</b> : sous-ensembles, <code>font-display: swap</code>.</li>
<li><b>Scripts</b> : <code>defer</code> / <code>async</code>, précharger l’essentiel (<code>preload</code>), différer le reste.</li>
<li><b>SSR / SSG</b> : améliorer le premier affichage ; l’hydratation coûte à son tour du temps sur le client.</li>
<li><b>CDN</b> et hachage des noms de fichiers pour un cache long.</li>
</ul>
<h2>Cache HTTP</h2>
<table><tr><th>En-tête</th><th>Effet</th></tr>
<tr><td><code>Cache-Control: max-age=31536000, immutable</code></td><td>Cache long pour des fichiers dont le nom change à chaque version</td></tr>
<tr><td><code>Cache-Control: no-cache</code></td><td>Le navigateur doit revalider avant réutilisation (il peut garder une copie)</td></tr>
<tr><td><code>Cache-Control: no-store</code></td><td>Aucune copie conservée (données sensibles)</td></tr>
<tr><td><code>ETag</code> + <code>If-None-Match</code></td><td>Revalidation : le serveur répond 304 sans corps si rien n’a changé</td></tr></table>
<h2>Temps réel : choisir le bon mécanisme</h2>
<table><tr><th>Technique</th><th>Sens</th><th>Remarques</th></tr>
<tr><td>Polling</td><td>Client vers serveur, périodique</td><td>Simple, gaspille des requêtes, latence liée à l’intervalle</td></tr>
<tr><td>Server-Sent Events</td><td>Serveur vers client</td><td>Sur HTTP, reconnexion automatique, texte seulement</td></tr>
<tr><td>WebSocket</td><td>Bidirectionnel</td><td>Connexion persistante, à gérer (reconnexion, battement de cœur)</td></tr>
<tr><td>gRPC streaming</td><td>Selon le mode</td><td>Protobuf compact ; dans un navigateur, passe par gRPC-Web ou un proxy</td></tr></table>
<h2>Requêtes bien orchestrées</h2>
<ul>
<li><b>Mutations optimistes</b> : mettre l’interface à jour avant la réponse, puis annuler en cas d’échec.</li>
<li><b>Retry avec backoff</b> exponentiel et plafond pour les erreurs temporaires, jamais sur des opérations non idempotentes sans précaution.</li>
<li><b>Précharger</b> (<i>prefetch</i>) les données de la page suivante probable.</li>
<li><b>Annulation</b> : <code>AbortController</code> évite qu’une vieille réponse écrase une plus récente.</li>
<li><b>GraphQL</b> ou BFF pour éviter le sur-chargement (over-fetching) et le sous-chargement (under-fetching).</li>
</ul>
[[code
const controller = new AbortController()
fetch('/api/alarms?site=' + site, { signal: controller.signal })
  .then(r => r.json())
  .then(setAlarms)
  .catch(e => { if (e.name !== 'AbortError') setError(e) })
// au démontage ou au changement de site : controller.abort()
]]
<h2>Erreurs fréquentes</h2>
<ul>
<li>Optimiser sans mesurer, ou mesurer en mode développement (plus lent qu’en production).</li>
<li>Stocker dans l’état global des données qui devraient rester locales, provoquant des rendus en cascade.</li>
<li>Créer des objets ou fonctions dans le rendu et les passer à des enfants mémoïsés.</li>
<li>Lancer des requêtes dans des effets sans nettoyage : courses entre réponses, fuites de connexions.</li>
<li>Laisser un tampon temps réel grandir sans limite : plafonner le nombre d’éléments conservés.</li>
</ul>
<h2>Questions fréquentes</h2>
<dl class="faq">
<dt>Comment diagnostiquer une page lente ?</dt><dd>Mesurer avant de toucher : onglet Performance et Réseau du navigateur, Profiler React, Web Vitals. On cherche d’abord le plus gros poste (requêtes en cascade, bundle trop lourd, rendus répétés, images) et on corrige dans cet ordre.</dd>
<dt>Que fais-tu quand 50 messages arrivent par seconde ?</dt><dd>Je ne rends pas à chaque message : je les accumule dans un tampon et je mets l’état à jour par lots (toutes les 100 à 250 ms ou par <code>requestAnimationFrame</code>), en ne gardant à l’écran que ce qui est visible.</dd>
<dt>Comment gères-tu cache et données périmées ?</dt><dd>Avec une bibliothèque de cache serveur (TanStack Query, RTK Query) : les données sont servies depuis le cache puis revalidées en arrière-plan, invalidées après une mutation, avec une durée de fraîcheur adaptée à chaque ressource.</dd>
<dt>Quand mémoïser un composant ?</dt><dd>Quand le Profiler montre un rendu coûteux et répété avec des props inchangées. Sinon on privilégie de rapprocher l’état de son usage, car la mémoïsation a un coût et des pièges (dépendances, références instables).</dd>
<dt>WebSocket, SSE ou polling ?</dt><dd>Polling pour un besoin simple et peu fréquent, SSE si seul le serveur envoie des données, WebSocket si l’échange est bidirectionnel et fréquent. Dans tous les cas, regrouper les messages avant de rendre.</dd>
</dl>`,
  },
]
