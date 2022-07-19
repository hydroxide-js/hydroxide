import { HTMLAttributes } from '../attributes/html-attributes'

interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
  form?: string
  high?: number
  low?: number
  max?: number | string
  min?: number | string
  optimum?: number
  value?: string | ReadonlyArray<string> | number
}

export type JSXMeterElement = MeterHTMLAttributes<HTMLElement>
