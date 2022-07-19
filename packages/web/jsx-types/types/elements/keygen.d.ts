import { HTMLAttributes } from '../attributes/html-attributes'

interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
  autoFocus?: boolean
  challenge?: string
  disabled?: boolean
  form?: string
  keyType?: string
  keyParams?: string
  name?: string
}

export type JSXKeygenElement = KeygenHTMLAttributes<HTMLElement>
