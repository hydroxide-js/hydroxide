import { WebContext } from './src'

export type NueWebPlugin = {
  on: {
    prop: {
      // handle will be called for elements or components
      // that contains one of given attributes mentioned in target set
      target: Set<string>
      handle(value: any, context: WebContext): void
    }
  }
}
