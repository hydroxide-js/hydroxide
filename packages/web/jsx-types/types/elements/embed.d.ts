import { HTMLAttributes } from '../attributes/html-attributes'

interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
  height?: number | string
  src?: string
  type?: string
  width?: number | string
}

export type JSXEmbedElement = EmbedHTMLAttributes<HTMLEmbedElement>
