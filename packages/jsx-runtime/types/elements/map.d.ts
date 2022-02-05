import { HTMLAttributes } from '../attributes'

interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: string | undefined
}

export type JSXMapElement = MapHTMLAttributes<HTMLMapElement>
