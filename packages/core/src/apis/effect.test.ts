import { flush } from '../hooks/flush'
import { setupContext } from '../test-utils/setupContext'
import { createReactive } from './createReactive'
import { effect } from './effect'

describe('Outside context', () => {
  test('Static deps', async () => {
    const a = createReactive(0)
    const b = createReactive(0)

    // deps: [a, b]
    const fn = jest.fn(() => a.value + b.value)

    let runCount = 0
    function expectRun() {
      runCount++
      expect(fn).toHaveBeenCalledTimes(runCount)
    }

    const deps = effect(fn)

    // effect is called immediately
    expectRun()
    expect(deps).toEqual(new Set([a, b]))

    a.value = 10
    await flush()
    expectRun()

    a.value = 10
    b.value = 20
    await flush()
    expectRun()
  })

  test('Dynamic deps', async () => {
    const a = createReactive(5)
    const b = createReactive(10)

    const depsAB = new Set([a, b])
    const depsA = new Set([a])

    // deps: [a] - when a >= 0
    // deps: [a,b] - when a < 0
    const fn = jest.fn(() => {
      if (a.value >= 0) {
        return a.value
      } else {
        return b.value
      }
    })

    let callsCount = 0
    function expectRun() {
      callsCount++
      expect(fn).toHaveBeenCalledTimes(callsCount)
    }

    function expectNoRun() {
      expect(fn).toHaveBeenCalledTimes(callsCount)
    }

    // define effect and expect it to run immediately
    const deps = effect(fn)
    expectRun()
    expect(deps).toEqual(depsA)

    // deps: [a]
    a.value++
    await flush()
    expectRun()
    expect(deps).toEqual(depsA)

    // deps: [a]
    b.value++
    await flush()
    expectNoRun()
    expect(deps).toEqual(depsA)

    // deps: [a]
    a.value = -5
    await flush()
    expectRun()
    expect(deps).toEqual(depsAB)

    // deps: [a,b]
    b.value++
    await flush()
    expectRun()
    expect(deps).toEqual(depsAB)

    // deps: [a, b]
    a.value = 10
    await flush()
    expectRun()
    expect(deps).toEqual(depsA)

    // deps: [a]
    b.value++
    await flush()
    expectNoRun()
    expect(deps).toEqual(depsA)
  })

  test('Dynamic deps: refreshDeps: false', async () => {
    const a = createReactive(5)
    const b = createReactive(10)

    const depsA = new Set([a])

    // deps: [a] - always
    const fn = jest.fn(() => {
      if (a.value >= 0) {
        return a.value
      } else {
        return b.value
      }
    })

    let callsCount = 0
    function expectRun() {
      callsCount++
      expect(fn).toHaveBeenCalledTimes(callsCount)
    }

    function expectNoRun() {
      expect(fn).toHaveBeenCalledTimes(callsCount)
    }

    // define effect and expect it to run immediately
    const deps = effect(fn, false)
    expect(deps).toEqual(depsA)
    expectRun()

    // deps: [a]
    a.value++
    await flush()
    expect(deps).toEqual(depsA)
    expectRun()

    // deps: [a]
    b.value++
    await flush()
    expect(deps).toEqual(depsA)
    expectNoRun()

    // deps: [a]
    a.value = -5
    await flush()
    expect(deps).toEqual(depsA)
    expectRun()

    // deps: [a]
    b.value++
    await flush()
    expect(deps).toEqual(depsA)
    expectNoRun()

    // deps: [a]
    a.value = 10
    await flush()
    expect(deps).toEqual(depsA)
    expectRun()

    // deps: [a]
    b.value++
    await flush()
    expect(deps).toEqual(depsA)
    expectNoRun()
  })
})

describe('Inside context', () => {
  test('Static deps', async () => {
    const { set, unset } = setupContext()

    set()
    const a = createReactive(0)
    const b = createReactive(0)

    // deps: [a, b]
    const fn = jest.fn(() => a.value + b.value)

    let runCount = 0
    function expectRun() {
      runCount++
      expect(fn).toHaveBeenCalledTimes(runCount)
    }

    const deps = effect(fn)

    // effect is called immediately
    expectRun()
    expect(deps).toEqual(new Set([a, b]))

    a.value = 10
    await flush()
    expectRun()

    a.value = 10
    b.value = 20
    await flush()
    expectRun()

    unset()
  })

  test('Dynamic deps', async () => {
    const a = createReactive(5)
    const b = createReactive(10)

    const depsAB = new Set([a, b])
    const depsA = new Set([a])

    // deps: [a] - when a >= 0
    // deps: [a,b] - when a < 0
    const fn = jest.fn(() => {
      if (a.value >= 0) {
        return a.value
      } else {
        return b.value
      }
    })

    let callsCount = 0
    function expectRun() {
      callsCount++
      expect(fn).toHaveBeenCalledTimes(callsCount)
    }

    function expectNoRun() {
      expect(fn).toHaveBeenCalledTimes(callsCount)
    }

    // define effect and expect it to run immediately
    const deps = effect(fn)
    expectRun()
    expect(deps).toEqual(depsA)

    // deps: [a]
    a.value++
    await flush()
    expectRun()
    expect(deps).toEqual(depsA)

    // deps: [a]
    b.value++
    await flush()
    expectNoRun()
    expect(deps).toEqual(depsA)

    // deps: [a]
    a.value = -5
    await flush()
    expectRun()
    expect(deps).toEqual(depsAB)

    // deps: [a,b]
    b.value++
    await flush()
    expectRun()
    expect(deps).toEqual(depsAB)

    // deps: [a, b]
    a.value = 10
    await flush()
    expectRun()
    expect(deps).toEqual(depsA)

    // deps: [a]
    b.value++
    await flush()
    expectNoRun()
    expect(deps).toEqual(depsA)
  })

  test('Dynamic deps: refreshDeps: false', async () => {
    const a = createReactive(5)
    const b = createReactive(10)

    const depsA = new Set([a])

    // deps: [a] - always
    const fn = jest.fn(() => {
      if (a.value >= 0) {
        return a.value
      } else {
        return b.value
      }
    })

    let callsCount = 0
    function expectRun() {
      callsCount++
      expect(fn).toHaveBeenCalledTimes(callsCount)
    }

    function expectNoRun() {
      expect(fn).toHaveBeenCalledTimes(callsCount)
    }

    // define effect and expect it to run immediately
    const deps = effect(fn, false)
    expect(deps).toEqual(depsA)
    expectRun()

    // deps: [a]
    a.value++
    await flush()
    expect(deps).toEqual(depsA)
    expectRun()

    // deps: [a]
    b.value++
    await flush()
    expect(deps).toEqual(depsA)
    expectNoRun()

    // deps: [a]
    a.value = -5
    await flush()
    expect(deps).toEqual(depsA)
    expectRun()

    // deps: [a]
    b.value++
    await flush()
    expect(deps).toEqual(depsA)
    expectNoRun()

    // deps: [a]
    a.value = 10
    await flush()
    expect(deps).toEqual(depsA)
    expectRun()

    // deps: [a]
    b.value++
    await flush()
    expect(deps).toEqual(depsA)
    expectNoRun()
  })
})
