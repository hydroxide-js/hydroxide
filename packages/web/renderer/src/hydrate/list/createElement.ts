import { Context, coreInfo, reactive } from 'hydroxide'
import { ListInfo, ListItem } from '../../types'

export function createListItem<T>(value: T, listInfo: ListInfo<T>): ListItem<T> {
  const elContext: Context = { isConnected: true }

  const parentContext = coreInfo.context
  coreInfo.context = elContext

  const reactiveValue = reactive(value)
  const element = listInfo.props.children(reactiveValue) as HTMLElement

  if (elContext.onConnect) {
    elContext.onConnect.forEach(cb => cb())
  }

  coreInfo.context = parentContext

  return {
    el: element,
    value: reactiveValue,
    context: elContext
  }
}
