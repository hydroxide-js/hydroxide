import { ListInfo } from '../../types'

export function removeFromList<T>(
  removeAt: number,
  count: number,
  listInfo: ListInfo<T>
) {
  if (DEV && removeAt >= listInfo.list.length) {
    throw new Error(
      `Index out of bounds: Can not remove at index ${removeAt} in a list of length ${listInfo.list.length}`
    )
  }

  if (count === listInfo.list.length) {
    clearList(listInfo)
    return
  }

  for (let i = removeAt; i < removeAt + count; i++) {
    const listItem = listInfo.list[i]
    if (listItem.context.onDisconnect) {
      listItem.context.onDisconnect.forEach((cb) => cb())
    }

    listItem.el.remove()
  }

  listInfo.list.splice(removeAt, count)
}

export function clearList<T>(listInfo: ListInfo<T>) {
  const len = listInfo.list.length

  // disconnect all items
  for (let i = 0; i < len; i++) {
    const context = listInfo.list[i].context
    if (context.onDisconnect) {
      context.onDisconnect.forEach((cb) => cb())
    }
  }

  // update list
  listInfo.list = []

  // update dom
  listInfo.parent.textContent = ''
}