import { reactive } from '../../src/index'
import { getUser } from '../testingData'

describe('do', () => {
  test('level 0', () => {
    const count = reactive(10)

    // initial
    expect(count()).toBe(10)

    // updated
    count.do(v => v + 1)
    expect(count()).toBe(11)
  })

  test('level 1', () => {
    const user = getUser()
    const initValue = user()
    const initAge = initValue.age

    user('age').do(v => v + 1)

    // correct value
    expect(user()).toEqual({
      ...initValue,
      age: initAge + 1
    })

    // no mutation
    expect(user()).not.toBe(initValue)
  })

  test('level 2', () => {
    const user = getUser()
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

    // no mutation (user and user.name have been cloned)
    expect(user()).not.toBe(initValue)
    expect(user().name).not.toBe(initValue.name)
  })
})
