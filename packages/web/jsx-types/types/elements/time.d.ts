import { HTMLAttributes } from '../attributes/html-attributes'

interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
  datetime?: string
}

export type JSXTimeElement = TimeHTMLAttributes<HTMLElement>
