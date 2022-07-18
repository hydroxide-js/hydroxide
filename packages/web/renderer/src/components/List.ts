import { ListProps, IndexedListProps } from '../types'
import { JSX } from 'hydroxide-jsx'

export function List<T>(props: ListProps<T>): JSX.Element {
  // @ts-expect-error
  return { $$list: props }
}

function Indexed<T>(props: IndexedListProps<T>): JSX.Element {
  // @ts-expect-error
  return { $$list: props, indexed: true }
}

List.Indexed = Indexed
