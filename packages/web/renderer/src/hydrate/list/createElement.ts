import { Reactive, Context, coreInfo, reactive } from 'hydroxide'
import { ListInfo, ListItem } from '../../types'

export function createListItem<T>(
  value: T,
  listInfo: ListInfo<T>,
  index: number
): ListItem<T> {
  const elContext: Context = { isConnected: true }

  const parentContext = coreInfo.context
  coreInfo.context = elContext

  const reactiveValue = reactive(value)
  let reactiveIndex: Reactive<number>

  if (listInfo.indexed) {
    reactiveIndex = reactive(index)
  }

  const element = listInfo.props.as(reactiveValue, reactiveIndex!) as HTMLElement

  if (elContext.onConnect) {
    elContext.onConnect.forEach(cb => cb())
  }

  coreInfo.context = parentContext

  const listItemInfo: ListItem<T> = {
    el: element,
    value: reactiveValue,
    context: elContext
  }

  if (listInfo.indexed) {
    listItemInfo.index = reactiveIndex!
  }

  return listItemInfo
}
