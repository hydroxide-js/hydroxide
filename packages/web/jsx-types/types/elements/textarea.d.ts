import { HTMLAttributes } from '../attributes/html-attributes'
import { EventHandler } from '../common'

interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
  autoComplete?: string
  autoFocus?: boolean
  cols?: number
  dirName?: string
  disabled?: boolean
  form?: string
  maxLength?: number
  minLength?: number
  name?: string
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  rows?: number
  value?: string | ReadonlyArray<string> | number
  wrap?: string
  onChange?: EventHandler<T>
}

export type JSXTextAreElement = TextareaHTMLAttributes<HTMLTextAreaElement>
