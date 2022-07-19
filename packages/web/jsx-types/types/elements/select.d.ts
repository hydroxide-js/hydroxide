import { HTMLAttributes } from '../attributes/html-attributes'
import { BindAttributes, EventHandler } from '../common'

interface SelectHTMLAttributes<T> extends HTMLAttributes<T>, BindAttributes {
  autoComplete?: string
  autoFocus?: boolean
  disabled?: boolean
  form?: string
  multiple?: boolean
  name?: string
  required?: boolean
  size?: number
  value?: string | ReadonlyArray<string> | number
  onChange?: EventHandler<T>
}

export type JSXSelectElement = SelectHTMLAttributes<HTMLSelectElement>
