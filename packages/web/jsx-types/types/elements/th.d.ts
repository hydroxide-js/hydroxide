import { HTMLAttributes } from '../attributes/html-attributes'

interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
  align?: 'left' | 'center' | 'right' | 'justify' | 'char'
  colspan?: number
  headers?: string
  rowspan?: number
  scope?: string
  abbr?: string
}

export type JSXThElement = ThHTMLAttributes<HTMLTableHeaderCellElement>
