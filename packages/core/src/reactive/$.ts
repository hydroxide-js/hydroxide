import { Paths, PathTarget } from '../types/path'
import { Reactive } from '../types/reactive'
import { ArrayOp, Subs } from '../types/others'
import { mutativeSwap } from '../utils/mutativeSwap'
import { targetKey, valueAt } from '../utils/targetKey'
import {
  immutativeInsert,
  immutativeRemove,
  immutativeSet,
  immutativeSwap
} from './immutable'
import { invalidate, LIST_PHASE } from './scheduler'
import { coreInfo } from '../index'
import { validateSwapArgs } from '../dev/invalidReactiveArgs'

class Updator<T, P extends Paths<T>> {
  reactive: Reactive<T>
  path: P

  constructor(reactive: Reactive<T>, path: P) {
    this.reactive = reactive
    this.path = path
  }

  set<V extends PathTarget<T, P>>(newValue: V) {
    const state = this.reactive
    const path = this.path

    if (state.mutable) {
      const lastIndex = path.length - 1
      let target: any = state.value
      for (let i = 0; i < lastIndex; i++) {
        target = target[path[i]]
      }

      if (newValue === target[path[lastIndex]]) return
      target[path[lastIndex]] = newValue
    } else {
      state.value = immutativeSet(state.value, path, newValue)
    }

    if (state.subs[LIST_PHASE]) {
      state.subs[LIST_PHASE].forEach(cb => {
        ;(cb as ArrayOp.Set)('set', path, newValue)
      })
    }

    invalidate(state)
  }

  do<V extends PathTarget<T, P>>(transformer: (oldValue: V) => V) {
    const oldValue = valueAt(this.reactive.value, this.path)
    const newValue = transformer(oldValue as V)
    if (oldValue === newValue) return
    this.set(newValue)
  }

  insertList<V extends PathTarget<T, P>>(index: number, values: V[]) {
    const { reactive, path } = this
    const arr = valueAt(reactive.value, path) as any[]

    if (DEV && !Array.isArray(arr)) {
      throw new Error(`${path} does not target an array `)
    }

    const i = index < 0 ? arr.length + index + 1 : index
    if (reactive.mutable) {
      arr.splice(i, 0, ...values)
    } else {
      reactive.value = immutativeSet(
        reactive.value,
        path,
        immutativeInsert(arr, i, values)
      )
    }
    invalidate(reactive)
  }

  remove(index: number, count = 1) {
    const { reactive, path } = this
    const arr = valueAt(reactive.value, path) as any[]

    if (DEV && !Array.isArray(arr)) {
      throw new Error(`${path} does not target an array `)
    }

    const i = index < 0 ? arr.length + index : index

    if (reactive.mutable) {
      arr.splice(i, count)
    } else {
      reactive.value = immutativeSet(
        reactive.value,
        path,
        immutativeRemove(arr as Array<any>, i, count)
      )
    }

    invalidate(reactive)
  }

  insert<V extends PathTarget<T, P>>(index: number, value: V) {
    this.insertList(index, [value])
  }

  clear() {
    const state = this.reactive
    const path = this.path
    const [target, key] = targetKey(state.value, path)
    const value = target[key] as any[]

    if (DEV && !Array.isArray(value)) {
      throw new Error(`${path} does not target an array `)
    }

    if (value.length === 0) return

    if (state.mutable) {
      target[key] = []
    } else {
      state.value = immutativeSet(value, path, [])
    }

    invalidate(state)
  }

  swap(i: number, j: number) {
    const state = this.reactive
    const path = this.path

    // deep swap
    const arr = valueAt(state.value, path)

    if (DEV && !Array.isArray(arr)) {
      throw new Error(`${path} does not target an array `)
    }

    if (state.mutable) {
      // mutative deep swap
      mutativeSwap(arr, i, j)
    } else {
      // immutative deep swap
      const arr = valueAt(state.value, path)
      state.value = immutativeSet(state.value, path, immutativeSwap(arr as any[], i, j))
    }

    invalidate(state)
  }

  push<V extends PathTarget<T, P>>(value: V) {
    this.insertList(-1, [value])
  }

  pushList<V extends PathTarget<T, P>>(values: V[]) {
    this.insertList(-1, values)
  }

  pop(count = 1) {
    this.remove(-1 * count, count)
  }
}

export function set<T>(this: Reactive<T>, newValue: T) {
  const state = this
  if (newValue === state.value) return
  state.value = newValue
  if (state.subs[LIST_PHASE]) {
    state.subs[LIST_PHASE].forEach(cb => {
      ;(cb as ArrayOp.Set)('set', null, newValue)
    })
  }
  invalidate(state)
}

export function _do<T>(this: Reactive<T>, transformer: (oldValue: T) => T): void {
  const newValue = transformer(this.value)
  if (this.value === newValue) return
  this.set(newValue)
}

export function insertList<T>(this: Reactive<T[]>, index: number, values: T[]): void {
  const state = this
  const i = index < 0 ? this.value.length + index + 1 : index

  if (state.mutable) {
    state.value.splice(i, 0, ...values)
  } else {
    state.value = immutativeInsert(state.value, i, values)
  }

  if (state.subs[LIST_PHASE]) {
    state.subs[LIST_PHASE].forEach(cb => {
      ;(cb as ArrayOp.Insert)('insert', i, values)
    })
  }

  invalidate(state)
}

export function remove<T>(this: Reactive<T[]>, index: number, count = 1): void {
  const state = this
  const i = index < 0 ? state.value.length + index : index

  if (state.mutable) {
    state.value.splice(i, count)
  } else {
    state.value = immutativeRemove(state.value, i, count)
  }

  if (state.subs[LIST_PHASE]) {
    state.subs[LIST_PHASE].forEach(cb => {
      ;(cb as ArrayOp.Remove)('remove', i, count)
    })
  }

  invalidate(state)
}

export function insert<T>(this: Reactive<T[]>, index: number, value: T): void {
  this.insertList(index, [value])
}

export function push<T>(this: Reactive<T[]>, value: T): void {
  this.insertList(-1, [value])
}

export function pushList<T>(this: Reactive<T[]>, values: T[]): void {
  this.insertList(-1, values)
}

export function pop<T>(this: Reactive<T[]>, count = 1) {
  this.remove(-1 * count, count)
}

export function clear<T>(this: Reactive<T[]>): void {
  const state = this
  if (state.value.length === 0) return

  state.value = []

  if (state.subs[LIST_PHASE]) {
    state.subs[LIST_PHASE].forEach(cb => {
      ;(cb as ArrayOp.Clear)('clear')
    })
  }

  invalidate(state)
}

export function swap<T>(this: Reactive<T[]>, i: number, j: number) {
  const state = this

  if (DEV) {
    validateSwapArgs(state(), i, j)
  }

  if (state.mutable) {
    mutativeSwap(state.value, i, j)
  } else {
    state.value = immutativeSwap(state.value, i, j)
  }

  if (state.subs[LIST_PHASE]) {
    state.subs[LIST_PHASE].forEach(cb => {
      ;(cb as ArrayOp.Swap)('swap', i, j)
    })
  }

  invalidate(state)
}

export function reactive<T>(value: T): Reactive<T> {
  // @ts-ignore
  const state: Reactive<T> = function $Reactive(...path: Paths<T>) {
    if (path.length !== 0) {
      return new Updator(state, path)
    }

    if (coreInfo.detectorEnabled) {
      // detect
      coreInfo.detected.add(state)
    }

    return state.value
  }

  state.value = value
  state.subs = new Array(4) as Subs
  state.context = coreInfo.context

  state.mutable = true
  state.set = set
  state.do = _do

  if (Array.isArray(value)) {
    // insert
    ;(state as any as Reactive<any[]>).insert = insert
    ;(state as any as Reactive<any[]>).insertList = insertList
    // remove
    ;(state as any as Reactive<any[]>).remove = remove
    // swap
    ;(state as any as Reactive<any[]>).swap = swap
    // clear
    ;(state as any as Reactive<any[]>).clear = clear
    // add end
    ;(state as any as Reactive<any[]>).push = push
    ;(state as any as Reactive<any[]>).pushList = pushList
    // remove end
    ;(state as any as Reactive<any[]>).pop = pop
  }

  return state
}
