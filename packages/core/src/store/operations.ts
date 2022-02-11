import { scheduleFlush } from '../scheduler'
import { markDirty } from './dirty'
import { Reactive } from './reactive'

export function insert<T>(
  reactive: Reactive<T[]>,
  insertIndex: number,
  value: T
) {
  const { store, path } = reactive._

  reactive.value.splice(insertIndex, 0, value)

  markDirty(store.dirty, path, {
    insert: insertIndex,
    values: [value]
  })

  scheduleFlush(store)
}

export function remove<T>(reactive: Reactive<T[]>, removeIndex: number) {
  const { store, path } = reactive._

  reactive.value.splice(removeIndex, 1)

  markDirty(store.dirty, path, {
    remove: removeIndex,
    count: 1
  })

  scheduleFlush(store)
}

export function insertMultiple<T>(
  reactive: Reactive<T[]>,
  insertIndex: number,
  values: T[]
) {
  const { store, path } = reactive._

  reactive.value.splice(insertIndex, 0, ...values)

  markDirty(store.dirty, path, {
    insert: insertIndex,
    values: values
  })

  scheduleFlush(store)
}

export function removeMultiple<T>(
  reactive: Reactive<T[]>,
  removeIndex: number,
  removeCount: number
) {
  const { store, path } = reactive._

  reactive.value.splice(removeIndex, removeCount)

  markDirty(store.dirty, path, {
    remove: removeIndex,
    count: removeCount
  })

  scheduleFlush(store)
}
