import ts from 'rollup-plugin-ts'
import pkg from './package.json'
import cleaner from 'rollup-plugin-cleaner'

/** @type {import('rollup').RollupOptions} */
export default {
  input: './src/index.ts',

  // transpile TypeScript to JavaScript
  plugins: [cleaner({ targets: ['./dist'] }), ts()],

  // create a common js bundle
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'auto',
      banner: `// ${pkg.name} v${pkg.version}`
    }
  ],

  // don't bundle dependencies and peerDependencies
  external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)],

  // ignore circular dependency warning
  onwarn: function (warning, warner) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return
    warner(warning)
  }
}
