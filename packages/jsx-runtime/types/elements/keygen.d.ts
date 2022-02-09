import { HTMLAttributes } from '../attributes/html-attributes'

interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
  autoFocus?: boolean | undefined
  challenge?: string | undefined
  disabled?: boolean | undefined
  form?: string | undefined
  keyType?: string | undefined
  keyParams?: string | undefined
  name?: string | undefined
}

export type JSXKeygenElement = KeygenHTMLAttributes<HTMLElement>
