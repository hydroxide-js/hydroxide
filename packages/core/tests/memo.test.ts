import { memo, reactive } from '../src'

test('memo value is always correct', () => {
  const count = reactive(10)
  const double = memo(() => count() * 2)

  // expect correct initival value
  expect(double()).toBe(20)

  // update dependency and expect the memo to be updated when accessed
  count.set(100)
  expect(double()).toBe(200)

  count.set(200)
  expect(double()).toBe(400)
})

test('memo value is only memo only when needed on demand', () => {
  const count = reactive(10)
  const computeFn = jest.fn(() => count() * 2)
  const double = memo(computeFn)

  // initial value calculated
  expect(computeFn).toHaveBeenCalledTimes(1)

  // use the value multiple times, but expect value to not be calculated again
  expect(double()).toBe(20)
  expect(double()).toBe(20)
  expect(double()).toBe(20)

  // update dependency
  count.set(20)

  expect(computeFn).toHaveBeenCalledTimes(1)

  // access the value and it should be correct
  expect(double()).toBe(40)
  expect(computeFn).toHaveBeenCalledTimes(2)

  // while it's dep is still in "inlivadated state"
  expect(double()).toBe(40) // use the value multiple times
  expect(double()).toBe(40) // use the value multiple times
  expect(double()).toBe(40) // use the value multiple times

  // expect no recalculation - because no "further" invalidations were done in count
  expect(computeFn).toHaveBeenCalledTimes(2)

  // again update dep
  count.set(30)

  expect(double()).toBe(60) // correct value
  // calculated
  expect(computeFn).toHaveBeenCalledTimes(3)

  // while it's dep is still in "inlivadated state"
  expect(double()).toBe(60) // use the value multiple times
  expect(double()).toBe(60) // use the value multiple times
  expect(double()).toBe(60) // use the value multiple times

  // not calculated again
  expect(computeFn).toHaveBeenCalledTimes(3)
})

describe('dependencies are correct', () => {
  test('static deps', () => {
    const foo = reactive(10)
    const bar = reactive(20)
    const sum = memo(() => foo() + bar())

    expect(sum()).toBe(30)
    expect(sum.deps).toEqual(new Set([foo, bar]))
  })

  test('dynamic deps', () => {
    const foo = reactive(10)
    const bar = reactive(20)

    // when foo is 0, deps are foo and bar
    // else deps is only foo
    const sum = memo(() => (foo() === 0 ? bar() : 100))

    expect(sum.deps).toEqual(new Set([foo]))

    foo.set(0)
    // access the value to trigger dep refresh
    expect(sum()).toBe(bar())

    // now that foo is 0, deps is foo and bar
    expect(sum.deps).toEqual(new Set([foo, bar]))

    // now change the foo again
    foo.set(10)

    // access the value to trigger dep refresh
    expect(sum()).toBe(100)

    // now that foo is not 0, deps is only foo
    expect(sum.deps).toEqual(new Set([foo]))
  })
})

test("when memo state is used when detection is enabled, it pushes memo's deps", () => {
  const foo = reactive(1)
  const bar = reactive(2)
  const bazz = reactive(3)

  const sum = memo(() => foo() + bar())
  const sum2 = memo(() => sum() + bazz())
  const sum3 = memo(() => sum() + foo() + bar())

  expect(sum2.deps).toEqual(new Set([foo, bar, bazz]))
  expect(sum3.deps).toEqual(new Set([foo, bar]))
})
