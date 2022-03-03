import { createReactive } from '../apis/createReactive'
import { track } from './tracker'

test('works', () => {
  const a = createReactive(10)
  const b = createReactive(20)

  function foo() {
    return a.value + b.value
  }

  const reactivesUsed = track(foo)

  expect(reactivesUsed).toEqual(new Set([a, b]))
})
