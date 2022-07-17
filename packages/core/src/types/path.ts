type Merge<Head, Tail> = Tail extends any[] ? [Head, ...Tail] : never

type Prefix<Key extends keyof T, T> = Paths<T[Key]> extends infer P
  ? Merge<Key, P>
  : never

type PathObj<T> = {
  [Key in keyof T]-?: [Key] | Prefix<Key, T>
}

type ObjPaths<Obj> = PathObj<Obj>[keyof Obj]
type ArrPaths<V> = Paths<V> extends infer Path ? [number] | Merge<number, Path> : never

export type Paths<T> =
  // if array
  T extends (infer V)[]
    ? ArrPaths<V>
    : // if object
    T extends object
    ? ObjPaths<T>
    : // else
      []

export type PathTarget<O, P> = P extends [infer F, ...infer Rest]
  ? F extends keyof O
    ? PathTarget<O[F], Rest>
    : never
  : O
