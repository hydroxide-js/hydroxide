import type { Ref as _Ref } from './common'
import { EventHandler as _EventHandler, SpecialAttributes } from './common'
import { HTMLElements } from './html-elements'
import { SVGElements } from './svg-elements'

declare global {
  namespace HX {
    type EventHandler<T> = _EventHandler<T>
    type Ref<T> = _Ref<T>
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

    // special props for components
    type IntrinsicAttributes = SpecialAttributes<HTMLElements>

    interface IntrinsicElements extends HTMLElements, SVGElements {}
  }
}

// export something to make this file a module

export { JSX }
