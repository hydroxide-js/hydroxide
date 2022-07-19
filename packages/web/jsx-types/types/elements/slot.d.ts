import { HTMLAttributes } from '../attributes/html-attributes'

interface SlotHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: string
}

export type JSXSlotElement = SlotHTMLAttributes<HTMLSlotElement>
