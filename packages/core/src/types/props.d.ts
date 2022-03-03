import { Reactive } from '../store/reactive'

export type PassableProps<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : T[K] | Reactive<T[K]>
}

export type Props<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : Reactive<NonNullable<T[K]>>
}

export type GenericPassableProps = Record<string, any>

export type GenericProps = Record<string, Function | Reactive<any>>
