import { insert } from '../src/store/operations'
import { createReactive } from '../src/store/reactive'

test('no mutations', () => {
  const count = createReactive(0)
  expect(count._.store.dirty).toEqual({})
})

test('assignment', () => {
  const count = createReactive(0)
  count.val = 10
  expect(count._.store.dirty).toEqual({
    _assign: true
  })
})

test('shallow mutation', () => {
  const user = createReactive({
    name: 'Manan',
    age: 20
  })

  user.$('name').val = 'new name'

  expect(user._.store.dirty).toEqual({
    name: {
      _assign: true
    }
  })
})

test('deep mutation', () => {
  const user = createReactive({
    name: {
      first: 'Manan',
      last: 'Tank'
    }
  })

  user.$('name', 'first').val = 'new name'

  expect(user._.store.dirty).toEqual({
    name: {
      first: {
        _assign: true
      }
    }
  })
})

test('array', () => {
  const todos = createReactive([{ name: 'Drink Coffee', done: false }])
  todos.$(0, 'done').val = true

  expect(todos._.store.dirty).toEqual({
    _arr: [
      {
        key: 0,
        dirty: {
          done: {
            _assign: true
          }
        }
      }
    ]
  })
})

test('array mutation operations', () => {
  const todos = createReactive([{ name: 'Drink Coffee', done: false }])
  todos.$(0, 'done').val = true

  const insertValue1 = {
    name: 'Create Framework',
    done: false
  }

  const insertValue2 = {
    name: 'Create Application',
    done: false
  }

  insert(todos, 0, insertValue1)
  insert(todos, 1, insertValue2)

  todos.$(0, 'name').val = 'xxx'

  expect(todos._.store.dirty).toEqual({
    _arr: [
      {
        key: 0,
        dirty: {
          done: {
            _assign: true
          }
        }
      },
      { insert: 0, values: [insertValue1] },
      { insert: 1, values: [insertValue2] },
      {
        key: 0,
        dirty: {
          name: {
            _assign: true
          }
        }
      }
    ]
  })
})
