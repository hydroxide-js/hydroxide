import { HTMLAttributes } from '../attributes/html-attributes'

interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
  acceptCharset?: string
  action?: string
  autoComplete?: string
  encType?: string
  method?: string
  name?: string
  noValidate?: boolean
  target?: string
}

export type JSXFormElement = FormHTMLAttributes<HTMLFormElement>
