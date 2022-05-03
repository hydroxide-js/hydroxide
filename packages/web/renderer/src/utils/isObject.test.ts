import { isObject } from './isObject'

it('works', () => {
  // primitives are not objects
  expect(isObject(0)).toBe(false)
  expect(isObject(null)).toBe(false)
  expect(isObject(undefined)).toBe(false)
  expect(isObject(Symbol('s'))).toBe(false)
  expect(isObject(true)).toBe(false)
  expect(isObject('str')).toBe(false)

  // functions are not objects
  expect(isObject(() => 42)).toBe(false)

  // array and object types are objects
  expect(isObject([])).toBe(true)
  expect(isObject({})).toBe(true)
})
