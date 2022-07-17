import { HTMLAttributes } from '../attributes/html-attributes'
import { BindAttributes, EventHandler } from '../common'

interface SelectHTMLAttributes<T> extends HTMLAttributes<T>, BindAttributes {
  autoComplete?: string | undefined
  autoFocus?: boolean | undefined
  disabled?: boolean | undefined
  form?: string | undefined
  multiple?: boolean | undefined
  name?: string | undefined
  required?: boolean | undefined
  size?: number | undefined
  value?: string | ReadonlyArray<string> | number | undefined
  onChange?: EventHandler<T> | undefined
}

export type JSXSelectElement = SelectHTMLAttributes<HTMLSelectElement>
