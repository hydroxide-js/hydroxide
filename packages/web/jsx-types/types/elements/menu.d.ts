import { HTMLAttributes } from '../attributes/html-attributes'

interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
  type?: string
}

export type JSXMenuElement = MenuHTMLAttributes<HTMLElement>
