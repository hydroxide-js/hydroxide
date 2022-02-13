import { Dirty, Subs, Subscription } from '../types/store'
import { updates } from './reactive'

function batchify(sub: Subscription) {
  updates[sub.phase!].add(sub)
}

function notifyAll(subs: Subs) {
  if (subs._self) {
    subs._self.forEach(batchify)
  }

  Object.keys(subs).forEach((subKey) => {
    notifyAll(subs[subKey])
  })
}

export function notify(subs: Subs, dirty: Dirty) {
  // if this was assigned new value, entire sub tree of it is dirty
  if (dirty._assign) {
    notifyAll(subs)
  } else {
    // else only the child keys are dirty

    // because a child is dirty, it is also dirty
    if (subs._self) {
      // TODO: cb's should be called with dirty object
      subs._self.forEach(batchify)
    }

    if (dirty._arr) {
      dirty._arr.forEach((dirtyArrayOp) => {
        if ('key' in dirtyArrayOp) {
          const key = dirtyArrayOp.key
          if (subs[key]) {
            notify(subs[key], dirtyArrayOp.dirty)
          }
        }
      })
    } else {
      Object.keys(dirty).forEach((dirtyKey) => {
        // if there are subs for it
        if (subs[dirtyKey]) {
          notify(subs[dirtyKey], dirty[dirtyKey])
        }
      })
    }
  }
}
