import { LIST_PHASE, reactive, Reactive, subscribe } from '../src/index'
import { inContext } from './utils/inContext'

describe('immutable reactive', () => {
  describe('shallow remove', () => {
    let initValue: number[], arr: Reactive<number[]>
    let index: number, count: number

    beforeEach(() => {
      inContext(() => {
        initValue = [1, 2, 3, 4]
        arr = reactive(initValue)
        arr.mutable = false
        subscribe(
          arr,
          (type: string, _index: number, _count: number) => {
            expect(type).toBe('remove')
            index = _index
            count = _count
          },
          LIST_PHASE
        )
      })
    })

    function expectNoMutation() {
      expect(arr()).not.toBe(initValue)
    }

    test('start', () => {
      arr.remove(0, 2)
      expect(arr()).toEqual([3, 4])
      expectNoMutation()
      expect(index!).toBe(0)
      expect(count!).toBe(2)
    })

    test('middle', () => {
      arr.remove(1, 2)
      expect(arr()).toEqual([1, 4])
      expectNoMutation()
      expect(index!).toBe(1)
      expect(count!).toBe(2)
    })

    test('end', () => {
      arr.remove(2, 2)
      expect(arr()).toEqual([1, 2])
      expectNoMutation()
      expect(index!).toBe(2)
      expect(count!).toBe(2)
    })

    test('end (using pop)', () => {
      arr.pop(2)
      expect(arr()).toEqual([1, 2])
      expectNoMutation()
      expect(index!).toBe(2)
      expect(count!).toBe(2)
    })
  })

  describe('deep remove', () => {
    type X = {
      foo: {
        bar: {
          arr: number[]
        }
      }
    }

    let initValue: X, state: Reactive<X>
    let called: boolean

    beforeEach(() => {
      called = false
      inContext(() => {
        initValue = {
          foo: {
            bar: {
              arr: [1, 2, 3, 4]
            }
          }
        }
        state = reactive(initValue)
        state.mutable = false

        subscribe(
          state,
          () => {
            called = true
          },
          LIST_PHASE
        )
      }, true)
    })

    function expectNoMutation() {
      const newValue = state()
      expect(newValue).not.toBe(initValue)
      expect(newValue.foo).not.toBe(initValue.foo)
      expect(newValue.foo.bar).not.toBe(initValue.foo.bar)
      expect(newValue.foo.bar.arr).not.toBe(initValue.foo.bar.arr)
    }

    test('start', () => {
      state.$('foo', 'bar', 'arr').remove(0, 2)
      expect(state().foo.bar.arr).toEqual([3, 4])
      expectNoMutation()
      expect(called).toBe(false)
    })

    test('middle', () => {
      state.$('foo', 'bar', 'arr').remove(1, 2)
      expect(state().foo.bar.arr).toEqual([1, 4])
      expectNoMutation()
      expect(called).toBe(false)
    })

    test('end', () => {
      state.$('foo', 'bar', 'arr').remove(2, 2)
      expect(state().foo.bar.arr).toEqual([1, 2])
      expectNoMutation()
      expect(called).toBe(false)
    })

    test('end (using pop)', () => {
      state.$('foo', 'bar', 'arr').pop(2)
      expect(state().foo.bar.arr).toEqual([1, 2])
      expectNoMutation()
      expect(called).toBe(false)
    })
  })
})

describe('mutable reactive', () => {
  describe('shallow remove', () => {
    let initValue: number[], arr: Reactive<number[]>
    let index: number, count: number

    beforeEach(() => {
      inContext(() => {
        initValue = [1, 2, 3, 4]
        arr = reactive(initValue)
        subscribe(
          arr,
          (type: string, _index: number, _count: number) => {
            expect(type).toBe('remove')
            index = _index
            count = _count
          },
          LIST_PHASE
        )
      })
    })

    function expectMutation() {
      expect(initValue).toBe(arr())
    }

    test('start', () => {
      arr.remove(0, 2)
      expect(arr()).toEqual([3, 4])
      expectMutation()
      expect(index!).toBe(0)
      expect(count!).toBe(2)
    })

    test('middle', () => {
      arr.remove(1, 2)
      expect(arr()).toEqual([1, 4])
      expectMutation()
      expect(index!).toBe(1)
      expect(count!).toBe(2)
    })

    test('end', () => {
      arr.remove(2, 2)
      expect(arr()).toEqual([1, 2])
      expectMutation()
      expect(index!).toBe(2)
      expect(count!).toBe(2)
    })

    test('end (using pop)', () => {
      arr.pop(2)
      expect(arr()).toEqual([1, 2])
      expectMutation()
      expect(index!).toBe(2)
      expect(count!).toBe(2)
    })
  })

  describe('deep remove', () => {
    type X = {
      foo: {
        bar: {
          arr: number[]
        }
      }
    }

    let initValue: X, state: Reactive<X>
    let called: boolean

    beforeEach(() => {
      called = false
      inContext(() => {
        initValue = {
          foo: {
            bar: {
              arr: [1, 2, 3, 4]
            }
          }
        }
        state = reactive(initValue)

        subscribe(
          state,
          () => {
            called = true
          },
          LIST_PHASE
        )
      }, true)
    })

    function expectMutation() {
      const newValue = state()
      expect(newValue).toBe(initValue)
      expect(newValue.foo).toBe(initValue.foo)
      expect(newValue.foo.bar).toBe(initValue.foo.bar)
      expect(newValue.foo.bar.arr).toBe(initValue.foo.bar.arr)
    }

    test('start', () => {
      state.$('foo', 'bar', 'arr').remove(0, 2)
      expect(state().foo.bar.arr).toEqual([3, 4])
      expectMutation()
      expect(called).toBe(false)
    })

    test('middle', () => {
      state.$('foo', 'bar', 'arr').remove(1, 2)
      expect(state().foo.bar.arr).toEqual([1, 4])
      expectMutation()
      expect(called).toBe(false)
    })

    test('end', () => {
      state.$('foo', 'bar', 'arr').remove(2, 2)
      expect(state().foo.bar.arr).toEqual([1, 2])
      expectMutation()
      expect(called).toBe(false)
    })

    test('end (using pop)', () => {
      state.$('foo', 'bar', 'arr').pop(2)
      expect(state().foo.bar.arr).toEqual([1, 2])
      expectMutation()
      expect(called).toBe(false)
    })
  })
})
