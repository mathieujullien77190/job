// Bibliothèque de toutes les fiches techniques (une par mot-clé), dédoublonnées par id.
// Pour une nouvelle technologie : ajouter la fiche dans docs-extra.mjs.
import { docs as triskell } from './docs-triskell.mjs'
import { docs as cnd } from './docs-cnd.mjs'
import { docs as extra } from './docs-extra.mjs'

// Termes à repérer dans le texte d'une offre (offre.txt) pour surligner la ligne où le mot-clé apparaît.
// Mots entiers, insensibles à la casse et aux accents de saisie. Une fiche de docs-extra.mjs peut définir son propre `terms`.
const TERMS = {
  'react-typescript': ['ReactJS', 'TypeScript', 'React'],
  'html-css': ['HTML', 'CSS', 'HTML5', 'CSS3', 'Styled Components', 'TailwindCSS'],
  frameworks: ['framework moderne', 'Vue.js', 'frameworks modernes', 'React', 'Vue'],
  'redux-context': ['Redux', 'Context API', 'gestion des états'],
  'hooks-composants': ['Hooks', 'composants réutilisables'],
  figma: ['Figma', 'maquettes Figma', 'pixel-perfect'],
  grpc: ['gRPC'],
  'integration-continue': ['Intégration continue', 'CI/CD', 'GitHub Actions', 'CircleCI', 'Bitrise', 'DevOps', 'déploiement', 'CI/CD mobile', 'EAS Build', 'EAS Submit'],
  'outils-ci': ['GitLab', 'TeamCity', 'Artifactory', 'SonarQube'],
  java: ['Java'],
  dataviz: ['visualisation de données', 'graphes, courbes, tableaux', 'schémas de réseaux', 'visualisations de données', 'visualisations de données interactives'],
  'telecom-reseaux': ['télécom', 'gestion de réseaux', 'industriel'],
  tests: ['tests unitaires', 'pré-intégration', 'tests automatisés', 'frameworks de tests', 'Jest', 'React Testing Library', 'stratégie de tests'],
  e2e: ['e2e', 'Cypress', 'Playwright', 'Detox', 'end2end'],
  'git-config': ['gestion de configuration', 'versioning', 'Git'],
  'perf-backend': ['performances', 'performance', 'échanges avec le Back-End', 'optimisation du code'],
  'rest-graphql': ['REST', 'GraphQL'],
  'build-bundling': ['npm', 'yarn', 'pnpm', 'bundling', 'Webpack', 'Vite'],
  conteneurisation: ['CONTENEURISATION', 'Docker'],
  'cloud-native': ['CLOUD COMPUTING', 'CLOUD NATIVE', 'AWS', 'CodeDeploy', 'Fargate', 'micro-servicing', 'microservices', 'cloud', 'infrastructure'],
  accessibilite: ['accessibilité', 'accessibles', 'a11y'],
  'securite-front': ['sécurité', 'sécurisation', 'sécurité côté client'],
  'design-system': ['bibliothèque de composants', 'système de design', 'Design System', 'Storybook', 'design système'],
  'diagnostic-incident': ['DIAGNOSTIC SUITE INCIDENT'],
}

// Garde-fou : une fiche existe déjà ? On la réutilise au lieu d'en créer une deuxième.
const existing = new Map([...triskell, ...cnd].map((d) => [d.id, d]))
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
for (const d of extra) {
  const sameId = existing.get(d.id)
  const sameLabel = [...existing.values()].find((e) => norm(e.label) === norm(d.label))
  if (sameId || sameLabel) {
    throw new Error(`Fiche déjà existante : "${d.id}" (${(sameId ?? sameLabel).id}). Réutilise-la dans la liste d'ids, ne la recrée pas dans docs-extra.mjs.`)
  }
}

export const library = [...new Map([...triskell, ...cnd, ...extra].map((d) => [d.id, d])).values()].map(
  (d) => ({ ...d, terms: d.terms ?? TERMS[d.id] ?? [d.label] }),
)
