import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

const input = './src/index.ts'
const external = ['hydroxide']
const ts = babel({
  extensions: ['.ts'],
  exclude: 'node_modules/**',
  babelrc: false,
  babelHelpers: 'bundled',
  presets: ['@babel/preset-typescript']
})

const resolver = nodeResolve({ extensions: ['.ts'] })

const devPlugins = [
  resolver,
  ts,
  replace({
    preventAssignment: true,
    HX_DEV: 'false',
    DEV: 'true'
  })
]

const prodPlugins = [
  resolver,
  ts,
  replace({
    preventAssignment: true,
    HX_DEV: 'false',
    DEV: 'false'
  }),
  terser()
]

/** @type {import('rollup').RollupOptions} */
const createConfig = (env, format) => ({
  external: external,
  input: input,
  output: [
    {
      file: `dist/${env}-${format}.js`,
      format: format,
      exports: 'auto',
      banner: `/* ${pkg.name} v${pkg.version} */`
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
