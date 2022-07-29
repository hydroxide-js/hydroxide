import { Reactive, Slice } from 'hydroxide'

export type Booleanish = boolean | 'true' | 'false'

export type EventHandler<T> = (event: Event & { target: T }) => void

export type CallbackTuple<V = any> = [fn: (arg: V, event: Event) => any, arg: V]

export type numOrStr = number | string

export type Ref<T> = { current: T }

export type SpecialAttributes<T> = {
  if?: boolean
  'else-if'?: boolean
  else?: true
  ref?: Ref<T>
}

export type BindAttributes = {
  /** node.value binding  */
  'bind-value'?: Reactive<string> | Reactive<number> | Slice<string> | Slice<number>

  /** node.checked binding  */
  'bind-checked'?: Reactive<boolean> | Slice<true> | Slice<false> | Slice<boolean>
}
