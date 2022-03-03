import { Dirty, Subs, Subscription } from '../types/store'
import { updates } from './updates'

export function notify(subs: Subs, dirty: Dirty) {
  // if this was assigned new value, entire sub tree of it is dirty
  if (dirty._assign) {
    notifyAll(subs, dirty)
  } else {
    // else only the child keys are dirty

    // because a child is dirty, it is also dirty
    if (subs._self) {
      // TODO: cb's should be called with dirty object
      subs._self.forEach((cb) => {
        cb.callWith = dirty
        addToUpdates(cb)
      })
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

function notifyAll(subs: Subs, dirty: Dirty) {
  if (subs._self) {
    subs._self.forEach((cb) => {
      cb.callWith = dirty
      addToUpdates(cb)
    })
  }

  Object.keys(subs).forEach((subKey) => {
    notifyAll(subs[subKey], dirty)
  })
}

function addToUpdates(sub: Subscription) {
  updates[sub.phase!].add(sub)
}
