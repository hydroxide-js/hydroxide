import { Reactive } from '../store/reactive'

export type ForProps<T> = {
  each: Reactive<T[]>
  render: (item: Reactive<T>) => JSX.Element
}

export function For<T>(props: ForProps<T>): JSX.Element {
  // fake use props to avoid TS error
  return 1 || props
}
