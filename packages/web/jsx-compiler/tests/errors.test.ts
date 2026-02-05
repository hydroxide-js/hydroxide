import { describe, test, expect } from 'vitest'
import { testPlugin } from './testPlugin'

describe('Throws error for', () => {
  test('JSXFragmentElement', () => {
    // fragments inside function scope
    expect(() => testPlugin('const x = () => <> </>')).toThrow()
    // fragments at program scope
    expect(() => testPlugin('const x = <> </>')).toThrow()
    // fragments at program scope deep in jsx
    expect(() => testPlugin('<div> <div> <div> <> </> </div> </div> </div>')).toThrow()
  })
})
