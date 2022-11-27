import { nestedNumbers, numbers } from '../testingData'

function shallowInsertTest(i: number, value: number, expectedValue: number[]) {
  const [arr, is] = numbers()
  arr.insert(i, value)
  expect(arr()).toEqual(expectedValue)
  is.notMutated()
}

function deepInsertTest(i: number, value: number, expectedValue: number[]) {
  const path = ['foo', 'bar', 'arr'] as const
  const [state, is] = nestedNumbers()
  state(...path).insert(i, value)
  expect(state().foo.bar.arr).toEqual(expectedValue)
  is.notMutated()
}

function createSuite(deep: boolean) {
  test(deep ? 'deep' : 'shallow', () => {
    const fn = deep ? deepInsertTest : shallowInsertTest
    const valueToInsert = 10
    fn(1, valueToInsert, [1, valueToInsert, 2, 3, 4])
    fn(0, valueToInsert, [valueToInsert, 1, 2, 3, 4])
    fn(4, valueToInsert, [1, 2, 3, 4, valueToInsert])
  })
}

describe('insert', () => {
  createSuite(false)
  createSuite(true)
})
