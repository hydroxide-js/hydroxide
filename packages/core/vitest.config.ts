import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['tests/**/*.test.{ts,tsx}']
  },
  define: {
    DEV: JSON.stringify(true),
    HX_DEV: JSON.stringify(true)
  }
})
