import { HTMLAttributes } from '../attributes/html-attributes'

interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
  align?: 'left' | 'center' | 'right' | 'justify' | 'char' | undefined
  colSpan?: number | undefined
  headers?: string | undefined
  rowSpan?: number | undefined
  scope?: string | undefined
  abbr?: string | undefined
}

export type JSXThElement = ThHTMLAttributes<HTMLTableHeaderCellElement>
