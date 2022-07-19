import {
  HTMLAttributeReferrerPolicy,
  HTMLAttributes
} from '../attributes/html-attributes'

interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
  async?: boolean
  /** @deprecated */
  charSet?: string
  crossOrigin?: string
  defer?: boolean
  integrity?: string
  noModule?: boolean
  nonce?: string
  referrerPolicy?: HTMLAttributeReferrerPolicy
  src?: string
  type?: string
}

export type JSXScriptElement = ScriptHTMLAttributes<HTMLScriptElement>
