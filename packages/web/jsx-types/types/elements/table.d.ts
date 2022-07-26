import { HTMLAttributes } from '../attributes/html-attributes'

interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
  cellpadding?: number | string
  cellspacing?: number | string
  summary?: string
  width?: number | string
}

export type JSXTableElement = TableHTMLAttributes<HTMLTableElement>
