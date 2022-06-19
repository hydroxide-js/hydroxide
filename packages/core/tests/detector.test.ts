import { detect, reactive } from '../src/index'

it('detects the reactives', () => {
  const count = reactive(10)
  const user = reactive({ name: 'John', age: 20 })

  const fn = () => count() + user().age

  const [deps, returnValue] = detect(fn)

  expect(returnValue).toBe(10 + 20)
  expect(deps).toEqual(new Set([count, user]))
})

test('nested detectors also work as expected', () => {
  const user = reactive({ name: { first: 'John' } })
  const todo = reactive({ task: 'drink coffee' })
  const age = reactive(0)

  // level1
  const info = detect(() => {
    user()

    // level2
    const info2 = detect(() => {
      todo()

      // level3
      const info3 = detect(() => {
        age()
      })

      expect(info3[0]).toEqual(new Set([age]))
    })

    expect(info2[0]).toEqual(new Set([age, todo]))
  })

  expect(info[0]).toEqual(new Set([user, todo, age]))
})
