import { HTMLAttributes } from '../attributes/html-attributes'

interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: string | undefined
}

export type JSXMapElement = MapHTMLAttributes<HTMLMapElement>
