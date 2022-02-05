import { HTMLAttributes } from '../attributes'

interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
  disabled?: boolean | undefined
  label?: string | undefined
}

export type JSXOptElement = OptgroupHTMLAttributes<HTMLOptGroupElement>
