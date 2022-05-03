import { HTMLAttributes } from '../attributes/html-attributes'

interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
  /** Specifies the source of the quotation */
  cite?: string
}

/**
 * <blockquote> tag specifies a section that is quoted from another source.
 */
export type JSXBlockquoteElement = BlockquoteHTMLAttributes<HTMLElement>
