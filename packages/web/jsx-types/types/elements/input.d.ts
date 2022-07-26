import { HTMLAttributes, HTMLInputTypeAttribute } from '../attributes/html-attributes'
import { BindAttributes } from '../common'

interface InputHTMLAttributes<T> extends HTMLAttributes<T>, BindAttributes {
  accept?: string
  alt?: string
  autocomplete?: string
  autofocus?: boolean
  capture?: boolean | 'user' | 'environment'
  checked?: boolean
  crossorigin?: string
  disabled?: boolean
  enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'
  form?: string
  formaction?: string
  formenctype?: string
  formmethod?: string
  formnovalidate?: boolean
  formtarget?: string
  height?: number | string
  list?: string
  max?: number | string
  maxlength?: number
  min?: number | string
  minlength?: number
  multiple?: boolean
  name?: string
  pattern?: string
  placeholder?: string
  readonly?: boolean
  required?: boolean
  size?: number
  src?: string
  step?: number | string
  type?: HTMLInputTypeAttribute
  value?: string | ReadonlyArray<string> | number
  width?: number | string
}

export type JSXInputElement = InputHTMLAttributes<HTMLInputElement>
