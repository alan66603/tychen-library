import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the site from https://<username>.github.io/<repository-name>/,
  // so builds made by the GitHub Actions workflow need the repository name as the
  // base path. Cloudflare Pages and local dev serve from the root.
  base: process.env.GITHUB_ACTIONS ? '/tychen-library/' : '/',
  plugins: [vue()],
})
