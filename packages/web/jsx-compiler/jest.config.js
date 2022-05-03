/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    // use ts-jest for typescript files
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    // use babel-jest for javascript files
    '^.+\\.(js|jsx)$': 'babel-jest'
  }
}
