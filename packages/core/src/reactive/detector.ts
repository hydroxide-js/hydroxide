import { globalInfo } from '../index'
import { Reactive } from '../types'

export function detect<T>(fn: () => T): [Set<Reactive>, T] {
  const outerDetected = globalInfo.detected
  const outerDetectorEnabled = globalInfo.detectorEnabled

  // set new detector
  globalInfo.detectorEnabled = true
  globalInfo.detected = new Set()

  // run fn
  const returnValue = fn()

  const dependencies = globalInfo.detected

  // add the detected dependencies of inner to outer
  if (outerDetectorEnabled) {
    dependencies.forEach((dep) => {
      outerDetected.add(dep)
    })
  }

  // reset original detector
  globalInfo.detectorEnabled = outerDetectorEnabled
  globalInfo.detected = outerDetected

  // return detected dependencies and returnValue from fn
  return [dependencies, returnValue]
}
