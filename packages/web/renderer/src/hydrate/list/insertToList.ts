import { ListInfo, ListItem } from '../../types'
import { createListItem } from './createElement'

export function insertToList<T>(index: number, values: T[], listInfo: ListInfo<T>) {
  const listLength = listInfo.list.length

  if (DEV && index > listLength) {
    throw new Error(
      `Index out of bounds: Can not insert at index ${index} in a list of length ${listLength}`
    )
  }

  // append if inserting at the end
  if (index === listLength || listLength === 0) {
    return append(values, listInfo)
  }

  // else insert
  const itemsToInsert = new Array(values.length) as ListItem<T>[]

  const target = listInfo.list[index].el

  for (let i = 0; i < values.length; i++) {
    const listItem = createListItem(values[i], listInfo)
    listInfo.parent.insertBefore(listItem.el, target)
    itemsToInsert[i] = listItem
  }

  listInfo.list.splice(index, 0, ...itemsToInsert)
}

function append<T>(values: T[], listInfo: ListInfo<T>) {
  const len = listInfo.list.length
  for (let i = 0; i < values.length; i++) {
    const listItem = createListItem(values[i], listInfo)
    listInfo.parent!.appendChild(listItem.el)
    listInfo.list[len + i] = listItem
  }
}
