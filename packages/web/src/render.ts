import type { Component } from '@nuejs/core'
import { runComponent } from './runComponent'

export function render(comp: Component<{}>, target: HTMLElement) {
  const node = runComponent(comp, {}, target)
  target.append(node)
}
