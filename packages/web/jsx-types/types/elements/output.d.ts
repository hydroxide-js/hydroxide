import { HTMLAttributes } from '../attributes/html-attributes'

interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
  form?: string
  for?: string
  name?: string
}

export type JSXOutputElement = OutputHTMLAttributes<HTMLElement>
