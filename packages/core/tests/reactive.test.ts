import { expectType } from 'tsd'
import { Reactive } from '../../types'
import { reactive } from '../reactive'

test('type check', () => {
  // primitive: number
  const count = reactive(0)
  expectType<Reactive<number>>(count)
  expectType<number>(count())

  // primitive: string
  const name = reactive('foo')
  expectType<Reactive<string>>(name)
  expectType<string>(name())

  // deep object
  const todos = reactive([
    { done: true, task: 'Drink Coffee' },
    { done: false, task: 'Do work' }
  ])

  expectType<
    Reactive<
      {
        done: boolean
        task: string
      }[]
    >
  >(todos)

  expectType<
    {
      done: boolean
      task: string
    }[]
  >(todos())
})

test('initial value', () => {
  const count = reactive(0)
  expect(count()).toBe(0)

  const name = reactive('foo')
  expect(name()).toBe('foo')

  const todoValue = { task: 'Drink Coffee', done: true }

  const todo = reactive(todoValue)
  expect(todo()).toBe(todoValue)
})
