import { globalInfo } from 'hydroxide'
import { isDEV } from './env'
import { Component } from './types'
export { attr } from './hydrate/attr'
export { branch } from './hydrate/branch'
export { component } from './hydrate/component'
export { delegateEvents } from './hydrate/delegateEvents'
export { insert } from './hydrate/insert'

export function template(html: string): HTMLElement {
  const template = document.createElement('template')
  template.innerHTML = html
  return template.content.firstChild as HTMLElement
}

export function svg(html: string): HTMLElement {
  return template(`<svg>${html}</svg>`).firstChild as HTMLElement
}

export function render(comp: Component<any>, target: HTMLElement) {
  globalInfo.context = { isConnected: true }
  target.appendChild(comp({}) as HTMLElement)
  if (isDEV) {
    // @ts-ignore
    target.$$context = globalInfo.context
  }
  globalInfo.context = null
}
