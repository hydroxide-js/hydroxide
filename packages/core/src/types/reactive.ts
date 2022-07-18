import { Subs, Context, GenericPath } from './others'
import { Paths, PathTarget } from './path'

export namespace Methods {
  type ArrayItem<X> = X extends Array<infer V> ? V : never
  type Transform<T> = (oldValue: T) => T

  export type Do<V> = (transform: Transform<V>) => void
  export type Set<V> = (newValue: V) => void
  export type Clear = () => void
  export type PushList<V> = (values: ArrayItem<V>[]) => void
  export type Push<V> = (value: ArrayItem<V>) => void
  export type Remove = (index: number, count?: number) => void
  export type Pop = (count?: number) => void
  export type Swap = (i: number, j: number) => void
  export type Insert<V> = (index: number, value: ArrayItem<V>) => void
  export type InsertList<V> = (index: number, values: ArrayItem<V>[]) => void
}

export type ReactiveArrSlice<V> = {
  insert: Methods.Insert<V>
  insertList: Methods.InsertList<V>
  remove: Methods.Remove
  swap: Methods.Swap
  push: Methods.Push<V>
  pushList: Methods.PushList<V>
  clear: Methods.Clear
  pop: Methods.Pop
}

export type ReactiveSlice<V> = {
  reactive: Reactive<any>
  path: GenericPath
  set: Methods.Set<V>
  do: Methods.Do<V>
} & (V extends Array<any> ? ReactiveArrSlice<V> : {})

export type Reactive<T> = {
  (): T
  <P extends Paths<T>>(...path: P): ReactiveSlice<PathTarget<T, P>>
  value: T
  subs: Subs
  context: Context | null
  mutable: boolean
} & ReactiveSlice<T>

export type ReadonlyReactive<T> = {
  (): T
  value: T
  subs: Subs
  context: Context | null
}
