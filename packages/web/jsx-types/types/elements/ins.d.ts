import { HTMLAttributes } from '../attributes/html-attributes'

interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string
  dateTime?: string
}

export type JSXInsElement = InsHTMLAttributes<HTMLModElement>
