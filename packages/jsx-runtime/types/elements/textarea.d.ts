import { HTMLAttributes } from '../attributes'
import { EventHandler } from '../common'

interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
  autoComplete?: string | undefined
  autoFocus?: boolean | undefined
  cols?: number | undefined
  dirName?: string | undefined
  disabled?: boolean | undefined
  form?: string | undefined
  maxLength?: number | undefined
  minLength?: number | undefined
  name?: string | undefined
  placeholder?: string | undefined
  readOnly?: boolean | undefined
  required?: boolean | undefined
  rows?: number | undefined
  value?: string | ReadonlyArray<string> | number | undefined
  wrap?: string | undefined
  onChange?: EventHandler<T> | undefined
}

export type JSXTextAreElement = TextareaHTMLAttributes<HTMLTextAreaElement>
