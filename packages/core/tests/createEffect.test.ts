import { createEffect } from '../src/createEffect'
import { flush } from '../src/hooks/flush'
import { createReactive } from '../src/store/reactive'

test('static dependencies', async () => {
  const a = createReactive(0)
  const b = createReactive(0)

  const effect = jest.fn(() => {
    return a.value + b.value
  })

  createEffect(effect)

  // effect is called directly
  expect(effect).toHaveBeenCalledTimes(1)

  // one of the deps updated, expect effect to be called once
  a.value = 10
  await flush()

  expect(effect).toHaveBeenCalledTimes(2)

  // multiple dependencies updated, expect effect to be called once
  a.value = 10
  b.value = 20
  await flush()

  expect(effect).toHaveBeenCalledTimes(3)
})

test('dependencies are updated each time the effect is called', async () => {
  const a = createReactive(10)
  const b = createReactive(0)

  // if dependencies are static, effect will only detect the use of a when it is non-zero
  // it won't be able to detect that b is also being used
  const effect = jest.fn(() => {
    if (a.value !== 0) {
      return a.value
    } else {
      return b.value
    }
  })

  createEffect(effect)

  expect(effect).toHaveBeenCalledTimes(1)
  a.value = 0 // now that a is zero, b can be detected

  await flush()
  expect(effect).toHaveBeenCalledTimes(2)

  b.value = 100
  await flush()
  expect(effect).toHaveBeenCalledTimes(3)
})
