import { ListInfo } from '../../types'
import { insertToList } from './insert'
import { reconcile } from './reconcile'
import { clearList, removeFromList } from './remove'
import { swapInList } from './swap'

export function patchList<T>(listInfo: ListInfo<T>) {
  console.warn('patching')
  const currentValue = listInfo.currentValue
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
      // debugger
      const [oldIndex, newValueIndex] = action.replace
      // @ts-expect-error
      const valueReactive = listInfo.parent.children[oldIndex as number].$$value
      const newValue = listInfo.currentValue[newValueIndex]

      // @ts-expect-error
      $(valueReactive).set(newValue)
    }

    // clear
    else if ('clear' in action) {
      clearList(listInfo)
    }
  }
}
