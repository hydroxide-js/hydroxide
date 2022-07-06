import { Context, ListProps, Reactive } from 'hydroxide'
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
  context: Context
  el: HTMLElement
  value: Reactive<T>
}

export type ListInfo<T> = {
  list: ListItem<T>[] // @TODO remove this
  context: Context | null
  props: ListProps<T>
  parent: HTMLElement
  prevValue: T[]
  currentValue: T[]
}