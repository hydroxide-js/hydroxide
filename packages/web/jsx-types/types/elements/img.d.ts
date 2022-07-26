import {
  HTMLAttributeReferrerPolicy,
  HTMLAttributes
} from '../attributes/html-attributes'
import { numOrStr } from '../common'

export interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
  alt?: string
  crossorigin?: 'anonymous' | 'use-credentials' | ''
  decoding?: 'async' | 'auto' | 'sync'
  loading?: 'eager' | 'lazy'
  referrerpolicy?: HTMLAttributeReferrerPolicy
  sizes?: string
  src?: string
  srcset?: string
  usemap?: string
  width?: numOrStr
  height?: numOrStr
}
