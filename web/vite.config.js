import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/luminous-rehab/" // <-- set to "/<repo-name>/" or "/" for user site
})