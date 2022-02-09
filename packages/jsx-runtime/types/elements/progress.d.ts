import { HTMLAttributes } from '../attributes/html-attributes'

interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
  max?: number | string | undefined
  value?: string | ReadonlyArray<string> | number | undefined
}

export type JSXProgressElement = ProgressHTMLAttributes<HTMLProgressElement>
