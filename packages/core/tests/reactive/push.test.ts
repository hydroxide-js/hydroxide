import { nestedNumbers, numbers } from '../testingData'

function shallowInsertTest(value: number, expectedValue: number[]) {
  const [arr, is] = numbers()
  arr.push(value)
  expect(arr()).toEqual(expectedValue)
  is.notMutated()
}

function deepInsertTest(value: number, expectedValue: number[]) {
  const path = ['foo', 'bar', 'arr'] as const
  const [state, is] = nestedNumbers()
  state(...path).push(value)
  expect(state().foo.bar.arr).toEqual(expectedValue)
  is.notMutated()
}

function createSuite(deep: boolean) {
  test(deep ? 'deep' : 'shallow', () => {
    const fn = deep ? deepInsertTest : shallowInsertTest
    const valueToInsert = 10
    fn(valueToInsert, [1, 2, 3, 4, valueToInsert])
  })
}

describe('push', () => {
  createSuite(false)
  createSuite(true)
})
