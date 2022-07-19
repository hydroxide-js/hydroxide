import { HTMLAttributes } from '../attributes/html-attributes'

interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
  cellPadding?: number | string
  cellSpacing?: number | string
  summary?: string
  width?: number | string
}

export type JSXTableElement = TableHTMLAttributes<HTMLTableElement>
