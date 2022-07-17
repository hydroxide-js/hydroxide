import { batch, Reactive } from '../src'
import { ReactiveMethods } from '../src/types/reactiveMethods'
import { getUser, NestedNumbers, nestedNumbers, numbers } from './testingData'

test('set', () => {
  const user = getUser(false)

  batch(() => {
    // user, user.name cloned first time
    const v1 = user()
    const v1Name = v1.name
    user('name', 'first').set('Mike')
    expect(user()).not.toBe(v1)
    expect(user().name).not.toBe(v1Name)

    // user, user.name will not be cloned again
    const v2 = user()
    const v2Name = v2.name
    user('name', 'first').set('Mike2')
    expect(user()).toBe(v2)
    expect(user().name).toBe(v2Name)

    // user will not be cloned again
    // user.company will be cloned first time
    const v3 = user()
    const v3Company = v3.company
    user('company', 'name').set('xyz')
    expect(user()).toBe(v3)
    expect(user().company).not.toBe(v3Company)

    // user, user.company will not be cloned again
    const v4 = user()
    user('company', 'name').set('abc')
    expect(user()).toBe(v4)
    expect(user().company).toBe(v4.company)
  })
})

test('do', () => {
  const user = getUser(false)

  batch(() => {
    // user, user.name cloned first time
    const v1 = user()
    const v1Name = v1.name
    user('name', 'first').do(() => 'Mike')
    expect(user()).not.toBe(v1)
    expect(user().name).not.toBe(v1Name)

    // user, user.name will not be cloned again
    const v2 = user()
    const v2Name = v2.name
    user('name', 'first').do(() => 'Mike2')
    expect(user()).toBe(v2)
    expect(user().name).toBe(v2Name)

    // user will not be cloned again
    // user.company will be cloned first time
    const v3 = user()
    const v3Company = v3.company
    user('company', 'name').do(() => 'xyz')
    expect(user()).toBe(v3)
    expect(user().company).not.toBe(v3Company)

    // user, user.company will not be cloned again
    const v4 = user()
    user('company', 'name').do(() => 'abc')
    expect(user()).toBe(v4)
    expect(user().company).toBe(v4.company)
  })
})

// -----------------------------------------------------------------------------

function tester(
  cb: (
    arr: Reactive<number[]> | ReactiveMethods<NestedNumbers, ['foo', 'bar', 'arr']>
  ) => void
) {
  test('shallow', () => {
    batch(() => {
      const [arr] = numbers(false)

      // arr cloned first time
      const v1 = arr()
      cb(arr)
      expect(arr()).not.toBe(v1)

      // arr not cloned second time
      const v2 = arr()
      cb(arr)
      expect(arr()).toBe(v2)
    })
  })

  test('deep', () => {
    batch(() => {
      const [state] = nestedNumbers(false)

      // state, state.foo, state.foo.bar, state.foo.bar.arr cloned first time
      const v1 = state()
      cb(state('foo', 'bar', 'arr'))

      // cloned
      expect(state()).not.toBe(v1)
      expect(state().foo).not.toBe(v1.foo)
      expect(state().foo.bar).not.toBe(v1.foo.bar)
      expect(state().foo.bar.arr).not.toBe(v1.foo.bar.arr)

      // arr not cloned second time
      const v2 = state()
      cb(state('foo', 'bar', 'arr'))

      // not cloned
      expect(state()).toBe(v2)
      expect(state().foo).toBe(v2.foo)
      expect(state().foo.bar).toBe(v2.foo.bar)
      expect(state().foo.bar.arr).toBe(v2.foo.bar.arr)
    })
  })
}

describe('insertList', () => {
  tester(arr => {
    arr.insertList(0, [10, 20])
  })
})

describe('insert', () => {
  tester(arr => {
    arr.insert(0, 100)
  })
})

describe('push', () => {
  tester(arr => {
    arr.push(100)
  })
})

describe('pushList', () => {
  tester(arr => {
    arr.pushList([100, 200])
  })
})

describe('clear', () => {
  tester(arr => {
    arr.clear()
  })
})

describe('remove', () => {
  tester(arr => {
    arr.remove(0, 2)
  })
})

describe('pop', () => {
  tester(arr => {
    arr.pop(2)
  })
})
