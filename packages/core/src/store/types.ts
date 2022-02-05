import { Reactive } from './reactive'

const enum Phase {
  computed,
  connection,
  dom
}

export type Subscription = {
  (dirty?: Dirty): any
  phase?: Phase
}

export type Subs = {
  [K: string]: Subs
} & {
  _self?: Set<Subscription>
}

type ArrayInsert = {
  insert: number
  values: any[]
}

type ArrayRemove = {
  remove: number
  count: number
}

type ArrayKeyMutation = {
  key: number
  dirty: Dirty
}

export type ArrayOperations = ArrayKeyMutation | ArrayInsert | ArrayRemove

export type Dirty = {
  [K: string]: Dirty
} & {
  _assign?: true
  _arr?: ArrayOperations[]
}

export type Store = {
  value: any
  subs: Subs
  dirty: Dirty
  slices: Record<string, Reactive<any>>
}

export type StorePath = (string | number)[]

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
    | (Paths<T[K], Prev[D]> extends infer P ? (P extends [] ? never : Cons<K, P>) : never)
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
