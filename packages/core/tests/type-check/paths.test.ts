import { Paths, PathTarget } from '../../src/types/path'

function noop(...args: any[]) {
  return args
}

describe('paths', () => {
  test('primitives', () => {
    const arr1: Paths<number> = []
    const arr2: Paths<string> = []
    const arr3: Paths<symbol> = []

    noop(arr1, arr2, arr3)
  })

  test('shallow object', () => {
    type Obj = {
      name: string
      age: number
    }
    const arr1: Paths<Obj>[] = [['name'], ['age']]

    // invalid
    // @ts-expect-error
    const arr2: Paths<Obj>[] = [['foo']]

    noop(arr1, arr2)
  })

  test('deep object + array', () => {
    type Obj = {
      name: {
        first: string
        last: string
      }
      age: number
      todos: { task: string; done: boolean }[]
    }

    type V = Paths<Obj>

    const arr1: V[] = [
      ['name'],
      ['age'],
      ['todos'],
      ['name', 'first'],
      ['name', 'last'],
      ['todos', 0],
      ['todos', 1],
      ['todos', 2, 'task'],
      ['todos', 3, 'done']
    ]

    // invalid
    // @ts-expect-error
    const arr2: Paths<Obj>[] = [['foo']]

    noop(arr1, arr2)
  })

  test('shallow array', () => {
    type Obj = string[]

    const arr1: Paths<Obj>[] = [[0], [1]]

    // invalid
    // @ts-expect-error
    const arr2: Paths<Obj>[] = [['foo']]

    noop(arr1, arr2)
  })

  test('deep array', () => {
    type Obj = { task: string; done: boolean }[]

    const arr1: Paths<Obj>[] = [[0], [0, 'task'], [1, 'done']]

    // invalid
    // @ts-expect-error
    const arr2: Paths<Obj>[] = [['foo']]

    noop(arr1, arr2)
  })
})

describe('path target', () => {
  it('object', () => {
    type Obj = {
      name: {
        first: string
        last: string
      }
      age: number
      todos: { task: string; done: boolean }[]
    }

    const path1: PathTarget<Obj, ['name', 'first']> = 'John'
    const path2: PathTarget<Obj, ['name', 'last']> = 'Doe'
    const path3: PathTarget<Obj, ['age']> = 30
    const path4: PathTarget<Obj, ['todos', 0, 'task']> = 'foo'
    const path5: PathTarget<Obj, ['todos', 1, 'done']> = false

    noop(path1, path2, path3, path4, path5)
  })
})
