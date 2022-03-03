import { Component } from '@nuejs/core'
import { runComponent } from './runComponent'

export function render(comp: Component<{}>, target: HTMLElement) {
  const context = runComponent(comp, {}, target, null)
  target.append(context.el)
}
