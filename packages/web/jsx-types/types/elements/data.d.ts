import { HTMLAttributes } from '../attributes/html-attributes'

interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
  value?: string | ReadonlyArray<string> | number
}

export type JSXDataElement = DataHTMLAttributes<HTMLDataElement>
