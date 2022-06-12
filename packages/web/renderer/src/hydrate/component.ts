import { List } from 'hydroxide'
import { devInfo, isDEV } from '../env'
import { Component } from '../types'

export function component(comp: Component<any>, props: Record<string, any>) {
  if (isDEV) {
    devInfo.prevComponent = devInfo.currentComponent
    devInfo.currentComponent = comp
  }

  let output
  if (comp === List) output = { $$list: props }
  else output = comp(props || {})

  if (isDEV) {
    devInfo.currentComponent = devInfo.prevComponent
  }

  return output
}
