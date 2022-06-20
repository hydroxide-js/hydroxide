declare global {
  // eslint-disable-next-line no-var
  var DEV: boolean
  // eslint-disable-next-line no-var
  var HX_DEV: boolean
  // eslint-disable-next-line no-var
  var PERF_TESTING: boolean
}

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

export const enum Phase {
  listUpdate,
  connection,
  render,
  effect
}

export type Subs = {
  [Phase.listUpdate]?: Set<Function> // run list update effects
  [Phase.connection]?: Set<Function> // udpate conditions, computed states
  [Phase.render]?: Set<Function> // update dom (text and attributes)
  [Phase.effect]?: Set<Function> // run effects
}

export type Reactive<T = any> = {
  (): T
  value: T
  subs: Subs
  context: Context | null
  updateCount: number
  mutable?: boolean
  $: <P extends Paths<T>>(...path: P) => ReactiveMethods<T, P>
} & ReactiveMethods<T, []>

export type Computed<T = any> = {
  (): T
  deps: Set<Reactive>
  value: T
}

export type Updator<T> = (currentValue: T) => T

export type ReactiveSet<T, P, V = PathTarget<T, P>> = (newValue: V) => void

export type ReactivePerform<T, P, V = PathTarget<T, P>> = (
  newValue: (currentVal: V) => V
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

export type arrayOpHandler =
  | ((type: 'set', path: (number | string)[] | null, value: any) => void)
  | ((type: 'insert', index: number, values: any[]) => void)
  | ((type: 'remove', index: number, count: number) => void)
  | ((type: 'clear') => void)
  | ((type: 'swap', i: number, j: number) => void)

export type ReactiveClear = () => void
export type ReactivePushList<T, P> = (values: Item<PathTarget<T, P>>[]) => void
export type ReactivePush<T, P> = (value: Item<PathTarget<T, P>>) => void
export type ReactiveRemove = (index: number, count?: number) => void
export type ReactivePop = (count?: number) => void
export type ReactiveSwap = (i: number, j: number) => void

export type ReactiveArrayMethods<T, P> = PathTarget<T, P> extends Array<any>
  ? {
      insert: ReactiveInsert<T, P>
      insertList: ReactiveInsertList<T, P>
      remove: ReactiveRemove
      swap: ReactiveSwap
      push: ReactivePush<T, P>
      pushList: ReactivePushList<T, P>
      clear: ReactiveClear
      pop: ReactivePop
    }
  : {}

export type ReactiveMethods<T, P> = {
  set: ReactiveSet<T, P>
  perform: ReactivePerform<T, P>
} & ReactiveArrayMethods<T, P>

/** Context is only created for
 * 1. root element rendering
 * 2. conditional rendering
 * 3. list rendering
 *
 * context allows us to
 * - detect non local dependencies so that we can unsubscribe from non local dependencies when the context is disposed
 */
export type Context = {
  /** tasks to be performed after the component is connected */
  onConnect?: Function[]
  /** tasks to be performed after the component is disconnected */
  onDisconnect?: Function[]
  /** tasks to be performed after the component throws an error */
  onError?: Function[]
  /** flag indicating whether this context is connected or not */
  isConnected: boolean
}

export type GlobalInfo = {
  context: null | Context
  detectorEnabled: boolean
  detected: Set<Reactive>
}

export type EffectInfo = {
  deps: Set<Reactive>
}
