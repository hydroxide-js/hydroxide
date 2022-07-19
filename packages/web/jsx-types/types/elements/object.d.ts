import { HTMLAttributes } from '../attributes/html-attributes'

interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
  classID?: string
  data?: string
  form?: string
  height?: number | string
  name?: string
  type?: string
  useMap?: string
  width?: number | string
  wmode?: string
}

export type JSXObjectElement = ObjectHTMLAttributes<HTMLObjectElement>
