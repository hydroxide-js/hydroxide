import { nestedNumbers, numbers } from '../testingData'

function shallowRemoveTest(
  tag: string,
  mutable: boolean,
  i: number,
  count: number,
  expectedValue: number[]
) {
  test(tag, () => {
    const [arr, is] = numbers(mutable)
    arr.remove(i, count)
    expect(arr()).toEqual(expectedValue)
    if (mutable) is.mutated()
    else is.notMutated()
  })
}

function deepRemoveTest(
  tag: string,
  mutable: boolean,
  i: number,
  count: number,
  expectedValue: number[]
) {
  test(tag, () => {
    const path = ['foo', 'bar', 'arr'] as const
    const [state, is] = nestedNumbers(mutable)
    state(...path).remove(i, count)
    expect(state().foo.bar.arr).toEqual(expectedValue)
    if (mutable) is.mutated()
    else is.notMutated()
  })
}

function remove1Tests(mutable: boolean) {
  function scenarios(deep: boolean, mutable: boolean) {
    const fn = deep ? deepRemoveTest : shallowRemoveTest
    const tag = deep ? 'deep' : 'shallow'
    describe(tag, () => {
      fn('start', mutable, 0, 1, [2, 3, 4])
      fn('middle', mutable, 1, 1, [1, 3, 4])
      fn('end', mutable, 3, 1, [1, 2, 3])
    })
  }

  describe('remove 1', () => {
    scenarios(false, mutable)
    scenarios(true, mutable)
  })
}

function remove2Tests(mutable: boolean) {
  function scenarios(deep: boolean, mutable: boolean) {
    const fn = deep ? deepRemoveTest : shallowRemoveTest
    const tag = deep ? 'deep' : 'shallow'
    describe(tag, () => {
      fn('start', mutable, 0, 2, [3, 4])
      fn('middle', mutable, 1, 2, [1, 4])
      fn('end', mutable, 2, 2, [1, 2])
    })
  }

  describe('remove 2', () => {
    scenarios(false, mutable)
    scenarios(true, mutable)
  })
}

describe('immutable', () => {
  remove1Tests(false)
  remove2Tests(false)
})

describe('mutable', () => {
  remove1Tests(true)
  remove2Tests(true)
})
