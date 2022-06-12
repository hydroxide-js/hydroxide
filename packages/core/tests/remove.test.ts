import { $ } from '../$/$'
import { Reactive } from '../../types'
import { reactive } from '../reactive'

describe('shallow remove', () => {
  let initValue: number[], arr: Reactive<number[]>
  beforeEach(() => {
    initValue = [1, 2, 3, 4]
    arr = reactive(initValue)
  })

  function expectNoMutation() {
    expect(arr.value).not.toBe(initValue)
  }

  test('remove in the middle of the array', () => {
    $(arr).remove(1, 2)
    expect(arr.value).toEqual([1, 4])
    expectNoMutation()
    expect(arr.invalidations).toEqual([
      {
        type: 'remove',
        index: 1,
        path: [],
        count: 2
      }
    ])
  })

  test('remove at the start of the array', () => {
    $(arr).remove(0, 2)
    expect(arr.value).toEqual([3, 4])
    expectNoMutation()
    expect(arr.invalidations).toEqual([
      {
        type: 'remove',
        index: 0,
        path: [],
        count: 2
      }
    ])
  })

  test('insert at the end of the array', () => {
    $(arr).remove(2, 2)
    expect(arr.value).toEqual([1, 2])
    expectNoMutation()
    expect(arr.invalidations).toEqual([
      {
        type: 'remove',
        index: 2,
        path: [],
        count: 2
      }
    ])
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

  test('remove in the middle of the array', () => {
    $(state, ['foo', 'bar', 'arr']).remove(1, 2)
    expect(state.value.foo.bar.arr).toEqual([1, 4])
    expectNoMutation(state.value, initValue)
    expect(state.invalidations).toEqual([
      {
        type: 'remove',
        index: 1,
        path: ['foo', 'bar', 'arr'],
        count: 2
      }
    ])
  })

  test('remove at the start of the array', () => {
    $(state, ['foo', 'bar', 'arr']).remove(0, 2)
    expect(state.value.foo.bar.arr).toEqual([3, 4])
    expectNoMutation(state.value, initValue)
    expect(state.invalidations).toEqual([
      {
        type: 'remove',
        index: 0,
        path: ['foo', 'bar', 'arr'],
        count: 2
      }
    ])
  })

  test('remove at the end of the array', () => {
    $(state, ['foo', 'bar', 'arr']).remove(2, 2)
    expect(state.value.foo.bar.arr).toEqual([1, 2])
    expectNoMutation(state.value, initValue)
    expect(state.invalidations).toEqual([
      {
        type: 'remove',
        index: 2,
        path: ['foo', 'bar', 'arr'],
        count: 2
      }
    ])
  })
})
