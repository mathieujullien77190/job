// Les CV et les fiches sont du HTML en texte dans Firestore : le panneau de droite les affiche depuis une URL blob.
// Même texte = même URL (cache), pour ne pas recharger le cadre à chaque rendu.
const cache = new Map<string, string>()

export const htmlUrl = (html: string): string => {
  let url = cache.get(html)
  if (!url) {
    url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }))
    cache.set(html, url)
  }
  return url
}
