import { HTMLAttributes } from '../attributes/html-attributes'

interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
  autofocus?: boolean
  challenge?: string
  disabled?: boolean
  form?: string
  keytype?: string
  keyparams?: string
  name?: string
}

export type JSXKeygenElement = KeygenHTMLAttributes<HTMLElement>
