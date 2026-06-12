import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: 저장소 이름에 맞게 base 경로 수정
// 예) https://username.github.io/invitation/ → VITE_BASE_PATH=/invitation/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isGitHubPages = env.GITHUB_PAGES === 'true'
  const base = isGitHubPages ? (env.VITE_BASE_PATH || '/invitation/') : '/'

  return {
    plugins: [
      react(),
      {
        name: 'gh-pages-spa-fallback',
        closeBundle() {
          if (!isGitHubPages) return
          const index = resolve(process.cwd(), 'dist/index.html')
          copyFileSync(index, resolve(process.cwd(), 'dist/404.html'))
        },
      },
    ],
    base,
  }
})
