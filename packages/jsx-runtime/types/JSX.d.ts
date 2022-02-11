import { Component, Props, Reactive } from '@nuejs/core'
import { EventHandler as _EventHandler } from './common'
import { HTMLElements } from './html-elements'
import { SVGElements } from './svg-elements'

declare global {
  namespace Nue {
    type EventHandler<T> = _EventHandler<T>
  }

  namespace JSX {
    type Primitives = string | number | boolean | null | undefined

    interface NueElement<
      P = Props<any>,
      T extends string | Component<any> = string | Component<any>
    > {
      type: T
      props: P & { children?: JSX.Element[] | JSX.Element }
    }

    type Element = NueElement<any, any> | Primitives | Reactive<Primitives>

    interface ElementAttributesProperty {
      props: {}
    }

    interface ElementChildrenAttribute {
      children: {}
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicAttributes {}

    interface IntrinsicElements extends HTMLElements, SVGElements {}
  }
}

// export something to make this file a module
export { JSX }
