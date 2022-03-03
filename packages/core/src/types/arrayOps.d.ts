import { Dirty } from './store'

type ArrayInsert = {
  insert: number
  values: any[]
}

type ArraySwap = {
  swap: [i: number, j: number]
}
type ArrayRemove = {
  remove: number
  count: number
}

type ArrayKeyMutation = {
  key: number
  dirty: Dirty
}

type ArrayClear = {
  clear: true
}

export type ArrayOperations =
  | ArrayKeyMutation
  | ArrayInsert
  | ArrayRemove
  | ArraySwap
  | ArrayClear
