import { createEffect } from '../src/store/createEffect'
import { flush } from '../src/store/flush'
import { createReactive } from '../src/store/reactive'

test('static dependencies', async () => {
  const a = createReactive(0)
  const b = createReactive(0)

  const effect = jest.fn(() => {
    return a.val + b.val
  })

  createEffect(effect)

  // effect is called directly
  expect(effect).toHaveBeenCalledTimes(1)

  // one of the deps updated, expect effect to be called once
  a.val = 10
  await flush()

  expect(effect).toHaveBeenCalledTimes(2)

  // multiple dependencies updated, expect effect to be called once
  a.val = 10
  b.val = 20
  await flush()

  expect(effect).toHaveBeenCalledTimes(3)
})

test('dependencies are updated each time the effect is called', async () => {
  const a = createReactive(10)
  const b = createReactive(0)

  // if dependencies are static, effect will only detect the use of a when it is non-zero
  // it won't be able to detect that b is also being used
  const effect = jest.fn(() => {
    if (a.val !== 0) {
      return a.val
    } else {
      return b.val
    }
  })

  createEffect(effect)

  expect(effect).toHaveBeenCalledTimes(1)
  a.val = 0 // now that a is zero, b can be detected

  await flush()
  expect(effect).toHaveBeenCalledTimes(2)

  b.val = 100
  await flush()
  expect(effect).toHaveBeenCalledTimes(3)
})
