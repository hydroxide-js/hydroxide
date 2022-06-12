import { $ } from '../$/$'
import { reactive } from '../reactive'

test('shallow set', () => {
  const count = reactive(0)
  expect(count.invalidations).toEqual([])

  $(count).set(10)
  expect(count.invalidations).toEqual([{ type: 'set', path: [], value: 10 }])

  $(count).set(20)
  expect(count.invalidations).toEqual([
    { type: 'set', path: [], value: 10 },
    { type: 'set', path: [], value: 20 }
  ])
})

test('deep set', () => {
  const user = reactive({ name: { first: 'Ben', last: 'Smith' } })
  expect(user.invalidations).toEqual([])

  const newName = { first: 'Jerry', last: 'Smith' }
  const newUser = {
    name: {
      first: 'Foo',
      last: 'bar'
    }
  }

  const Invalidation1 = { type: 'set', path: ['name'], value: newName }
  const Invalidation2 = { type: 'set', path: ['name', 'first'], value: 'Jeff' }
  const Invalidation3 = { type: 'set', path: [], value: newUser }

  $(user, ['name']).set(newName)
  expect(user.invalidations).toEqual([Invalidation1])

  $(user, ['name', 'first']).set('Jeff')

  expect(user.invalidations).toEqual([Invalidation1, Invalidation2])

  $(user).set(newUser)
  expect(user.invalidations).toEqual([
    Invalidation1,
    Invalidation2,
    Invalidation3
  ])
})
