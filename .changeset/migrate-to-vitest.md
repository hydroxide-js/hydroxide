---
'hydroxide': patch
'hydroxide-dom': patch
'babel-plugin-hydroxide': patch
---

Migrate test infrastructure to Vitest

- Replace Jest globals with explicit Vitest imports
- Remove globals configuration from Vitest configs
- Replace jest.fn() with vi.fn()
- Add proper TypeScript configuration for tests
