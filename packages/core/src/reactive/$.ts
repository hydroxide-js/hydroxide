import { Path, Paths, PathTarget, Reactive, ReactiveMethods } from '../types'
import { mutativeSwap } from '../utils/mutativeSwap'
import { targetKey, valueAt } from '../utils/targetKey'
import {
  immutativeInsert,
  immutativeRemove,
  immutativeSet,
  immutativeSwap
} from './immutable'
import { invalidate, LIST_PHASE } from './scheduler'

let $path: Path | null
let $reactive: Reactive<any> | null

/** set new value */
export function set<T, P extends Paths<T>, V extends PathTarget<T, P>>(
  newValue: V
): Reactive<T> {
  // @ts-expect-error
  const state = ($reactive || this) as Reactive<T>
  const path = $path

  if (path) {
    if (state.mutable) {
      const lastIndex = path.length - 1
      let target: any = state.value
      for (let i = 0; i < lastIndex; i++) {
        target = target[path[i]]
      }

      if (newValue !== target[path[lastIndex]]) {
        target[path[lastIndex]] = newValue
      }
    } else {
      state.value = immutativeSet(state.value, path, newValue)
    }
  } else {
    if (newValue !== state.value) {
      state.value = newValue as T
    }
  }

  if (state.subs[LIST_PHASE]) {
    state.subs[LIST_PHASE].forEach((cb) => cb('set', path, newValue))
  }
  invalidate(state)

  $path = null
  $reactive = null
  return state
}

/** perform an operation on reactive  */
export function perform<T, P extends Paths<T>, V extends PathTarget<T, P>>(
  operation: (oldValue: V) => V
): Reactive<T> {
  // @ts-expect-error
  const state = ($reactive || this) as Reactive<T>
  const path = $path

  if (path) {
    const oldValue = valueAt(state.value, path)
    const newValue = operation(oldValue as V)
    if (oldValue === newValue) return state
    // @ts-expect-error
    return state.set(newValue)
  } else {
    // @ts-expect-error
    const newValue = operation(state.value)
    if (state.value === newValue) return state
    // @ts-expect-error
    return state.set(newValue)
  }
}

/** insert a list of items on reactive at given index  */
export function insertList<
  T extends Array<any>,
  P extends Paths<T>,
  V extends PathTarget<T, P>
>(_index: number, values: V[]): Reactive<T> {
  // @ts-expect-error
  const state = ($reactive || this) as Reactive<T>
  const path = $path

  // insert at path
  if (path) {
    const arr = valueAt(state.value, path)
    const index = _index < 0 ? arr.length + _index + 1 : _index
    if (state.mutable) {
      arr.splice(index, 0, ...values)
    } else {
      state.value = immutativeSet(
        state,
        path,
        // @ts-ignore
        immutativeInsert(arr, index, values)
      )
    }
  }

  // insert on root
  else {
    const index = _index < 0 ? state.value.length + _index + 1 : _index

    if (state.mutable) {
      state.value.splice(index, 0, ...values)
    } else {
      state.value = immutativeInsert(state.value, index, values) as T
    }

    if (state.subs[LIST_PHASE]) {
      state.subs[LIST_PHASE].forEach((cb) => {
        cb('insert', index, values)
      })
    }
  }

  $path = null
  $reactive = null
  invalidate(state)
  return state
}

/** insert a single item at given index  */
export function insert<
  T extends Array<any>,
  P extends Paths<T>,
  V extends PathTarget<T, P>
>(index: number, value: V): Reactive<T> {
  // @ts-expect-error
  $reactive = ($reactive || this) as Reactive<T>
  return insertList(index, [value])
}

/** push single item to reactive */
export function push<
  T extends Array<any>,
  P extends Paths<T>,
  V extends PathTarget<T, P>
>(value: V): Reactive<T> {
  // @ts-expect-error
  $reactive = ($reactive || this) as Reactive<T>
  return insertList(-1, [value])
}

/** push list of items to reactive */
export function pushList<
  T extends Array<any>,
  P extends Paths<T>,
  V extends PathTarget<T, P>
>(values: V[]): Reactive<T> {
  // @ts-expect-error
  $reactive = ($reactive || this) as Reactive<T>
  return insertList(-1, values)
}

/** remove item at given index from array */
export function remove<T extends Array<any>>(_index: number, count = 1): Reactive<T> {
  // @ts-expect-error
  const state = ($reactive || this) as Reactive<T>
  const path = $path

  // remove at path
  if (path) {
    const arr = valueAt(state.value, path)
    const index = _index < 0 ? arr.length + _index : _index

    if (state.mutable) {
      arr.splice(index, count)
    } else {
      state.value = immutativeSet(
        state.value,
        path,
        immutativeRemove(arr as Array<any>, index, count)
      )
    }
  }

  // remove on root
  else {
    const index = _index < 0 ? state.value.length + _index : _index

    if (state.mutable) {
      state.value.splice(index, count)
    } else {
      state.value = immutativeRemove(state.value, index, count)
    }

    if (state.subs[LIST_PHASE]) {
      state.subs[LIST_PHASE].forEach((cb) => cb('remove', index, count))
    }
  }

  $path = null
  $reactive = null
  invalidate(state)
  return state
}

/** remove items from end of array */
export function pop<T extends Array<any>>(count = 1) {
  // @ts-expect-error
  $reactive = ($reactive || this) as Reactive<T>
  return remove(-1 * count, count)
}

/** clear array */
export function clear<T extends any[]>(): Reactive<T> {
  // @ts-expect-error
  const state = ($reactive || this) as Reactive<T>
  const path = $path

  // deep clear
  if (path) {
    if (state.mutable) {
      const [target, key] = targetKey(state.value, path)
      if (target[key].length !== 0) {
        target[key] = []
        invalidate(state)
      }
    } else {
      if (state.value.length !== 0) {
        state.value = immutativeSet(state.value, path, [])
        invalidate(state)
      }
    }
  }

  // clear at root
  else {
    if (state.value.length !== 0) {
      state.value = [] as never as T
      if (state.subs[LIST_PHASE]) {
        state.subs[LIST_PHASE].forEach((cb) => cb('clear'))
      }
      invalidate(state)
    }
  }

  $path = null
  $reactive = null

  return state
}

/** swap values at given indexes */
export function swap<T extends Array<any>>(i: number, j: number): Reactive<T> {
  // @ts-expect-error
  const state = ($reactive || this) as Reactive<T>
  const path = $path

  if (path) {
    // deep swap
    const arr = valueAt(state.value, path)

    if (state.mutable) {
      // mutative deep swap
      mutativeSwap(arr, i, j)
    } else {
      // immutative deep swap
      const arr = valueAt(state.value, path)
      state.value = immutativeSet($reactive, path, immutativeSwap(arr as any[], i, j))
    }
  } else {
    // shallow swap
    if (state.mutable) {
      // mutative shallow swap
      mutativeSwap(state.value, i, j)
    } else {
      // immutative shallow swap
      state.value = immutativeSwap(state.value, i, j)
    }

    if (state.subs[LIST_PHASE]) {
      state.subs[LIST_PHASE].forEach((cb) => cb('swap', i, j))
    }
  }

  $path = null
  $reactive = null

  return state
}

export const reactiveMethods = {
  set,
  insert,
  insertList,
  remove,
  push,
  pushList,
  swap,
  clear,
  perform,
  pop
}

/** target given path in reactive value */
export function $<T, P extends Paths<T>>(
  this: Reactive<T>,
  ...path: P
): ReactiveMethods<T, P> {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  $reactive = this
  // @ts-expect-error
  $path = path
  // @ts-expect-error
  return reactiveMethods
}
