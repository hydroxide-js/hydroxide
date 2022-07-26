import { HTMLAttributes } from '../attributes/html-attributes'

interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string
  datetime?: string
}

export type JSXDelElement = DelHTMLAttributes<HTMLElement>
