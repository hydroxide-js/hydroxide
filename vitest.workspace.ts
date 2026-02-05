import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  'packages/core/vitest.config.ts',
  'packages/web/renderer/vitest.config.ts',
  'packages/web/jsx-compiler/vitest.config.ts'
])
