import { HTMLAttributes } from '../attributes'
import { EventHandler } from '../common'

interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
  open?: boolean
  onToggle?: EventHandler<T>
}

export type JSXDetailsElement = DetailsHTMLAttributes<HTMLElement>
