import {
  HTMLAttributeReferrerPolicy,
  HTMLAttributes
} from '../attributes/html-attributes'

interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
  as?: string | undefined
  crossOrigin?: string | undefined
  href?: string | undefined
  hrefLang?: string | undefined
  integrity?: string | undefined
  media?: string | undefined
  imageSrcSet?: string | undefined
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined
  rel?: string | undefined
  sizes?: string | undefined
  type?: string | undefined
  charSet?: string | undefined
}

export type JSXLinkElement = LinkHTMLAttributes<HTMLLinkElement>
