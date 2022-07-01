import { batch, reactive } from '../src/index'

test('primitive', () => {
  const count = reactive(10)
  expect(count()).toBe(10)
  count.set(20)
  expect(count()).toBe(20)
})

describe('immutable reactive', () => {
  test('shallow set', () => {
    const initialUserValue = {
      username: 'Bret',
      address: {
        street: 'Kulas Light',
        city: 'Gwenborough',
        zipcode: '92998-3874'
      }
    }

    const user = reactive(initialUserValue)
    user.mutable = false

    expect(user()).toBe(initialUserValue)

    user.$('username').set('Ervin')

    expect(user().username).toBe('Ervin')

    // object is not mutated, but assigned a new value
    expect(user()).not.toBe(initialUserValue)
    // user.address remains same
    expect(user().address).toBe(initialUserValue.address)
    // user.username is updated
    expect(user().username).toBe('Ervin')
    // test the entire value
    expect(user()).toEqual({
      ...initialUserValue,
      username: 'Ervin'
    })
  })

  test('deep set', () => {
    const initialUserValue = {
      username: 'Bret',
      address: {
        street: 'Kulas Light',
        city: 'Gwenborough',
        zipcode: '92998-3874'
      }
    }

    const user = reactive(initialUserValue)
    user.mutable = false

    expect(user()).toBe(initialUserValue)

    user.$('address', 'street').set('Victor Plains')

    // object is not mutated, but assigned a new value
    expect(user()).not.toBe(initialUserValue)
    // user.address is not mutated, but assigned a new value
    expect(user().address).not.toBe(initialUserValue.address)
    // user.username remains same
    expect(user().username).toBe(initialUserValue.username)

    // check entire value
    expect(user()).toEqual({
      ...initialUserValue,
      address: {
        ...initialUserValue.address,
        street: 'Victor Plains'
      }
    })
  })

  test.only('batching optimization', () => {
    const user = reactive({
      name: 'Charlie',
      age: 25
    })

    user.mutable = false

    batch(() => {
      const initValue = user()
      // update the reactive
      user.$('name').set('Critical')

      // expect mutation
      const v1 = user()
      expect(v1).not.toBe(initValue)
      expect(v1.name).toBe('Critical')

      // update reactive again, but expect no mutation since the reactive is already cloned once in this batch
      user.$('age').perform((v) => v + 1)
      const v2 = user()
      expect(v2).toBe(v1)
      expect(v2.age).toBe(26)
    })
  })
})

describe('mutable reactive', () => {
  test('shallow set', () => {
    const initialUserValue = {
      username: 'Bret',
      address: {
        street: 'Kulas Light',
        city: 'Gwenborough',
        zipcode: '92998-3874'
      }
    }

    const user = reactive(initialUserValue)

    expect(user()).toBe(initialUserValue)

    user.$('username').set('Ervin')

    // object is mutated
    expect(user()).toBe(initialUserValue)
    expect(user().username).toBe('Ervin')
  })

  test('deep set', () => {
    const initialUserValue = {
      username: 'Bret',
      address: {
        street: 'Kulas Light',
        city: 'Gwenborough',
        zipcode: '92998-3874'
      }
    }

    const user = reactive(initialUserValue)

    expect(user()).toBe(initialUserValue)

    user.$('address', 'street').set('Victor Plains')

    // object is mutated
    expect(user()).toBe(initialUserValue)
    expect(user().address.street).toBe('Victor Plains')
  })
})
