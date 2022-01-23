import { insert, insertMultiple, remove, removeMultiple } from '../src/store/operations'
import { createReactive } from '../src/store/reactive'

test('insert', () => {
  const list = createReactive([1, 2, 3])
  insert(list, 0, 100)

  // check the values
  expect(list.val).toEqual([100, 1, 2, 3])

  // check the dirty object
  expect(list._.store.dirty).toEqual({
    _arr: [{ insert: 0, values: [100] }]
  })
})

test('insertMultiple', () => {
  const list = createReactive([1, 2, 3])
  insertMultiple(list, 0, [100, 200, 300])

  // check the values
  expect(list.val).toEqual([100, 200, 300, 1, 2, 3])

  // check the dirty object
  expect(list._.store.dirty).toEqual({
    _arr: [{ insert: 0, values: [100, 200, 300] }]
  })
})

test('remove', () => {
  const list = createReactive([1, 2, 3])
  remove(list, 0)

  // check the value
  expect(list.val).toEqual([2, 3])

  // check the dirty object
  expect(list._.store.dirty).toEqual({
    _arr: [{ remove: 0, count: 1 }]
  })
})

test('removeMultiple', () => {
  const list = createReactive([1, 2, 3, 4, 5, 6])
  removeMultiple(list, 2, 3)

  // check the value
  expect(list.val).toEqual([1, 2, 6])

  // check the dirty object
  expect(list._.store.dirty).toEqual({
    _arr: [{ remove: 2, count: 3 }]
  })
})
