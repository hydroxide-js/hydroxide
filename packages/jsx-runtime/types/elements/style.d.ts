import { HTMLAttributes } from '../attributes/html-attributes'

interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
  media?: string | undefined
  nonce?: string | undefined
  scoped?: boolean | undefined
  type?: string | undefined
}

export type JSXStyleElement = StyleHTMLAttributes<HTMLStyleElement>
