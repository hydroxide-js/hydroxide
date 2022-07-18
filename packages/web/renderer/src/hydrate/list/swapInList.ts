import { ListInfo } from '../../types'

const tempComment = document.createComment('')

export function swapInList<T>(i: number, j: number, listInfo: ListInfo<T>) {
  const list = listInfo.list

  const el1 = list[i].el
  const el2 = list[j].el

  const temp = list[i]
  list[i] = list[j]
  list[j] = temp

  el2.replaceWith(tempComment)
  el1.replaceWith(el2)
  tempComment.replaceWith(el1)

  // fix indexes
  if (listInfo.indexed) {
    list[i].index!.set(i)
    list[j].index!.set(j)
  }
}
