import {
  CONNECTION_PHASE,
  DATA_PHASE,
  effect,
  LIST_PHASE,
  Phase,
  Reactive,
  reactive,
  RENDER_PHASE
} from '../src/index'
import { inContext } from './utils/inContext'

const update = (state: Reactive<number>) => state.do(v => v + 1)

describe('initialization: user effects vs others', () => {
  describe('user effects', () => {
    test('initialized AFTER the context is connected', () => {
      const count = reactive(0)

      // define effect in a context that uses count
      const fn = jest.fn(() => count())
      const context = inContext(() => effect(fn))

      // effect is not initialized immediately
      expect(fn).toHaveBeenCalledTimes(0)

      // effect is initialized when the context is connected
      context.onConnect!.forEach(cb => cb())
      expect(fn).toHaveBeenCalledTimes(1)
    })

    test('initialized immediately if defined outside of context', () => {
      const count = reactive(0)
      const fn = jest.fn(() => count())

      // effect created outside of any context
      effect(fn)
      // effect is initialized immediately
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })

  test('data, list, connection and render effects are always initialized immediately', () => {
    function expectImmediateInit(phase: Phase) {
      const count = reactive(0)

      // create effect in context
      const fn = jest.fn(() => count())
      inContext(() => effect(fn, phase))

      // effect is initialized immediately
      expect(fn).toHaveBeenCalledTimes(1)
    }

    expectImmediateInit(DATA_PHASE)
    expectImmediateInit(LIST_PHASE)
    expectImmediateInit(CONNECTION_PHASE)
    expectImmediateInit(RENDER_PHASE)
  })
})

describe('dependency', () => {
  test('single dep', () => {
    const count = reactive(0)
    const fn = jest.fn(() => count())

    // effect init
    effect(fn)
    expect(fn).toHaveBeenCalledTimes(1)

    // effect is called when dep is updated
    update(count)
    expect(fn).toHaveBeenCalledTimes(2)
  })

  test('multiple static dependencies', () => {
    const a = reactive(0)
    const b = reactive(0)
    const fn = jest.fn(() => a() + b())

    // effect init
    effect(fn)
    expect(fn).toHaveBeenCalledTimes(1)

    // effect is called when any dep is updated
    update(a)
    expect(fn).toHaveBeenCalledTimes(2)

    update(b)
    expect(fn).toHaveBeenCalledTimes(3)
  })

  test('dynamic deps', () => {
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

    let calls = 0
    const expectCall = () => expect(fn).toHaveBeenCalledTimes(++calls)
    const expectNoCall = () => expect(fn).toHaveBeenCalledTimes(calls)

    // init
    effect(fn)
    expectCall()

    // deps: [use, foo, bar]

    update(foo)
    expectCall()

    update(bar)
    expectCall()

    use.set('foo')
    expectCall()

    // deps: [use, foo]

    update(bar)
    expectNoCall()

    update(foo)
    expectCall()

    use.set('bar')
    expectCall()

    // deps:[ use, bar]

    update(foo)
    expectNoCall()

    update(bar)
    expectCall()
  })
})
