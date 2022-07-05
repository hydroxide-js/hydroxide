/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  globals: {
    DEV: 'true',
    HX_DEV: 'true'
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
}
