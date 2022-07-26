import { HTMLAttributes } from '../attributes/html-attributes'

interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
  open?: boolean
}

export type JSXDetailsElement = DetailsHTMLAttributes<HTMLElement>
