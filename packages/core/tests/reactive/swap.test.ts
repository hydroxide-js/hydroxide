import { nestedNumbers, numbers } from '../testingData'

function shallowSwapTest(i: number, j: number, expectedValue: number[]) {
  const [arr, is] = numbers()

  // value
  arr.swap(i, j)
  expect(arr()).toEqual(expectedValue)

  // mutation
  is.notMutated()
}

function deepSwapTest(i: number, j: number, expectedValue: number[]) {
  const [state, is] = nestedNumbers()

  // value
  state('foo', 'bar', 'arr').swap(i, j)
  expect(state().foo.bar.arr).toEqual(expectedValue)

  // mutation
  is.notMutated()
}

describe('swap', () => {
  test('shallow swap', () => {
    shallowSwapTest(0, 1, [2, 1, 3, 4])
  })

  test('deep swap', () => {
    deepSwapTest(0, 1, [2, 1, 3, 4])
  })
})
