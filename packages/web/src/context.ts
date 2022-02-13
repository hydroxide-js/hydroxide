import { Component, ComponentContext, Props } from '@nuejs/core'
import { devMode } from './devMode'

export class WebContext extends ComponentContext {
  marker!: Comment
  el!: HTMLElement

  // eslint-disable-next-line no-useless-constructor
  constructor(
    comp: Component<any>,
    props: Props<any>,
    parent: WebContext | null
  ) {
    super(comp, props, parent)
  }

  connect() {
    if (process.env.NODE_ENV !== 'production' && devMode.noRemove) {
      this.el.setAttribute('data-comp-connected', '')
    }

    super.connect()
  }

  disconnect() {
    if (process.env.NODE_ENV !== 'production' && devMode.noRemove) {
      this.el.setAttribute('data-comp-connected', 'false')
    }
    super.disconnect()
  }

  add() {
    if (process.env.NODE_ENV !== 'production' && devMode.noRemove) {
      this.el.setAttribute('data-comp-added', 'true')
    }
    this.marker.replaceWith(this.el)
  }

  remove() {
    if (process.env.NODE_ENV !== 'production' && devMode.noRemove) {
      this.el.setAttribute('data-comp-added', 'false')
    } else {
      this.el.replaceWith(this.marker)
    }
  }
}
