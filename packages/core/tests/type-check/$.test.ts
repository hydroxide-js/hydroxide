import { reactive } from '../../src'
import { dontRun } from './utils'

describe('primitive', () => {
  const count = reactive(0)
  const loggedIn = reactive(true)
  const name = reactive('John')
  const _null = reactive(null)
  const _undefined = reactive(undefined)

  test('set', () => {
    // valid
    dontRun(() => {
      count.set(1)
      count.set(count() + 1)

      loggedIn.set(false)
      loggedIn.set(true)

      name.set('Jane')
      name.set(name() + '!')

      _null.set(null)
      _undefined.set(undefined)
    })

    // invalid
    dontRun(() => {
      // @ts-expect-error
      count.set('foo')

      // @ts-expect-error
      loggedIn.set('not')

      // @ts-expect-error
      name.set(10)

      // @ts-expect-error
      _null.set('null')

      // @ts-expect-error
      _undefined.set(10)
    })
  })

  test('do', () => {
    // valid
    dontRun(() => {
      count.do(v => v + 1)
      loggedIn.do(v => !v)
      name.do(v => v + '!')
      _null.do(() => null)
      _undefined.do(() => undefined)
    })

    // invalid
    dontRun(() => {
      // @ts-expect-error
      count.do(v => v + 'hi')
      // @ts-expect-error
      loggedIn.do(() => 'not')
      // @ts-expect-error
      name.do(() => 10)
      // @ts-expect-error
      _null.do(() => 'null')
      // @ts-expect-error
      _undefined.do(() => 10)
    })
  })

  test('no array methods', () => {
    expect('insert' in count).toBe(false)

    // invalid
    dontRun(() => {
      // @ts-expect-error
      count.insert(1, 1)

      // @ts-expect-error
      loggedIn.insert(1, 1)

      // @ts-expect-error
      name.insert(1, 1)

      // @ts-expect-error
      _null.insert(1, 1)

      // @ts-expect-error
      _undefined.insert(1, 1)
    })
  })
})

describe('object', () => {
  const user = reactive({
    name: {
      first: 'John',
      last: 'Doe'
    },
    age: 25,
    isCool: true
  })

  describe('shallow', () => {
    test('set', () => {
      // valid
      dontRun(() => {
        user.set({ name: { first: 'Jane', last: 'Doe' }, age: 30, isCool: true })
        user.set(user())
      })

      // invalid
      dontRun(() => {
        // @ts-expect-error
        user.set({})
      })
    })

    test('perform', () => {
      // valid
      dontRun(() => {
        user.do(v => v)
      })

      // invalid
      dontRun(() => {
        // @ts-expect-error
        user.do(() => ({ foo: 10 }))
      })
    })

    test('no array methods', () => {
      expect('insert' in user).toBe(false)

      dontRun(() => {
        // @ts-expect-error
        user.insert(1, 1)
      })
    })
  })

  describe('deep', () => {
    test('set', () => {
      // valid
      dontRun(() => {
        user('name').set({ first: 'Jane', last: 'Doe' })
        user('name', 'first').set('Jane')
        user('age').set(30)
        user('isCool').set(false)
        user('isCool').set(true)
      })

      // invalid
      dontRun(() => {
        // @ts-expect-error
        user('name').set({})

        // @ts-expect-error
        user('name', 'first').set(10)

        // @ts-expect-error
        user('age').set('foo')

        // @ts-expect-error
        user('isCool').set('foo')
      })
    })

    test('perform', () => {
      // valid
      dontRun(() => {
        user('name').do(v => ({ first: v.first, last: 'Doe' }))
        user('name', 'first').do(v => v + '!')
        user('age').do(v => v + 1)
      })

      // invalid
      dontRun(() => {
        // @ts-expect-error
        user.do(() => ({ foo: 10 }))
      })
    })

    test('no array methods', () => {
      expect('insert' in user).toBe(false)

      dontRun(() => {
        // @ts-expect-error
        user('name', 'first').insert(1, 1)
      })
    })
  })
})

describe('array', () => {
  const initValue = [
    { task: 'Drink Coffee', done: true },
    { task: 'Write Code', done: false },
    { task: 'Have Dinner', done: false }
  ]

  describe('shallow', () => {
    test('set', () => {
      const todos = reactive(initValue)

      // valid
      dontRun(() => {
        todos.set([{ task: 'get some sleep', done: true }])
        todos.set(todos())
      })

      // invalid
      dontRun(() => {
        // @ts-expect-error
        todos.set([{ foo: 'bar' }])
      })
    })

    test('perform', () => {
      const todos = reactive(initValue)

      // valid
      dontRun(() => {
        todos.do(v => v)
      })

      // invalid
      dontRun(() => {
        // @ts-expect-error
        todos.do(v => {
          return { name: v }
        })
      })
    })

    test('array methods', () => {
      const todos = reactive(initValue)

      const todo = { task: 'get some sleep', done: true }
      const foo = { foo: 'bar' }

      // valid
      dontRun(() => {
        todos.insert(0, todo)
        todos.insertList(0, [todo])
        todos.push(todo)
        todos.pushList([todo])
        todos.remove(0)
        todos.pop()
        todos.swap(0, 1)
      })

      dontRun(() => {
        // @ts-expect-error
        todos.insert(0, foo)
        // @ts-expect-error
        todos.insertList(0, [foo])
        // @ts-expect-error
        todos.push(foo)
        // @ts-expect-error
        todos.pushList([foo])
        todos.pop()
      })
    })
  })
})
