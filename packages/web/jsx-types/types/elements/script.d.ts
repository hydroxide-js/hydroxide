import {
  HTMLAttributeReferrerPolicy,
  HTMLAttributes
} from '../attributes/html-attributes'

interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
  async?: boolean
  /** @deprecated */
  charset?: string
  crossorigin?: string
  defer?: boolean
  integrity?: string
  nomodule?: boolean
  nonce?: string
  referrerpolicy?: HTMLAttributeReferrerPolicy
  src?: string
  type?: string
}

export type JSXScriptElement = ScriptHTMLAttributes<HTMLScriptElement>
