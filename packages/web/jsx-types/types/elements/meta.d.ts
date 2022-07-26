import { HTMLAttributes } from '../attributes/html-attributes'

interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
  charset?: string
  content?: string
  httpequiv?: string
  name?: string
  media?: string
}

export type JSXMetaElement = MetaHTMLAttributes<HTMLMetaElement>
