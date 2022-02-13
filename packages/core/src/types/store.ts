import { ComponentContext } from '../context'
import { GlobalInfo } from '../globalInfo'
import { Phases } from '../phases'
import { Reactive } from '../store/reactive'
import { ArrayOperations } from './arrayOps'

export type Subscription = {
  (dirty?: Dirty): any
  phase?: Phases
  context?: ComponentContext | null
}

export type Subs = {
  [K: string]: Subs
} & {
  _self?: Set<Subscription>
}

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
  context: GlobalInfo['context']
}

export type StorePath = (string | number)[]
