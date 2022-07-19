import { HTMLAttributes } from '../attributes/html-attributes'

interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: boolean
  label?: string
  selected?: boolean
  value?: string | ReadonlyArray<string> | number
}

export type JSXOptionElement = OptionHTMLAttributes<HTMLOptionElement>
