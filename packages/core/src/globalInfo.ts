import { ComponentContext } from './context'
import type { Component } from './types/component'
import type { Props } from './types/props'

export type GlobalInfo = {
  context: null | ComponentContext
  createContext: (
    comp: Component<any>,
    props: Props<any>,
    parentContext: ComponentContext | null
  ) => ComponentContext
}

export const globalInfo: GlobalInfo = {
  context: null,
  // this should be replaced by the renderer
  createContext: (
    comp: Component<any>,
    props: Props<any>,
    parentContext: ComponentContext | null
  ) => new ComponentContext(comp, props, parentContext)
}
