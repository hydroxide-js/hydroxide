import { createReactive } from '..'
import type { ComponentContext } from '../context/ComponentContext'
import { globalInfo } from '../context/globalInfo'
import { isDEV } from '../env'
import { flush } from '../hooks/flush'
import { Phases } from '../scheduler/phases'
import { scheduleFlush } from '../scheduler/scheduleFlush'
import { updates } from '../scheduler/updates'
import type { Paths, PathTarget } from '../types/path'
import type { Store, StorePath, Subs, Subscription } from '../types/store'
import { getter } from '../utils/getter'
import { setter } from '../utils/setter'
import { markDirty } from './dirty'
import { subscribe } from './subscribe'
import { tracker } from './tracker'

const addToComputedPhase = (cb: Subscription) => {
  // @ts-ignore
  cb.callWith = newVal
  updates[Phases.computed].add(cb)
}

export class Reactive<T = any> {
  /** @internal */
  _: {
    store: Store
    path: StorePath
    subs?: Subs
    isDirty: boolean
    selectorSubs?: Map<T, Subscription[]>
  }

  track: boolean

  constructor(store: Store, path: StorePath) {
    this._ = {
      store,
      path,
      isDirty: false
    }
    this.track = true
  }

  get value(): T {
    if (tracker.enabled) {
      tracker.reactivesUsed.add(this)
    }

    const storeValue = this._.store.value

    if (this._.path.length === 0) {
      return storeValue
    }

    // @ts-ignore
    return getter(storeValue, this._.path)
  }

  set value(newVal: T) {
    const currentValue = this.value

    // ignore if newVal is same as current value
    if (newVal === currentValue) return

    const { store, path } = this._
    const { value, dirty } = store

    if (path.length === 0) {
      store.value = newVal
    } else {
      setter(value, path, newVal)
    }

    if (!this.track) return

    // it not marked as dirty, mark as dirty
    if (!this._.isDirty) {
      this._.isDirty = true
      flush().then(() => {
        this._.isDirty = false
      })
      markDirty(dirty, path)
      scheduleFlush(this._.store)
    }

    // selector subs
    if (this._.selectorSubs) {
      const currentCbs = this._.selectorSubs.get(currentValue)
      const newCbs = this._.selectorSubs.get(newVal)

      if (currentCbs) {
        currentCbs.forEach(addToComputedPhase)
      }

      if (newCbs) {
        newCbs.forEach(addToComputedPhase)
      }
    }
  }

  /**
   * create a reactive slice for given path
   */
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
    // throw error if reactive is a part of array
    if (isDEV) {
      if (this._.path.some((p) => typeof p === 'number')) {
        throw new Error(
          'Can not subscribe to a part of an array, ' +
            'because indexes are not stable keys and may get changed if array is mutated'
        )
      }
    }

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
        context.addConnectCb(() => {
          // force callNow: true when resubscribing
          subscribe(this, callback, true)
        })

        context.addDisconnectCb(() => {
          this.unsubscribe(callback)
        })
      }
    }
  }

  /**
   *
   * run the callback when reactive's value either
   * becomes this value or changes from this value to something else
   */
  is<X>(value: T, ifTrue: X, ifFalse: X) {
    const reactive = createReactive(this.value === value ? ifTrue : ifFalse)

    function update(newValue: T) {
      if (newValue === value) {
        reactive.value = ifTrue
      } else {
        reactive.value = ifFalse
      }
    }

    if (!this._.selectorSubs) {
      this._.selectorSubs = new Map()
    }

    if (!this._.selectorSubs.has(value)) {
      this._.selectorSubs.set(value, [])
    }

    // @ts-ignore
    this._.selectorSubs.get(value)!.push(update)

    // TODO: when do we remove the subscription?

    return reactive
  }

  unsubscribe(callback: Subscription) {
    const { subs } = this._
    subs!._self!.delete(callback)
  }
}
