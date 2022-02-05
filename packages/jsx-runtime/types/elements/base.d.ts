import { HTMLAttributes } from '../attributes/html-attributes'
import { HTMLTargetAttributeStrict } from '../attributes/utils'

interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
  /** specifies the base URL and/or target for all relative URLs in a document */
  href?: string

  /** Specifies the default target for all hyperlinks and forms in the page */
  target?: HTMLTargetAttributeStrict
}

/** <base> specifies the base URL and/or target for all relative URLs in a document */
export type JSXBaseElement = BaseHTMLAttributes<HTMLBaseElement>
