import { HTMLAttributes } from '../attributes'

interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
  form?: string | undefined
  htmlFor?: string | undefined
}

export type JSXLabelElement = LabelHTMLAttributes<HTMLLabelElement>
