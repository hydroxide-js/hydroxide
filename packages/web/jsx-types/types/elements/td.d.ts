import { HTMLAttributes } from '../attributes/html-attributes'

interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
  align?: 'left' | 'center' | 'right' | 'justify' | 'char'
  colspan?: number
  headers?: string
  rowspan?: number
  scope?: string
  abbr?: string
  height?: number | string
  width?: number | string
  valign?: 'top' | 'middle' | 'bottom' | 'baseline'
}

export type JSXTdElement = TdHTMLAttributes<HTMLTableDataCellElement>
