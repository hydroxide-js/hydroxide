import { HTMLAttributes } from '../attributes'

interface SlotHTMLAttributes<T> extends HTMLAttributes<T> {
  name?: string | undefined
}

export type JSXSlotElement = SlotHTMLAttributes<HTMLSlotElement>
