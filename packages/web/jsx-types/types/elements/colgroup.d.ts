import { HTMLAttributes } from '../attributes/html-attributes'

interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
  span?: number
}

export type JSXColgroupElement = ColgroupHTMLAttributes<HTMLTableColElement>
