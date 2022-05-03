import {
  Component as _Component,
  GenericPassableProps as _GenericPassableProps,
  Reactive
} from '@nuejs/core'
import { EventHandler as _EventHandler, FrameWorkAttributes } from './common'
import { HTMLElements } from './html-elements'
import { SVGElements } from './svg-elements'

declare global {
  namespace Nue {
    type EventHandler<T> = _EventHandler<T>
    type Component<T> = _Component<T>
    type GenericPassableProps = _GenericPassableProps
  }

  namespace JSX {
    type Primitives = string | number | boolean | null | undefined

    type Element = Primitives | Reactive<Primitives>

    interface ElementAttributesProperty {
      props: {}
    }

    interface ElementChildrenAttribute {
      children: {}
    }

    type IntrinsicAttributes = FrameWorkAttributes

    interface IntrinsicElements extends HTMLElements, SVGElements {}
  }
}

// export something to make this file a module
export { JSX }
