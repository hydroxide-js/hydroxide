import { computed } from '..'
import { $, createReactive } from './createReactive'

export function $<T>(value: T | (() => T)) {
  if (typeof value === 'function') {
    return computed(value as () => T) as $<T>
  } else {
    return createReactive(value)
  }
}
