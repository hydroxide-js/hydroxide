import { HTMLAttributes } from '../attributes/html-attributes'

interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
  reversed?: boolean
  start?: number
  type?: '1' | 'a' | 'A' | 'i' | 'I'
}

export type JSXOlElement = OlHTMLAttributes<HTMLOListElement>
