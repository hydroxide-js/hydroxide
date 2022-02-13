import { Store } from '../types/store'
import { notify } from './notify'

/**
 *
 * calls the subs of dirty parts
 * if a key is dirty in an object, that parent object is dirty
 * if a parent is dirty, entire subtree is dirty
 */
export function flushStore(store: Store) {
  const { dirty, subs } = store
  notify(subs, dirty)
  store.dirty = {}
}
