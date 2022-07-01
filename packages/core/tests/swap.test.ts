import { batch, reactive, subscribe } from '../src/index'
import { LIST_PHASE } from '../src/reactive/scheduler'
import { inContext } from './utils/inContext'

describe('immutable reactive', () => {
  test('shallow swap', () => {
    inContext(() => {
      const initValue = [1, 2, 3, 4]
      const arr = reactive(initValue)
      arr.mutable = false
      let i: number, j: number

      subscribe(
        arr,
        (type: string, _i: number, _j: number) => {
          expect(type).toBe('swap')
          i = _i
          j = _j
        },
        LIST_PHASE
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
    inContext(() => {
      const initValue = {
        foo: {
          bar: {
            arr: [1, 2, 3, 4]
          }
        }
      }

      const state = reactive(initValue)
      state.mutable = false

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

  test('batching optimization', () => {
    const initValue = [1, 2, 3, 4]
    const arr = reactive(initValue)
    arr.mutable = false

    batch(() => {
      // update the reactive for first time and expect the root value to be cloned
      const v1 = arr()
      arr.swap(0, 2)
      expect(arr()).toEqual([3, 2, 1, 4])
      expect(arr()).not.toBe(v1)

      // update reactive for the second time, expect the root value to NOT be cloned again
      const v2 = arr()
      arr.swap(1, 2)
      expect(arr()).toEqual([3, 1, 2, 4])
      const v3 = arr()
      expect(v2).toBe(v3)
    })
  })
})

describe('mutable reactive', () => {
  test('shallow swap', () => {
    inContext(() => {
      const initValue = [1, 2, 3, 4]
      const arr = reactive(initValue) // mutable
      let i: number, j: number

      subscribe(
        arr,
        (type: string, _i: number, _j: number) => {
          expect(type).toBe('swap')
          i = _i
          j = _j
        },
        LIST_PHASE
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
    inContext(() => {
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

      // state mutated
      const newValue = state()
      expect(newValue).toBe(initValue)
      expect(newValue.foo).toBe(initValue.foo)
      expect(newValue.foo.bar).toBe(initValue.foo.bar)
      expect(newValue.foo.bar.arr).toBe(initValue.foo.bar.arr)
    }, true)
  })
})
