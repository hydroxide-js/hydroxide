import {
  HTMLAttributeReferrerPolicy,
  HTMLAttributes
} from '../attributes/html-attributes'
import { HTMLTargetAttribute } from '../attributes/utils'

interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
  /** Prompts the user to save the linked URL instead of navigating to it. */
  download?: any

  /** The URL that the hyperlink points to */
  href?: string

  /** Hints at the human language of the linked URL */
  hreflang?: string

  /** Specifies the media or device the linked document is optimized for */
  media?: string

  /**  A space-separated list of URLs. When the link is followed, the browser will send POST requests with the body PING to the URLs. Typically for tracking. */
  ping?: string

  /** The relationship of the linked URL as space-separated link types. */
  rel?: string

  /** Where to display the linked URL, as the name for a browsing context */
  target?: HTMLTargetAttribute

  /** Hints at the linked URL’s format with a MIME type */
  type?: string

  /** How much of the referrer to send when following the link. */
  referrerpolicy?: HTMLAttributeReferrerPolicy
}

export type JSXAnchorElement = AnchorHTMLAttributes<HTMLAnchorElement>
