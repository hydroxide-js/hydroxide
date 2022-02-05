import { createReactive } from '../src/store/reactive'
import { trackReactiveUsage } from '../src/store/tracker'

test('works', () => {
  const a = createReactive(10)
  const b = createReactive(20)

  function foo() {
    return a.val + b.val
  }

  const reactivesUsed = trackReactiveUsage(foo)

  expect(reactivesUsed).toEqual(new Set([a, b]))
})
