export default {
  projects: [
    '<rootDir>/packages/core/jest.config.js',
    '<rootDir>/packages/web/renderer/jest.config.js',
    '<rootDir>/packages/web/jsx-compiler/jest.config.js'
  ],
  collectCoverageFrom: ['**/src/**/*.ts', '!**/node_modules/**']
}
