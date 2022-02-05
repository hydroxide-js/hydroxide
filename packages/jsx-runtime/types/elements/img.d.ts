import {
  HTMLAttributeReferrerPolicy,
  HTMLAttributes
} from '../attributes/html-attributes'
import { numOrStr } from '../common'

export interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
  alt?: string
  crossOrigin?: 'anonymous' | 'use-credentials' | ''
  decoding?: 'async' | 'auto' | 'sync'
  loading?: 'eager' | 'lazy'
  referrerPolicy?: HTMLAttributeReferrerPolicy
  sizes?: string
  src?: string
  srcSet?: string
  useMap?: string
  width?: numOrStr
  height?: numOrStr
}
