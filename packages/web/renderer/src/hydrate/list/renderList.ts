import { detect, globalInfo, ListProps, Phase, subscribe } from 'hydroxide'
import { isDEV } from '../../env'
import { ListInfo } from '../../types'
import { insertToList } from './insert'
import { patchList } from './patch'
import { clearList, removeFromList } from './remove'
import { swapInList } from './swap'
import { updateElement } from './updateElement'

export function $list<T>(marker: Comment, listProps: ListProps<T>) {
  const parent = marker.parentElement

  if (isDEV && (!parent || parent.childNodes.length !== 1)) {
    throw new Error(
      '<List> must be wrapped in a container element and should not have any siblings, example: <div> <List> </div>'
    )
  }
  marker.remove()

  const listInfo: ListInfo<T> = {
    context: globalInfo.context,
    props: listProps,
    parent: parent!,
    prevValue: [],
    currentValue: []
  }

  const [deps, initArrValue] = detect(() => listProps.each)

  listInfo.prevValue = initArrValue
  insertToList(0, initArrValue, listInfo)

  // if dependency is on single array reactive
  // and both have the same value
  // then it means that reactive array is directly used for rendering list
  // in that case, we don't need to do array diffing and just use the mutation methods

  if (deps.size === 1) {
    // get the first value in set
    const rootState = deps.values().next().value

    const arrayReactiveValue = rootState() as T[]
    const diffOnly = arrayReactiveValue !== initArrValue

    function handleUpdate() {
      // get new value
      listInfo.currentValue = listProps.each

      if (listInfo.currentValue === listInfo.prevValue) {
        return
      }

      const totalInvalidations = rootState.invalidations.length

      // patch
      if (diffOnly) {
        patchList(listInfo)
      }

      // no diff
      else {
        for (let i = 0; i < totalInvalidations; i++) {
          const inv = rootState.invalidations[i]

          switch (inv.type) {
            case 'set': {
              updateElement(inv.path, inv.value, listInfo)
              break
            }

            case 'insert': {
              insertToList(inv.index, inv.values, listInfo)
              break
            }

            case 'remove': {
              removeFromList(inv.index, inv.count, listInfo)
              break
            }

            case 'swap': {
              swapInList(inv.i, inv.j, listInfo)
              break
            }

            case 'clear': {
              clearList(listInfo)
              break
            }
          }
        }
      }

      // calculate and save the current value as previous value
      listInfo.prevValue = listInfo.currentValue
    }

    subscribe(rootState, handleUpdate, Phase.connection)
  }
}
