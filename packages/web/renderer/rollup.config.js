import cjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-ts'

// take the typescript codebase and create a commonjs build
export default () => {
  /** @type {import('rollup').RollupOptions} */
  const options = {
    input: './src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        exports: 'auto'
      }
    ],
    plugins: [cjs(), ts()]
  }

  return options
}
