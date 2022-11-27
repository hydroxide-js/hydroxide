import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  globals: {
    DEV: 'true',
    HX_DEV: 'true',
    'ts-jest': {
      babelConfig: {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
        plugins: [
          [
            'babel-plugin-hydroxide',
            {
              // when compiler adds the core and dom imports, import from source during development
              coreImportSource: 'hydroxide',
              domImportSource: path.join(__dirname, 'src/index')
            }
          ]
        ]
      }
    }
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
}
