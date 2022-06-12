import { $ } from '../$/$'
import { reactive } from '../reactive'

test('shallow swap', () => {
  const initValue = [1, 2, 3, 4]
  const arr = reactive(initValue)
  $(arr).swap(1, 2)
  expect(arr.value).toEqual([1, 3, 2, 4])
  expect(arr.value).not.toBe(initValue)
  expect(arr.invalidations).toEqual([
    {
      type: 'swap',
      i: 1,
      j: 2,
      path: []
    }
  ])
})

test('deep swap', () => {
  const initValue = {
    foo: {
      bar: {
        arr: [1, 2, 3, 4]
      }
    }
  }

  const state = reactive(initValue)
  $(state, ['foo', 'bar', 'arr']).swap(1, 2)
  expect(state.value.foo.bar.arr).toEqual([1, 3, 2, 4])

  const newValue = state.value
  expect(newValue).not.toBe(initValue)
  expect(newValue.foo).not.toBe(initValue.foo)
  expect(newValue.foo.bar).not.toBe(initValue.foo.bar)
  expect(newValue.foo.bar.arr).not.toBe(initValue.foo.bar.arr)

  expect(state.invalidations).toEqual([
    {
      type: 'swap',
      i: 1,
      j: 2,
      path: ['foo', 'bar', 'arr']
    }
  ])
})
