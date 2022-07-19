import { HTMLAttributes } from '../attributes/html-attributes'

interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
  form?: string
  for?: string
}

export type JSXLabelElement = LabelHTMLAttributes<HTMLLabelElement>
