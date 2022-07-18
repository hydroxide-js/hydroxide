import { CONNECTION_PHASE, subscribe, Reactive, ReactiveSlice } from '../src/index'
import { nestedNumbers, numbers } from './testingData'

/**
 * when state is updated, it must be invalidated
 */

function setup(reactive: Reactive<any>) {
  let invalidationCount = 0
  subscribe(
    reactive,
    () => {
      invalidationCount++
    },
    CONNECTION_PHASE
  )

  return () => invalidationCount
}

type Arr = Reactive<number[]> | ReactiveSlice<number[]>

function shallowTest(mutable: boolean, cb: (ree: Arr) => void) {
  test('shallow', () => {
    const [state] = numbers(mutable)
    const invCount = setup(state)
    cb(state)
    expect(invCount()).toBe(1)
  })
}

function deepTest(mutable: boolean, cb: (ree: Arr) => void) {
  test('deep', () => {
    const [state] = nestedNumbers(mutable)
    const invCount = setup(state)
    cb(state('foo', 'bar', 'arr'))
    expect(invCount()).toBe(1)
  })
}

function createTests(updator: (arr: Arr) => void) {
  function createSuite(mutable: boolean) {
    describe(mutable ? 'mutable' : 'immutable', () => {
      shallowTest(mutable, updator)
      deepTest(mutable, updator)
    })
  }

  createSuite(true)
  createSuite(false)
}

// --------

describe('set', () => {
  createTests(arr => {
    arr.set([])
  })
})

describe('do', () => {
  createTests(arr => {
    arr.do(v => [...v])
  })
})

describe('insertList', () => {
  createTests(arr => {
    arr.insertList(1, [10, 20, 30])
  })
})

describe('insert', () => {
  createTests(arr => {
    arr.insert(1, 10)
  })
})

describe('push', () => {
  createTests(arr => {
    arr.push(10)
  })
})

describe('pushList', () => {
  createTests(arr => {
    arr.pushList([10, 20])
  })
})

describe('remove', () => {
  createTests(arr => {
    arr.remove(1, 2)
  })
})

describe('pop', () => {
  createTests(arr => {
    arr.pop(2)
  })
})

describe('clear', () => {
  createTests(arr => {
    arr.clear()
  })
})

describe('swap', () => {
  createTests(arr => {
    arr.swap(1, 2)
  })
})
