import { HTMLAttributes } from '../attributes/html-attributes'

interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string | undefined
  dateTime?: string | undefined
}

export type JSXInsElement = InsHTMLAttributes<HTMLModElement>
