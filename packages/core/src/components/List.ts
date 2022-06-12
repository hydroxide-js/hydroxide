import { Reactive } from '../types'

export type ListProps<T> = {
  each: Array<T>
  children: (item: Reactive<T>) => JSX.Element
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export function List<T>(props: ListProps<T>): JSX.Element {
  // @ts-expect-error
  return { $$list: props }
}
