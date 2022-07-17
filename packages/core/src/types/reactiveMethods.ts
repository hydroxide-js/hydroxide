import { Subs, Context } from './others'
import { Paths, PathTarget } from './path'

export namespace Methods {
  type ArrayItem<X> = X extends Array<infer V> ? V : never
  type Transform<T> = (oldValue: T) => T

  export type Do<T, P, V = PathTarget<T, P>> = (transform: Transform<V>) => void
  export type Set<T, P> = <V extends PathTarget<T, P>>(newValue: V) => void
  export type Clear = () => void
  export type PushList<T, P> = (values: ArrayItem<PathTarget<T, P>>[]) => void
  export type Push<T, P> = (value: ArrayItem<PathTarget<T, P>>) => void
  export type Remove = (index: number, count?: number) => void
  export type Pop = (count?: number) => void
  export type Swap = (i: number, j: number) => void
  export type Insert<T, P> = (index: number, value: ArrayItem<PathTarget<T, P>>) => void
  export type InsertList<T, P> = (
    index: number,
    values: ArrayItem<PathTarget<T, P>>[]
  ) => void
}

export type ReactiveArrayMethods<T, P> = PathTarget<T, P> extends Array<any>
  ? {
      insert: Methods.Insert<T, P>
      insertList: Methods.InsertList<T, P>
      remove: Methods.Remove
      swap: Methods.Swap
      push: Methods.Push<T, P>
      pushList: Methods.PushList<T, P>
      clear: Methods.Clear
      pop: Methods.Pop
    }
  : {}

export type ReactiveMethods<T, P extends Paths<T> | []> = {
  reactive: Reactive<T>
  path: P
  set: Methods.Set<T, P>
  do: Methods.Do<T, P>
} & ReactiveArrayMethods<T, P>

export type Reactive<T> = {
  (): T
  <P extends Paths<T>>(...path: P): ReactiveMethods<T, P>
  value: T
  subs: Subs
  context: Context | null
  mutable: boolean
} & ReactiveMethods<T, []>
