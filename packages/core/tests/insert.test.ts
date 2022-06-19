import { Phase, reactive, Reactive, subscribe } from '../src/index'
import { inConext } from './utils/inContext'

describe('immutable reactive', () => {
  describe('shallow insert', () => {
    let initValue: number[], arr: Reactive<number[]>
    let insertIndex: number
    let valuesInserted: number[]
    const valuesToInsert = [10, 20, 30]

    beforeEach(() => {
      inConext(() => {
        initValue = [1, 2, 3, 4]
        arr = reactive(initValue)

        subscribe(
          arr,
          (type: string, index: number, values: number[]) => {
            expect(type).toBe('insert')
            insertIndex = index
            valuesInserted = values
          },
          Phase.listUpdate
        )
      })
    })

    function expectNoMutation() {
      expect(arr.value).not.toBe(initValue)
    }

    test('insert in the middle of the array', () => {
      arr.insertList(1, valuesToInsert)
      expect(arr.value).toEqual([1, ...valuesToInsert, 2, 3, 4])
      expect(insertIndex).toBe(1)
      expect(valuesInserted).toEqual(valuesToInsert)
      expectNoMutation()
    })

    test('insert at the start of the array', () => {
      arr.insertList(0, valuesToInsert)
      expect(arr.value).toEqual([...valuesToInsert, 1, 2, 3, 4])
      expectNoMutation()
      expect(insertIndex).toBe(0)
      expect(valuesInserted).toEqual(valuesToInsert)
    })

    test('insert at the end of the array', () => {
      arr.insertList(4, valuesToInsert)
      expect(arr.value).toEqual([1, 2, 3, 4, ...valuesToInsert])
      expectNoMutation()
      expect(insertIndex).toBe(4)
      expect(valuesInserted).toEqual(valuesToInsert)
    })
  })

  describe('deep insert', () => {
    // array operations performed deep in array is not collected

    type X = {
      foo: {
        bar: {
          arr: number[]
        }
      }
    }

    let initValue: X, state: Reactive<X>
    let called: boolean
    const valuesToInsert = [10, 20, 30]

    beforeEach(() => {
      called = false
      initValue = {
        foo: {
          bar: {
            arr: [1, 2, 3, 4]
          }
        }
      }

      inConext(() => {
        state = reactive(initValue)
        subscribe(
          state,
          () => {
            called = true
          },
          Phase.listUpdate
        )
      }, true)
    })

    function expectNoMutation(newValue: X, initValue: X) {
      expect(newValue).not.toBe(initValue)
      expect(newValue.foo).not.toBe(initValue.foo)
      expect(newValue.foo.bar).not.toBe(initValue.foo.bar)
      expect(newValue.foo.bar.arr).not.toBe(initValue.foo.bar.arr)
    }

    test('insert in middle', () => {
      state.$('foo', 'bar', 'arr').insertList(1, valuesToInsert)
      expect(state().foo.bar.arr).toEqual([1, ...valuesToInsert, 2, 3, 4])
      expectNoMutation(state.value, initValue)
      expect(called).toBe(false)
    })

    test('insert at start', () => {
      state.$('foo', 'bar', 'arr').insertList(0, valuesToInsert)
      expect(state().foo.bar.arr).toEqual([...valuesToInsert, 1, 2, 3, 4])
      expectNoMutation(state.value, initValue)
      expect(called).toBe(false)
    })

    test('insert at end', () => {
      state.$('foo', 'bar', 'arr').insertList(4, valuesToInsert)
      expect(state().foo.bar.arr).toEqual([1, 2, 3, 4, ...valuesToInsert])
      expectNoMutation(state.value, initValue)
      expect(called).toBe(false)
    })
  })
})

describe('mutable reactive', () => {
  describe('shallow insert', () => {
    let initValue: number[], arr: Reactive<number[]>
    let insertIndex: number
    let valuesInserted: number[]
    const valuesToInsert = [10, 20, 30]

    beforeEach(() => {
      inConext(() => {
        initValue = [1, 2, 3, 4]
        arr = reactive(initValue, true) // mutable

        subscribe(
          arr,
          (type: string, index: number, values: number[]) => {
            expect(type).toBe('insert')
            insertIndex = index
            valuesInserted = values
          },
          Phase.listUpdate
        )
      })
    })

    function expectMutation() {
      expect(arr.value).toBe(initValue)
    }

    test('insert in the middle of the array', () => {
      arr.insertList(1, valuesToInsert)
      expect(arr.value).toEqual([1, ...valuesToInsert, 2, 3, 4])
      expect(insertIndex).toBe(1)
      expect(valuesInserted).toEqual(valuesToInsert)
      expectMutation()
    })

    test('insert at the start of the array', () => {
      arr.insertList(0, valuesToInsert)
      expect(arr.value).toEqual([...valuesToInsert, 1, 2, 3, 4])
      expectMutation()
      expect(insertIndex).toBe(0)
      expect(valuesInserted).toEqual(valuesToInsert)
    })

    test('insert at the end of the array', () => {
      arr.insertList(4, valuesToInsert)
      expect(arr.value).toEqual([1, 2, 3, 4, ...valuesToInsert])
      expectMutation()
      expect(insertIndex).toBe(4)
      expect(valuesInserted).toEqual(valuesToInsert)
    })
  })

  describe('deep insert', () => {
    // array operations performed deep in array is not collected

    type X = {
      foo: {
        bar: {
          arr: number[]
        }
      }
    }

    let initValue: X, state: Reactive<X>
    let called = false
    const valuesToInsert = [10, 20, 30]

    beforeEach(() => {
      initValue = {
        foo: {
          bar: {
            arr: [1, 2, 3, 4]
          }
        }
      }

      inConext(() => {
        state = reactive(initValue, true) // mutable
        subscribe(
          state,
          () => {
            called = true
          },
          Phase.listUpdate
        )
      }, true)
    })

    function expectMutation() {
      expect(state()).toBe(initValue)
      expect(state().foo).toBe(initValue.foo)
      expect(state().foo.bar).toBe(initValue.foo.bar)
      expect(state().foo.bar.arr).toBe(initValue.foo.bar.arr)
    }

    test('insert in middle', () => {
      state.$('foo', 'bar', 'arr').insertList(1, valuesToInsert)
      expect(state().foo.bar.arr).toEqual([1, ...valuesToInsert, 2, 3, 4])
      expectMutation()
      expect(called).toBe(false)
    })

    test('insert at start', () => {
      state.$('foo', 'bar', 'arr').insertList(0, valuesToInsert)
      expect(state().foo.bar.arr).toEqual([...valuesToInsert, 1, 2, 3, 4])
      expectMutation()
      expect(called).toBe(false)
    })

    test('insert at end', () => {
      state.$('foo', 'bar', 'arr').insertList(4, valuesToInsert)
      expect(state().foo.bar.arr).toEqual([1, 2, 3, 4, ...valuesToInsert])
      expectMutation()
      expect(called).toBe(false)
    })
  })
})
