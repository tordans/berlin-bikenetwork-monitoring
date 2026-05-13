import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// React Compiler: @vitejs/plugin-react v6+ uses reactCompilerPreset + @rolldown/plugin-babel
// (see https://github.com/vitejs/vite-plugin-react#react-compiler)
export default defineConfig(({ mode }) => ({
  base: mode === 'development' ? '/' : '/berlin-bikenetwork-monitoring',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset({ target: '19' })] }),
    tailwindcss(),
  ],
}))
