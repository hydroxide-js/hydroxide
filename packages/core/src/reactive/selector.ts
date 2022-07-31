import { DATA_PHASE, invalidate } from './scheduler'
import { coreInfo, Reactive } from '../index'
import { subscribe } from './subscribe'
import { Subs } from '../types/others'

type Selector<T> = (value: T) => boolean

type Subscribable = {
  subs: Subs
}

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
      const lightWeightReactive: Subscribable = {
        subs: new Array(5) as Subs
      }

      SubsCollection[targetValue] = lightWeightReactive
    }

    if (coreInfo.detectorEnabled) {
      // @ts-ignore
      coreInfo.detected.add(SubsCollection[targetValue])
    }

    return targetValue === reactive.value
  }
}
