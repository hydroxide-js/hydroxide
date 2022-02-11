import { flush } from '../src/store/flush'
import { createReactive } from '../src/store/reactive'
import { cloneReactive } from '../src/utils/cloneReactive'

test('cloneReactive', async () => {
  const reactive = createReactive(1)
  const clone = cloneReactive(reactive)

  expect(reactive.val).toBe(1)
  expect(clone.val).toBe(1)

  reactive.val = 2

  await flush()
  expect(reactive.val).toBe(2)
  expect(clone.val).toBe(2)
})
