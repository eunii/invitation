import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: 저장소 이름에 맞게 base 경로 수정
// 예) https://username.github.io/invite/ → VITE_BASE_PATH=/invite/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.GITHUB_PAGES === 'true' ? (env.VITE_BASE_PATH || '/invite/') : '/'

  return {
    plugins: [react()],
    base,
  }
})
