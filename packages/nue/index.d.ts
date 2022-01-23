import { Reactive } from './src'

declare global {
  namespace JSX {
    type Element =
      | {
          // eslint-disable-next-line @typescript-eslint/ban-types
          type: string | Function
          props: Record<string, any> & {
            children?: JSX.Element[]
          }
        }
      | string
      | Reactive<any>
  }
}

export { JSX }
