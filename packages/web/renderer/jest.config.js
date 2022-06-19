/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  globals: {
    DEV: 'true',
    HX_DEV: 'true',
    PERF_TESTING: 'false',
    'ts-jest': {
      babelConfig: {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
        plugins: ['babel-plugin-hydroxide']
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
