import { Component, globalInfo, Props } from '@nuejs/core'
import { WebContext } from './context'
import { runComponent } from './runComponent'

export function render(comp: Component<{}>, target: HTMLElement) {
  const marker = document.createComment('')
  target.append(marker)
  const rootContext = runComponent(comp, {}, target, marker, null)
  rootContext.add()
}

// force the @nuejs/core to use this
function createContext(
  comp: Component<any>,
  props: Props<any>,
  parent: WebContext | null
) {
  return new WebContext(comp, props, parent)
}

// set the createContext in core
// @ts-expect-error
globalInfo.createContext = createContext
