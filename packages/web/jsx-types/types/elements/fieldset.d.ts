import { HTMLAttributes } from '../attributes/html-attributes'

interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: boolean
  form?: string
  name?: string
}

export type JSXFieldsetElement = FieldsetHTMLAttributes<HTMLFieldSetElement>
