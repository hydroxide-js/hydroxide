import type { Component } from './types/Component'
import type { Props } from './types/props'

export class ComponentContext {
  comp: Component<any>
  parent: ComponentContext | null
  isConnected: boolean
  props: Props<any>
  connectCbs: Function[]
  disconnectCbs: Function[]
  level: number

  constructor(
    comp: Component<any>,
    props: Props<any>,
    parentContext: ComponentContext | null
  ) {
    this.comp = comp
    this.parent = parentContext
    this.props = props
    this.connectCbs = []
    this.disconnectCbs = []
    this.isConnected = true
    this.level = parentContext ? parentContext.level + 1 : 0
  }

  onConnect(cb: Function) {
    this.connectCbs.push(cb)
  }

  onDisconnect(cb: Function) {
    this.disconnectCbs.push(cb)
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
