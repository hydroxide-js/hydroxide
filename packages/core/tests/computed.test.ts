import { flush } from '../src/hooks/flush'
import { computed } from '../src/store/computed'
import { createReactive } from '../src/store/reactive'

test('single dependency', async () => {
  const count = createReactive(1)
  const double = computed(() => count.value * 2)

  expect(count.value).toBe(1)
  expect(double.value).toBe(2)

  count.value = 10

  await flush()
  expect(double.value).toBe(20)

  count.value = 20

  await flush()
  expect(double.value).toBe(40)
})

test('multiple dependencies', async () => {
  const a = createReactive(1)
  const b = createReactive(2)

  const addition = computed(() => a.value + b.value)

  expect(addition.value).toBe(1 + 2)

  a.value = 10
  await flush()
  expect(addition.value).toBe(10 + 2)

  b.value = 10
  await flush()
  expect(addition.value).toBe(10 + 10)
})
