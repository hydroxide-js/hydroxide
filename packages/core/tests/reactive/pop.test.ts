import { nestedNumbers, numbers } from '../testingData'

function shallowRemoveTest(count: number, expectedValue: number[]) {
  const [arr, is] = numbers()
  arr.pop(count)
  expect(arr()).toEqual(expectedValue)
  is.notMutated()
}

function deepRemoveTest(count: number, expectedValue: number[]) {
  const path = ['foo', 'bar', 'arr'] as const
  const [state, is] = nestedNumbers()
  state(...path).pop(count)
  expect(state().foo.bar.arr).toEqual(expectedValue)
  is.notMutated()
}

function remove1Tests() {
  function scenarios(deep: boolean) {
    const fn = deep ? deepRemoveTest : shallowRemoveTest
    const tag = deep ? 'deep' : 'shallow'
    test(tag, () => {
      fn(1, [1, 2, 3])
    })
  }

  describe('pop 1', () => {
    scenarios(false)
    scenarios(true)
  })
}

function remove2Tests() {
  function scenarios(deep: boolean) {
    const fn = deep ? deepRemoveTest : shallowRemoveTest
    const tag = deep ? 'deep' : 'shallow'
    test(tag, () => {
      fn(2, [1, 2])
    })
  }

  describe('pop 2', () => {
    scenarios(false)
    scenarios(true)
  })
}

describe('pop', () => {
  remove1Tests()
  remove2Tests()
})
