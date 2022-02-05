import { ArrayOperations, Dirty } from './types'

/**
 * mark the given path as dirty in the given dirty object
 * if an array operation was used, mark the dirty object accordingly
 */
export function markDirty(
  dirty: Dirty,
  path: (string | number)[],
  arrayOperation?: ArrayOperations
) {
  let target = dirty

  for (let i = 0; i < path.length; i++) {
    const key = path[i]

    // if target is dirty marks of an array
    if (typeof key === 'number') {
      if (!target._arr) {
        target._arr = []
      }

      const arrayOp = { key: key, dirty: {} }
      target._arr.push(arrayOp)

      // to inside the dirty object
      target = arrayOp.dirty
    }

    // if target is dirty marks of an object
    else {
      if (!target[key]) {
        target[key] = {}
      }
      target = target[key]
    }
  }

  if (arrayOperation) {
    if (!target._arr) {
      target._arr = []
    }
    target._arr.push(arrayOperation)
  } else {
    target._assign = true
  }

  return target
}
