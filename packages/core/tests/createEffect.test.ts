import { effect } from '../src/createEffect'
import { flush } from '../src/hooks/flush'
import { createReactive } from '../src/store/reactive'

test('static dependencies', async () => {
  const a = createReactive(0)
  const b = createReactive(0)

  const fn = jest.fn(() => {
    return a.value + b.value
  })

  effect(fn)

  // effect is called directly
  expect(fn).toHaveBeenCalledTimes(1)

  // one of the deps updated, expect effect to be called once
  a.value = 10
  await flush()

  expect(fn).toHaveBeenCalledTimes(2)

  // multiple dependencies updated, expect effect to be called once
  a.value = 10
  b.value = 20
  await flush()

  expect(fn).toHaveBeenCalledTimes(3)
})

test('dependencies are updated each time the effect is called', async () => {
  const a = createReactive(10)
  const b = createReactive(0)

  // if dependencies are static, effect will only detect the use of a when it is non-zero
  // it won't be able to detect that b is also being used
  const fn = jest.fn(() => {
    if (a.value !== 0) {
      return a.value
    } else {
      return b.value
    }
  })

  effect(fn)

  expect(fn).toHaveBeenCalledTimes(1)
  a.value = 0 // now that a is zero, b can be detected

  await flush()
  expect(fn).toHaveBeenCalledTimes(2)

  b.value = 100
  await flush()
  expect(fn).toHaveBeenCalledTimes(3)
})
