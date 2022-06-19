import { ListInfo } from '../../types'

const tempComment = document.createComment('')

export function swapInList<T>(i: number, j: number, listInfo: ListInfo<T>) {
  const len = listInfo.list.length
  if (DEV && (i >= len || j >= len)) {
    throw new Error(
      `Index out of bounds: Can not swap indexes ${i} ${j} in a list of length ${len}`
    )
  }

  const el1 = listInfo.list[i].el
  const el2 = listInfo.list[j].el

  const temp = listInfo.list[i]
  listInfo.list[i] = listInfo.list[j]
  listInfo.list[j] = temp

  el2.replaceWith(tempComment)
  el1.replaceWith(el2)
  tempComment.replaceWith(el1)
}
