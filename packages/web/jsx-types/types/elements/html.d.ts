import { HTMLAttributes } from '../attributes/html-attributes'

interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
  manifest?: string | undefined
}

export type JSXHtmlElement = HtmlHTMLAttributes<HTMLHtmlElement>
