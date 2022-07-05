/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
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
