import { globalInfo } from '..'
import { scheduleFlush } from '../scheduler'
import { Paths, PathTarget } from '../types/path'
import { Store, StorePath, Subs, Subscription } from '../types/store'
import { computed } from './computed'
import { markDirty } from './dirty'
import { tracker } from './tracker'
import { drill, getter, setter } from './utils'

export class Reactive<T> {
  /** @internal */
  _: {
    store: Store
    path: StorePath
    subs?: Subs
  }

  constructor(store: Store, path: StorePath) {
    this._ = {
      store,
      path
    }
  }

  get val(): T {
    if (tracker.enabled) {
      tracker.reactivesUsed.add(this)
    }
    // @ts-ignore
    return getter(this._.store.value, this._.path)
  }

  set val(newVal: T) {
    const { store, path } = this._
    const { value, dirty } = store

    if (path.length === 0) {
      store.value = newVal
    } else {
      // @ts-ignore
      setter(value, path, newVal)
    }

    markDirty(dirty, path)
    scheduleFlush(this._.store)
  }

  $<P extends Paths<T>>(...path: P): Reactive<PathTarget<T, P>> {
    const totalPath = [...this._.path, ...path] as StorePath

    const key = totalPath.join('/')
    const { store } = this._

    // check in memo
    if (key in store.slices) {
      return store.slices[key]
    }

    // store in memo and return
    return (store.slices[key] = new Reactive(this._.store, totalPath))
  }

  subscribe(callback: Subscription, callNow = false) {
    const { subs } = this._

    // short cut
    if (subs) {
      subs._self!.add(callback)
    } else {
      const { store, path } = this._
      const subs = drill(store.subs, path)!
      this._.subs = subs

      if (!subs._self) {
        subs._self = new Set()
      }

      subs._self.add(callback)
    }

    if (callNow) callback()
  }

  unsubscribe(callback: Subscription) {
    const { subs } = this._
    subs?._self!.delete(callback)
  }
}

export const createReactive = <T>(value: T): Reactive<T> => {
  const store: Store = {
    value,
    dirty: {},
    subs: {},
    slices: {},
    context: globalInfo.context
  }

  return new Reactive(store, []) as Reactive<T>
}

export function $<T>(value: T | (() => T)) {
  if (typeof value === 'function') {
    return computed(value as () => T)
  } else {
    return createReactive(value)
  }
}

export function isReactive(value: any): value is Reactive<any> {
  return value instanceof Reactive
}
