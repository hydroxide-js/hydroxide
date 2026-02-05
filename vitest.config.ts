import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Coverage configuration
    coverage: {
      provider: 'v8',
      include: ['packages/**/src/**/*.ts'],
      exclude: ['**/node_modules/**', '**/dist/**']
    }
  }
})
