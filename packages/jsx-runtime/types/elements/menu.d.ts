import { HTMLAttributes } from '../attributes'

interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
  type?: string | undefined
}

export type JSXMenuElement = MenuHTMLAttributes<HTMLElement>
