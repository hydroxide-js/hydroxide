import { defineConfig } from 'vitest/config'
import path from 'path'
import babel from '@babel/core'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['tests/**/*.test.{ts,tsx}']
  },
  define: {
    DEV: JSON.stringify(true),
    HX_DEV: JSON.stringify(true)
  },
  // Disable esbuild jsx handling so babel can do it
  esbuild: {
    jsx: 'preserve'
  },
  plugins: [
    {
      name: 'hydroxide-babel',
      enforce: 'pre',
      async transform(code, id) {
        if (id.endsWith('.tsx') || id.endsWith('.jsx')) {
          const result = await babel.transformAsync(code, {
            filename: id,
            presets: [['@babel/preset-typescript', { isTSX: true, allExtensions: true }]],
            plugins: [
              [
                'babel-plugin-hydroxide',
                {
                  coreImportSource: path.resolve(__dirname, '../../core/src/index'),
                  domImportSource: path.resolve(__dirname, 'src/index')
                }
              ]
            ]
          })
          return result?.code ?? code
        }
      }
    }
  ],
  resolve: {
    alias: {
      hydroxide: path.resolve(__dirname, '../../core/src/index')
    }
  }
})
