import { HTMLAttributes } from '../attributes'

interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
  cite?: string | undefined
}

export type JSXQuoteElement = QuoteHTMLAttributes<HTMLQuoteElement>
