import { HTMLAttributes } from '../attributes'

interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
  charSet?: string | undefined
  content?: string | undefined
  httpEquiv?: string | undefined
  name?: string | undefined
  media?: string | undefined
}

export type JSXMetaElement = MetaHTMLAttributes<HTMLMetaElement>
