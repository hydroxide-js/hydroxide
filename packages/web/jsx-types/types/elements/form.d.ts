import { HTMLAttributes } from '../attributes/html-attributes'

interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
  acceptCharset?: string | undefined
  action?: string | undefined
  autoComplete?: string | undefined
  encType?: string | undefined
  method?: string | undefined
  name?: string | undefined
  noValidate?: boolean | undefined
  target?: string | undefined
}

export type JSXFormElement = FormHTMLAttributes<HTMLFormElement>
