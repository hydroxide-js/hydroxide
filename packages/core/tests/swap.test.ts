import { reactive, subscribe } from '../src/index'
import { Phase } from '../src/types'
import { inConext } from './utils/inContext'

describe('immutable reactive', () => {
  test('shallow swap', () => {
    inConext(() => {
      const initValue = [1, 2, 3, 4]
      const arr = reactive(initValue)
      let i: number, j: number

      subscribe(
        arr,
        (type: string, _i: number, _j: number) => {
          expect(type).toBe('swap')
          i = _i
          j = _j
        },
        Phase.listUpdate
      )

      // swap
      arr.swap(1, 2)

      // check value is updated
      expect(arr.value).toEqual([1, 3, 2, 4])

      // value is not mutated, but new value is assigned
      expect(arr.value).not.toBe(initValue)

      expect(i!).toBe(1)
      expect(j!).toBe(2)
    }, true)
  })

  test('deep swap', () => {
    inConext(() => {
      const initValue = {
        foo: {
          bar: {
            arr: [1, 2, 3, 4]
          }
        }
      }

      const state = reactive(initValue)

      state.$('foo', 'bar', 'arr').swap(1, 2)

      // value is correct
      expect(state.value.foo.bar.arr).toEqual([1, 3, 2, 4])

      // state is not mutated
      const newValue = state()
      expect(newValue).not.toBe(initValue)
      expect(newValue.foo).not.toBe(initValue.foo)
      expect(newValue.foo.bar).not.toBe(initValue.foo.bar)
      expect(newValue.foo.bar.arr).not.toBe(initValue.foo.bar.arr)
    }, true)
  })
})

describe('mutable reactive', () => {
  test('shallow swap', () => {
    inConext(() => {
      const initValue = [1, 2, 3, 4]
      const arr = reactive(initValue, true) // mutable
      let i: number, j: number

      subscribe(
        arr,
        (type: string, _i: number, _j: number) => {
          expect(type).toBe('swap')
          i = _i
          j = _j
        },
        Phase.listUpdate
      )

      // swap
      arr.swap(1, 2)

      // check value is updated
      expect(arr.value).toEqual([1, 3, 2, 4])

      // value is mutated
      expect(arr.value).toBe(initValue)

      expect(i!).toBe(1)
      expect(j!).toBe(2)
    }, true)
  })

  test('deep swap', () => {
    inConext(() => {
      const initValue = {
        foo: {
          bar: {
            arr: [1, 2, 3, 4]
          }
        }
      }

      const state = reactive(initValue, true)

      state.$('foo', 'bar', 'arr').swap(1, 2)

      // value is correct
      expect(state.value.foo.bar.arr).toEqual([1, 3, 2, 4])

      // state mutated
      const newValue = state()
      expect(newValue).toBe(initValue)
      expect(newValue.foo).toBe(initValue.foo)
      expect(newValue.foo.bar).toBe(initValue.foo.bar)
      expect(newValue.foo.bar.arr).toBe(initValue.foo.bar.arr)
    }, true)
  })
})
