import { computed } from '../src/store/computed'
import { flush } from '../src/store/flush'
import { createReactive } from '../src/store/reactive'

test('single dependency', async () => {
  const count = createReactive(1)
  const double = computed(() => count.val * 2)

  expect(count.val).toBe(1)
  expect(double.val).toBe(2)

  count.val = 10

  await flush()
  expect(double.val).toBe(20)

  count.val = 20

  await flush()
  expect(double.val).toBe(40)
})

test('multiple dependencies', async () => {
  const a = createReactive(1)
  const b = createReactive(2)

  const addition = computed(() => a.val + b.val)

  expect(addition.val).toBe(1 + 2)

  a.val = 10
  await flush()
  expect(addition.val).toBe(10 + 2)

  b.val = 10
  await flush()
  expect(addition.val).toBe(10 + 10)
})
