import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from '@rollup/plugin-eslint'

export default defineConfig({
  plugins: [
    { ...eslint({ include: 'src/**/*.+(js|jsx|ts|tsx)'}),enforce: 'pre' },
    react(),
    ],
})
