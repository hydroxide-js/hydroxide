import { reactive } from '../../src/index'
import { getUser } from '../testingData'

test('primitive', () => {
  const count = reactive(10)

  // initial
  expect(count()).toBe(10)

  // updated
  count.set(20)
  expect(count()).toBe(20)
})

function shallowTest(mutable: boolean) {
  test('shallow set', () => {
    const user = getUser(mutable)
    const initValue = user()

    user('age').set(50)

    // correct value
    expect(user()).toEqual({
      ...initValue,
      age: 50
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

    user('name', 'first').set('Mike')

    // correct value
    expect(user()).toEqual({
      ...initValue,
      name: {
        ...initValue.name,
        first: 'Mike'
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
