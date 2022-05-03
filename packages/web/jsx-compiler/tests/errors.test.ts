import { testPlugin } from './testPlugin'

describe('Does not throw error for', () => {
  test('Known $: props', () => {
    expect(() => testPlugin('<input $:selected={bar} />')).not.toThrow()
    expect(() => testPlugin('<input $:value={bar} />')).not.toThrow()
    expect(() => testPlugin('<input $:checked={bar} />')).not.toThrow()
  })
})

describe('Throws error for', () => {
  test('JSXFragmentElement', () => {
    // fragments inside function scope
    expect(() => testPlugin('const x = () => <> </>')).toThrow()
    // fragments at program scope
    expect(() => testPlugin('const x = <> </>')).toThrow()
    // fragments at program scope deep in jsx
    expect(() =>
      testPlugin('<div> <div> <div> <> </> </div> </div> </div>')
    ).toThrow()
  })

  test('Unknown $: prop', () => {
    expect(() => testPlugin('<input $:foo={bar} />')).toThrow()
  })
})
