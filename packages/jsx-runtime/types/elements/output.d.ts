import { HTMLAttributes } from '../attributes/html-attributes'

interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
  form?: string | undefined
  htmlFor?: string | undefined
  name?: string | undefined
}

export type JSXOutputElement = OutputHTMLAttributes<HTMLElement>
