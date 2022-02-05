import { HTMLAttributes } from '../attributes'

interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
  reversed?: boolean | undefined
  start?: number | undefined
  type?: '1' | 'a' | 'A' | 'i' | 'I' | undefined
}

export type JSXOlElement = OlHTMLAttributes<HTMLOListElement>
