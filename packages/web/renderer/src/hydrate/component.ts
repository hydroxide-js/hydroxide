import { devInfo } from '../dev/info'
import { Component } from '../types'

export function component(comp: Component<any>, props: Record<string, any>) {
  if (DEV) {
    const parent = devInfo.currentComponent
    devInfo.prevComponent = parent
    devInfo.currentComponent = {
      name: comp.name,
      comp,
      children: [],
      // @ts-expect-error
      el: null
    }

    if (parent) {
      parent.children.push(devInfo.currentComponent)
      devInfo.currentComponent.parent = parent
    }
  }

  const output = comp(props || {})

  if (DEV) {
    devInfo.currentComponent.el = output as HTMLElement
    devInfo.currentComponent = devInfo.prevComponent
  }

  if (HX_DEV) {
    if (output instanceof Element) {
      output.setAttribute('component', comp.name)
    }
  }

  return output
}
