import { Context, ReadonlyReactive, Reactive } from 'hydroxide'
import { JSX } from 'hydroxide-jsx'

export type CompData = [
  comp: Component<any>,
  props: any,
  reservedProps: {
    '$:ref'?: any
  }
]

export type Component<P> = (props: P) => JSX.Element

export type Branch = [condition: Function, renderer: () => HTMLElement]

export type ListItem<T> = {
  index?: Reactive<number>
  context: Context
  el: HTMLElement
  value: Reactive<T>
}

export type ListInfo<T> = {
  indexed: boolean
  dirtyIndexStart?: number
  list: ListItem<T>[] // @TODO remove this
  context: Context | null
  props: ListProps<T> | IndexedListProps<T>
  parent: HTMLElement
  prevValue: T[]
  currentValue: T[]
}

export type ListProps<T> = {
  each: Array<T>
  as: (item: ReadonlyReactive<T>) => JSX.Element
  recycle?: boolean
}

export type IndexedListProps<T> = {
  each: Array<T>
  as: (item: ReadonlyReactive<T>, index: ReadonlyReactive<number>) => JSX.Element
  recycle?: boolean
}

export type Ref<T> = { current: T }
