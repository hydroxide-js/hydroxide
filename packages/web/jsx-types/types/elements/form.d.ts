import { HTMLAttributes } from '../attributes/html-attributes'

interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
  acceptcharset?: string
  action?: string
  autocomplete?: string
  enctype?: string
  method?: string
  name?: string
  novalidate?: boolean
  target?: string
}

export type JSXFormElement = FormHTMLAttributes<HTMLFormElement>
