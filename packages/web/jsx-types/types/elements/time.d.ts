import { HTMLAttributes } from '../attributes/html-attributes'

interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
  dateTime?: string
}

export type JSXTimeElement = TimeHTMLAttributes<HTMLElement>
