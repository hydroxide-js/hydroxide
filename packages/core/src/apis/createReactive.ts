import { globalInfo } from '..'
import { Reactive } from '../store/reactive'
import { ReactiveList } from '../store/reactiveList'
import { Store } from '../types/store'

export type $<T> = T extends Array<infer X> ? ReactiveList<X> : Reactive<T>

export const createReactive = <T>(value: T): $<T> => {
  const store: Store = {
    value,
    dirty: {},
    subs: {},
    slices: {},
    context: globalInfo.context
  }

  if (Array.isArray(value)) {
    return new ReactiveList(store, []) as $<T>
  } else {
    return new Reactive(store, []) as $<T>
  }
}
