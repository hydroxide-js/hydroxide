import { Component } from '@nuejs/core'
import { runComponent } from './runComponent'

export function render(comp: Component<{}>, target: HTMLElement) {
  const context = runComponent(comp, {}, null)
  target.append(context.el)
}
