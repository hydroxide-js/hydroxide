import { Component } from '../types'

export type CompNode = {
  name: string
  comp: Component<any>
  el: HTMLElement
  children: CompNode[]
  parent: CompNode | null
}

type DevInfo = {
  prevComponent: CompNode
  currentComponent: CompNode
  compTree: CompNode
}

export const devInfo: DevInfo = {
  // @ts-expect-error
  prevComponent: null,
  // @ts-expect-error
  currentComponent: null,
  compTree: {} as CompNode
}
