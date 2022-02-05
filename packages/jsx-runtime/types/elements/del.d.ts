import { HTMLAttributes } from '../attributes'

interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string | undefined
  dateTime?: string | undefined
}

export type JSXDelElement = DelHTMLAttributes<HTMLElement>
