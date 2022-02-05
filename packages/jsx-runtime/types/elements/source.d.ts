import { HTMLAttributes } from '../attributes'

interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
  height?: number | string | undefined
  media?: string | undefined
  sizes?: string | undefined
  src?: string | undefined
  srcSet?: string | undefined
  type?: string | undefined
  width?: number | string | undefined
}

export type JSXSourceElement = SourceHTMLAttributes<HTMLSourceElement>
