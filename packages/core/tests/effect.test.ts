import { effect, reactive } from '../src/index'
import { inContext } from './utils/inContext'
import { RENDER_PHASE, USER_EFFECT_PHASE } from 'hydroxide'

const increment = (n: number) => n + 1

describe('initialization', () => {
  test('user effects are initialized after the context is connected', () => {
    // context1
    const count = reactive(0)

    const fn = jest.fn(() => {
      return count()
    })

    const context = inContext(() => {
      effect(fn)
    })

    // effect is not initialized
    expect(fn).toHaveBeenCalledTimes(0)

    // expect that effect creation callback is added
    expect(context.onConnect!.length).toBe(1)

    // now connect the context
    context.onConnect!.forEach(cb => cb())

    // expect the effect to have been called once
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('render effects are initialized synchronously', () => {
    // context1
    const count = reactive(0)

    const fn = jest.fn(() => {
      return count()
    })

    inContext(() => {
      effect(fn, RENDER_PHASE)
    })

    // effect is initialized even though context is not connected yet
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('sync user effects are initialized synchronously', () => {
    // context1
    const count = reactive(0)

    const fn = jest.fn(() => {
      return count()
    })

    inContext(() => {
      effect(fn, USER_EFFECT_PHASE, true)
    })

    // effect is initialized even though context is not connected yet
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('effects defined outside context are initialized synchronously', () => {
    // context1
    const count = reactive(0)

    const fn = jest.fn(() => {
      return count()
    })

    effect(fn)

    // effect is initialized even though context is not connected yet
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

test('effect with single dependency', () => {
  const count = reactive(0)
  const fn = jest.fn(() => {
    return count()
  })

  // init
  effect(fn)
  expect(fn).toHaveBeenCalledTimes(1)

  // dep update
  count.do(increment)
  expect(fn).toHaveBeenCalledTimes(2)
})

test('effect with multiple static dependencies', () => {
  const a = reactive(0)
  const b = reactive(0)

  const fn = jest.fn(() => {
    return a() + b()
  })

  // init
  effect(fn)
  expect(fn).toHaveBeenCalledTimes(1)

  // update dep 1
  a.do(increment)
  expect(fn).toHaveBeenCalledTimes(2)

  // update dep 2
  b.do(increment)
  expect(fn).toHaveBeenCalledTimes(3)
})

test('effect with dynamic deps', () => {
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

  // init (current deps: use, foo, bar)
  effect(fn)
  expect(fn).toHaveBeenCalledTimes(1)

  // change foo
  foo.do(increment)
  expect(fn).toHaveBeenCalledTimes(2)

  use.set('foo')
  expect(fn).toHaveBeenCalledTimes(3)

  // deps are now: use, foo

  // update bar and expect no call to fn
  bar.do(increment)
  expect(fn).toHaveBeenCalledTimes(3)

  use.set('bar')
  expect(fn).toHaveBeenCalledTimes(4)

  // deps are now: use, foo

  // update removed dep foo and expect no call to fn
  foo.do(increment)
  expect(fn).toHaveBeenCalledTimes(4)
})
