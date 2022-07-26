import { HTMLAttributes } from '../attributes/html-attributes'

interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
  autocomplete?: string
  autofocus?: boolean
  cols?: number
  dirname?: string
  disabled?: boolean
  form?: string
  maxlength?: number
  minlength?: number
  name?: string
  placeholder?: string
  readonly?: boolean
  required?: boolean
  rows?: number
  value?: string | ReadonlyArray<string> | number
  wrap?: string
}

export type JSXTextAreElement = TextareaHTMLAttributes<HTMLTextAreaElement>
