import { HTMLAttributes } from '../attributes/html-attributes'

interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
  form?: string | undefined
  htmlFor?: string | undefined
}

export type JSXLabelElement = LabelHTMLAttributes<HTMLLabelElement>
