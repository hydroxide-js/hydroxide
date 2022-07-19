import { ListInfo } from '../../types'
import { insertToList } from './insertToList'
import { reconcile } from './reconcile'
import { clearList, removeFromList } from './removeFromList'
import { swapInList } from './swapInList'

export function patchList<T>(listInfo: ListInfo<T>) {
  const currentValue = listInfo.currentValue

  // TODO: instead of storing actions - directly perform the actions ??
  const actions = reconcile(listInfo.prevValue, currentValue)

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i]

    // remove
    if ('removeAt' in action) {
      removeFromList(action.removeAt, action.count, listInfo)
    }

    // insert
    else if ('insertAt' in action) {
      const [startIndex, endIndex = startIndex] = action.indexes

      const values = []
      // keep removing at 'removeAt' index c times
      for (let c = startIndex; c <= endIndex; c++) {
        values.push(currentValue[c])
      }

      insertToList(action.insertAt, values, listInfo)
    }

    // swap
    else if ('swap' in action) {
      const [i, j] = action.swap
      swapInList(i, j, listInfo)
    }

    // replace
    // current replace just updates the item reactive
    // but it may not be a proper "keyed" solution
    else if ('replace' in action) {
      const [oldIndex, newValueIndex] = action.replace
      const valueReactive = listInfo.list[oldIndex as number].value
      const newValue = listInfo.currentValue[newValueIndex]
      valueReactive.set(newValue)
    }

    // clear
    else if ('clear' in action) {
      clearList(listInfo)
    }
  }
}
