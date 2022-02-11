import { Component } from '.'
import { Props } from './types/props'

export type ComponentContext = {
  comp: Component<any>
  props: Props<any>
}

export type GlobalInfo = {
  context: null | ComponentContext
}

export const globalInfo: GlobalInfo = {
  context: null
}
