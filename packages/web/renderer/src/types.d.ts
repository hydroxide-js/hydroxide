import { Context, ListProps, Reactive } from 'hydroxide'

export type CompData = [
  comp: Component<any>,
  props: any,
  reservedProps: {
    '$:ref'?: any
  }
]

export type Component<P> = (props: P) => JSX.Element

export type Branch = [
  condition: Function,
  renderer: () => HTMLElement | CompData
]

export type ListItem<T> = {
  context: Context
  el: HTMLElement
  value: Reactive<T>
}

export type ListInfo<T> = {
  context: Context | null
  props: ListProps<T>
  parent: HTMLElement
  prevValue: T[]
  currentValue: T[]
}
