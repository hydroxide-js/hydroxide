import { Paths, PathTarget } from '../../src/types/path'
import { dontRun } from './utils'

describe('paths', () => {
  test('primitives', () => {
    // valid
    dontRun(() => {
      const arr1: Paths<number> = []
      const arr2: Paths<string> = []
      const arr3: Paths<symbol> = []
      return [arr1, arr2, arr3]
    })

    // invalid
    dontRun(() => {
      // @ts-expect-error
      const arr1: Paths<number> = ['foo']
      return arr1
    })
  })

  test('shallow object', () => {
    type Obj = {
      name: string
      age: number
    }

    dontRun(() => {
      dontRun(() => {
        // valid
        const arr1: Paths<Obj>[] = [['name'], ['age']]
        return arr1
      })

      // invalid
      dontRun(() => {
        // @ts-expect-error
        const arr2: Paths<Obj>[] = [['foo']]
        return arr2
      })
    })
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

    dontRun(() => {
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
      return arr1
    })

    // invalid
    dontRun(() => {
      // @ts-expect-error
      const arr2: Paths<Obj>[] = [['foo']]
      return arr2
    })
  })

  test('shallow array', () => {
    type Obj = string[]

    // valid
    dontRun(() => {
      const arr1: Paths<Obj>[] = [[0], [1]]
      return arr1
    })

    // invalid
    dontRun(() => {
      // @ts-expect-error
      const arr2: Paths<Obj>[] = [['foo']]
      return arr2
    })
  })

  test('deep array', () => {
    type Obj = { task: string; done: boolean }[]

    // valid
    dontRun(() => {
      const arr1: Paths<Obj>[] = [[0], [0, 'task'], [1, 'done']]
      return arr1
    })

    // invalid
    dontRun(() => {
      // @ts-expect-error
      const arr2: Paths<Obj>[] = [['foo']]
      return arr2
    })
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

    dontRun(() => {
      const path1: PathTarget<Obj, ['name', 'first']> = 'John'
      const path2: PathTarget<Obj, ['name', 'last']> = 'Doe'
      const path3: PathTarget<Obj, ['age']> = 30
      const path4: PathTarget<Obj, ['todos', 0, 'task']> = 'foo'
      const path5: PathTarget<Obj, ['todos', 1, 'done']> = false

      return [path1, path2, path3, path4, path5]
    })
  })
})
