import { isDEV } from '../../env'
import { ListInfo } from '../../types'
import { createElement } from './createElement'

export function insertToList<T>(
  index: number,
  values: T[],
  listInfo: ListInfo<T>
) {
  const listLength = listInfo.prevValue.length

  if (isDEV && index > listLength) {
    throw new Error(
      `Index out of bounds: Can not insert at index ${index} in a list of length ${listLength}`
    )
  }

  if (index === listLength || index === 0) {
    return append(values, listInfo)
  }

  const targetEl = listInfo.parent.children[index]

  for (let i = 0; i < listLength; i++) {
    const element = createElement(values[i], listInfo)
    listInfo.parent.insertBefore(targetEl, element)
  }
}

function append<T>(values: T[], listInfo: ListInfo<T>) {
  for (let i = 0; i < values.length; i++) {
    const element = createElement(values[i], listInfo)
    listInfo.parent!.appendChild(element)
  }
}
