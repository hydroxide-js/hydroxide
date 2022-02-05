import { HTMLAttributes } from '../attributes'

interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
  form?: string | undefined
  high?: number | undefined
  low?: number | undefined
  max?: number | string | undefined
  min?: number | string | undefined
  optimum?: number | undefined
  value?: string | ReadonlyArray<string> | number | undefined
}

export type JSXMeterElement = MeterHTMLAttributes<HTMLElement>
