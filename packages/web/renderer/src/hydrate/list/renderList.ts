import {
  CONNECTION_PHASE,
  detect,
  coreInfo,
  ListProps,
  LIST_PHASE,
  Reactive,
  subscribe
} from 'hydroxide'
import { arrayOpHandler } from 'hydroxide/src/types'
import { ListInfo } from '../../types'
import { insertToList } from './insertToList'
import { patchList } from './patch'
import { clearList, removeFromList } from './removeFromList'
import { swapInList } from './swapInList'
import { updateElement } from './updateElement'

export function $list<T>(marker: Comment, listProps: ListProps<T>) {
  const parent = marker.parentElement

  if (DEV && (!parent || parent.childNodes.length !== 1)) {
    throw new Error(
      '<List> must be wrapped in a container element and should not have any siblings, example: <div> <List> </div>'
    )
  }
  marker.remove()

  const listInfo: ListInfo<T> = {
    context: coreInfo.context,
    props: listProps,
    parent: parent!,
    prevValue: [],
    currentValue: [],
    list: []
  }

  const [deps, initArrValue] = detect(() => listProps.each)

  listInfo.prevValue = initArrValue
  insertToList(0, initArrValue, listInfo)

  if (deps.size === 0) return

  // if dependency is on single array reactive
  // and both have the same value
  // then it means that reactive array is directly used for rendering list
  // in that case, we don't need to do array diffing and just use the mutation methods

  let requiresDiffing = true
  let reactiveArr: Reactive<T[]>

  if (deps.size === 1) {
    reactiveArr = deps.values().next().value as Reactive<Array<any>>
    const arrayReactiveValue = reactiveArr() as T[]
    requiresDiffing = arrayReactiveValue !== initArrValue
    if (requiresDiffing) {
      // make it immutable to be able to perform reconciliation
      reactiveArr.mutable = false
    }
  }

  if (requiresDiffing) {
    function handleUpdate() {
      listInfo.currentValue = listProps.each
      patchList(listInfo)
      listInfo.prevValue = listInfo.currentValue
    }

    subscribe(reactiveArr!, handleUpdate, CONNECTION_PHASE)
  } else {
    const handleUpdate: arrayOpHandler = (type: string, arg1: any, arg2: any) => {
      listInfo.currentValue = listProps.each
      switch (type) {
        case 'insert': {
          insertToList(arg1, arg2, listInfo)
          break
        }

        case 'remove': {
          removeFromList(arg1, arg2, listInfo)
          break
        }

        case 'swap': {
          swapInList(arg1, arg2, listInfo)
          break
        }

        case 'clear': {
          clearList(listInfo)
          break
        }

        case 'set': {
          updateElement(arg1, arg2, listInfo)
          break
        }
      }
      listInfo.prevValue = listInfo.currentValue
    }

    subscribe(reactiveArr!, handleUpdate, LIST_PHASE)
  }
}
