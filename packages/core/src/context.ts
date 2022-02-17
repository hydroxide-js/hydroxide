import type { Component } from './types/Component'
import type { Props } from './types/props'

export class ComponentContext {
  comp: Component<any>
  parent: ComponentContext | null
  isConnected: boolean
  props: Props<any>

  // functions that connects or disconnects the parts of context
  connectCbs: Function[]
  disconnectCbs: Function[]

  // functions that needs to be called before or after the context is connected
  afterConnectCbs: Function[]
  afterDisconnectCbs: Function[]

  level: number

  constructor(
    comp: Component<any>,
    props: Props<any>,
    parentContext: ComponentContext | null
  ) {
    this.level = parentContext ? parentContext.level + 1 : 0

    this.comp = comp
    this.parent = parentContext
    this.props = props

    // event lists
    this.connectCbs = []
    this.disconnectCbs = []
    this.afterConnectCbs = []
    this.afterDisconnectCbs = []

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
