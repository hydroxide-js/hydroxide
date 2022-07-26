import { HTMLAttributes } from '../attributes/html-attributes'

interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
  height?: number | string
  media?: string
  sizes?: string
  src?: string
  srcset?: string
  type?: string
  width?: number | string
}

export type JSXSourceElement = SourceHTMLAttributes<HTMLSourceElement>
