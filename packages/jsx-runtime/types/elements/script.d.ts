import {
  HTMLAttributeReferrerPolicy,
  HTMLAttributes
} from '../attributes/html-attributes'

interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
  async?: boolean | undefined
  /** @deprecated */
  charSet?: string | undefined
  crossOrigin?: string | undefined
  defer?: boolean | undefined
  integrity?: string | undefined
  noModule?: boolean | undefined
  nonce?: string | undefined
  referrerPolicy?: HTMLAttributeReferrerPolicy | undefined
  src?: string | undefined
  type?: string | undefined
}

export type JSXScriptElement = ScriptHTMLAttributes<HTMLScriptElement>
