import { createReactive } from '../apis/createReactive'

test('no mutations', () => {
  const count = createReactive(0)
  expect(count._.store.dirty).toEqual({})
})

test('assignment', () => {
  const count = createReactive(0)
  count.value = 10
  expect(count._.store.dirty).toEqual({
    _assign: true
  })
})

test('shallow mutation', () => {
  const user = createReactive({
    name: 'Manan',
    age: 20
  })

  user.$('name').value = 'new name'

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

  user.$('name', 'first').value = 'new name'

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
  todos.$(0, 'done').value = true

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

  //
})

describe('array mutations', () => {
  test('$insert', () => {
    const todos = createReactive([{ name: 'Drink Coffee', done: false }])
    todos.$(0, 'done').value = true

    const insertValue1 = {
      name: 'Create Framework',
      done: false
    }

    const insertValue2 = {
      name: 'Create Application',
      done: false
    }

    todos.$insert(0, insertValue1)
    todos.$insert(1, insertValue2)

    todos.$(0, 'name').value = 'xxx'

    const expected = {
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
    }

    expect(todos._.store.dirty).toEqual(expected)

    //
  })

  test('$insertList', () => {
    const list = createReactive([1, 2, 3])
    list.$insertList(0, [100, 200, 300])

    // check the values
    expect(list.value).toEqual([100, 200, 300, 1, 2, 3])

    // check the dirty object
    expect(list._.store.dirty).toEqual({
      _arr: [{ insert: 0, values: [100, 200, 300] }]
    })
  })

  test('$delete', () => {
    const list = createReactive([1, 2, 3])
    list.$delete(0)

    // check the value
    expect(list.value).toEqual([2, 3])

    // check the dirty object
    expect(list._.store.dirty).toEqual({
      _arr: [{ remove: 0, count: 1 }]
    })
  })

  test('$delete + count', () => {
    const list = createReactive([1, 2, 3, 4, 5, 6])
    list.$delete(2, 3)

    // check the value
    expect(list.value).toEqual([1, 2, 6])

    // check the dirty object
    expect(list._.store.dirty).toEqual({
      _arr: [{ remove: 2, count: 3 }]
    })
  })
})
