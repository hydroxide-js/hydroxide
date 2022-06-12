import { $ } from '../$/$'
import { Reactive } from '../../types'
import { reactive } from '../reactive'

describe('shallow insert', () => {
  let initValue: number[], arr: Reactive<number[]>
  beforeEach(() => {
    initValue = [1, 2, 3, 4]
    arr = reactive(initValue)
  })

  function expectNoMutation() {
    expect(arr.value).not.toBe(initValue)
  }

  test('insert in the middle of the array', () => {
    $(arr).insert(1, 10, 20, 30)
    expect(arr.value).toEqual([1, 10, 20, 30, 2, 3, 4])
    expectNoMutation()
    expect(arr.invalidations).toEqual([
      {
        type: 'insert',
        index: 1,
        path: [],
        values: [10, 20, 30]
      }
    ])
  })

  test('insert at the start of the array', () => {
    $(arr).insert(0, 10, 20, 30)
    expect(arr.value).toEqual([10, 20, 30, 1, 2, 3, 4])
    expectNoMutation()
    expect(arr.invalidations).toEqual([
      {
        type: 'insert',
        index: 0,
        path: [],
        values: [10, 20, 30]
      }
    ])
  })

  test('insert at the end of the array', () => {
    $(arr).insert(4, 10, 20, 30)
    expect(arr.value).toEqual([1, 2, 3, 4, 10, 20, 30])
    expectNoMutation()
    expect(arr.invalidations).toEqual([
      {
        type: 'insert',
        index: 4,
        path: [],
        values: [10, 20, 30]
      }
    ])
  })
})

describe('deep insert', () => {
  type X = {
    foo: {
      bar: {
        arr: number[]
      }
    }
  }

  let initValue: X, state: Reactive<X>
  beforeEach(() => {
    initValue = {
      foo: {
        bar: {
          arr: [1, 2, 3, 4]
        }
      }
    }
    state = reactive(initValue)
  })

  function expectNoMutation(newValue: X, initValue: X) {
    expect(newValue).not.toBe(initValue)
    expect(newValue.foo).not.toBe(initValue.foo)
    expect(newValue.foo.bar).not.toBe(initValue.foo.bar)
    expect(newValue.foo.bar.arr).not.toBe(initValue.foo.bar.arr)
  }

  test('insert in the middle of the array', () => {
    $(state, ['foo', 'bar', 'arr']).insert(1, 10, 20, 30)
    expect(state.value.foo.bar.arr).toEqual([1, 10, 20, 30, 2, 3, 4])
    expectNoMutation(state.value, initValue)
    expect(state.invalidations).toEqual([
      {
        type: 'insert',
        index: 1,
        path: ['foo', 'bar', 'arr'],
        values: [10, 20, 30]
      }
    ])
  })

  test('insert at the start of the array', () => {
    $(state, ['foo', 'bar', 'arr']).insert(0, 10, 20, 30)
    expect(state.value.foo.bar.arr).toEqual([10, 20, 30, 1, 2, 3, 4])
    expectNoMutation(state.value, initValue)
    expect(state.invalidations).toEqual([
      {
        type: 'insert',
        index: 0,
        path: ['foo', 'bar', 'arr'],
        values: [10, 20, 30]
      }
    ])
  })

  test('insert at the end of the array', () => {
    $(state, ['foo', 'bar', 'arr']).insert(4, 10, 20, 30)
    expect(state.value.foo.bar.arr).toEqual([1, 2, 3, 4, 10, 20, 30])
    expectNoMutation(state.value, initValue)
    expect(state.invalidations).toEqual([
      {
        type: 'insert',
        index: 4,
        path: ['foo', 'bar', 'arr'],
        values: [10, 20, 30]
      }
    ])
  })
})
