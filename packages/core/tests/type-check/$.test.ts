import { reactive } from '../../src'

describe('primitive', () => {
  const count = reactive(0)

  test('set', () => {
    // valid
    count.set(1)
    count.set(count() + 1)

    // invalid
    // @ts-expect-error
    count.set('foo')
  })

  test('perform', () => {
    // valid
    count.do(v => v + 1)

    // invalid
    count.do(
      // @ts-expect-error
      v => v + 'hi'
    )
  })

  test('no array methods', () => {
    // does not have array methods
    expect('insert' in count).toBe(false)

    expect(() => {
      // @ts-expect-error
      count.insert(1, 1)
    }).toThrow()
  })
})

describe('object', () => {
  const user = reactive({
    name: {
      first: 'John',
      last: 'Doe'
    },
    age: 25
  })

  describe('shallow', () => {
    test('set', () => {
      // valid
      user.set({ name: { first: 'Jane', last: 'Doe' }, age: 30 })
      user.set(user())

      // invalid
      // @ts-expect-error
      user.set({})
    })

    test('perform', () => {
      // valid
      user.do(v => v)

      // invalid
      // @ts-expect-error
      user.do(v => {
        const x = v.name
        return { name: x }
      })
    })

    test('no array methods', () => {
      expect('insert' in user).toBe(false)

      expect(() => {
        // @ts-expect-error
        user.insert(1, 1)
      }).toThrow()
    })
  })

  describe('deep', () => {
    test('set', () => {
      // valid

      user('name').set({ first: 'Jane', last: 'Doe' })
      user('name', 'first').set('Jane')
      user('age').set(30)

      // invalid
      // @ts-expect-error
      user('name').set({})

      // @ts-expect-error
      user('name', 'first').set(10)

      // @ts-expect-error
      user('age').set('foo')
    })

    test('perform', () => {
      // valid
      user('name').do(v => ({ first: v.first, last: 'Doe' }))
      user('name', 'first').do(v => v + '!')
      user('age').do(v => v + 1)

      // invalid
      // @ts-expect-error
      user.do(v => {
        const x = v.name
        return { name: x }
      })
    })

    test('no array methods', () => {
      expect('insert' in user).toBe(false)

      expect(() => {
        // @ts-expect-error
        user('name', 'first').insert(1, 1)
      }).toThrow()
    })
  })
})

describe('array', () => {
  const todos = reactive([
    { task: 'Drink Coffee', done: true },
    { task: 'Write Code', done: false },
    { task: 'Have Dinner', done: false }
  ])

  test('set', () => {
    // valid
    todos.set([{ task: 'get some sleep', done: true }])
    todos.set(todos())

    // invalid
    // @ts-expect-error
    todos.set([{ foo: 'bar' }])
  })

  test('perform', () => {
    // valid
    todos.do(v => v)

    // invalid
    // @ts-expect-error
    todos.do(v => {
      return { name: v }
    })
  })
})
