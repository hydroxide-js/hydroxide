import { Dirty } from './store'

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
