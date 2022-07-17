import { reactive } from '../../src/index'
import { getUser } from '../testingData'

test('primitive', () => {
  const count = reactive(10)

  // initial
  expect(count()).toBe(10)

  // updated
  count.do(v => v + 1)
  expect(count()).toBe(11)
})

function shallowTest(mutable: boolean) {
  test('shallow set', () => {
    const user = getUser(mutable)
    const initValue = user()
    const initAge = initValue.age

    user('age').do(v => v + 1)

    // correct value
    expect(user()).toEqual({
      ...initValue,
      age: initAge + 1
    })

    // no mutation
    if (!mutable) {
      expect(user()).not.toBe(initValue)
    } else {
      expect(user()).toBe(initValue)
    }
  })
}

function deepTest(mutable: boolean) {
  test('deep set', () => {
    const user = getUser(mutable)
    const initValue = user()
    const initFirstName = initValue.name.first

    user('name', 'first').do(v => v + '!')

    // correct value
    expect(user()).toEqual({
      ...initValue,
      name: {
        ...initValue.name,
        first: initFirstName + '!'
      }
    })

    if (!mutable) {
      // no mutation (user and user.name have been cloned)
      expect(user()).not.toBe(initValue)
      expect(user().name).not.toBe(initValue.name)
    } else {
      // mutation (user and user.name are the same object)
      expect(user()).toBe(initValue)
      expect(user().name).toBe(initValue.name)
    }
  })
}

describe('immutable', () => {
  shallowTest(false)
  deepTest(false)
})

describe('mutable', () => {
  shallowTest(true)
  deepTest(true)
})
