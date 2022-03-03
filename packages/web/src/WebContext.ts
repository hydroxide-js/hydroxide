import { ComponentContext } from '@nuejs/core'

export class WebContext extends ComponentContext {
  el!: HTMLElement
  isLooped?: boolean

  // eslint-disable-next-line no-useless-constructor
  constructor(parent: WebContext | null) {
    super(parent)
  }

  connect() {
    super.connect()
    this.connected()
  }

  disconnect() {
    super.disconnect()
    this.disconnected()
  }

  connected() {
    if (this.connectedCbs) {
      this.connectedCbs.forEach((cb) => cb())
    }
  }

  disconnected() {
    if (this.disconnectedCbs) {
      this.disconnectedCbs.forEach((cb) => cb())
    }
  }
}
