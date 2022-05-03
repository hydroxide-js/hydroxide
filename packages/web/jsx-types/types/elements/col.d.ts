import { HTMLAttributes } from '../attributes/html-attributes'

interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
  /** Specifies the number of columns it should span */
  span?: number
}

export type JSXColElement = ColHTMLAttributes<HTMLTableColElement>
