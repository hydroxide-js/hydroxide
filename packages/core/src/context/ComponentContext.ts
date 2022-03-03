import type { Props } from '../types/props'

export class ComponentContext {
  parent: ComponentContext | null
  isConnected: boolean
  props!: Props<any>

  // functions that connects or disconnects the parts of context
  connectCbs?: Function[]
  disconnectCbs?: Function[]

  // functions that needs to be called before or after the context is connected
  connectedCbs?: Function[]
  disconnectedCbs?: Function[]

  level: number

  constructor(parentContext: ComponentContext | null) {
    this.parent = parentContext
    this.level = parentContext ? parentContext.level + 1 : 0
    // connected by default, have to be added manually
    this.isConnected = true
  }

  connect() {
    if (this.connectCbs) {
      this.connectCbs.forEach((cb) => cb())
    }
    this.isConnected = true
  }

  disconnect() {
    if (this.disconnectCbs) {
      this.disconnectCbs.forEach((cb) => cb())
    }
    this.isConnected = false
  }

  addConnectCb(cb: Function) {
    if (!this.connectCbs) this.connectCbs = [cb]
    else {
      this.connectCbs.push(cb)
    }
  }

  addDisconnectCb(cb: Function) {
    if (!this.disconnectCbs) this.disconnectCbs = [cb]
    else {
      this.disconnectCbs.push(cb)
    }
  }
}
