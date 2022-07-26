import { HTMLAttributes } from '../attributes/html-attributes'

interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
  classid?: string
  data?: string
  form?: string
  height?: number | string
  name?: string
  type?: string
  usemap?: string
  width?: number | string
  wmode?: string
}

export type JSXObjectElement = ObjectHTMLAttributes<HTMLObjectElement>
