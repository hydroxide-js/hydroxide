// eslint-disable-next-line
const path = require('path')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '@nuejs/core': path.join(__dirname, './packages/core/src/index'),
    '@nuejs/web': path.join(__dirname, './packages/web/src/index')
  }
}
