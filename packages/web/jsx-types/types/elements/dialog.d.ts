import { HTMLAttributes } from '../attributes/html-attributes'

interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
  open?: boolean
}

export type JSXDialogElement = DialogHTMLAttributes<HTMLDialogElement>
