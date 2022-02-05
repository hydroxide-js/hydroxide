import { HTMLAttributes } from '../attributes/html-attributes'
import { numOrStr } from '../common'

interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
  /** height of the canvas. Default value is 150 */
  height?: numOrStr

  /** width of the canvas Default value is 300 */
  width?: numOrStr
}

export type JSXCanvasElement = CanvasHTMLAttributes<HTMLCanvasElement>
