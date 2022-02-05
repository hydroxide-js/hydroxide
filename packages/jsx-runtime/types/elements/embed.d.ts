import { HTMLAttributes } from '../attributes'

interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
  height?: number | string | undefined
  src?: string | undefined
  type?: string | undefined
  width?: number | string | undefined
}

export type JSXEmbedElement = EmbedHTMLAttributes<HTMLEmbedElement>
