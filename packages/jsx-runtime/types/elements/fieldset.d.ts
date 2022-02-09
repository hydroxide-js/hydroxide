import { HTMLAttributes } from '../attributes/html-attributes'

interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: boolean | undefined
  form?: string | undefined
  name?: string | undefined
}

export type JSXFieldsetElement = FieldsetHTMLAttributes<HTMLFieldSetElement>
