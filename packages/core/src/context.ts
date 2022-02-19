import type { Props } from './types/props'

export class ComponentContext {
  parent: ComponentContext | null
  isConnected: boolean
  props!: Props<any>

  // functions that connects or disconnects the parts of context
  connectCbs: Function[]
  disconnectCbs: Function[]

  // functions that needs to be called before or after the context is connected
  connectedCbs: Function[]
  disconnectedCbs: Function[]

  level: number

  constructor(parentContext: ComponentContext | null) {
    this.parent = parentContext
    this.level = parentContext ? parentContext.level + 1 : 0

    // event lists
    this.connectCbs = []
    this.disconnectCbs = []
    this.connectedCbs = []
    this.disconnectedCbs = []

    // connected by default, have to be added manually
    this.isConnected = true
  }

  connect() {
    this.connectCbs.forEach((cb) => cb())
    this.isConnected = true
  }

  disconnect() {
    this.disconnectCbs.forEach((cb) => cb())
    this.isConnected = false
  }
}
