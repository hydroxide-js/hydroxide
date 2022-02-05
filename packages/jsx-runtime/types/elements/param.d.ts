import { HTMLAttributes } from '../attributes'

interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: string | undefined
  value?: string | ReadonlyArray<string> | number | undefined
}

export type JSXParamElement = ParamHTMLAttributes<HTMLParamElement>
