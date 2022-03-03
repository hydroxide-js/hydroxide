import { scheduleFlush } from '../scheduler/scheduleFlush'
import { Store, StorePath } from '../types/store'
import { markDirty } from './dirty'
import { Reactive } from './reactive'

type ListMutation = {
  i: number
  count: number
  op: 'insert' | 'delete'
  flush: number
}

export class ReactiveList<T> extends Reactive<T[]> {
  // every time insert or remove is done on reactive list - flush is increment
  flush: number
  mutations: ListMutation[]

  constructor(store: Store, path: StorePath) {
    super(store, path)
    this.flush = 0
    this.mutations = []
  }

  /**
   * Inserts given `list` of items at given index
   * @param index - index at which the value should be inserted
   * @param value - value to be inserted
   */
  $insertList(index: number, items: T[]) {
    const { store, path } = this._

    this.value.splice(index, 0, ...items)

    markDirty(store.dirty, path, {
      insert: index,
      values: items
    })

    scheduleFlush(store)
    this.flush++
    this.mutations.push({
      i: index,
      count: items.length,
      op: 'insert',
      flush: this.flush
    })
  }

  /**
   * Deletes `count` items starting from given `index` in list
   * @param index - index from which items should be removed
   * @param count - number of items to be deleted (default: 1)
   */
  $delete(index: number, count = 1) {
    const { store, path } = this._

    this.value.splice(index, count)

    markDirty(store.dirty, path, {
      remove: index,
      count
    })

    scheduleFlush(store)
    this.flush++
    this.mutations.push({
      i: index,
      count: count,
      op: 'insert',
      flush: this.flush
    })
  }

  /**
   * Swap items at given two indexes `i` and `j` in list
   */
  $swap(i: number, j: number) {
    const { store, path } = this._

    const temp = this.value[i]
    this.value[i] = this.value[j]
    this.value[j] = temp

    markDirty(store.dirty, path, {
      swap: [i, j]
    })

    // @TODO - update the indexes i and j

    scheduleFlush(store)
    this.flush++
  }

  // shorthand for various types of insert:

  /**
   * Inserts given `item` at given `index` in list
   * @param index - index at which the value should be inserted
   * @param item - value to be inserted
   */
  $insert(index: number, item: T) {
    this.$insertList(index, [item])
  }

  /**
   * Inserts given `item` at the end of the list
   */
  $push(item: T) {
    this.$insertList(this.value.length, [item])
  }

  /**
   * inserts given  list of `items` at the end of the list
   */
  $pushList(items: T[]) {
    const len = this.value.length
    const { store, path } = this._

    // ignore set
    this.track = false
    this.value = this.value.concat(items)
    this.track = true

    markDirty(store.dirty, path, {
      insert: len,
      values: items
    })

    scheduleFlush(store)
    this.flush++
  }

  // shorthand of various types of removal

  /**
   * Deletes given number of items from end of list (default: 1)
   */
  $pop(count = 1) {
    this.$delete(this.value.length - 1, count)
  }

  /** remove all items from list */
  $clear() {
    this.value = []
    const { store, path } = this._

    markDirty(store.dirty, path, {
      clear: true
    })

    scheduleFlush(store)
    this.flush++
  }
}
