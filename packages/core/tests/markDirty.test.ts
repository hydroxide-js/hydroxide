import { markDirty } from '../src/store/dirty'
import { ArrayOperations } from '../src/types/arrayOps'

test('empty path', () => {
  const dirty = {}
  markDirty(dirty, [])

  expect(dirty).toEqual({
    _assign: true
  })
})

test('path length 1', () => {
  const dirty = {}
  markDirty(dirty, ['foo'])

  expect(dirty).toEqual({
    foo: {
      _assign: true
    }
  })
})

test('path length 2', () => {
  const dirty = {}
  markDirty(dirty, ['foo', 'bar'])

  expect(dirty).toEqual({
    foo: {
      bar: {
        _assign: true
      }
    }
  })
})

test('multiple dirty marks', () => {
  const dirty = {}
  markDirty(dirty, ['foo', 'bar'])
  markDirty(dirty, ['foo', 'bazz'])
  markDirty(dirty, ['foo'])

  expect(dirty).toEqual({
    foo: {
      _assign: true,
      bar: {
        _assign: true
      },
      bazz: {
        _assign: true
      }
    }
  })
})

test('empty path + array operation', () => {
  const dirty = {}
  const arrayOperation: ArrayOperations = { insert: 0, values: [100] }

  markDirty(dirty, [], arrayOperation)

  expect(dirty).toEqual({
    _arr: [arrayOperation]
  })
})

test('path length 1 + array operation', () => {
  const dirty = {}
  const arrayOperation: ArrayOperations = { insert: 0, values: [100] }

  markDirty(dirty, ['foo'], arrayOperation)

  expect(dirty).toEqual({
    foo: {
      _arr: [arrayOperation]
    }
  })
})

test('array key mutation', () => {
  const dirty = {}
  markDirty(dirty, [0, 'foo', 'bar'])

  expect(dirty).toEqual({
    _arr: [
      {
        key: 0,
        dirty: {
          foo: {
            bar: {
              _assign: true
            }
          }
        }
      }
    ]
  })
})

test('multiple array key mutations, with same key mutated twice in different way', () => {
  const dirty = {}
  markDirty(dirty, [0, 'foo', 'bar'])
  markDirty(dirty, [1, 'foo', 'bar'])
  markDirty(dirty, [0, 'fuzz'])

  const firstMutation = {
    key: 0,
    dirty: {
      foo: {
        bar: {
          _assign: true
        }
      }
    }
  }

  const secondMutation = {
    key: 1,
    dirty: {
      foo: {
        bar: {
          _assign: true
        }
      }
    }
  }

  const thirdMutation = {
    key: 0,
    dirty: {
      fuzz: {
        _assign: true
      }
    }
  }

  expect(dirty).toEqual({
    _arr: [firstMutation, secondMutation, thirdMutation]
  })
})
