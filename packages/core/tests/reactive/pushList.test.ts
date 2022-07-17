import { nestedNumbers, numbers } from '../testingData'

function shallowInsertTest(mutable: boolean, values: number[], expectedValue: number[]) {
  const [arr, is] = numbers(mutable)
  arr.pushList(values)
  expect(arr()).toEqual(expectedValue)
  if (mutable) is.mutated()
  else is.notMutated()
}

function deepInsertTest(mutable: boolean, values: number[], expectedValue: number[]) {
  const path = ['foo', 'bar', 'arr'] as const
  const [state, is] = nestedNumbers(mutable)
  state(...path).pushList(values)
  expect(state().foo.bar.arr).toEqual(expectedValue)
  if (mutable) is.mutated()
  else is.notMutated()
}

function createSuite(deep: boolean, mutable: boolean) {
  test(deep ? 'deep' : 'shallow', () => {
    const fn = deep ? deepInsertTest : shallowInsertTest
    const valuesToInsert = [10, 20, 30]
    fn(mutable, valuesToInsert, [1, 2, 3, 4, ...valuesToInsert])
  })
}

function tester(mutable: boolean) {
  createSuite(false, mutable)
  createSuite(true, mutable)
}

describe('immutable', () => {
  tester(false)
})

describe('mutable', () => {
  tester(true)
})
