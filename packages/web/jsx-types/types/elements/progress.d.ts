import { HTMLAttributes } from '../attributes/html-attributes'

interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
  max?: number | string
  value?: string | ReadonlyArray<string> | number
}

export type JSXProgressElement = ProgressHTMLAttributes<HTMLProgressElement>
