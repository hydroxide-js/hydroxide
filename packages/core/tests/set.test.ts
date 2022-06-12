import { $ } from '../$/$'
import { reactive } from '../reactive'

test('primitive states are assigned new value', () => {
  const count = reactive(10)
  expect(count()).toBe(10)

  $(count).set(20)
  expect(count()).toBe(20)
})

describe('object states are updated immutatively', () => {
  test('deep set: path length 1', () => {
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

    $(user, ['username']).set('Ervin')

    // object is not mutated, but assigned a new value
    expect(user()).not.toBe(initialUserValue)

    // user.address remains same
    expect(user().address).toBe(initialUserValue.address)

    // user.username is updated
    expect(user().username).toBe('Ervin')

    // check entire value
    expect(user()).toEqual({
      ...initialUserValue,
      username: 'Ervin'
    })
  })

  test('deep set: path length 2', () => {
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

    $(user, ['address', 'street']).set('Victor Plains')

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
})

describe('array states are updated immutatively', () => {
  test('shallow set: path length 0', () => {
    const oldNames = ['charlie', 'teddy', 'milo', 'baily']
    const newNames = ['rudy', 'chip', 'walter']

    const dogNames = reactive(oldNames)

    $(dogNames).set(newNames)

    // array is not mutated, new array is assigned
    expect(dogNames()).not.toBe(oldNames)

    // check value
    expect(dogNames()).toEqual(newNames)
  })

  test('deep set: path length 1', () => {
    const initValue = [
      { task: 'Drink Coffee', done: true },
      { task: 'Create Framework', done: false },
      { task: 'Go out for a walk', done: false }
    ]

    const todos = reactive(initValue)

    expect(todos()).toBe(initValue)

    $(todos, [1, 'done']).set((v) => !v)

    // array is not mutated, new array is assigned
    expect(todos()).not.toBe(initValue)

    // array[1] object is not mutated, new object is assigned
    expect(todos()[1]).not.toBe(initValue[1])

    // other objects remain as is
    expect(todos()[0]).toBe(initValue[0])
    expect(todos()[2]).toBe(initValue[2])

    // check new value
    expect(todos()[1].done).toBe(true)

    // check entire new value
    expect(todos()).toEqual([
      { task: 'Drink Coffee', done: true },
      { task: 'Create Framework', done: true },
      { task: 'Go out for a walk', done: false }
    ])
  })
})
