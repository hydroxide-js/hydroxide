import { HTMLAttributes } from '../attributes/html-attributes'

interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
  media?: string
  nonce?: string
  scoped?: boolean
  type?: string
}

export type JSXStyleElement = StyleHTMLAttributes<HTMLStyleElement>
