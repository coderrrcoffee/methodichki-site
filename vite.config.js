import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // На GitHub Pages проект открывается в подпапке с именем репозитория:
  // https://coderrrcoffee.github.io/methodichki-site/
  // Локально — в корне.
  base: command === 'build' ? '/methodichki-site/' : '/',
  plugins: [react()],
}))
