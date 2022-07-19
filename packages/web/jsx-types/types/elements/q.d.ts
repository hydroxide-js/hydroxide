import { HTMLAttributes } from '../attributes/html-attributes'

interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string
}

export type JSXQuoteElement = QuoteHTMLAttributes<HTMLQuoteElement>
