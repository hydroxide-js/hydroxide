import {
  Component as _Component,
  GenericPassableProps as _GenericPassableProps,
  Reactive
} from '@nuejs/core'
import { EventHandler as _EventHandler } from './common'
import { HTMLElements } from './html-elements'
import { SVGElements } from './svg-elements'

export type Animate = {
  enter?: string
  exit?: string
}

declare global {
  namespace Nue {
    type EventHandler<T> = _EventHandler<T>
    type Component<T> = _Component<T>
    type GenericPassableProps = _GenericPassableProps
  }

  namespace JSX {
    type Primitives = string | number | boolean | null | undefined

    type props = _GenericPassableProps & {
      $if?: Reactive<boolean>
      $animate?: Animate
      children?: HtmlElement[]
    }

    interface HtmlElement {
      jsxTag: string | _Component<any>
      props: props
      children?: JSX.Element[]
      $if?: Reactive<any>
    }

    type Element = HtmlElement | Primitives | Reactive<Primitives>

    interface ElementAttributesProperty {
      props: {}
    }

    interface ElementChildrenAttribute {
      children: {}
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicAttributes {
      $if?: Reactive<any>
      $animate?: Animate
    }

    interface IntrinsicElements extends HTMLElements, SVGElements {}
  }
}

// export something to make this file a module
export { JSX }
