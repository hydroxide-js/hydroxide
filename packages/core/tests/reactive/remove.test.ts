import { nestedNumbers, numbers } from '../testingData'

function shallowRemoveTest(
  tag: string,
  i: number,
  count: number,
  expectedValue: number[]
) {
  test(tag, () => {
    const [arr, is] = numbers()
    arr.remove(i, count)
    expect(arr()).toEqual(expectedValue)
    is.notMutated()
  })
}

function deepRemoveTest(tag: string, i: number, count: number, expectedValue: number[]) {
  test(tag, () => {
    const path = ['foo', 'bar', 'arr'] as const
    const [state, is] = nestedNumbers()
    state(...path).remove(i, count)
    expect(state().foo.bar.arr).toEqual(expectedValue)
    is.notMutated()
  })
}

function remove1Tests() {
  function scenarios(deep: boolean) {
    const fn = deep ? deepRemoveTest : shallowRemoveTest
    const tag = deep ? 'deep' : 'shallow'
    describe(tag, () => {
      fn('start', 0, 1, [2, 3, 4])
      fn('middle', 1, 1, [1, 3, 4])
      fn('end', 3, 1, [1, 2, 3])
    })
  }

  describe('remove 1', () => {
    scenarios(false)
    scenarios(true)
  })
}

function remove2Tests() {
  function scenarios(deep: boolean) {
    const fn = deep ? deepRemoveTest : shallowRemoveTest
    const tag = deep ? 'deep' : 'shallow'
    describe(tag, () => {
      fn('start', 0, 2, [3, 4])
      fn('middle', 1, 2, [1, 4])
      fn('end', 2, 2, [1, 2])
    })
  }

  describe('remove 2', () => {
    scenarios(false)
    scenarios(true)
  })
}

describe('remove', () => {
  remove1Tests()
  remove2Tests()
})
