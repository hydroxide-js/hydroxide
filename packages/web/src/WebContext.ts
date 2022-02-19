import { ComponentContext } from '@nuejs/core'
import { devMode } from './devMode'

export class WebContext extends ComponentContext {
  marker!: Comment
  el!: HTMLElement

  // eslint-disable-next-line no-useless-constructor
  constructor(parent: WebContext | null) {
    super(parent)
  }

  connect() {
    super.connect()
    this.add()
  }

  disconnect() {
    super.disconnect()
    this.remove()
  }

  add() {
    this.marker.replaceWith(this.el)
    this.connectedCbs.forEach((cb) => cb())
  }

  remove() {
    this.el.replaceWith(this.marker)
    if (process.env.NODE_ENV !== 'production' && devMode.noRemove) {
      document.getElementById('removed')!.append(this.el)
    }
    this.disconnectedCbs.forEach((cb) => cb())
  }
}
