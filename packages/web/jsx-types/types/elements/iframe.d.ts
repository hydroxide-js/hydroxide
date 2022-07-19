import {
  HTMLAttributeReferrerPolicy,
  HTMLAttributes
} from '../attributes/html-attributes'

interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
  allow?: string
  allowFullScreen?: boolean
  allowTransparency?: boolean
  /** @deprecated */
  frameBorder?: number | string
  height?: number | string
  loading?: 'eager' | 'lazy'
  /** @deprecated */
  marginHeight?: number
  /** @deprecated */
  marginWidth?: number
  name?: string
  referrerPolicy?: HTMLAttributeReferrerPolicy
  sandbox?: string
  /** @deprecated */
  scrolling?: string
  seamless?: boolean
  src?: string
  srcDoc?: string
  width?: number | string
}
