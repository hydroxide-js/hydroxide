import { isDEV } from '../../env'
import { ListInfo } from '../../types'

export function removeFromList<T>(
  removeAt: number,
  count: number,
  listInfo: ListInfo<T>
) {
  if (isDEV && removeAt >= listInfo.prevValue.length) {
    throw new Error(
      `Index out of bounds: Can not remove at index ${removeAt} in a list of length ${listInfo.prevValue.length}`
    )
  }

  const children = listInfo.parent.children

  for (let i = removeAt; i < removeAt + count; i++) {
    // @ts-expect-error
    children[i].$$context.disconnect()
    children[i].remove()
  }
}

export function clearList<T>(listInfo: ListInfo<T>) {
  listInfo.parent.textContent = ''
  const children = listInfo.parent.children
  const len = children.length
  for (let i = 0; i < len; i++) {
    // @ts-expect-error
    children[i].$$context.disconnect()
  }
}
