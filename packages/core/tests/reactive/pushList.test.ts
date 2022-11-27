import { nestedNumbers, numbers } from '../testingData'

function shallowInsertTest(values: number[], expectedValue: number[]) {
  const [arr, is] = numbers()
  arr.pushList(values)
  expect(arr()).toEqual(expectedValue)
  is.notMutated()
}

function deepInsertTest(values: number[], expectedValue: number[]) {
  const path = ['foo', 'bar', 'arr'] as const
  const [state, is] = nestedNumbers()
  state(...path).pushList(values)
  expect(state().foo.bar.arr).toEqual(expectedValue)
  is.notMutated()
}

function createSuite(deep: boolean) {
  test(deep ? 'deep' : 'shallow', () => {
    const fn = deep ? deepInsertTest : shallowInsertTest
    const valuesToInsert = [10, 20, 30]
    fn(valuesToInsert, [1, 2, 3, 4, ...valuesToInsert])
  })
}

describe('pushList', () => {
  createSuite(false)
  createSuite(true)
})
