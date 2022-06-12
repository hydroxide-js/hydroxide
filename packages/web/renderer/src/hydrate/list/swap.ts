import { isDEV } from '../../env'
import { ListInfo } from '../../types'

let swapper: Comment
export function swapInList<T>(i: number, j: number, listInfo: ListInfo<T>) {
  const len = listInfo.prevValue.length
  if (isDEV && (i >= len || j >= len)) {
    throw new Error(
      `Index out of bounds: Can not swap indexes ${i} ${j} in a list of length ${len}`
    )
  }
  if (!swapper) {
    swapper = document.createComment('')
  }

  const children = listInfo.parent.children
  const el1 = children[i]
  const el2 = children[j]

  el2.replaceWith(swapper)
  el1.replaceWith(el2)
  swapper.replaceWith(el1)
}
