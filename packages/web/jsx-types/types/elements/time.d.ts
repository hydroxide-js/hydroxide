import { HTMLAttributes } from '../attributes/html-attributes'

interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
  dateTime?: string | undefined
}

export type JSXTimeElement = TimeHTMLAttributes<HTMLElement>
