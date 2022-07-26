import {
  HTMLAttributeReferrerPolicy,
  HTMLAttributes
} from '../attributes/html-attributes'

interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
  allow?: string
  allowfullscreen?: boolean
  allowtransparency?: boolean
  /** @deprecated */
  frameborder?: number | string
  height?: number | string
  loading?: 'eager' | 'lazy'
  /** @deprecated */
  marginheight?: number
  /** @deprecated */
  marginwidth?: number
  name?: string
  referrerpolicy?: HTMLAttributeReferrerPolicy
  sandbox?: string
  /** @deprecated */
  scrolling?: string
  seamless?: boolean
  src?: string
  srcdoc?: string
  width?: number | string
}
