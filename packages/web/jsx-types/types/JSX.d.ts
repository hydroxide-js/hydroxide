import { ConditionAttributes, EventHandler as _EventHandler } from './common'
import { HTMLElements } from './html-elements'
import { SVGElements } from './svg-elements'

declare global {
  namespace Nue {
    type EventHandler<T> = _EventHandler<T>
  }

  namespace JSX {
    // todo improve : refer to solid js for example
    type Element =
      | string
      | boolean
      | number
      | null
      | undefined
      | Node
      | Element[]
      | (() => Element)

    interface ElementAttributesProperty {
      props: {}
    }

    interface ElementChildrenAttribute {
      children: {}
    }

    type IntrinsicAttributes = ConditionAttributes

    interface IntrinsicElements extends HTMLElements, SVGElements {}
  }
}

// export something to make this file a module
export { JSX }
