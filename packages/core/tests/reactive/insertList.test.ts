import { nestedNumbers, numbers } from '../testingData'

function shallowInsertTest(
  mutable: boolean,
  i: number,
  values: number[],
  expectedValue: number[]
) {
  const [arr, is] = numbers(mutable)
  arr.insertList(i, values)
  expect(arr()).toEqual(expectedValue)
  if (mutable) is.mutated()
  else is.notMutated()
}

function deepInsertTest(
  mutable: boolean,
  i: number,
  values: number[],
  expectedValue: number[]
) {
  const path = ['foo', 'bar', 'arr'] as const
  const [state, is] = nestedNumbers(mutable)
  state(...path).insertList(i, values)
  expect(state().foo.bar.arr).toEqual(expectedValue)
  if (mutable) is.mutated()
  else is.notMutated()
}

function createSuite(deep: boolean, mutable: boolean) {
  test(deep ? 'deep' : 'shallow', () => {
    const fn = deep ? deepInsertTest : shallowInsertTest
    const values = [10, 20, 30]
    fn(mutable, 1, values, [1, ...values, 2, 3, 4])
    fn(mutable, 0, values, [...values, 1, 2, 3, 4])
    fn(mutable, 4, values, [1, 2, 3, 4, ...values])
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
