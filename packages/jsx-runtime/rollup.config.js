import ts from 'rollup-plugin-ts'

/** @type {import('rollup').RollupOutput} */
export default () => {
  return {
    input: './src/index.ts',
    output: [
      {
        // esm
        file: 'dist/jsx-runtime.esm.js',
        format: 'esm'
      },
      {
        // cjs
        file: 'dist/jsx-runtime.cjs.js',
        format: 'cjs'
      }
    ],
    plugins: [ts()]
  }
}
