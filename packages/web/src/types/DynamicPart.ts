import { NodeAddress } from '../utils/getNodeByAddress'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DynamicPart {
  interface Part {
    domAddress: NodeAddress
    jsxAddress: NodeAddress
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
