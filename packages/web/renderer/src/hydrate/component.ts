import { devInfo, isDEV, isLibDev } from '../env'
import { Component } from '../types'

export function component(comp: Component<any>, props: Record<string, any>) {
  if (isDEV) {
    devInfo.prevComponent = devInfo.currentComponent
    devInfo.currentComponent = comp
  }

  const output = comp(props || {})

  if (isDEV) {
    devInfo.currentComponent = devInfo.prevComponent
  }

  if (isLibDev) {
    if (output instanceof Element) {
      output.setAttribute('component', comp.name)
    }
  }

  return output
}
