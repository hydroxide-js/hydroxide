import { HTMLAttributes } from '../attributes/html-attributes'

interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
  charSet?: string
  content?: string
  httpEquiv?: string
  name?: string
  media?: string
}

export type JSXMetaElement = MetaHTMLAttributes<HTMLMetaElement>
