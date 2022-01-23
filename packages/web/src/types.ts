import { Reactive } from '@nuejs/nue'

export type NodeAddress = number[]

// dynamic part

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DynamicPart {
  interface Part {
    nodeAddress: NodeAddress
  }

  export interface Attribute extends Part {
    attribute: string
  }

  export interface EventHandler extends Part {
    propName: string
    event: string
  }

  export interface Text extends Part {
    text: true
  }

  export interface Component extends Part {
    comp: true
  }
}

export type DynamicParts = (
  | DynamicPart.Text
  | DynamicPart.Attribute
  | DynamicPart.Component
  | DynamicPart.EventHandler
)[]

// component

export type Comp = (props: Props<object>) => JSX.Element

export type CompInfo = {
  template: HTMLTemplateElement
  isFragment: boolean
  dynamics: DynamicParts
}

export type CompInfoMap = Map<Comp, CompInfo>

type ComponentContext = {
  comp: Comp
  $props: Record<string, Reactive<any>>
}

// global info

export type GlobalInfo = {
  context: null | ComponentContext
}

// props

export type PropData<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : T[K] | (() => T[K])
}

// TODO: make it readonly reactive type
export type Props<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : Reactive<NonNullable<T[K]>>
}
