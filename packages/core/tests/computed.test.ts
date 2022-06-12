import { $ } from '../src/reactive/$/$'
import { computed } from '../src/reactive/computed'
import { reactive } from '../src/reactive/reactive'

test("computed state's value is always correct", () => {
  const count = reactive(10)
  const double = computed(() => count() * 2)

  expect(double()).toBe(20)

  $(count).set(100)
  expect(double()).toBe(200)

  $(count).set(200)
  expect(double()).toBe(400)
})

test("computed state's value is only computed only when needed on demand", () => {
  const count = reactive(10)

  const computeFn = jest.fn(() => count() * 2)

  const double = computed(computeFn)

  // initial value calculated
  expect(computeFn).toHaveBeenCalledTimes(1)

  // use the value multiple times
  expect(double()).toBe(20)
  expect(double()).toBe(20)
  expect(double()).toBe(20)
  // expect that value is not calculated again
  expect(computeFn).toHaveBeenCalledTimes(1)

  // update dependency once more
  $(count).set(20)

  expect(computeFn).toHaveBeenCalledTimes(1)
  // not calculated until accessed
  // but if not accessed at all, it will be calculated during computed phase

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
  $(count).set(30)

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
    const sum = computed(() => foo() + bar())

    expect(sum()).toBe(30)
    expect(sum.deps).toEqual([
      [foo, []],
      [bar, []]
    ])
  })

  test('dynamic deps', () => {
    const foo = reactive(10)
    const bar = reactive(20)

    // when foo is 0, deps are foo and bar
    // else deps is only foo
    const sum = computed(() => (foo() === 0 ? bar() : 100))

    expect(sum.deps).toEqual([[foo, []]])

    $(foo).set(0)
    // access the value to trigger dep refresh
    expect(sum()).toBe(bar())

    // now that foo is 0, deps is foo and bar
    expect(sum.deps).toEqual([
      [foo, []],
      [bar, []]
    ])

    // now change the foo again
    $(foo).set(10)

    // access the value to trigger dep refresh
    expect(sum()).toBe(100)

    // now that foo is not 0, deps is only foo
    expect(sum.deps).toEqual([[foo, []]])
  })
})

test("when computed state is used when detection is enabled, it pushes computed's deps", () => {
  const foo = reactive(1)
  const bar = reactive(2)
  const bazz = reactive(3)
  const sum = computed(() => foo() + bar())

  const sum2 = computed(() => sum() + bazz())

  // sums's and bazz's depenencies are detected
  expect(sum2.deps).toEqual([
    [foo, []],
    [bar, []],
    [bazz, []]
  ])

  const sum3 = computed(() => sum() + foo() + bar())

  // no duplicate deps
  expect(sum3.deps).toEqual([
    [foo, []],
    [bar, []]
  ])
})
