import { detect, List } from 'hydroxide'
import { devInfo } from '../dev/info'
import { Component } from '../types'

export function component(comp: Component<any>, props?: Record<string, any>) {
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

  if (props && comp !== List) {
    const [deps] = detect(() => {
      for (const propName in props) {
        // eslint-disable-next-line no-unused-expressions
        props[propName]
      }
    })

    if (deps.size) {
      deps.forEach((dep) => {
        dep.mutable = false
      })
    }
  }

  if (DEV) {
    devInfo.currentComponent.el = output as HTMLElement
    devInfo.currentComponent = devInfo.prevComponent
  }

  // if (HX_DEV) {
  //   if (output instanceof HTMLElement) {
  //     ;(output as HTMLElement)!.setAttribute('component', comp.name)
  //   }
  // }

  return output
}
