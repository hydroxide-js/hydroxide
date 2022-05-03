import { HTMLAttributes } from '../attributes/html-attributes'

interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
  type?: string | undefined
}

export type JSXMenuElement = MenuHTMLAttributes<HTMLElement>
