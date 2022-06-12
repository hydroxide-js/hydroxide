import { Context, globalInfo, reactive } from 'hydroxide'
import { ListInfo } from '../../types'

export function createElement<T>(value: T, listInfo: ListInfo<T>): HTMLElement {
  const templateContext: Context = { isConnected: true }

  const prev = globalInfo.context
  globalInfo.context = templateContext

  const reactiveValue = reactive(value)
  const element = listInfo.props.children(reactiveValue) as HTMLElement

  // @ts-expect-error
  element.$$value = reactiveValue
  // @ts-expect-error
  element.$$context = templateContext

  globalInfo.context = prev

  return element
}
