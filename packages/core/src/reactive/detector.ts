import { coreInfo } from '../index'
import { Reactive } from '../types/reactive'

export function detect<T>(fn: () => T): [Set<Reactive<any>>, T] {
  const outerDetected = coreInfo.detected
  const outerDetectorEnabled = coreInfo.detectorEnabled

  // set new detector
  coreInfo.detectorEnabled = true
  coreInfo.detected = new Set()

  // run fn
  const returnValue = fn()

  const dependencies = coreInfo.detected

  // add the detected dependencies of inner to outer
  if (outerDetectorEnabled) {
    dependencies.forEach(dep => {
      outerDetected.add(dep)
    })
  }

  // reset original detector
  coreInfo.detectorEnabled = outerDetectorEnabled
  coreInfo.detected = outerDetected

  // return detected dependencies and returnValue from fn
  return [dependencies, returnValue]
}
