import { nestedNumbers, numbers } from '../testingData'

function shallowSwapTest(
  mutable: boolean,
  i: number,
  j: number,
  expectedValue: number[]
) {
  const [arr, is] = numbers(mutable)

  // value
  arr.swap(i, j)
  expect(arr()).toEqual(expectedValue)

  // mutation
  if (mutable) is.mutated()
  else is.notMutated()
}

function deepSwapTest(mutable: boolean, i: number, j: number, expectedValue: number[]) {
  const [state, is] = nestedNumbers(mutable)

  // value
  state('foo', 'bar', 'arr').swap(i, j)
  expect(state().foo.bar.arr).toEqual(expectedValue)

  // mutation
  if (mutable) is.mutated()
  else is.notMutated()
}

describe('mutable', () => {
  test('shallow swap', () => {
    shallowSwapTest(true, 0, 1, [2, 1, 3, 4])
  })

  test('deep swap', () => {
    deepSwapTest(true, 0, 1, [2, 1, 3, 4])
  })
})

describe('immutable', () => {
  test('shallow swap', () => {
    shallowSwapTest(false, 0, 1, [2, 1, 3, 4])
  })

  test('deep swap', () => {
    deepSwapTest(false, 0, 1, [2, 1, 3, 4])
  })
})
