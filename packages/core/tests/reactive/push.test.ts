import { nestedNumbers, numbers } from '../testingData'

function shallowInsertTest(mutable: boolean, value: number, expectedValue: number[]) {
  const [arr, is] = numbers(mutable)
  arr.push(value)
  expect(arr()).toEqual(expectedValue)
  if (mutable) is.mutated()
  else is.notMutated()
}

function deepInsertTest(mutable: boolean, value: number, expectedValue: number[]) {
  const path = ['foo', 'bar', 'arr'] as const
  const [state, is] = nestedNumbers(mutable)
  state(...path).push(value)
  expect(state().foo.bar.arr).toEqual(expectedValue)
  if (mutable) is.mutated()
  else is.notMutated()
}

function createSuite(deep: boolean, mutable: boolean) {
  test(deep ? 'deep' : 'shallow', () => {
    const fn = deep ? deepInsertTest : shallowInsertTest
    const valueToInsert = 10
    fn(mutable, valueToInsert, [1, 2, 3, 4, valueToInsert])
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
