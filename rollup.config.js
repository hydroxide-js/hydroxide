import ts from 'rollup-plugin-ts'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'

const input = './src/index.ts'

const devPlugins = [
  ts(),
  replace({
    preventAssignment: true,
    HX_DEV: 'false',
    DEV: 'true'
  })
]

const prodPlugins = [
  ts(),
  replace({
    preventAssignment: true,
    HX_DEV: 'false',
    DEV: 'false'
  }),
  terser()
]

const createConfig = (env, format) => ({
  input: input,
  output: [
    {
      file: `dist/${env}-${format}.js`,
      format: format,
      exports: 'auto'
    }
  ],
  plugins: env === 'dev' ? devPlugins : prodPlugins,
  // ignore circular dependency warning
  onwarn: function (warning, warner) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return
    warner(warning)
  }
})

/** @type {import('rollup').RollupOptions} */
export default [
  createConfig('dev', 'cjs'),
  createConfig('dev', 'esm'),
  createConfig('prod', 'cjs'),
  createConfig('prod', 'esm')
]
