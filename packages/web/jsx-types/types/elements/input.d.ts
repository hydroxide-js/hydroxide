import { HTMLAttributes, HTMLInputTypeAttribute } from '../attributes/html-attributes'
import { BindAttributes } from '../common'

interface InputHTMLAttributes<T> extends HTMLAttributes<T>, BindAttributes {
  accept?: string
  alt?: string
  autoComplete?: string
  autoFocus?: boolean
  capture?: boolean | 'user' | 'environment'
  checked?: boolean
  crossOrigin?: string
  disabled?: boolean
  enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'
  form?: string
  formAction?: string
  formEncType?: string
  formMethod?: string
  formNoValidate?: boolean
  formTarget?: string
  height?: number | string
  list?: string
  max?: number | string
  maxLength?: number
  min?: number | string
  minLength?: number
  multiple?: boolean
  name?: string
  pattern?: string
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  size?: number
  src?: string
  step?: number | string
  type?: HTMLInputTypeAttribute
  value?: string | ReadonlyArray<string> | number
  width?: number | string
}

export type JSXInputElement = InputHTMLAttributes<HTMLInputElement>
