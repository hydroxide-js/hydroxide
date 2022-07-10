import { coreInfo } from 'hydroxide'
import { devInfo } from './dev/info'
import { component } from './hydrate/component'
import { Component } from './types'
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

export function render(comp: Component<any>, target: HTMLElement) {
  // root context
  coreInfo.context = { isConnected: true }

  // call component
  let el: HTMLElement
  try {
    el = component(comp) as HTMLElement
  } catch (error) {
    if (coreInfo.context.onError) {
      coreInfo.context.onError.forEach((handleError) => handleError(error))
    } else {
      throw error
    }
  }

  // append the element
  // @ts-expect-error
  target.appendChild(el)

  // run onConnect callbacks
  if (coreInfo.context.onConnect) {
    coreInfo.context.onConnect.forEach((cb) => cb())
  }

  // save the component tree for dev
  if (DEV) {
    // @ts-ignore
    window.compTree = devInfo.currentComponent
  }

  coreInfo.context = null
}
