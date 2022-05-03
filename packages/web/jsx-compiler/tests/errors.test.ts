import { testPlugin } from './testPlugin'

test('no errors', () => {
  expect(() => testPlugin('<div />')).not.toThrow()
})

test('fragments not supported', () => {
  // fragments inside function scope
  expect(() => testPlugin('const x = () => <> </>')).toThrow()
  // fragments at program scope
  expect(() => testPlugin('const x = <> </>')).toThrow()
  // fragments at program scope deep in jsx
  expect(() =>
    testPlugin('<div> <div> <div> <> </> </div> </div> </div>')
  ).toThrow()
})

test('invalid special props', () => {
  expect(() => testPlugin('<input $:foo={bar} />')).toThrow()
})

test('valid special props', () => {
  expect(() => testPlugin('<input $:selected={bar} />')).not.toThrow()
  expect(() => testPlugin('<input $:value={bar} />')).not.toThrow()
  expect(() => testPlugin('<input $:checked={bar} />')).not.toThrow()
})
