import { reactive } from '../../src/index'

test('initial value', () => {
  const count = reactive(0)
  expect(count()).toBe(0)

  const name = reactive('foo')
  expect(name()).toBe('foo')

  const todoValue = { task: 'Drink Coffee', done: true }

  const todo = reactive(todoValue)
  expect(todo()).toBe(todoValue)
})
