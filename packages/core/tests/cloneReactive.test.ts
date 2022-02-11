import { flush } from '../src/store/flush'
import { createReactive } from '../src/store/reactive'
import { cloneReactive } from '../src/utils/cloneReactive'

test('cloneReactive', async () => {
  const reactive = createReactive(1)
  const clone = cloneReactive(reactive)

  expect(reactive.value).toBe(1)
  expect(clone.value).toBe(1)

  reactive.value = 2

  await flush()
  expect(reactive.value).toBe(2)
  expect(clone.value).toBe(2)
})
