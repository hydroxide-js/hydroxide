import { globalInfo, Reactive } from '..'
import { $ } from '../apis/$'
import { Store } from '../types/store'
import { ReactiveList } from './reactiveList'

export function correctIndexOf(arr: ReactiveList<any>, index: IndexReactive) {
  const currentValue = index._.store.value
  // ignore if item is already having the latest index
  if (index.flush === arr.flush) {
    return currentValue
  }

  let modified = currentValue
  arr.mutations.forEach((mutation) => {
    // ignore mutations that happened before index was updated
    if (mutation.flush < index.flush) return
    if (mutation.i <= modified) {
      if (mutation.op === 'delete') modified -= mutation.count
      else modified += mutation.count
    }
  })

  // return original if modified goes negative
  return modified < 0 ? currentValue : modified
}

class IndexReactive extends Reactive {
  list: ReactiveList<any>
  flush: number

  constructor(initIndex: number, reactiveList: ReactiveList<any>) {
    const store: Store = {
      value: initIndex,
      dirty: {},
      subs: {},
      slices: {},
      context: globalInfo.context
    }

    super(store, [])

    this.list = reactiveList
    this.flush = reactiveList.flush
  }

  // modify the value so that it always returns the correct value of index
  get value() {
    return correctIndexOf(this.list, this)
  }
}

describe('indexing', () => {
  it('$insert', () => {
    const arr = $(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'])

    const index = new IndexReactive(3, arr) // index of D

    arr.$insert(3, 'X')

    expect(index.value).toBe(4)
  })
})
