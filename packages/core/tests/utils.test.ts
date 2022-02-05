import { drill } from '../src/store/utils'

test('drill', () => {
  const obj = {
    foo: {
      bar: {
        bazz: {}
      }
    }
  }

  // value at existing paths returned
  expect(drill(obj, [])).toBe(obj)
  expect(drill(obj, ['foo'])).toBe(obj.foo)
  expect(drill(obj, ['foo', 'bar'])).toBe(obj.foo.bar)

  // value at new paths created
  // @ts-ignore
  expect(drill(obj, ['foo', 'bazz'])).toBe(obj.foo.bazz)
  // @ts-ignore
  expect(obj.foo.bazz).toEqual({})
})
