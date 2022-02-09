import { HTMLAttributes } from '../attributes/html-attributes'

interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
  classID?: string | undefined
  data?: string | undefined
  form?: string | undefined
  height?: number | string | undefined
  name?: string | undefined
  type?: string | undefined
  useMap?: string | undefined
  width?: number | string | undefined
  wmode?: string | undefined
}

export type JSXObjectElement = ObjectHTMLAttributes<HTMLObjectElement>
