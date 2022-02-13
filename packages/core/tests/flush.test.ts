import { flush } from '../src/hooks/flush'
import { isFlushed } from '../src/scheduler/flushInfo'
import { createReactive } from '../src/store/reactive'

test('primitive reactive', async () => {
  const count = createReactive(0)

  const fn1 = jest.fn()
  const fn2 = jest.fn()

  count.subscribe(fn1, false)
  count.subscribe(fn2, false)

  count.value = 10

  await flush()

  // after the flush dirty object is reset
  expect(count._.store.dirty).toEqual({})

  // dependencies are called
  expect(fn1).toHaveBeenCalledTimes(1)
  expect(fn2).toHaveBeenCalledTimes(1)

  count.value = 20

  // check again
  await flush()

  // after the flush dirty object is reset
  expect(count._.store.dirty).toEqual({})

  // dependencies are called
  expect(fn1).toHaveBeenCalledTimes(2)
  expect(fn2).toHaveBeenCalledTimes(2)
})

test('array', async () => {
  const numbers = createReactive([1, 2, 3])

  const fn = jest.fn()
  numbers.$(0).subscribe(fn, false)

  numbers.$(0).value = 10

  await flush()

  expect(fn).toHaveBeenCalledTimes(1)
})

test('flush() returns same promise in a flush', async () => {
  const p1 = flush()
  const p2 = flush()

  expect(p1).toBe(p2)

  setTimeout(isFlushed)

  await flush()

  const p3 = flush()
  const p4 = flush()

  expect(p3).toBe(p4)
  expect(p1).not.toBe(p3)
})
