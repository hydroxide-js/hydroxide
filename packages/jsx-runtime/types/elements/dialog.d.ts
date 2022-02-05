import { HTMLAttributes } from '../attributes/html-attributes'

interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
  open?: boolean | undefined
}

export type JSXDialogElement = DialogHTMLAttributes<HTMLDialogElement>
