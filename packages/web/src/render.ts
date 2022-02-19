import { Component, globalInfo } from '@nuejs/core'
import { runComponent } from './runComponent'
import { WebContext } from './WebContext'

// @ts-expect-error
globalInfo.createContext = function (parent: WebContext | null) {
  return new WebContext(parent)
}

export function render(comp: Component<{}>, target: HTMLElement) {
  const marker = document.createComment('')
  target.append(marker)
  runComponent(comp, {}, target, marker, null)
}
