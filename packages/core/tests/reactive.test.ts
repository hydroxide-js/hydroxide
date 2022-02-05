import { createReactive } from '../src/store/reactive'

test('reactive slices are memoized', () => {
  const user = createReactive({
    name: {
      first: 'John',
      last: 'Doe'
    },
    age: 23
  })

  expect(user.$('name')).toBe(user.$('name'))

  expect(user.$('name', 'first')).toBe(user.$('name', 'first'))
})

test('primitive store structure', () => {
  const count = createReactive(0)

  expect(count._).toEqual({
    store: {
      slices: {},
      value: 0,
      subs: {},
      dirty: {}
    },
    path: []
  })
})

test('Object store underscore', () => {
  const userValue = {
    name: {
      first: 'Manan',
      last: 'Tank'
    },
    age: 23
  }

  const user = createReactive(userValue)
  const name = user.$('name')
  const firstName = name.$('first')

  const expectedStore = {
    value: userValue,
    subs: {},
    dirty: {},
    slices: {
      name: name,
      'name/first': firstName
    }
  }

  expect(user._).toEqual({
    store: expectedStore,
    path: []
  })

  expect(name._).toEqual({
    store: expectedStore,
    path: ['name']
  })

  expect(firstName._).toEqual({
    store: expectedStore,
    path: ['name', 'first']
  })
})
