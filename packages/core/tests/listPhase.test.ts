import { subscribe, LIST_PHASE } from '../src'
import { ArrayOp } from '../src/types/others'
import { nestedNumbers, numbers } from './testingData'

/**
 * ListPhase Subscription args testings
 */

describe('set', () => {
  test('assign', () => {
    const [arr] = numbers()
    let called = false
    const newValue = [10, 20]

    const setOp: ArrayOp.Set = (type, path, value) => {
      expect(type).toBe('set')
      expect(path).toBe(null)
      expect(value).toEqual(newValue)
      called = true
    }

    subscribe(arr, setOp, LIST_PHASE)

    arr.set(newValue)
    expect(called).toBe(true)
  })

  test('shallow', () => {
    const [arr] = numbers()
    let called = false

    const setOp: ArrayOp.Set = (type, path, value) => {
      expect(type).toBe('set')
      expect(path).toEqual([0])
      expect(value).toEqual(10)
      called = true
    }

    subscribe(arr, setOp, LIST_PHASE)

    arr(0).set(10)
    expect(called).toBe(true)
  })

  test('deep', () => {
    const [state] = nestedNumbers()
    let called = false

    const setOp: ArrayOp.Set = (type, path, value) => {
      expect(type).toBe('set')
      expect(path).toEqual(['foo', 'bar', 'arr', 0])
      expect(value).toEqual(10)
      called = true
    }

    subscribe(state, setOp, LIST_PHASE)
    state('foo', 'bar', 'arr', 0).set(10)
    expect(called).toBe(true)
  })
})

describe('do', () => {
  test('assign', () => {
    const [arr] = numbers()
    let called = false
    const newValue = [10, 20]

    const setOp: ArrayOp.Set = (type, path, value) => {
      expect(type).toBe('set')
      expect(path).toBe(null)
      expect(value).toEqual(newValue)
      called = true
    }

    subscribe(arr, setOp, LIST_PHASE)

    arr.do(() => newValue)
    expect(called).toBe(true)
  })

  test('shallow', () => {
    const [arr] = numbers()
    let called = false

    const setOp: ArrayOp.Set = (type, path, value) => {
      expect(type).toBe('set')
      expect(path).toEqual([0])
      expect(value).toEqual(10)
      called = true
    }

    subscribe(arr, setOp, LIST_PHASE)

    arr(0).do(() => 10)
    expect(called).toBe(true)
  })

  test('deep', () => {
    const [state] = nestedNumbers()
    let called = false

    const setOp: ArrayOp.Set = (type, path, value) => {
      expect(type).toBe('set')
      expect(path).toEqual(['foo', 'bar', 'arr', 0])
      expect(value).toEqual(10)
      called = true
    }

    subscribe(state, setOp, LIST_PHASE)
    state('foo', 'bar', 'arr', 0).do(() => 10)
    expect(called).toBe(true)
  })
})

describe('insertList', () => {
  test('shallow', () => {
    const [arr] = numbers()
    let called = false

    const setOp: ArrayOp.Insert = (type, index, values) => {
      expect(type).toBe('insert')
      expect(values).toEqual([10, 20, 30])
      expect(index).toEqual(0)
      called = true
    }

    subscribe(arr, setOp, LIST_PHASE)
    arr.insertList(0, [10, 20, 30])
    expect(called).toBe(true)
  })

  test('deep', () => {
    const [state] = nestedNumbers()
    let called = false

    const setOp: ArrayOp.Set = () => {
      called = true
    }

    subscribe(state, setOp, LIST_PHASE)
    state('foo', 'bar', 'arr').insertList(0, [10, 20, 30])
    expect(called).toBe(false)
  })
})

describe('insert', () => {
  test('shallow', () => {
    const [arr] = numbers()
    let called = false

    const setOp: ArrayOp.Insert = (type, index, values) => {
      expect(type).toBe('insert')
      expect(values).toEqual([100])
      expect(index).toEqual(0)
      called = true
    }

    subscribe(arr, setOp, LIST_PHASE)
    arr.insert(0, 100)
    expect(called).toBe(true)
  })

  test('deep', () => {
    const [state] = nestedNumbers()
    let called = false

    const setOp: ArrayOp.Set = () => {
      called = true
    }

    subscribe(state, setOp, LIST_PHASE)
    state('foo', 'bar', 'arr').insert(0, 100)
    expect(called).toBe(false)
  })
})

describe('push', () => {
  test('shallow', () => {
    const [arr] = numbers()
    let called = false

    const expectedIndex = arr().length

    const setOp: ArrayOp.Insert = (type, index, values) => {
      expect(type).toBe('insert')
      expect(values).toEqual([100])
      expect(index).toEqual(expectedIndex)
      called = true
    }

    subscribe(arr, setOp, LIST_PHASE)
    arr.push(100)
    expect(called).toBe(true)
  })

  test('deep', () => {
    const [state] = nestedNumbers()
    let called = false

    const setOp: ArrayOp.Set = () => {
      called = true
    }

    subscribe(state, setOp, LIST_PHASE)
    state('foo', 'bar', 'arr').push(100)
    expect(called).toBe(false)
  })
})

describe('pushList', () => {
  test('shallow', () => {
    const [arr] = numbers()
    let called = false

    const expectedIndex = arr().length

    const setOp: ArrayOp.Insert = (type, index, values) => {
      expect(type).toBe('insert')
      expect(values).toEqual([10, 20, 30])
      expect(index).toEqual(expectedIndex)
      called = true
    }

    subscribe(arr, setOp, LIST_PHASE)
    arr.pushList([10, 20, 30])
    expect(called).toBe(true)
  })

  test('deep', () => {
    const [state] = nestedNumbers()
    let called = false

    const setOp: ArrayOp.Set = () => {
      called = true
    }

    subscribe(state, setOp, LIST_PHASE)
    state('foo', 'bar', 'arr').pushList([10, 20, 30])
    expect(called).toBe(false)
  })
})

describe('remove', () => {
  test('shallow', () => {
    const [arr] = numbers()
    let called = false

    const setOp: ArrayOp.Remove = (type, index, count) => {
      expect(type).toBe('remove')
      expect(index).toBe(0)
      expect(count).toBe(2)
      called = true
    }

    subscribe(arr, setOp, LIST_PHASE)
    arr.remove(0, 2)
    expect(called).toBe(true)
  })

  test('deep', () => {
    const [state] = nestedNumbers()
    let called = false

    const setOp: ArrayOp.Set = () => {
      called = true
    }

    subscribe(state, setOp, LIST_PHASE)
    state('foo', 'bar', 'arr').remove(0, 2)
    expect(called).toBe(false)
  })
})

describe('pop', () => {
  test('shallow', () => {
    const [arr] = numbers()
    let called = false

    const expectedIndex = arr().length - 2

    const setOp: ArrayOp.Remove = (type, index, count) => {
      expect(type).toBe('remove')
      expect(index).toBe(expectedIndex)
      expect(count).toBe(2)
      called = true
    }

    subscribe(arr, setOp, LIST_PHASE)
    arr.pop(2)
    expect(called).toBe(true)
  })

  test('deep', () => {
    const [state] = nestedNumbers()
    let called = false

    const setOp: ArrayOp.Set = () => {
      called = true
    }

    subscribe(state, setOp, LIST_PHASE)
    state('foo', 'bar', 'arr').pop(2)
    expect(called).toBe(false)
  })
})

describe('clear', () => {
  test('shallow', () => {
    const [arr] = numbers()
    let called = false

    const setOp: ArrayOp.Clear = type => {
      expect(type).toBe('clear')
      called = true
    }

    subscribe(arr, setOp, LIST_PHASE)
    arr.clear()
    expect(called).toBe(true)
  })

  test('deep', () => {
    const [state] = nestedNumbers()
    let called = false

    const setOp: ArrayOp.Clear = () => {
      called = true
    }

    subscribe(state, setOp, LIST_PHASE)
    state('foo', 'bar', 'arr').clear()
    expect(called).toBe(false)
  })
})

describe('swap', () => {
  test('shallow', () => {
    const [arr] = numbers()
    let called = false

    const setOp: ArrayOp.Swap = (type, i, j) => {
      expect(type).toBe('swap')
      expect(i).toBe(0)
      expect(j).toBe(1)
      called = true
    }

    subscribe(arr, setOp, LIST_PHASE)
    arr.swap(0, 1)
    expect(called).toBe(true)
  })

  test('deep', () => {
    const [state] = nestedNumbers()
    let called = false

    const setOp: ArrayOp.Swap = () => {
      called = true
    }

    subscribe(state, setOp, LIST_PHASE)
    state('foo', 'bar', 'arr').swap(0, 1)
    expect(called).toBe(false)
  })
})
