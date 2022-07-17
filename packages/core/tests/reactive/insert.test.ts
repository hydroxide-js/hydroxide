import { nestedNumbers, numbers } from '../testingData'

function shallowInsertTest(
  mutable: boolean,
  i: number,
  value: number,
  expectedValue: number[]
) {
  const [arr, is] = numbers(mutable)
  arr.insert(i, value)
  expect(arr()).toEqual(expectedValue)
  if (mutable) is.mutated()
  else is.notMutated()
}

function deepInsertTest(
  mutable: boolean,
  i: number,
  value: number,
  expectedValue: number[]
) {
  const path = ['foo', 'bar', 'arr'] as const
  const [state, is] = nestedNumbers(mutable)
  state(...path).insert(i, value)
  expect(state().foo.bar.arr).toEqual(expectedValue)
  if (mutable) is.mutated()
  else is.notMutated()
}

function createSuite(deep: boolean, mutable: boolean) {
  test(deep ? 'deep' : 'shallow', () => {
    const fn = deep ? deepInsertTest : shallowInsertTest
    const valueToInsert = 10
    fn(mutable, 1, valueToInsert, [1, valueToInsert, 2, 3, 4])
    fn(mutable, 0, valueToInsert, [valueToInsert, 1, 2, 3, 4])
    fn(mutable, 4, valueToInsert, [1, 2, 3, 4, valueToInsert])
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
