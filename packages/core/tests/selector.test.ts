import { effect, reactive, selector } from '../src/index'

test('initial value', () => {
  const count = reactive(0)
  const isCount = selector(count)

  expect(isCount(10)).toBe(false)
  expect(isCount(0)).toBe(true)
})

test('effects are only called when selector value changes', () => {
  const count = reactive(0)
  const isCount = selector(count)

  const fn1 = jest.fn(() => isCount(10))
  const fn2 = jest.fn(() => isCount(5))

  // 1 because effect is defined outside or a context so it is initialized immediately
  let expectedFn1Calls = 1
  let expectedFn2Calls = 1

  effect(fn1)
  effect(fn2)

  function expectCalls() {
    expect(fn1).toHaveBeenCalledTimes(expectedFn1Calls)
    expect(fn2).toHaveBeenCalledTimes(expectedFn2Calls)
  }

  // initial calls - called both 1 time
  expectCalls()

  // set to 2, expect no calls
  count.set(2)
  expectCalls()

  // set to 10, expect fn1 to be called
  count.set(10)
  expectedFn1Calls++
  expectCalls()

  // set to 11, expect fn1 to be called
  count.set(11)
  expectedFn1Calls++
  expectCalls()

  // set to 5, expect fn2 to be called
  count.set(5)
  expectedFn2Calls++
  expectCalls()

  // set to 10, expect both to be called
  count.set(10)
  expectedFn1Calls++
  expectedFn2Calls++
  expectCalls()
})
