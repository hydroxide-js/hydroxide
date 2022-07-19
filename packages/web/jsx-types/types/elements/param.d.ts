import { HTMLAttributes } from '../attributes/html-attributes'

interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: string
  value?: string | ReadonlyArray<string> | number
}

export type JSXParamElement = ParamHTMLAttributes<HTMLParamElement>
