import { DATA_PHASE, invalidate } from './scheduler'
import { coreInfo, Reactive } from '../index'
import { subscribe } from './subscribe'

type Selector<T> = (value: T) => boolean

export function selector<T extends string | number>(reactive: Reactive<T>): Selector<T> {
  let prevValue = reactive.value

  function handleUpdate() {
    const newValue = reactive.value
    if (prevValue === newValue) return

    // invalidate newValue and prevValue subs

    if (newValue in SubsCollection) {
      // @ts-ignore
      invalidate(SubsCollection[newValue])
    }

    if (prevValue in SubsCollection) {
      // @ts-ignore
      invalidate(SubsCollection[prevValue])
    }

    prevValue = newValue
  }

  subscribe(reactive, handleUpdate, DATA_PHASE)

  // @ts-expect-error
  const SubsCollection: Record<T, Subscribable> = {}

  return (targetValue: T) => {
    if (!SubsCollection[targetValue]) {
      // subs will be added in this object
      const lightWeightReactive = {}
      SubsCollection[targetValue] = lightWeightReactive
    }

    if (coreInfo.detectorEnabled) {
      // @ts-ignore
      coreInfo.detected.add(SubsCollection[targetValue])
    }

    return targetValue === reactive.value
  }
}
