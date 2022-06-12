import { globalInfo } from '../index'
import { Reactive } from '../types'

export function detect<T>(fn: () => T): [Set<Reactive>, T] {
  const prevDetected = globalInfo.detected
  const prevDetectorEnabled = globalInfo.detectorEnabled

  // set new detector
  globalInfo.detectorEnabled = true
  globalInfo.detected = new Set()
  // run fn
  const returnValue = fn()

  const dependencies = globalInfo.detected

  // add the detected dependencies of inner to outer
  if (prevDetectorEnabled) {
    dependencies.forEach((dep) => {
      prevDetected.add(dep)
    })
  }

  // reset original detector
  globalInfo.detectorEnabled = prevDetectorEnabled
  globalInfo.detected = prevDetected

  // return detected dependencies and returnValue from fn
  return [dependencies, returnValue]
}
