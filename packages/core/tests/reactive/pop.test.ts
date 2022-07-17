import { nestedNumbers, numbers } from '../testingData'

function shallowRemoveTest(mutable: boolean, count: number, expectedValue: number[]) {
  const [arr, is] = numbers(mutable)
  arr.pop(count)
  expect(arr()).toEqual(expectedValue)
  if (mutable) is.mutated()
  else is.notMutated()
}

function deepRemoveTest(mutable: boolean, count: number, expectedValue: number[]) {
  const path = ['foo', 'bar', 'arr'] as const
  const [state, is] = nestedNumbers(mutable)
  state(...path).pop(count)
  expect(state().foo.bar.arr).toEqual(expectedValue)
  if (mutable) is.mutated()
  else is.notMutated()
}

function remove1Tests(mutable: boolean) {
  function scenarios(deep: boolean, mutable: boolean) {
    const fn = deep ? deepRemoveTest : shallowRemoveTest
    const tag = deep ? 'deep' : 'shallow'
    test(tag, () => {
      fn(mutable, 1, [1, 2, 3])
    })
  }

  describe('pop 1', () => {
    scenarios(false, mutable)
    scenarios(true, mutable)
  })
}

function remove2Tests(mutable: boolean) {
  function scenarios(deep: boolean, mutable: boolean) {
    const fn = deep ? deepRemoveTest : shallowRemoveTest
    const tag = deep ? 'deep' : 'shallow'
    test(tag, () => {
      fn(mutable, 2, [1, 2])
    })
  }

  describe('pop 2', () => {
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
