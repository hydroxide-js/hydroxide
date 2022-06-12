import { detect } from '../detector'
import { reactive } from '../reactive'

it('detects the reactives and does not include duplicates and returns proper returnvalue', () => {
  const count = reactive(10)
  const user = reactive({ name: 'John', age: 20 })

  const fn = () => count() + user(['age']) + count() + user(['name']).length

  const [deps, returnValue] = detect(fn)

  expect(returnValue).toBe(10 + 20 + 10 + 'John'.length)
  expect(deps).toEqual([
    [count, []],
    [user, ['age']],
    [user, ['name']]
  ])
})

test('nested detectors also work as expected', () => {
  const user = reactive({ name: { first: 'John' } })
  const todo = reactive({ task: 'drink coffee' })
  const age = reactive(0)

  // level1
  const info = detect(() => {
    user()
    user()
    user(['name', 'first'])

    // level2
    const info2 = detect(() => {
      todo(['task'])

      // level3
      const info3 = detect(() => {
        age()
      })

      expect(info3[0]).toEqual([[age, []]])
    })

    expect(info2[0]).toEqual([
      [todo, ['task']],
      [age, []]
    ])
  })

  expect(info[0]).toEqual([
    [user, []],
    [user, ['name', 'first']],
    [todo, ['task']],
    [age, []]
  ])
})
