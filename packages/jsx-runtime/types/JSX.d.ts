import { HTMLElements } from './html-elements'
import { SVGElements } from './svg-elements'

declare global {
  namespace JSX {
    interface NueElement<P = any, T extends string | Comp<any> = string | Comp<any>> {
      type: T
      props: P
    }

    type Comp<P> = (props: P) => NueElement<any, any> | null

    type Element = NueElement<any, any> | string | number | undefined | null

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
