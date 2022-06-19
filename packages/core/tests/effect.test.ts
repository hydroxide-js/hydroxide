import { effect, reactive } from '../src/index'
import { EffectInfo } from '../src/types'
import { inConext } from './utils/inContext'

const increment = (n: number) => n + 1

test('effect with single static non-local dependency', () => {
  const count = reactive(0)
  const fn = jest.fn(() => {
    return count()
  })

  let effectInfo: EffectInfo

  // non local depenedency in effect
  const context = inConext(() => {
    effectInfo = effect(fn)
  })

  // effect callback is not called before the context is connected
  expect(fn).toHaveBeenCalledTimes(0)

  // expect that only the effect creation task is added
  expect(context.onConnect!.length).toBe(1)

  // now connect the context
  context.onConnect!.forEach((cb) => cb())

  // expect the effect to run once
  expect(fn).toHaveBeenCalledTimes(1)

  // expect the proper deps
  expect(effectInfo!.deps).toEqual(new Set([count]))

  // update it's deps
  count.perform(increment)

  // expect effect to be called again
  expect(fn).toHaveBeenCalledTimes(2)
})

test('effect with multiple static non-local dependencies', () => {
  const a = reactive(0)
  const b = reactive(0)
  const fn = jest.fn(() => {
    return a() + b()
  })

  const context = inConext(() => {
    effect(fn)
  })

  // effect callback is not called before the context is created
  expect(fn).toHaveBeenCalledTimes(0)

  // connect context
  context.onConnect!.forEach((cb) => cb())

  // expect the effect to run once
  expect(fn).toHaveBeenCalledTimes(1)

  // update dep and expect effect to run
  a.perform(increment)
  expect(fn).toHaveBeenCalledTimes(2)

  b.perform(increment)
  expect(fn).toHaveBeenCalledTimes(3)

  b.perform(increment)
  expect(fn).toHaveBeenCalledTimes(4)
})

test('effect with dynamic non-local deps', () => {
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

  let info: EffectInfo
  const context = inConext(() => {
    info = effect(fn)
  })

  // effect callback is not called before the context is connected
  expect(fn).toHaveBeenCalledTimes(0)

  // connect context
  context.onConnect!.forEach((cb) => cb())

  // effect is called and correct deps are detected
  expect(fn).toHaveBeenCalledTimes(1)
  expect(info!.deps).toEqual(new Set([use, foo, bar]))

  // change one of the dependency and expect the fn to be called, deps remain same
  foo.perform(increment)
  expect(fn).toHaveBeenCalledTimes(2)
  expect(info!.deps).toEqual(new Set([use, foo, bar]))

  // remove one of deps
  // set use to foo so that next time bar is not a depenedency any more
  use.set('foo')
  expect(fn).toHaveBeenCalledTimes(3)
  expect(info!.deps).toEqual(new Set([use, foo]))

  // update removed dep
  // now change bar and expect the fn not to be called again, and deps remain same
  bar.perform(increment)
  expect(fn).toHaveBeenCalledTimes(3)
  expect(info!.deps).toEqual(new Set([use, foo]))

  // add dep and remove dep
  // set use to bar so that next time foo is not a depenedency any more
  use.set('bar')
  expect(fn).toHaveBeenCalledTimes(4)
  expect(info!.deps).toEqual(new Set([use, bar]))

  // update removed dep
  foo.perform(increment)
  expect(fn).toHaveBeenCalledTimes(4)
  expect(info!.deps).toEqual(new Set([use, bar]))
})
