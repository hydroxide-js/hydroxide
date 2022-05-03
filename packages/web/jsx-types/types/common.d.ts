import { Reactive } from '@nuejs/core'

export type Booleanish = boolean | 'true' | 'false'

export type EventHandler<T> = (event: Event & { target: T }) => void

export type numOrStr = number | string

type ValueOrReactive<T> = T extends undefined
  ? undefined
  : T extends Function
  ? Function
  : T extends Reactive<any>
  ? T
  : T | Reactive<T>

type ValueOrReactiveKeys<T> = {
  [K in keyof T]: ValueOrReactive<T[K]>
}

export type ValueOrReactiveCollection<T> = {
  [K in keyof T]: ValueOrReactiveKeys<T[K]>
}

export interface FrameWorkAttributes {
  '$:if'?: Reactive<any>
  '$:else-if'?: Reactive<any>
  '$:else'?: undefined
}
