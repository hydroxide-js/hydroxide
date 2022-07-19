import { HTMLAttributes } from '../attributes/html-attributes'

interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: boolean
  label?: string
}

export type JSXOptElement = OptgroupHTMLAttributes<HTMLOptGroupElement>
