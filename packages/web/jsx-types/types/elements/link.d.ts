import {
  HTMLAttributeReferrerPolicy,
  HTMLAttributes
} from '../attributes/html-attributes'

interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
  as?: string
  crossOrigin?: string
  href?: string
  hrefLang?: string
  integrity?: string
  media?: string
  imageSrcSet?: string
  referrerPolicy?: HTMLAttributeReferrerPolicy
  rel?: string
  sizes?: string
  type?: string
  charSet?: string
}

export type JSXLinkElement = LinkHTMLAttributes<HTMLLinkElement>
