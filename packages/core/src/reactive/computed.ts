import { globalInfo } from '../index'
import { Computed, Reactive } from '../types'
import { detect } from './detector'

export function computed<T>(fn: () => T): Computed<T> {
  function update() {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;[state.deps, state.value] = detect(fn)
    cacheId = computeCacheId(state.deps)
  }

  // create computed state
  // @ts-expect-error
  const state: Computed<T> = function () {
    const id = computeCacheId(state.deps)
    const isValueCorrect = cacheId === id

    // if the value is not correct, update the value, cacheId and deps
    if (!isValueCorrect) {
      update()
    }

    // if the detector is enabled, push the computed's deps
    else if (globalInfo.detectorEnabled) {
      state.deps.forEach((dep) => {
        globalInfo.detected.add(dep)
      })
    }

    return state.value
  }

  // run the fn and get return value and dependecies
  ;[state.deps, state.value] = detect(fn)
  let cacheId = computeCacheId(state.deps)

  return state
}

function computeCacheId(deps: Set<Reactive>): number {
  let cacheId = 0
  deps.forEach((dep) => {
    cacheId += dep.updateCount
  })

  return cacheId
}