import { ConditionAttributes, EventHandler as _EventHandler } from './common'
import { HTMLElements } from './html-elements'
import { SVGElements } from './svg-elements'

declare global {
  namespace Nue {
    type EventHandler<T> = _EventHandler<T>
  }

  namespace JSX {
    type Element = any

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
