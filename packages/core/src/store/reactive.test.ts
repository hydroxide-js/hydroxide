import { createReactive } from '../apis/createReactive'
import { Store } from '../types/store'

test('reactive slice of object is memoized', () => {
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

test.skip('reactive slice of array is not memoized', () => {
  const user = createReactive([1, 2, 3])
  expect(user.$(0)).not.toBe(user.$(0))
})

test.skip('primitive store structure', () => {
  const count = createReactive(0)

  expect(count._).toEqual({
    isDirty: false,
    ignore: false,
    store: {
      context: null,
      slices: {},
      value: 0,
      subs: {},
      dirty: {}
    },
    path: []
  })
})

test.skip('Object store underscore', () => {
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

  const expectedStore: Store = {
    context: null,
    value: userValue,
    subs: {},
    dirty: {},
    slices: {
      name: name,
      'name/first': firstName
    }
  }

  expect(user._).toEqual({
    isDirty: false,
    ignore: false,
    store: expectedStore,
    path: []
  })

  expect(name._).toEqual({
    isDirty: false,
    ignore: false,
    store: expectedStore,
    path: ['name']
  })

  expect(firstName._).toEqual({
    isDirty: false,
    ignore: false,
    store: expectedStore,
    path: ['name', 'first']
  })
})

// test.only('Reactive.is', async () => {
//   const count = createReactive(0)
//   const when10 = count.is(10, 'ten', 'not-ten')

//   expect(count._.selectorSubs!.get(10)!.length).toBe(1)

//   // expect correct initial value
//   expect(when10.value).toBe('not-ten')

//   const selectorFn = jest.fn()
//   when10.subscribe(selectorFn, false)

//   // count changed but not 10
//   count.value = 5
//   await flush()

//   // selectorFn not called
//   expect(selectorFn).toHaveBeenCalledTimes(0)
//   expect(when10.value).toBe('not-ten')

//   // count changed to 10
//   count.value = 10
//   await flush()

//   // selectorFn called
//   expect(when10.value).toBe('ten')
//   expect(selectorFn).toHaveBeenCalledTimes(1)

//   // count changed to something else
//   count.value = 20
//   await flush()

//   // selectorFn called
//   expect(when10.value).toBe('not-ten')
//   expect(selectorFn).toHaveBeenCalledTimes(2)

//   // count changed to something else
//   count.value = 30
//   await flush()

//   // selectorFn not called
//   expect(when10.value).toBe('not-ten')
//   expect(selectorFn).toHaveBeenCalledTimes(2)
// })
