import { memo, reactive } from '../src'

test('memo value is always correct', () => {
  const count = reactive(10)
  const double = memo(() => count() * 2)

  // initial value
  expect(double()).toBe(20)

  count.set(100)
  expect(double()).toBe(200)

  count.set(200)
  expect(double()).toBe(400)
})

test('memo is updated when dependencies are updated', () => {
  const count = reactive(10)
  const computeFn = jest.fn(() => count() * 2)
  const double = memo(computeFn)

  // initial value calculated
  expect(computeFn).toHaveBeenCalledTimes(1)

  // use the value multiple times, but expect value to not be calculated again
  expect(double()).toBe(20)
  expect(double()).toBe(20)
  expect(double()).toBe(20)

  expect(computeFn).toHaveBeenCalledTimes(1)

  // update dependency
  count.set(20)

  // recalculated
  expect(computeFn).toHaveBeenCalledTimes(2)

  // use the value multiple times, but expect value to not be calculated again

  expect(double()).toBe(40)
  expect(double()).toBe(40)
  expect(double()).toBe(40)
  expect(computeFn).toHaveBeenCalledTimes(2)
})
