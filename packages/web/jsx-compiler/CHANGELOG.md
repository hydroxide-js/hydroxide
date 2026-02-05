# babel-plugin-hydroxide

## 1.6.1-beta.0

### Patch Changes

- Migrate test infrastructure to Vitest

  - Replace Jest globals with explicit Vitest imports
  - Remove globals configuration from Vitest configs
  - Replace jest.fn() with vi.fn()
  - Add proper TypeScript configuration for tests
