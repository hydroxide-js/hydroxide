import type { ComponentContext } from '../context'
import { globalInfo } from '../globalInfo'
import { flush } from '../hooks/flush'
import { Phases } from '../scheduler/phases'
import { scheduleFlush } from '../scheduler/scheduleFlush'
import type { Paths, PathTarget } from '../types/path'
import type { Store, StorePath, Subs, Subscription } from '../types/store'
import { computed } from './computed'
import { markDirty } from './dirty'
import { subscribe } from './subscribe'
import { tracker } from './tracker'
import { getter, setter } from './utils'

export class Reactive<T = any> {
  /** @internal */
  _: {
    ignore: boolean
    store: Store
    path: StorePath
    subs?: Subs
    isDirty: boolean
  }

  constructor(store: Store, path: StorePath) {
    this._ = {
      ignore: false,
      store,
      path,
      isDirty: false
    }
  }

  get value(): T {
    if (tracker.enabled) {
      tracker.reactivesUsed.add(this)
    }

    if (this._.path.length === 0) return this._.store.value

    // TODO: is there a way to memoize this?
    // @ts-ignore
    return getter(this._.store.value, this._.path)
  }

  set value(newVal: T) {
    // ignore if newVal is same as current value
    if (newVal === this._.store.value) return

    const { store, path } = this._
    const { value, dirty } = store

    if (path.length === 0) {
      store.value = newVal
    } else {
      setter(value, path, newVal)
    }

    if (this._.ignore) return

    // it not marked as dirty, mark as dirty
    if (!this._.isDirty) {
      this._.isDirty = true
      flush().then(() => {
        this._.isDirty = false
      })
      markDirty(dirty, path)
      scheduleFlush(this._.store)
    }
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

  subscribe(
    callback: Subscription,
    callNow = true,
    phase: Phases = Phases.effect,
    context: ComponentContext | null = globalInfo.context
  ) {
    // add phase and context info in callback
    callback.phase = phase
    callback.context = context

    // subscribe now
    subscribe(this, callback, callNow)

    // if inside a component
    if (context) {
      // if the reactive is non-local, we could have to unsubscribe from it when component will disconnect
      // and resubscribe when the component will reconnect
      const isNonLocalReactive = this._.store.context !== context

      if (isNonLocalReactive) {
        context.connectCbs.push(() => {
          subscribe(this, callback, callNow)
        })

        context.disconnectCbs.push(() => {
          this.unsubscribe(callback)
        })
      }
    }
  }

  unsubscribe(callback: Subscription) {
    const { subs } = this._
    subs!._self!.delete(callback)
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
