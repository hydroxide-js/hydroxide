import {
  HTMLAttributeReferrerPolicy,
  HTMLAttributes
} from '../attributes/html-attributes'

interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
  as?: string
  crossorigin?: string
  href?: string
  hreflang?: string
  integrity?: string
  media?: string
  imagesrcset?: string
  referrerpolicy?: HTMLAttributeReferrerPolicy
  rel?: string
  sizes?: string
  type?: string
  charset?: string
}

export type JSXLinkElement = LinkHTMLAttributes<HTMLLinkElement>
