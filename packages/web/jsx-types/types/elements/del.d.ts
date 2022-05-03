import { HTMLAttributes } from '../attributes/html-attributes'

interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string | undefined
  dateTime?: string | undefined
}

export type JSXDelElement = DelHTMLAttributes<HTMLElement>
