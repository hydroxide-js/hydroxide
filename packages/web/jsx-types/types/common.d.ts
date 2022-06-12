export type Booleanish = boolean | 'true' | 'false'

export type EventHandler<T> = (event: Event & { target: T }) => void

export type CallbackTuple<V = any> = [fn: (arg: V, event: Event) => any, arg: V]

export type numOrStr = number | string

export interface ConditionAttributes {
  '$:if'?: boolean
  '$:else-if'?: boolean
  '$:else'?: true
}
