import { HTMLAttributes } from '../attributes/html-attributes'

interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
  cellPadding?: number | string | undefined
  cellSpacing?: number | string | undefined
  summary?: string | undefined
  width?: number | string | undefined
}

export type JSXTableElement = TableHTMLAttributes<HTMLTableElement>
