import { HTMLAttributes } from '../attributes/html-attributes'

interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
  value?: string | ReadonlyArray<string> | number | undefined
}

export type JSXLiElement = LiHTMLAttributes<HTMLLIElement>
