import { Reactive } from '..'
import { Subscription } from '../types/store'
import { drill } from './utils'

export function subscribe(
  reactive: Reactive<any>,
  callback: Subscription,
  callNow: boolean
) {
  const { subs } = reactive._

  // short cut
  if (subs) {
    subs._self!.add(callback)
  } else {
    const { store, path } = reactive._
    const subs = drill(store.subs, path)!
    reactive._.subs = subs

    if (!subs._self) {
      subs._self = new Set()
    }

    subs._self.add(callback)
  }

  if (callNow) {
    callback()
  }
}
