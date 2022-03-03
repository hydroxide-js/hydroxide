import { Subscription } from '../types/store'
import { drill } from '../utils/drill'
import type { Reactive } from './reactive'

export function subscribe(
  reactive: Reactive<any>,
  callback: Subscription,
  callNow: boolean
) {
  // if subs have not been saved yet
  if (!reactive._.subs) {
    const { store, path } = reactive._
    const subs = drill(store.subs, path)!

    if (!subs._self) {
      subs._self = new Set()
    }

    reactive._.subs = subs
  }

  reactive._.subs!._self!.add(callback)

  if (callNow) {
    callback()
  }
}
