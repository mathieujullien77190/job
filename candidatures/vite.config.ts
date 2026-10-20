import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Les données vivent dans Firestore (voir src/helpers/firestore.ts) : le serveur de dev ne sert plus de fichiers.
// base './' : la page marche sous https://<compte>.github.io/<repo>/ sans connaître le nom du repo.
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
})
