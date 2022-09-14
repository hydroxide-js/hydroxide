import { Context, GenericPath, AnyArrayOp } from './others'
import { Paths, PathTarget } from './path'

export namespace Methods {
  type ArrayItem<X> = X extends Array<infer V> ? V : never
  type Transform<T> = (oldValue: T) => T
  type Setter<T> = (newValue: T) => void

  export type Do<V> = (transform: Transform<V>) => void
  export type Set<V> = Setter<V>
  export type Clear = () => void
  export type PushList<V> = (values: ArrayItem<V>[]) => void
  export type Push<V> = (value: ArrayItem<V>) => void
  export type Remove = (index: number, count?: number) => void
  export type Pop = (count?: number) => void
  export type Swap = (i: number, j: number) => void
  export type Insert<V> = (index: number, value: ArrayItem<V>) => void
  export type InsertList<V> = (index: number, values: ArrayItem<V>[]) => void
}

type ArrayMethods<V> = {
  insert: Methods.Insert<V>
  insertList: Methods.InsertList<V>
  remove: Methods.Remove
  swap: Methods.Swap
  push: Methods.Push<V>
  pushList: Methods.PushList<V>
  clear: Methods.Clear
  pop: Methods.Pop
  /** @internal */
  listInvalidator?: (cb: AnyArrayOp) => void
}

type Methods<V> = {
  set: Methods.Set<V>
  do: Methods.Do<V>
} & (V extends any[] ? ArrayMethods<V> : {})

export type Slice<V> = {
  reactive: Reactive<any>
  path: GenericPath
} & Methods<V>

export type PhaseSubs = {
  // subscriptions
  0?: Set<Function> // data
  1?: Set<Function> // list
  2?: Set<Function> // connection
  3?: Set<Function> // render
  4?: Set<Function> // user-effect
}

export type Reactive<T> = {
  (): T
  <P extends Paths<T>>(...path: P): Slice<PathTarget<T, P>>
  value: T
  context: Context | null
  mutable: boolean
} & Methods<T> &
  PhaseSubs

export type ReadonlyReactive<T> = {
  (): T
  value: T
  context: Context | null
} & PhaseSubs
