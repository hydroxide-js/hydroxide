import { HTMLAttributes } from '../attributes/html-attributes'

interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: boolean | undefined
  label?: string | undefined
  selected?: boolean | undefined
  value?: string | ReadonlyArray<string> | number | undefined
}

export type JSXOptionElement = OptionHTMLAttributes<HTMLOptionElement>
