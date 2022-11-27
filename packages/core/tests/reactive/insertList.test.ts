import { nestedNumbers, numbers } from '../testingData'

function shallowInsertTest(i: number, values: number[], expectedValue: number[]) {
  const [arr, is] = numbers()
  arr.insertList(i, values)
  expect(arr()).toEqual(expectedValue)
  is.notMutated()
}

function deepInsertTest(i: number, values: number[], expectedValue: number[]) {
  const path = ['foo', 'bar', 'arr'] as const
  const [state, is] = nestedNumbers()
  state(...path).insertList(i, values)
  expect(state().foo.bar.arr).toEqual(expectedValue)
  is.notMutated()
}

function createSuite(deep: boolean) {
  test(deep ? 'deep' : 'shallow', () => {
    const fn = deep ? deepInsertTest : shallowInsertTest
    const values = [10, 20, 30]
    fn(1, values, [1, ...values, 2, 3, 4])
    fn(0, values, [...values, 1, 2, 3, 4])
    fn(4, values, [1, 2, 3, 4, ...values])
  })
}

describe('insertList', () => {
  createSuite(false)
  createSuite(true)
})
