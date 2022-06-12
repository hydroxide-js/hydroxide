import { $ } from '../$/$'
import { effect } from '../effect'
import { reactive } from '../reactive'
import { flush } from '../scheduler'

const increment = (n: number) => n + 1

test('effect with single static dependency', async () => {
  const count = reactive(0)
  const fn = jest.fn(() => {
    count()
  })

  effect(fn)

  // creating an effect will schedule a flush
  await flush()

  // after the flush, expect the fn to be called 1 time for intial detection of dependencies
  expect(fn).toHaveBeenCalledTimes(1)

  // now update one of its dependencies
  $(count).set(increment)
  await flush()
  // expect effect to be called again
  expect(fn).toHaveBeenCalledTimes(2)
})

test('effect with multiple static dependencies', async () => {
  const a = reactive(0)
  const b = reactive(0)
  const fn = jest.fn(() => {
    return a() + b()
  })

  effect(fn)

  await flush()

  expect(fn).toHaveBeenCalledTimes(1)

  $(a).set(increment)
  await flush()
  expect(fn).toHaveBeenCalledTimes(2)

  $(b).set(increment)
  await flush()
  expect(fn).toHaveBeenCalledTimes(3)

  $(b).set(increment)
  await flush()
  expect(fn).toHaveBeenCalledTimes(4)
})

test('effectFn with dynamic deps', async () => {
  const foo = reactive(10)
  const bar = reactive(20)
  const use = reactive('both')

  const fn = jest.fn(() => {
    if (use() === 'both') {
      return foo() + bar()
    } else if (use() === 'foo') {
      return foo()
    } else if (use() === 'bar') {
      return bar()
    }

    return 0
  })

  const info = effect(fn)

  await flush()

  // initial call and deps
  expect(fn).toHaveBeenCalledTimes(1)
  expect(info.deps).toEqual([
    [use, []],
    [foo, []],
    [bar, []]
  ])

  // change one of the dependency and expect the fn to be called, deps remain same
  $(foo).set(increment)
  await flush()
  expect(fn).toHaveBeenCalledTimes(2)
  expect(info.deps).toEqual([
    [use, []],
    [foo, []],
    [bar, []]
  ])

  // set use to foo so that next time bar is not a depenedency any more
  $(use).set('foo')
  await flush()
  expect(fn).toHaveBeenCalledTimes(3)
  expect(info.deps.length).toBe(2)
  expect(info.deps).toEqual([
    [use, []],
    [foo, []]
    // bar removed
  ])
})
