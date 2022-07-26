import { HTMLAttributes } from '../attributes/html-attributes'
import { BindAttributes } from '../common'

interface SelectHTMLAttributes<T> extends HTMLAttributes<T>, BindAttributes {
  autocomplete?: string
  autofocus?: boolean
  disabled?: boolean
  form?: string
  multiple?: boolean
  name?: string
  required?: boolean
  size?: number
  value?: string | ReadonlyArray<string> | number
}

export type JSXSelectElement = SelectHTMLAttributes<HTMLSelectElement>
