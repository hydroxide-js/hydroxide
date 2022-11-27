import { devInfo } from './dev/info'
import { component } from './hydrate/component'
import { Component } from './types'
import { coreInfo, createComponentContext } from 'hydroxide'

/**
 * render a component inside the given container element
 */
export function render(comp: Component<any>, container: HTMLElement) {
  // root context
  coreInfo.context = createComponentContext(null)

  const el = component(comp) as HTMLElement

  container.appendChild(el)

  // run onConnect callbacks
  if (coreInfo.context.onConnect) {
    coreInfo.context.onConnect.forEach(cb => cb())
  }

  // save the component tree for dev
  if (DEV) {
    // @ts-ignore
    window.compTree = devInfo.currentComponent
  }

  coreInfo.context = null
}

// components
export { List } from './components/List'
export { ErrorBoundary } from './components/ErrorBoundary'

// hydrators imported by hydroxide compiler
export { bind } from './hydrate/bind'
export { branch } from './hydrate/branch'
export { component } from './hydrate/component'
export { delegateEvents } from './hydrate/delegateEvents'
export { insert } from './hydrate/insert'
export { setAttribute } from './hydrate/setAttribute'

export function template(html: string): HTMLElement {
  const template = document.createElement('template')
  template.innerHTML = html
  return template.content.firstChild as HTMLElement
}

export function svg(html: string): HTMLElement {
  return template(`<svg>${html}</svg>`).firstChild as HTMLElement
}

export type { Ref } from './types'
