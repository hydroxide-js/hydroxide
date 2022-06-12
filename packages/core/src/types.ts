type Cons<H, T> = T extends readonly any[]
  ? ((h: H, ...t: T) => void) extends (...r: infer R) => void
    ? R
    : never
  : never

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[]
]

type PathObj<T, D extends number> = {
  [K in keyof T]-?:
    | [K]
    | (Paths<T[K], Prev[D]> extends infer P
        ? P extends []
          ? never
          : Cons<K, P>
        : never)
}

type ListOfPaths<T, D extends number> = PathObj<T, D>[keyof T] | []

export type Paths<T, D extends number = 5> = [D] extends [never]
  ? never
  : T extends object
  ? ListOfPaths<T, D>
  : []

// returns the type at given path in given object
export type PathTarget<O, P> = P extends [infer F, ...infer Rest]
  ? F extends keyof O
    ? PathTarget<O[F], Rest>
    : never
  : O

// -------

export type Path = (string | number)[]

export type Detector = {
  enabled: boolean
  detected: Set<Reactive>
}

namespace Invalidations {
  export type Set = { type: 'set'; path: Path; value: any }
  export type Insert = {
    type: 'insert'
    path: Path
    index: number
    values: any[]
  }
  export type Remove = {
    type: 'remove'
    index: number
    count: number
    path: Path
  }
  export type Swap = { type: 'swap'; i: number; j: number; path: Path }

  export type Clear = { type: 'clear'; path: Path }
}

export type AnyInvalidation =
  | Invalidations.Set
  | Invalidations.Insert
  | Invalidations.Remove
  | Invalidations.Swap
  | Invalidations.Clear

export const enum Phase {
  connection,
  render,
  effect
}

export type Subs = {
  [Phase.connection]?: Set<Function> // udpate conditions, computed states
  [Phase.render]?: Set<Function> // update dom (text and attributes)
  [Phase.effect]?: Set<Function> // run effects
}

export type Reactive<T = any> = {
  (): T
  value: T
  subs: Subs
  invalidations: AnyInvalidation[]
  context: Context | null
  updateCount: number
}

export type Computed<T = any> = {
  (): T
  deps: Set<Reactive>
  value: T
}

export type Updator<T> = (currentValue: T) => T

export type ReactiveSet<T, P, V = PathTarget<T, P>> = (
  newValue: V | ((currentVal: V) => V)
) => void

type Item<X> = X extends Array<infer V> ? V : never

export type ReactiveInsertList<T, P> = (
  index: number,
  values: Item<PathTarget<T, P>>[]
) => void

export type ReactiveInsert<T, P> = (
  index: number,
  value: Item<PathTarget<T, P>>
) => void

export type ReactivePushList<T, P> = (values: Item<PathTarget<T, P>>[]) => void
export type ReactivePush<T, P> = (value: Item<PathTarget<T, P>>) => void
export type ReactiveRemove = (index: number, count?: number) => void
export type ReactiveSwap = (i: number, j: number) => void

export type ReactiveMethods<T, P> = {
  set: ReactiveSet<T, P>
  insert: ReactiveInsert<T, P>
  insertList: ReactiveInsertList<T, P>
  remove: ReactiveRemove
  swap: ReactiveSwap
  push: ReactivePush<T, P>
  pushList: ReactivePushList<T, P>
  clear: () => void
}

export type Context = {
  onConnect?: Function[]
  onDisconnect?: Function[]
  isConnected: boolean
}

export type GlobalInfo = {
  context: null | Context
  detectorEnabled: boolean
  detected: Set<Reactive>
}
