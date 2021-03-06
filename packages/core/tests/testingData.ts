import { reactive } from '../src'

export const getTodos = (mutable: boolean) => {
  const todos = reactive([
    { task: 'Drink Coffee', done: true },
    { task: 'Drink Water', done: true },
    { task: 'Drink Tea', done: true }
  ])

  todos.mutable = mutable
  return todos
}

export function numbers(mutable: boolean) {
  const initValue = [1, 2, 3, 4]
  const numbers = reactive(initValue)
  numbers.mutable = mutable

  const is = {
    mutated() {
      expect(numbers()).toBe(initValue)
    },
    notMutated() {
      expect(numbers()).not.toBe(initValue)
    }
  }

  return [numbers, is] as const
}

export function nestedNumbers(mutable: boolean) {
  const initValue = {
    foo: {
      bar: {
        arr: [1, 2, 3, 4]
      }
    }
  }
  const state = reactive(initValue)
  state.mutable = mutable

  const is = {
    mutated() {
      const newValue = state()
      expect(newValue).toBe(initValue)
      expect(newValue.foo).toBe(initValue.foo)
      expect(newValue.foo.bar).toBe(initValue.foo.bar)
      expect(newValue.foo.bar.arr).toBe(initValue.foo.bar.arr)
    },

    notMutated() {
      const newValue = state()
      expect(newValue).not.toBe(initValue)
      expect(newValue.foo).not.toBe(initValue.foo)
      expect(newValue.foo.bar).not.toBe(initValue.foo.bar)
      expect(newValue.foo.bar.arr).not.toBe(initValue.foo.bar.arr)
    }
  }

  return [state, is] as const
}

export function getUser(mutable: boolean) {
  const initValue = {
    name: {
      first: 'Michael',
      last: 'Scott'
    },
    age: 45,
    job: 'Manager',
    company: {
      name: 'Dunder Mifflin',
      address: {
        city: 'Scranton',
        zipcode: '01025'
      }
    }
  }

  const state = reactive(initValue)
  state.mutable = mutable

  return state
}
