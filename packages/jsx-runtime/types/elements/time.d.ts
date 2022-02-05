import { HTMLAttributes } from '../attributes'

interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
  dateTime?: string | undefined
}

export type JSXTimeElement = TimeHTMLAttributes<HTMLElement>
